import React, { useEffect } from 'react'
import { Card } from '../movie-card/movie-card'
import { Loader } from '../loader/loader'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchMovies, addFavorite, removeFavorite } from '../../redux/movies-slice'
import { buildSchemePagination } from '../../utils/buildPagination'
import { useParams, NavLink } from 'react-router'
import { MOVIES_LIMIT, MOVIES_MAX_LIMIT } from '../../config/constants'
import style from './container-cards.module.css'

export function ContainerCards(): React.ReactElement {

  const { currentPage = '1', query } = useParams<{ currentPage?: string; query?: string }>()
  const dispatch = useAppDispatch()
  const { list, isLoading, favorites, total } = useAppSelector(state => state.movies)

  useEffect(() => {
    const page = Number(currentPage) || 1
    dispatch(fetchMovies({
      page,
      search: query || undefined,
      limit: MOVIES_LIMIT
    }))
  }, [dispatch, currentPage, query])

  function renderPagination() {
    const page = Number(currentPage) || 1
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
                  to={query ? `/movies/search/${query}/${item}` : `/movies/all/${item}`}
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

  if (!list || list.length === 0) {
    return <div> No movies </div>
  }

  return (
    <div className={style.container}>
      {renderPagination()}
      {list.map(movie => {
        const isFavorite = favorites.some(m => m.id === movie.id)
        return (
          <Card
            key={movie.id}
            {...movie}
            isFavorite={isFavorite}
            onAddToFavorites={() => dispatch(addFavorite(movie))}
            onRemoveFromFavorites={() => dispatch(removeFavorite(movie.id))}
            showTrash={false}
          />
        )
      })}
      {renderPagination()}
    </div>
  )
}