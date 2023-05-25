<template>
  <div class="container">
    <div id="movie_logo" class="m-5"> 댓글들 </div>
    <div class="d-flex row">
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