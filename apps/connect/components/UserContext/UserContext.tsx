import React, { createContext, FC, useContext } from 'react'
// import { useApolloClient } from '@apollo/client'
import { RetrieveAuthenticatedUserQuery } from '@pabau/graphql'
// import { Spin } from 'antd'
// import { LoadingOutlined } from '@ant-design/icons'
// import createPersistedState from 'use-persisted-state'
import jwt from 'jsonwebtoken'
//import { JwtAuthenticationToken } from '@pabau/yup'

interface P {
  me?: jwt.JwtPayload &
    /*JwtAuthenticationToken & */
    Partial<RetrieveAuthenticatedUserQuery['me']>
  login(jwt: string): Promise<void>
  logout(): Promise<void>
}

const Context = createContext<P>({ me: null, login: null, logout: null })
//const usePersistedTokenState = createPersistedState('token')
export const UserProvider: FC = ({ children }) => {
  // const [token, setToken] = usePersistedTokenState(null)
  // const { resetStore } = useApolloClient()
  // const [
  //   retrieveAuthenticatedUser,
  //   { loading, data },
  // ] = useRetrieveAuthenticatedUserLazyQuery({
  //   fetchPolicy: 'cache-first',
  //   errorPolicy: 'ignore',
  //   onError(e) {
  //     console.log('Silent error:', e)
  //   },
  // })
  //
  // useEffect(() => {
  //   if (token) {
  //     console.log('about to retrieveAuthenticatedUser', token)
  //     retrieveAuthenticatedUser()
  //   }
  // }, [retrieveAuthenticatedUser, token])
  //
  // const jwtUser = useMemo(
  //   () =>
  //     jwt.decode(token, { json: true }) as jwt.JwtPayload &
  //       JwtAuthenticationToken,
  //   [token]
  // )
  // const me = token ? (data?.me ? { ...jwtUser, ...data.me } : jwtUser) : null
  return (
    <Context.Provider
      value={{
        me: {
          fname: 'Nenad',
          lname: 'Jovanovski',
          contact_id: 0,
        },
        async login(/*jwt*/) {
          // setToken(jwt)
          // await resetStore()
        },
        async logout() {
          // setToken(null)
          // await resetStore()
        },
      }}
    >
      {/*{!me ? (*/}
      {/*  <div>TODO: LOGIN GOES HERE</div>*/}
      {/*) : !loading ? (*/}
      {/*  children*/}
      {/*) : (*/}
      {/*  <Spin*/}
      {/*    style={{*/}
      {/*      position: 'absolute',*/}
      {/*      margin: 'auto',*/}
      {/*      left: '50%',*/}
      {/*      top: '45%',*/}
      {/*      textAlign: 'center',*/}
      {/*    }}*/}
      {/*    size={'large'}*/}
      {/*    delay={0}*/}
      {/*    spinning={true}*/}
      {/*    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}*/}
      {/*  />*/}
      {/*)}*/}
      {children}
    </Context.Provider>
  )
}

export const useUser = () => useContext(Context)
