import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

import accounts from './modules/accounts'
import createPersistedState from 'vuex-persistedstate'


const API_URL = 'http://127.0.0.1:8000'
const TMDB_URL = 'https://api.themoviedb.org/3'
const API_KEY = '616fdab7e7973b6f3cb88fe4b99a8059'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    movies: [
    ],
    movie: null,
    comments: [
    ],
    trendMovies: [
    ],
    genres: [
    ],
    filteredMovies: [
    ],
    selectMovies: [
    ],
    recommendMovies: [
    ],
  },
  getters: {
    popularMovies(state) {
      const popularMovies = [...state.movies]
      popularMovies.sort((a, b) => {
        return b.popularity - a.popularity
      })
      return popularMovies.slice(0, 6)
    },
    filteredMovies(state) {
      return state.filteredMovies
    }

  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    GET_MOVIE_DETAIL(state, movie) {
      state.movie = movie
    },
    GET_COMMENTS(state, comments) {
      state.comments = comments
    },
    GET_TREND_MOVIES(state, movies) {
      state.trendMovies = movies.slice(0, 6)
    },
    GET_GENRES(state, genres) {
      state.genres = genres
    },
    GET_FILTERED_MOVIES(state) {
      const moviesOrigin = [...state.movies]
      for (let genre of state.genres) {
        const filteredMovies = moviesOrigin.filter((movie) => {
          return movie.genre_ids.includes(genre.id)
        })
        state.filteredMovies[genre.id] = _.sampleSize(filteredMovies, 6)
      }
    },
    GET_RECOMMEND_MOVIES(state, movie_list) {
      const recommendMovies = []
      for (const movies of movie_list) {
        const filteredMovies = state.movies.filter((movie) => {
          return movies.movie_id.includes(movie.movie_id)
        })
        recommendMovies.push(filteredMovies)
      }
      state.recommendMovies = recommendMovies
    },
    SELECT_GENRE(state, selection) {
      if (selection === 'total') {
        state.selectMovies = state.movies
        return
      }
      const selectMovies = state.movies.filter((movie) => {
        return movie.genre_ids.includes(selection)
      })
      state.selectMovies = selectMovies
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
      })
        .then((res) => {
          context.commit('GET_MOVIES', res.data)
        })
        .catch((err) => {
        console.log(err)
      })
    },
    getTrendMovies(context) {
      const time = 'week'
      axios({
        method: 'get',
        url: `${TMDB_URL}/trending/movie/${time}`,
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        }
      })
      .then((res) => {
        context.commit('GET_TREND_MOVIES', res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getMovieDetail(context, id) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ id }/`,
      })
      .then((res) => {
        context.commit('GET_MOVIE_DETAIL', res.data)
        if (context.getters.isLogin) {
          context.dispatch('getRecommendMovies')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    likeMovie(context, id) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ id }/likes`,
        headers: {
          Authorization: `Token ${ context.state.accounts.token }`
        },
      })
      .then(() => {
        context.dispatch('getMovieDetail', id)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getRecommendMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/recommend/${this.state.movie.movie_id}/10`,
        headers: {
          Authorization: `Token ${ context.state.accounts.token }`
        },
      })
      .then((res) => {
        context.commit('GET_RECOMMEND_MOVIES', res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          return
        }
      })
    },
    getGenres(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/genres`,
      })
      .then((res) => {
        context.commit('GET_GENRES', res.data)
      })
    },
    getFilteredMovies(context) {
      context.commit('GET_FILTERED_MOVIES')
    },
    getComments(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/comments`,
      })
        .then((res) => {
          context.commit('GET_COMMENTS', res.data)
        })
        .catch((err) => {
        console.log(err)
      })
    },
    likeComment(context, id) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ id }/comments/likes`,
        headers: {
          Authorization: `Token ${ context.state.accounts.token }`
        },
      })
      .then(() => {
        context.dispatch('getComments')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    updateComment(context, data) {
      axios({
        method: 'put',
        url: `${API_URL}/movies/comments/${ data.id }/`,
        headers: {
          Authorization: `Token ${ context.state.accounts.token }`
        },
        data: {
          content: data.content,
          user_rate: data.user_rate,
        }
      })
      .then(() => {
        context.dispatch('getComments')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteComment(context, id) {
      axios({
        method: 'delete',
        url: `${API_URL}/movies/comments/${ id }`,
        headers: {
          Authorization: `Token ${ context.state.accounts.token }`
        },
      })
      .then(() => {
        context.dispatch('getComments')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    selectGenre(context, selection) {
      context.commit('SELECT_GENRE', selection)
    },
  },
  modules: {
    accounts
  },
})
