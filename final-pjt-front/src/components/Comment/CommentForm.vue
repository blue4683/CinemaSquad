<template>
	<div id="comment-form" class="mt-4">
    <form @submit.prevent="createComment" class="d-inline-flex my-auto">
      <star-rating :inline="true" :increment="0.5" :show-rating="false" v-model="user_rate" v-bind:star-size="30" class="me-2"></star-rating>
      <label for="content" class="my-auto me-3">내용 : </label>
      <input id="text" class="me-2" cols="30" rows="1" v-model="content">
      <input type="submit" id="submit" value="SUBMIT" class="btn btn-primary" style="font-size: 14px; line-height: 1.6; font-weight: 600;">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
import {mapGetters} from 'vuex'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommentListItem',
  components: {
    StarRating
  },
  data() {
    return {
      user_rate: 0,
      content: null,
    }
  },
  props: {
		movie: Object,
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  methods: {
    createComment() {
      if (!this.isLogin) {
        this.$router.push({name:'LogInView'})
        return
      }
      const content = this.content
      const user_rate = this.user_rate * 2

      axios({
        method: 'post',
        url: `${API_URL}/movies/${ this.$route.params.id }/comments/`,
        headers: {
          Authorization: `Token ${ this.$store.state.accounts.token }`
        },
        data: { user_rate, content },
      })
      .then(() => {
        this.$store.dispatch('getComments')
        this.user_rate = 0
        this.content = null
        alert('댓글 작성 완료')
      })
      .catch((error) => {
        console.log(error)
      })
    },
    setRating(user_rate) {
      this.user_rate = user_rate
    },
  }
}
</script>

<style scoped>

</style>
