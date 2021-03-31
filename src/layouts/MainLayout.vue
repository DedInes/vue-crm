<template>
<div>
  <Loader  v-if="loading" />
  <div class="app-main-layout" v-else >
    <!--Добавляем импортированные компоненты Navbar и Sidebar в верстку-->
    <Navbar @click="isOpen = !isOpen" />

    <Sidebar v-model="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <!-- Кнопка добавления новых записей (вызывается из любой страницы и перенаправляет на /record) -->
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
//Импортируем Navbar и Sidebar
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
  name: "main-layout",
  // Массив состояний
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    // проверяем есть ли информация
    if (!Object.keys(this.$store.getters.info).length) {
      // ассинхронный запрос на получение данных у пользователей
      await this.$store.dispatch('fetchInfo')
    }
    // если данных нету, то loading будет false после получения данных
    this.loading = false
  },
  components: {
    Navbar, Sidebar,
  },
};
</script>
