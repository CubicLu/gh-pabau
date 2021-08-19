import React from 'react'
import { AppProps } from 'next/app'
import TranslationWrapper from '../components/TranslationWrapper'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
require('../../../libs/ui/src/styles/antd.less')

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
})

function Connect({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <TranslationWrapper>
        <Component {...pageProps} />
      </TranslationWrapper>
    </ApolloProvider>
  )
}

export default Connect
