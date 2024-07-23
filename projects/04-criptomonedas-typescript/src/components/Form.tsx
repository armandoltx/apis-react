import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { currencies } from "../data/index"
import { CryptoCurrenciesResponseSchema, CryptoDataSchema } from "../schema/schema"
import { Pair, CryptoCurrency } from "../types"

export default function Form({ setLoading, setCryptoData }) {

  const [pair, setPair] = useState<Pair>({
    currency: '',
    criptocurrency: ''
  })
  const [cryptoCurrencies, setCryptoCurrencies] = useState < CryptoCurrency[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!pair.currency) return
    console.log("dentro del useEffect")
    fetchCryptos(pair.currency)
  }, [pair.currency])

  const fetchCryptos = async (currency: string) => {
    console.log("000000")
    setLoading(true)
    // if (!currency) return
    try {
      const response = await fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=${currency}`)
      // const response = await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')

      if (!response.ok) throw new Error("Hubo un error...")
      const data = await response.json()
      // console.log(data)
      const r = data.Data
      // console.log(r)
      const result = CryptoCurrenciesResponseSchema.safeParse(r)
      console.log(result)
      if (result.success) {
        console.log("1111")
        console.log(result.data)
        setCryptoCurrencies(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCryptoData = async (pair: Pair) => {
    console.log(pair)
    setLoading(true)
    try {
      const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`)
      if (!response.ok) throw new Error('Hubo un error fetching data...')
      const data = await response.json()
      console.log(data)
      console.log(data.DISPLAY[pair.criptocurrency][pair.currency])
      const result = CryptoDataSchema.safeParse(data.DISPLAY[pair.criptocurrency][pair.currency])
      // console.log(result)
      if (result.success) {
        // console.log(result.data)
        setCryptoData(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally { setLoading(false) }
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
