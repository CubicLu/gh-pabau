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
import 'react-image-crop/dist/ReactCrop.css'
import ContextWrapper from '../components/ContextWrapper'
import { languages } from '@pabau/i18n'
import { setContext } from '@apollo/client/link/context'
import { CookiesProvider } from 'react-cookie'
require('../styles/global.less')
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
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }
})
const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon])
library.add(...iconList)
const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_ENDPOINT,
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
        <CookiesProvider>
          <ContextWrapper>
            <Component {...pageProps} />
          </ContextWrapper>
        </CookiesProvider>
      </I18nextProvider>
    </ApolloProvider>
  )
}
