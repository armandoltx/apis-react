import { useEffect, useState } from "react"
import { CryptoCurrenciesResponseSchema, CryptoDataSchema } from "../schema/schema"
import { Pair, CryptoCurrency } from "../types"
import { fetchCryptos } from "../services/cryptos"

  export function useCrypto({ setLoading }) {
    const [pair, setPair] = useState<Pair>({
      currency: '',
      criptocurrency: ''
    })
    const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([])

    const refreshCryptos = async () => {
      setLoading(true)
      const cryptos = await fetchCryptos(pair.currency)
      console.log("QQQQQQQQQQQQQ")
      console.log(cryptos)
      setCryptoCurrencies(cryptos)
      setLoading(false)
    }

    useEffect(() => {
      if (!pair.currency) return
      refreshCryptos()
    }, [pair.currency])

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

    return { pair, setPair, cryptoCurrencies, fetchCryptoData }
  }