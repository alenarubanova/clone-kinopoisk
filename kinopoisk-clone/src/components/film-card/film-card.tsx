import React from 'react'
import type { TmdbFilmCard } from '../../types'
import { MdFavorite } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router'
import style from './film-card.module.css'

interface CardProps extends TmdbFilmCard {
  onAddToFavorites?: () => void
  onRemoveFromFavorites?: () => void
  isFavorite?: boolean
  showTrash?: boolean
}

export function Card(props: CardProps): React.ReactElement {
  const { id, title, vote_average, release_date, poster_path, onAddToFavorites, onRemoveFromFavorites, isFavorite, showTrash } = props

  const navigate = useNavigate()

  function handleCardClick() {
    navigate(`/movie/${id}`)
  }

  function handleAddToFavorites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()
    event.preventDefault()
    onAddToFavorites?.()
  }

  function handleRemoveFromFavorites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()
    event.preventDefault()
    onRemoveFromFavorites?.()
  }

  return (
    <div className={style.card} onClick={handleCardClick}>
      <div className={style.imgContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
          className={style.img}
        />
      </div>
      <div className={style.content}>
        <span className={style.rating}>{typeof vote_average === 'number' ? vote_average.toFixed(1) : '—'}</span>
        <h3 className={style.title}>{title}</h3>
        <span className={style.release}>{release_date}</span>
      </div>
      {showTrash ? (
        <button
          type="button"
          className={style.favoriteButton}
          onClick={handleRemoveFromFavorites}
        >
          <MdDelete color="red" size={24} />
        </button>
      ) : (
        <button
          type="button"
          className={style.favoriteButton}
          onClick={handleAddToFavorites}
          disabled={isFavorite}
        >
          <MdFavorite color={isFavorite ? 'red' : 'green'} size={24} />
        </button>
      )}
    </div>
  )
}