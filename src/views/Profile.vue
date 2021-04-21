<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input 
          id="description" 
          type="text" 
          v-model="name" 
          :class="{invalid: $v.name.$dirty && !$v.name.required}">
        <label for="description">{{'Name' | localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'Message_EnterName' | localize}}</small>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Russian
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from '/node_modules/vuelidate/lib/validators'
export default {
  data: () => ({
    name: '',
    isRuLocale: true
  }),
   // определяем свойства для полей указывая определенные правила из библиотеки vuelidate
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    // метод, вызываемый при сабмите формы
    async submitHandler() {
      // если поле для валидации v находится в состоянии invalid  
      if (this.$v.$invalid) {
        // то тогда будем вызывать валидацию
        this.$v.$touch()
        // и вызываем return, чтобы дальнейшая функция не работала
        return
      }
      // если авторизация отработала корректно, то переходим на главную страницу
      try {
        // Динамически обновляем имя в шапке при помощи метода updateInfo
        await this.updateInfo({
          name: this.name,
          // если isRuLocale === true, то передаем русскую локализацию, иначе английскую
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
