import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  // console.log("useMovies ", search)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] =useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(
    async ({ search }) => {
      if(search === previousSearch.current) return
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (error) {
        setError(error.message)
      } finally {
        // se ejecuta tanto despues del try como despues del cath
        setLoading(false)
      }
    }, [])

  const sortedMovies = useMemo(() => {
    if(!movies) return

    const moviesSorted = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
    return moviesSorted
  }, [sort, movies])



  return { movies: sortedMovies, getMovies, loading }
}
