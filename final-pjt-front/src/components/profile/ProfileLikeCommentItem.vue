<template>
  <div id="comment" class="col-3 ml-auto rounded-3 border border-2">
    <div v-if="!isUpdated" class="container mt-3">
      <div v-show="isLogin" class=" d-flex justify-content-between mx-2 container">
        <p class="fw-bold">
          <router-link
          :to="{
            name: 'DetailView',
            params: { id: comment.movie }
            }">{{movies[comment.movie-1].title}}</router-link>
        </p>
        <p><span style="color: #ffc107;">&bigstar;</span>  {{comment.user_rate}}</p>
      </div>
      <hr>
      <div class="container">
        <p>{{ comment.content }}</p>
      </div>
      <hr>
      <div class="container d-flex mb-2">
        <p class="my-auto"><span style="color: #ea4673;">&hearts;</span>  {{comment.like_users.length}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCommentItem',
  props: {
    comment: Object,
  },
  computed : {
    movies(){
        return this.$store.state.movies
    }
  }
}
</script>

<style scoped>
  #comment {
    width: 300px;
    height: 230px;
    margin-top: auto;
  }
</style>