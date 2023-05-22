<template>
  <div>
    <h1>Welcome, {{ username }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppUsername',
  computed: {
    ...mapGetters(['username'])
    // username(){
    //   return this.$store.state.accounts.username
    // }
  },
};
</script>
