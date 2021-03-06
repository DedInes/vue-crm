<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'CategoryEdit' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>{{'CategoryChoose' | localize}}</label>
        </div>

        <div class="input-field">
          <input 
            id="name" 
            type="text" 
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{'CategoryEditName' | localize}}</label>
          <span 
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            {{'CategoryEditEnterName' | localize}}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{'CategoryEditLimit' | localize}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            {{'CategoryEditMinValue' | localize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'CategoryEditUpdate' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  props: {
      categories: {
        type: Array,
        required: true
      }
    },
  data: () => ({
      select: null,
      title: '',
      limit: 100,
      current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  watch: {
    current(catId) {
      // обновляем значения полей "название" и "лимит" при выборе другой категории
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  // передаем значения категории на фронтенд
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async submitHandler() { 
      // проверка валидности 
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
         // обращение к серверу на обновление данных в нужной категории
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}

    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    // если существует select и есть метод destroy, то тогда вызываем этот метод
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
