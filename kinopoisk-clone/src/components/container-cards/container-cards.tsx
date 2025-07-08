import { Card } from '../movie-card/movie-card'
import style from './container-cards.module.css'
import type { TmdbMovieCard } from '../../types'
import { useAppDispatch } from '../../redux/store'
import { addFavorite } from '../../redux/films-slice'

interface ContainerCardsProps {
  movies: TmdbMovieCard[]
}

export function ContainerCards({ movies }: ContainerCardsProps) {
  const dispatch = useAppDispatch();
  return (
    <div className={style.container}>
      {movies.map(movie => (
        <Card
          key={movie.id}
          {...movie}
          onAddToFavorites={() => dispatch(addFavorite(movie.id))}
        />
      ))}
    </div>
  )
}