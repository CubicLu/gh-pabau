import { useSubscription } from '@apollo/client'
import {
  useChatListDirectMessagesQueryQuery,
  useChatListDirectMessagesSubscriptionSubscription,
} from '@pabau/graphql'
import { ChatMessage, MessagesProps, PabauMessages } from '@pabau/ui'
import { UserContext } from '../../context/UserContext'
import * as React from 'react'
import dayjs from 'dayjs'

import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

type P = Pick<MessagesProps, 'closeDrawer' | 'visible'>
export const Chat: React.FC<P> = (props) => {
  // const {
  //   data: { chat: data },
  // } = useChatListDirectMessagesSubscriptionSubscription({
  //   skip: typeof window === 'undefined',
  // })
  const { data: { chat: data } = {} } = useChatListDirectMessagesQueryQuery()
  console.log('chat sub data', data)
  const me = React.useContext(UserContext)
  console.log('USER FROM CONTEXT', me)

  return (
    <PabauMessages
      chatList={data
        ?.reduce((a, c) => {
          let found = false
          for (const row of a) {
            if (
              c.fromUser.username === row.fromUser.username &&
              c.toUser.username === row.toUser.username
            ) {
              console.warn(
                'Found myself in the array, this should never happen'
              )
              found = true
              break
            }
            if (
              c.fromUser.username === row.toUser.username &&
              c.toUser.username === row.fromUser.username
            ) {
              found = true
              if (c.created_at > row.created_at) a.push(c)
              break
            }
          }
          if (!found) {
            a.push(c)
          }
          return a
        }, [] as typeof data)
        ?.map(({ id, message, fromUser, toUser, created_at }) => ({
          id,
          userName:
            me.me.username !== fromUser.username
              ? fromUser.full_name
              : toUser.full_name,
          message,
          dateTime: dayjs(created_at).calendar(dayjs()),
          isOnline: true,
        }))}
      {...props}
    />
  )
}

export default Chat
