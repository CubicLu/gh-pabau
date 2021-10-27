/* eslint-disable import/first */
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { OperationDefinitionNode } from 'graphql'
import { AppProps } from 'next/app'
import Router from 'next/router'
import { Integrations } from '@sentry/tracing'
import * as Sentry from '@sentry/react'
import { ErrorNotification } from '../components/Notification/ErrorNotification'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-phone-input-2/lib/style.css'
import 'react-quill/dist/quill.snow.css'
import 'react-vertical-timeline-component/style.min.css'

require('../../../libs/ui/src/styles/antd.less')
import { UserProvider } from '../context/UserContext'
import TranslationWrapper from '../components/TranslationWrapper'

let apolloClient: ApolloClient<NormalizedCacheObject | null> = null

Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  release: 'pabau2',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1,
})

const cache = new InMemoryCache({
  resultCaching: true,
  typePolicies: {
    chat_room: {
      fields: {
        chats: {
          merge(existing = [], incoming: any[]) {
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

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  let token2 = null
  if (token) token2 = JSON.parse(token)
  return {
    headers: token2
      ? {
          ...headers,
          authorization: `Bearer ${token2}`,
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
            ErrorNotification(error.message)
            console.log(
              `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
            )
        }
      }
    }
  }
  if (networkError) {
    console.log(
      `[Network error]: ${networkError.message} ${networkError.stack}`
    )
  }
})
const getWebSocketLink = () => {
  return new WebSocketLink({
    uri: GRAPHQL_WS_ENDPOINT,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: () => {
        const token = localStorage.getItem('token')
        let token2 = null
        if (token) token2 = JSON.parse(token)
        return {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
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

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Sentry.ErrorBoundary fallback={() => <>An error has occurred</>}>
      <ApolloProvider client={apolloClient}>
        <UserProvider>
          <TranslationWrapper>
            <Component {...pageProps} />
          </TranslationWrapper>
        </UserProvider>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}

export default Sentry.withProfiler(CustomApp)
