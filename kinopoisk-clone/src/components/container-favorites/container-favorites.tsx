import React from 'react'
import style from './container-favorites.module.css'
import EmptyImage from '../../assets/no-images/day.png'
import { Card } from '../movie-card/movie-card'
import { useAppSelector } from '../../redux/store'

export function ContainerFavorites(): React.ReactElement {
  const allMovies = useAppSelector(state => state.movies.list) ?? []
  const favoriteIds = useAppSelector(state => state.movies.favorites)
  const movies = allMovies.filter(movie => favoriteIds.includes(movie.id))
  const isEmpty = !movies || movies.length === 0

  return (
      <div className={style.container}>
        {isEmpty ? (
          <div className={style.emptyState}>
            <img src={EmptyImage} alt="Empty state" className={style.emptyImage} />
            <div className={style.emptyText}>Empty state text</div>
          </div>
        ) : (
          movies.map(movie => <Card key={movie.id} {...movie} />)
        )}
      </div>
  )
}