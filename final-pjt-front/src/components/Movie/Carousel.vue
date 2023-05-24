<!-- CarouselView.vue -->
<template>
  <div class="container">
    <div class="card-carousel" ref="carousel">
      <div class="card" v-for="(genre, index) in genres" :key="index">
        <h2>{{ genre.name }}</h2>
        <div class="carousel-indicators">
          <button
            v-for="(movie, movieIndex) in getFilteredMovies(genre.id)"
            :key="movieIndex"
            type="button"
            :data-bs-target="'#carouselExampleIndicators-' + genre.id"
            :data-bs-slide-to="movieIndex"
            :class="{ active: movieIndex === 0 }"
            :aria-current="movieIndex === 0 ? 'true' : null"
            :aria-label="`Slide ${movieIndex + 1}`"
          ></button>
        </div>
        <div class="carousel-inner">
          <div
            v-for="(movie, movieIndex) in getFilteredMovies(genre.id)"
            :key="movie.id"
            :class="{ 'carousel-item': true, active: movieIndex === 0 }"
          >
            <img :src="image(movie.poster_path)" class="d-block w-100" :alt="movie.title" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          :href="'#carouselExampleIndicators-' + genre.id"
          role="button"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          :href="'#carouselExampleIndicators-' + genre.id"
          role="button"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselView",
  computed: {
    genres() {
      return this.$store.state.genres;
    },
  },
  methods: {
    getFilteredMovies(genreId) {
      const movies = this.$store.state.movies;
      const filteredMovies = movies.filter((movie) => movie.genre_ids.includes(genreId));
      return filteredMovies.slice(0, 6);
    },
    image(imgSrc) {
      return `https://image.tmdb.org/t/p/original/${imgSrc}`;
    },
  },
  mounted() {
    // Bootstrap Carousel 초기화
    const carousel = new window.bootstrap.Carousel(this.$refs.carousel, {
      interval: 2000, // 원하는 간격(ms)으로 설정
      pause: "hover", // 마우스 호버 시 슬라이드 멈춤 설정
    });
    carousel.cycle();
  },
};
</script>

<style>
.card-carousel {
  margin-bottom: 20px;
}

.card {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.carousel-inner {
  margin-top: 10px;
}

.carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 24px;
  height: 24px;
}

.carousel-control-prev,
.carousel-control-next {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.carousel-control-prev-icon::before,
.carousel-control-next-icon::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
}

.carousel-control-prev-icon {
  transform: rotate(-45deg);
  margin-right: 2px;
}

.carousel-control-next-icon {
  transform: rotate(135deg);
  margin-left: 2px;
}
</style>
