import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { OperationDefinitionNode } from 'graphql'
import { AppProps } from 'next/app'
import 'react-image-crop/dist/ReactCrop.css'
import 'react-phone-input-2/lib/style.css'
import 'react-quill/dist/quill.snow.css'
import ContextWrapper from '../components/ContextWrapper'
import TranslationWrapper from '../components/TranslationWrapper'
require('../styles/global.less')
require('../../../libs/ui/src/styles/antd.less')
require('react-phone-input-2/lib/style.css')

const cache = new InMemoryCache({
  resultCaching: true,
  typePolicies: {
    chat_room: {
      fields: {
        chats: {
          merge(existing: any[], incoming: any[], { readField, mergeObjects }) {
            console.log('MERGING CHATS', existing, incoming)
            const ret = [...(existing || [])]
            const dupeCheck = ret.map((e) => e.__ref)
            for (const item of incoming) {
              if (!dupeCheck.includes(item.__ref)) {
                dupeCheck.push(item.__ref)
                ret.push(item)
              }
            }
            return ret

            // const merged: any[] = existing ? [...existing] : []
            // const authorNameToIndex: Record<string, number> = Object.create(
            //   null
            // )
            // if (existing) {
            //   for (const [index, author] of existing.entries()) {
            //     authorNameToIndex[readField<string>('name', author)] = index
            //   }
            // }
            // for (const author of incoming) {
            //   const name = readField<string>('name', author)
            //   const index = authorNameToIndex[name]
            //   if (typeof index === 'number') {
            //     // Merge the new author data with the existing author data.
            //     merged[index] = mergeObjects(merged[index], author)
            //   } else {
            //     // First time we've seen this author in this array.
            //     authorNameToIndex[name] = merged.length
            //     merged.push(author)
            //   }
            // }
            // return merged
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
  uri: GRAPHQL_HTTP_ENDPOINT,
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
      httpLink
    )
  : httpLink

export const client = new ApolloClient({
  ssrMode: false,
  link: ApolloLink.from([authLink, terminatingLink]),
  cache,
})

export default function CustomApp({
  Component,
  pageProps,
}: AppProps): JSX.Element {
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
      <ContextWrapper>
        <TranslationWrapper>
          <Component {...pageProps} />
        </TranslationWrapper>
      </ContextWrapper>
    </ApolloProvider>
  )
}
