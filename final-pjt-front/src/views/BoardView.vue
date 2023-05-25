<template>
  <div>
    <h1>Movie Page</h1>
    <select v-model="selection" @change="selectGenre(selection)">
        <option value="total" selected="selected">전체</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
    </select>
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
  name: 'BoardView',
  data () {
    return {
      pageNum: 0,
      selection: 'total',
    }
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 12
    }
  },
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
    pageCount () {
      let listLeng = this.$store.state.selectMovies.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page
    },
    paginatedData () {
      const movies = this.$store.state.selectMovies
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      return movies.slice(start, end);
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

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
  background-color: #339157;
  color:white;
  border-radius: 5px;
  font-size: 13pt;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
