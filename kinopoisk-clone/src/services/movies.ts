import axios from 'axios'
import type { TmdbMoviesResponse, TmdbMovieDetails, MoviesParamsType } from '../types'
import { baseUrl, apiKey, moviesEndpoint, searchEndpoint } from '../config/api'

export async function getMovies(params: MoviesParamsType = {}): Promise<TmdbMoviesResponse | void> {
  try {
    const { limit, ...rest } = params
    const response = await axios.get(`${baseUrl}${moviesEndpoint}`, {
      params: { api_key: apiKey, ...rest }
    })
    return response.data
  } catch (error: any) {
    console.log('Error:', error.message)
  }
}

export async function searchMovies(params: MoviesParamsType = {}): Promise<TmdbMoviesResponse | void> {
  try {
    const { search, limit, ...rest } = params
    const response = await axios.get(`${baseUrl}${searchEndpoint}`, {
      params: { api_key: apiKey, query: search, ...rest }
    })
    return response.data
  } catch (error: any) {
    console.log('Error:', error.message)
  }
}

export async function requestMovie(id: number): Promise<TmdbMovieDetails | void> {
  try {
    const response = await axios.get(`${baseUrl}/movie/${id}`, {
      params: { api_key: apiKey }
    })
    return response.data
  } catch (error: any) {
    console.log('Error:', error.message)
  }
}