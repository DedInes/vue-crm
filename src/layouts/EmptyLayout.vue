<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages'
export default {
  computed: {
    error() {
      // в случае, если будет что то меняться в getter, то будет обновляться error и мы его возвращаем
      return this.$store.getters.error
    }
  },
  // отслеживаем значение fbError - ошибки firebase
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что то произошло не так')
    }
  }
}
</script>
