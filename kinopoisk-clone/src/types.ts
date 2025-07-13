// For language state
export type LangType = 'en' | 'ru'

export type LangStateType = {
  lang: LangType
}

// Movies
export type TmdbMoviesStateType = {
  list: TmdbMovieCard[] | null
  error: string | null
  isLoading: boolean
  limit: number
  total: number
}

export interface TmdbMoviesResponse {
  page: number
  results: TmdbMovieCard[]
  total_pages: number
  total_results: number
}

export interface TmdbMovieCard {
  id: number
  title: string
  vote_average: number
  release_date: string
  poster_path: string | null
  url?: string
  genre_ids: number[]
  popularity?: number | null
}

export interface TmdbMovieDetails {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  overview: string
  release_date: string
  runtime: number
  genres: TmdbGenre[]
  adult: boolean
  popularity: number
  production_countries: { iso_3166_1: string; name: string }[]
  original_language: string
}

export type MoviesParamsType = {
  page?: number
  search?: string
  limit?: number
  ordering?: string
}

export interface MovieStateType {
  data: TmdbMovieDetails | null
  isLoading: boolean
  error: string | null
}

export type MoviesStateType = {
  list: TmdbMovieCard[] | null
  favorites: TmdbMovieCard[]
  error: string | null
  isLoading: boolean
  limit: number
  total: number
  ordering: string
}


// Film details
export interface TmdbGenre {
  id: number
  name: string
}

// Tabs
export interface TabsProps {
  tabs: Array<{
    label: string
    path: string
  }>
}

export interface TabsState {
  activeIndex: number
}

// Theme
export type ThemeType = 'day' | 'night'

// Input 
export type InputType = 'text' | 'email' | 'password' | 'checkbox' | 'number'
