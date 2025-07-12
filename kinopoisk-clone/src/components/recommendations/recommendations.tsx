import React from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/store'
import { addFavorite, removeFavorite } from '../../redux/films-slice'
import { Card } from '../movie-card/movie-card'
import { locales } from '../../config/locales'
import style from './recommendations.module.css'

export function Recommendations(): React.ReactElement | null {
  const lang = useAppSelector(state => state.lang.lang)
  const currentFilm = useAppSelector(state => state.film.data)
  const allMovies = useAppSelector(state => state.films.list) ?? []
  const favorites = useAppSelector(state => state.films.favorites)
  const dispatch = useAppDispatch()

  if (!currentFilm || !Array.isArray(currentFilm.genres) || currentFilm.genres.length === 0) {
    return null
  }

  const currentGenreIds = currentFilm.genres.map(g => g.id)

  const recommendations = allMovies
    .filter(movie =>
      movie.id !== currentFilm.id &&
      Array.isArray(movie.genre_ids) &&
      movie.genre_ids.some(id => currentGenreIds.includes(id))
    )
    .slice(0, 4)

  if (recommendations.length === 0) return null

  return (
    <>
      <h3 className={style.title}>{locales[lang].recommendations.title}</h3>
      <div className={style.container}>
        {recommendations.map(movie => {
          const isFavorite = favorites.some(f => f.id === movie.id)
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
