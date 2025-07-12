import React, { useEffect, useState } from 'react'
import { Card } from '../movie-card/movie-card'
import { Loader } from '../loader/loader'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchFilms } from '../../redux/films-slice'
import { addFavorite, removeFavorite } from '../../redux/films-slice'
import type { TmdbFilmCard } from '../../types'
import style from './container-trends.module.css'

export function ContainerTrends(): React.ReactElement {
  const dispatch = useAppDispatch()
  
  const { list, isLoading, favorites } = useAppSelector(state => state.films)
  const [trends, setTrends] = useState<TmdbFilmCard[]>([])

  useEffect(() => {
    dispatch(fetchFilms({ page: 1 }))
  }, [dispatch])

  useEffect(() => {
    if (!list) {
      setTrends([])
      return
    }
    const shuffledMovies = [...list].sort((a, b) => b.popularity - a.popularity)
    for (let i = shuffledMovies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledMovies[i], shuffledMovies[j]] = [shuffledMovies[j], shuffledMovies[i]]
    }
    setTrends(shuffledMovies.slice(0, 5))
  }, [list])

  if (isLoading) return <Loader />

  return (
    <div className={style.container}>
      {trends.map(film => {
        const isFavorite = favorites.some(f => f.id === film.id)
        return (
          <Card
            key={film.id}
            {...film}
            isFavorite={isFavorite}
            onAddToFavorites={() => dispatch(addFavorite(film))}
            onRemoveFromFavorites={() => dispatch(removeFavorite(film.id))}
            showTrash={false}
          />
        )
      })}
    </div>
  )
}
