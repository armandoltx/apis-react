import { ChangeEvent, FormEvent, useState } from "react"
import { z } from 'zod'
import type { SearchType } from "../types"
import { countries } from "../data/countries"
import Alert from "./Alert"


export default function Form({ fetchWeather }) {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  const [error, setError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)
    setSearch({
      ...search,
      [event.target.name]: event.target.value
    })
    setError('')
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
