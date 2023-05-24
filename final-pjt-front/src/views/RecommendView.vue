<template>
  <div>
    <h1>Recommend Page</h1>
    <MovieList :pages="paginatedData"/>
    <hr>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
  </div>
</template>

<script>
import MovieList from '@/components/Movie/MovieList.vue'

export default {
  name: 'RecommendView',
  components: {
    MovieList,
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin // 로그인 여부
    },
    genres() {
      return this.$store.state.genres
    },
  },
  created() {
    this.getMovies()
    this.getGenres()
    this.selectGenre(this.selection)
  },
  methods: {
    getMovies() {
      this.$store.dispatch('getMovies')
    },
    getGenres() {
      this.$store.dispatch('getGenres')
    },
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },
    selectGenre(selection) {
      this.$store.dispatch('selectGenre', selection)
      this.pageNum = 0
    },
  }
}
</script>
