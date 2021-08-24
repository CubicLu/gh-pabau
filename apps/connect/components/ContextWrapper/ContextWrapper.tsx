import { LoadingOutlined } from '@ant-design/icons'
import { useConnectGetJwtClientMutation } from '@pabau/graphql'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { ClientContext } from './context/ClientContext'

const ContextWrapper: FC = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [jwtToken, setJwtToken] = useState(null)
  const router = useRouter()
  const [connectGetJwtClientMutation] = useConnectGetJwtClientMutation({
    onCompleted(response) {
      setLoggedInUser(response.ConnectGetJWTClient)
    },
    onError(error) {
      console.log('error', error)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== jwtToken) {
      setJwtToken(token)
    }
  }, [jwtToken])

  useEffect(() => {
    if (jwtToken) {
      connectGetJwtClientMutation({
        variables: {
          token: jwtToken,
        },
      })
    }
  }, [jwtToken, connectGetJwtClientMutation])

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  if (loggedInUser || router.pathname === '/') {
    return (
      <ClientContext.Provider value={[loggedInUser, setLoggedInUser]}>
        {children}
      </ClientContext.Provider>
    )
  } else {
    return (
      <Spin
        style={{
          position: 'absolute',
          margin: 'auto',
          left: '50%',
          top: '45%',
          textAlign: 'center',
        }}
        size={'large'}
        delay={0}
        spinning={true}
        indicator={antIcon}
      />
    )
  }
}

export default ContextWrapper
