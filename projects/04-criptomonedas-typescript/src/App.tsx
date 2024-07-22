import { useEffect, useState } from "react"
import { currencies } from "./data/index"
import { CryptoCurrenciesResponseSchema } from "./schema/schema"

function App() {
  const [currency, setCurrency] = useState('')
  const [cryptoCurrencies, setCryptoCurrencies] = useState([])

  useEffect(() => {
    if(!currency) return
    console.log("dentro del useEffect")
    fetchCryptos(currency)
  }, [currency])

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

  const handleChange = (event) => {
    // console.log(event.target.value)
    setCurrency(
      event.target.value
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(currency)
    if (!currency.length) return
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
          <label htmlFor="cripto-currency">Criptomoneda</label>
          <select
            name="cripto-currency"
            id="cripto-currency"
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
