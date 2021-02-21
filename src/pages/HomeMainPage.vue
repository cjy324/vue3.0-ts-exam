<template>
  <!-- TitleBar 컴포넌트를 불러오고 title을 입력한다 -->
  <!-- class를 추가하여 자신만의 css를 추가할 수도 있다. -->
  <TitleBar title="Home Main" class="bg-green-500"/>
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