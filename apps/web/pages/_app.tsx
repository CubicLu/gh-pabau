import fetch from 'cross-fetch'
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { OperationDefinitionNode } from 'graphql'
import { AppProps } from 'next/app'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-phone-input-2/lib/style.css'
import Router from 'next/router'
import 'react-quill/dist/quill.snow.css'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { languages } from '@pabau/i18n'
import ContextWrapper from '../components/ContextWrapper'
require('../styles/global.less')
require('../../../libs/ui/src/styles/antd.less')
require('react-phone-input-2/lib/style.css')

let apolloClient: ApolloClient<NormalizedCacheObject | null> = null

const cache = new InMemoryCache({
  resultCaching: true,
  typePolicies: {
    chat_room: {
      fields: {
        chats: {
          merge(existing = [], incoming: any[]) {
            console.log('APOLLO CACHE: room.chat.merge()', existing, incoming)
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
})

const GRAPHQL_WS_ENDPOINT =
  process.env.NEXT_PUBLIC_WS_ENDPOINT || 'wss://api.new.pabau.com/v1/graphql'
const GRAPHQL_HTTP_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  'https://api.new.pabau.com/v1/graphql'

//TODO: enable tree shaking
const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon])
library.add(...iconList)

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
const httpLink = new HttpLink({
  /**
   * Fixes Jest complaining about:
   *  Invariant Violation:
   *    "fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor.
   */
  fetch,

  uri: GRAPHQL_HTTP_ENDPOINT,
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (process?.browser) {
        switch (error?.message) {
          case 'Not Authorized':
            Router.replace('/403')
            break
          default:
            console.log(
              `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
            )
        }
      }
    }
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})
const getWebSocketLink = () => {
  const token = localStorage.getItem('token')
  return new WebSocketLink({
    uri: GRAPHQL_WS_ENDPOINT,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  })
}
const wsLink = process.browser ? getWebSocketLink() : null
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
      authLink.concat(httpLink)
    )
  : httpLink
apolloClient = new ApolloClient({
  ssrMode: false,
  link: ApolloLink.from([errorLink, terminatingLink]),
  cache,
})

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'en',
  keySeparator: false,
  resources: languages,
})

export default function CustomApp({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <ApolloProvider client={apolloClient}>
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
  )
}
