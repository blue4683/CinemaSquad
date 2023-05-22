<template>
  <div id="comment">
    <div class="container">
        <p>{{comment.user.username}} | {{comment.content}} </p>
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

  }
}
</script>

<style>

</style>
