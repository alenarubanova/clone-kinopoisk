import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TmdbMovieCard, TmdbMoviesStateType } from '../types'
import { getMovies, searchMovies } from '../services/movies'
import { FILMES_LIMIT } from '../config/constants'


export const fetchMovies = createAsyncThunk( 'movies/fetchMovies', async (params: { search?: string, page?: number } = {}) => {
    const response = params.search
      ? await searchMovies(params.search, params.page || 1)
      : await getMovies(params.page || 1)

    if (!response) {
      throw new Error('Ошибка загрузки фильмов')
    }

    const movies: TmdbMovieCard[] = response.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      vote_average: Number(movie.vote_average.toFixed(1)),
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      url: `/movie/${movie.id}`
    }))

    return {
      count: response.total_results,
      results: movies
    }
  }
)

const initialState: TmdbMoviesStateType = {
  list: null,
  error: null,
  isLoading: false,
  limit: 10,
  total: 0
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies(state) {
      state.list = []
      state.total = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload.results
        state.total = action.payload.count
        state.isLoading = false
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка'
        state.isLoading = false
      })
  }
})

export const moviesReducer = moviesSlice.reducer
export const { clearMovies } = moviesSlice.actions
