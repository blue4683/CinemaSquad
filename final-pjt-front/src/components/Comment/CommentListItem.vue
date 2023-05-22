<template>
  <div id="comment">
    <div class="container d-flex justify-content-center mt-4">
        <p>{{comment.user.username}} | {{comment.user_rate}} | {{comment.content}} | {{comment.like_users.length}} </p>
        <button v-if="comment.user.username != this.$store.state.username" @click="likeComment">좋아요</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CommentListItem',
  props: {
      comment: Object,
  },
  methods: {
    likeComment() {
        this.$store.dispatch('likeComment', this.comment.id)
    }
  }
}
</script>

<style>

</style>
