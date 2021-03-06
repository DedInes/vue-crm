import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUserId')
        // подождем получения категории от БД firebase  
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        // const cat = []
        // Object.keys(categories).forEach(key => {
        //   cat.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key
        //   })
        // })
        // return cat
        
        // эквивалент кода сверху
        // проходимся по объекту categories и получаем на каждой итерации ключ
        // вызываем метод map и трансформируем массив (keys(categories)) в другой массив
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUserId')
        // подождем получения категории от БД firebase  
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        // проходимся по объекту categories и получаем на каждой итерации ключ
        // вызываем метод map и трансформируем массив (keys(categories)) в другой массив
        return {...category, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUserId')
        // подождем получения категории от БД firebase  
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async createCategory ({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUserId')
        // подождем получения категории от БД firebase  
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
