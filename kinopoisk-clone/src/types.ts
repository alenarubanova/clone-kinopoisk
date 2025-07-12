// For language state
export type LangType = 'en' | 'ru'

export type LangStateType = {
  lang: LangType
}

// Films
export type TmdbFilmsStateType = {
  list: TmdbFilmCard[] | null
  error: string | null
  isLoading: boolean
  limit: number
  total: number
}

export interface TmdbFilmsResponse {
  page: number
  results: TmdbFilmCard[]
  total_pages: number
  total_results: number
}

export interface TmdbFilmCard {
  id: number
  title: string
  vote_average: number
  release_date: string
  poster_path: string | null
  url?: string
  genre_ids: number[]
  popularity?: number | null
}

export interface TmdbFilmDetails {
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

export type FilmsParamsType = {
  page?: number
  search?: string
  limit?: number
  ordering?: string
}

export interface FilmStateType {
  data: TmdbMovieDetails | null
  isLoading: boolean
  error: string | null
}

export type FilmsStateType = {
  list: TmdbFilmCard[] | null
  favorites: TmdbFilmCard[]
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