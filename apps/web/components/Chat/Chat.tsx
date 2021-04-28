import { MessagesProps, PabauMessages, useLiveQuery } from '@pabau/ui'
import gql from 'graphql-tag'
import * as React from 'react'

type P = Pick<MessagesProps, 'closeDrawer' | 'visible'>
export const Chat: React.FC<P> = (props) => {
  const { data } = useLiveQuery(gql`
    query {
      chat {
        id
        message
        from
        to
        created_at
      }
    }
  `)
  return (
    <PabauMessages
      chatList={data?.map(({ id, message, from, to, created_at }) => ({
        userName: `from:${from} to:${to}`,
        message,
        dateTime: created_at,
        isOnline: true,
      }))}
      {...props}
    />
  )
}

export default Chat
