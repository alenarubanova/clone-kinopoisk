import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchMovies, searchMovie } from '../redux/movies-slice'
import { ContainerCardsSearch } from '../components/container-cards-search/container-cards-search'

export function Results(): React.ReactElement {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const query = params.get('query') || ''
  const page = Number(params.get('page')) || 1
  const dispatch = useAppDispatch()
  const { list, total } = useAppSelector(state => state.movies)

  useEffect(() => {
    if (query) {
      dispatch(searchMovie({ search: query, page }) as any)
    } else {
      dispatch(fetchMovies({ page }) as any)
    }
  }, [query, page, dispatch])

  return <ContainerCardsSearch movies={list ?? []} total={total} page={page} query={query} />
}