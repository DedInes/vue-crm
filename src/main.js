import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth' 
import 'firebase/database' 


Vue.config.productionTip = false

// используем use для вызова метода плагина
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('Localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)


// инициализируем firebase
firebase.initializeApp({
  apiKey: "AIzaSyCbI04DwyzcgI28FDssxagiT19wATQblVk",
  authDomain: "vue-crm-64cb6.firebaseapp.com",
  projectId: "vue-crm-64cb6",
  storageBucket: "vue-crm-64cb6.appspot.com",
  messagingSenderId: "314047735816",
  appId: "1:314047735816:web:f3fb82f76df98b3b20c9bd",
  measurementId: "G-4L7H8EX7YT"
})

let app

firebase.auth().onAuthStateChanged(() => {
  // инициализируем приложение Vue,
  // если переменная app не определена
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
