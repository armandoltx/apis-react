import { ChangeEvent, FormEvent, useState } from "react"
import { z } from 'zod'
import type { SearchType } from "../types"
import { countries } from "../data/countries"
import Alert from "./Alert"

// schema para zod
const WeatherSchema = z.object({  // es un objeto pq la API devuelve un objeto -> {coord: {…}, weather: Array(1), base: 'stations', main: {…}, visibility: 10000, …}
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number()
  })
})

type Weather = z.infer<typeof WeatherSchema>

export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  const [error, setError] = useState('')
  const [weather, setWeather] = useState<Weather>({
    name: '',
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0
    }
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)
    setSearch({
      ...search,
      [event.target.name]: event.target.value
    })
  }

  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_API_KEY
    console.log("llamando a la API")

    try {
      const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`)
      // console.log(geoResponse)
      if (!geoResponse.ok) throw new Error('Hubo un error con la API...')

      const geoData = await geoResponse.json()
      console.log(geoData)
      const lat = geoData[0].lat
      const lon = geoData[0].lon
      console.log(lat, lon)

      if ([lat, lon].includes('')) throw new Error('Latitud o Longitud no existen')

      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)

      const weatherData = await weatherResponse.json()
      // console.log(weatherData)
      const result = WeatherSchema.safeParse(weatherData)
      // console.log(result)
      if(result.success) {
        console.log(result.data.name)
        setWeather(result.data)
      }


    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //Validamos los campos

    if (Object.values(search).includes('')) {
      // console.log("Los campos estan vacios...")
      setError('Todos los campos son obligatorios')
      return
    }

    // llamamos a la API
    fetchWeather(search)
  }



  return (
    <form
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="country">Pais</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un Pais --</option>
          {countries.map(country => (
            <option
              key={country.code}
              value={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value="Consultar Clima" />
      {error && <Alert>{error}</Alert>}
    </form>
  )
}
