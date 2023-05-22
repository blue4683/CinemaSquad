<template>
	<div id="comment-form" class="mt-4">
    <form @submit.prevent="createComment">
      <star-rating :inline="true" :increment="0.5" :show-rating="false" v-model="user_rate" v-bind:star-size="30"></star-rating>
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="1" v-model="content"></textarea>
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'

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
  methods: {
    createComment() {
      const content = this.content
      const user_rate = this.user_rate * 2

      axios({
        method: 'post',
        url: `${API_URL}/movies/${ this.$route.params.id }/comments/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
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

<style>

</style>
