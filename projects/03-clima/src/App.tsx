import './App.css'
import Form from "./components/Form"
import WeatherDetail from './components/WeatherDetail'
import Spinner from './components/Spinner'
import { useWeather } from './hooks/useWeather'
import Alert from './components/Alert'

function App() {
  const { loading, weather, fetchWeather, notFound } = useWeather()

  const hasWeatherData = weather?.name?.length > 0

  return (
    <>
      <div className="wrapper">
        <div className="header">
        <h1>Buscador de Clima</h1>
        </div>
        <div className="main">
          <Form fetchWeather={fetchWeather}/>
          { loading && <Spinner /> }
          { hasWeatherData && <WeatherDetail weather={weather}/> }
          { notFound && <Alert>Ciudad no encontrada</Alert> }
        </div>
      </div>
    </>
  )
}

export default App
