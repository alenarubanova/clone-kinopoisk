import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { MoviesParamsType, MoviesStateType, TmdbMoviesResponse, TmdbMovieCard } from '../types'
import { getMovies, searchMovies } from '../services/movies'
import { MOVIES_LIMIT } from '../config/constants'
import type { RootState } from './store'

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (params: MoviesParamsType = {}, { getState }) => {
    const { limit = MOVIES_LIMIT, page = 1 } = params
    const ordering = (getState() as RootState).movies.ordering

    const data = await getMovies({ ...params, page, limit, ordering })

    return data
  }
)

export const searchMovie = createAsyncThunk('movies/searchMovies', async (params: MoviesParamsType = {}, { getState }) => {
    const ordering = (getState() as RootState).movies.ordering
    const data = await searchMovies({ ...params, ordering })
    return data
  }
)

const initialState: MoviesStateType = {
  list: null,
  favorites: JSON.parse(localStorage.getItem('favoriteMovies') || '[]'),
  error: null,
  isLoading: false,
  limit: MOVIES_LIMIT,
  total: 0,
  ordering: 'date',
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<TmdbMovieCard>) {
      if (!state.favorites.find(movie => movie.id === action.payload.id)) {
        state.favorites.push(action.payload)
        localStorage.setItem('favoriteMovies', JSON.stringify(state.favorites))
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload)
      localStorage.setItem('favoriteMovies', JSON.stringify(state.favorites))
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.error = action.error?.message || null
        state.isLoading = false
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<TmdbMoviesResponse>) => {
        state.list = action.payload.results
        state.total = action.payload.total_results
        state.isLoading = false
      })
      .addCase(searchMovie.pending, state => {
        state.isLoading = true
      })
      .addCase(searchMovie.rejected, (state, action) => {
        state.error = action.error?.message || null
        state.isLoading = false
      })
      .addCase(searchMovie.fulfilled, (state, action: PayloadAction<TmdbMoviesResponse>) => {
        state.list = action.payload.results
        state.total = action.payload.total_results
        state.isLoading = false
      })
  },
})

export const { addFavorite, removeFavorite } = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer
