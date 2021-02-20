<template>
  <!-- TitleBar 컴포넌트를 불러오고 title을 입력한다 -->
  <!-- class를 추가하여 자신만의 css를 추가할 수도 있다. -->
  <TitleBar title="Home Main" class="bg-green-500"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TitleBar from '../components/TitleBar.vue';
// TitleBar 컴포넌트를 임포트해야한다.

export default defineComponent({
  name: 'HomeMainPage',
   components: {
    TitleBar
    // TitleBar 컴포넌트를 정의해주어야 한다.
  }

})
</script>

<style scoped>
  .home{
    height: 300px;
    text-align: center;
    color: white;
    font-size: 3rem;
    font-weight: bold;
  }
</style>