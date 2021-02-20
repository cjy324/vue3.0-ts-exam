import { createApp } from 'vue'
import App from './App.vue'
import HomeMainPage from './pages/HomeMainPage.vue'
import ArticleListPage from './pages/ArticleListPage.vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'

// 라우팅 정보 설정
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


//createApp(App).mount('#app') 이것을 풀어보면 아래와 같음

const app = createApp(App);
app.use(router)
app.mount('#app');
