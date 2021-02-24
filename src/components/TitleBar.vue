<template>
  <!-- 컴포넌트 = 일종의 템플릿? -->
  <!-- 이 양식을 다른 vue에서 불러오기만하면 양식이 적용됨 -->
  <section class="title-bar px-2">
    <h1 class="container mx-auto text-3xl mt-3 mb-3">
      <!-- slot 개념 도입 -->
      <slot></slot>
    </h1>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({  // 컴포넌트의 속성을 정의해주어야 함
  
/* slot 개념 도입으로 안해도 됨
  // title props의 속성을 정해준다
  props: {
    title: {
      type: String,
      required: true
    }
  },
*/

  //컴포넌트의 이름을 정의한다
  name: 'TitleBar'
})
</script>

<style scoped>
  
</style> 