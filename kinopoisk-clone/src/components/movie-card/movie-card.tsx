import React from 'react'
import type { TmdbMovieCard } from '../../types'
import style from './movie-card.module.css'
import { MdFavorite } from 'react-icons/md'
import { useNavigate } from 'react-router'

interface CardProps extends TmdbMovieCard {
  onAddToFavorites?: () => void
}

export function Card(props: CardProps): React.ReactElement {
  const {
    id,
    title,
    vote_average,
    release_date,
    poster_path,
    url,
    onAddToFavorites,
  } = props

  const navigate = useNavigate()

  function handleAddToFavorites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()
    event.preventDefault()
    onAddToFavorites?.()
  }

  function handleCardClick() {
    navigate(`/movie/${id}`)
  }

  return (
    <div className={style.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
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