import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchMovies } from '../redux/films-slice'
import { ContainerTrends } from '../components/container-trends/container-trends'

export function Trends(): React.ReactElement {
  const dispatch = useAppDispatch()
  const { list, isLoading } = useAppSelector(state => state.movies)

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }))
  }, [dispatch])

  return <ContainerTrends movies={list ?? []} isLoading={isLoading} />
}
