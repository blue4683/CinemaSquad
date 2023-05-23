<template>
  <div class="col-3 movie">
    <div>
        <a :href="`http://localhost:8080/${ comment.movie }`">
        <p>{{movies[comment.movie-1].title}}-{{comment.user_rate}} : {{comment.content}}</p>
        </a>
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

</style>