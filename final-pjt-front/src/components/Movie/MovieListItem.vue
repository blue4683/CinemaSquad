<template>
  <div class="col-3 movie">
    <router-link :to="{
        name: 'DetailView',
        params: {id: movie.id }
      }">
      <div class="containers" :style="`background: url('https://image.tmdb.org/t/p/original${movie.poster_path}')`">
        <div class="overlay">
          <div class = "items"></div>
          <div class = "items head">
            <p>{{ movie.title }}</p>
            <hr>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'ProfileMovieItem',
  props: {
    movie: Object,
  },
  created() {

  }
}
</script>

<style scoped>

  .movie {
    margin-bottom: 30px;
  }

  img {
    width: 300px;
    height: 450px;
    position: absolute;
    border-radius: 9px;
  }

  h4 {
    text-align: center;
  }

  body {
  background-color: #FEF5DF;
  }

  p {
    font-family: 'Noto Sans KR',  sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
  }

  a {
    text-decoration: none;
  }
.containers {
  background-repeat: no-repeat;
  background-size: cover !important;
  width: 300px;
  height: 450px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  background-color: black;
  background-size: cover;
  cursor: pointer;
  -webkit-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
  border-radius: 9px;
}
.overlay {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr 2fr 1fr;
  background: rgba(53, 53, 53, 0.706);
  color: #ffffff;
  opacity: 0;
  transition: all 1.0s;
  font-family: 'Noto Sans KR',  sans-serif;
  font-weight: 500;
  border-radius: 9px;
}

.items {
  /* padding-left: 20px; */
  letter-spacing: 3px;
}

.head {
  font-size: 30px;
  line-height: 40px;
  transform: translateY(40px);
  transition: all 0.7s;
}

.head hr {
  display: block;
  width: 0;
  border: none;
  border-bottom: solid 2px #FEF5DF;
  position: absolute;
  left: 20px;
  transition: all 0.5s;
}

.price {
  font-size: 22px;
  line-height: 10px;
  font-weight: bold;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s;
}
.price .old {
  text-decoration: line-through;
  color: #b3b3b3;
}

.cart {
  font-size: 12px;
  opacity: 0;
  letter-spacing: 1px;
  font-family: "Lato", sans-serif;
  transform: translateY(40px);
  transition: all 0.7s;
}
.cart i {
  font-size: 16px;
}
.cart span {
  margin-left: 10px;
}

.containers:hover .overlay {
  opacity: 1;
}
/* .containers:hover .overlay .head {
  transform: translateY(0px);
} */
/* .containers:hover .overlay hr {
  width: 75px;
  transition-delay: 0.4s;
} */
/* .containers:hover .overlay .price {
  transform: translateY(0px);
  transition-delay: 0.3s;
  opacity: 1;
} */
/* .containers:hover .overlay .cart {
  transform: translateY(0px);
  transition-delay: 0.6s;
  opacity: 1;
} */
</style>