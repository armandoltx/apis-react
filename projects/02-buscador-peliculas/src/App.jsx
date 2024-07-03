
import './App.css'

function App() {

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
        Aqui van los resultados de la pelicula con el titulo el ano y la imagen
      </main>
    </div>
  )
}
export default App
