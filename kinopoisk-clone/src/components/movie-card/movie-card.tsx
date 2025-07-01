import React from 'react'
import type { MovieCard } from '../../types'
import { MdReadMore } from 'react-icons/md'
import style from './movie-card.module.css'

export function Card(props: MovieCard): React.ReactElement {
  const { title, rating, releaseDate, genres, posterUrl } = props

  const genreString = genres.length > 0 ? genres.join(' · ') : ''

  return (
    <div className={style.card}>
      <div className={style.imgContainer}>
        <img src={posterUrl} alt="" className={style.img} />
      </div>
      <div className={style.content}>
        <span className={style.rating}>{rating}</span>
        <div className={style.description}>
          <h3 className={style.title}>{title}</h3>
          <span className={style.release}>{releaseDate}</span>
        </div>
        <div className={style.more}>
          <span className={style.genres}>{genreString}</span>
          <a href="#" className={style.button}><MdReadMore color="white" /></a>
        </div>
      </div>
    </div>
  )
}