<template>
  
  <TitleBar title="Article List" class="bg-purple-500"/>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TitleBar from '../components/TitleBar.vue';

export default defineComponent({
  name: 'ArticleListPage',
  components: {
    TitleBar
  }

})
</script>

<style scoped>

</style>