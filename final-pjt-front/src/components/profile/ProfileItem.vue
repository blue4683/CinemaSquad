<template>
  <div>
    <div v-if="currentUser.username == profile.username" style="margin:0;">어서와요!</div>
    <div>{{ profile.username }}<span v-if="currentUser.username == profile.username" style="margin:0; font-size:50px"></span><span v-else style="margin:0; font-size:50px">의</span></div>
    <div class="d-flex align-items-center">
      <div v-if="currentUser.username != profile.username" style="margin:0; font-size:50px; font-weight: 500">프로필</div>
        <button v-if="currentUser.username != profile.username" id="follow" @click="followProfile(username)" class="heart-button" :class="{active : isFollowing}">
          <div class="heart-flip"></div>
          <span>follow<span>ed</span></span>
        </button>
    </div>
    <div>
      <span>{{ likeCount }} movie &nbsp;</span>
      <span>{{ followersCount }} followers &nbsp;</span>
      <span>{{ followingsCount }} followings</span>
      <div class="black-bg" v-if="openModal == true" @click="close($event)">
        <div class="white-bg">
            <h4>팔로우/팔로잉 목록</h4>
            <p>팔로우 목록</p>
            <span v-for="followers in profile.followers" :key="followers"><a :href="`http://localhost:8080/profile/${ Users[followers-1].username }`">{{Users[followers-1].username}}</a></span>
            <p>팔로잉 목록</p>
            <span v-for="following in profile.followings" :key="following"><a :href="`http://localhost:8080/profile/${ Users[following-1].username }`">{{Users[following-1].username}}</a><br></span>
            <button class="close">닫기</button>
        </div>
      </div>
      <h5 @click="openModal = true">팔로우/팔로잉 목록</h5>
      

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'profile_item',
  computed: {
      ...mapGetters(['profile', 'notMyAccount', 'isFollowing', 'currentUser']),
      likeCount() {
        return this.profile.like_movies?.length
      },
      followersCount() {
        return this.profile.followers?.length
      },
      followingsCount() {
        return this.profile.followings?.length
      },
      Users(){
        return this.$store.state.users
      }
    },
    
  data() {
    return {
      username: this.$route.params.username,
      openModal: false,
    }
  },
  methods: {
    ...mapActions(['fetchProfile', 'followProfile', 'updateImg']),
    getUsers() {
      this.$store.dispatch('getUsers')
    },
		close(event){
			if(event.target.classList.contains('black-bg') || event.target.classList.contains('close')){
				this.openModal = false;
			} else if (event.target.classList.contains('white-bg')){
				this.openModal = true;
			}
		}
  },
  created() {
    const payload = { username: this.$route.params.username }
    this.fetchProfile(payload)
    this.getUsers()
  },
  mounted() {
    document.querySelectorAll('.heart, .heart-button').forEach(button => button.addEventListener('click', () => button.classList.toggle('active')));
  }
}
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap';
  * {
    font-family: 'Noto Sans KR',  sans-serif;
    font-weight: 500;
  }

  span {
    font-family: 'Noto Sans KR',  sans-serif;
    font-weight: 700;
    font-size: 1.31rem;
  }
  #follow {
    height: 40px;
  }

  #follow span {
    font-size: 0.9rem;
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

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  * {
    box-sizing: inherit;
  }
  *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: "Inter", Arial;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #F6F8FF;
  }
  body .heart-button {
    margin-left: 20px;
    margin-top: 15px;
  }

  .black-bg {
	width: 100%; 
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	position: fixed;
  z-index: 10;
}

.white-bg {
	width: 90%;
	margin: 80px auto;
	background: white;
	border-radius: 5px;
	padding: 20px 0;
  z-index: 10;
}

.close {
	cursor: pointer;
	border: none;
	background: #6667AB;
	color: white;
	font-weight: bold;
	border-radius: 5px;
	padding: 5px 15px;
}

.close:hover {
	color:white;
	font-weight: bold;
	transform: scale(1.1);
	transition: all 0.5s;
}
</style>