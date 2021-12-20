import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import styles from './Index.module.less'
import {
  Button,
  Checkbox,
  Notification,
  NotificationType,
  Table,
  TabMenu,
} from '@pabau/ui'
import { Badge, Card, Dropdown, Input, Menu, Radio, Skeleton } from 'antd'
import {
  AimOutlined,
  ArrowLeftOutlined,
  CaretDownOutlined,
  CheckOutlined,
  CloudServerOutlined,
  DeleteOutlined,
  DownOutlined,
  FileOutlined,
  FilterOutlined,
  FolderOpenOutlined,
  InboxOutlined,
  LockOutlined,
  MailOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  RedoOutlined,
  SendOutlined,
  SettingOutlined,
  UpOutlined,
  UserOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { ReactComponent as Attched } from '../../assets/images/attched.svg'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useUser } from '../../context/UserContext'
import dynamic from 'next/dynamic'
import {
  FindGmailConnectionDocument,
  UpdateGmailConnectionDocument,
  useCheckEmailLinkLazyQuery,
} from '@pabau/graphql'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const { Search } = Input

//::TODO
// setup project for pabau at the end of
// complete mail futures in google cloud at a time below all cred go into some secure place
// here is only testing clientId and clientScerate
export const clientId =
  '1006619281478-0ggfmclia2856fnes3640qn7rhq1f2u9.apps.googleusercontent.com'
export const clientScerate = 'IfyIxOV4e-OW_CU3KTgUFk4n'

const ReadEmail = dynamic(() => import('./ReadEmail'), {
  ssr: false,
})
export const Inbox = () => {
  const { t } = useTranslationI18()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [inboxEmail, setInboxEmail] = useState([])
  const [draftEmail, setDraftEmail] = useState([])
  const [sentEmail, setSentEmail] = useState([])
  const [archiveEmail, setArchiveEmail] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState(1)
  const [totalInbox, setTotalInbox] = useState(0)
  const [inboxCount, setInboxCount] = useState(0)
  const [readEmail, setReadEmail] = useState(false)
  const [emailId, setEmailId] = useState('')
  const [threadsId, setThreadsId] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [authToken, setAuthToken] = useState('')
  const [leadEmail, setLeadEmail] = useState([])
  const [leadArchiveEmail, setLeadArchiveEmail] = useState([])
  const [leadDraftEmail, setLeadDraftEmail] = useState([])
  const [leadSentEmail, setLeadSentEmail] = useState([])

  const [updateConnection] = useMutation(UpdateGmailConnectionDocument, {
    onError(e) {
      Notification(NotificationType.error, t('setup.gmail.update.token.error'))
    },
  })

  const userSignIn = true

  const { me } = useUser()
  const [loadConnection, { data: gmailConnection }] = useLazyQuery(
    FindGmailConnectionDocument,
    {
      variables: {
        companyId: me.company,
        userId: me.user,
      },
    }
  )

  const [
    loadLeadClient,
    { data: checkClientLead, loading },
  ] = useCheckEmailLinkLazyQuery()

  const [
    loadArchiveLeadClient,
    { data: checkArchiveClientLead, loading: archiveLoading },
  ] = useCheckEmailLinkLazyQuery()

  const [
    loadDraftLeadClient,
    { data: checkDraftClientLead, loading: draftLoading },
  ] = useCheckEmailLinkLazyQuery()

  const [
    loadSentLeadClient,
    { data: checkSentClientLead, loading: sentLoading },
  ] = useCheckEmailLinkLazyQuery()

  const updateLeadClient = (emailVal, checkLeadClient) => {
    const temp = []
    emailVal.map((mail) => {
      const leadFind = checkLeadClient?.checkEmailLink.find(
        (status) => mail.sender === status.email && status.type === 'lead'
      )
      const clientFind = checkLeadClient?.checkEmailLink.find(
        (status) => mail.sender === status.email && status.type === 'contact'
      )
      if (leadFind) {
        temp.push({
          ...mail,
          status: 'lead',
          lead: leadFind.fistName + ' ' + leadFind.lastName,
          roleId: leadFind.id,
        })
      } else if (clientFind) {
        temp.push({
          ...mail,
          status: 'client',
          client: clientFind.fistName + ' ' + clientFind.lastName,
          roleId: clientFind.id,
        })
      } else {
        temp.push({
          ...mail,
          status: 'no',
        })
      }
      return 1
    })
    return temp
  }

  useEffect(() => {
    if (checkClientLead?.checkEmailLink) {
      const InboxData = updateLeadClient(inboxEmail, checkClientLead)
      setInboxEmail(InboxData)
      setLeadEmail([])
    }
    if (checkArchiveClientLead?.checkEmailLink) {
      const archiveData = updateLeadClient(archiveEmail, checkArchiveClientLead)
      setArchiveEmail(archiveData)
      setLeadArchiveEmail([])
    }
    if (checkDraftClientLead?.checkEmailLink) {
      const draftData = updateLeadClient(draftEmail, checkDraftClientLead)
      setDraftEmail(draftData)
      setLeadDraftEmail([])
    }
    if (checkSentClientLead?.checkEmailLink) {
      const sentData = updateLeadClient(sentEmail, checkSentClientLead)
      setSentEmail(sentData)
      setLeadSentEmail([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkClientLead,
    checkArchiveClientLead,
    checkDraftClientLead,
    checkSentClientLead,
  ])

  useEffect(() => {
    if (leadEmail.length > 0) {
      loadLeadClient({
        variables: {
          emails: leadEmail,
        },
      })
    }
    if (leadArchiveEmail.length > 0) {
      loadArchiveLeadClient({
        variables: {
          emails: leadArchiveEmail,
        },
      })
    }
    if (leadDraftEmail.length > 0) {
      loadDraftLeadClient({
        variables: {
          emails: leadDraftEmail,
        },
      })
    }
    if (leadSentEmail.length > 0) {
      loadSentLeadClient({
        variables: {
          emails: leadSentEmail,
        },
      })
    }
  }, [
    leadEmail,
    loadLeadClient,
    leadArchiveEmail,
    loadArchiveLeadClient,
    leadDraftEmail,
    loadDraftLeadClient,
    leadSentEmail,
    loadSentLeadClient,
  ])

  const router = useRouter()

  const getNewAuthToken = async () => {
    if (gmailConnection && gmailConnection.gmail_connection.length > 0) {
      fetch(
        `https://oauth2.googleapis.com/token?client_id=${clientId}&client_secret=${clientScerate}&grant_type=refresh_token&refresh_token=${gmailConnection.gmail_connection[0].refresh_token}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
        }
      )
        .then((response) => {
          return response.json()
        })
        .then(async (data) => {
          await updateConnection({
            variables: {
              email: gmailConnection.gmail_connection[0].email,
              companyId: me.company,
              userId: me.user,
              accessToken: data.access_token,
            },
            optimisticResponse: {},
            refetchQueries: [
              {
                query: FindGmailConnectionDocument,
                variables: {
                  companyId: me.company,
                  userId: me.user,
                },
              },
            ],
          })
        })
    }
  }

  const extractData = (finalEmails) => {
    return finalEmails.map((itm: any) => {
      const rowData = {
        name: '',
        time: '',
        subject: '',
        isAttched: false,
        sender: '',
        lead: '',
      }

      if (itm.payload.mimeType === 'multipart/mixed') {
        rowData.isAttched = true
      }
      itm.payload.headers.map((header) => {
        if (header.name === 'From') {
          rowData.name = header.value.split('<')
          rowData.sender = rowData.name[rowData.name.length - 1].split('>')[0]
        }
        if (header.name === 'Date') {
          rowData.time = header.value
        }
        if (header.name === 'Subject') {
          rowData.subject = header.value
        }
        return 1
      })

      const todayDiff = dayjs().diff(dayjs(rowData.time), 'day')

      const yearDiff = dayjs().diff(dayjs(rowData.time), 'year')

      if (todayDiff === 0) {
        rowData.time = `${dayjs(rowData.time).format('HH:mm')}`
      } else if (yearDiff === 0) {
        rowData.time = `${dayjs(rowData.time).format('DD MMM ')}`
      } else if (yearDiff > 0) {
        rowData.time = `${dayjs(rowData.time).format('DD MMM YYYY')}`
      }

      return {
        ...rowData,
        id: itm.id,
        key: itm.threadId,
        name: {
          name: rowData.name[0],
          status: itm.labelIds.includes('UNREAD'),
        },
        isAttched: rowData.isAttched,
        subject: { name: rowData.subject, subject: itm.snippet },
        sender: rowData.sender,
      }
    })
  }

  const listInboxEmail = async (msg) => {
    let unreadEmail = 0
    const emailBox = []
    setIsLoading(true)
    await Promise.all(
      await msg.map(async (msg) => {
        return await fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.id}?access_token=${authToken}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        ).then(async (response) => {
          await response.json().then((json) => {
            emailBox.push(json)
          })
        })
      })
    )
    setTotalInbox(emailBox.length)
    emailBox.map((itm: any, i) => {
      if (itm.labelIds.includes('UNREAD')) {
        unreadEmail += 1
      }
      return 1
    })

    const val = await extractData(emailBox)
    setInboxEmail(val)
    const mailArray = []
    val.map((email) => mailArray.push(email.sender))
    setLeadEmail(mailArray)
    setInboxCount(unreadEmail)
  }

  const listDraftEmail = async (draft) => {
    setIsLoading(true)
    const emailBox = []
    await Promise.all(
      draft.map(async (msg) => {
        return fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.message.id}?access_token=${authToken}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        ).then(async (response) => {
          await response.json().then((json) => {
            emailBox.push(json)
          })
        })
      })
    )

    const draftList = emailBox.map((itm: any) => {
      const rowData = { name: '', time: '', subject: '', sender: '' }

      itm.payload.headers.map((x) => {
        if (x.name === 'From') {
          rowData.name = x.value.split('<')
        }
        if (x.name === 'To') {
          const senderVal = x.value.split('<')
          rowData.sender = senderVal[senderVal.length - 1].split('>')[0]
        }
        if (x.name === 'Date') {
          rowData.time = `${dayjs(x.value).format('HH:mm')}`
        }
        if (x.name === 'Subject') {
          rowData.subject = x.value
        }
        return rowData
      })
      if (rowData.name !== '') {
        return {
          ...rowData,
          id: itm.id,
          key: itm.threadId,
          name: {
            name: rowData.name[0],
            status: itm.labelIds.includes('UNREAD'),
          },
          subject: { name: rowData.subject, subject: itm.snippet },
        }
      }
      return 1
    })
    const mailArray = []
    draftList.map(
      (emails: any) =>
        emails?.sender.length > 0 && mailArray.push(emails.sender)
    )
    setDraftEmail(draftList)
    setLeadDraftEmail(mailArray)
  }

  const listSentEmail = async (msg) => {
    setIsLoading(true)
    const emailBox = []
    await Promise.all(
      msg.map(async (msg) => {
        return fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.id}?access_token=${authToken}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        ).then(async (response) => {
          await response.json().then(async (json) => {
            emailBox.push(json)
          })
        })
      })
    )
    const sentList = emailBox.map((itm: any) => {
      const rowData = { name: '', time: '', subject: '', sender: '' }
      if (itm.labelIds.includes('SENT')) {
        itm.payload.headers.map((x) => {
          if (x.name === 'To') {
            rowData.name = x.value.split('<')
            rowData.sender = rowData.name[rowData.name.length - 1].split('>')[0]
          }
          if (x.name === 'Date') {
            rowData.time = `${dayjs(x.value).format('HH:mm')}`
          }
          if (x.name === 'Subject') {
            rowData.subject = x.value
          }
          return rowData
        })
      }
      if (rowData.name !== '') {
        return {
          ...rowData,
          id: itm.id,
          key: itm.threadId,
          name: {
            name: rowData.name[0],
            status: itm.labelIds.includes('UNREAD'),
          },
          subject: { name: rowData.subject, subject: itm.snippet },
        }
      }
      return 1
    })
    const mailArray = []
    sentList.map(
      (emails: any) =>
        emails?.sender.length > 0 && mailArray.push(emails.sender)
    )
    setSentEmail(sentList)
    setLeadSentEmail(mailArray)
  }

  const listArchiveEmail = async (msg) => {
    setIsLoading(true)
    const emailBox = []
    await Promise.all(
      msg.map(async (msg) => {
        return fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.id}?access_token=${authToken}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        ).then((response) => {
          if (response.ok) {
            response.json().then(async (json) => {
              emailBox.push(json)
            })
          }
        })
      })
    )
    const archiveEmail = emailBox.map((itm: any) => {
      const rowData = { name: '', time: '', subject: '', sender: '' }
      if (
        (!itm?.labelIds?.includes('INBOX') &&
          !itm?.labelIds?.includes('SENT') &&
          !itm?.labelIds?.includes('DRAFT')) ||
        itm?.labelIds?.includes('ARCHIVE')
      ) {
        itm.payload.headers.map((x) => {
          if (x.name === 'From') {
            rowData.name = x.value.split('<')
            rowData.sender = rowData.name[rowData.name.length - 1].split('>')[0]
          }
          if (x.name === 'Date') {
            rowData.time = `${dayjs(x.value).format('HH:mm')}`
          }
          if (x.name === 'Subject') {
            rowData.subject = x.value
          }
          return rowData
        })
      }
      if (rowData.name !== '') {
        return {
          ...rowData,
          id: itm.id,
          key: itm.threadId,
          name: {
            name: rowData.name[0],
            status: itm?.labelIds?.includes('UNREAD'),
          },
          subject: { name: rowData.subject, subject: itm.snippet },
          sender: rowData.sender,
        }
      }
      return 1
    })
    const row = []
    archiveEmail.map((x) => {
      if (x !== 1) {
        row.push(x)
      }
      return 1
    })

    setArchiveEmail(row)
    const mailArray = []
    row.map((email) => mailArray.push(email.sender))
    setLeadArchiveEmail(mailArray)
  }

  const listInbox = async () => {
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages?labelIds=INBOX&maxResults=500&access_token=${authToken}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        await response.json().then(async (json) => {
          if (json.messages) await listInboxEmail(json.messages)
          else {
            setIsLoading(true)
          }
        })
      }
    })
  }

  const listDraft = async () => {
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/drafts?maxResults=500&access_token=${authToken}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        await response.json().then(async (json) => {
          if (json.drafts) {
            await listDraftEmail(json.drafts)
          } else {
            setIsLoading(true)
          }
        })
      }
    })
  }

  const listSent = async () => {
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages?labelIds=SENT&maxResults=500&access_token=${authToken}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        await response.json().then(async (json) => {
          if (json.messages) {
            await listSentEmail(json.messages)
          } else {
            setIsLoading(true)
          }
        })
      }
    })
  }

  const listArchive = async () => {
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages?access_token=${authToken}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        await response.json().then(async (json) => {
          if (json.messages) {
            await listArchiveEmail(json.messages)
          } else {
            setIsLoading(true)
          }
        })
      }
    })
  }

  const updateSignInStatus = async (isSignedIn) => {
    if (isSignedIn) {
      if (authToken.length > 0) {
        setIsLoading(true)
        await listInbox()
        await listDraft()
        await listSent()
        await listArchive()
        setIsLoading(false)
      }
    } else {
      router.push('/setup/senders').then()
    }
  }

  useEffect(() => {
    if (gmailConnection && gmailConnection.gmail_connection.length > 0) {
      setAuthToken(gmailConnection.gmail_connection[0].access_token)
      fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${gmailConnection?.gmail_connection[0].email}/profile?access_token=${authToken}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      )
        .then((response) => {
          return response
        })
        .then(async (data) => {
          if (!data.ok) {
            await getNewAuthToken().then()
          }
        })
      updateSignInStatus(true).then()
    }
    if (gmailConnection && gmailConnection.gmail_connection.length === 0) {
      router.push('/setup/senders').then()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gmailConnection])

  useEffect(() => {
    loadConnection()
    if (gmailConnection && gmailConnection.gmail_connection.length > 0) {
      setAuthToken(gmailConnection.gmail_connection[0].access_token)
    }
  }, [loadConnection, gmailConnection])

  const handleClientClick = (id: number) => {
    router
      .push({
        pathname: '/clients/[id]',
        query: { id: id },
      })
      .then()
  }

  const tabItemText = [
    <div key="0">
      <InboxOutlined />
      {t('setup.email.inbox.tab.item.inbox')}{' '}
      <Badge
        count={inboxCount}
        style={{ backgroundColor: '#40A0C1', marginLeft: '60px' }}
      />
    </div>,
    <div key="1">
      <FileOutlined />
      {t('setup.email.inbox.tab.item.draft')}{' '}
    </div>,
    <div key="2">
      <SendOutlined />
      {t('setup.email.inbox.tab.item.sent')}{' '}
    </div>,
    <div key="3">
      <FolderOpenOutlined />
      {t('setup.email.inbox.tab.item.archive')}{' '}
    </div>,
  ]
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: ({ name, status }) => {
        return (
          <div className={styles.mailSender}>
            <Badge color={status ? '#40A0C1' : ''} />
            <span className={status ? styles.unreadEmail : ''}>{name}</span>
          </div>
        )
      },
      visible: true,
      onCell: (record) => ({
        onClick: () => {
          handleRowClick(record).then()
        },
      }),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      render: ({ name, subject }, record) => {
        return (
          <div className={styles.subject}>
            <b className={record.name.status ? styles.unreadEmail : ''}>
              {name.length > 0
                ? name
                : `${t('setup.email.inbox.read.mail.no.subject')}`}
            </b>
            &nbsp;&nbsp;
            <span className={styles.description}>{subject}</span>
          </div>
        )
      },
      visible: true,
      onCell: (record) => ({
        onClick: () => {
          handleRowClick(record).then()
        },
      }),
    },
    {
      title: 'Label',
      dataIndex: 'label',
      visible: true,
      render: (text, record) => {
        return (
          <div>
            {!loading && !archiveLoading && !draftLoading && !sentLoading && (
              <div className={styles.labelContainer}>
                {record.status === 'lead' && (
                  <span>
                    <AimOutlined /> {record.lead}
                  </span>
                )}
                {record.status === 'client' && (
                  <span onClick={() => handleClientClick(record.roleId)}>
                    <UserOutlined /> {record.client}
                  </span>
                )}
                {record.status === 'no' && <span>{''}</span>}
              </div>
            )}
          </div>
        )
      },
    },
    {
      title: 'Button',
      dataIndex: 'button',
      visible: true,
      render: (text, record) => (
        <div className={styles.privateDropDown}>
          <Dropdown
            overlay={privateMenu}
            placement="bottomRight"
            arrow
            className={styles.privateDropDown}
            trigger={['click']}
          >
            <Button type="default" icon={<LockOutlined />}>
              <span>
                {record.status === 'client'
                  ? t('create.filter.modal.private.visibility.label')
                  : t('create.filter.modal.shared.visibility.label')}{' '}
                <DownOutlined />
              </span>
            </Button>
          </Dropdown>
        </div>
      ),
    },
    {
      title: 'Attched',
      dataIndex: 'isAttched',
      visible: true,
      render: (text) => text && <Attched />,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      visible: true,
      render: (text: string) => (
        <div>
          <b>{text}</b>
        </div>
      ),
    },
  ]
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  }
  const moreMenu = (
    <Menu>
      <Menu.Item>
        <span style={{ color: 'grey' }}>
          <SettingOutlined />
          {t('setup.email.inbox.more.menu.settings')}
        </span>
      </Menu.Item>
      <Menu.Item>
        <span style={{ color: 'grey' }}>
          <CloudServerOutlined />
          {t('setup.email.inbox.more.menu.automations')}
        </span>
      </Menu.Item>
    </Menu>
  )

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const privateMenu = (
    <Menu>
      <Radio.Group value={value} onChange={(e) => handleChange(e)}>
        <Radio value={1} onClick={(e) => handleChange(e)}>
          <div>
            <div>
              <div>
                {' '}
                <UnlockOutlined />{' '}
                {t('setup.email.inbox.private.menu.share.title')}
              </div>
              <p className={styles.converstionText}>
                {t('setup.email.inbox.private.menu.share.description')}
              </p>
            </div>
          </div>
        </Radio>

        <Radio>
          <div>
            <div>
              <div>
                {' '}
                <LockOutlined />{' '}
                {t('setup.email.inbox.private.menu.private.title')}
              </div>
              <p className={styles.converstionText}>
                {t('setup.email.inbox.private.menu.private.description')}
              </p>
            </div>
          </div>
        </Radio>
      </Radio.Group>
    </Menu>
  )

  const handleEmailRead = async (msg) => {
    setIsLoading(true)
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg}/modify?access_token=${authToken}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ removeLabelIds: ['UNREAD'] }),
      }
    ).then(async (response) => {
      if (response.ok) {
        await response.json().then(async () => {
          await updateSignInStatus(true)
        })
      }
    })
    setIsLoading(false)
  }

  const handleRowClick = async (email) => {
    setReadEmail(true)
    setEmailId(email.id)
    setThreadsId(email.key)
    await handleEmailRead(email.id)
  }

  const handleBack = () => {
    setReadEmail(false)
  }
  const handleMailDelete = async () => {
    setIsLoading(true)
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/threads/${threadsId}?access_token=${authToken}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    ).then((response) => {
      if (response.ok) {
        response.json().then(async (json) => {
          if (json.messages.length !== 1) {
            await handleThreadDelete(false)
          } else {
            await handleThreadDelete(true)
          }
        })
      }
    })

    setIsLoading(true)
    await updateSignInStatus(userSignIn)
    setIsLoading(false)
  }

  const handleThreadDelete = async (isThread) => {
    if (!isThread) {
      await handleSingleDelete(emailId)
    } else {
      await fetch(
        `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/threads/${threadsId}?access_token=${authToken}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        }
      ).then(async (response) => {
        if (response.ok) {
          await setReadEmail(false)
          Notification(
            NotificationType.success,
            t('setup.email.inbox.notification.delete.mail')
          )
        }
      })
    }
  }

  const handleSingleDelete = async (msg) => {
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg}?access_token=${authToken}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        await setReadEmail(false)
        Notification(
          NotificationType.success,
          t('setup.email.inbox.notification.delete.mail')
        )
      }
    })
    setIsLoading(true)
    await updateSignInStatus(userSignIn)
    setIsLoading(false)
  }

  const handleMarkRead = async () => {
    setIsLoading(true)
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${emailId}/modify?access_token=${authToken}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ addLabelIds: ['UNREAD'] }),
      }
    ).then(async (response) => {
      if (response.ok) {
        await response.json().then(async () => {
          await updateSignInStatus(userSignIn)
          Notification(
            NotificationType.success,
            t('setup.email.inbox.notification.mark.as.read')
          )
          setReadEmail(false)
        })
      }
    })
    setIsLoading(false)
  }

  const handleEmailArchive = async () => {
    setIsLoading(true)
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${emailId}/modify?access_token=${authToken}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ removeLabelIds: ['INBOX'] }),
      }
    ).then(async (response) => {
      if (response.ok) {
        await response.json().then(async () => {
          await updateSignInStatus(userSignIn)
          Notification(
            NotificationType.success,
            t('setup.email.inbox.notification.move.archive')
          )
        })
      }
    })
    setIsLoading(false)
  }

  const renderReadEmail = () => {
    return (
      <ReadEmail
        privateMenu={privateMenu}
        messageId={emailId}
        threadsId={threadsId}
        handleSingleDelete={handleSingleDelete}
        access_token={authToken}
        user={gmailConnection?.gmail_connection[0].email}
      />
    )
  }

  const handleTabChange = async (e) => {
    if (e === '0') {
      setTotalInbox(inboxEmail.length)
    }
    if (e === '1') {
      setTotalInbox(draftEmail.length)
    }
    if (e === '2') {
      setTotalInbox(sentEmail.length)
    }
    if (e === '3') {
      setTotalInbox(archiveEmail.length)
    }
    setShowSearch(false)
    setReadEmail(false)
  }

  const renderList = (columns, dataSource, rowSelection) => {
    return (
      <Table
        columns={columns}
        dataSource={showSearch ? searchResult : dataSource}
        rowSelection={rowSelection}
        loading={isLoading}
        showSizeChanger={dataSource.length > 10}
        noDataText={t('setup.email.inbox.no.mail.text')}
        noDataIcon={<MailOutlined />}
      />
    )
  }

  const filterMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span>{t('setup.email.inbox.filter.menu.unread')}</span>
        </Menu.Item>
        <Menu.Item>
          <span>{t('setup.email.inbox.filter.menu.linked.lead')}</span>
        </Menu.Item>
        <Menu.Item>
          <span>{t('setup.email.inbox.filter.menu.linked.open.lead')}</span>
        </Menu.Item>
        <Menu.Item>
          <span>{t('setup.email.inbox.filter.menu.not.linked.lead')}</span>
        </Menu.Item>
      </Menu>
    )
  }

  const markMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span>{t('setup.email.inbox.mark.menu.read')}</span>
        </Menu.Item>
        <Menu.Item>
          <span>{t('setup.email.inbox.mark.menu.unread')}</span>
        </Menu.Item>
      </Menu>
    )
  }

  const handleSearch = async (e) => {
    if (e.length > 0) {
      await fetch(
        `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages?q=${e}&access_token=${authToken}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      ).then(async (response) => {
        if (response.ok) {
          await response.json().then(async (json) => {
            setShowSearch(true)
            if (json.messages) {
              await handleShowResult(json.messages)
            } else {
              setSearchResult([])
            }
          })
        }
      })
    } else {
      setShowSearch(false)
    }
  }

  const handleShowResult = async (msg) => {
    setIsLoading(true)
    const emailBox = []
    await Promise.all(
      msg.map(async (msg) => {
        return await fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.id}?access_token=${authToken}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        ).then(async (response) => {
          if (response.ok) {
            await response.json().then(async (json) => {
              emailBox.push(json)
            })
          }
        })
      })
    )
    const val = await extractData(emailBox)
    setSearchResult(val)
    setIsLoading(false)
  }

  return (
    <Layout>
      <div className={styles.emailContainer}>
        <Card>
          <div className={styles.headerContainer}>
            <h2 className={styles.headerTitle}>{t('setup.gmail.mail.box')}</h2>
          </div>
          {readEmail ? (
            <div className={styles.menuHeader}>
              <div className={styles.menuHeaderLeft}>
                <PlusCircleOutlined />
                {t('setup.email.inbox.new.mail')}{' '}
              </div>
              <div className={styles.menuHeaderRight}>
                <div className={styles.menuRightFirst}>
                  <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => handleBack()}
                  >
                    {t('setup.email.inbox.button.back')}
                  </Button>
                  <Button
                    type="default"
                    icon={<FolderOpenOutlined />}
                    onClick={() => handleEmailArchive()}
                  >
                    {t('setup.email.inbox.tab.item.archive')}
                  </Button>
                  <Button
                    type="default"
                    icon={<DeleteOutlined />}
                    onClick={() => handleMailDelete()}
                  >
                    {t('setup.email.inbox.button.mail.delete')}
                  </Button>
                  <Button
                    type="default"
                    icon={<CheckOutlined />}
                    onClick={() => handleMarkRead()}
                  >
                    {t('setup.email.inbox.mark.menu.unread')}
                  </Button>
                </div>
                <div className={styles.menuRightLast}>
                  <h5>35 / 435 </h5>
                  <div className={styles.menuArrow}>
                    <Button
                      type="default"
                      shape="circle"
                      icon={<UpOutlined />}
                    />
                    <Button
                      type="default"
                      shape="circle"
                      icon={<DownOutlined />}
                    />
                  </div>
                  <Button
                    type="default"
                    shape="circle"
                    icon={<SettingOutlined />}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.menuHeader}>
              <div className={styles.menuHeaderLeft}>
                <PlusCircleOutlined />
                {t('setup.email.inbox.new.mail')}{' '}
              </div>
              <div className={styles.menuHeaderRight}>
                <div className={styles.menuRightFirst}>
                  <Checkbox />
                  <Button
                    type="default"
                    shape="circle"
                    icon={<RedoOutlined />}
                    onClick={() => updateSignInStatus(userSignIn)}
                  />
                  <Dropdown overlay={filterMenu} placement="bottomLeft" arrow>
                    <Button type="default" icon={<FilterOutlined />}>
                      {t('setup.email.inbox.button.mail.filter')}{' '}
                      <CaretDownOutlined />
                    </Button>
                  </Dropdown>
                  <Dropdown overlay={markMenu} placement="bottomLeft" arrow>
                    <Button type="default" icon={<CheckOutlined />}>
                      {t('setup.email.inbox.button.mail.mark')}
                    </Button>
                  </Dropdown>
                </div>
                <div className={styles.menuRightLast}>
                  {isLoading ? (
                    <h5>
                      <Skeleton.Input
                        style={{ width: 150 }}
                        active={true}
                        size={'default'}
                      />
                    </h5>
                  ) : (
                    <h5>
                      {showSearch
                        ? searchResult.length >= 100
                          ? '100+ '
                          : searchResult.length
                        : totalInbox >= 100
                        ? '100+ '
                        : `${totalInbox} `}
                      {t('setup.email.inbox.text.conversations')}
                    </h5>
                  )}
                  <Search
                    placeholder="Search"
                    style={{
                      borderRadius: '4px',
                      marginRight: '10px',
                    }}
                    onSearch={(e) => handleSearch(e)}
                  />
                  <Dropdown
                    overlay={moreMenu}
                    placement="bottomRight"
                    arrow
                    trigger={['click']}
                  >
                    <Button
                      type="default"
                      shape="circle"
                      icon={<MoreOutlined />}
                    />
                  </Dropdown>
                </div>
              </div>
            </div>
          )}
          <div className={styles.tabWrapper}>
            <TabMenu
              tabPosition={'left'}
              menuItems={tabItemText}
              tabBarStyle={{ backgroundColor: '#FFF' }}
              minHeight="1px"
              onChange={(e) => {
                handleTabChange(e).then()
              }}
            >
              <div className={styles.inboxContainers}>
                {readEmail
                  ? renderReadEmail()
                  : !loading && renderList(columns, inboxEmail, rowSelection)}
              </div>
              <div className={styles.inboxContainers}>
                {readEmail
                  ? renderReadEmail()
                  : renderList(columns, draftEmail, rowSelection)}
              </div>
              <div className={styles.inboxContainers}>
                {readEmail
                  ? renderReadEmail()
                  : renderList(columns, sentEmail, rowSelection)}
              </div>
              <div className={styles.inboxContainers}>
                {readEmail
                  ? renderReadEmail()
                  : renderList(columns, archiveEmail, rowSelection)}
              </div>
            </TabMenu>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default Inbox
