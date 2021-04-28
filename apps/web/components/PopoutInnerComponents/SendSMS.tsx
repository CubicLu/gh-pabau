import { SendSMS as SendSMSComponent } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import styles from './SendSMS.module.less'

const defaultTemplateList = [
  {
    id: 1,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 2,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 3,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 4,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 5,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 6,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 7,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 8,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 9,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
  {
    id: 10,
    message:
      'Hi Shopia, this is a friendly reminder about your appointment with Pabau Care for 15/12/2021. Manage booking: URL://CONNECTURL',
    name: 'Appointment Reminder',
  },
]

interface SendSMSProps {
  clientId: string
  id: string
}

const SendSMS: FC<SendSMSProps> = ({ clientId, id }) => {
  const [templateList, setTemplateList] = useState([])
  const [SMSItems, setSMSItems] = useState([])
  const [contentItems, setContentItems] = useState([])
  const [draft, setDraft] = useState('')

  const handleSendItem = (item) => {
    const items = [...SMSItems, item]
    setSMSItems(items)
    const content = [...contentItems]
    const fineIndex = contentItems.find((el) => el.id === id)
    content.splice(fineIndex, 1, { id, items, draft: '' })
    setContentItems(content)
    window.localStorage.setItem('pabau_content', JSON.stringify(content))
  }

  const handleSaveDraft = (draft) => {
    const content = [...contentItems]
    const findIndex = contentItems.findIndex((el) => el.id === id)
    content[findIndex].draft = draft
    setDraft(draft)
    window.localStorage.setItem('pabau_content', JSON.stringify(content))
  }

  useEffect(() => {
    setTemplateList(defaultTemplateList)
    const items = window.localStorage.getItem('pabau_content')
      ? JSON.parse(window.localStorage.getItem('pabau_content'))
      : []
    setContentItems(items)
    const findItem = items.find((item) => item.id === id)
    if (findItem) {
      setSMSItems(findItem.items)
      setDraft(findItem.draft)
    } else {
      setContentItems([...items, { id, items: [], draft: '' }])
      setSMSItems([])
      setDraft('')
    }
  }, [id])

  return (
    <div className={styles.sendSMSContainer}>
      <SendSMSComponent
        draft={draft}
        items={SMSItems}
        templateList={templateList}
        onSend={handleSendItem}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}

export default SendSMS
