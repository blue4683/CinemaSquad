<template>
  <div id="detail">
    <div class="d-flex w-75 container justify-content-center">
      <img v-if="movie" :src="image(movie.poster_path)" class="card-img-top w-25 mx-5" alt="...">
      <div class="detail-content d-inline-block">
        <h2>{{ movie?.title }}</h2>
        <p>내용 : {{ movie?.overview }}</p>
        <p>개봉일 : {{ movie?.release_date }}</p>
        <p>평점 : {{ movie?.vote_average }}</p>
        <p>장르 : {{movie_genres}}</p>
        <p>관심수 : {{ movie?.like_users.length }}</p>
        <button @click="likeMovie" v-if="currentUser.pk in movie.like_users">좋아요 취소</button>
        <button @click="likeMovie" v-else>좋아요</button>
      </div>
    </div>
    <div class="w-75 container justify-content-center">
      <CommentForm />
      <CommentListItem v-for="comment in comments" :key="comment.key" :comment="comment" />
    </div>
    <div v-if="isLogin">
      <h2>이 영화와 비슷한 추천 영화</h2>
      <div class="row row-cols-lg-5 row-cols-md-5 row-cols-2 g-4 mx-2">
        <MovieListItem v-for="movie in recommendMovies[0]" :key="movie.id" :movie="movie" />
      </div>
      <h2>랜덤 추천 영화</h2>
      <div class="row row-cols-lg-5 row-cols-md-5 row-cols-2 g-4 mx-2">
        <MovieListItem v-for="movie in recommendMovies[1]" :key="movie.id" :movie="movie" />
      </div>
    </div>
    <div v-else>
      <h2>로그인이 필요한 기능입니다.</h2>
    </div>
  </div>
</template>

<script>
import CommentForm from '@/components/Comment/CommentForm'
import CommentListItem from '@/components/Comment/CommentListItem'
import MovieListItem from '@/components/Movie/MovieListItem'
import {mapGetters} from 'vuex'

const IMG_URL = 'https://image.tmdb.org/t/p/original/'

export default {
  name: 'DetailView',
  data () {
    return {
      IMG_URL: IMG_URL,
    }
  },
  components: {
    CommentForm,
    CommentListItem,
    MovieListItem
  },
  computed: {
    comments() {
      return this.$store.state.comments.filter((comment) => {
        return comment.movie == this.$route.params.id
      })
    },
    movie() {
      return this.$store.state.movie
    },
    recommendMovies() {
      return this.$store.state.recommendMovies
    },
    isLogin(){
      return this.$store.getters.isLogin;
    },
    movie_genres() {
      const movie_genres = this.$store.state.movie.genre_ids
      const arr = []
      for (const genre of this.$store.state.genres) {
          if (movie_genres.includes(genre.id)) {
            arr.push(genre.name)
          }
      }
      return arr.join(', ')
    },
    genres() {
      return this.$store.state.genres
    },
    ...mapGetters(['currentUser'])
  },
  created() {
    this.$store.dispatch('getMovieDetail', this.$route.params.id)
    this.$store.dispatch('getComments')
    this.$store.dispatch('getGenres')
  },
  methods: {
    image(imgSrc) {
      return `${IMG_URL}${imgSrc}`
    },
    likeMovie() {
      this.$store.dispatch('likeMovie', this.movie.id)
    },
  },
}
</script>

<style>
  .detail-content {
    text-align: start;
  }
</style>