import { useEffect, useState } from "react"
import { Pair, CryptoCurrency } from "../types"
import { fetchCryptos } from "../services/cryptos"

interface CryptoProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  pair: Pair
}
export function useCrypto({ setLoading, pair }: CryptoProps) {

  const [cryptoCurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([])

  const refreshCryptos = async () => {
    setLoading(true)
    const cryptos = await fetchCryptos(pair.currency)
    if(cryptos) setCryptoCurrencies(cryptos)
    setLoading(false)
  }

  useEffect(() => {
    if (!pair.currency) return
    refreshCryptos()
  }, [pair.currency])

  return { cryptoCurrencies }
}