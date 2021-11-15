import {
  DownOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
  GoogleOutlined,
  MailOutlined,
  MobileOutlined,
  PhoneOutlined,
  PlusSquareFilled,
} from '@ant-design/icons'
import { Breadcrumb, Button, Notification, NotificationType } from '@pabau/ui'
import {
  InsertGmailConnectionDocument,
  FindGmailConnectionDocument,
  GoogleTokenDocument,
  DeleteGmailConnectionDocument,
  useGetComSendersQuery,
} from '@pabau/graphql'
import { Col, Modal, Popover, Row, Tag, Typography, Skeleton } from 'antd'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'
import CommonHeader from '../../components/CommonHeader'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './senders.module.less'
import { ReactComponent as Google } from '../../assets/images/google.svg'
import { ReactComponent as Sender } from '../../assets/images/sender-message.svg'
import { ReactComponent as Office } from '../../assets/images/office365.svg'
import Login from '../../components/Email/login'
import { useUser } from '../../context/UserContext'

import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ReactComponent as Verified } from '../../assets/images/verified.svg'

const { confirm } = Modal
const { Title } = Typography

export interface MergeTagItem {
  type: string
  value: string
}

export interface SenderItem {
  id?: string | number
  type: 'email' | 'sms'
  fromName: string
  fromEmail?: string
  fromCompanyEmail?: string
  replyTo?: string
  isDefaultSender: boolean
  isEnableReplies?: boolean
  isUseCompanyEmail?: boolean
  isAutoUploadReplies?: boolean
  isEnterpriseEmail?: string
  masterCriteria?: string
  subCriteria?: string
  mergeTags?: MergeTagItem[]
  visibility?: number
}

export const masterCriteriaOptions = ['Master category', 'Master category 2']
export const subCriteriaOptions = ['Sub category', 'Sub category 2']
export const mergeTagTypeOptions = ['Tag Type 1', 'Tag Type 2']

export const Communications: React.FC = () => {
  const user = useUser()

  const router = useRouter()
  const { t } = useTranslationI18()
  const [isLoading, setIsLoading] = useState(true)
  const [senderDetails, setSenderDetails] = useState([{} as SenderItem])

  const { loading, data: getSendersData } = useGetComSendersQuery()
  const { me } = useUser()

  useEffect(() => {
    if (getSendersData?.getSenders.length > 0) {
      const temp = []
      getSendersData.getSenders.map((sender) => {
        if (user.me.company === sender.company_id) {
          console.log('sender data:::', sender)
          temp.push({
            id: sender.id,
            fromName: sender.senders_name,
            fromEmail: sender.data,
            isDefaultSender: sender.is_default === 1,
            type: sender.type,
          })
        }
        return 1
      })
      console.log('temp data:::', temp)
      setSenderDetails(temp)
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [getSendersData, loading, isLoading, user.me.company])

  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [userData, setUserData] = useState('')

  const url = new URL(window.location.href)

  const [loadConnection, { data: gmailConnection }] = useLazyQuery(
    FindGmailConnectionDocument,
    {
      variables: {
        companyId: me.company,
        userId: me.user,
      },
    }
  )

  const [refreshToken, { data }] = useLazyQuery(GoogleTokenDocument, {
    variables: {
      token: url.searchParams.get('code'),
    },
  })

  useEffect(() => {
    loadConnection()
    if (url.searchParams.get('code')) {
      refreshToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data?.getRefreshToken) {
      insertGmailConnection(data.getRefreshToken).then(async () => {
        await loadConnection()
        setIsLoggedIn(true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (gmailConnection && gmailConnection.gmail_connection.length > 0) {
      setIsLoggedIn(true)
      setUserData(gmailConnection.gmail_connection[0].email)
    }
  }, [gmailConnection])

  const insertGmailConnection = async (refreshToken) => {
    await insertConnection({
      variables: {
        accessToken: refreshToken.access_token,
        refreshToken: refreshToken.refresh_token,
        email: refreshToken.email,
        companyId: me.company,
        userId: me.user,
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
  }

  const [insertConnection] = useMutation(InsertGmailConnectionDocument, {
    onCompleted() {
      console.log()
    },
    onError(e) {
      console.log(e)
    },
  })

  const [removeConnection] = useMutation(DeleteGmailConnectionDocument, {
    onCompleted() {
      Notification(
        NotificationType.success,
        'Google connection removed successfully'
      )
    },
    onError(e) {
      console.log(e)
    },
  })

  const handleRemoveLink = async () => {
    await showConfirm()
  }

  const handleGoogleLogin = () => {
    console.log()
  }

  const handleShowLogin = async () => {
    if (!isLoggedIn) {
      setShowLogin(true)
    }
  }

  const removeGmailConnection = async () => {
    await removeConnection({
      variables: {
        email: userData,
        companyId: me.company,
        userId: me.user,
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
  }
  const showConfirm = () => {
    confirm({
      title: 'Unlink your Google account',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you wish to unlink your Google account?',
      onOk() {
        console.log('Remove link', userData)
        removeGmailConnection().then(() => {
          setIsLoggedIn(false)
          setUserData('')
        })
      },
      onCancel() {
        console.log('Close popup')
      },
    })
  }

  const content = () => {
    return (
      <div className={styles.mailOptionContent}>
        <div className={styles.mailOptionItem}>
          <Sender /> <p>Create SMS</p>
        </div>
        <div
          className={styles.mailOptionItem}
          style={userData ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
          onClick={() => handleShowLogin()}
        >
          <GoogleOutlined /> <p>Connect Google</p>
        </div>
        <div className={styles.mailOptionItem}>
          <Office /> <p>Connect Office 365</p>
        </div>
        <div
          className={styles.mailOptionItem}
          onClick={() => router.push('senders/create')}
        >
          <MailOutlined /> <p>Connect other email</p>
        </div>
        <div className={styles.mailOptionItem}>
          <PhoneOutlined /> <p>Add phone number</p>
        </div>
      </div>
    )
  }
  return (
    <Layout {...user} active={'setup'}>
      {showLogin && <Login handleGoogleLogin={handleGoogleLogin} />}

      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={t('setup.senders.title')}
      >
        <FilterOutlined className={styles.filterIconStyle} />
        <PlusSquareFilled
          className={styles.plusIconStyle}
          onClick={() => router.push('senders/create')}
        />
      </CommonHeader>
      <div className={styles.cardWrapper}>
        <div className={styles.cardHeader}>
          <div>
            <Breadcrumb
              items={[
                { breadcrumbName: t('sidebar.setup'), path: 'setup' },
                { breadcrumbName: t('setup.senders.title'), path: '' },
              ]}
            />
            <Title>{t('setup.senders.title')}</Title>
          </div>
          <div className={styles.actions}>
            <Button>
              <FilterOutlined />
              {t('setup.senders.filter')}
            </Button>
            <Popover placement="bottomRight" content={content} trigger="click">
              <Button backgroundColor="#54B2D3" className={styles.senderButton}>
                {t('setup.senders.create')}
                <DownOutlined />
              </Button>
            </Popover>
          </div>
        </div>
        <div className={styles.cardContent}>
          <Row gutter={16}>
            {!isLoading ? (
              senderDetails.map((item, index) => (
                <Col span={4} xs={24} sm={12} md={6} key={index}>
                  <Button
                    className={styles.senderItem}
                    onClick={() => router.push(`senders/edit/${item.id}`)}
                  >
                    <div className={styles.itemHeader}>
                      {item.type === 'email' ? (
                        <MailOutlined className={styles.itemIcon} />
                      ) : (
                        <MobileOutlined className={styles.itemIcon} />
                      )}
                      <div className={styles.verifiedWrapper}>
                        {item.isDefaultSender && (
                          <div className={styles.defaultText}>
                            {t('setup.senders.default')}
                          </div>
                        )}
                        {item.isDefaultSender && <Verified />}
                      </div>
                    </div>
                    <div className={styles.itemBody}>
                      <div>{item.fromName}</div>
                      {item.fromEmail && (
                        <div className={styles.email}>{item.fromEmail}</div>
                      )}
                    </div>
                  </Button>
                </Col>
              ))
            ) : (
              <>
                {Array.from({ length: 4 })
                  .fill(null)
                  .map((_, i) => i)
                  .map((i) => (
                    <Col span={4} xs={24} sm={12} md={6} key={i}>
                      <Button className={styles.senderItem}>
                        <div className={styles.itemHeader}>
                          <Skeleton.Input
                            style={{ width: 200 }}
                            active={isLoading}
                            size={'default'}
                          />
                        </div>
                        <div className={styles.itemBody}>
                          <div className={styles.emails}>
                            {' '}
                            <Skeleton.Input
                              style={{ width: 120 }}
                              active={isLoading}
                              size={'default'}
                            />
                          </div>
                          <Skeleton.Input
                            style={{ width: 75 }}
                            active={isLoading}
                            size={'default'}
                          />
                        </div>
                      </Button>
                    </Col>
                  ))}
              </>
            )}
            {isLoggedIn && (
              <Col span={4} xs={12} sm={8} md={6}>
                <Button className={styles.senderItem}>
                  <div className={styles.itemHeader}>
                    <Google />
                    <div className={styles.verifiedWrapper}>
                      <div
                        className={styles.defaultText}
                        onClick={() => handleRemoveLink()}
                      >
                        <Tag color="red">Stop syncing</Tag>
                      </div>
                    </div>
                  </div>
                  <div className={styles.itemBody}>
                    <div>Clinic Bookings</div>
                    <div className={styles.email}>{userData}</div>
                  </div>
                </Button>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default Communications
