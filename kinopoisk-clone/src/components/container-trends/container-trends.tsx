import React, { useEffect, useState } from 'react'
import { Card } from '../movie-card/movie-card'
import { Loader } from '../loader/loader'
import type { TmdbMovieCard } from '../../types'
import style from './container-trends.module.css'

interface ContainerTrendsProps {
  movies: TmdbMovieCard[] | null
  isLoading: boolean
}

export function ContainerTrends({ movies, isLoading }: ContainerTrendsProps): React.ReactElement {

  const [trends, setTrends] = useState<TmdbMovieCard[]>([])
  
  useEffect(() => {
    if (!movies) {
      setTrends([])
      return
    }
    const shuffledMovies = [...movies].sort((a, b) => b.popularity - a.popularity)
    for (let i = shuffledMovies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledMovies[i], shuffledMovies[j]] = [shuffledMovies[j], shuffledMovies[i]]
    }
    setTrends(shuffledMovies.slice(0, 5))
  }, [movies])

  if (isLoading) return <Loader />

  return (
    <div className={style.container}>
      {trends.map(movie => (
        <Card key={movie.id} {...movie} />
      ))}
    </div>
  )
}
