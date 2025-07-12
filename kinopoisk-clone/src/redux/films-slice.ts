import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { FilmsParamsType, FilmsStateType, TmdbFilmsResponse, TmdbFilmCard } from '../types'
import { getFilms, searchFilms } from '../services/movies'
import { FILMS_LIMIT } from '../config/constants'
import type { RootState } from './store'

export const fetchFilms = createAsyncThunk('films/fetchFilms', async (params: FilmsParamsType = {}, { getState }) => {
    const { limit = FILMS_LIMIT, page = 1 } = params
    const ordering = (getState() as RootState).films.ordering

    const data = await getFilms({ ...params, page, limit, ordering })

    return data
  }
)

export const searchFilm = createAsyncThunk('films/searchFilms', async (params: FilmsParamsType = {}, { getState }) => {
    const ordering = (getState() as RootState).films.ordering
    const data = await searchFilms({ ...params, ordering })
    return data
  }
)

const initialState: FilmsStateType = {
  list: null,
  favorites: JSON.parse(localStorage.getItem('favoriteFilms') || '[]'),
  error: null,
  isLoading: false,
  limit: FILMS_LIMIT,
  total: 0,
  ordering: 'date',
}

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<TmdbFilmCard>) {
      if (!state.favorites.find(film => film.id === action.payload.id)) {
        state.favorites.push(action.payload)
        localStorage.setItem('favoriteFilms', JSON.stringify(state.favorites))
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(film => film.id !== action.payload)
      localStorage.setItem('favoriteFilms', JSON.stringify(state.favorites))
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilms.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.error = action.error?.message || null
        state.isLoading = false
      })
      .addCase(fetchFilms.fulfilled, (state, action: PayloadAction<TmdbFilmsResponse>) => {
        state.list = action.payload.results
        state.total = action.payload.total_results
        state.isLoading = false
      })
      .addCase(searchFilm.pending, state => {
        state.isLoading = true
      })
      .addCase(searchFilm.rejected, (state, action) => {
        state.error = action.error?.message || null
        state.isLoading = false
      })
      .addCase(searchFilm.fulfilled, (state, action: PayloadAction<TmdbFilmsResponse>) => {
        state.list = action.payload.results
        state.total = action.payload.total_results
        state.isLoading = false
      })
  },
})

export const { addFavorite, removeFavorite } = filmsSlice.actions
export const filmsReducer = filmsSlice.reducer
