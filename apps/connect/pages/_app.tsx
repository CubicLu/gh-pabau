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
      <style jsx global>{`
        @font-face {
          font-family: 'Circular-Std-Black';
          src: local('Circular-Std-Black'),
            url(../public/fonts/CircularStd-Black.otf) format('opentype');
        }
        @font-face {
          font-family: 'Circular-Std-Book';
          src: url('/fonts/CircularStd-Book.otf') format('opentype');
        }

        @font-face {
          font-family: 'Circular-Std-Medium';
          src: url('/fonts/CircularStd-Medium.otf') format('opentype');
        }
      `}</style>
      <TranslationWrapper>
        <Component {...pageProps} />
      </TranslationWrapper>
    </ApolloProvider>
  )
}

export default Connect
