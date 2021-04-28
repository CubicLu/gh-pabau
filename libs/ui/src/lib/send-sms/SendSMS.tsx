import { DiffOutlined, SendOutlined, TagsOutlined } from '@ant-design/icons'
import { Button, ChooseSMSTemplate, smsTemplateProps } from '@pabau/ui'
import { Input as AntInput } from 'antd'
import cn from 'classnames'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import styles from './SendSMS.module.less'

const { TextArea } = AntInput

export interface SMSItem {
  date: string
  content: string
  direction: string
}

/* eslint-disable-next-line */
export interface SendSMSProps {
  draft?: string
  sendBtnText?: string
  onSend: (val) => void
  onSaveDraft?: (draft: string) => void
  items: SMSItem[]
  templateList?: smsTemplateProps[]
}

export const SendSMS: FC<SendSMSProps> = ({
  draft,
  sendBtnText,
  onSend,
  onSaveDraft,
  items,
  templateList,
}) => {
  const [openChooseTemplate, setOpenChooseTemplate] = useState(false)
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)
  const handleSend = () => {
    if (text.replace(/\n/g, '').length > 0) {
      setText('')
      setCount(0)
      onSend({ content: text, date: new Date(), direction: 'to' })
    }
  }

  useEffect(() => {
    setText(draft ?? '')
  }, [draft])

  useEffect(() => {
    if (text.replace(/\n/g, '').length > 0) {
      onSaveDraft?.(text)
    }
  }, [text, onSaveDraft])

  return (
    <>
      <div className={styles.sendSMSContainer}>
        <div className={styles.content}>
          <div className={styles.smsItems}>
            {items?.map((item, index) => (
              <div className={styles.smsItem} key={`sms-item-${index}`}>
                <div className={styles.date}>
                  {moment(item.date).format('DD/MM/YYYY hh:mm')}
                </div>
                <div
                  className={cn(
                    styles.smsItemContent,
                    item.direction === 'from'
                      ? styles.directionFrom
                      : styles.directionTo
                  )}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ops}>
          <div className={styles.smsInputContent}>
            <div className={styles.smsInputContentHeader}>
              <div>
                <div className={styles.operations}>
                  <div className={styles.operation}>
                    <TagsOutlined />
                  </div>
                  <div
                    className={styles.operation}
                    onClick={() => setOpenChooseTemplate(true)}
                  >
                    <DiffOutlined />
                  </div>
                </div>
                <div className={styles.maxLengthText}>{`${count}/160`}</div>
              </div>
            </div>
            <TextArea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={160}
              showCount={{
                formatter: ({ count, maxLength }) => {
                  setCount(count)
                  return `${count}/${maxLength}`
                },
              }}
              onPressEnter={() => handleSend()}
            />
          </div>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => handleSend()}
          >
            {sendBtnText || 'Send'}
          </Button>
        </div>
      </div>
      <ChooseSMSTemplate
        modalVisible={openChooseTemplate}
        templateList={templateList}
        onSelectTemplate={(template) => {
          setText(template)
          setOpenChooseTemplate(false)
        }}
        onChooseSmsTemplate={(template) => {
          setText(template.message)
          setOpenChooseTemplate(false)
        }}
        onSearchTextChange={(searchText) => {
          return
        }}
      />
    </>
  )
}

export default SendSMS
