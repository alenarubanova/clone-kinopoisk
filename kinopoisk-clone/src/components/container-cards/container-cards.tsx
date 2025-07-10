import React, { useEffect } from 'react'
import { Card } from '../movie-card/movie-card'
import { Loader } from '../loader/loader'
import style from './container-cards.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchMovies } from '../../redux/films-slice'

export function ContainerCards(): React.ReactElement {
  const dispatch = useAppDispatch()
  const { list, isLoading } = useAppSelector(state => state.movies)

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }))
  }, [dispatch])

  if (isLoading) return <Loader />
  if (!list || list.length === 0) return <div> No movies </div>

  return (
    <div className={style.container}>
      {list.map(movie => (
        <Card key={movie.id} {...movie} />
      ))}
    </div>
  )
}