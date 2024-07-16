import { z } from 'zod'
import { CurrencySchema } from '../schema/schema'

export type Currency = z.infer<typeof CurrencySchema>