import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchFilms, searchFilm } from '../redux/films-slice'
import { ContainerCardsSearch } from '../components/container-cards-search/container-cards-search'

export function Results(): React.ReactElement {
  const query = new URLSearchParams(useLocation().search).get('query') || ''
  const dispatch = useAppDispatch()
  const { list } = useAppSelector(state => state.films)

  useEffect(() => {
    if (query) {
      dispatch(searchFilm({ search: query, page: 1 }) as any)
    } else {
      dispatch(fetchFilms({ page: 1 }) as any)
    }
  }, [query, dispatch])

  return <ContainerCardsSearch films={list ?? []} />
}