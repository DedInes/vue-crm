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
export default {
  // Если передаем модель, то прописываем props. value принимает состояние isOpen для обработки кнопки на SideBar
  props: ['value'],
  //Возвращаем объект data для каждой ссылки и указываем параметры
  data: () => ({
    links: [
      {title: 'Счет', url: '/', exact: true},
      {title: 'История', url: '/history'},
      {title: 'Планирование', url: '/planning'},
      {title: 'Новая запись', url: '/record'},
      {title: 'Категории', url: '/categories'}
    ]
  })
}
</script>



