import { CryptoCurrenciesResponseSchema } from "../schema/schema"

export const fetchCryptos = async (currency: string) => {
  if (!currency) return
  try {
    const response = await fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=${currency}`)

    if (!response.ok) throw new Error("Hubo un error...")
    const data = await response.json()
    const r = data.Data
    const result = CryptoCurrenciesResponseSchema.safeParse(r)

    if (result.success) {
      return(result.data)
    }
  } catch (error) {
    console.log(error)
  }
}
