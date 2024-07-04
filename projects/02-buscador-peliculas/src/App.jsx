import { useState, useEffect } from 'react'
import { Movies } from './components/Movies'
import {useMovies} from './hooks/useMovies'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const { movies } = useMovies()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ query })
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (query === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if(query.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if(query.length < 3) {
      setError("Labusqueda tiene que ser mayor de 3 caracteres")
      return
    }

    setError(null)
  },[query])

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>

        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' type="text" placeholder="Avengers, Star Wars..." />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}
export default App
