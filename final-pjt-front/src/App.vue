<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/movies">Movies</router-link>
      <router-link to="/login" v-if="isNotLogin"> | Login</router-link>
      <router-link to="/signup" v-if="isNotLogin"> | SignUp</router-link>
      <!-- <router-link :to="{ name : 'profile', params: { username: currentUser.username} }" v-if="isLogin">나의 프로필</router-link> -->
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin(){
      return this.$store.getters.isLogin;
    },
    isNotLogin(){
      return this.$store.getters.isNotLogin; 
    }
  }
}
</script>

<style>
#app {
  font-family: 'Mulish', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
