import { Card } from '../movie-card/movie-card'
import style from './container-cards.module.css'
import type { TmdbMovieCard } from '../../types'

interface ContainerCardsProps {
  movies: TmdbMovieCard[]
}

export function ContainerCards({ movies }: ContainerCardsProps) {
  return (
    <div className={style.container}>
      {movies.map(movie => (
        <Card key={movie.id} {...movie} />
      ))}
    </div>
  )
}