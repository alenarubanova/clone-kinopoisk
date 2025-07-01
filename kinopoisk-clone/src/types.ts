export interface MovieDetail {
  title: string
  rating: string
  genres: string[]
  plot: string
  releaseDate: string
  boxOffice: string
  country: string
  production: string
  actors: string[]
  writers: string[]
  recommendations: string[]
  posterUrl: string
}

export type MoviesStateType = {
  list: MovieCard[] | null
  error: string | null
  isLoading: boolean
  limit: number
  total: number
}

export type MoviesParamsType = {
  genre?: string
  limit?: number
  offset?: number
  ordering?: string
  search?: string
  year?: string
}

export interface OmdbMovie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export type MoviesResponseType = {
  Search: OmdbMovie[]
  totalResults: string
  Response: 'True' | 'False'
  Error?: string
}

export interface MovieCard {
  imdbID: string
  title: string
  rating: string
  releaseDate: string
  genres: string[]
  posterUrl: string
}