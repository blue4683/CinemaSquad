<template>
  <article class="card-group">
    <div class="card">
      <router-link
      :to="{
        name: 'DetailView',
        params: {id: movie.id }
      }">
        <img v-if="image(movie.poster_path)" :src="image(movie.poster_path)" class="card-img-top" alt="...">
      </router-link>
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text card-content">{{movie.overview}}</p>
      </div>
    </div>
  </article>
</template>

<script>
const IMG_URL = 'https://image.tmdb.org/t/p/original/'

export default {
  name: 'MovieCard',
  data() {
    return {
      IMG_URL: IMG_URL,
      }
  },
  props: {
      movie: Object,
  },
  methods: {
    image(imgSrc) {
      return `${IMG_URL}${imgSrc}`
    }
  }
}
</script>

<style>
.card-content {
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
