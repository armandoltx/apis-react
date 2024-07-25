import { CryptoDataSchema } from "../schema/schema"
import { Pair } from "../types"

export const fetchCryptoData = async (pair: Pair) => {
  try {
    const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`)
    if (!response.ok) throw new Error('Hubo un error fetching data...')
    const data = await response.json()
    const result = CryptoDataSchema.safeParse(data.DISPLAY[pair.criptocurrency][pair.currency])
    if (result.success) {
      return result.data
    }
  } catch (error) {
    console.log(error)
  }
}