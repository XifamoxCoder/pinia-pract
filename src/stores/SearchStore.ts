import {defineStore} from "pinia";
import {Movie, useMovieStore} from "./MovieStore.ts";
import router from "../router";
import {ref} from "vue";
import axios, {AxiosResponse} from "axios";
const url = `${process.env.VUE_APP_API_URL}search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=`;

export const useSearchStore = defineStore('searchStore', () => {
  const loader = ref<boolean>(false)
  const movies = ref<Movie[]>([])
  
  const getMovies = async(search: string) => {
    try {
      loader.value = true
      const res: AxiosResponse<any> = await axios.get(`${url}${search}`)
      movies.value = res.data.results
    } catch (e) {
      console.error(e)
    } finally {
      loader.value = false
    }
  }

  const addToUserMovies = (movie: Movie) => {
      const movieStore = useMovieStore()
      movieStore.movies.push({...movie, isWatched: false, isFavorite: true})
      movie.isFavorite = true
      router.push('/')
    }
    const removeFromUserMovie = (id: number) => {
      const movieStore = useMovieStore()
      const searchStore = useSearchStore()
      const movie = searchStore.movies.find((movie) => movie.id === id)
      if (!movie) {
        console.log('movie not found')
      } else {
        movieStore.movies = movieStore.movies.filter((el) => el.id !== id)
        movie.isFavorite = false
      }
    }

    return {
    loader, movies, getMovies, addToUserMovies, removeFromUserMovie,
    }
})