<template>
  <div class="form-row flex">
    <div class="w-32 flex justify-center">
      <span class="flex items-center">{{title}}</span>
    </div>
    <div class="flex-grow justify-center">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({  // 컴포넌트의 속성을 정의해주어야 함

  // title props의 속성을 정해준다
  props: {
    title: {
      type: String,
      required: true
    }
  },
  //컴포넌트의 이름을 정의한다
  name: 'FormRow'
})
</script>


<!--FormRow의 css를 post 방식으로 전송-->
<style lang="postcss">
.form-row-input{
  /* @apply? tailwind 방식을 style에 적용할 수 있도록 해주는 것? 
    즉, class에 css를 입력하는 tailwind를 style에 바로 입력하는 것  */
  /* rounded-sm =>	border-radius:0.125rem; */
  @apply w-full rounded-xl;
}

/* textarea에 달린 form-row-input 클래스 라는 의미*/
textarea.form-row-input{
  min-height: theme('spacing.96');
}

/*form-row 다음에 나오는 form-row라는 의미*/
.form-row + .form-row {
  /* mt => margin-top */
  @apply mt-2;
}
</style>


<style scoped>
  
</style> 