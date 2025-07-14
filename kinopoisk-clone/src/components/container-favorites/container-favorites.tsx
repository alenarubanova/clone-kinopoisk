import React from 'react'
import EmptyImage from '../../assets/image-placegolder/placegolder.png'
import { Card } from '../movie-card/movie-card'
import { useAppSelector } from '../../redux/store'
import { useAppDispatch } from '../../redux/store'
import { removeFavorite } from '../../redux/movies-slice'
import style from './container-favorites.module.css'

export function ContainerFavorites(): React.ReactElement {
  const favorites = useAppSelector(state => state.movies.favorites)
  const dispatch = useAppDispatch()
  const isEmpty = !favorites || favorites.length === 0

  return (
      <div className={style.container}>
        {isEmpty ? (
          <div className={style.emptyState}>
            <img src={EmptyImage} alt="Empty state" className={style.emptyImage} />
            <div className={style.emptyText}>Empty state text</div>
          </div>
        ) : (
          favorites.map(movie => (
            <Card
              key={movie.id}
              {...movie}
              showTrash={true}
              onRemoveFromFavorites={() => dispatch(removeFavorite(movie.id))}
              isFavorite={true}
            />
          ))
        )}
      </div>
  )
}