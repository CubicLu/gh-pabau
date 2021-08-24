import React, { FunctionComponent } from 'react'
import { gql, useQuery } from '@apollo/client'
import { UserContext } from '../context/UserContext'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'

export interface User {
  id: number
  username: string
  full_name: string
  admin: number
  company: Company
  timezone: string
  image?: string
}

export interface Company {
  id: number
  remote_url: string
  details: {
    company_name: string
    language: string
    currency: string
  }
}

const ContextWrapper: FunctionComponent = ({ children }) => {
  const router = useRouter()
  const { loading, error, data } = useQuery(
    gql`
      query retrieveAuthenticatedUser {
        me {
          id
          username
          full_name
          admin
          timezone
          image
          company: Company {
            id
            remote_url
            details {
              company_name
              language
              currency
            }
          }
        }
      }
    `,
    {
      ssr: false,
      fetchPolicy: 'cache-first',
      // returnPartialData: true,
      onError: (e) => {
        console.log('ContextWrapper onError', e)
      },
    }
  )
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  if (
    (router.pathname.includes('login') || router.pathname.includes('signup')) &&
    data?.me?.id
  ) {
    window.location.href = window.location.origin
  }

  if (error) {
    console.error('ContextWrapper error', error)
  }

  if (loading) {
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
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export default ContextWrapper
