import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { UserContext } from '../context/UserContext'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getApolloClient } from '../pages/_app'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

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
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  if (error) {
    console.error(error)
  }
  if (loading) {
    // return <LoadingOutlined size={'large'} className={styles.loader} spin />
    return (
      <Spin
        style={{
          position: 'absolute',
          margin: 'auto',
          left: 800,
          top: 400,
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
