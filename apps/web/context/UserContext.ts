import { createContext } from 'react'
import { User } from '../components/ContextWrapper'

export const UserContext = createContext<{ me: User }>(null)

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
