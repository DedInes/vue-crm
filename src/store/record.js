import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUserId')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId')
        // подождем получения категории от БД firebase  
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        // проходимся по объекту records и получаем на каждой итерации ключ
        // вызываем метод map и трансформируем массив (keys(records)) в другой массив
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
