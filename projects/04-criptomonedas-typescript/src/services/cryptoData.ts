import { CryptoDataSchema } from "../schema/schema"
import { Pair } from "../types"

export const fetchCryptoData = async (pair: Pair) => {
  // console.log(pair)
  // setLoading(true)
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
      // setCryptoData(result.data)
      return result.data
    }
  } catch (error) {
    console.log(error)
  }
}