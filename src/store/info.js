import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info){
      state.info = info
    },
    // очищаем state для высвобождения данных при логауте
    clearInfo(state) {
      state.info = {}
    }

  },
  actions:{
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {}
      
    }
  },
  getters: {
    info: s => s.info
  }
}
