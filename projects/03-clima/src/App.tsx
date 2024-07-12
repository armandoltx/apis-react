import './App.css'
import Form from "./components/Form"
import WeatherDetail from './components/WeatherDetail'
import Spinner from './components/Spinner'
import { useWeather } from './hooks/useWeather'

function App() {
  const { loading, weather, fetchWeather } = useWeather()

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
        </div>
      </div>
    </>
  )
}

export default App
