<template>
	<div id="comment-form">
    <form @submit.prevent="createComment">
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
      content: null,
    }
  },
  props: {
		movie: Object,
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin // 로그인 여부
    }
  },
  methods: {
    createComment() {
      const content = this.content

      axios({
        method: 'post',
        url: `${API_URL}/movies/${ this.$route.params.id }/comments/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        },
        data: { content },
      })
      .then(() => {
        this.$store.dispatch('getComments')
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
