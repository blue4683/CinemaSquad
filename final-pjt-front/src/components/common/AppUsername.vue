<template>
  <div>
    <h1>Welcome, {{ currentUser.username }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppUsername',
  computed: {
    ...mapGetters(['currentUser'])
    // username(){
    //   return this.$store.state.accounts.username
    // }
  },
};
</script>
