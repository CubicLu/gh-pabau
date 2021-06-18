import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Badge } from 'antd'
import { Avatar } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { ReactComponent as MessageRead } from '../../assets/images/message-read.svg'
import styles from './ChatsList.module.less'

export interface ChatMessage {
  userName: string /** The username or channel to display */
  message: string
  unread?: number
  dateTime: string
  isOnline: boolean
  isMultiple?: boolean
  onClick?(): void
  active?: boolean
}

interface P {
  chatMessages: ChatMessage[]
  selectedContact?: ChatMessage
  onClick?: (selectedContact: ChatMessage) => void
  showGroupChatBox?: boolean
  isNewDm?: boolean
  isHeaderShow?: boolean
}

export const ChatsList = (props: P) => {
  const { chatMessages, onClick } = props
  const { t } = useTranslation('common')
  // if (!chatMessages) return
  type blah = typeof chatMessages[number]
  const [activeChat, setActiveChat] = useState<blah>()

  // useEffect(() => {
  //   if (props.showGroupChatBox) {
  //     // setActiveIndex(-1)
  //   }
  //   if (props.isNewDm) {
  //     // setActiveIndex(-1)
  //   }
  //   // typingContact
  //   //   ? chatMessages?.map(
  //   //       (item, index) =>
  //   //         item.userName === typingContact.userName && setIsTyping(index)
  //   //     )
  //   //   : setIsTyping(-1)
  // }, [chatMessages, props.showGroupChatBox, props.isNewDm])

  const onClickContact = (e) => {
    if (chatMessages) {
      setActiveChat(e)
      // const data = chatMessages[index]
      alert('Show chat for ' + JSON.stringify(e))
      onClick?.(e)
    }
  }

  const renderMultipleField = (item) => {
    const result = item.map((dataItem) => {
      return dataItem.userName
    })
    return result.join(', ')
  }

  return (
    <div>
      {props.isHeaderShow && (
        <div className={classNames(styles.channelsText, styles.channelsHead)}>
          <p className={classNames(styles.grayTextColor, styles.textSm)}>
            {t('chat.chats')}
          </p>
        </div>
      )}
      <div>
        {chatMessages.map((message) => {
          const {
            message: messageBody,
            isOnline = true,
            unread,
            dateTime,
          } = message

          if (!fromUser) throw new Error('Item found with no fromUser')
          const { image } = fromUser
          return (
            <div
              key={id}
              onClick={() => onClickContact(message)}
              className={styles.cursor}
            >
              <div
                className={classNames(
                  styles.flex,
                  activeChat === message
                    ? styles.profileChatSpaceActive
                    : styles.porfileChatSpace
                )}
              >
                <div className={styles.chatProfile}>
                  <Badge
                    dot
                    color={isOnline ? '#65CD98' : '#FF9E44'}
                    offset={[-2, 32]}
                    size="default"
                    style={{
                      height: '12px',
                      width: '12px',
                      border: '2px solid #fff',
                    }}
                  >
                    <Avatar size={40} src={image} />
                  </Badge>
                </div>
                <div className={styles.chatText}>
                  <div className={classNames(styles.dFlex, styles.userDetails)}>
                    <p
                      className={classNames(
                        styles.textBlack,
                        styles.mb,
                        styles.textMd
                      )}
                    >
                      {chat.isMultiple
                        ? renderMultipleField(chat.data)
                        : chat.userName}
                    </p>
                    <p
                      className={classNames(
                        styles.grayTextColor,
                        styles.mb,
                        styles.textSm
                      )}
                    >
                      {dateTime}
                    </p>
                  </div>
                  <div className={styles.dFlex}>
                    <span
                      className={classNames(
                        styles.grayTextColor,
                        styles.mb,
                        styles.fontMedium,
                        styles.textSm,
                        styles.userMessage
                      )}
                    >
                      {messageBody}
                    </span>
                    <h6
                      className={classNames(
                        styles.grayTextColor,
                        styles.textSm,
                        styles.mb
                      )}
                    >
                      {unread ? (
                        <Badge
                          count={unread}
                          style={{ backgroundColor: '#54B2D3' }}
                        />
                      ) : (
                        <MessageRead />
                      )}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatsList
