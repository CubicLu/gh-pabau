import {
  useChatListMessagesNotifySubscription,
  useChatListRoomNotifySubscription,
  useCreateChannelMutation,
  useChatListRoomsQuery,
  CreateChannelDocument,
  Chat_Room,
  Chat_Room_Participant,
  Chat as ChatType,
  ChatListRoomsDocument,
  useChatDirectHistoryQuery,
  useChatRoomHistoryQuery,
} from '@pabau/graphql'
import {
  ChatMessage,
  Group,
  MessagesProps,
  PabauMessages,
  Participant,
} from '@pabau/ui'
import { UserContext } from '../../context/UserContext'
import * as React from 'react'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { client } from '../../pages/_app'
import { useEffect, useState } from 'react'

dayjs.extend(calendar)

type P = Pick<MessagesProps, 'closeDrawer' | 'visible'>
export const Chat: React.FC<P> = (props) => {
  useChatListRoomNotifySubscription({
    onSubscriptionData: (options) => {
      console.log('got ws data')
    },
  })
  useChatListMessagesNotifySubscription()
  // const {
  //   data: { chat: data },
  // } = useChatListDirectMessagesSubscriptionSubscription({
  //   skip: typeof window === 'undefined',
  // })
  const { data, error, loading } = useChatListRoomsQuery()
  console.log('chat sub data', data, error, loading)

  const me = React.useContext(UserContext)
  console.log('USER FROM CONTEXT', me)

  const {
    refetch: fetchRoomHistory,
    data: chatRoomHistory,
  } = useChatRoomHistoryQuery({})
  const {
    refetch: fetchDirectHistory,
    data: chatDirectHistory,
  } = useChatDirectHistoryQuery({})
  const [topic, setTopic] = useState<Group | Participant>()
  useEffect(() => {
    if (typeof topic === 'object' && !('participants' in topic)) {
      console.log('fetching up to date chat logs!')
      fetchDirectHistory({ userId: Number.parseInt(topic.id) })
    }
    if (typeof topic === 'object' && 'participants' in topic) {
      console.log('fetching up to date channel logs!', topic.id.substring(1))
      fetchRoomHistory({ roomId: topic.id })
    }
  }, [topic])

  const [
    createChannelMutation,
    //    { data, loading, error },
  ] = useCreateChannelMutation()

  if (!data) return null

  return (
    <PabauMessages
      onCreateChannel={async (name, description) => {
        client.writeQuery({
          query: ChatListRoomsDocument,
          data: {
            chat: {
              id: 'TODO',
              dateTime: '2000-01-01T00:00:00Z',
              message: 'premaature!',
            },
          },
        })
        const result = await createChannelMutation({
          variables: { name, description },
        })
        if (result.errors) {
          alert('got some errors ' + JSON.stringify(result.errors))
        }
        console.log(
          'got proper web level mutation result',
          result.data.insert_chat_room_participant_one.room.id,
          result.context
        )
        // client.writeQuery(
        //
        // )
      }}
      onLoadMessages={(topic) => {
        setTopic(topic)
      }}
      //chatList={[...chatList, ...(chatRoomHistory || [])]}
      chatHistory={{
        name: chatRoomHistory?.chat_room[0]?.name,
        chats: chatRoomHistory?.chat_room[0]?.chats.map((e) => ({
          ...e,
          userName: e.fromUser.full_name,
          dateTime: dayjs().calendar(dayjs(e.created_at)),
        })),
      }}
      roomList={data?.chat_room_participant.map(({ room }) => ({
        // ...room,
        id: room.id,
        name: `#${room.name}`,
        messages: room.chats.map<Group['messages'][number]>((e) => ({
          ...e,
          userName: e.fromUser.full_name,
          dateTime: dayjs().calendar(dayjs(e.created_at)),
        })),
        participants: [],
        userName: `#${room.name} ${room.chats[0]?.fromUser.full_name}`,
        dateTime: dayjs().calendar(dayjs(room.chats[0]?.created_at)),
      }))}
      //   [
      //   ...chatList,
      //   //   .map((e) => {
      //   //   if (e.userName === chatRoomHistory?.chat_room[0].name) {
      //   //     // return {...e, }
      //   //   }
      //   // }),
      //   // ...(chatRoomHistory?.chat_room || []).map<ChatMessage>(
      //   //   ({ message, created_at, id, fromUser }) => ({
      //   //     id,
      //   //     dateTime: created_at,
      //   //     message,
      //   //     userName: fromUser.full_name,
      //   //   })
      //   // ),
      //   // ...(chatDirectHistory?.chat || []).map<ChatMessage>(
      //   //   ({ message, created_at, id, fromUser }) => ({
      //   //     id,
      //   //     dateTime: created_at,
      //   //     message,
      //   //     userName: fromUser.full_name,
      //   //   })
      //   // ),
      // ]}
      {...props}
    />
  )
}

export default Chat
