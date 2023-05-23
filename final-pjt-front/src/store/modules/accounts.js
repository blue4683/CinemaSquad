import axios from "axios";
import router from "@/router";
import _ from "lodash";

const API_URL = "http://127.0.0.1:8000";

export default {
  state: {
    token: null,
    // username: "",
    currentUser: {},
    profile: {},
  },
  getters: {
    // username: (state) => state.username,
    isLogin(state) {
      return state.token ? true : false;
    },
    isNotLogin(state) {
      return state.token ? false : true;
    },
    currentUser: (state) => state.currentUser,
    profile: (state) => state.profile,
    notMyAccount: (state) => {
      return state.profile.username !== state.currentUser.username;
    },
    isFollowing: (state) =>
      _.includes(state.profile.followers, state.currentUser.pk),
    authHeader: (state) => ({ Authorization: `Token ${state.token}` }),
  },
  mutations: {
    // signup & login -> 완료하면 토큰 발급
    SAVE_TOKEN(state, token) {
      state.token = token;
      // router.push({name : 'home'}) // store/index.js $router 접근 불가 -> import를 해야함
    },
    // CHANGE_USERNAME(state, username) {
    //   state.username = username;
    // },
    SET_CURRENT_USER: (state, user) => (state.currentUser = user),
    SET_PROFILE: (state, profile) => (state.profile = profile),
  },
  actions: {
    signUp({commit, dispatch}, payload) {
      const username = payload.username;
      const password1 = payload.password1;
      const password2 = payload.password2;

      if (password1 !== password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      axios({
        method: "post",
        url: `${API_URL}/accounts/signup/`,
        data: {
          username,
          password1,
          password2,
        },
      })
        .then((res) => {
          // console.log(res)
          // context.commit('SIGN_UP', res.data.key)
          commit("SAVE_TOKEN", res.data.key);
          dispatch('fetchCurrentUser')
          // context.commit("CHANGE_USERNAME", username);
          alert("회원가입 성공");
          router.push({ name: "home" });
        })
        .catch((err) => {
          alert("회원가입 실패");
          console.log(err);
        });
    },
    login({commit, dispatch}, payload) {
      const username = payload.username;
      const password = payload.password;

      axios({
        method: "post",
        url: `${API_URL}/accounts/login/`,
        data: {
          username,
          password,
        },
      })
        .then((res) => {
          commit("SAVE_TOKEN", res.data.key);
          // context.commit("CHANGE_USERNAME", username);
          dispatch('fetchCurrentUser')
          alert("로그인 성공");
          router.push({ name: "home" });
        })
        .catch((err) => {
          alert("로그인 실패");
          console.log(err);
        });
    },
    logout(context) {
      return axios
        .post(`${API_URL}/accounts/logout/`, `Token ${context.state.token}`)
        .then(() => {
          context.commit("SAVE_TOKEN", "");
          context.commit("CHANGE_USERNAME", "");
          return true;
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
    },
    followProfile({ commit, getters }, username) {
      axios({
        url: `${API_URL}/accounts/follow/${username}/`,
        method: "post",
        headers: getters.authHeader,
      })
        .then((res) => {
          console.log(res);
          commit("SET_PROFILE", res.data);
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
    fetchProfile({ commit, getters }, { username }) {
      /*
            GET: profile URL로 요청보내기
              성공하면
                state.profile에 저장
            */
      axios({
        url: `${API_URL}/accounts/profile/${username}/`,
        method: "get",
        headers: getters.authHeader,
      }).then((res) => {
        commit("SET_PROFILE", res.data);
      });
    },
    fetchCurrentUser({ commit, getters}) {
      /*
      GET: 사용자가 로그인 했다면(토큰이 있다면)
        currentUserInfo URL로 요청보내기
          성공하면
            state.cuurentUser에 저장
          실패하면(토큰이 잘못되었다면)
            기존 토큰 삭제
            LoginView로 이동
      */
     if (getters.isLogin) {
       axios({
          url: `${API_URL}/accounts/user/`,
          method: 'get',
          headers: getters.authHeader,
        })
          .then(res => commit('SET_CURRENT_USER', res.data))
          .catch(err => {
            console.log(err)
          })
      }
    },
  },
};

