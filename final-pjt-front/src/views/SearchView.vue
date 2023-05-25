<template>
  <div class="container">
    <h2>Search</h2>
    <div class="inner">
      <input type="text" v-model="search" placeholder="검색어를 입력하세요" @keyup.enter="sortedData">
      <!-- <button @click="sortedData" class="btn btn-success">검색</button> -->
      <div class="searching" @click="sortedData">
        <img src="../assets/search.png">
      </div>
    </div>
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
/* .form-control{
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  resize: vertical;
} */
img{
  width: 20px;
  height: 20px;
}
.inner{
  position: relative;
  width: 600px;
  height: 40px;
  margin: 20px auto;
  border: 1px solid #bdc1c6;
  border-radius: 20px;
}
input{
  width: 90%;
  height: 100%;
  border-color: #bdc1c6;
  border: 0px;
  font-size: 16px;
  outline: none;
}
.searching{
  position: absolute;
  right: 30px;
  top: 15%;
}
</style>