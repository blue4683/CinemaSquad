<template>
  <div>
    <h1>LogIn Page</h1>
    <form @submit.prevent="loginUser">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password"> password : </label>
      <input type="password" id="password" v-model="password"><br>

      <input type="submit" value="logIn">
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    ...mapActions(['login']),
    loginUser() {
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }

      this.login(payload)

    }
  }
}
</script>
