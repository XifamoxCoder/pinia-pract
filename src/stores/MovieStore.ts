import {defineStore} from 'pinia'
import {computed, ref, watch} from "vue";

export interface Movie {
  id: number
  title: string
  overview: string
  original_title: string
  poster_path: string
  release_date: string
  isWatched: boolean
  isFavorite: boolean
}

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Movie[]>([])
  const moviesInLocalStorage = localStorage.getItem('movies')
  if (moviesInLocalStorage) {
    movies.value = JSON.parse(moviesInLocalStorage)._value
  }

  const watchedMovies = computed(() => {
    return movies.value.filter((el) => el.isWatched === true)
  })
  const totalCountMovies = computed(() => {
    return movies.value.length
  })


  const toggleWatched = (id: number) => {
    const movie = movies.value.find((el) => el.id === id)
    if (!movie) {
      console.log('movie not found')
      return false
    } else movie.isWatched = !movie.isWatched;
  }

  watch(() => movies, (state) => {
    localStorage.setItem('movies', JSON.stringify(state))
  }, {deep: true})

  return {
    movies, watchedMovies, totalCountMovies, toggleWatched
  }

})