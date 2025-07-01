import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchMovies } from '../../redux/films-slice'
import { Card } from '../movie-card/movie-card'
import style from './container-cards.module.css'

export function ContainerCards() {
  const dispatch = useAppDispatch()
  const { list, isLoading, error } = useAppSelector(state => state.movies)

  useEffect(() => {
    dispatch(fetchMovies({ s: 'batman', page: 1 }))
  }, [dispatch])

  if (isLoading) return <div className={style.loading}>Загрузка...</div>
  if (error) return <div className={style.error}>Ошибка: {error}</div>
  if (!list || list.length === 0) return <div className={style.empty}>Нет фильмов</div>

  return (
    <div className={style.container}>
      {list.map(movie => (
        <Card key={movie.imdbID} {...movie} />
      ))}
    </div>
  )
}
