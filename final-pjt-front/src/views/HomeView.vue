<template>
  <div class="home">
    <h1>home</h1>
    <div>
      <div class="id-input-wrapper">
        <input type="text" v-model="userid" />
      </div>
      <div class="password-input-wrapper">
        <input type="password" v-model="userpw" />
      </div>
      <button v-on:click="login">로그인</button>
    </div>
    <div>
      <button v-on:click="logout">로그아웃</button>
    </div>
    <div>
      <h2>회원가입</h2>
      <div>
        <input type="text" v-model="signupID" placeholder="아이디를 입력하세요">
      </div>
      <div>
        <input type="password" v-model="signupPW1" placeholder="비밀번호를 입력하세요">
      </div>
      <div>
        <input type="password" v-model="signupPW2" placeholder="비밀번호를 다시 입력하세요"/>
      </div>
      <button v-on:click="signup">회원가입</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userid: "",
      userpw: "",
      signupID: "",
      signupPW1: "",
      signupPW2: "",
      URL: "http://localhost:8000/",
      TOKEN: "",
    };
  },
  methods: {
    async login() {
      try {
        console.log(this.userid);
        console.log(this.userpw);
        const response = await axios.post(this.URL + "accounts/login/", {
          username: this.userid,
          password: this.userpw,
        });
        if (response.data) {
          console.log(response.data);
          this.TOKEN = response.data.key;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        const response = await axios.post(this.URL + "accounts/logout/");
        if (response.data) {
          console.log(response.data);
          this.TOKEN = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async signup() {
      if (this.signupPW1 !== this.signupPW2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      try {
        const response = await axios.post(this.URL + "accounts/signup/", {
          username: this.signupID,
          password1: this.signupPW1,
          password2: this.signupPW2,
        });
        console.log(response.data);
        this.TOKEN = response.data.key;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>