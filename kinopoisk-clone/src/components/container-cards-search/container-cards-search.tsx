import { Card } from '../movie-card/movie-card'
import { Loader } from '../loader/loader'
import style from './container-cards-search.module.css'
import type { TmdbMovieCard } from '../../types'
import { useAppSelector } from '../../redux/store'
import { useAppDispatch } from '../../redux/store'
import { addFavorite } from '../../redux/films-slice'

interface ContainerCardsSearchProps {
  movies: TmdbMovieCard[]
}

export function ContainerCardsSearch({ movies }: ContainerCardsSearchProps) {
  const { isLoading } = useAppSelector(state => state.movies)
  const dispatch = useAppDispatch();


  if (isLoading) {
    return (
      <div className={style.container}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={style.container}>
      {(!movies || movies.length === 0) ? (
        <h1 className={style.empty}>Movies not found</h1>
      ) : (
        movies.map(movie => (
          <Card key={movie.id} {...movie} onAddToFavorites={() => dispatch(addFavorite(movie.id))} />
        ))
      )}
    </div>
  )
}
