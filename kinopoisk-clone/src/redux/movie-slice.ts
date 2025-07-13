import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { MovieStateType, TmdbMovieDetails } from '../types'
import { requestMovie } from '../services/movies'

export const fetchMovie = createAsyncThunk('movie/fetchMovie', async (id: number) => {
  const data = await requestMovie(id)
  return data
})

const initialState: MovieStateType = {
  data: null,
  isLoading: false,
  error: null,
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchMovie.fulfilled, (state, action: PayloadAction<TmdbMovieDetails>) => {
        state.data = action.payload
        state.isLoading = false
      })
  }
})

export const movieReducer = movieSlice.reducer