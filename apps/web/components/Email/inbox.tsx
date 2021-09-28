import React, { FC, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import styles from './index.module.less'
import { gapi } from 'gapi-script'
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
import dynamic from 'next/dynamic'
const { Search } = Input
export interface P {
  tableName?: string
}

const ReadEmail = dynamic(() => import('./readEmail'), {
  ssr: false,
})
export const Inbox: FC<P> = ({ ...props }) => {
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
  useEffect(
    () => {
      handleClick()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userSignIn]
  )

  useEffect(
    () => {
      if (inboxEmail.length <= 0) {
        setIsLoading(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  )

  const handleClick = () => {
    gapi.load('client:auth2', initClient)
  }
  const initClient = () => {
    const scopes =
      'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.labels'
    gapi.client
      .init({
        apiKey: 'AIzaSyDD3dtSDaMm6-UiUKDENugyceobzsd41wI',
        clientId:
          '1006619281478-0ggfmclia2856fnes3640qn7rhq1f2u9.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
        ],
        scope: scopes,
      })
      .then(
        function () {
          const authToken = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().access_token
          gapi.client.setToken({ access_token: authToken })

          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        },
        function (error) {
          console.log(error)
        }
      )
  }
  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn()
  }

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // totalConverstions()
      listInbox()
      listDraft()
      listSent()
      listArchive()
    } else {
      handleAuthClick()
    }
  }

  const extractData = (finalEmails) => {
    const val = finalEmails.map((itm: any, i) => {
      const rowData = { name: '', time: '', subject: '', isAttched: false }
      if (itm.result.payload.mimeType === 'multipart/mixed') {
        rowData.isAttched = true
      }
      itm.result.payload.headers.map((x) => {
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
        id: itm.result.id,
        key: itm.result.threadId,
        name: {
          name: rowData.name[0],
          status: itm.result.labelIds.includes('UNREAD'),
        },
        isAttched: rowData.isAttched,
        subject: { name: rowData.subject, subject: itm.result.snippet },
      }
      return item
    })

    return val
  }

  const listInboxEmail = async (msg) => {
    let unreadEmail = 0
    setIsLoading(true)
    const finalEmails = await Promise.all(
      msg.map(async (msg) => {
        return await gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
        })
      })
    )

    setTotalInbox(finalEmails.length)
    finalEmails.map((itm: any, i) => {
      if (itm.result.labelIds.includes('UNREAD')) {
        unreadEmail += 1
      }
      return 1
    })
    const val = extractData(finalEmails)
    setInboxEmail(val)
    setInboxCount(unreadEmail)
    setIsLoading(false)
  }

  const listDraftEmail = async (msg) => {
    setIsLoading(true)
    const finalEmails = await Promise.all(
      msg.map(async (msg) => {
        return await gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
        })
      })
    )
    const val = extractData(finalEmails)
    setDraftEmail(val)
    setIsLoading(false)
  }

  const listSentEmail = async (msg) => {
    setIsLoading(true)
    const finalEmails = await Promise.all(
      msg.map(async (msg) => {
        return await gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
        })
      })
    )
    const val = extractData(finalEmails)
    setSentEmail(val)
    setIsLoading(false)
  }

  const listArchiveEmail = async (msg) => {
    setIsLoading(true)
    const finalEmails = await Promise.all(
      msg.map(async (msg) => {
        return await gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
        })
      })
    )
    const ddd = finalEmails.map((itm: any) => {
      const rowData = { name: '', time: '', subject: '' }
      if (
        //TODO::Archive MAIL
        (!itm.result.labelIds.includes('INBOX') &&
          !itm.result.labelIds.includes('SENT') &&
          !itm.result.labelIds.includes('DRAFT')) ||
        itm.result.labelIds.includes('ARCHIVE')
      ) {
        itm.result.payload.headers.map((x) => {
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
          id: itm.result.id,
          key: itm.result.threadId,
          name: {
            name: rowData.name[0],
            status: itm.result.labelIds.includes('UNREAD'),
          },
          subject: { name: rowData.subject, subject: itm.result.snippet },
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
    gapi.client.gmail.users.messages
      .list({
        userId: 'me',
        labelIds: 'INBOX',
      })
      .then(async (res) => {
        await listInboxEmail(res.result.messages)
      })
      .catch((error) => console.log('ERRRR::::', error))
  }

  const listDraft = () => {
    gapi.client.gmail.users.messages
      .list({
        userId: 'me',
        labelIds: 'DRAFT',
      })
      .then(async (res) => {
        await listDraftEmail(res.result.messages)
      })
  }

  const listSent = () => {
    gapi.client.gmail.users.messages
      .list({
        userId: 'me',
        labelIds: 'SENT',
      })
      .then(async (res) => {
        await listSentEmail(res.result.messages)
      })
  }

  const listArchive = () => {
    gapi.client.gmail.users.messages
      .list({
        userId: 'me',
      })
      .then(async (res) => {
        await listArchiveEmail(res.result.messages)
      })
  }

  const tabItemText = [
    <div key="0">
      <InboxOutlined />
      Inbox{' '}
      <Badge
        count={inboxCount}
        style={{ backgroundColor: '#40A0C1', marginLeft: '60px' }}
      />
    </div>,
    <div key="1">
      <FileOutlined />
      Draft{' '}
    </div>,
    <div key="2">
      <SendOutlined />
      Sent{' '}
    </div>,
    <div key="3">
      <FolderOpenOutlined />
      Archive{' '}
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
          Go to mail settings
        </span>
      </Menu.Item>
      <Menu.Item>
        <span style={{ color: 'grey' }}>
          <CloudServerOutlined />
          Automations(2)
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
                <LockOutlined /> Share this within your company
              </div>
              <p className={styles.converstionText}>
                This email conversation will be visiable to others only when
                it`s linked to clients ans leads in Pabau
              </p>
            </div>
          </div>
        </Radio>

        <Radio>
          <div>
            <div>
              <div>
                {' '}
                <LockOutlined /> Keep conversation private
              </div>
              <p className={styles.converstionText}>
                You will not be able to share any records with this 3rd party.
              </p>
            </div>
          </div>
        </Radio>
      </Radio.Group>
    </Menu>
  )

  const handelEmailRead = async (msg) => {
    setIsLoading(true)
    gapi.client.gmail.users.messages
      .modify({
        userId: 'me',
        id: msg,
        removeLabelIds: ['UNREAD'],
      })
      .then(async (res) => {
        await updateSigninStatus(userSignIn)
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
    let isThread = false
    setIsLoading(true)
    const threads = await gapi.client.gmail.users.threads.get({
      userId: 'me',
      id: threadsId,
    })
    if (threads.result.messages.length !== 1) {
      isThread = true
    }

    if (!isThread) {
      gapi.client.gmail.users.messages
        .delete({
          userId: 'me',
          id: emailId,
        })
        .then(async (res) => {
          // await updateSigninStatus(userSignIn)
          // setIsLoading(true)
          await setReadEmail(false)
          Notification(
            NotificationType.success,
            'Email has been move into delete'
          )
        })
    } else {
      gapi.client.gmail.users.threads
        .delete({
          userId: 'me',
          id: threadsId,
        })
        .then(async (res) => {
          // await updateSigninStatus(userSignIn)
          // setIsLoading(true)
          await setReadEmail(false)
          Notification(NotificationType.success, 'Email has been delete')
        })
    }
    setIsLoading(true)
    await updateSigninStatus(userSignIn)
    setIsLoading(false)
  }

  const hadleSingleDelete = async (msg) => {
    gapi.client.gmail.users.messages
      .delete({
        userId: 'me',
        id: msg,
      })
      .then(async (res) => {
        // await updateSigninStatus(userSignIn)
        // setIsLoading(true)
        await setReadEmail(false)
        Notification(NotificationType.success, 'Email has been delete')
      })
    setIsLoading(true)
    await updateSigninStatus(userSignIn)
    setIsLoading(false)
  }

  const handleMarkRead = async () => {
    setIsLoading(true)
    gapi.client.gmail.users.messages
      .modify({
        userId: 'me',
        id: emailId,
        addLabelIds: ['UNREAD'],
      })
      .then(async (res) => {
        await updateSigninStatus(userSignIn)
        Notification(
          NotificationType.success,
          'Email has been updated as mark as read'
        )
      })
    setIsLoading(false)
  }

  const handleEmailArchive = async () => {
    setIsLoading(true)
    gapi.client.gmail.users.messages
      .modify({
        userId: 'me',
        id: emailId,
        removeLabelIds: ['INBOX'],
      })
      .then(async (res) => {
        await updateSigninStatus(userSignIn)
        Notification(
          NotificationType.success,
          'Email has been move into archive'
        )
      })
    setIsLoading(false)
  }

  const renderReadEmail = () => {
    return (
      <ReadEmail
        privateMenu={privatemenu}
        messageId={emailId}
        threadsId={threadsId}
        hadleSingleDelete={hadleSingleDelete}
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
        noDataText={'No mail found '}
        noDataIcon={<MailOutlined />}
      />
    )
  }

  const filterMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span>Unread</span>
        </Menu.Item>
        <Menu.Item>
          <span>Linked with lead</span>
        </Menu.Item>
        <Menu.Item>
          <span>Linked with an open lead</span>
        </Menu.Item>
        <Menu.Item>
          <span>Not Linked with a lead</span>
        </Menu.Item>
      </Menu>
    )
  }

  const markMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span>Mark as read</span>
        </Menu.Item>
        <Menu.Item>
          <span>Mark as unread</span>
        </Menu.Item>
      </Menu>
    )
  }

  const handleSearch = (e) => {
    if (e.length > 0) {
      gapi.client.gmail.users.messages
        .list({
          userId: 'me',
          q: e,
        })
        .then(async (res) => {
          setShowSearch(true)
          if (res.result.messages) {
            await handleShowResult(res.result.messages)
          } else {
            setSearchResult([])
          }
        })
        .catch((error) => setShowSearch(false))
    } else {
      setShowSearch(false)
    }
  }

  const handleShowResult = async (msg) => {
    setIsLoading(true)

    const finalEmails = await Promise.all(
      msg.map(async (msg) => {
        return await gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
        })
      })
    )
    const val = extractData(finalEmails)
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
