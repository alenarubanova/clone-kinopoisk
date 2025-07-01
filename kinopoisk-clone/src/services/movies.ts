import axios from 'axios'
import type { MoviesParamsType, MoviesResponseType } from '../types'
import { baseUrl } from '../config/api'

const apiKey = 'c56e29c2'

// Запрос списка фильмов (поисковый)
export async function requestMovies(params?: MoviesParamsType): Promise<any> {
  try {
    const response = await axios.get(baseUrl, {
      params: { ...params, apikey: apiKey }
    })
    return response.data
  } catch (error: any) {
    console.error('Error requestMovies:', error.message)
  }
}

// Запрос деталей фильма по imdbID
export async function requestMovieDetails(imdbID: string): Promise<any> {
  try {
    const response = await axios.get(baseUrl, {
      params: { apikey: apiKey, i: imdbID }
    })
    return response.data
  } catch (error: any) {
    console.error('Error requestMovieDetails:', error.message)
  }
}
