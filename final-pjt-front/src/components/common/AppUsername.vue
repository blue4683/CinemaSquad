<template>
  <div>
    <h1>Welcome, {{ username }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
};
</script>
