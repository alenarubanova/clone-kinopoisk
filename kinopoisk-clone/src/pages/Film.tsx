import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchFilm } from '../redux/film-slice'
import { ContainerFilm } from '../components/container-film/container-film'
import { Loader } from '../components/loader/loader'
import style from '../styles/main.module.css'
import { Tabs } from '../components/tabs/tabs'

export function Film(): React.ReactElement {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { data, isLoading, error } = useAppSelector(state => state.film)

  useEffect(() => {
    if (!id) return
    dispatch(fetchFilm(Number(id)))
  }, [id])

  if (isLoading) {
    return <Loader />
  }

  if (error || !data) {
    return <div>Фильм не найден</div>
  }

  return (
    <ContainerFilm>
      <Tabs 
        tabs={[
          { label: 'Main', path: '/' },
          { label: data.title, path: `/movie/${id}` }
        ]} 
      />
      
      <div className={style.wrapper}>
        <img src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} alt={data.title} className={style.image} />
        <div className={style.description}>
          <p className={style.genres}>{Array.isArray(data.genres) ? data.genres.map(g => g.name).join(' · ') : 'Нет данных'}</p>
          <h2 className={style.title}>{data.title}</h2>
          <div className={style.info}>
            <span className={style.rating}>{data.vote_average}</span>
            <span className={style.runtime}>{data.runtime}</span>
          </div>
          <p className={style.overview}>{data.overview}</p>
          <p className={style.desc}>
            <span className={style.label}>Year:</span>
            <span className={style.value}>{data.release_date}</span>
          </p>
          <p className={style.desc}>
            <span className={style.label}>Country:</span>
            <span className={style.value}>{Array.isArray(data.production_countries) ? data.production_countries.map(c => c.name).join(', ') : 'Нет данных'}</span>
          </p>
          <p className={style.desc}>
            <span className={style.label}>Age Rating:</span>
            <span className={style.value}>{data.adult ? '18+' : 'Нет'}</span>
          </p>
          <p className={style.desc}>
            <span className={style.label}>Popularity:</span>
            <span className={style.value}>{data.popularity}</span>
          </p>
          <p className={style.desc}>
            <span className={style.label}>Language:</span>
            <span className={style.value}>{data.original_language}</span>
          </p>
        </div>
      </div>
    </ContainerFilm>
  )
}
