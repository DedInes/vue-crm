import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      // меняем значение 
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      // получаем ключ для доступа к env переменным
      const key = process.env.VUE_APP_FIXER
      // указываем ссылку до текущего курса валют и указываем в параметре symbols нужные нам
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  // добавляем импортированные объекты в модули для использования
  modules: {
    auth,
    info,
    category,
    record
  }
})
