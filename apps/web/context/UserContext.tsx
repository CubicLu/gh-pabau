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
import { useRouter } from 'next/router'

interface P {
  // The currently logged in user details (from JWT and Maybe the Database)
  me?: jwt.JwtPayload & Partial<AuthenticatedUser> & JwtUser

  // Log in (raw)
  login(jwt: string): Promise<void>

  // Log out (universal)
  logout(): Promise<void>

  // Access to the underlying Apollo Client instance
  query: any
}

const defaultValue: P = { me: null, login: null, logout: null, query: null }

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
  // Getting JWT Token from query params
  const router = useRouter()
  const jwtTokenGet = router.query['token']

  const [token, setToken] = usePersistedTokenState(null)

  const { resetStore, clearStore, query } = useApolloClient()
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
    if (jwtTokenGet) {
      loginByJWt(jwtTokenGet)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtTokenGet])
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
        timezone: data.me.Company.details.timezone.php_format,
        timeFormat: data.me.Company.CompanyMeta?.[0]?.meta_value ?? '12',
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
        query,
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
