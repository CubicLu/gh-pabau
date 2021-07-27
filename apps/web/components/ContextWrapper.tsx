import React, { FunctionComponent } from 'react'
import { gql, useQuery } from '@apollo/client'
import { UserContext } from '../context/UserContext'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface User {
  id: string
  username: string
  full_name: string
  company: Company
}

interface Company {
  id: number
  details: {
    company_name: string
    language: string
  }
}

const ContextWrapper: FunctionComponent = ({ children }) => {
  const { loading, error, data } = useQuery(
    gql`
      query retrieveAuthenticatedUser {
        me {
          id
          username
          full_name
          admin
          timezone
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
    { ssr: false }
  )
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  if (error) {
    console.error(error)
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

  return (
    <UserContext.Provider value={data as User}>{children}</UserContext.Provider>
  )
}

export default ContextWrapper
