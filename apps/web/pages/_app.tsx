import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { OperationDefinitionNode } from 'graphql'
import i18next from 'i18next'
import { AppProps } from 'next/app'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import 'react-phone-input-2/lib/style.css'
import 'react-quill/dist/quill.snow.css'
import ContextWrapper from '../components/Auth/ContextWrapper'
import { languages } from '@pabau/i18n'
import { setContext } from '@apollo/client/link/context'
import { CookiesProvider } from 'react-cookie'
require('../styles/global.less')
require('../../../libs/ui/src/styles/antd.less')
require('react-phone-input-2/lib/style.css')

const cache = new InMemoryCache()
const GRAPHQL_ENDPOINT = 'wss://api.new.pabau.com/v1/graphql'
const LOCAL_GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql'
const NEXT_PUBLIC_GRAPHQL_ENDPOINT = LOCAL_GRAPHQL_ENDPOINT

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon])
library.add(...iconList)
const httpLink = new HttpLink({
  uri: NEXT_PUBLIC_GRAPHQL_ENDPOINT,
})
const wsLink = process.browser
  ? new WebSocketLink({
      uri: GRAPHQL_ENDPOINT,
      options: {
        reconnect: true,
        connectionParams: {
          authToken: '',
        },
      },
    })
  : null

// Let Apollo figure out if the request is over ws or http
const terminatingLink = wsLink
  ? split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(
          query
        ) as OperationDefinitionNode
        return (
          kind === 'OperationDefinition' &&
          operation === 'subscription' &&
          process.browser
        )
      },
      wsLink,
      httpLink
    )
  : httpLink
const client = new ApolloClient({
  ssrMode: false,
  link: ApolloLink.from([authLink, terminatingLink]),
  cache,
})
console.log(languages)
i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  resources: languages,
})

export default function CustomApp({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18next}>
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
          <ContextWrapper>
            <Component {...pageProps} />
          </ContextWrapper>
        </I18nextProvider>
      </ApolloProvider>
    </CookiesProvider>
  )
}
