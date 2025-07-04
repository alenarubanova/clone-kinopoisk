import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../redux/store'
import { fetchMovies, clearMovies } from '../redux/films-slice'
import { ContainerCardsSearch } from '../components/container-cards-search/container-cards-search'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export function Results(): React.ReactElement {
  const query = useQuery().get('query') || ''
  const dispatch = useDispatch()
  const { list } = useAppSelector(state => state.movies)

  useEffect(() => {
    if (query) {
      dispatch(clearMovies())
      dispatch(fetchMovies({ search: query, page: 1 }) as any)
    }
  }, [query, dispatch])

  return <ContainerCardsSearch movies={list ?? []} />
}