import './App.css'
import Form from "./compopnents/Form"

function App() {

  return (
    <>
      <div className="wrapper">
        <div className="header">
        <h1>Buscador de Clima</h1>
        </div>
        <div className="main">
          <Form />

          <div className="results">
            <h2>Clima de: Cadiz</h2>
            <p className="current">Temperatura Actual: 3333&deg;</p>
            <div className="min-max-temp">
              <p>Min: 12&deg;</p>
              <p>Max: 50&deg;</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
