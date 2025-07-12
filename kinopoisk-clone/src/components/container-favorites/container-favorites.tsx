import React from 'react'
import style from './container-favorites.module.css'
import EmptyImage from '../../assets/no-images/day.png'
import { Card } from '../movie-card/movie-card'
import { useAppSelector } from '../../redux/store'
import { useAppDispatch } from '../../redux/store'
import { removeFavorite } from '../../redux/films-slice'

export function ContainerFavorites(): React.ReactElement {
  const favorites = useAppSelector(state => state.films.favorites)
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
          favorites.map(film => (
            <Card
              key={film.id}
              {...film}
              showTrash={true}
              onRemoveFromFavorites={() => dispatch(removeFavorite(film.id))}
              isFavorite={true}
            />
          ))
        )}
      </div>
  )
}