<template>
	<div id="comment-form" class="mt-4">
    <form @submit.prevent="createComment">
      <input type="number" v-model="user_rate">
      <label for="content">내용 : </label>
      <textarea id="content" cols="30" rows="1" v-model="content"></textarea>
      <input type="submit" id="submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommentListItem',
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
      const user_rate = this.user_rate

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
    }
  }
}
</script>

<style>

</style>
