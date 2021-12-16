import React from 'react'
import { AppProps } from 'next/app'
import TranslationWrapper from '../components/TranslationWrapper'
import SettingsContextWrapper from '../components/SettingsContextWrapper'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { OperationDefinitionNode } from 'graphql'
require('../../../libs/ui/src/styles/antd.less')
require('react-phone-input-2/lib/style.css')

const GRAPHQL_WS_ENDPOINT =
  process.env.NEXT_PUBLIC_WS_ENDPOINT || 'wss://api-v2.new.pabau.com/v1/graphql'
const GRAPHQL_HTTP_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  'https://api-v2.new.pabau.com/v1/graphql'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('connect_token')
  const rurl = localStorage.getItem('remoteurl')
  let token2 = null
  if (token) token2 = JSON.parse(token)
  return {
    headers: token2
      ? {
          ...headers,
          authorization: `Bearer ${token2}`,
          remoteurl: rurl,
        }
      : { ...headers, remoteurl: rurl },
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
  fetch,
  uri: GRAPHQL_HTTP_ENDPOINT,
})

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
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

function Connect({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SettingsContextWrapper>
        <TranslationWrapper>
          <Component {...pageProps} />
        </TranslationWrapper>
      </SettingsContextWrapper>
    </ApolloProvider>
  )
}

export default Connect
