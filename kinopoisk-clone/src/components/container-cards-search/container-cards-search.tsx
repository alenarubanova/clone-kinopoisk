import { Card } from '../movie-card/movie-card'
import { Loader } from '../loader/loader'
import type { TmdbFilmCard } from '../../types'
import { useAppSelector, useAppDispatch } from '../../redux/store'
import { addFavorite, removeFavorite } from '../../redux/films-slice'
import style from './container-cards-search.module.css'

interface ContainerCardsSearchProps {
  films: TmdbFilmCard[]
}

export function ContainerCardsSearch({ films }: ContainerCardsSearchProps) {
  const { isLoading, favorites } = useAppSelector(state => state.films)

  const dispatch = useAppDispatch()

  if (isLoading) {
    return (
      <div className={style.container}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={style.container}>
      {(!films || films.length === 0) ? (
        <h1 className={style.empty}>Films not found</h1>
      ) : (
        films.map(film => {
          const isFavorite = favorites.some(f => f.id === film.id)
          return (
            <Card
              key={film.id}
              {...film}
              isFavorite={isFavorite}
              onAddToFavorites={() => dispatch(addFavorite(film))}
              onRemoveFromFavorites={() => dispatch(removeFavorite(film.id))}
              showTrash={false}
            />
          )
        })
      )}
    </div>
  )
}
