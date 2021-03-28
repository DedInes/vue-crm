<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input 
            id="email" 
            type="text" 
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Поле Email пустое!</small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Email введен некоректно!</small>
      </div>
      <div class="input-field">
        <input 
            id="password" 
            type="password" 
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          Введите пароль
        </small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Пароль должен быть {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button 
          class="btn waves-effect waves-light auth-submit" 
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from '/node_modules/vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  // указываем имя страницы
  name: 'login',
  // создаем модели и добавляем для них поля
  data: () => ({
    email: '',
    password: ''
  }),
  // определяем свойства для полей указывая определенные правила из библиотеки vuelidate
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    // если в объекте есть ключ
    if (messages[this.$route.query.message]) {
      // то выводим строку, содержащуюся в данном объекте
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    // метод, вызываемый при сабмите формы
    async submitHandler() {
      // если поле для валидации v находится в состоянии invalid  
      if (this.$v.$invalid) {
        // то тогда будем вызывать валидацию
        this.$v.$touch()
        // и вызываем return, чтобы дальнейшая функция не работала
        return
      }
      // объект для передачи на backend 
      const formData = {
        email: this.email,
        password: this.password
      }

      // если авторизация отработала корректно, то переходим на главную страницу
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
