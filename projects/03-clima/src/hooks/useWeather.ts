import { useState } from "react"
import { z } from 'zod'
import type { SearchType } from "../types"

// schema para zod
const WeatherSchema = z.object({  // es un objeto pq la API devuelve un objeto -> {coord: {…}, weather: Array(1), base: 'stations', main: {…}, visibility: 10000, …}
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number()
  })
})

export type Weather = z.infer<typeof WeatherSchema>

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0
  }
}

export function useWeather() {

  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState<Weather>(initialState)
  const [notFound, setNotFound] = useState(false)

  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY
    setLoading(true)
    setWeather(initialState)
    setNotFound(false)

    try {
      const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`)
      // console.log(geoResponse)
      if (!geoResponse.ok) throw new Error('Hubo un error con la API...')

      const geoData = await geoResponse.json()
      // Comprobar si existe
      if(!geoData[0]) {
        setNotFound(true)
        return
      }

      const lat = geoData[0].lat
      const lon = geoData[0].lon
      console.log(lat, lon)

      if ([lat, lon].includes('')) throw new Error('Latitud o Longitud no existen')

      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

      const weatherData = await weatherResponse.json()
      // console.log(weatherData)
      const result = WeatherSchema.safeParse(weatherData)
      // console.log(result)
      if (result.success) {
        console.log(result.data.name)
        setWeather(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, weather, fetchWeather, notFound }
}
