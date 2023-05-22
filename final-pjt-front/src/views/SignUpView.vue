<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="signUp(credentials)">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="credentials.username"><br>

      <label for="password1"> password : </label>
      <input type="password" id="password1" v-model="credentials.password1"><br>

      <label for="password2"> password confirmation : </label>
      <input type="password" id="password2" v-model="credentials.password2">
      
      <input type="submit" value="SignUp">
    </form>
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
