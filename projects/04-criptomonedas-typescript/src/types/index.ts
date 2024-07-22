import { z } from 'zod'
import { CurrencySchema, CryptoCurrencyResponseSchema, CryptoCurrenciesResponseSchema } from '../schema/schema'

export type Currency = z.infer<typeof CurrencySchema>
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type CryptoCurrencies = z.infer<typeof CryptoCurrenciesResponseSchema>
