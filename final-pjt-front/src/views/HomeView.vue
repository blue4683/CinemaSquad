<template>
  <div class="home">
    <h1>home</h1>
    <AppUsername v-if="isLogin"/>
  </div>
</template>

<script>
import AppUsername from "@/components/common/AppUsername.vue";

export default {
  components: { 
    AppUsername,
  },
  computed: {
    isLogin(){
      return this.$store.getters.isLogin;
    },
    isNotLogin(){
      return this.$store.getters.isNotLogin; 
    }
  },
}  
</script>