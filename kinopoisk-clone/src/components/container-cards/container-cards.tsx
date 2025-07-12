import React, { useEffect } from 'react'
import { Card } from '../film-card/film-card'
import { Loader } from '../loader/loader'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchFilms, addFavorite, removeFavorite } from '../../redux/films-slice'
import { buildSchemePagination } from '../../utils/buildPagination'
import { useParams, NavLink } from 'react-router'
import { FILMS_LIMIT, FILMS_MAX_LIMIT } from '../../config/constants'
import style from './container-cards.module.css'

export function ContainerCards(): React.ReactElement {

  const { currentPage = '1', query } = useParams<{ currentPage?: string; query?: string }>()
  const dispatch = useAppDispatch()
  const { list, isLoading, favorites, total } = useAppSelector(state => state.films)

  useEffect(() => {
    const page = Number(currentPage) || 1
    dispatch(fetchFilms({
      page,
      search: query || undefined,
      limit: FILMS_LIMIT
    }))
  }, [dispatch, currentPage, query])

  function renderPagination() {
    const page = Number(currentPage) || 1
    const maxPages = Math.ceil(FILMS_MAX_LIMIT / FILMS_LIMIT)
    const totalPages = Math.ceil(total / FILMS_LIMIT)
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
                  to={query ? `/films/search/${query}/${item}` : `/films/all/${item}`}
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
    return <div> No films </div>
  }

  return (
    <div className={style.container}>
      {renderPagination()}
      {list.map(film => {
        const isFavorite = favorites.some(f => f.id === film.id)
        return (
          <Card
            key={film.id}
            {...film}
            isFavorite={isFavorite}
            onAddToFavorites={() => dispatch(addFavorite(film))}
            onRemoveFromFavorites={() => dispatch(removeFavorite(film.id))}
            showTrash={false}
          />
        )
      })}
      {renderPagination()}
    </div>
  )
}