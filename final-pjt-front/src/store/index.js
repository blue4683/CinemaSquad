import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

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
    token: null,
    username: "",
    comments: [
    ],
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    isNotLogin(state){
      return state.token ? false : true
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
    // signup & login -> 완료하면 토큰 발급
    SAVE_TOKEN(state, token) {
      state.token = token
      // router.push({name : 'home'}) // store/index.js $router 접근 불가 -> import를 해야함
    },
    CHANGE_USERNAME(state, newUsername){
      state.username = newUsername;
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
          Authorization: `Token ${ context.state.token }`
        },
      })
      .then(() => {
        context.dispatch('getMovieDetail', id)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      if (password1 !== password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
        .then((res) => {
          // console.log(res)
          // context.commit('SIGN_UP', res.data.key)
          context.commit('SAVE_TOKEN', res.data.key)
          context.commit("CHANGE_USERNAME", username)
          alert("회원가입 성공")
          router.push({name : 'home'}) 
        })
        .catch((err) => {
          alert("회원가입 실패")
          console.log(err)
      })
    },
    login(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
        .then((res) => {
        context.commit('SAVE_TOKEN', res.data.key)
        context.commit("CHANGE_USERNAME", username)
        alert("로그인 성공")  
        router.push({name : 'home'}) 
        })
      .catch((err) => {
        alert("로그인 실패")
        console.log(err)})
    },
    logout(context) {
      return axios
        .post(
          `${API_URL}/accounts/logout/`,
          `Token ${context.state.token}`
        )
        .then(() => {
          context.commit("SAVE_TOKEN", "");
          context.commit("CHANGE_USERNAME", "")
          return true;
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
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
          Authorization: `Token ${ context.state.token }`
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
          Authorization: `Token ${ context.state.token }`
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
          Authorization: `Token ${ context.state.token }`
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
  }
})
