<template>
  
  <TitleBar title="Article List" class="bg-purple-500"/>

  <TitleBar class="bg-purple-500">Article List</TitleBar>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
 /* 전역 컴포넌트 적용으로 안해도 됨 
import TitleBar from '../components/TitleBar.vue';
*/

export default defineComponent({
  name: 'ArticleListPage',
  
 /* 전역 컴포넌트 적용으로 안해도 됨 
  components: {
    TitleBar
  }
*/
})
</script>

<style scoped>

</style>