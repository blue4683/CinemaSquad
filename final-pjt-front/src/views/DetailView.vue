<template>
  <div id="detail">
    <div class="d-flex w-75 container justify-content-center">
      <img v-if="movie" :src="image(movie.poster_path)" class="card-img-top w-25 mx-5" alt="...">
      <div class="detail-content d-inline-block">
        <h2>{{ movie?.title }}</h2>
        <p>내용 : {{ movie?.overview }}</p>
        <p>개봉일 : {{ movie?.release_date }}</p>
        <p>평점 : {{ movie?.vote_average }}</p>
        <p>관심수 : {{ movie?.like_users.length }}</p>
        <button @click="likeMovie">좋아요</button>
      </div>
    </div>
    <div class="w-75 container justify-content-center">
      <CommentForm />
      <CommentListItem v-for="comment in comments" :key="comment.key" :comment="comment" />
    </div>
  </div>
</template>

<script>
import CommentForm from '@/components/Comment/CommentForm'
import CommentListItem from '@/components/Comment/CommentListItem'

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
    CommentListItem
  },
  computed: {
    comments() {
      return this.$store.state.comments.filter((comment) => {
        return comment.movie == this.$route.params.id
      })
    },
    movie() {
      return this.$store.state.movie
    }
  },
  created() {
    this.$store.dispatch('getMovieDetail', this.$route.params.id)
    this.$store.dispatch('getComments')
  },
  methods: {
    image(imgSrc) {
      return `${IMG_URL}${imgSrc}`
    },
    likeMovie() {
      this.$store.dispatch('likeMovie', this.movie.id)
    }
  }
}
</script>

<style>
  .detail-content {
    text-align: start;
  }
</style>