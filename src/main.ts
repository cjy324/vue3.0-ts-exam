import { createApp, reactive, computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 앱 컴포넌트 불러오기
import App from './App.vue'

// 전역 CSS 불러오기
import './index.css'

// 전역 컴포넌트 불러오기
import * as Util from './utils/'; // utils파일로 부터 가져오는 모든 것(*)은 Util로 치환
import TitleBar from './components/TitleBar.vue';
import FormRow from './components/FormRow.vue';

// 각 페이지 불러오기
import HomeMainPage from './pages/HomeMainPage.vue'
import ArticleListPage from './pages/ArticleListPage.vue'
import ArticleWritePage from './pages/ArticleWritePage.vue'
import ArticleDetailPage from './pages/ArticleDetailPage.vue'
import MemberLoginPage from './pages/MemberLoginPage.vue'

// 전역state 만들기
/// localStorage에서 로그인 정보 가져오기
const authKey = localStorage.getItem("authKey")
const loginedMemberId  = Util.toIntOrNull(localStorage.getItem("loginedMemberId"))
const loginedMemberName = localStorage.getItem("loginedMemberName")
const loginedMemberNickname  = localStorage.getItem("loginedMemberNickname")

/*state => 상태
페이지 글과 같은 state는 전역적으로 필요하지 않음
하지만 로그인 정보의 경우 전역적으로 필요함 
이를 위해 전역state(=> globalShare)를 구축해야함*/
const globalShare:any = reactive({
  //loginedMember:{},  //loginedMember:{}는 비어있는 상태
  //로그인 정보 채우기
  loginedMember:{
    authKey,
    id:loginedMemberId,
    name:loginedMemberName,
    nickname:loginedMemberNickname,
  },
  //globalShare.loginedMember가 비어있지 않는지를 computed로 자동 체크
  //비어있지 않다면(===false) isLogined
  //isLogined: computed(() => Util.isEmptyObject(globalShare.loginedMember) === false)  
  isLogined: computed(() => globalShare.loginedMember.id !== null ),
  
  //로그아웃
  logout: () => { 
      localStorage.removeItem("authKey");
      localStorage.removeItem("loginedMemberId");
      localStorage.removeItem("loginedMemberName");
      localStorage.removeItem("loginedMemberNickname");

      location.replace('/member/login');
  }
});

/*테스트용
setTimeout(() => {
  globalShare.loginedMember.id = 1;
}, 5000);
*/

// MainApi 불러오기
import { MainApi } from './apis/'

// MainApi 객체 생성
const mainApi = new MainApi();

// 라우팅 정보 설정(구성)
const routes = [
  { 
    path: '/', 
    component: HomeMainPage 
  },
  { 
    path: '/article/list', 
    component: ArticleListPage, 
    //주소에 바로 접근하지 않게끔하고
    //props로 들어오는 경로로 접근하도록??
    props: (route:any) => ({ boardId: Util.toIntOrUnd(route.query.boardId), globalShare })
  },
  { 
    path: '/article/write', 
    component: ArticleWritePage, 
    props: (route:any) => ({ boardId: Util.toIntOrUnd(route.query.boardId), globalShare })
  },
  { 
    path: '/article/detail', 
    component: ArticleDetailPage, 
    props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id), globalShare })
  },
  {
    path: '/member/login',
    component: MemberLoginPage,
    props: (route:any) => ({globalShare})
  }

    

];

// 라우팅 정보를 가져오는 라우터 생성
const router = createRouter({
  //Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  //routes : routes 이름이 똑같으면 아래처럼 축약 가능
  routes
});


//앱 생성
//createApp(App).mount('#app') 이것을 풀어보면 아래와 같음
const app = createApp(App, {
  globalShare
});

//앱에 전역 라이브러리 등록
app.config.globalProperties.$mainApi = mainApi;
app.config.globalProperties.$router = router;

//앱에 전역 컴포넌트 적용
//모든 곳에서 컴포넌트를 불러올수 있게 해줌
app.component('TitleBar',TitleBar)
app.component('FormRow',FormRow)

//앱에 라우터 적용
app.use(router)

//앱 표시
app.mount('#app');
