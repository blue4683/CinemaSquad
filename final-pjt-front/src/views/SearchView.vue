<template>
  <div class="container">
    <input class="form-control" type="text" v-model="search" placeholder="검색어를 입력하세요">
    <button @click="sortedData" class="btn btn-success">검색</button>
    <div class="d-flex row">
      <SearchMovieItem v-for="movie in listData"
      :movie="movie"
      :key="movie.id" />
    </div>
  </div>
</template>

<script>
import SearchMovieItem from "../components/search/SearchMovieItem.vue";
import {mapState} from 'vuex'
export default {
  name: "SearchView",
  components: {
    SearchMovieItem,
  },
  data(){
    return {
      search: '',
      listData: [],
      searchedData: [],
    }
  },
  computed : {
    ...mapState(['movies'])
  },
  // created() {
  //   this.listData = this.movies
  // },
  methods: {  
    sortedData(){
      this.listData = this.movies
      if (this.search){
        this.searchedData = this.listData.filter((data) => {
          return data.title.includes(this.search)
        })
        console.log(this.searchedData)
        return this.listData = this.searchedData
      } else {
        return this.listData = ''
      }
    }
  },
}
</script>

<style scoped>
.form-control{
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  resize: vertical;
}


</style>