import { ChangeEvent, FormEvent, useState } from "react"
import { currencies } from "../data/index"
import { useCrypto } from "../hooks/useCrypto"
import { fetchCryptoData } from "../services/cryptoData"
import { Pair, CryptoData } from "../types"

interface FormProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCryptoData: React.Dispatch<React.SetStateAction<CryptoData>>
}

export default function Form({ setLoading, setCryptoData }: FormProps) {

  const [pair, setPair] = useState<Pair>({
    currency: '',
    criptocurrency: ''
  })
  const [error, setError] = useState('')
  const { cryptoCurrencies } = useCrypto({ setLoading , pair})

  const cryptoData = async () => {
    setLoading(true)
    const data = await fetchCryptoData(pair)
    if(data) setCryptoData(data)
    setLoading(false)
  }

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
    cryptoData()
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
