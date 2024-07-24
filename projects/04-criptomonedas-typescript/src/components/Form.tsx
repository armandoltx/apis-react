import { ChangeEvent, FormEvent, useState } from "react"
import { currencies } from "../data/index"
import { useCrypto } from "../hooks/useCrypto"

export default function Form({ setLoading, setCryptoData }) {

  const [error, setError] = useState('')
  const { pair, setPair, cryptoCurrencies, fetchCryptoData } = useCrypto({ setLoading })

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Validacion
    if(Object.values(pair).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }
    setError('')
    // consultar la API
    fetchCryptoData(pair)
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="currency">Moneda</label>
        <select
          name="currency"
          id="currency"
          value={pair.currency}
          onChange={handleChange}
        >
          <option value="">-- Selecciona una Moneda --</option>
          {currencies.map(country => (
            <option
              key={country.code}
              value={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="criptocurrency">Criptomoneda</label>
        <select
          name="criptocurrency"
          id="criptocurrency"
          value={pair.criptocurrency}
          onChange={handleChange}
        >
          <option value="">-- Selecciona una Criptomoneda --</option>
          {cryptoCurrencies && cryptoCurrencies.map((crypto) => (
            <option
              key={crypto.CoinInfo.Name}
              value={crypto.CoinInfo.Name}
            >
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Cotizar" />
      {error}
    </form>
  )
}
