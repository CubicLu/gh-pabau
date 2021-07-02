// eslint-disable graphql/template-strings

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
import { UserContext } from '../../context/UserContext'
import * as React from 'react'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { useEffect, useState } from 'react'
import { gql } from '@apollo/client/core'

dayjs.extend(calendar)

type P = Pick<MessagesProps, 'closeDrawer' | 'visible'>
export const Chat = (props: P): JSX.Element => {
  const { closeDrawer } = props

  useChatListRoomNotifySubscription({
    skip: typeof window === 'undefined',
  })
  useChatListMessagesNotifySubscription({
    skip: typeof window === 'undefined',
  })

  const me = React.useContext(UserContext)
  console.log('USER FROM CONTEXT', me)

  const [postToUser] = useChatPostToUserIdMutation()

  const [postToChannel] = useChatPostToChannelIdMutation({
    update(cache, args) {
      console.log('apollo.cache.update', args)
      console.log(
        'identified cache item',
        cache.identify(chatRoomHistory.chat_room_by_pk)
      )
      cache.modify({
        id: cache.identify(chatRoomHistory.chat_room_by_pk),
        fields: {
          chats(existingItems = []) {
            console.log('-->chats', existingItems)
            console.log(
              'about to insert item to cache',
              args.data.insert_chat_one.message,
              args.data.insert_chat_one.room.id
            )
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
            console.log('inserted new item into cache!', args, newItemRef)
            // ;[...existingItems, newItemRef].reduce((a, c) => {
            //   if (c.__ref in a) console.error('Found a dupe!')
            //   return {
            //     ...a,
            //     [c.__ref]: c,
            //   }
            // }, {})
            return [...existingItems, newItemRef]
          },
          // 'chats(order_by: { created_at: desc }, limit: 15)': (
          //   existingItems = []
          // ) => {
          //   console.log('WOW!!! chats(...) found', existingItems)
          // },
          // 'chats(order_by:{created_at:desc},limit:15)': (
          //   existingItems = []
          // ) => {
          //   console.log('WOW!!! chats(...) found', existingItems)
          // },
          // chat_room(existingItems = []) {
          //   console.log('-->chat_room', existingItems)
          //   const newItemRef = cache.writeFragment({
          //     data,
          //     fragment: gql`
          //       fragment NewItem on chat {
          //         id
          //         message
          //         created_at
          //       }
          //     `,
          //   })
          //   return [...existingItems, newItemRef]
          // },
        },
      })
    },
  })
  const { data: membersData } = useChatGetUsersQuery({
    fetchPolicy: 'cache-first',
  })
  const members = membersData?.users

  // {
  //   refetch: fetchDirectHistory,
  //     data: chatDirectHistory,
  //
  // }
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

  // Here we are using data.chat_room_participant (which is an array)
  const { data } = useChatListRoomsQuery({
    fetchPolicy: 'cache-first',
  })

  // And here we are adding to that array. The return type is participant
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
      console.log('apollo update()', data)
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

  console.log(
    'chat list',
    data,
    'in rooms:',
    data?.chat_room_participant.map((e) => e.room.name).join(', ')
  )

  useEffect(() => {
    console.log('Chat.useEffect')

    if (typeof topic === 'object' && !('participants' in topic)) {
      console.log('fetching up to date chat logs!')
      fetchDirectHistory({ variables: { userId: Number.parseInt(topic.id) } })
    }
    if (typeof topic === 'object' && 'participants' in topic) {
      console.log('fetching up to date channel logs!', topic.id.substring(1))
      fetchRoomHistory({ variables: { roomId: topic.id } })
    }
  }, [topic, fetchDirectHistory, fetchRoomHistory])

  // if (!data) return null

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
          // name: chatDirectHistory.chat.name,
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
        // client.writeQuery({
        //   query: ChatListRoomsDocument,
        //   data: {
        //     chat: {
        //       id: 'TODO',
        //       dateTime: '2000-01-01T00:00:00Z',
        //       message: 'premaature!',
        //     },
        //   },
        // })
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
        console.log('loading new topci', topic)
        setTopic(topic)
      }}
      //chatList={[...chatList, ...(chatRoomHistory || [])]}
      chatHistory={chatHistory}
      roomList={data?.chat_room_participant?.map<Group>(({ room }) => ({
        // ...room,
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
            (fromUser.id === me.me.user
              ? fromUser?.full_name
              : toUser?.full_name) || '??',
          // image,
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            variables: { channelId: topic.id, message },
            // update: (cache, mutationResult) => {
            //   const newRow = mutationResult.data.insert_chat_one
            //   // const data = cache.readQuery({
            //   //   query: FETCH_TASKS, variables: {name: newTask.returning.name}
            //   // });
            //   cache.writeQuery({
            //     query: ChatRoomHistoryDocument,
            //     variables: { roomId: topic.id },
            //     data: {
            //       chat_room: { chats: [newRow] },
            //     },
            //   })
            // },
            optimisticResponse: {
              //__typename: "Mutation",
              insert_chat_one: {
                __typename: 'chat',
                id: `being-created`,
                message: '=================',
              },
            },

            // update: (cache, mutationResult) => {
            //   cache.writeQuery({
            //     query: ChatRoomHistoryDocument,
            //     data: {
            //       chat_room: {
            //         id: topic.id,
            //         chats: [
            //           {
            //             id: '__tba',
            //             message: 'msg in offline cache!',
            //             fromUser: {
            //               name: '(me!)',
            //             },
            //           },
            //         ],
            //       },
            //     },
            //     variables: {
            //       roomId: topic.id,
            //     },
            //   })
            // },
          })
      }}
      onMessageType={() => {
        console.log('typing')
      }}
      members={members?.map<Participant>((e) => ({ ...e, id: String(e.id) }))}
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
