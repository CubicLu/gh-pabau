import React from 'react'
import { AppProps } from 'next/app'
import 'react-phone-input-2/lib/style.css'
import 'react-quill/dist/quill.snow.css'
import 'react-image-crop/dist/ReactCrop.css'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { languages } from '@pabau/i18n'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { OperationDefinitionNode } from 'graphql'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import ContextWrapper from '../components/ContextWrapper/ContextWrapper'
require('../../../libs/ui/src/styles/antd.less')
require('react-phone-input-2/lib/style.css')

const cache = new InMemoryCache({ resultCaching: true })

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (typeof window !== 'undefined') window.debug = { cache }

const GRAPHQL_WS_ENDPOINT =
  process.env.NEXT_PUBLIC_WSS_ENDPOINT || 'wss://api.new.pabau.com/v1/graphql'
const GRAPHQL_HTTP_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  'https://api.new.pabau.com/v1/graphql'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: token
      ? {
          ...headers,
          authorization: `Bearer ${token}`,
        }
      : headers,
  }
})

const wsLink = process.browser
  ? new WebSocketLink({
      uri: GRAPHQL_WS_ENDPOINT,
      options: {
        reconnect: true,
        connectionParams: {
          authToken: '',
        },
      },
    })
  : null

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_ENDPOINT,
})

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

export const getApolloClient = () => {
  return new ApolloClient({
    ssrMode: false,
    link: ApolloLink.from([authLink, terminatingLink]),
    cache,
  })
}

function CustomApp({ Component, pageProps }: AppProps) {
  //init translate
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: pageProps.lang ? pageProps.lang : null,
    fallbackLng: 'en',
    keySeparator: false,
    resources: languages,
  })

  return (
    <ApolloProvider client={getApolloClient()}>
      <ContextWrapper>
        <Component {...pageProps} />
      </ContextWrapper>
    </ApolloProvider>
  )
}

export default CustomApp
