import { z } from 'zod'
import { CurrencySchema, CryptoCurrencyResponseSchema, CryptoCurrenciesResponseSchema, PairSchema, CryptoDataSchema } from '../schema/schema'

export type Currency = z.infer<typeof CurrencySchema>
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type CryptoCurrencies = z.infer<typeof CryptoCurrenciesResponseSchema>
export type Pair =z.infer<typeof PairSchema>
export type CryptoData = z.infer<typeof CryptoDataSchema>
