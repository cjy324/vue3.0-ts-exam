import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 앱 컴포넌트 불러오기
import App from './App.vue'

// 전역 CSS 불러오기
import './index.css'

// 전역 컴포넌트 불러오기
import TitleBar from './components/TitleBar.vue';

// 각 페이지 불러오기
import HomeMainPage from './pages/HomeMainPage.vue'
import ArticleListPage from './pages/ArticleListPage.vue'

// 라우팅 정보 설정(구성)
const routes = [
  { path: '/', component: HomeMainPage },
  { path: '/article/list', component: ArticleListPage }

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
const app = createApp(App);

//앱에 라우터 적용
app.use(router)

app.component('TitleBar',TitleBar)

//앱 표시
app.mount('#app');
