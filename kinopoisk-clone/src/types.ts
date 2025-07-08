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
  genre_ids: number[]
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

export interface TmdbMoviesResponse {
  page: number
  results: TmdbMovie[]
  total_pages: number
  total_results: number
}

export interface TmdbMovieCard {
  id: number
  title: string
  vote_average: number
  release_date: string
  poster_path: string | null
  url: string
}

export interface MoviePageData {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  overview: string
  release_date: string
  runtime: number
  actors: string[]
  director: string
  writers: string[]
}

export type FavoritesStateType = {
  list: TmdbMovieCard[]
}

export type LangType = 'en' | 'ru'
export type LangStateType = {
  lang: LangType
}