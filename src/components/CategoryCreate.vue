<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'CategoryCreateTitle' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input 
            id="name" 
            type="text" 
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{'CategoryCreateName' | localize}}</label>
          <span 
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            {{'CategoryCreateEnterName' | localize}}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{'CategoryCreateLimit' | localize}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            {{'CategoryCreateMinValue' | localize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'CategoryCreateButton' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      // если валидация не прошла
      if (this.$v.$invalid) {
        // активируем валидацию с помощью функции touch
        this.$v.$touch()
        // завершаем выполнения функции с помощью return для предотвращения работы с сервером
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message('Категория создана')
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>
