import { MailProps, SendMail as SendMailComponent } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import styles from './SendMail.module.less'

interface SendMailProps {
  clientId: string
  id: string
}

const SendMail: FC<SendMailProps> = ({ clientId, id }) => {
  const [contentItems, setContentItems] = useState([])
  const [draft, setDraft] = useState<MailProps>(null)

  const handleSaveDraft = (draft) => {
    const content = [...contentItems]
    const findIndex = contentItems.findIndex((el) => el.id === id)
    if (findIndex >= 0) {
      content[findIndex].draft = draft
      window.localStorage.setItem('pabau_content', JSON.stringify(content))
    }
    setDraft(draft)
  }

  useEffect(() => {
    const items = window.localStorage.getItem('pabau_content')
      ? JSON.parse(window.localStorage.getItem('pabau_content'))
      : []
    setContentItems(items)
    const findItem = items.find((item) => item.id === id)
    if (findItem) {
      setDraft(findItem.draft)
    } else {
      setContentItems([
        ...items,
        {
          id,
          draft: {
            sendTo: [],
            ccList: [],
            bccList: [],
            secured: false,
            sender: { name: '', email: '' },
            subject: '',
            message: '',
            medicalForm: '',
          },
        },
      ])
      setDraft({
        sendTo: [],
        ccList: [],
        bccList: [],
        secured: false,
        sender: { name: '', email: '' },
        subject: '',
        message: '',
        medicalForm: '',
      })
    }
  }, [id])

  return (
    <div className={styles.sendMailContainer}>
      <SendMailComponent
        draft={draft}
        senderList={[]}
        medicalFormList={[]}
        onSend={(mail) => {
          return
        }}
        onSave={(mail) => {
          return
        }}
        onDiscardDraft={() => {
          return
        }}
        onSaveDraft={(draft) => handleSaveDraft(draft)}
      />
    </div>
  )
}

export default SendMail
