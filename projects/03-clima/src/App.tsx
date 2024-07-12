import './App.css'
import Form from "./components/Form"
import WeatherDetail from './components/WeatherDetail'
import { useWeather } from './hooks/useWeather'

function App() {
  const { weather, fetchWeather } = useWeather()

  const hasWeatherData = weather?.name?.length > 0

  return (
    <>
      <div className="wrapper">
        <div className="header">
        <h1>Buscador de Clima</h1>
        </div>
        <div className="main">
          <Form fetchWeather={fetchWeather}/>
          { hasWeatherData && <WeatherDetail weather={weather}/> }
        </div>
      </div>
    </>
  )
}

export default App
