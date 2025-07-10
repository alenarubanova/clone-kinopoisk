export type TmdbMoviesStateType = {
  list: TmdbMovieCard[] | null
  error: string | null
  isLoading: boolean
  limit: number
  total: number
}

export interface TmdbMovie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[] | null
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

// For search and get movies
export interface TmdbMoviesResponse {
  page: number
  results: TmdbMovie[]
  total_pages: number
  total_results: number
}

// For card about film in list
export interface TmdbMovieCard {
  id: number
  title: string
  vote_average: number
  release_date: string
  poster_path: string | null
  url: string
}

// For favorites
export type FavoritesStateType = {
  list: TmdbMovieCard[]
}

// For page film details
export interface TmdbGenre {
  id: number
  name: string
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

export interface TabsProps {
  tabs: Array<{
    label: string
    path: string
  }>
}

// For language state
export type LangType = 'en' | 'ru'
export type LangStateType = {
  lang: LangType
}