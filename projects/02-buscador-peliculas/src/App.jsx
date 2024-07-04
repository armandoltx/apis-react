import { useState } from 'react'
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
  // para hacer las validaciones aqui en vez de un useeffect hay q tener en cuenta q el setQuery es asincrono por eso ponerlo en una variable (newQuery)
    const newQuery = event.target.value
    if(newQuery.startsWith(' ')) return
    setQuery(newQuery)
    if (newQuery === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if(newQuery.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if(newQuery.length < 3) {
      setError("Labusqueda tiene que ser mayor de 3 caracteres")
      return
    }

    setError(null)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>

        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={query}
            name='query'
            type="text"
            placeholder="Avengers, Star Wars..."
          />
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
