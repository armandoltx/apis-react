import { CryptoCurrenciesResponseSchema } from "../schema/schema"

export const fetchCryptos = async (currency: string) => {
  console.log("000000")
  // setLoading(true)
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
      // setCryptoCurrencies(result.data)
      return(result.data)
    }
  } catch (error) {
    console.log(error)
  }
}
