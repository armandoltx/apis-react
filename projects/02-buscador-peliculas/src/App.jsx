import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import {useSearch} from './hooks/useSearch'
import './App.css'
import {useCallback, useState} from 'react'
import debounce from 'just-debounce-it'


function App() {
  const[sort, setSort] = useState(false)
  const { search, setSearch, error, setError, searchValidations } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 300)
    , [])

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(newSearch)
    // getMovies().then(res => {
    //   res.json()
    //   console.log("00000")
    //   console.log(res)
    // }).then(data => console.log(data))
    // searchValidations(search).length > 0 ? setError(searchValidations(search)) : setError(null) need to fix this
    if(!error) getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
  // para hacer las validaciones aqui en vez de un useeffect hay q tener en cuenta q el useSearch es asincrono por eso ponerlo en una variable (newSearch)
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
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
          <input type="checkbox" onChange={handleSort} checked={sort} name="" id="" />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}
export default App
