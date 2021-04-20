<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<!--Выводим список ссылок в динамическом режиме, ссылки Sidebar-->
<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  // Если передаем модель, то прописываем props. value принимает состояние isOpen для обработки кнопки на SideBar
  props: ['value'],
  //Возвращаем объект data для каждой ссылки и указываем параметры
  data: () => ({
    links: [
      {title: localizeFilter('Menu_Bill'), url: '/', exact: true},
      {title: localizeFilter('Menu_History'), url: '/history'},
      {title: localizeFilter('Menu_Planning'), url: '/planning'},
      {title: localizeFilter('Menu_Record'), url: '/record'},
      {title: localizeFilter('Menu_Category'), url: '/categories'}
    ]
  })
}
</script>



