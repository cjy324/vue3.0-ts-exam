<template>

<!-- 컴포넌트 slot으로 개편 -->
<TitleBar class="bg-green-500">Home Main</TitleBar>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

/* 전역 컴포넌트 적용으로 안해도 됨
import TitleBar from '../components/TitleBar.vue';
// TitleBar 컴포넌트를 임포트해야한다.
*/

export default defineComponent({
  name: 'HomeMainPage',

  /* 전역 컴포넌트 적용으로 안해도 됨
   components: {
    TitleBar
    // TitleBar 컴포넌트를 정의해주어야 한다.
  }
*/

})
</script>

<style scoped>

</style>