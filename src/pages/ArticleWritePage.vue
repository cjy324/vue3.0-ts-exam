<template>

  <TitleBar>글쓰기</TitleBar>

  <section class="section section-article-write-form-box px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-on:submit.prevent="checkAndWriteArticle">
          <FormRow title="게시판">
            <select class="form-row-select" ref="newArticleBoardIdElRef">
              <option value="1">공지사항</option>
              <option value="2">자유</option>
            </select>
          </FormRow>
          <FormRow title="제목">
            <input ref="newArticleTitleElRef" class="form-row-input" type="text" placeholder="제목을 입력해주세요.">
          </FormRow>
          <FormRow title="내용">
            <textarea ref="newArticleBodyElRef" class="form-row-input" placeholder="내용을 입력해주세요."></textarea>
          </FormRow>
          <FormRow title="작성">
            <div class="btns">
              <input type="submit" value="작성" class="btn-primary" />
            </div>
          </FormRow>
        </form>
      </div>
    </div>
  </section>


</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { IArticle } from '../types/'
import { MainApi } from '../apis/'
import { Router } from 'vue-router'


export default defineComponent({
  name: 'ArticleListPage',

  props: {
    boardId: {
      type: Number,
      required: true,
      default:1
    }
  },

  setup(props){
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const newArticleBoardIdElRef = ref<HTMLInputElement>();
    const newArticleTitleElRef = ref<HTMLInputElement>();
    const newArticleBodyElRef = ref<HTMLInputElement>();

    const state = reactive({
      articles: [] as IArticle[]
    });

    //boardId 파라미터 값에 따라 게시판 선택 옵션 값(newArticleBoardIdElRef.value.value)이 바뀜
    onMounted(() => {
        if(newArticleBoardIdElRef.value == null){
        return;
      }
        newArticleBoardIdElRef.value.value = props.boardId + "";
      });

    /* 공백 체크 */
    function checkAndWriteArticle(){

      if(newArticleBoardIdElRef.value == null){
        return;
      }

      const newArticleBoardIdEl = newArticleBoardIdElRef.value;


      //일반적으로 안해도 되지만 typescript에서는 해야됨
      if(newArticleTitleElRef.value == null){
        return;
      }

      const newArticleTitleEl = newArticleTitleElRef.value;
      newArticleTitleEl.value = newArticleTitleEl.value.trim();

      if(newArticleTitleEl.value.length == 0){
        alert('제목을 입력해 주세요.')
        newArticleTitleEl.focus();
        return;
      }

      if(newArticleBodyElRef.value == null){
        return;
      }

      const newArticleBodyEl = newArticleBodyElRef.value;
      newArticleBodyEl.value = newArticleBodyEl.value.trim();

      if(newArticleBodyEl.value.length == 0){
        alert('내용을 입력해 주세요.')
        newArticleBodyEl.focus();
        return;
      }

      // 글작성 함수로 보내기
      writeArticle(parseInt(newArticleBoardIdEl.value), newArticleTitleEl.value, newArticleBodyEl.value);

      // 글작성 후 내용 초기화
      newArticleTitleEl.value = '';
      newArticleBodyEl.value = '';

      newArticleTitleEl.focus();
    }

    //typescript에서는 title:string, body:string 이런식으로 type을 적어주어야 한다
      function writeArticle(boardId:number, title:string, body:string){
       
        mainApi.article_doWrite(boardId, title, body)
        .then(axiosResponse => {
          
          //authKey가 있는 상태에서 가능
          const newArticleId = axiosResponse.data.body.id;
          alert(newArticleId + "번 게시물 등록 완료!!");

          router.push("detail?id=" + newArticleId);
        });
      }

    return{
      state,
      newArticleBoardIdElRef,
      newArticleTitleElRef,
      newArticleBodyElRef,
      checkAndWriteArticle
      
    }

  }
  
})
</script>

<style scoped>

</style>