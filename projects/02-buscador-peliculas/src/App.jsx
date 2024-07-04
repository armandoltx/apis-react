import { useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { searchValidations } from './utils/validations'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const { movies } = useMovies()

  const handleSubmit = (event) => {
    event.preventDefault()
    searchValidations(search).length > 0 ? setError(searchValidations(search)) : setError(null)
  }

  const handleChange = (event) => {
  // para hacer las validaciones aqui en vez de un useeffect hay q tener en cuenta q el useSearch es asincrono por eso ponerlo en una variable (newSearch)
    const newSearch = event.target.value
    if(newSearch.startsWith(' ')) return
    setSearch(newSearch)
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
            value={search}
            name='search'
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
