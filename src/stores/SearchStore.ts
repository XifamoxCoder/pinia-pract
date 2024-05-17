import {defineStore} from "pinia";
import {Movie, useMovieStore} from "./MovieStore.ts";
import router from "../router";
import {ref, watch} from "vue";
import axios, {AxiosResponse} from "axios";

export const API_URL = import.meta.env.VITE_APP_URL
export const API_KEY = import.meta.env.VITE_APP_KEY

const url = `${API_URL}search/movie?api_key=${API_KEY}&query=`;

function isNumberArray(value: any): value is number[] {
  return Array.isArray(value) && value.every(item => typeof item === 'number');
}

export const useSearchStore = defineStore('searchStore', () => {
  const loader = ref<boolean>(false)
  const movies = ref<Movie[]>([])

  const moviesInLocalStorage = localStorage.getItem('moviesStore');
  let favoriteMoviesIds: number[] = [];

  if (moviesInLocalStorage) {
    movies.value = JSON.parse(moviesInLocalStorage)._value;
  }

  const favoriteMoviesIdsRaw = localStorage.getItem('favoriteMoviesIds');
  if (favoriteMoviesIdsRaw) {
    try {
      const parsed = JSON.parse(favoriteMoviesIdsRaw);
      if (isNumberArray(parsed)) {
        favoriteMoviesIds = parsed;
      } else {
        console.warn('Invalid favoriteMoviesIds format in localStorage');
      }
    } catch (e) {
      console.error('Error parsing favoriteMoviesIds from localStorage', e);
    }
  }

  if (moviesInLocalStorage) {
    try {
      movies.value = JSON.parse(moviesInLocalStorage)._value;
    } catch (e) {
      console.error('Error parsing moviesStore from localStorage', e);
    }
  }
  
  const getMovies = async(search: string) => {
    try {
      loader.value = true
      const res: AxiosResponse<any> = await axios.get(`${url}${search}`)
      movies.value = res.data.results.map((movie: Movie) => {
        movie.isFavorite = favoriteMoviesIds.includes(movie.id);
        return movie;
      });

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

      favoriteMoviesIds.push(movie.id);
      localStorage.setItem('favoriteMoviesIds', JSON.stringify(favoriteMoviesIds));

      router.push('/')
    }

    const removeFromUserMovie = (id: number) => {
      const movieStore = useMovieStore()
      const searchStore = useSearchStore()
      const movie = movieStore.movies.find((movie) => movie.id === id)
      const movieSearch = searchStore.movies.find((movie) => movie.id === id)

      if (!movie || !movieSearch) {
        console.log('movie not found')
      } else {
        movieStore.movies = movieStore.movies.filter((el) => el.id !== id)
        movie.isFavorite = false
        movieSearch.isFavorite = false

        favoriteMoviesIds = favoriteMoviesIds.filter((movieId: number) => movieId !== id);
        localStorage.setItem('favoriteMoviesIds', JSON.stringify(favoriteMoviesIds));
      }
    }

  watch(() => movies, (state) => {
    localStorage.setItem('moviesStore', JSON.stringify(state))
  }, {deep: true})

  return {
  loader, movies, getMovies, addToUserMovies, removeFromUserMovie,
  }

})