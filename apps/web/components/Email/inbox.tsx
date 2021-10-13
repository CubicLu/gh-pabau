import React, { FC, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import styles from './index.module.less'
// import { gapi } from 'gapi-script'
import {
  Button,
  Checkbox,
  Table,
  TabMenu,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Card, Input, Menu, Dropdown, Radio, Badge, Skeleton } from 'antd'
import {
  InboxOutlined,
  FileOutlined,
  SendOutlined,
  FolderOpenOutlined,
  RedoOutlined,
  FilterOutlined,
  CheckOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  LockOutlined,
  UserOutlined,
  SettingOutlined,
  CloudServerOutlined,
  DownOutlined,
  PoundCircleFilled,
  ArrowLeftOutlined,
  DeleteOutlined,
  UpOutlined,
  MailOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { ReactComponent as Attched } from '../../assets/images/attched.svg'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { useUser } from '../../context/UserContext'
import dynamic from 'next/dynamic'
import { FindGmailConnectionDocument } from '@pabau/graphql'
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
const { Search } = Input
export interface P {
  tableName?: string
}

const ReadEmail = dynamic(() => import('./readEmail'), {
  ssr: false,
})
export const Inbox: FC<P> = ({ ...props }) => {
  const { t } = useTranslationI18()
  //const [userSignIn, setUserSignIn] = useState(false)
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

  const userSignIn = true
  // useEffect(
  //   () => {
  //     handleClick()
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [userSignIn]
  // )

  useEffect(
    () => {
      if (inboxEmail.length <= 0) {
        setIsLoading(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  )
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
  useEffect(
    () => {
      loadConnection()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const router = useRouter()

  useEffect(() => {
    if (gmailConnection && gmailConnection.gmail_connection.length > 0) {
      updateSigninStatus(true).then()
    }
    if (gmailConnection && gmailConnection.gmail_connection.length === 0) {
      router.push('/setup/senders').then()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gmailConnection])

  const updateSigninStatus = async (isSignedIn) => {
    if (isSignedIn) {
      // totalConverstions()
      await listInbox()
      await listDraft()
      await listSent()
      await listArchive()
    } else {
      router.push('/setup/senders')
    }
  }

  const extractData = (finalEmails) => {
    const val = finalEmails.map((itm: any, i) => {
      const rowData = { name: '', time: '', subject: '', isAttched: false }
      if (itm.payload.mimeType === 'multipart/mixed') {
        rowData.isAttched = true
      }
      itm.payload.headers.map((x) => {
        if (x.name === 'From') {
          rowData.name = x.value.split('<')
        }
        if (x.name === 'Date') {
          rowData.time = x.value
          // `${dayjs(x.value).format('HH:mm')}`
        }
        if (x.name === 'Subject') {
          rowData.subject = x.value
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

      const item = {
        ...rowData,
        id: itm.id,
        key: itm.threadId,
        name: {
          name: rowData.name[0],
          status: itm.labelIds.includes('UNREAD'),
        },
        isAttched: rowData.isAttched,
        subject: { name: rowData.subject, subject: itm.snippet },
      }
      return item
    })

    return val
  }

  const listInboxEmail = async (msg) => {
    let unreadEmail = 0
    const emailBox = []
    setIsLoading(true)
    await Promise.all(
      msg.map(async (msg) => {
        return fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.id}?access_token=${gmailConnection.gmail_connection[0].access_token}`,
          {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then(async (json) => {
                emailBox.push(json)
                // return json
              })
            }
          })
          .catch((error) => {
            console.log('Google Connection refuse', error)
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
    const val = extractData(emailBox)
    setInboxEmail(val)
    setInboxCount(unreadEmail)
    setIsLoading(false)
  }

  const listDraftEmail = async (draft) => {
    setIsLoading(true)
    const emailBox = []
    await Promise.all(
      draft.map(async (msg) => {
        return fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.message.id}?access_token=${gmailConnection.gmail_connection[0].access_token}`,
          {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then(async (json) => {
                emailBox.push(json)
                // return json
              })
            }
          })
          .catch((error) => {
            console.log('Google Connection refuse', error)
          })
      })
    )
    const val = extractData(emailBox)
    setDraftEmail(val)
    setIsLoading(false)
  }

  const listSentEmail = async (msg) => {
    setIsLoading(true)
    const emailBox = []
    await Promise.all(
      msg.map(async (msg) => {
        return fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.id}?access_token=${gmailConnection.gmail_connection[0].access_token}`,
          {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then(async (json) => {
                emailBox.push(json)
                // return json
              })
            }
          })
          .catch((error) => {
            console.log('Google Connection refuse', error)
          })
      })
    )

    const ddd = emailBox.map((itm: any) => {
      const rowData = { name: '', time: '', subject: '' }
      if (itm.labelIds.includes('SENT')) {
        itm.payload.headers.map((x) => {
          if (x.name === 'From') {
            rowData.name = x.value.split('<')
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
        const item = {
          ...rowData,
          id: itm.id,
          key: itm.threadId,
          name: {
            name: rowData.name[0],
            status: itm.labelIds.includes('UNREAD'),
          },
          subject: { name: rowData.subject, subject: itm.snippet },
        }
        return item
      }
      return 1
    })
    const row = []

    ddd.map((x) => {
      if (x !== 1) {
        row.push(x)
      }
      return 1
    })
    setSentEmail(row)
    setIsLoading(false)
  }

  const listArchiveEmail = async (msg) => {
    setIsLoading(true)
    const emailBox = []
    await Promise.all(
      msg.map(async (msg) => {
        return fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.id}?access_token=${gmailConnection.gmail_connection[0].access_token}`,
          {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then(async (json) => {
                emailBox.push(json)
                // return json
              })
            }
          })
          .catch((error) => {
            console.log('Google Connection refuse', error)
          })
      })
    )
    const ddd = emailBox.map((itm: any) => {
      const rowData = { name: '', time: '', subject: '' }
      if (
        //TODO::Archive MAIL
        (!itm.labelIds.includes('INBOX') &&
          !itm.labelIds.includes('SENT') &&
          !itm.labelIds.includes('DRAFT')) ||
        itm.labelIds.includes('ARCHIVE')
      ) {
        itm.payload.headers.map((x) => {
          if (x.name === 'From') {
            rowData.name = x.value.split('<')
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
        const item = {
          ...rowData,
          id: itm.id,
          key: itm.threadId,
          name: {
            name: rowData.name[0],
            status: itm.labelIds.includes('UNREAD'),
          },
          subject: { name: rowData.subject, subject: itm.snippet },
        }
        return item
      }
      return 1
    })
    const row = []
    ddd.map((x) => {
      if (x !== 1) {
        row.push(x)
      }
      return 1
    })

    setArchiveEmail(row)
    setIsLoading(false)
  }

  const listInbox = () => {
    fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages?labelIds=INBOX&access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            await listInboxEmail(json.messages)
          })
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })
  }

  const listDraft = () => {
    fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/drafts?access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            await listDraftEmail(json.drafts)
          })
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })
  }

  const listSent = () => {
    fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages?labelIds=SENT&access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            await listSentEmail(json.messages)
          })
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })
  }

  const listArchive = () => {
    fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages?access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            await listArchiveEmail(json.messages)
          })
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })
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
          <div>
            <Badge color={status ? '#40A0C1' : ''} />
            <span className={status ? styles.unreadEmail : ''}>{name}</span>
          </div>
        )
      },
      visible: true,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      render: ({ name, subject }, record) => {
        return (
          <div className={styles.subject}>
            <b className={record.name.status ? styles.unreadEmail : ''}>
              {name.length > 0 ? name : '(no subject)'}
            </b>
            &nbsp;&nbsp;
            <span>{subject}</span>
          </div>
        )
      },
      visible: true,
    },
    {
      title: 'Label',
      dataIndex: 'label',
      visible: true,
      render: (text, record, row) => {
        // ::TODO ADD CLIENT AND LEAD
        return (
          <div>
            {row === 0 && (
              <span>
                <PoundCircleFilled /> John Smith
              </span>
            )}
            {row === 1 && (
              <span>
                <UserOutlined /> Raymond lin
              </span>
            )}
          </div>
        )
      },
    },
    {
      title: 'Button',
      dataIndex: 'button',
      visible: true,
      render: (text: string) => (
        <div className={styles.privateDropDown}>
          <Dropdown
            overlay={privatemenu}
            placement="bottomRight"
            arrow
            // trigger={['click']}
            className={styles.privateDropDown}
          >
            <Button type="default" icon={<LockOutlined />}>
              <span>
                Private <DownOutlined />
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
  const moremenu = (
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

  const handelChange = (e) => {
    setValue(e.target.value)
  }
  const privatemenu = (
    <Menu>
      <Radio.Group value={value} onChange={(e) => handelChange(e)}>
        <Radio value={1} onClick={(e) => handelChange(e)}>
          <div>
            <div>
              <div>
                {' '}
                <LockOutlined />{' '}
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

  const handelEmailRead = async (msg) => {
    setIsLoading(true)
    console.log('email id::', msg, gmailConnection)

    // gapi.client.gmail.users.messages
    //   .modify({
    //     userId: 'me',
    //     id: msg,
    //     removeLabelIds: ['UNREAD'],
    //   })
    //   .then(async (res) => {
    //     await updateSigninStatus(userSignIn)
    //   })

    fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg}/modify?access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ removeLabelIds: ['UNREAD'] }),
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            await updateSigninStatus(true)
          })
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })

    setIsLoading(false)
  }

  const handleRowClick = async (e) => {
    setReadEmail(true)
    setEmailId(e.id)
    setThreadsId(e.key)
    await handelEmailRead(e.id)
  }

  const handleBack = () => {
    setReadEmail(false)
  }
  const handleMailDelete = async () => {
    setIsLoading(true)

    await fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/threads/${threadsId}?access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            if (json.messages.length !== 1) {
              // isThread = true
              await handleThreadDelete(false)
            } else {
              await handleThreadDelete(true)
            }
          })
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })

    // const threads = await gapi.client.gmail.users.threads.get({
    //   userId: 'me',
    //   id: threadsId,
    // })
    // if (threads.result.messages.length !== 1) {
    //   isThread = true
    // }

    setIsLoading(true)
    await updateSigninStatus(userSignIn)
    setIsLoading(false)
  }

  const handleThreadDelete = async (isThread) => {
    if (!isThread) {
      await handleSingleDelete(emailId)
    } else {
      fetch(
        `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/threads/${threadsId}?access_token=${gmailConnection.gmail_connection[0].access_token}`,
        {
          // mode: 'no-cors',
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
          },
        }
      )
        .then(async (response) => {
          if (response.ok) {
            await setReadEmail(false)
            Notification(
              NotificationType.success,
              t('setup.email.inbox.notification.delete.mail')
            )
          }
        })
        .catch((error) => {
          console.log('Google Connection refuse', error)
        })
    }
  }

  const handleSingleDelete = async (msg) => {
    fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg}?access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          await setReadEmail(false)
          Notification(
            NotificationType.success,
            t('setup.email.inbox.notification.delete.mail')
          )
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })
    setIsLoading(true)
    await updateSigninStatus(userSignIn)
    setIsLoading(false)
  }

  const handleMarkRead = async () => {
    setIsLoading(true)

    fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${emailId}/modify?access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ addLabelIds: ['UNREAD'] }),
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            await updateSigninStatus(userSignIn)
            Notification(
              NotificationType.success,
              t('setup.email.inbox.notification.mark.as.read')
            )
          })
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })

    setIsLoading(false)
  }

  const handleEmailArchive = async () => {
    setIsLoading(true)

    fetch(
      `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${emailId}/modify?access_token=${gmailConnection.gmail_connection[0].access_token}`,
      {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ removeLabelIds: ['INBOX'] }),
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then(async (json) => {
            await updateSigninStatus(userSignIn)
            Notification(
              NotificationType.success,
              t('setup.email.inbox.notification.move.archive')
            )
          })
        }
      })
      .catch((error) => {
        console.log('Google Connection refuse', error)
      })
    setIsLoading(false)
  }

  const renderReadEmail = () => {
    return (
      <ReadEmail
        privateMenu={privatemenu}
        messageId={emailId}
        threadsId={threadsId}
        handleSingleDelete={handleSingleDelete}
        access_token={gmailConnection.gmail_connection[0].access_token}
        user={gmailConnection.gmail_connection[0].email}
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
        onRowClick={(e) => handleRowClick(e)}
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

  const handleSearch = (e) => {
    if (e.length > 0) {
      fetch(
        `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages?q=${e}&access_token=${gmailConnection.gmail_connection[0].access_token}`,
        {
          // mode: 'no-cors',
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then(async (json) => {
              setShowSearch(true)
              if (json.messages) {
                await handleShowResult(json.messages)
              } else {
                setSearchResult([])
              }
              console.log(json)
            })
          }
        })
        .catch((error) => {
          setShowSearch(false)
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
        return fetch(
          `https://www.googleapis.com/gmail/v1/users/${gmailConnection.gmail_connection[0].email}/messages/${msg.id}?access_token=${gmailConnection.gmail_connection[0].access_token}`,
          {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then(async (json) => {
                emailBox.push(json)
                // return json
              })
            }
          })
          .catch((error) => {
            console.log('Google Connection refuse', error)
          })
      })
    )
    const val = extractData(emailBox)
    setSearchResult(val)
    setIsLoading(false)
  }
  return (
    <div className={styles.emailContainer}>
      <Layout>
        <Card>
          <div className={styles.headerContainer}>
            <h2 className={styles.headerTitle}>Mail box</h2>
          </div>
          {readEmail ? (
            <div className={styles.menuHeader}>
              <div className={styles.menuHeaderLeft}>
                <PlusCircleOutlined />
                New mail{' '}
              </div>
              <div className={styles.menuHeaderRight}>
                <div className={styles.menuRightFirst}>
                  <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => handleBack()}
                  >
                    Back
                  </Button>
                  <Button
                    type="default"
                    icon={<FolderOpenOutlined />}
                    onClick={() => handleEmailArchive()}
                  >
                    Archive
                  </Button>
                  <Button
                    type="default"
                    icon={<DeleteOutlined />}
                    onClick={() => handleMailDelete()}
                  >
                    Delete
                  </Button>
                  <Button
                    type="default"
                    icon={<CheckOutlined />}
                    onClick={() => handleMarkRead()}
                  >
                    Mark as unread
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
                New mail{' '}
              </div>
              <div className={styles.menuHeaderRight}>
                <div className={styles.menuRightFirst}>
                  <Checkbox />
                  <Button
                    type="default"
                    shape="circle"
                    icon={<RedoOutlined />}
                    onClick={() => updateSigninStatus(userSignIn)}
                  />
                  <Dropdown overlay={filterMenu} placement="bottomLeft" arrow>
                    <Button type="default" icon={<FilterOutlined />}>
                      Filter <CaretDownOutlined />
                    </Button>
                  </Dropdown>
                  <Dropdown overlay={markMenu} placement="bottomLeft" arrow>
                    <Button type="default" icon={<CheckOutlined />}>
                      Mark
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
                        : totalInbox}{' '}
                      conversations
                    </h5>
                  )}
                  <Search
                    placeholder="Search"
                    // suffix={
                    //   <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    // }
                    style={{ borderRadius: '4px', marginRight: '10px' }}
                    onSearch={(e) => handleSearch(e)}
                  />
                  <Dropdown
                    overlay={moremenu}
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
                handleTabChange(e)
              }}
            >
              <div className={styles.inboxContainers}>
                {/* {!readEmail && (
                <Table
                  columns={columns}
                  dataSource={inboxEmail}
                  rowSelection={rowSelection}
                  loading={isLoading}
                  showSizeChanger={inboxEmail.length > 10}
                  onRowClick={(e) => handleRowClick(e)}
                />
              )}

              {readEmail && (
                <ReadEmail privateMenu={privatemenu} messageId={emailId} />
              )} */}
                {readEmail
                  ? renderReadEmail()
                  : renderList(columns, inboxEmail, rowSelection)}
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
      </Layout>
    </div>
  )
}

export default Inbox
