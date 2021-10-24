import React, { FC, useCallback, useEffect, useState } from 'react'
import styles from './readEmail.module.less'
import {
  CaretDownOutlined,
  DownOutlined,
  LockOutlined,
  DeleteOutlined,
  PrinterOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Popover, Skeleton } from 'antd'
import { Avatar } from '@pabau/ui'
import { ReactComponent as Reply } from '../../assets/images/reply.svg'
import { ReactComponent as Forward } from '../../assets/images/forward.svg'
import { ReactComponent as ReplyAll } from '../../assets/images/reply-all.svg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { decode } from 'js-base64'
export interface P {
  privateMenu?: React.ReactElement
  messageId: string
  threadsId: string
  access_token: string
  user: string
  handleSingleDelete: (m) => void
}

export const ReadEmail: FC<P> = ({
  privateMenu,
  messageId,
  threadsId,
  handleSingleDelete,
  access_token,
  user,
}) => {
  const [responseEmail, setresponseEmail] = useState({
    subject: '',
    name: '',
    date: '',
    to: '',
    snippet: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [emailList, setEmailList] = useState([])
  const [showAllEmail, setShowAllEmail] = useState(false)
  const [deleteEmailId, setDeleteEmailId] = useState('')
  const [printSnippet, setPrintSnippet] = useState('')

  const extractData = (content) => {
    const rowData = {
      name: '',
      date: '',
      subject: '',
      to: '',
      snippet: '',
      id: '',
    }
    rowData.id = content.id
    content.payload.headers.map((payload) => {
      if (payload.name === 'From') {
        rowData.name = payload.value.split('<')
      }
      if (payload.name === 'From') {
        rowData.name = payload.value.split('<')
      }
      if (payload.name === 'Subject') {
        rowData.subject = payload.value
      }
      if (payload.name === 'To') {
        rowData.to = payload.value
      }
      if (payload.name === 'Date') {
        rowData.date = `${dayjs(payload.value).format('D MMM')} ( ${dayjs(
          payload.value
        ).fromNow(true)} ago ) `
      }
      return 1
    })
    let part = ''

    if (content.payload.mimeType === 'text/html') {
      part = content.payload.body.data ? content.payload.body.data : ''
    } else {
      content.payload.parts.map((parts) => {
        if (parts.mimeType === 'text/html') {
          part = parts.body.data ? parts.body.data : ''
        }
        return 1
      })
    }

    rowData.snippet = decode(part).replace('"\r\n', '')
    const bodyContent = rowData.snippet.split('<body')

    bodyContent.length === 1
      ? (rowData.snippet = `<body ${bodyContent[0]}`)
      : (rowData.snippet = `<body ${bodyContent[1]}`)

    return rowData
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getThreadList = useCallback(
    async (threads, msg) => {
      const threadList = []
      if (threads?.messages?.length === 1) {
        fetch(
          `https://www.googleapis.com/gmail/v1/users/${user}/messages/${msg}?access_token=${access_token}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then(async (json) => {
                const emailData = extractData(json)
                if (
                  JSON.stringify(responseEmail) !==
                  JSON.stringify({ ...responseEmail, ...emailData })
                ) {
                  setresponseEmail({
                    ...responseEmail,
                    ...emailData,
                  })
                  setIsLoading(false)
                }
              })
            }
          })
          .catch((error) => {
            console.log('Google Connection refuse', error)
          })
      } else {
        threads.messages.map((threadsMsg) => {
          const emailData = extractData(threadsMsg)
          threadList.push({
            ...emailData,
          })
          return 1
        })
        setEmailList(threadList)
        setIsLoading(false)
      }
    },
    [access_token, responseEmail, user]
  )

  const listSentEmail = useCallback(
    async (msg) => {
      dayjs.extend(relativeTime)

      let threads = { messages: [] }

      await fetch(
        `https://www.googleapis.com/gmail/v1/users/${user}/threads/${threadsId}?access_token=${access_token}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then(async (json) => {
              threads = json

              await getThreadList(json, msg)
              return threads
            })
          }
        })
        .catch((error) => {
          console.log('Google Connection refuse', error)
        })
    },
    [access_token, getThreadList, threadsId, user]
  )

  useEffect(() => {
    listSentEmail(messageId).then()
  }, [listSentEmail, messageId])

  const handleEmailDelete = () => {
    handleSingleDelete(deleteEmailId)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'left=300')
    printWindow.document.write(
      `<html><head><title>${responseEmail.subject}</title>`
    )
    printWindow.document.write('</head><body >')
    printWindow.document.write(printSnippet)
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.print()
  }
  const content = () => {
    return (
      <div className={styles.mailOptionContent}>
        <div className={styles.mailOptionItem}>
          <Reply /> <p>Reply</p>
        </div>
        <div className={styles.mailOptionItem}>
          <ReplyAll /> <p>Reply to all</p>
        </div>
        <div className={styles.mailOptionItem}>
          <Forward /> <p>Forward</p>
        </div>
        <div className={styles.mailOptionItem} onClick={() => handlePrint()}>
          <PrinterOutlined /> <p>Print</p>
        </div>
        <div
          className={styles.mailOptionItem}
          onClick={() => handleEmailDelete()}
        >
          <DeleteOutlined /> <p>Delete</p>
        </div>
      </div>
    )
  }

  const readEmailRight = (value) => {
    return (
      <div className={styles.readEmailRightSide}>
        <div className={styles.readEmailClientSide}>
          <div className={styles.linkClientContainer}>
            {isLoading && (
              <div className={styles.topBar} style={{ marginRight: '10px' }}>
                <Skeleton avatar={{ shape: 'circle' }} paragraph={false} />
              </div>
            )}
            {!isLoading && (
              <div className={styles.topBar}>
                <div className={styles.avatarBagde}>
                  <Avatar name={value.name[0]} />
                </div>
                <div className={styles.emailDetailsContainer}>
                  <div className={styles.emailDetails}>
                    <p className={styles.senderName}>{value.name[0]}</p>
                    <p className={styles.senderEmail}>
                      {value.name[1].substring(0, value.name[1].length - 1)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.clientButton}>
              <Button type="default">
                <span>Link to Existing</span>
              </Button>
              <Button type="primary">
                <span>Create new client</span>
              </Button>
            </div>
          </div>

          <div className={styles.linkLeadContainer}>
            <div className={styles.linkLeadText}>
              <p className={styles.linkLeadTitle}>Link to a lead</p>
              <p className={styles.linkLeadDescription}>
                Find an exisiting lead or create a new one
              </p>
            </div>
            <div className={styles.clientButton}>
              <Button type="default">
                <span>Link to Existing</span>
              </Button>
              <Button type="primary">
                <span>Create New client</span>
              </Button>
            </div>
          </div>

          <div className={styles.mediaDetailsContainer}>
            <div className={styles.mediaTitle}>
              <p className={styles.mediaTitleText}>MEDIA</p>
            </div>
            <div className={styles.mediaDetails}>
              <div className={styles.mediaAlbum}>
                {/* <img src={Img2} alt="" />
                <img src={Img2} alt="" />
                <img src={Img3} alt="" />
                <img src={Img2} alt="" /> */}
              </div>
              <div className={styles.clientButton}>
                <Button type="default">
                  <span>Add to Client (3)</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const readEmailBody = (value) => {
    return (
      <div className={styles.readEmailLeftSide}>
        <div className={styles.menuHeader}>
          <div className={styles.menuHeaderContainer}>
            {isLoading ? (
              <Skeleton.Input
                size={'default'}
                style={{ width: 300, height: 20 }}
                active={true}
              />
            ) : (
              <div className={styles.headerLeft}>
                <h5>
                  {value.subject.length > 0 ? value.subject : '(no subject)'}{' '}
                </h5>
              </div>
            )}

            <div className={styles.headerRight}>
              {isLoading ? (
                <Skeleton.Input
                  size={'default'}
                  style={{ width: 300, height: 20 }}
                  active={true}
                />
              ) : (
                <>
                  <h5>{value.date}</h5>
                  <Dropdown
                    overlay={privateMenu}
                    placement="bottomRight"
                    arrow
                    trigger={['click']}
                    className={styles.privateDropDown}
                  >
                    <Button type="default" icon={<LockOutlined />}>
                      <span>
                        Private <DownOutlined />
                      </span>
                    </Button>
                  </Dropdown>

                  <Button type="default" shape="circle" icon={<Reply />} />
                  <Popover
                    placement="bottomRight"
                    content={content()}
                    trigger="click"
                  >
                    <Button
                      type="default"
                      shape="circle"
                      icon={<CaretDownOutlined style={{ color: '#9292A3' }} />}
                      onClick={() => {
                        setPrintSnippet(responseEmail.snippet)
                        setDeleteEmailId(messageId)
                      }}
                    />
                  </Popover>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.mainBody} id="mainbody">
          {!isLoading && (
            <div className={styles.mainContainerHeader}>
              <div className={styles.topBar}>
                <div className={styles.avatarBagde}>
                  <Avatar name={value.name[0]} />
                </div>
                <div className={styles.emailDetailsContainer}>
                  <div className={styles.emailDetails}>
                    <p className={styles.senderName}>{value.name[0]}</p>
                    <p className={styles.senderEmail}>
                      {value.name[1].substring(0, value.name[1].length - 1)}
                    </p>
                  </div>
                  <div className={styles.toDetail}>
                    <p>To: {value.to}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isLoading ? (
            <>
              <Skeleton avatar={{ shape: 'circle' }} paragraph={false} />
              <Skeleton />
            </>
          ) : (
            <div className={styles.mailWrapper}>
              <div dangerouslySetInnerHTML={{ __html: value.snippet }} />
            </div>
          )}
          {!isLoading && (
            <div className={styles.mailFooterWrapper}>
              <Button type="default" icon={<Reply />}>
                <span>Reply</span>
              </Button>
              <Button type="default" icon={<Forward />}>
                <span>Forward</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.readEmailContainer}>
      {emailList.length > 0 && (
        <div className={styles.readEmailLeftSide}>
          {!showAllEmail &&
            emailList.map((email, index) => {
              return (
                <div
                  key={email.name as string}
                  style={
                    index === 1 && emailList.length >= 3
                      ? { height: '35px' }
                      : {}
                  }
                >
                  {(index === 0 || index === emailList.length - 1) && (
                    <div className={styles.readEmailLeftSides} key={index}>
                      <div className={styles.readEmailLeftSides}>
                        <div
                          className={styles.menuHeader}
                          style={
                            index === emailList.length - 1
                              ? {
                                  marginTop: '20px',
                                  borderTop: '1px solid #ECEDF0',
                                }
                              : {}
                          }
                        >
                          <div className={styles.menuHeaderContainer}>
                            {isLoading ? (
                              <Skeleton.Input
                                size={'default'}
                                style={{ width: 300, height: 20 }}
                                active={true}
                              />
                            ) : (
                              <div className={styles.headerLeft}>
                                <h5>
                                  {email.subject.length > 0
                                    ? email.subject
                                    : '(no subject)'}{' '}
                                </h5>
                              </div>
                            )}

                            <div className={styles.headerRight}>
                              {isLoading ? (
                                <Skeleton.Input
                                  size={'default'}
                                  style={{ width: 300, height: 20 }}
                                  active={true}
                                />
                              ) : (
                                <>
                                  <h5>{responseEmail.date}</h5>
                                  {index === 0 && (
                                    <Dropdown
                                      overlay={privateMenu}
                                      placement="bottomRight"
                                      arrow
                                      trigger={['click']}
                                      className={styles.privateDropDown}
                                    >
                                      <Button
                                        type="default"
                                        icon={<LockOutlined />}
                                      >
                                        <span>
                                          Private <DownOutlined />
                                        </span>
                                      </Button>
                                    </Dropdown>
                                  )}
                                  <Button
                                    type="default"
                                    shape="circle"
                                    icon={<Reply />}
                                  />
                                  <Popover
                                    placement="bottomRight"
                                    content={content()}
                                    trigger="click"
                                  >
                                    <Button
                                      type="default"
                                      shape="circle"
                                      icon={
                                        <CaretDownOutlined
                                          style={{ color: '#9292A3' }}
                                        />
                                      }
                                      onClick={() => {
                                        setPrintSnippet(email.snippet)
                                        setDeleteEmailId(email.id)
                                      }}
                                    />
                                  </Popover>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={styles.mainBody}>
                          {!isLoading && (
                            <div className={styles.mainContainerHeader}>
                              <div className={styles.topBar}>
                                <div className={styles.avatarBagde}>
                                  <Avatar name={email.name[0]} />
                                </div>
                                <div className={styles.emailDetailsContainer}>
                                  <div className={styles.emailDetails}>
                                    <p className={styles.senderName}>
                                      {email.name[0]}
                                    </p>
                                    <p className={styles.senderEmail}>
                                      {email.name[1].substring(
                                        0,
                                        email.name[1].length - 1
                                      )}
                                    </p>
                                  </div>
                                  <div className={styles.toDetail}>
                                    <p>To: {email.to}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {isLoading ? (
                            <>
                              <Skeleton
                                avatar={{ shape: 'circle' }}
                                paragraph={false}
                              />
                              <Skeleton />
                            </>
                          ) : (
                            <div className={styles.mailWrapper}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: email.snippet,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 1 && emailList.length >= 3 && !showAllEmail && (
                    <div
                      className={styles.listEmailPoint}
                      onClick={() => setShowAllEmail(true)}
                    >
                      {index === 1 && (
                        <div className={styles.listEmailBreak}></div>
                      )}
                      <span>{emailList.length - 2}</span>
                    </div>
                  )}
                </div>
              )
            })}
          {showAllEmail &&
            emailList.map((email, index) => {
              return (
                <div key={index}>
                  <div className={styles.readEmailLeftSides}>
                    <div className={styles.readEmailLeftSides}>
                      <div className={styles.menuHeader}>
                        <div className={styles.menuHeaderContainer}>
                          {isLoading ? (
                            <Skeleton.Input
                              size={'default'}
                              style={{ width: 300, height: 20 }}
                              active={true}
                            />
                          ) : (
                            <div className={styles.headerLeft}>
                              <h5>
                                {email.subject.length > 0
                                  ? email.subject
                                  : '(no subject)'}{' '}
                              </h5>
                            </div>
                          )}

                          <div className={styles.headerRight}>
                            {isLoading ? (
                              <Skeleton.Input
                                size={'default'}
                                style={{ width: 300, height: 20 }}
                                active={true}
                              />
                            ) : (
                              <>
                                <h5>{responseEmail.date}</h5>
                                {index === 0 && (
                                  <Dropdown
                                    overlay={privateMenu}
                                    placement="bottomRight"
                                    arrow
                                    trigger={['click']}
                                    className={styles.privateDropDown}
                                  >
                                    <Button
                                      type="default"
                                      icon={<LockOutlined />}
                                    >
                                      <span>
                                        Private <DownOutlined />
                                      </span>
                                    </Button>
                                  </Dropdown>
                                )}
                                <Button
                                  type="default"
                                  shape="circle"
                                  icon={<Reply />}
                                />
                                <Popover
                                  placement="bottomRight"
                                  content={content}
                                  trigger="click"
                                >
                                  <Button
                                    type="default"
                                    shape="circle"
                                    icon={
                                      <CaretDownOutlined
                                        style={{ color: '#9292A3' }}
                                      />
                                    }
                                    onClick={() => setDeleteEmailId(email.id)}
                                  />
                                </Popover>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={styles.mainBody}>
                        {!isLoading && (
                          <div className={styles.mainContainerHeader}>
                            <div className={styles.topBar}>
                              <div className={styles.avatarBagde}>
                                <Avatar name={email.name[0]} />
                              </div>
                              <div className={styles.emailDetailsContainer}>
                                <div className={styles.emailDetails}>
                                  <p className={styles.senderName}>
                                    {email.name[0]}
                                  </p>
                                  <p className={styles.senderEmail}>
                                    {email.name[1].substring(
                                      0,
                                      email.name[1].length - 1
                                    )}
                                  </p>
                                </div>
                                <div className={styles.toDetail}>
                                  <p>To: {email.to}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {isLoading ? (
                          <>
                            <Skeleton
                              avatar={{ shape: 'circle' }}
                              paragraph={false}
                            />
                            <Skeleton />
                          </>
                        ) : (
                          <div className={styles.mailWrapper}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: email.snippet,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          {!isLoading && (
            <div className={styles.mailFooterWrapper}>
              <Button type="default" icon={<Reply />}>
                <span>Reply</span>
              </Button>
              <Button type="default" icon={<Forward />}>
                <span>Forward</span>
              </Button>
            </div>
          )}
        </div>
      )}

      {emailList.length === 0 && readEmailBody(responseEmail)}

      {emailList.length === 0
        ? readEmailRight(responseEmail)
        : readEmailRight(emailList[0])}
    </div>
  )
}

export default ReadEmail
