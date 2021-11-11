import {
  useCreateChannelMutation,
  useChatListRoomsQuery,
  useChatDirectHistoryLazyQuery,
  useChatRoomHistoryLazyQuery,
  useChatPostToChannelIdMutation,
  useChatGetUsersQuery,
  useChatPostToUserIdMutation,
  useChatListRoomNotifySubscription,
  useChatListMessagesNotifySubscription,
} from '@pabau/graphql'
import {
  ChatMessage,
  Group,
  MessagesProps,
  PabauMessages,
  Participant,
} from '@pabau/ui'
import * as React from 'react'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { useEffect, useState } from 'react'
import { gql } from '@apollo/client/core'
import { useUser } from '../../context/UserContext'

dayjs.extend(calendar)

type P = Pick<MessagesProps, 'closeDrawer' | 'visible'>
export const Chat = (props: P): JSX.Element => {
  const { closeDrawer } = props

  useChatListRoomNotifySubscription({
    skip: typeof window === 'undefined',
    onSubscriptionData(e) {
      console.log(
        'ws update for rooms:',
        e.subscriptionData.data.chat_room_participant
      )
    },
  })
  useChatListMessagesNotifySubscription({
    skip: typeof window === 'undefined',
  })

  const me = useUser()

  const [postToUser] = useChatPostToUserIdMutation()

  const [postToChannel] = useChatPostToChannelIdMutation({
    update(cache, args) {
      cache.modify({
        id: cache.identify(chatRoomHistory.chat_room_by_pk),
        fields: {
          chats(existingItems = []) {
            const newItemRef = cache.writeFragment({
              data: args.data.insert_chat_one,
              fragment: gql`
                fragment NewChat on chat {
                  id
                  message
                  created_at
                  room {
                    id
                  }
                }
              `,
            })

            // eslint-disable-next-line unicorn/prefer-object-from-entries
            ;[...existingItems, newItemRef].reduce((a, c) => {
              if (c.__ref in a) console.error('Found a dupe!')
              return {
                ...a,
                [c.__ref]: c,
              }
            }, {})

            return [...existingItems, newItemRef]
          },
        },
      })
    },
  })
  const { data: membersData } = useChatGetUsersQuery({
    fetchPolicy: 'cache-first',
  })
  const members = membersData?.findManyUser

  const [
    fetchDirectHistory,
    { data: chatDirectHistory },
  ] = useChatDirectHistoryLazyQuery({
    fetchPolicy: 'cache-first',
  })
  const [topic, setTopic] = useState<Group | Participant | undefined>()

  const [
    fetchRoomHistory,
    { data: chatRoomHistory },
  ] = useChatRoomHistoryLazyQuery({ fetchPolicy: 'cache-first' })

  const { data } = useChatListRoomsQuery({
    fetchPolicy: 'cache-first',
  })

  const [createChannelMutation] = useCreateChannelMutation({
    optimisticResponse() {
      return {
        insert_chat_room_participant_one: {
          id: 'new',
          room: {
            id: 'new',
            name: '#new',
          },
        },
      }
    },
    update: (cache, { data: { insert_chat_room_participant_one: data } }) => {
      cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          chat_room_participant(existingItems) {
            const newItemRef = cache.writeFragment({
              data,
              fragment: gql`
                fragment NewItem on chat_room_participant {
                  id
                  room {
                    id
                    name
                  }
                }
              `,
            })
            return [...existingItems, newItemRef]
          },
        },
      })
    },
  })

  useEffect(() => {
    if (typeof topic === 'object' && !('participants' in topic)) {
      fetchDirectHistory({ variables: { userId: Number.parseInt(topic.id) } })
    }
    if (typeof topic === 'object' && 'participants' in topic) {
      fetchRoomHistory({ variables: { roomId: topic.id } })
    }
  }, [topic, fetchDirectHistory, fetchRoomHistory])

  const chatHistory =
    chatRoomHistory && chatRoomHistory.chat_room_by_pk.id === topic?.id
      ? {
          name: chatRoomHistory.chat_room_by_pk.name,
          chats: [...chatRoomHistory.chat_room_by_pk.chats]
            .sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
            .map<ChatMessage>((e) => ({
              ...e,
              userName: e.fromUser.full_name,
              dateTime: dayjs().calendar(dayjs(e.created_at)),
            })),
        }
      : {
          chats: chatDirectHistory?.chat
            .sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
            .map<ChatMessage>((e) => ({
              ...e,
              userName: e.fromUser.full_name,
              dateTime: dayjs().calendar(dayjs(e.created_at)),
            })),
        }

  return (
    <PabauMessages
      onClose={closeDrawer}
      onCreateChannel={async (name, description) => {
        const result = await createChannelMutation({
          variables: { name, description },
        })
        if (result.errors) {
          alert('got some errors ' + JSON.stringify(result.errors))
        }
      }}
      onLoadMessages={(topic) => {
        setTopic(topic)
      }}
      chatHistory={chatHistory}
      roomList={data?.chat_room_participant?.map<Group>(({ room }) => ({
        id: room.id,
        name: `#${room.name}`,
        messages: room.chats.map<Group['messages'][number]>((e) => ({
          ...e,
          userName: e.fromUser.full_name,
          dateTime: dayjs(e.created_at).calendar(),
        })),
        participants: [],
        userName: `#${room.name} ${room.chats[0]?.fromUser.full_name}`,
      }))}
      chatList={data?.chat.map<ChatMessage>(
        ({ id, message, created_at, fromUser, toUser }) => ({
          id,
          message,
          userName:
            (fromUser.id !== me.me.id
              ? fromUser?.full_name
              : toUser?.full_name) || '??',
          dateTime: dayjs(created_at).calendar(),
        })
      )}
      onMessageSend={(topic, message) => {
        typeof topic === 'object' &&
          !('participants' in topic) &&
          postToUser({
            variables: { userId: Number.parseInt(topic.id), message },
          })

        typeof topic === 'object' &&
          'participants' in topic &&
          postToChannel({
            variables: { channelId: topic.id, message },
            optimisticResponse: {
              insert_chat_one: {
                __typename: 'chat',
                id: `being-created`,
                message,
                room: {
                  id: topic.id,
                },
              },
            },
          })
      }}
      onMessageType={() => {
        //TODO
      }}
      members={members?.map<Participant>((e) => ({ ...e, id: String(e.id) }))}
      {...props}
    />
  )
}

export default Chat
