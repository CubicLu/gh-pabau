import React, { FC } from 'react'
import useLogin from '../hooks/authentication/useLogin'
import { gql, QueryResult, useQuery } from '@apollo/client'
import { UserContext } from '../context/UserContext'

const CURRENT_USER = gql`
  query retrieveAuthenticatedUser($Id: Int!, $CompanyId: Int!) {
    user(where: { id: $Id }) {
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
  const [user] = useLogin(false)
  const data: QueryResult<User> = useQuery(CURRENT_USER, {
    variables: {
      Id: user?.user ?? null,
      CompanyId: user?.company ?? null,
    },
  })
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export default ContextWrapper
