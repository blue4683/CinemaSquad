<template>
  <div class="container">
    <div v-for="genre in genres" :key="genre.id">
        <h2> {{ genre.name }} </h2>
      <vue-glide>
        <vue-glide-slide
          v-for="(movie, index) in getFilteredMovies[genre.id]"
          :key="index">
          <!-- <h2>{{ movie.title }}</h2> -->
          <router-link :to="{
            name: 'DetailView',
            params: {id: movie.id }
          }">
          <img v-if="movie" :src="image(movie.poster_path)" style="height: 500px; width: 350px" alt="...">
          </router-link>
        </vue-glide-slide>
        <template slot="control">
          <button data-glide-dir="<">prev</button>
          <button data-glide-dir=">">next</button>
      </template>
      </vue-glide>
    </div>
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
const IMG_URL = 'https://image.tmdb.org/t/p/original/'


export default {
  name: "AboutView",
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
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
    image(imgSrc) {
      return `${IMG_URL}${imgSrc}`
    },
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
};
</script>

<style></style>
