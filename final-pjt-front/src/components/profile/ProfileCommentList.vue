<template>
  <div>
    <h2 class="my-5 fw-bold">댓글</h2>
    <div class="comment-container my-4">
      <ProfileCommentItem v-for="comment in CommentSet"
      :comment="comment"
      :key="comment.id" />
    </div>
  </div>
</template>

<script>
import ProfileCommentItem from './ProfileCommentItem.vue'

export default {
  name: 'ProfileCommentList',
  components: {
    ProfileCommentItem,
  },
  props: {
    CommentSet: Array,
  }
}
</script>

<style>
.comment-container {
  margin-left:15%;
  margin-right:15%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
}
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

  a{
    text-decoration: none;
  }
</style>