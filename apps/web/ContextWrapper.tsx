import React, { FC } from 'react'
import { gql, QueryResult, useQuery } from '@apollo/client'
import { UserContext } from './context/UserContext'

const CURRENT_USER = gql`
  query retrieveAuthenticatedUser {
    me {
      id
      username
      full_name
      company {
        id
        details {
          company_name
          language
        }
      }
    }
  }
`

interface User {
  id: string
  username: string
  full_name: string
  company: Company
}

interface Company {
  id: number
  details: Details
}

interface Details {
  company_name: string
  language: string
}

const ContextWrapper: FC = ({ children }) => {
  const me: QueryResult<User> = useQuery(CURRENT_USER)

  return <UserContext.Provider value={me}>{children}</UserContext.Provider>
}

export default ContextWrapper
