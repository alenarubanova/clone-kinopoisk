import React from 'react'
import type { TmdbMovieCard } from '../../types'
import style from './movie-card.module.css'

export function Card( props: TmdbMovieCard ): React.ReactElement {
  const { title, vote_average, release_date, poster_path, url } = props

  return (
    <a href={url} className={style.cardLink}>
      <div className={style.card}>
        <div className={style.imgContainer}>
          <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title} className={style.img} />
        </div>
        <div className={style.content}>
          <span className={style.rating}>{vote_average}</span>
          <h3 className={style.title}>{title}</h3>
          <span className={style.release}>{release_date}</span>
        </div>
      </div>
    </a>
  )
}