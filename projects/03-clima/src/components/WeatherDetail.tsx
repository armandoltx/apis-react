import { Weather } from "../hooks/useWeather"
import { formatTemperature } from "../utils"

type WeatherDetailProps = {
  weather: Weather  //importamos ==> export type Weather = z.infer<typeof WeatherSchema>
}

export default function WeatherDetail({ weather }: WeatherDetailProps) {

  return (
    <>
      <div className="results">
        <h2>Clima de: {weather.name}</h2>
        <p className="current">Temperatura Actual: {formatTemperature(weather.main.temp)}&deg;C</p>
        <div className="min-max-temp">
          <p>Min: {formatTemperature(weather.main.temp_min)}&deg;C</p>
          <p>Max: {formatTemperature(weather.main.temp_max)}&deg;C</p>
        </div>
      </div>
    </>
  )
}
