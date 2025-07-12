import axios from 'axios'
import type { TmdbFilmsResponse, TmdbFilmCard, TmdbFilmDetails, FilmsParamsType } from '../types'
import { baseUrl, apiKey, moviesEndpoint, searchEndpoint } from '../config/api'

export async function getFilms(params: FilmsParamsType = {}): Promise<TmdbFilmsResponse | void> {
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

export async function searchFilms(params: FilmsParamsType = {}): Promise<TmdbFilmsResponse | void> {
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

export async function getFilmById(id: number): Promise<TmdbFilmDetails | void> {
  try {
    const response = await axios.get(`${baseUrl}/movie/${id}`, {
      params: { api_key: apiKey }
    })
    return response.data
  } catch (error: any) {
    console.log('Error:', error.message)
  }
}