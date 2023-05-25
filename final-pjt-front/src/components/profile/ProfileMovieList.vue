<template>
  <div class="container">
    <h2 class="my-5 fw-bold">관심 영화</h2>
    <div class="d-flex row">
      <ProfileMovieItem v-for="movie in likeMovies"
      :movie="movie"
      :key="movie.id" />
    </div>
  </div>
</template>

<script>
import ProfileMovieItem from './ProfileMovieItem.vue'

export default {
  name: 'ProfileMovieList',
  components: {
    ProfileMovieItem,
  },
  props: {
    likeMovies: Array,
  }
}
</script>

<style>

  #movie_logo {
    font-family: 'Noto Sans KR',  sans-serif;
    font-weight: 700;
    font-size: 2.0rem
  }

  #movie_logo:after {
  content: "";
  display: block;
  width: 85px;
  border-bottom: 2px solid #bcbcbc;
  margin: 3px auto;
  position: absolute;
  margin-left: 3px;
  }
</style>