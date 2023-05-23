<template>
  <div id="comment">
    <div>
        <div v-if="!isUpdated" class="container d-flex justify-content-center mt-3">
          <p>{{comment.user.username}} | {{comment.user_rate}} | {{comment.content}} | {{comment.like_users.length}} </p>
          <button v-if="comment.user.username != this.$store.state.accounts.username" @click="likeComment">좋아요</button>
          <button v-if="comment.user.username === this.$store.state.accounts.username" @click="updateState">수정</button>
          <button v-if="comment.user.username === this.$store.state.accounts.username" @click="deleteComment">삭제</button>
        </div>
        <form v-if="isUpdated" @submit.prevent="updateComment">
          <label for="content">수정 내용 : </label>
          <textarea id="content" cols="30" rows="1" v-model="content"></textarea>
          <input type="submit" id="submit" value="수정">
        </form>
    </div>
  </div>
</template>

<script>

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
  methods: {
    likeComment() {
      this.$store.dispatch('likeComment', this.comment.id)
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

<style>

</style>
