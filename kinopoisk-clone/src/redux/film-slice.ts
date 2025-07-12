import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { FilmStateType } from '../types'
import { requestFilm } from '../services/movies'

export const fetchFilm = createAsyncThunk('film/fetchFilm', async (id: number) => {
  const data = await requestFilm(id)
  return data
})

const initialState: FilmStateType = {
  data: null,
  isLoading: false,
  error: null,
}

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchFilm.rejected, (state, action) => {
        state.error = action.error.message || null
        state.isLoading = false
      })
      .addCase(fetchFilm.fulfilled, (state, action: PayloadAction<TmdbMovieDetails>) => {
        state.data = action.payload
        state.isLoading = false
      })
  }
})

export const filmReducer = filmSlice.reducer