import React from 'react'
import type { TmdbMovieCard } from '../../types'
import style from './movie-card.module.css'
import { MdFavorite } from 'react-icons/md'

interface CardProps extends TmdbMovieCard {
  onAddToFavorites?: () => void
}

export function Card(props: CardProps): React.ReactElement {
  const {
    title,
    vote_average,
    release_date,
    poster_path,
    url,
    onAddToFavorites,
  } = props

  function handleAddToFavorites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()
    event.preventDefault()
    onAddToFavorites?.()
  }

  return (
    <div className={style.card}>
      <a href={url} className={style.cardLink}>
        <div className={style.imgContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            alt={title}
            className={style.img}
          />
        </div>
        <div className={style.content}>
          <span className={style.rating}>{vote_average}</span>
          <h3 className={style.title}>{title}</h3>
          <span className={style.release}>{release_date}</span>
        </div>
      </a>

      {onAddToFavorites && (
        <button
          type="button"
          className={style.favoriteButton}
          onClick={handleAddToFavorites}
        >
          <MdFavorite color="green" size={24} />
        </button>
      )}
    </div>
  )
}