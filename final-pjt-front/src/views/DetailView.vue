<template>
  <div id="detail">
    <div class="d-flex w-75 container justify-content-center">
      <img v-if="movie" :src="image(movie.poster_path)" class="card-img-top w-25 mx-5" alt="...">
      <div class="detail-content d-inline-block py-auto">
        <h1 class="fw-bold">{{ movie?.title }}</h1>
        <p>{{ movie?.release_date.split('-')[0] }}・{{movie_genres}}</p>
        <p>{{ movie?.overview }}</p>
        <p><span style="color: #ffc107;">&bigstar;</span> {{ movie?.vote_average }} ({{ movie?.vote_count }}명)</p>
        <div class="d-inline-flex py-auto">
          <p class="my-auto">관심수 : {{ movie?.like_users.length }}</p>
          <button id="follow" @click="likeMovie" class="heart-button my-auto mx-4" :class="{active : movie.like_users.includes(currentUser.pk)}">
              <div class="heart-flip"></div>
              <span>Like<span>d</span></span>
          </button>
        </div>
        <div>
          <CommentForm/>
        </div>
      </div>
    </div>
    <div class="w-75 container justify-content-center row d-inline-flex my-4">
      <CommentListItem v-for="comment in comments" :key="comment.key" :comment="comment" />
    </div>
    <br>
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
      <router-link :to="{
        name: 'LogInView',
      }">
        <h2>영화를 추천받고 싶다면 로그인을 해주세요</h2>
      </router-link>
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
    ...mapGetters(['currentUser']),
    movie_genres() {
      const movie_genres = this.$store.state.movie.genre_ids
      const arr = []
      for (const genre of this.$store.state.genres) {
          if (movie_genres.includes(genre.id)) {
            arr.push(genre.name)
          }
      }
      return arr.join('・')
    },
    genres() {
      return this.$store.state.genres
    },
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
      if (this.isLogin) {
        this.$store.dispatch('likeMovie', this.movie.id)
      }
      else {
        this.$router.push({name:'LogInView'})
      }
    },
  },
}
</script>

<style scoped>
  .detail-content {
    text-align: start;
  }

   #follow {
    margin-bottom: 5px;
  }

  #follow span {
    font-size: 0.9rem;
  }

  p {
    font-size: 20px;
  }

  .heart,
  .heart-button {
    cursor: pointer;
    outline: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  .heart .heart-flip,
  .heart-button .heart-flip {
    --base: 32px;
    --duration: .6s;
    --active: #ea4673;
    --inactive: #d1d6ee;
    width: var(--base);
    height: calc(var(--base) + var(--base) / 2);
    border-radius: calc(var(--base) / 2) calc(var(--base) / 2) 0 0;
    position: relative;
    transform-origin: 50% 66.66%;
    transform-style: preserve-3d;
    transform: rotate(var(--rotate, -45deg));
    transition: background var(--duration), transform var(--duration) ease;
    background: var(--heart-background, var(--inactive));
  }
  .heart .heart-flip:before, .heart .heart-flip:after,
  .heart-button .heart-flip:before,
  .heart-button .heart-flip:after {
    content: "";
    width: calc(var(--base) / 2);
    height: var(--base);
    border-radius: var(--pseudo-border-radius, calc(var(--base) / 2) 0 0 calc(var(--base) / 2));
    position: absolute;
    left: var(--pseudo-left, -50%);
    transform-origin: var(--pseudo-origin, 100%) 50%;
    bottom: 0;
    background: var(--heart-background, var(--inactive));
    filter: brightness(var(--pseudo-filter, 50%));
    transform: translateX(1%) rotateY(var(--pseudo-rotate, 90deg)) translateZ(0);
    transition: background var(--duration), transform var(--duration) ease, filter var(--duration);
  }
  .heart .heart-flip:after,
  .heart-button .heart-flip:after {
    --pseudo-border-radius: 0 calc(var(--base) / 2) calc(var(--base) / 2) 0;
    --pseudo-left: 100%;
    --pseudo-origin: 0;
    filter: brightness(var(--pseudo-filter-second, 100%));
    transform: translateX(-1%) rotateY(var(--pseudo-rotate-second, 0deg)) translateZ(0);
  }
  .heart.active .heart-flip,
  .heart-button.active .heart-flip {
    --rotate: 45deg;
    --pseudo-filter: 100%;
    --pseudo-filter-second: 50%;
    --pseudo-rotate: 0deg;
    --pseudo-rotate-second: 90deg;
    --heart-background: var(--active);
  }

  .heart {
    background: none;
    border: none;
    padding: 0;
    transform: scale(var(--button-scale, 1)) translateZ(0);
    transition: transform 0.2s;
  }
  .heart:active {
    --button-scale: .95;
  }

  .heart-button {
    --duration: .4s;
    --color: #404660;
    --color-hover: #2b3044;
    --color-active: #fff;
    --border: #d1d6ee;
    --border-hover: #bbc1e1;
    --border-active: #ea4673;
    --background: #fff;
    --background-active: #ea4673;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.6;
    font-weight: 600;
    padding: 6px 16px;
    border-radius: 7px;
    color: var(--button-color, var(--color));
    border: 1px solid var(--button-border, var(--border));
    background: var(--button-background, var(--background));
    transform: scale(var(--button-scale, 1)) translateZ(0);
    transition: background var(--duration), border-color var(--duration), color var(--duration), transform 0.2s;
  }
  .heart-button .heart-flip {
    --base: 8px;
    --active: #fff;
    --inactive: #bbc1e1;
    display: inline-block;
    vertical-align: top;
    margin: 4px 6px 0 0;
  }
  .heart-button span {
    display: inline-block;
    vertical-align: top;
  }
  .heart-button > span {
    transform: translateX(var(--text-x, 4px));
    transition: transform var(--duration);
  }
  .heart-button > span span {
    display: inline-block;
    vertical-align: top;
    opacity: var(--span-opacity, 0);
    transform: translateX(var(--span-x, 4px));
    transition: opacity var(--duration), transform var(--duration);
  }
  .heart-button:active {
    --button-scale: .95;
  }
  .heart-button:hover {
    --button-color: var(--color-hover);
    --button-border: var(--border-hover);
  }
  .heart-button.active {
    --text-x: 0;
    --button-color: var(--color-active);
    --button-border: var(--border-active);
    --button-background: var(--background-active);
    --span-opacity: 1;
    --span-x: 0;
  }
</style>