import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useApolloClient } from '@apollo/client'
import { useRetrieveAuthenticatedUserLazyQuery } from '@pabau/graphql'
import createPersistedState from 'use-persisted-state'
import jwt from 'jsonwebtoken'
import Login from '../pages/login'
import { AuthenticatedUser, JwtUser } from '@pabau/yup'

interface P {
  // The currently logged in user details (from JWT and Maybe the Database)
  me?: jwt.JwtPayload & Partial<AuthenticatedUser> & JwtUser

  // Log in (raw)
  login(jwt: string): Promise<void>

  // Log out (universal)
  logout(): Promise<void>
}

const defaultValue: P = { me: null, login: null, logout: null }

const Context = createContext<P>(defaultValue)
const usePersistedTokenState = createPersistedState('token')

export const UserProvider: FC = ({ children }) => {
  // A total hack, remove this block sometime:
  ;(() => {
    if (typeof window !== 'undefined') {
      const current = window.localStorage.getItem('token')
      if (current?.length > 0 && current !== 'null' && current[0] !== '"') {
        console.log('Found old token, deleting')
        window.localStorage.removeItem('token')
      }
    }
  })()
  // End of hack
  const jwtTokenG = typeof window !== 'undefined' ? window['token'] : null

  const [token, setToken] = usePersistedTokenState(null)

  const { resetStore, clearStore } = useApolloClient()
  const [
    retrieveAuthenticatedUser,
    { data },
  ] = useRetrieveAuthenticatedUserLazyQuery({
    fetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
    onError(e) {
      console.log('Silent error:', e)
    },
  })
  const loginByJWt = async (jwt) => {
    setToken(jwt)
    try {
      await resetStore()
    } catch (error) {
      console.error('Silenced error whilst resetting the apollo store', error)
    }
    // setDidLogin(true)
  }
  useEffect(() => {
    if (jwtTokenG) {
      loginByJWt(jwtTokenG)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtTokenG])
  useEffect(() => {
    if (token) {
      retrieveAuthenticatedUser()
    }
  }, [retrieveAuthenticatedUser, token])

  const jwtUser = useMemo<(jwt.JwtPayload & JwtUser) | null>(() => {
    if (!token) return null
    try {
      return jwt.decode(token, { json: true }) as jwt.JwtPayload & JwtUser
    } catch {
      return null
    }
  }, [token])

  const authenticated: AuthenticatedUser = data?.me
    ? {
        ...jwtUser,
        companyName: data.me.Company.details.company_name,
        username: data.me.username,
        fullName: data.me.full_name,
        companies: data.me.companies,
        imageUrl: data.me.image,
        companyDateFormat: data.me.Company.details.date_format,
        currency: data.me.Company.details.currency,
      }
    : null

  const me: Partial<AuthenticatedUser> & JwtUser =
    token && jwtUser ? (data?.me ? authenticated : jwtUser) : null

  const [didLogin, setDidLogin] = useState(false)
  useEffect(() => {
    if (didLogin && me?.pab1) {
      window.location.replace(
        'https://crm.pabau.com/auth.php?t=' +
          me.pab1 +
          '&r=' +
          encodeURIComponent(window.location.href)
      )
    }
  }, [me, didLogin])

  let ret: ReactNode = null
  if (typeof window !== 'undefined') {
    if (!me) ret = <Login />
    else ret = children
  }

  return (
    <Context.Provider
      value={{
        me: me,
        async login(jwt) {
          setToken(jwt)
          try {
            await resetStore()
          } catch (error) {
            console.error(
              'Silenced error whilst resetting the apollo store',
              error
            )
          }
          setDidLogin(true)
        },
        async logout() {
          setToken(null)
          try {
            await clearStore()
          } catch (error) {
            console.error(
              'Silenced error whilst clearing the apollo store',
              error
            )
          }
        },
      }}
    >
      {ret}
    </Context.Provider>
  )
}

export const useUser = () => useContext(Context)
