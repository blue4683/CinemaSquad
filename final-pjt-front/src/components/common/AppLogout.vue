<template>
  <div>
    <button type="button" class="btn btn-link" @click="logout">로그아웃</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout").then((flag) => {
        if (flag) {
          alert("로그아웃 성공")
        } else {
          alert("로그아웃 실패");
        }
      });
    },
  },
};
</script>