import {
  DeleteOutlined,
  DownOutlined,
  PaperClipOutlined,
  PictureOutlined,
  SendOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import {
  Button,
  InputHtmlWithTags,
  InputWithTags,
  Avatar,
  SendMailOps,
  AttachDialog,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Input, Popover, Select, Tag } from 'antd'
import { UploadProps } from 'antd/es/upload'
import cn from 'classnames'
import React, { FC, useEffect, useRef, useState } from 'react'
import { recipientList } from './mock'
import styles from './SendMail.module.less'

const { Option } = Select
const recipientProperty = {
  'family-member': {
    class: styles.familyMemberTag,
    name: 'Family',
  },
  'emergency-contact': {
    class: styles.emergencyContactTag,
    name: 'Patient',
  },
  'next-of-kin': {
    class: styles.nextOfKinTag,
    name: 'Patient',
  },
  practioner: {
    class: styles.practionerTag,
    name: 'GP',
  },
  'insurance-provider': {
    class: styles.insuranceProviderTag,
    name: 'Insurance Provider',
  },
  company: {
    class: styles.companyTag,
    name: 'Company',
  },
}

interface Contract {
  name: string
  email: string
}

interface Sender {
  name: string
  email: string
}

interface Recipient {
  avatar: string
  firstName?: string
  lastName?: string
  company?: string
  email: string
  relationship: string
}

export interface MailProps {
  sendTo: Contract[]
  ccList: Contract[]
  bccList: Contract[]
  subject: string
  sender: Sender
  message: string
  attachFiles: {
    images: ImageItem[]
    files: UploadProps[]
  }
}

export interface SendMailComponentProps {
  draft: MailProps
  subjectsList?: string[]
  senderList: Sender[]
  recipientList: Recipient[]
  onSend: (mail: MailProps) => void
  onSave: (mail: MailProps) => void
  onSaveDraft?: (draft: MailProps) => void
}

interface ImageItem {
  src: string
  name: string
}

const SendMailComponent: FC<SendMailComponentProps> = ({
  draft,
  subjectsList,
  senderList,
  recipientList,
  onSend,
  onSave,
  onSaveDraft,
}) => {
  const toRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLDivElement>(null)
  const recipRef = useRef<HTMLDivElement>(null)
  const [sendTo, setSendTo] = useState<Contract[]>([])
  const [sendToItem, setSendToItem] = useState('')
  const [ccList, setCcList] = useState<Contract[]>([])
  const [ccItem, setCcItem] = useState('')
  const [bccList, setBccList] = useState<Contract[]>([])
  const [bccItem, setBccItem] = useState('')
  const [currentSender, setCurrentSender] = useState<Sender>({
    name: '',
    email: '',
  })
  const [subject, setSubject] = useState('')
  const [editCcList, setEditCcList] = useState(false)
  const [editBccList, setEditBccList] = useState(false)
  const [focusSender, setFocusSender] = useState(false)
  const [receipients, setReceipients] = useState('')
  const [message, setMessage] = useState('')
  const [showToPopover, setShowToPopover] = useState(false)
  const [showBccPopover, setShowBccPopover] = useState(false)
  const [showCcPopover, setShowCcPopover] = useState(false)
  const [showAttachDlg, setShowAttachDlg] = useState(false)
  const [attachedImages, setAttachedImages] = useState<ImageItem[]>([])
  const [attachedFiles, setAttachedFiles] = useState<UploadProps[]>([])

  const handleAttachments = (images, fileList) => {
    if (images.length > 0) {
      const list = [...attachedImages, ...images]
      setAttachedImages(list)
      onSaveDraft?.({
        ...draft,
        attachFiles: { images: list, files: attachedFiles },
      })
    }
    if (fileList.length > 0) {
      const list = [...attachedFiles, ...fileList]
      setAttachedFiles(list)
      onSaveDraft?.({
        ...draft,
        attachFiles: { files: list, images: attachedImages },
      })
    }
    setShowAttachDlg(false)
  }

  const handleDeleteAttachedImage = (index) => {
    const items = [...attachedImages]
    items.splice(index, 1)
    setAttachedImages(items)
    onSaveDraft?.({
      ...draft,
      attachFiles: { images: items, files: attachedFiles },
    })
  }

  const handleDeleteAttachedFile = (index) => {
    const items = [...attachedFiles]
    items.splice(index, 1)
    setAttachedFiles(items)
    onSaveDraft?.({
      ...draft,
      attachFiles: { images: attachedImages, files: items },
    })
  }

  const handleSelectSender = (value) => {
    const findSender = senderList.find((item) => item.email === value)
    setCurrentSender(findSender ?? { name: '', email: '' })
    onSaveDraft?.({
      ...draft,
      sender: findSender ?? { name: '', email: '' },
    })
  }

  const validateEmail = (email) => {
    const re = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z]+\.)+[A-Za-z]{2,}))$/
    return re.test(email)
  }

  const handleAddSendToList = () => {
    if (sendToItem) {
      setSendTo([...sendTo, { name: '', email: sendToItem }])
      setSendToItem('')
      setShowToPopover(false)
    }
  }

  const handleAddCcList = () => {
    if (ccItem) {
      setCcList([...ccList, { name: '', email: ccItem }])
      setCcItem('')
      setShowCcPopover(false)
    }
  }

  const handleAddBccList = () => {
    if (bccItem) {
      setBccList([...bccList, { name: '', email: bccItem }])
      setBccItem('')
      setShowBccPopover(false)
    }
  }

  const handleSendToClose = (e, index) => {
    e.preventDefault()
    const items = [...sendTo]
    items.splice(index, 1)
    setSendTo(items)
  }

  const handleCcClose = (e, index) => {
    e.preventDefault()
    const items = [...ccList]
    items.splice(index, 1)
    setCcList(items)
  }

  const handleBccClose = (e, index) => {
    e.preventDefault()
    const items = [...bccList]
    items.splice(index, 1)
    setBccList(items)
  }

  const handleChangeSubject = (value) => {
    setSubject(value)
    onSaveDraft?.({
      ...draft,
      subject: value,
    })
  }

  const onMessageWithTagChange = (e) => {
    setMessage(e)
    onSaveDraft?.({
      ...draft,
      message: e,
    })
  }

  const onSubjectWithTagChange = (e) => {
    handleChangeSubject(e)
  }

  const addToItem = (e, recipient) => {
    e.preventDefault()
    const findIndex = sendTo.findIndex((el) => el.email === recipient.email)
    if (findIndex < 0) {
      const { company, firstName, lastName, relationship, email } = recipient
      const item = {
        email,
        name:
          relationship === 'company' || relationship === 'insurance-provider'
            ? company
            : `${firstName} ${lastName}`,
      }
      const items = [...sendTo, item]
      setSendTo(items)
    }
    setShowToPopover(false)
  }

  const addCcItem = (e, recipient) => {
    e.preventDefault()
    const findIndex = ccList.findIndex((el) => el.email === recipient.email)
    if (findIndex < 0) {
      const { company, firstName, lastName, relationship, email } = recipient
      const item = {
        email,
        name:
          relationship === 'company' || relationship === 'insurance-provider'
            ? company
            : `${firstName} ${lastName}`,
      }
      const items = [...ccList, item]
      setCcList(items)
    }
    setShowCcPopover(false)
  }

  const addBccItem = (e, recipient) => {
    e.preventDefault()
    const findIndex = bccList.findIndex((el) => el.email === recipient.email)
    if (findIndex < 0) {
      const { company, firstName, lastName, relationship, email } = recipient
      const item = {
        email,
        name:
          relationship === 'company' || relationship === 'insurance-provider'
            ? company
            : `${firstName} ${lastName}`,
      }
      const items = [...bccList, item]
      setBccList(items)
    }
    setShowBccPopover(false)
  }

  const recipientListContentForTo = (
    <div ref={recipRef}>
      {recipientList.map((recipient, index) => (
        <div
          key={`recipient-${index}`}
          className={styles.recipient}
          onClick={(e) => addToItem(e, recipient)}
        >
          <div>
            <Avatar src={recipient.avatar} size={32} />
          </div>
          <div>
            <div className={styles.name}>
              {recipient.relationship === 'company' ||
              recipient.relationship === 'insurance-provider'
                ? recipient.company
                : `${recipient.firstName} ${recipient.lastName}`}
            </div>
            <div className={styles.email}>{recipient.email}</div>
          </div>
          <div>
            <Tag className={recipientProperty[recipient.relationship].class}>
              {recipientProperty[recipient.relationship].name}
            </Tag>
          </div>
        </div>
      ))}
      <div className={styles.addRelationship}>
        <InfoCircleOutlined style={{ marginRight: '8px' }} /> Add a relationship
        to send to more parties
      </div>
    </div>
  )

  const recipientListContentForCc = (
    <div ref={recipRef}>
      {recipientList.map((recipient, index) => (
        <div
          key={`recipient-${index}`}
          className={styles.recipient}
          onClick={(e) => addCcItem(e, recipient)}
        >
          <div>
            <Avatar src={recipient.avatar} size={32} />
          </div>
          <div>
            <div className={styles.name}>
              {recipient.relationship === 'company' ||
              recipient.relationship === 'insurance-provider'
                ? recipient.company
                : `${recipient.firstName} ${recipient.lastName}`}
            </div>
            <div className={styles.email}>{recipient.email}</div>
          </div>
          <div>
            <Tag className={recipientProperty[recipient.relationship].class}>
              {recipientProperty[recipient.relationship].name}
            </Tag>
          </div>
        </div>
      ))}
      <div className={styles.addRelationship}>
        <InfoCircleOutlined style={{ marginRight: '8px' }} /> Add a relationship
        to send to more parties
      </div>
    </div>
  )

  const recipientListContentForBcc = (
    <div ref={recipRef}>
      {recipientList.map((recipient, index) => (
        <div
          key={`recipient-${index}`}
          className={styles.recipient}
          onClick={(e) => addBccItem(e, recipient)}
        >
          <div>
            <Avatar src={recipient.avatar} size={32} />
          </div>
          <div>
            <div className={styles.name}>
              {recipient.relationship === 'company' ||
              recipient.relationship === 'insurance-provider'
                ? recipient.company
                : `${recipient.firstName} ${recipient.lastName}`}
            </div>
            <div className={styles.email}>{recipient.email}</div>
          </div>
          <div>
            <Tag className={recipientProperty[recipient.relationship].class}>
              {recipientProperty[recipient.relationship].name}
            </Tag>
          </div>
        </div>
      ))}
      <div className={styles.addRelationship}>
        <InfoCircleOutlined style={{ marginRight: '8px' }} /> Add a relationship
        to send to more parties
      </div>
    </div>
  )

  useEffect(() => {
    const handleLostFocusForReceipients = (e) => {
      if (
        !!toRef &&
        toRef.current &&
        !toRef.current.contains(e.target) &&
        !!recipRef &&
        recipRef.current &&
        !recipRef.current.contains(e.target)
      ) {
        const toText = sendTo.map((item) => item.email || item.name).join(', ')
        const ccText = ccList.map((item) => item.email || item.name).join(', ')
        const bccText =
          'Bcc:' + bccList.map((item) => item.email || item.name).join(', ')
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
        onSaveDraft?.({
          ...draft,
          sendTo,
          ccList,
          bccList,
        })
      }
    }
    document.addEventListener('mousedown', handleLostFocusForReceipients)
    return () => {
      document.removeEventListener('mousedown', handleLostFocusForReceipients)
    }
  }, [recipRef, toRef, sendTo, ccList, bccList, onSaveDraft, draft])

  useEffect(() => {
    if (draft) {
      const {
        sendTo: draftSendTo,
        ccList: draftCcList,
        bccList: draftBccList,
        subject: draftSubject,
        sender: draftSender,
        message: draftMessage,
        attachFiles: draftAttach,
      } = draft
      setSendTo(draftSendTo)
      setCcList(draftCcList)
      setBccList(draftBccList)
      setSubject(draftSubject)
      setCurrentSender(draftSender)
      setMessage(draftMessage)
      setAttachedFiles(draftAttach.files)
      setAttachedImages(draftAttach.images)
      const toText = draftSendTo
        .map((item) => item.email || item.name)
        .join(', ')
      const ccText = draftCcList
        .map((item) => item.email || item.name)
        .join(', ')
      const bccText =
        'Bcc:' + draftBccList.map((item) => item.email || item.name).join(', ')
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
    }
  }, [draft])

  return (
    <div className={styles.sendMailComponentContainer}>
      <div className={styles.sendToSelect} ref={toRef}>
        {!receipients && (
          <div className={styles.sendToSelectList}>
            <div className={cn(styles.item, styles.itemTitle)}>To</div>
            {sendTo.map((item, index) => (
              <div className={styles.item} key={`send-to-item-${index}`}>
                <Tag
                  closable
                  onClose={(e) => handleSendToClose(e, index)}
                  color={validateEmail(item.email) ? 'default' : '#f5222d'}
                >
                  {item.email || item.name}
                </Tag>
              </div>
            ))}
            <div className={styles.inputContainer}>
              <Popover
                visible={showToPopover}
                onVisibleChange={(visible) => setShowToPopover(visible)}
                placement="bottomLeft"
                content={recipientListContentForTo}
                trigger="click"
                overlayClassName={styles.recipientListContainer}
              >
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
              </Popover>
            </div>
          </div>
        )}
        {!receipients && editCcList && (
          <div className={styles.sendToSelectList}>
            <div className={cn(styles.item, styles.itemTitle)}>Cc</div>
            {ccList.map((item, index) => (
              <div className={styles.item} key={`send-to-item-${index}`}>
                <Tag
                  closable
                  onClose={(e) => handleCcClose(e, index)}
                  color={validateEmail(item.email) ? 'default' : '#f5222d'}
                >
                  {item.email || item.name}
                </Tag>
              </div>
            ))}
            <div className={styles.inputContainer}>
              <Popover
                visible={showCcPopover}
                onVisibleChange={(visible) => setShowCcPopover(visible)}
                placement="bottomLeft"
                content={recipientListContentForCc}
                trigger="click"
                overlayClassName={styles.recipientListContainer}
              >
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
              </Popover>
            </div>
          </div>
        )}
        {!receipients && editBccList && (
          <div className={styles.sendToSelectList}>
            <div className={cn(styles.item, styles.itemTitle)}>Bcc</div>
            {bccList.map((item, index) => (
              <div className={styles.item} key={`send-to-item-${index}`}>
                <Tag
                  closable
                  onClose={(e) => handleBccClose(e, index)}
                  color={validateEmail(item.email) ? 'default' : '#f5222d'}
                >
                  {item.email || item.name}
                </Tag>
              </div>
            ))}
            <div className={styles.inputContainer}>
              <Popover
                visible={showBccPopover}
                onVisibleChange={(visible) => setShowBccPopover(visible)}
                placement="bottomLeft"
                content={recipientListContentForBcc}
                trigger="click"
                overlayClassName={styles.recipientListContainer}
              >
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
              </Popover>
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
        <InputWithTags
          placeholder={'Subject'}
          onChange={onSubjectWithTagChange}
          value={''}
          valueWithTag={''}
          disabledTags={[]}
          maxWidth={messageInputRef.current?.offsetWidth || 0 - 20}
          maxHeight={32}
        />
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
      <div className={styles.messageInput} ref={messageInputRef}>
        <InputHtmlWithTags
          placeholder={''}
          onChange={onMessageWithTagChange}
          value={''}
          valueWithTag={message}
          disabledTags={[]}
          maxWidth={messageInputRef.current?.offsetWidth || 0 - 20}
          maxHeight={messageInputRef.current?.offsetHeight || 0 - 20}
        />
      </div>
      <div className={styles.attachedFiles}>
        {attachedImages.map((item, index) => (
          <div className={styles.attachedItem} key={`attached-image-${index}`}>
            <span>{item.name}</span>
            <DeleteOutlined onClick={() => handleDeleteAttachedImage(index)} />
          </div>
        ))}
        {attachedFiles.map((item, index) => (
          <div className={styles.attachedItem} key={`attached-file-${index}`}>
            <span>{item.name}</span>
            <DeleteOutlined onClick={() => handleDeleteAttachedFile(index)} />
          </div>
        ))}
      </div>
      <div className={styles.sendMailOperations}>
        <div className={styles.sendButtonContainer}>
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
                    message: '',
                    attachFiles: {
                      files: attachedFiles,
                      images: attachedImages,
                    },
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
                  message: '',
                  attachFiles: {
                    files: attachedFiles,
                    images: attachedImages,
                  },
                })
              }
            >
              <SendOutlined />
              Send
              <DownOutlined />
            </Button>
          </Popover>
        </div>
        <div
          className={styles.attachIcon}
          onClick={() => setShowAttachDlg(true)}
        >
          <PaperClipOutlined />
        </div>
        <div
          className={styles.pictureAttachIcon}
          onClick={() => setShowAttachDlg(true)}
        >
          <PictureOutlined />
        </div>
        <SendMailOps
          message={message}
          onChangeSignature={(signature) =>
            onMessageWithTagChange(message + signature)
          }
          onProposeTimeSelected={(time) => {
            onMessageWithTagChange(message + time)
          }}
          onChooseTemplate={(template) =>
            onMessageWithTagChange(message + template)
          }
        />
      </div>
      {showAttachDlg && (
        <AttachDialog
          visible={showAttachDlg}
          onClose={() => setShowAttachDlg(false)}
          onAttached={(images, fileList) => handleAttachments(images, fileList)}
        />
      )}
    </div>
  )
}

interface SendMailProps {
  client: {
    id: string
    email: string
    name: string
  }
  receiverData: string
  onSend?: () => void
}

interface DraftContent {
  receiverData: string
  draft?: MailProps
}

const defaultClientEmail = 'bruno.ballardin@outlook.com'

export const SendMail: FC<SendMailProps> = ({
  client,
  receiverData,
  onSend,
}) => {
  const [contentItems, setContentItems] = useState<DraftContent[]>([])
  const [draft, setDraft] = useState<MailProps>({
    sendTo: [],
    ccList: [],
    bccList: [],
    subject: '',
    sender: { name: '', email: '' },
    message: '',
    attachFiles: {
      files: [],
      images: [],
    },
  })

  const handleSaveDraft = (draft) => {
    const content = [...contentItems]
    const findIndex = contentItems.findIndex(
      (el) => el.receiverData === receiverData
    )
    if (findIndex >= 0) {
      content[findIndex].draft = draft
      window.localStorage.setItem('pabau_content', JSON.stringify(content))
    }
    setDraft(draft)
  }

  const handleSend = (mail: MailProps) => {
    Notification(NotificationType.success, 'Email sent')
    onSend?.()
  }

  useEffect(() => {
    const items =
      JSON.parse(window.localStorage.getItem('pabau_content') || '{}') || []
    if (Array.isArray(items) && items.length > 0) {
      setContentItems(items)
      const findItem = items.find((item) => item.receiverData === receiverData)
      if (findItem) {
        setDraft(findItem.draft)
      } else {
        setContentItems([
          ...items,
          {
            receiverData,
            draft: {
              sendTo: [{ email: client.email || defaultClientEmail, name: '' }],
              ccList: [],
              bccList: [],
              sender: { name: '', email: '' },
              subject: '',
              message: '',
              attachFiles: {
                files: [],
                images: [],
              },
            },
          },
        ])
        setDraft({
          sendTo: [{ email: client.email || defaultClientEmail, name: '' }],
          ccList: [],
          bccList: [],
          sender: { name: '', email: '' },
          subject: '',
          message: '',
          attachFiles: {
            files: [],
            images: [],
          },
        })
      }
    } else {
      setContentItems([
        {
          receiverData,
          draft: {
            sendTo: [{ email: client.email || defaultClientEmail, name: '' }],
            ccList: [],
            bccList: [],
            sender: { name: '', email: '' },
            subject: '',
            message: '',
            attachFiles: {
              files: [],
              images: [],
            },
          },
        },
      ])
      setDraft({
        sendTo: [{ email: client.email || defaultClientEmail, name: '' }],
        ccList: [],
        bccList: [],
        sender: { name: '', email: '' },
        subject: '',
        message: '',
        attachFiles: {
          files: [],
          images: [],
        },
      })
    }
  }, [receiverData, client])

  return (
    <div className={styles.sendMailContainer}>
      <SendMailComponent
        draft={draft}
        senderList={[]}
        recipientList={recipientList}
        onSend={(mail) => {
          handleSend(mail)
        }}
        onSave={(mail) => {
          return
        }}
        onSaveDraft={(draft) => handleSaveDraft(draft)}
      />
    </div>
  )
}

export default SendMail
