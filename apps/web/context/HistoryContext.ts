import { createContext } from 'react'

export interface HValidation {
  history: string[]
  setHistory(data: string[]): void
  back(): void
}

export const HistoryContext = createContext<HValidation>({} as HValidation)

export const HistoryProvider = HistoryContext.Provider
export const HistoryConsumer = HistoryContext.Consumer
