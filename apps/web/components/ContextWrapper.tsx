import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { UserContext } from '../context/UserContext'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getApolloClient } from '../pages/_app'

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
  details: {
    company_name: string
    language: string
  }
}

const ContextWrapper: FC = ({
  children,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { loading, error, data } = useQuery(CURRENT_USER, { ssr: false })
  if (error) {
    console.error(error)
  }
  if (loading) {
    return <div>Loading </div>
  }

  return (
    <UserContext.Provider value={data as User}>{children}</UserContext.Provider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = getApolloClient()
  const user = await apolloClient.query({
    query: CURRENT_USER,
  })

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      test: 'test',
      currentUser: user,
    },
    revalidate: 1,
  }
}

export default ContextWrapper
