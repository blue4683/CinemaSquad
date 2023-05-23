import Vue from 'vue'
import Vuex from 'vuex'

import accounts from './modules/accounts'
import createPersistedState from 'vuex-persistedstate'

import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

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
  },
  getters: {
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
    getMovieDetail(context, id) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${ id }/`,
      })
      .then((res) => {
        context.commit('GET_MOVIE_DETAIL', res.data)
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
  },
  modules: {
    accounts
  },
})
