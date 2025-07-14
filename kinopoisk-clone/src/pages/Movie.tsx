import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchMovie } from '../redux/movie-slice'
import { ContainerMovie } from '../components/container-movie/container-movie'
import { Loader } from '../components/loader/loader'
import { Tabs } from '../components/tabs/tabs'
import { Recommendations } from '../components/recommendations/recommendations'
import { locales } from '../config/locales'
import style from '../styles/main.module.css'

export function Movie(): React.ReactElement {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { data, isLoading, error } = useAppSelector(state => state.movie)

  const lang = useAppSelector(state => state.lang.lang)

  useEffect(() => {
    if (!id) return
    dispatch(fetchMovie(Number(id)))
  }, [id])

  if (isLoading) {
    return <Loader />
  }

  if (error || !data) {
    return <div>Movie not found</div>
  }

  return (
    <ContainerMovie>
      <Tabs 
        tabs={[
          { label: 'Main', path: '/' },
          { label: data.title, path: `/movie/${id}` }
        ]} 
      />
      
      <div className={style.wrapper}>
        <img src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} alt={data.title} className={style.image} />
        <div className={style.description}>
          <p className={style.genres}>{Array.isArray(data.genres) ? data.genres.map(genre => genre.name).join(' · ') : 'No data'}</p>
          <h2 className={style.title}>{data.title}</h2>
          <div className={style.info}>
            <span className={style.rating}>{typeof data.vote_average === 'number' ? data.vote_average.toFixed(1) : data.vote_average}</span>
            <span className={style.runtime}>{data.runtime}</span>
          </div>
          <p className={style.overview}>{data.overview}</p>
          <p className={style.desc}>
            <span className={style.label}>{locales[lang].pageMovie.year}:</span>
            <span className={style.value}>{data.release_date}</span>
          </p>
          <p className={style.desc}>
            <span className={style.label}>{locales[lang].pageMovie.country}:</span>
            <span className={style.value}>{Array.isArray(data.production_countries) ? data.production_countries.map(c => c.name).join(', ') : 'No data'}</span>
          </p>
          <p className={style.desc}>
            <span className={style.label}>{locales[lang].pageMovie.adult}:</span>
            <span className={style.value}>{data.adult ? '18+' : '-'}</span>
          </p>
          <p className={style.desc}>
            <span className={style.label}>{locales[lang].pageMovie.popularity}:</span>
            <span className={style.value}>{data.popularity}</span>
          </p>
          <p className={style.desc}>
            <span className={style.label}>{locales[lang].pageMovie.language}:</span>
            <span className={style.value}>{data.original_language}</span>
          </p>
        </div>
      </div>
      <Recommendations />
    </ContainerMovie>
  )
}
