<template>
  <div>
    <h1>Movie Page</h1>
    <MovieList />
    <hr>
  </div>
</template>

<script>
import MovieList from '@/components/Movie/MovieList.vue'

export default {
  name: 'BoardView',
  components: {
    MovieList,
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin // 로그인 여부
    }
  },
  created() {
    this.getMovies()
  },
  methods: {
    getMovies() {
        this.$store.dispatch('getMovies')
    }
  }
}
</script>

<style>

</style>
