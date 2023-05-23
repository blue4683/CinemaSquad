<template>
  <div class="home">
    <h1>HOME</h1>
    <AppUsername v-if="isLogin"/>
    <div class="container-fluid d-flex col mx-4">
      <div class="col-8 container">
        <div>
          <h2>Popular</h2>
          <div class="row row-cols-lg-3 row-cols-md-3 row-cols-1 g-4 mx-2">
            <MovieListItem v-for="movie in popularMovies" :key="movie.id" :movie="movie" />
          </div>
        </div>
        <div v-for="genre in genres" :key="genre.id">
          <h2> {{ genre.name }} </h2>
          <div class="row row-cols-lg-3 row-cols-md-3 row-cols-1 g-4 mx-2">
            <MovieListItem v-for="movie in getFilteredMovies[genre.id]" :key="movie.id" :movie="movie" />
          </div>
        </div>
      </div>
      <div class="col-4 container">
        <h2>Trend</h2>
        <div class="row row-cols-lg-2 row-cols-md-2 row-cols-2 g-4 mx-2">
          <MovieListItem v-for="movie in trendMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/Movie/MovieListItem'
import AppUsername from "@/components/common/AppUsername.vue";

export default {
  components: { 
    MovieListItem,
    AppUsername,
  },
  computed: {
    isLogin(){
      return this.$store.getters.isLogin;
    },
    isNotLogin(){
      return this.$store.getters.isNotLogin; 
    },
    popularMovies() {
      return this.$store.getters.popularMovies
    },
    trendMovies() {
      return this.$store.state.trendMovies
    },
    genres() {
      return this.$store.state.genres
    },
    getFilteredMovies() {
      return this.$store.getters.filteredMovies
    }

  },
  created() {
    this.getTrendMovies()
    this.getGenres()
    this.filteredMovies()
  },
  methods: {
    getTrendMovies() {
      this.$store.dispatch('getTrendMovies')
    },
    getGenres() {
      this.$store.dispatch('getGenres')
    },
    filteredMovies() {
      this.$store.dispatch('getFilteredMovies')
    },
  },
}  
</script>