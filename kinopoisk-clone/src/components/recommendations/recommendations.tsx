import React from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/store'
import { addFavorite, removeFavorite } from '../../redux/movies-slice'
import { Card } from '../movie-card/movie-card'
import { locales } from '../../config/locales'
import style from './recommendations.module.css'

export function Recommendations(): React.ReactElement | null {
  const lang = useAppSelector(state => state.lang.lang)
  const currentMovie = useAppSelector(state => state.movie.data)
  const allMovies = useAppSelector(state => state.movies.list) ?? []
  const favorites = useAppSelector(state => state.movies.favorites)
  const dispatch = useAppDispatch()

  if (!currentMovie || !Array.isArray(currentMovie.genres) || currentMovie.genres.length === 0) {
    return null
  }

  const currentGenreIds = currentMovie.genres.map(g => g.id)

  const recommendations = allMovies.filter(movie =>
      movie.id !== currentMovie.id &&
      Array.isArray(movie.genre_ids) &&
      movie.genre_ids.some(id => currentGenreIds.includes(id))
    ).slice(0, 4)

  if (recommendations.length === 0) return null

  return (
    <>
      <h3 className={style.title}>{locales[lang].recommendations.title}</h3>
      <div className={style.container}>
        {recommendations.map(movie => {
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
      </div>
    </>
  )
}
