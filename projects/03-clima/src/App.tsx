import './App.css'
import Form from "./components/Form"
import WeatherDetail from './components/WeatherDetail'

function App() {

  return (
    <>
      <div className="wrapper">
        <div className="header">
        <h1>Buscador de Clima</h1>
        </div>
        <div className="main">
          <Form />
          <WeatherDetail />
        </div>
      </div>
    </>
  )
}

export default App
