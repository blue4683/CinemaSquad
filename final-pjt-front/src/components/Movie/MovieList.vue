<template>
  <div class="row row-cols-lg-6 row-cols-md-3 row-cols-1 g-4 mx-2">
    <MovieListItem v-for="movie in pages" :key="movie.key" :movie="movie" />
  </div>
</template>

<script>
import MovieListItem from '@/components/Movie/MovieListItem'

export default {
  name: 'MovieList',
  components: {
    MovieListItem,
  },
  props: {
    pages: Array,
  },
  computed: {

  }
}
</script>

