<template>
  <div id="comment" class="col-3 ml-auto rounded-3">
        <div v-if="!isUpdated" class="container mt-3">
          <div v-show="isLogin" class=" d-flex justify-content-between mx-2 container">
            <p v-show="isLogin"><router-link :to="{ name: 'profile', params: {username: comment.user.username }}">{{comment.user.username}}</router-link></p>
            <p v-show="!isLogin"><router-link :to="{ name: 'LogInView', params: {username: comment.user.username }}">{{comment.user.username}}</router-link></p>
            <p><span style="color: #ffc107;">&bigstar;</span>  {{comment.user_rate}}</p>
          </div>
          <hr>
          <div class="container">
            <p>{{ comment.content }}</p>
          </div>
          <hr>
          <div class="container d-flex justify-content-between mb-2">
            <p class="my-auto"><span style="color: #ea4673;">&hearts;</span>  {{comment.like_users.length}}</p>
            <button v-if="comment.user.username != currentUser.username" @click="likeComment" id="follow" class="heart-button" :class="{active:comment.like_users.includes(currentUser.pk)}">
              <div class="heart-flip"></div>
              <span>Like<span>d</span></span>
            </button>
            <div v-if="comment.user.username === currentUser.username" class="d-flex justify-content-between">
              <button @click="updateState" class="btn btn-success me-2" style="font-size: 14px; line-height: 1.6; font-weight: 600;"><span>UPDATE</span></button>
              <button @click="deleteComment" class="btn btn-warning" style="font-size: 14px; line-height: 1.6; font-weight: 600;"><span>DELETE</span></button>
            </div>
          </div>
        </div>
        <form v-if="isUpdated" @submit.prevent="updateComment">
          <label for="content">수정 내용 : </label>
          <textarea id="content" cols="30" rows="1" v-model="content"></textarea>
          <input type="submit" id="submit" class="btn btn-success me-2" value="UPDATE">
        </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'CommentListItem',
  data() {
    return {
        isUpdated: false,
        content: null,
    }
  },
  props: {
      comment: Object,
  },
  computed: {
    ...mapGetters(['currentUser', 'isLogin'])
  },
  methods: {
    likeComment() {
      if (this.isLogin) {
        this.$store.dispatch('likeComment', this.comment.id)
      }
      else {
        this.$router.push({name:'LogInView'})
      }
    },
    updateComment() {
      if (!this.content) {
        alert('수정할 내용을 입력해주세요')
        return
      }
      const data = {
        id: this.comment.id,
        user_rate: this.comment.user_rate,
        content: this.content
      }
      this.$store.dispatch('updateComment', data)
      this.content = null
      this.updateState()
    },
    deleteComment() {
      this.$store.dispatch('deleteComment', this.comment.id)
    },
    updateState() {
      this.isUpdated = !this.isUpdated
    }
  }
}
</script>

<style scoped>
  #comment {
    width: 300px;
    height: 230px;
    margin-top: auto;
  }

 #follow {
    margin-bottom: 5px;
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
</style>
