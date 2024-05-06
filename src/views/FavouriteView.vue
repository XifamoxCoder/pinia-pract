<script setup lang="ts">
import { useMovieStore } from '../stores/MovieStore.ts';
import Movie from '../components/Movie.vue'

const movieStore = useMovieStore();

</script>

<template>
  <main>
    <div class="movies">
      <div>
        <h3>Watched Movies</h3>
        <Movie
          v-for="movie of movieStore.watchedMovies"
          :key="movie.id"
          :movie="movie" />
      </div>
      <h3>All Movies (count: {{ movieStore.totalCountMovies }})</h3>
      <Movie
        v-for="movie of movieStore.movies"
        :key="movie.id"
        :movie="movie" />
    </div>
  </main>
</template>

<style>

</style>