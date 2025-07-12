import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { TmdbMovieDetails } from '../types'
import { getFilmById } from '../services/movies'

export const fetchFilm = createAsyncThunk('film/fetchFilm', async (id: number) => {
  const data = await getFilmById(id)
  return data
})

interface FilmStateType {
  data: TmdbMovieDetails | null
  isLoading: boolean
  error: string | null
}

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