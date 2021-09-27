import { createContext } from 'react'

export const SettingsContext = createContext(null)

export const SettingsProvider = SettingsContext.Provider
export const SettingsConsumer = SettingsContext.Consumer
