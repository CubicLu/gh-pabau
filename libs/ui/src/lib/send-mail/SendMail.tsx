import {
  DeleteOutlined,
  DownOutlined,
  PaperClipOutlined,
  PictureOutlined,
  SendOutlined,
  SmileOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Button } from '@pabau/ui'
import { Checkbox, Input, Popover, Select, Tag } from 'antd'
import cn from 'classnames'
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './SendMail.module.less'

const { Option } = Select

interface Contract {
  name: string
  email: string
}

interface Sender {
  name: string
  email: string
}

export interface MailProps {
  sendTo: Contract[]
  ccList: Contract[]
  bccList: Contract[]
  subject: string
  sender: Sender
  medicalForm: string
  message: ReactNode
  secured: boolean
}

export interface SendMailProps {
  draft: MailProps
  subjectsList?: string[]
  senderList: Sender[]
  medicalFormList: string[]
  onSend: (mail: MailProps) => void
  onSave: (mail: MailProps) => void
  onDiscardDraft: () => void
  onSaveDraft?: (draft: MailProps) => void
}

export const SendMail: FC<SendMailProps> = ({
  draft,
  subjectsList,
  senderList,
  medicalFormList,
  onSend,
  onSave,
  onDiscardDraft,
  onSaveDraft,
}) => {
  const toRef = useRef<HTMLDivElement>(null)
  const [initialized, setInitialized] = useState(false)
  const [sendTo, setSendTo] = useState<Contract[]>([])
  const [sendToItem, setSendToItem] = useState('')
  const [ccList, setCcList] = useState<Contract[]>([])
  const [ccItem, setCcItem] = useState('')
  const [bccList, setBccList] = useState<Contract[]>([])
  const [bccItem, setBccItem] = useState('')
  const [medicalForm, setMedicalForm] = useState('')
  const [currentSender, setCurrentSender] = useState<Sender>({
    name: '',
    email: '',
  })
  const [subject, setSubject] = useState('')
  const [secure, setSecure] = useState(false)
  const [editCcList, setEditCcList] = useState(false)
  const [editBccList, setEditBccList] = useState(false)
  const [focusSubject, setFocusSubject] = useState(false)
  const [focusSender, setFocusSender] = useState(false)
  const [focusMedicalForm, setFocusMedicalForm] = useState(false)
  const [receipients, setReceipients] = useState('')

  const handleSelectSender = (value) => {
    const findSender = senderList.find((item) => item.email === value)
    setCurrentSender(findSender ?? { name: '', email: '' })
    onSaveDraft?.({
      ...draft,
      sender: findSender ?? { name: '', email: '' },
    })
  }

  const handleAddSendToList = () => {
    if (sendToItem) {
      onSaveDraft?.({
        ...draft,
        sendTo: [...sendTo, { name: '', email: sendToItem }],
      })
      setSendTo([...sendTo, { name: '', email: sendToItem }])
      setSendToItem('')
    }
  }

  const handleAddCcList = () => {
    if (ccItem) {
      onSaveDraft?.({
        ...draft,
        ccList: [...ccList, { name: '', email: ccItem }],
      })
      setCcList([...ccList, { name: '', email: ccItem }])
      setCcItem('')
    }
  }

  const handleAddBccList = () => {
    if (bccItem) {
      onSaveDraft?.({
        ...draft,
        bccList: [...bccList, { name: '', email: bccItem }],
      })
      setBccList([...bccList, { name: '', email: bccItem }])
      setBccItem('')
    }
  }

  const handleSendToClose = (e, index) => {
    e.preventDefault()
    const items = [...sendTo]
    items.splice(index, 1)
    setSendTo(items)
    onSaveDraft?.({
      ...draft,
      sendTo: items,
    })
  }

  const handleCcClose = (e, index) => {
    e.preventDefault()
    const items = [...ccList]
    items.splice(index, 1)
    setCcList(items)
    onSaveDraft?.({
      ...draft,
      ccList: items,
    })
  }

  const handleBccClose = (e, index) => {
    e.preventDefault()
    const items = [...bccList]
    items.splice(index, 1)
    setBccList(items)
    onSaveDraft?.({
      ...draft,
      bccList: items,
    })
  }

  const handleChangeSubject = (value) => {
    setSubject(value)
    onSaveDraft?.({
      ...draft,
      subject: value,
    })
  }

  const handleSelectMedicalForm = (value) => {
    setMedicalForm(value)
    onSaveDraft?.({
      ...draft,
      medicalForm: value,
    })
  }

  const handleChangeSecure = (e) => {
    setSecure(e.target.checked)
    onSaveDraft?.({
      ...draft,
      secured: e.target.checked,
    })
  }

  useEffect(() => {
    const handleLostFocusForReceipients = (e) => {
      if (!!toRef && toRef.current && !toRef.current.contains(e.target)) {
        const toText = sendTo.map((item) => item.name || item.email).join(', ')
        const ccText = ccList.map((item) => item.name || item.email).join(', ')
        const bccText =
          'Bcc:' + bccList.map((item) => item.name || item.email).join(', ')
        let receip: string[] = []
        if (sendTo.length > 0) {
          receip = [...receip, toText]
        }
        if (ccList.length > 0) {
          receip = [...receip, ccText]
        } else {
          setEditCcList(false)
        }
        if (bccList.length > 0) {
          receip = [...receip, bccText]
        } else {
          setEditBccList(false)
        }
        setReceipients(receip.join(', '))
      }
    }
    document.addEventListener('mousedown', handleLostFocusForReceipients)
    return () => {
      document.removeEventListener('mousedown', handleLostFocusForReceipients)
    }
  }, [toRef, sendTo, ccList, bccList])

  useEffect(() => {
    if (draft && !initialized) {
      const {
        sendTo: draftSendTo,
        ccList: draftCcList,
        bccList: draftBccList,
        subject: draftSubject,
        sender: draftSender,
        medicalForm: draftMedicalForm,
        secured: draftSecured,
      } = draft
      setSendTo(draftSendTo)
      setCcList(draftCcList)
      setBccList(draftBccList)
      setSubject(draftSubject)
      setCurrentSender(draftSender)
      setMedicalForm(draftMedicalForm)
      setSecure(draftSecured)
      const toText = draftSendTo
        .map((item) => item.name || item.email)
        .join(', ')
      const ccText = draftCcList
        .map((item) => item.name || item.email)
        .join(', ')
      const bccText =
        'Bcc:' + draftBccList.map((item) => item.name || item.email).join(', ')
      let receip: string[] = []
      if (draftSendTo.length > 0) {
        receip = [...receip, toText]
      }
      if (draftCcList.length > 0) {
        receip = [...receip, ccText]
        setEditCcList(true)
      } else {
        setEditCcList(false)
      }
      if (draftBccList.length > 0) {
        receip = [...receip, bccText]
        setEditBccList(true)
      } else {
        setEditBccList(false)
      }
      setReceipients(receip.join(', '))
      setInitialized(true)
    }
  }, [draft, initialized])

  return (
    <div className={styles.sendMailContainer}>
      <div className={styles.sendToSelect} ref={toRef}>
        {!receipients && (
          <div className={styles.sendToSelectList}>
            <div className={cn(styles.item, styles.itemTitle)}>To</div>
            {sendTo.map((item, index) => (
              <div className={styles.item} key={`send-to-item-${index}`}>
                <Tag closable onClose={(e) => handleSendToClose(e, index)}>
                  {item.email || item.name}
                </Tag>
              </div>
            ))}
            <div className={styles.inputContainer}>
              <Input
                value={sendToItem}
                onChange={(e) => setSendToItem(e.target.value)}
                onFocus={(e) => {
                  setSendToItem('')
                }}
                onBlur={(e) => {
                  handleAddSendToList()
                }}
                onPressEnter={() => handleAddSendToList()}
              />
            </div>
          </div>
        )}
        {!receipients && editCcList && (
          <div className={styles.sendToSelectList}>
            <div className={cn(styles.item, styles.itemTitle)}>Cc</div>
            {ccList.map((item, index) => (
              <div className={styles.item} key={`send-to-item-${index}`}>
                <Tag closable onClose={(e) => handleCcClose(e, index)}>
                  {item.email || item.name}
                </Tag>
              </div>
            ))}
            <div className={styles.inputContainer}>
              <Input
                value={ccItem}
                onChange={(e) => setCcItem(e.target.value)}
                onFocus={(e) => {
                  setCcItem('')
                }}
                onBlur={(e) => {
                  handleAddCcList()
                }}
                onPressEnter={() => handleAddCcList()}
              />
            </div>
          </div>
        )}
        {!receipients && editBccList && (
          <div className={styles.sendToSelectList}>
            <div className={cn(styles.item, styles.itemTitle)}>Bcc</div>
            {bccList.map((item, index) => (
              <div className={styles.item} key={`send-to-item-${index}`}>
                <Tag closable onClose={(e) => handleBccClose(e, index)}>
                  {item.email || item.name}
                </Tag>
              </div>
            ))}
            <div className={styles.inputContainer}>
              <Input
                value={bccItem}
                onChange={(e) => setBccItem(e.target.value)}
                onFocus={(e) => {
                  setBccItem('')
                }}
                onBlur={(e) => {
                  handleAddBccList()
                }}
                onPressEnter={() => handleAddBccList()}
              />
            </div>
          </div>
        )}
        {!receipients && (
          <div className={styles.sendToCcSelect}>
            {!editBccList && (
              <span
                onClick={() => {
                  setEditBccList(true)
                }}
              >
                Bcc
              </span>
            )}
            {!editCcList && (
              <span
                onClick={() => {
                  setEditCcList(true)
                }}
              >
                Cc
              </span>
            )}
          </div>
        )}
        {receipients && (
          <div className={styles.receipients}>
            <Input
              className={styles.receipients}
              value={receipients}
              onFocus={(e) => {
                setReceipients('')
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.subjectSelect}>
        {(subject || focusSubject) && (
          <span className={styles.title}>Subject</span>
        )}
        <Input
          value={subject}
          onChange={(e) => handleChangeSubject(e.target.value)}
          placeholder={focusSubject ? '' : 'Subject'}
          onFocus={(e) => setFocusSubject(true)}
          onBlur={(e) => setFocusSubject(false)}
        />
        <div className={styles.subjectTemplateIcon}>
          <TagsOutlined />
        </div>
      </div>
      <div className={styles.senderSelect}>
        {(currentSender.email || focusSender) && (
          <span className={styles.title}>Sender</span>
        )}
        <Select
          placeholder={focusSender ? '' : 'Sender'}
          onSelect={(value) => handleSelectSender(value)}
          onFocus={(e) => setFocusSender(true)}
          onBlur={(e) => setFocusSender(false)}
        >
          {senderList.map((sender, index) => (
            <Option
              key={`sender-item-${index}`}
              value={sender.email}
            >{`${sender.name} <${sender.email}>`}</Option>
          ))}
        </Select>
      </div>
      <div className={styles.medicalFormSelect}>
        {(medicalForm || focusMedicalForm) && (
          <span className={styles.title}>Medical form</span>
        )}
        <Select
          placeholder={focusMedicalForm ? '' : 'Medical form'}
          onSelect={(value: string) => handleSelectMedicalForm(value)}
          onFocus={(e) => setFocusMedicalForm(true)}
          onBlur={(e) => setFocusMedicalForm(false)}
        >
          {medicalFormList.map((item, index) => (
            <Option key={`medical-form-${index}`} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      <div className={styles.messageInput}></div>
      <div className={styles.sendMailOperations}>
        <div>
          <Popover
            placement="topRight"
            content={
              <div
                className={styles.saveItem}
                onClick={() =>
                  onSave({
                    sendTo,
                    ccList,
                    bccList,
                    subject,
                    sender: currentSender,
                    medicalForm,
                    message: '',
                    secured: secure,
                  })
                }
              >
                {`Save email (Don't send)`}
              </div>
            }
          >
            <Button
              type="primary"
              onClick={() =>
                onSend({
                  sendTo,
                  ccList,
                  bccList,
                  subject,
                  sender: currentSender,
                  medicalForm,
                  message: '',
                  secured: secure,
                })
              }
            >
              <SendOutlined />
              Send
              <DownOutlined />
            </Button>
          </Popover>
          <PaperClipOutlined className={styles.operationItem} />
          <SmileOutlined className={styles.operationItem} />
          <PictureOutlined className={styles.operationItem} />
          <Checkbox
            checked={secure}
            className={styles.operationItem}
            onChange={(e) => handleChangeSecure(e)}
          >
            Secure mail
          </Checkbox>
        </div>
        <div>
          <div
            className={styles.discardChange}
            onClick={() => onDiscardDraft()}
          >
            <DeleteOutlined />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMail
