import './App.css'
import responseMovies from './mocks/with-results.json'
import withNoResults from './mocks/no-results.json'

function App() {
  // console.log(responseMovies.Search)
  const movies = responseMovies.Search
  const hasMovies = movies?.length > 0


  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>

        <form className='form'>
          <input type="text" placeholder="Avengers, Star Wars..." />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main>
        {hasMovies ?
          (
            <ul>
              {
                movies.map(movie => (
                  <li key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                  </li>
              ))
              }
            </ul>
          ) : (
            <p>No se encontraron peliculas con ese titulo.</p>
          )}
      </main>
    </div>
  )
}
export default App
