export default {
  // метод вызова Vue для выполнения плагина
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      M.toast({html})
    }
    
    // вывод сообщения об ошибке
    Vue.prototype.$error = function(html) {
      M.toast({html: `[Ошибка]: ${html}`})
    }
      
  }
}
