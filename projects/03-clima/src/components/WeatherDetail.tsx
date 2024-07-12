import { Weather } from "../hooks/useWeather"

type WeatherDetailProps = {
  weather: Weather  //importamos ==> export type Weather = z.infer<typeof WeatherSchema>
}

export default function WeatherDetail({ weather }: WeatherDetailProps) {

  return (
    <>
      <div className="results">
        <h2>Clima de: {weather.name}</h2>
        <p className="current">Temperatura Actual: {weather.main.temp}&deg;</p>
        <div className="min-max-temp">
          <p>Min: {weather.main.temp_min}&deg;</p>
          <p>Max: {weather.main.temp_max}&deg;</p>
        </div>
      </div>
    </>
  )
}
