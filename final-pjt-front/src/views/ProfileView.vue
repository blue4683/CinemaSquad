<template>
  <div>
    <div v-if="isLogin">
      <ProfileItem />
      <ProfileMovieList :likeMovies="profile.like_movies" />
      <ProfileCommentList :CommentSet="profile.comment_set" />
      <ProfileLikeCommentList :likeComments="profile.like_comments" />
    </div>
    <div v-else>
      <p>로그인이 필요한 페이지입니다.</p>
    </div>
  </div>
</template>

<script>
import ProfileItem from "../components/profile/ProfileItem.vue";
import ProfileMovieList from "../components/profile/ProfileMovieList.vue";
import ProfileCommentList from "../components/profile/ProfileCommentList.vue";
import ProfileLikeCommentList from "../components/profile/ProfileLikeCommentList.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProfileView",
  components: {
    ProfileItem,
    ProfileMovieList,
    ProfileCommentList,
    ProfileLikeCommentList,
  },
  computed: {
    ...mapGetters(["profile", "isLogin"]),
  },
  methods: {
    ...mapActions(["fetchProfile"]),
  },
  created() {
    const payload = { username: this.$route.params.username };
    this.fetchProfile(payload);
  },
};
</script>

<style></style>
