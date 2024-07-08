import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  // console.log("useMovies ", search)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] =useState(null)


  const getMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      // se ejecuta tanto despues del try como despues del cath
      setLoading(false)
    }
  }

  return { movies, getMovies, loading }
}
