import React, { FC, ReactNode, useEffect, useState, useRef } from 'react'
import { Avatar } from '@pabau/ui'
import { Input, Select, Popover, Tag } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import cn from 'classnames'
import styles from './CreateLetter.module.less'

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

interface Recipient {
  avatar: string
  firstName?: string
  lastName?: string
  company?: string
  email: string
  relationship: string
}

interface Contract {
  name: string
  email: string
}

export interface LetterProps {
  subject: string
  template: string
  toList: Contract[]
  ccList: Contract[]
  bccList: Contract[]
  appointment: string
  invoice: string
  content: ReactNode
  clientSalution: string
  appointmentLastName: string
}

export interface CreateLetterProps {
  draft: LetterProps
  templateList: string[]
  recipientList: Recipient[]
  appointmentList: string[]
  invoiceList: string[]
  onSend: (letter: LetterProps) => void
  onSave: (letter: LetterProps) => void
  onDiscardDraft: () => void
  onSaveDraft?: (letter: LetterProps) => void
}

export const CreateLetter: FC<CreateLetterProps> = ({
  draft,
  templateList,
  recipientList,
  appointmentList,
  invoiceList,
  onSend,
  onSave,
  onDiscardDraft,
  onSaveDraft,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const recipRef = useRef<HTMLDivElement>(null)
  const [initialized, setInitialized] = useState(false)
  const [subject, setSubject] = useState('')
  const [template, setTemplate] = useState('')
  const [ccList, setCcList] = useState<Contract[]>([])
  const [bccList, setBccList] = useState<Contract[]>([])
  const [toList, setToList] = useState<Contract[]>([])
  const [appointment, setAppointment] = useState('')
  const [invoice, setInvoice] = useState('')
  const [clientSalution, setClientSalution] = useState('')
  const [appointmentLastName, setAppointmentLastName] = useState('')
  const [focusTemplate, setFocusTemplate] = useState(false)
  const [focusSubject, setFocusSubject] = useState(false)
  const [focusInvoice, setFocusInvoice] = useState(false)
  const [focusAppointment, setFocusAppointment] = useState(false)
  const [editCcList, setEditCcList] = useState(false)
  const [editBccList, setEditBccList] = useState(false)
  const [receipientText, setRecipientText] = useState('')

  const handleChangeSubject = (value) => {
    setSubject(value)
    onSaveDraft?.({
      ...draft,
      subject: value,
    })
  }
  const handleChangeTemplate = (value) => {
    setTemplate(value)
    onSaveDraft?.({
      ...draft,
      template: value,
    })
  }
  const handleChangeInvoice = (value) => {
    setInvoice(value)
    onSaveDraft?.({
      ...draft,
      invoice: value,
    })
  }
  const handleChangeAppointment = (value) => {
    setAppointment(value)
    onSaveDraft?.({
      ...draft,
      appointment: value,
    })
  }
  const handleChangeClientSalution = (value) => {
    setClientSalution(value)
    onSaveDraft?.({
      ...draft,
      clientSalution: value,
    })
  }
  const handleChangeAppointmentLastName = (value) => {
    setAppointmentLastName(value)
    onSaveDraft?.({
      ...draft,
      appointmentLastName: value,
    })
  }
  const handleToItemClose = (e, index) => {
    e.preventDefault()
    const items = [...toList]
    items.splice(index, 1)
    setToList(items)
    onSaveDraft?.({
      ...draft,
      toList: items,
    })
  }
  const handleCcItemClose = (e, index) => {
    e.preventDefault()
    const items = [...ccList]
    items.splice(index, 1)
    setCcList(items)
    onSaveDraft?.({
      ...draft,
      ccList: items,
    })
  }
  const handleBccItemClose = (e, index) => {
    e.preventDefault()
    const items = [...bccList]
    items.splice(index, 1)
    setBccList(items)
    onSaveDraft?.({
      ...draft,
      bccList: items,
    })
  }
  const addToItem = (recipient) => {
    const findIndex = toList.findIndex((el) => el.email === recipient.email)
    if (findIndex < 0) {
      const { company, firstName, lastName, relationship, email } = recipient
      const item = {
        email,
        name:
          relationship === 'company' || relationship === 'insurance-provider'
            ? company
            : `${firstName} ${lastName}`,
      }
      const items = [...toList, item]
      setToList(items)
      onSaveDraft?.({
        ...draft,
        toList: items,
      })
    }
  }
  const addCcItem = (recipient) => {
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
      onSaveDraft?.({
        ...draft,
        ccList: items,
      })
    }
  }

  const addBccItem = (recipient) => {
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
      onSaveDraft?.({
        ...draft,
        bccList: items,
      })
    }
  }

  useEffect(() => {
    const handleLostFocusForReceipients = (e) => {
      if (
        (!!ref &&
          ref.current &&
          !ref.current.contains(e.target) &&
          !!recipRef &&
          recipRef.current &&
          !recipRef.current.contains(e.target) &&
          receipientText === '') ||
        (!!ref &&
          ref.current &&
          !ref.current.contains(e.target) &&
          !!recipRef &&
          !recipRef.current &&
          receipientText === '')
      ) {
        const toText = toList.map((item) => item.name || item.email).join(', ')
        const ccText = ccList.map((item) => item.name || item.email).join(', ')
        const bccText =
          'Bcc:' + bccList.map((item) => item.name || item.email).join(', ')
        let receip: string[] = []
        if (toList.length > 0) {
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
        setRecipientText(receip.join(', '))
      }
      if (
        !!ref &&
        ref.current &&
        ref.current.contains(e.target) &&
        receipientText
      ) {
        setRecipientText('')
      }
    }
    document.addEventListener('mousedown', handleLostFocusForReceipients)
    return () => {
      document.removeEventListener('mousedown', handleLostFocusForReceipients)
    }
  }, [ref, recipRef, toList, ccList, bccList, receipientText])

  useEffect(() => {
    if (draft && !initialized) {
      const {
        subject: draftSubject,
        template: draftTemplate,
        toList: draftToList,
        ccList: draftCcList,
        bccList: draftBccList,
        appointment: draftAppointment,
        appointmentLastName: draftAppointmentLastName,
        invoice: draftInvoice,
        clientSalution: draftClientSalution,
      } = draft
      setSubject(draftSubject)
      setTemplate(draftTemplate)
      setCcList(draftCcList)
      setToList(draftToList)
      setBccList(draftBccList)
      setAppointment(draftAppointment)
      setAppointmentLastName(draftAppointmentLastName)
      setInvoice(draftInvoice)
      setClientSalution(draftClientSalution)
      const toText = draftToList
        .map((item) => item.name || item.email)
        .join(', ')
      const ccText = draftCcList
        .map((item) => item.name || item.email)
        .join(', ')
      const bccText =
        'Bcc:' + draftBccList.map((item) => item.name || item.email).join(', ')
      let receip: string[] = []
      if (draftCcList.length > 0) {
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
      setRecipientText(receip.join(', '))
      setInitialized(true)
    }
  }, [draft, initialized])

  const recipientListContentForTo = (
    <div ref={recipRef}>
      {recipientList.map((recipient, index) => (
        <div
          key={`recipient-${index}`}
          className={styles.recipient}
          onClick={() => addToItem(recipient)}
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
          onClick={() => addCcItem(recipient)}
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
          onClick={() => addBccItem(recipient)}
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

  return (
    <div className={styles.createLetterContainer}>
      <div>
        <div className={styles.subjectContainer}>
          {(subject || focusSubject) && (
            <span className={styles.title}>Subject</span>
          )}
          <Input
            value={subject}
            placeholder={focusSubject ? '' : 'Subject'}
            onChange={(e) => handleChangeSubject(e.target.value)}
            onFocus={(e) => setFocusSubject(true)}
            onBlur={(e) => setFocusSubject(false)}
          />
        </div>
        <div className={styles.templateContainer}>
          {(template || focusTemplate) && (
            <span className={styles.title}>Template</span>
          )}
          <Select
            value={template}
            placeholder={focusTemplate ? '' : 'Template'}
            onSelect={(value) => handleChangeTemplate(value)}
            onFocus={(e) => setFocusTemplate(true)}
            onBlur={(e) => setFocusTemplate(false)}
          >
            {templateList?.map((item, index) => (
              <Option key={`template-item-${index}`} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.recipentContainer} ref={ref}>
          {!receipientText && (
            <Popover
              placement="bottomLeft"
              content={recipientListContentForTo}
              trigger="click"
              overlayClassName={styles.recipientListContainer}
            >
              <div className={styles.sendToSelectList}>
                <div className={cn(styles.item, styles.itemTitle)}>To</div>
                {toList.map((item, index) => (
                  <div className={styles.item} key={`send-to-item-${index}`}>
                    <Tag closable onClose={(e) => handleToItemClose(e, index)}>
                      {item.email || item.name}
                    </Tag>
                  </div>
                ))}
              </div>
            </Popover>
          )}
          {!receipientText && editCcList && (
            <Popover
              placement="bottomLeft"
              content={recipientListContentForCc}
              trigger="click"
              overlayClassName={styles.recipientListContainer}
            >
              <div className={styles.sendToSelectList}>
                <div className={cn(styles.item, styles.itemTitle)}>Cc</div>
                {ccList.map((item, index) => (
                  <div className={styles.item} key={`send-to-item-${index}`}>
                    <Tag closable onClose={(e) => handleCcItemClose(e, index)}>
                      {item.email || item.name}
                    </Tag>
                  </div>
                ))}
              </div>
            </Popover>
          )}
          {!receipientText && editBccList && (
            <Popover
              placement="bottomLeft"
              content={recipientListContentForBcc}
              trigger="click"
              overlayClassName={styles.recipientListContainer}
            >
              <div className={styles.sendToSelectList}>
                <div className={cn(styles.item, styles.itemTitle)}>Bcc</div>
                {bccList.map((item, index) => (
                  <div className={styles.item} key={`send-to-item-${index}`}>
                    <Tag closable onClose={(e) => handleBccItemClose(e, index)}>
                      {item.email || item.name}
                    </Tag>
                  </div>
                ))}
              </div>
            </Popover>
          )}
          {!receipientText && (
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
          {receipientText && (
            <div className={styles.recipientText}>{receipientText}</div>
          )}
        </div>
        <div className={styles.appointmentContainer}>
          {(appointment || focusAppointment) && (
            <span className={styles.title}>Appointment</span>
          )}
          <Select
            value={appointment}
            placeholder={focusAppointment ? '' : 'Appointment'}
            onSelect={(value) => handleChangeAppointment(value)}
            onFocus={(e) => setFocusAppointment(true)}
            onBlur={(e) => setFocusAppointment(false)}
          >
            {appointmentList?.map((item, index) => (
              <Option key={`appointment-item-${index}`} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.invoiceContainer}>
          {(invoice || focusInvoice) && (
            <span className={styles.title}>Invoice</span>
          )}
          <Select
            value={invoice}
            placeholder={focusInvoice ? '' : 'Invoice'}
            onSelect={(value) => handleChangeInvoice(value)}
            onFocus={(e) => setFocusInvoice(true)}
            onBlur={(e) => setFocusInvoice(false)}
          >
            {invoiceList?.map((item, index) => (
              <Option key={`invoice-item-${index}`} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.contentContainer}></div>
      </div>
      <div>
        <div className={styles.inputContainer}>
          <div className={styles.item}>
            <div className={styles.label}>Client Salution</div>
            <div className={styles.input}>
              <Input
                value={clientSalution}
                onChange={(e) => handleChangeClientSalution(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>Appointment Last Name</div>
            <div className={styles.input}>
              <Input
                value={appointmentLastName}
                onChange={(e) =>
                  handleChangeAppointmentLastName(e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateLetter
