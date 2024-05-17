<script setup lang="ts">
import {Movie, useMovieStore} from '../stores/MovieStore.ts';
import {useSearchStore} from "../stores/SearchStore.ts";
import {computed} from "vue";

const movieStore = useMovieStore();
const searchStore = useSearchStore();

interface Props {
  movie: Movie
  isSearch?: Boolean
}

const props = defineProps<Props>()

const watchedBtn = computed(() => {
  return !props.movie.isWatched ? 'btn movie-buttons-watched' : 'btn btn_green'
})

</script>

<template>
  <div class="movie">
    <img
      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
      :alt="movie.original_title"
      class="movie-img" />
    <div>
      <div class="movie-name">
        {{ movie.original_title }} {{ movie.id }}  ({{ movie.release_date }})
      </div>
      <span class="movie-overview">{{ movie.overview }}</span>
      <div class="movie-buttons" v-if="!isSearch">
        <button :class="watchedBtn" @click="movieStore.toggleWatched(movie.id)" >
          <span v-if="!movie.isWatched">Watched</span>
          <span v-else>Unwatched</span>
        </button>
        <button class="btn movie-buttons-delete" @click="searchStore.removeFromUserMovie(movie.id)" >Delete</button>
      </div>
      <div class="movie-buttons" v-else >
        <button v-if="!movie.isFavorite" class="btn btn_green" @click="searchStore.addToUserMovies(movie)">
          Add
        </button>
        <button v-else class="btn" @click="searchStore.removeFromUserMovie(movie.id)">
          Remove
        </button>
      </div>
    </div>
  </div>

</template>

<style lang="css" scoped>
.movie {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 30px;
  margin-bottom: 20px;
  border: 2px solid var(--black);
  padding: 10px;
  border-radius: 10px;
}

.movie-accept {
  margin-right: 10px;
}

.movie-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.movie-name {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.movie-overview {
  display: block;
  margin-bottom: 20px;
}

.movie-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.movie-buttons-watched {
  color: #fff;
  background: var(--blue);
}

.movie-buttons-watched__icon {
  width: 15px;
  margin-left: 10px;
}

.movie-buttons-delete {
  color: #fff;
  background: #ff2a2a;
}
</style>