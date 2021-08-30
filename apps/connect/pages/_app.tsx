import React from 'react'
import { AppProps } from 'next/app'
import TranslationWrapper from '../components/TranslationWrapper'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import SettingsProvider from '../context/settings-context'
require('../../../libs/ui/src/styles/antd.less')

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
})

function Connect({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SettingsProvider>
        <TranslationWrapper>
          <Component {...pageProps} />
        </TranslationWrapper>
      </SettingsProvider>
    </ApolloProvider>
  )
}

export default Connect
