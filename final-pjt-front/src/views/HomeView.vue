<template>
  <div class="container">
    <div>
      <h2 class="mb-4 fw-bold"> Popular </h2>
      <vue-glide type="carousel" :autoplay="3000" :perView="4">
        <vue-glide-slide
          v-for="(movie, index) in popularMovies"
          :key="index">
          <div class="number position-absolute"> {{index + 1}} </div>
          <MovieListItem :movie="movie"/>
        </vue-glide-slide>
        <template slot="control">
          <button class="btn-hover color-1 mx-4 mb-4" data-glide-dir="<">PREV</button>
          <button class="btn-hover color-1 mx-4 mb-4" data-glide-dir=">">NEXT</button>
      </template>
      </vue-glide>
    </div>
    <div>
      <h2 class="mb-4 fw-bold"> Trend </h2>
      <vue-glide type="carousel" :autoplay="3000" :perView="4">
        <vue-glide-slide
          v-for="(movie, index) in trendMovies"
          :key="index">
          <div class="number position-absolute"> {{index + 1}} </div>
          <MovieListItem :movie="movie"/>
        </vue-glide-slide>
        <template slot="control">
          <button class="btn-hover color-1 mx-4 mb-4" data-glide-dir="<">PREV</button>
          <button class="btn-hover color-1 mx-4 mb-4" data-glide-dir=">">NEXT</button>
      </template>
      </vue-glide>
    </div>
    <div v-for="genre in genres" :key="genre.id">
        <h2 class="mb-4 fw-bold"> {{ genre.name }} </h2>
      <vue-glide type="carousel" :autoplay="3000" :perView="4">
        <vue-glide-slide
          v-for="(movie, index) in getFilteredMovies[genre.id]"
          :key="index">
          <div class="number position-absolute"> {{index + 1}} </div>
          <MovieListItem :movie="movie"/>
        </vue-glide-slide>
        <template slot="control">
          <button class="btn-hover color-1 mx-4 mb-4" data-glide-dir="<">PREV</button>
          <button class="btn-hover color-1 mx-4 mb-4" data-glide-dir=">">NEXT</button>
      </template>
      </vue-glide>
    </div>
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import MovieListItem from '@/components/Movie/MovieListItem'
const IMG_URL = 'https://image.tmdb.org/t/p/original/'


export default {
  name: "HomeView",
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    MovieListItem
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

<style>
.number {
  background: rgba(53, 53, 53, 0.706);
  color: white;
  border-radius: 8px;
  opacity: 0.9;
  width: 25px;
  height: 25px;
}

.btn-hover {
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-1 {
    background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
</style>
