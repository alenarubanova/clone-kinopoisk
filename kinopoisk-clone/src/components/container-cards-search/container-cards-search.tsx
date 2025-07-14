import { Card } from '../movie-card/movie-card'
import { Loader } from '../loader/loader'
import type { TmdbMovieCard } from '../../types'
import { useAppSelector, useAppDispatch } from '../../redux/store'
import { addFavorite, removeFavorite } from '../../redux/movies-slice'
import { useNavigate } from 'react-router'
import { MOVIES_LIMIT, MOVIES_MAX_LIMIT } from '../../config/constants'
import { buildSchemePagination } from '../../utils/buildPagination'
import { NavLink } from 'react-router'
import style from './container-cards-search.module.css'

interface ContainerCardsSearchProps {
  movies: TmdbMovieCard[]
  total: number
  page: number
  query: string
}

export function ContainerCardsSearch({ movies, total, page, query }: ContainerCardsSearchProps) {
  const { isLoading, favorites } = useAppSelector(state => state.movies)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAddToFavorites = (movie: TmdbMovieCard) => {
    dispatch(addFavorite(movie))
  }

  const handleRemoveFromFavorites = (movieId: number) => {
    dispatch(removeFavorite(movieId))
  }

  function renderPagination() {
    const maxPages = Math.ceil(MOVIES_MAX_LIMIT / MOVIES_LIMIT)
    const totalPages = Math.ceil(total / MOVIES_LIMIT)
    const pageCount = Math.min(totalPages, maxPages)
    if (pageCount <= 1) return null

    const pagination = buildSchemePagination(page, pageCount)
    if (!pagination) return null

    return (
      <nav className={style.pagination}>
        <ul className={style.paginationList}>
          {pagination.map((item, index) => (
            <li
              className={`${style.paginationItem} ${Number(item) === page ? style.active : ''}`}
              key={index}
            >
              {item === '...' ? (
                <span className={style.paginationDots}>...</span>
              ) : (
                <NavLink
                  className={style.pageLink}
                  to={`/results?query=${encodeURIComponent(query)}&page=${item}`}
                >
                  {item}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={style.container}>
      {renderPagination()}
      {(!movies || movies.length === 0) ? (
        <h1 className={style.empty}>Movies not found</h1>
      ) : (
        movies.map(movie => {
          const isFavorite = favorites.some(f => f.id === movie.id)
          return (
            <Card
              key={movie.id}
              {...movie}
              isFavorite={isFavorite}
              onAddToFavorites={() => handleAddToFavorites(movie)}
              onRemoveFromFavorites={() => handleRemoveFromFavorites(movie.id)}
              showTrash={false}
            />
          )
        })
      )}
      {renderPagination()}
    </div>
  )
}
