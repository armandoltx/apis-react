import {ListOfMovies} from "./ListOfMovies"
import {NoMovies} from "./NoMovies"

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies ? <ListOfMovies movies={movies} /> : <NoMovies />
  )
}
