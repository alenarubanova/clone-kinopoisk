import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchMovies } from '../redux/films-slice'
import { ContainerCards } from '../components/container-cards/container-cards'

export function Filmes(): React.ReactElement {
  const dispatch = useAppDispatch()
  const { list } = useAppSelector(state => state.movies)

  useEffect(() => {
    dispatch(fetchMovies({ s: 'batman', page: 1 }) as any)
  }, [dispatch])

  return (
    <div>
      <ContainerCards movies={list ?? []} />
    </div>
  )
}