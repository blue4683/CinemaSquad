<template>
  <div>
    <h1>SignUp</h1>
    <div class="container">
    <form @submit.prevent="signUp(credentials)">
      <div class="input-box">
      <input type="text" id="username" v-model="credentials.username"><br>
      <label for="username">아이디</label>
      </div>
      <div class="input-box">
      <input type="password" id="password1" v-model="credentials.password1"><br>
      <label for="password1">비밀번호</label>
      </div>
      <div class="input-box">
      <input type="password" id="password2" v-model="credentials.password2">
      <label for="password2">비밀번호 확인</label>
      </div>
      <input type="submit" value="SignUp">
    </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'SignUpView',
  data() {
    return {
      credentials: {
        username: null,
        password1: null,
        password2: null,
      }
    }
  },
  methods: {
    ...mapActions(['signUp'])
  }
}
</script>

<style scoped>
.container{
  width: 400px;
}
.input-box{
  position:relative;
  margin:10px 0;
}
.input-box > input{
  background:transparent;
  border:none;
  border-bottom: solid 1px #ccc;
  padding:20px 0px 5px 0px;
  font-size:14pt;
  width:100%;
}
input::placeholder{
	color:transparent;
}
input:placeholder-shown + label{
  color:#aaa;
  font-size:14pt;
  top:15px;
}
input:focus + label, label{
  color:#8aa1a1;
  font-size:10pt;
  pointer-events: none;
  position: absolute;
  left:0px;
  top:0px;
  transition: all 0.2s ease ;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
}
input:focus, input:not(:placeholder-shown){
  border-bottom: solid 1px #8aa1a1;
  outline:none;
}
 input[type=submit]{
                background-color: #8aa1a1;
                border:none;
                color:white;
                border-radius: 5px;
                width:100%;
                height:35px;
                font-size: 14pt;
                margin-top:30px;
            }
</style>