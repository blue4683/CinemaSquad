<template>
  <div class="d-flex w-75 container justify-content-center">
    <img v-if="movie" :src="image(movie.poster_path)" class="card-img-top w-25 mx-5" alt="...">
    <div class="detail-content d-inline-block">
      <h2>{{ movie?.title }}</h2>
      <p>내용 : {{ movie?.overview }}</p>
      <p>개봉일 : {{ movie?.release_date }}</p>
      <p>평점 : {{ movie?.vote_average }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
const IMG_URL = 'https://image.tmdb.org/t/p/original/'

export default {
  name: 'DetailView',
  data() {
    return {
      IMG_URL: IMG_URL,
      movie: null,
    }
  },
  created() {
    this.getMovieDetail()
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ this.$route.params.id }/`,
      })
      .then((res) => {
        console.log(res)
        this.movie = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    image(imgSrc) {
      return `${IMG_URL}${imgSrc}`
    },
  }
}
</script>

<style>
  .detail-content {
    text-align: start;
  }
</style>