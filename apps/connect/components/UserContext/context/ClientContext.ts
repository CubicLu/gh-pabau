import { createContext } from 'react'

export const ClientContext = createContext(null)

export const ClientProvider = ClientContext.Provider
export const ClientConsumer = ClientContext.Consumer
