<template>
  <div>
    <router-link :to="{ name: arrowBackRouteName }">
      <span class="arrow-back material-symbols-outlined"> arrow_back </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    arrowBackRouteName: String,
  },
};
</script>


<style scoped>
.arrow-back {
  color: black;
}
</style>