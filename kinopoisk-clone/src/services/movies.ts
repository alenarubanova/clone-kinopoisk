import axios from 'axios'
import type { TmdbMoviesResponse, TmdbMovieCard, TmdbMovieDetails } from '../types'
import { baseUrl, apiKey, moviesEndpoint, searchEndpoint } from '../config/api'


export async function getMovies(page: number = 1): Promise<TmdbMoviesResponse | void> {
  try {
    const response = await axios.get(`${baseUrl}${moviesEndpoint}`, {
      params: { api_key: apiKey, page }
    })
    return response.data
  } catch (error: any) {
    console.log('Error:', error.message)
  }
}

export async function searchMovies(query: string, page: number = 1): Promise<TmdbMoviesResponse | void> {
  try {
    const response = await axios.get(`${baseUrl}${searchEndpoint}`, {
      params: { api_key: apiKey, query, page }
    })
    return response.data
  } catch (error: any) {
    console.log('Error:', error.message)
  }
}

export async function getMovieById(id: number): Promise<TmdbMovieDetails | void> {
  try {
    const response = await axios.get(`${baseUrl}/movie/${id}`, {
      params: { api_key: apiKey }
    })
    return response.data
  } catch (error: any) {
    console.log('Error:', error.message)
  }
}