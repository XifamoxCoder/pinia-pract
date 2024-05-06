<script setup lang="ts">
import Loader from '../components/Loader.vue'
import {ref} from "vue";
import {API_URL, useSearchStore} from "../stores/SearchStore.ts";
import Movie from "./Movie.vue";


const searchStore = useSearchStore()
const searchMovie = ref('')
</script>

<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input type="text" class="search-input" placeholder="Input movie" v-model="searchMovie">
  </form>
  <Loader v-if="searchStore.loader" />
  <div v-else>
    <p v-if="!searchStore.movies.length" >Not found</p>
    <Movie
      :is-search="true"
      v-else
      v-for="movie of searchStore.movies"
      :key="movie.id"
      :movie="movie" />
  </div>
</template>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>