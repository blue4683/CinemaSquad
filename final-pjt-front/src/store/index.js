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
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
      })
        .then((res) => {
        // console.log(res, context)
          context.commit('GET_MOVIES', res.data)
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
