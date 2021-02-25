<template>

  <TitleBar class="bg-purple-500">Article List</TitleBar>

  <section class="section section-article-write-form-box px-2">
    <div class="container mx-auto">
      <!--submint.prevent: 말그대로 submit을 막는 것-->
      <form v-on:submit.prevent="checkAndWriteArticle">
        <FormRow title="제목">
          <input ref="newArticleTitleElRef" type="text" class="form-row-input" placeholder="제목을 입력하세요."> 
        </FormRow>
        <FormRow title="내용">
          <textarea ref="newArticleBodyElRef" class="form-row-input" placeholder="내용을 입력하세요."></textarea>
        </FormRow>
        <FormRow>
          <!-- App.vue로 부터 .btn-primary의 style 가져오기 -->
          <div class="btns">
            <input class="btn-primary" type="submit" value="등록">
          </div>
          
        </FormRow>
      </form>
    </div>
  </section>

  <section class="section section-article-list px-2">
    <div class="container mx-auto">

      <div class="btns mt-6">
        <router-link class="btn-info" to="/article/list?boardId=1">공지사항 게시판</router-link>
        <router-link class="btn-info" to="/article/list?boardId=2">자유 게시판</router-link>
      </div>
      
      <div class="mt-6" v-bind:key="article.id" v-for="article in state.articles">
        <div class="px-10 py-6 bg-white rounded-lg shadow-md">
          <div class="flex justify-between items-center">
            <span class="font-light text-gray-600">
              2021-02-24 10:20:30
            </span>
            <a href="#" class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
              자유
            </a>
          </div>
          <div class="mt-2">
            <a href="#" class="text-2xl text-gray-700 font-bold hover:underline">
              {{ article.title }}
            </a>
            <p class="mt-2 text-gray-600">
              {{ article.body }}
            </p>
          </div>
          <div class="flex justify-between items-center mt-4">
            <a href="#" class="text-blue-500 hover:underline">자세히 보기</a>
            <div>
              <a href="#" class="flex items-center">
                <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80" alt="avatar" class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block">
                <h1 class="text-gray-700 font-bold hover:underline">홍길동</h1>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, watch } from 'vue'
/** 21.02.25 props 설정으로 해당 로직 필요 없음
import { useRoute } from 'vue-router'
*/
/* 전역 컴포넌트 적용으로 안해도 됨 
import TitleBar from '../components/TitleBar.vue';
*/
//import { Article } from '../dtos/' /* '../dtos/index'이지만 생략가능 */
import { IArticle } from '../types/'
import { MainApi } from '../apis/'


export default defineComponent({
  name: 'ArticleListPage',

  /* props를 추가 */
  props: {
    boardId: {
      type: Number,
      required: true,
      default:1
    }
  },

  /* setup() 함수는 프로그램 실행시 단 한번 호출된다.
  setup() 함수는 프로그램당 한 개씩만 존재할 수 있으며, 
  최초 한 번 실행된 이후에는 재호출되지 않아야 한다.
  참고: setup() 함수 안에 선언된 변수는, draw() 함수를 비롯한 여타 함수들이 접근할 수 없다. */
  setup(props){
    /** 21.02.25 props 설정으로 해당 로직 필요 없음
    const route = useRoute();  //useRoute 객체 생성
    */
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    /* ref: HTMLInputElement의 위치를 가져오는 것 */
    const newArticleTitleElRef = ref<HTMLInputElement>();
    const newArticleBodyElRef = ref<HTMLInputElement>();

    /* reactive: reactive는 기존 뷰 문법의 data 속성 느낌이고, 
    ref는 좀 더 리액티브 속성을 개별적으로 선언하는 느낌....??? */
    /* articles 배열을 state로 선언 */
    /* state는 무슨 의미????*/
    /* 기존 코드에서는 props, data, methods가 같은 계층에 존재했습니다. 
    하지만 Vue3에서는 props와 setup이 같은 계층에 존재하고, 
    data는 state로, method 들은 각각의 기명함수로 작성되어 한번에 반환되도록 변화하였습니다.
    state의 경우에도 그냥 선언하는 것이 아니라, vue reactive를 사용하게 되었습니다. 
    Reactive(반응형)는 Vue가 반응형 시스템을 유지하기 위해서 사용하는 간단한 JavaScript 객체입니다. 
    Reactive는 아래와 같이 동작합니다.(그림: https://media.vlpt.us/images/bluestragglr/post/50e4c7c7-c697-4c5a-8329-820828389777/Untitled.png) 
    Vue2 에서는 data나 method, computed 등을 선언하게 되면 알아서 각각에 대해 위와 같이 동작하는 reactive 객체를 생성하였습니다. 
    하지만 그 과정이 묵시적이었고, 유저들은 위 과정을 알 필요가 없었습니다. 
    하지만 Vue3에서의 타입스크립트의 지원이나 state로의 명칭 변경, 명시적 reactive 사용 등을 보았을 때, 
    전반적으로 명료한 선언을 지향하는 방향으로 변화한 것으로 보입니다.
    */
    const state = reactive({
      articles: [] as IArticle[]
    });

    function loadArticles(boardId:number){
      mainApi.article_list(boardId)
      .then(axiosResponse => {
          state.articles = axiosResponse.data.body.articles;
      });
    }

    // onMounted 바로 실행하는 것이 아닌 모든 것이 준비되었을때 실행됨
    onMounted(() => {
      loadArticles(props.boardId);

      /** 21.02.25 props 설정으로 해당 로직 필요 없어짐
      // route.query.boardId as any ?? "1" 
      // route.query.boardId가 null이거나 undifind이면 1을 적용하라는 의미
      const boardId = parseInt(route.query.boardId as string ?? "1");
      
      loadArticles(boardId);
      */
    });

    // watch 해당 내용에 변경이 있는지 계속 관찰
    watch(() => props.boardId, (newValue, oldValue) => {
      //만약 props.boardId 값이 바뀌면 아래 로직 실행
      loadArticles(props.boardId);
    })

    /* 공백 체크 */
    function checkAndWriteArticle(){
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
      writeArticle(newArticleTitleEl.value, newArticleBodyEl.value);

      // 글작성 후 내용 초기화
      newArticleTitleEl.value = '';
      newArticleBodyEl.value = '';

    }

    //typescript에서는 title:string, body:string 이런식으로 type을 적어주어야 한다
      function writeArticle(title:string, body:string){
        //const newArticle = new Article(title, body);
        
        //state.articles.push(newArticle);
      }

    return{
      state,
      newArticleTitleElRef,
      newArticleBodyElRef,
      checkAndWriteArticle
      
    }

  }
  
 /* 전역 컴포넌트 적용으로 안해도 됨 
  components: {
    TitleBar
  }
*/
})
</script>

<style scoped>

</style>