<template>
  <div>
    <div class="page-title">
      <h3>{{'RecordNew' | localize}}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">{{'RecordNoCategory' | localize}} <router-link to="/categories">{{'RecordAddCategory' | localize}}</router-link></p>

    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
          v-for="c in categories"
          :key="c.id"
          :value="c.id"
          >{{c.title}}</option>
        </select>
        <label>{{'ChooseCategory' | localize}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap" 
            name="type" 
            type="radio" 
            value="income"
            v-model="type"
          />
          <span>{{'Income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="outcome"
            v-model="type"
          />
          <span>{{'Outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input 
          id="amount" 
          type="number"
          v-model.number="amount" 
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{'RecordSumm' | localize}}</label>
        <span
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid"
          >
            {{'RecordMinValue' | localize}} {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input 
          id="description" 
          type="text" 
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{'RecordDescription' | localize}}</label>
        <span 
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
          >
            {{'RecordEnterDescription' | localize}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'RecordCreate' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'
export default {
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome', // модель для радиобаттона
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    // получаем список всех категорий
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    // валидация
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
         try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          // создаем новую переменную для обновленного счёта 
          // проверяем, если тип события income, то тогда узнаём расход это или доход
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          // после этого обновляем данные на сервере
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          // очищаем форму
          this.$v.$reset()
          // обнуляем модели в инпутах
          this.amount = 1
          this.description = ''
        } catch (e) {}  
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    }
  },
   destroyed() {
    // если существует select и есть метод destroy, то тогда вызываем этот метод
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
