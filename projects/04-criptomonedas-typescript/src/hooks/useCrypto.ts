import { useEffect, useState } from "react"
import { CryptoCurrency } from "../types"
import { fetchCryptos } from "../services/cryptos"

  export function useCrypto({ setLoading, pair }) {

    const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([])

    const refreshCryptos = async () => {
      setLoading(true)
      const cryptos = await fetchCryptos(pair.currency)
      setCryptoCurrencies(cryptos)
      setLoading(false)
    }

    useEffect(() => {
      if (!pair.currency) return
      refreshCryptos()
    }, [pair.currency])

    return { cryptoCurrencies }
  }