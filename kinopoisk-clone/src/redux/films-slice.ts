import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { MovieCard, MoviesParamsType, MoviesResponseType } from '../types'
import { requestMovies, requestMovieDetails } from '../services/movies'

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params: MoviesParamsType = { s: 'batman', page: 1 }) => {
    const searchResponse = await requestMovies(params)

    if (!searchResponse || searchResponse.Response === 'False') {
      throw new Error(searchResponse?.Error || 'Ошибка загрузки фильмов')
    }

    const detailedMovies: MovieCard[] = await Promise.all(
      searchResponse.Search.map(async (movie: any) => {
        const details = await requestMovieDetails(movie.imdbID)
        return {
          imdbID: details.imdbID,
          title: details.Title,
          releaseDate: details.Year,
          posterUrl: details.Poster !== 'N/A' ? details.Poster : '',
          rating: details.imdbRating || 'N/A',
          genres: details.Genre ? details.Genre.split(', ') : []
        }
      })
    )

    return {
      count: parseInt(searchResponse.totalResults, 10),
      results: detailedMovies
    } as MoviesResponseType
  }
)

const initialState = {
  list: null as MovieCard[] | null,
  error: null as string | null,
  isLoading: false,
  limit: 10,
  total: 0
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
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
