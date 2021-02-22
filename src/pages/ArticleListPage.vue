<template>

  <TitleBar class="bg-purple-500">Article List</TitleBar>

  <section class="article-write-form-box">
    <div class="container mx-auto">
      <form action="">
        <FormRow title="제목">
          <input type="text" class="form-row-input" placeholder="제목을 입력하세요."> 
        </FormRow>
        <FormRow title="내용">
          <textarea class="form-row-input" placeholder="내용을 입력하세요."></textarea>
        </FormRow>
        <FormRow>
          <input type="button" value="등록">
        </FormRow>
      </form>
    </div>
  </section>
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