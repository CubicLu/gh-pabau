import { LeftOutlined } from '@ant-design/icons'
import {
  Avatar,
  AvatarStatus,
  Breadcrumb,
  ChatMessage,
  ChatsList,
} from '@pabau/ui'
import { Typography } from 'antd'
import moment from 'moment'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/UserContext/context/ClientContext'
import styles from './chat-history.module.less'

const { Title } = Typography

const defaultChatUserList: ChatMessage[] = [
  {
    id: '',
    userName: 'Dr. Alisa Moor',
    message: 'Thanks! See you on Monday.',
    dateTime: '11:20 AM',
    isOnline: true,
    // profileURL:
    //   'https://s3-alpha-sig.figma.com/img/104f/84ff/3a2a8d65420949181f043fa5e73bd8c7?Expires=1620604800&Signature=I1ANzIUgku8lSvZXjdDTmlfnfEGyWEQR9OZV3QKm42IbTjmC97MaSBav7SSyB~ZMysLWvnh7NcVLkq2tGhh8MS0bAqRyNkvP8rwIKBZb0un50to4368ms35vrlVPbzltWL4tohCSpP8n4oaatGu2KqE6nVCZ3v6YPliNXFKQeFypVuXl902kC6N7U~lgEnJQ5ho5wzxiVd3UT-bgtDH4e0XgkxWS-i6ST1dPaZy1Qwq5x0lwBK5NWJHD0vKeFQMjEYKHm2RmbAtOL2ORmC45oYpvdp0Ck21Uh0hlr3g4YnGF36LM2Br0ZIzxx0oLxEvvOYBPgg-g8fN4LRYyvDM8AA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
  {
    id: '',
    userName: 'Dr. Linda Starck',
    message:
      'Yes, SPF 50 will be perfect for you. You can use any lotion you have if skin is dry.',
    dateTime: '11:20 AM',
    isOnline: true,
    // profileURL:
    //   'https://s3-alpha-sig.figma.com/img/a6f3/f04c/2bc452e46a0f0b5b07a36ace9a936d0a?Expires=1620604800&Signature=efmbaAMmBcJLaqTWLHhOq6jy9wQYNQyhtkksFNxeuWYWVUowSq9-16xrcacnqaNZ6sFobfziYd7IiW2xMbUmnN0ax9R1Nto2~GP4Ai2WUk-wYNe5jIgW9IZR4VpKW7WFqzN8JtJA557zwZTAXfEnSikemFmwE25GJNaGLW0UyBTevTMxiSMGcW3~~I9RfHT2EfnaO24LT8hHYVEQkq6AXe8jdCKiC7IsV7TNJl~jNv~qErFouA7Da1MliCXFzJF8aPAimL~yleUcF9sH8F4bMfX4g~jGhbp7kyQkY8RqCzMOQNiT6WrigAgByDteYkCUQGIV49KP4d1d4wj2JV1PQg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
]

const defaultChatHistory = [
  {
    userName: 'Dr. Alisa Moor',
    messages: [
      {
        date: '2021-03-23 11:24',
        message: (
          <>
            <div>
              Hi! Sending you post-care after the laser procedure as promised:
            </div>
            <ul>
              <li>Avoid sun exposure;</li>
              <li>Take cool showers;</li>
              <li>Exfoliate the area.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    userName: 'Dr. Linda Starck',
    messages: [
      {
        date: '2021-03-23 11:24',
        message: (
          <>
            <div>
              Hi! Sending you post-care after the laser procedure as promised:
            </div>
            <ul>
              <li>Avoid sun exposure;</li>
              <li>Take cool showers;</li>
              <li>Exfoliate the area.</li>
            </ul>
          </>
        ),
      },
      {
        date: '2021-03-24 15:07',
        message: (
          <div>
            Yes, SPF 50 will be perfect for you. You can use any lotion you have
            if skin is dry.
          </div>
        ),
      },
    ],
  },
]

const ChatHistory: FC = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [selected, setSelected] = useState<ChatMessage>(null)
  const [chatUserList, setChatUserList] = useState([])
  const [chatHistory, setChatHistory] = useState([])
  const [messages, setMessages] = useState([])
  const clientContext = useContext(ClientContext)

  const handleSelect = (data: ChatMessage) => {
    setSelected(data)
  }

  useEffect(() => {
    setChatUserList(defaultChatUserList)
    setChatHistory(defaultChatHistory)
  }, [])

  useEffect(() => {
    if (selected !== null) {
      const findSelected = chatHistory.find(
        (item) => item.userName === selected.userName
      )
      if (findSelected) {
        setMessages(findSelected.messages)
      } else {
        setMessages([])
      }
    }
  }, [selected, chatHistory])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.chatHistory}>
        <div className={styles.chatHistoryHeader}>
          <Breadcrumb
            breadcrumbItems={[
              {
                breadcrumbName: t('connect.account.title'),
                path: 'connect/account',
              },
              {
                breadcrumbName: t('connect.account.chathistory'),
                path: '',
              },
            ]}
          />
          <Title>{t('connect.account.chathistory')}</Title>
        </div>
        <div className={styles.chatHistoryMobileHeader}>
          <Title>{t('connect.account.chathistory')}</Title>
        </div>
        {!isMobile && (
          <div className={styles.chatHistoryContentDesktop}>
            <div>
              <ChatsList
                isHeaderShow={false}
                // chatMessages={chatUserList}
                onClick={handleSelect}
              />
              <div className={styles.messagesContainer}>
                {selected !== null &&
                  messages.map((message, index) => (
                    <React.Fragment key={`message-item-${index}`}>
                      {(index === 0 ||
                        (index > 0 &&
                          !moment(message.date).isSame(
                            messages[index - 1].date,
                            'day'
                          ))) && (
                        <div className={styles.dateDisplay}>
                          {moment(message.date).format('MMMM D')}
                        </div>
                      )}
                      <div className={styles.messageContainer}>
                        <div className={styles.messageContent}>
                          <div className={styles.bubble}>{message.message}</div>
                        </div>
                        <div className={styles.readTime}>
                          {moment(message.date).format('hh:mm A')}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div className={styles.chatHistoryContentMobile}>
            {selected === null && (
              <div className={styles.chatListContainer}>
                <ChatsList
                  isHeaderShow={false}
                  // chatMessages={chatUserList}
                  onClick={handleSelect}
                />
              </div>
            )}
            {selected !== null && (
              <>
                <div
                  className={styles.messagesHeader}
                  onClick={() => setSelected(null)}
                >
                  <LeftOutlined className={styles.backToChatList} />
                  <Avatar
                    // src={selected.profileURL}
                    name={`${selected.userName}`}
                    size={32}
                    active={AvatarStatus.active}
                  />
                  <div className={styles.nameContainer}>
                    {selected.userName}
                  </div>
                </div>
                <div className={styles.messagesContainer}>
                  {messages.map((message, index) => (
                    <React.Fragment key={`message-item-${index}`}>
                      {(index === 0 ||
                        (index > 0 &&
                          !moment(message.date).isSame(
                            messages[index - 1].date,
                            'day'
                          ))) && (
                        <div className={styles.dateDisplay}>
                          {moment(message.date).format('MMMM D')}
                        </div>
                      )}
                      <div className={styles.messageContainer}>
                        <div className={styles.messageContent}>
                          <div className={styles.bubble}>{message.message}</div>
                        </div>
                        <div className={styles.readTime}>
                          {moment(message.date).format('hh:mm A')}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </ConnectLayout>
  )
}

export default ChatHistory
