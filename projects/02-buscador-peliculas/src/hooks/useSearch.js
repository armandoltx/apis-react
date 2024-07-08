import { useState } from 'react'

export function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  const searchValidations = (search) => {
    console.log("here here here ", search)
    if(search === ' ') return 'No se puede buscar una pelicula vacia'
    if(search.match(/^\d+$/)) return 'No se puede buscar una pelicula con un numero'
    if(search.length < 3) return "La busqueda tiene que ser mayor de 3 caracteres"
  }

  return { search, setSearch, error, setError, searchValidations }
}
