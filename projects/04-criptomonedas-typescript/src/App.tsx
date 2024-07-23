import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { currencies } from "./data/index"
import { CryptoCurrenciesResponseSchema } from "./schema/schema"
import { Pair } from "./types"

function App() {
  const [pair, setPair] = useState<Pair>({
    currency: '',
    criptocurrency: ''
  })
  const [cryptoCurrencies, setCryptoCurrencies] = useState([])

  useEffect(() => {
    if(!pair.currency) return
    console.log("dentro del useEffect")
    fetchCryptos(pair.currency)
  }, [pair.currency])

  const fetchCryptos = async (currency: string) => {
    console.log("000000")
    // if (!currency) return
    try {
      const response = await fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=${currency}`)
      // const response = await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')

      if(!response.ok) throw new Error("Hubo un error...")
      const data = await response.json()
      // console.log(data)
      const r = data.Data
      // console.log(r)
      const result = CryptoCurrenciesResponseSchema.safeParse(r)
      console.log(result)
      if(result.success) {
        console.log("1111")
        console.log(result.data)
        setCryptoCurrencies(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)
    // setCurrency(
    //   event.target.value
    // )
    setPair({
      ...pair,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console.log(currency)
    // if (!currency.length) return
  }

  console.log("aqui aqui aqui")
  console.log(cryptoCurrencies[0])

  return (
    <>
      <h1>Criptomonedas</h1>
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="currency">Moneda</label>
          <select
            name="currency"
            id="currency"
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
      </form>
    </>
  )
}

export default App
