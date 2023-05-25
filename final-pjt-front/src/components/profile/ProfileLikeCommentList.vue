<template>
  <div>
    <h2 class="my-5 fw-bold">좋아요한 댓글</h2>
    <div class="comment-container my-4">
      <ProfileLikeCommentItem v-for="comment in likeComments"
      :comment="comment"
      :key="comment.id" />
    </div>
  </div>
</template>

<script>
import ProfileLikeCommentItem from './ProfileLikeCommentItem.vue'

export default {
  name: 'ProfileLikeCommentList',
  components: {
    ProfileLikeCommentItem,
  },
  props: {
    likeComments: Array,
  }
}
</script>

<style>

  #movie_logo {
    font-family: 'Noto Sans KR',  sans-serif;
    font-weight: 700;
    font-size: 2.0rem
  }

  #movie_logo:after {
  content: "";
  display: block;
  width: 85px;
  border-bottom: 2px solid #bcbcbc;
  margin: 3px auto;
  position: absolute;
  margin-left: 3px;
  }
</style>