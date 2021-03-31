// содержим всю логику по авторизации, логауту и т.д.
import firebase from 'firebase/app'
import { register } from 'register-service-worker'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        // производим авторизацию пользователя с логином и паролем
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        // создаем пользователя с логином и паролем
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')
        // обращаемся к базе данных вызовом метода ref по пути /users/${uid}/info
        // вызываем метод set и передаем начальное значение
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUserId() {
      // обращаемся к firebase и получаем поле currentUser
      const user = firebase.auth().currentUser
      // возвращаем uid, если поле user не пустое
      return user ? user.uid : null
    },

    async logout({commit}) {
      // обращаемся к firebase и очищаем данные
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
