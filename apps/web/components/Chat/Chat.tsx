import gql from 'graphql-tag'
import { MessagesProps, PabauMessages, useLiveQuery } from '@pabau/ui'
import * as React from 'react'

type P = Pick<MessagesProps, 'closeDrawer' | 'visible'>
export const Chat: React.FC<P> = (props) => {
  const { data } = useLiveQuery(gql`
    query {
      chat {
        id
        message
      }
    }
  `)
  return <PabauMessages chatList={data} {...props} />
}

export default Chat
