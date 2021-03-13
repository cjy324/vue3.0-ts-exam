<template>
  <TitleBar>회원가입</TitleBar>

  <section class="section section-member-join-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined == false" v-on:submit.prevent="checkAndJoin">
          <FormRow title="프로필 이미지">
            <input ref="profileImgElRef" class="form-row-input" type="file" placeholder="프로필 이미지를 선택해 주세요.">
          </FormRow>
          <FormRow title="아이디">
            <input ref="loginIdElRef" class="form-row-input" type="text" placeholder="아이디를 입력해주세요.">
          </FormRow>
          <FormRow title="비밀번호">
            <input ref="loginPwElRef" class="form-row-input" type="password" placeholder="비밀번호를 입력해주세요.">
          </FormRow>
          <FormRow title="비밀번호 확인">
            <input ref="loginPwConfirmElRef" class="form-row-input" type="password" placeholder="비밀번호 확인을 해주세요.">
          </FormRow>
          <FormRow title="이름">
            <input ref="nameElRef" class="form-row-input" type="text" placeholder="이름을 입력해주세요.">
          </FormRow>
          <FormRow title="닉네임">
            <input ref="nicknameElRef" class="form-row-input" type="text" placeholder="닉네임을 입력해주세요.">
          </FormRow>
          <FormRow title="전화번호">
            <input ref="cellphoneNoElRef" class="form-row-input" type="tel" maxlength="11" placeholder="전화번호를 입력해주세요.">
          </FormRow>
          <FormRow title="이메일">
            <input ref="emailElRef" class="form-row-input" type="email" placeholder="이메일을 입력해주세요.">
          </FormRow>
          <FormRow title="가입">
            <div class="btns">
              <input type="submit" value="가입" class="btn-primary" />
            </div>
          </FormRow>
        </form>
        <div v-else>
          이미 로그인 상태입니다. <router-link class="btn-link" to="/">홈</router-link> 으로 이동
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted } from 'vue'
import { MainApi } from '../apis/'
import { Router } from 'vue-router';

export default defineComponent({
  name: 'MemberJoinPage',
  props: {
    globalShare: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const profileImgElRef = ref<HTMLInputElement>();
    const loginIdElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    const loginPwConfirmElRef = ref<HTMLInputElement>();
    const nameElRef = ref<HTMLInputElement>();
    const nicknameElRef = ref<HTMLInputElement>();
    const cellphoneNoElRef = ref<HTMLInputElement>();
    const emailElRef = ref<HTMLInputElement>();
    
   
    function checkAndJoin() {
       // 아이디 체크
      if ( loginIdElRef.value == null ) {
        return;
      }
      
      const loginIdEl = loginIdElRef.value;
      loginIdEl.value = loginIdEl.value.trim();
      
      if ( loginIdEl.value.length == 0 ) {
        alert('아이디를 입력해주세요.');
        loginIdEl.focus();
        return;
      }
      // 비번 체크
      if ( loginPwElRef.value == null ) {
        return;
      }

      const loginPwEl = loginPwElRef.value;
      loginPwEl.value = loginPwEl.value.trim();
      
      if ( loginPwEl.value.length == 0 ) {
        alert('비밀번호를 입력해주세요.');
        loginPwEl.focus();
        return;
      }
      
      // 비번확인 체크
      if ( loginPwConfirmElRef.value == null ) {
        return;
      }

      const loginPwConfirmEl = loginPwConfirmElRef.value;
      
      if ( loginPwEl.value != loginPwConfirmEl.value ) {
        alert('로그인 비번이 일치하지 않습니다.');
        loginPwConfirmEl.focus();
        return;
      }

      // 이름 체크
      if ( nameElRef.value == null ) {
        return;
      }

      const nameEl = nameElRef.value;
      nameEl.value = nameEl.value.trim();

      if ( nameEl.value.length == 0 ) {
        alert('이름을 입력해주세요.');
        nameEl.focus();
        return;
      }

      // 닉네임 체크
      if ( nicknameElRef.value == null ) {
        return;
      }

      const nicknameEl = nicknameElRef.value;
      nicknameEl.value = nicknameEl.value.trim();
      
      if ( nicknameEl.value.length == 0 ) {
        alert('닉네임을 입력해주세요.');
        nicknameEl.focus();
        return;
      }
      
      // 전화번호 체크
      if ( cellphoneNoElRef.value == null ) {
        return;
      }

      const cellphoneNoEl = cellphoneNoElRef.value;
      cellphoneNoEl.value = cellphoneNoEl.value.trim();
      
      if ( cellphoneNoEl.value.length == 0 ) {
        alert('전화번호를 입력해주세요.');
        cellphoneNoEl.focus();
        return;
      }

      // 이메일 체크
      if ( emailElRef.value == null ) {
        return;
      }
      
      const emailEl = emailElRef.value;
      emailEl.value = emailEl.value.trim();
      
      if ( emailEl.value.length == 0 ) {
        alert('이메일을 입력해주세요.');
        emailEl.focus();
        return;
      }
      
      
      const startFileUpload = (onSuccess:Function) => {
        // ! => 반전
        // a = undefinded(or null) / !a = true / !!a = flase란 의미
        // ? => 만약 profileImgElRef.value?까지가 null이면 여기까지만 실행하겠다라는 의미
        // 즉, !!!profileImgElRef.value?.files의 의미는 해당 파일이 없는지 물어보는 것
        // 없으면 true
        if(!!!profileImgElRef.value?.files){
          onSuccess("");  //파일이 없으면 다음 과정 생략하고 onSuccess() 즉시 실행
          return;
        }

        mainApi.common_genFile_doUpload(profileImgElRef.value?.files[0])
        .then(axiosResponse => {
          
          if ( axiosResponse.data.fail ) {
            alert(axiosResponse.data.msg);
            return;
          }
          else{
            onSuccess(axiosResponse.data.body.genFileIdsStr);
          }
        });
      };


      //회원가입 join함수 시작
      //파일첨부기능 추가로 인해 로직 변경
      //join(loginIdEl.value, loginPwEl.value, nameEl.value, nicknameEl.value, cellphoneNoEl.value, emailEl.value);
      const startJoin = (genFileIdsStr:string) =>{
        join(loginIdEl.value, loginPwEl.value, nameEl.value, nicknameEl.value, cellphoneNoEl.value, emailEl.value, genFileIdsStr);
      };

      //startFileUpload 로직을 먼저 실행한 후
      //onSuccess 즉, startJoin를 실행한다. onSuccess = startJoin
      //실행 순서 : 1.첨부파일이 있는지 확인하고 업로드까지 진행하는 startFileUpload함수 종료 후 2.회원가입 join함수가 실행된다.
      startFileUpload(startJoin);


      
    }
    function join(loginId:string, loginPw:string, name:string, nickname:string, cellphoneNo:string, email:string, genFileIdsStr:string) {
      mainApi.member_doJoin(loginId, loginPw, name, nickname, cellphoneNo, email, genFileIdsStr)
        .then(axiosResponse => {
          
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          
          router.replace('/member/login?loginId=' + loginId)
        });
    }
    return {
      checkAndJoin,
      profileImgElRef,
      loginIdElRef,
      loginPwElRef,
      loginPwConfirmElRef,
      nameElRef,
      nicknameElRef,
      cellphoneNoElRef,
      emailElRef,
    }
  }
})
</script>

<style scoped>
</style> 