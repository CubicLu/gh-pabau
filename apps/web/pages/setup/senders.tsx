import {
  DownOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
  GoogleOutlined,
  LeftOutlined,
  MailOutlined,
  MobileOutlined,
  PhoneOutlined,
  PlusSquareFilled,
} from '@ant-design/icons'
import { Breadcrumb, Button, MobileHeader } from '@pabau/ui'
import {
  InsertGmailConnectionDocument,
  FindGmailConnectionDocument,
} from '@pabau/graphql'
import { Col, Modal, Popover, Row, Tag, Typography } from 'antd'
import { useRouter } from 'next/router'
import { ReactComponent as Verified } from '../../assets/images/verified.svg'
import Layout from '../../components/Layout/Layout'
import { useGridData } from '../../hooks/useGridData'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from './senders.module.less'
import { ReactComponent as Google } from '../../assets/images/google.svg'
// import { ReactComponent as OutLook } from '../../assets/images/outlook.svg'
import { ReactComponent as Sender } from '../../assets/images/sender-message.svg'
import { ReactComponent as Office } from '../../assets/images/office365.svg'
import Login from '../../components/Email/login'
import Revoke from '../../components/Email/revoke'
// import { useQuery } from '@apollo/client'
import { useUser } from '../../context/UserContext'

import React, { useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
const { confirm } = Modal

const { Title } = Typography

export interface MergeTagItem {
  type: string
  value: string
}

export interface SenderItem {
  id?: string
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
  mergeTags: MergeTagItem[]
}

export const senderItems: SenderItem[] = [
  {
    id: '001',
    type: 'email',
    fromName: 'Clinic Bookings',
    fromEmail: 'william@pabau.com',
    isEnableReplies: true,
    isDefaultSender: false,
    mergeTags: [],
  },
  {
    id: '002',
    type: 'sms',
    fromName: 'The Health Clinic',
    isDefaultSender: true,
    isEnableReplies: true,
    mergeTags: [],
  },
  {
    id: '003',
    type: 'sms',
    fromName: 'Surgical Clinic',
    isDefaultSender: false,
    mergeTags: [],
  },
]

export const masterCriteriaOptions = ['Master category', 'Master category 2']
export const subCriteriaOptions = ['Sub category', 'Sub category 2']
export const mergeTagTypeOptions = ['Tag Type 1', 'Tag Type 2']

export const Communications: React.FC = () => {
  const user = useUser()
  const router = useRouter()
  const { t } = useTranslationI18()
  const { getParentSetupData } = useGridData(t)
  const parentMenu = getParentSetupData(router.pathname)
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [checkStatus, setCheckStatus] = useState(true)
  const [revoke, setRevoke] = useState(false)

  const popupGoogle = true
  const { me } = useUser()
  const [insertConnection] = useMutation(InsertGmailConnectionDocument, {
    onCompleted() {
      console.log()
    },
    onError(e) {
      console.log(e)
    },
  })

  const handleBack = () => {
    if (parentMenu.length > 0) {
      router.push({
        pathname: '/setup',
        query: { menu: parentMenu[0]?.keyValue },
      })
    } else {
      router.push('/setup')
    }
  }

  const handleRemoveLink = async () => {
    await showConfirm()
    loadConnection()
    // setIsLoggedIn(true)
  }

  const handleGoogleLogin = async (email, token) => {
    !checkStatus &&
      (await insertConnection({
        variables: {
          apiKey: token,
          email: email,
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
      }))
  }

  // const { data } = useQuery(FindGmailConnectionDocument, {
  //   variables: {
  //     companyId: me.company,
  //     userId: me.user,
  //   },
  // })

  const [loadConnection, { data }] = useLazyQuery(FindGmailConnectionDocument, {
    variables: {
      companyId: me.company,
      userId: me.user,
    },
  })

  const handleShowLogin = async () => {
    // ?.gmail_connection.length
    await loadConnection()

    if (data?.gmail_connection.length > 0) {
      setIsLoggedIn(true)
      return 1
    } else {
      setCheckStatus(false)
      setShowLogin(true)
      setIsLoggedIn(true)
    }
  }

  const content = () => {
    return (
      <div className={styles.mailOptionContent}>
        <div className={styles.mailOptionItem}>
          <Sender /> <p>Create SMS</p>
        </div>
        <div
          className={styles.mailOptionItem}
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

  const showConfirm = () => {
    confirm({
      title: 'Unlink your Google account',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you wish to unlink your Google account?',
      onOk() {
        setRevoke(true)
        setIsLoggedIn(false)
      },
      onCancel() {
        console.log('Close popup')
      },
    })
  }
  // console.log('data value:::', data?.gmail_connection.length, isLoggedIn)
  return (
    <>
      <div className={styles.desktopViewNone}>
        {showLogin && (
          <Login
            handleGoogleLogin={handleGoogleLogin}
            checkStatus={checkStatus}
          />
        )}

        {popupGoogle && (
          <Login
            handleGoogleLogin={handleGoogleLogin}
            checkStatus={checkStatus}
          />
        )}

        {revoke && (
          <Revoke
            email={data?.gmail_connection[0].email}
            companyId={me.company}
            userId={me.user}
          />
        )}
        <MobileHeader className={styles.mobileHeader}>
          <div className={styles.allContentAlignMobile}>
            <div className={styles.mobileHeaderTextStyle}>
              <LeftOutlined onClick={handleBack} />
              <p>{t('setup.senders.title')}</p>
            </div>
            <div className={styles.mobileHeaderOpsStyle}>
              <FilterOutlined className={styles.filterIconStyle} />
              <PlusSquareFilled
                className={styles.plusIconStyle}
                onClick={() => router.push('senders/create')}
              />
            </div>
          </div>
        </MobileHeader>
      </div>

      <Layout {...user} active={'setup'}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardHeader}>
            <div>
              <Breadcrumb
                breadcrumbItems={[
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
              <Popover
                placement="bottomRight"
                content={content}
                trigger="click"
              >
                <Button
                  backgroundColor="#54B2D3"
                  className={styles.senderButton}
                >
                  {t('setup.senders.create')}
                  <DownOutlined />
                </Button>
              </Popover>
            </div>
          </div>
          <div className={styles.cardContent}>
            <Row gutter={16}>
              {senderItems.map((item, index) => (
                <Col span={4} xs={12} sm={8} md={6} key={index}>
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
                        {item.isEnableReplies && <Verified />}
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
              ))}
              {data?.gmail_connection.length > 0 && isLoggedIn && (
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
                      <div className={styles.email}>
                        {data?.gmail_connection[0].email}
                      </div>
                    </div>
                  </Button>
                </Col>
              )}
              {/*<Col span={4} xs={12} sm={8} md={6}>*/}
              {/*  <Button className={styles.senderItem}>*/}
              {/*    <div className={styles.itemHeader}>*/}
              {/*      <OutLook />*/}

              {/*      <div className={styles.verifiedWrapper}>*/}
              {/*        <div className={styles.defaultText}>*/}
              {/*          <Tag color="red">Stop syncing</Tag>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <div className={styles.itemBody}>*/}
              {/*      <div>Clinic Bookings</div>*/}
              {/*      <div className={styles.email}>Account</div>*/}
              {/*    </div>*/}
              {/*  </Button>*/}
              {/*</Col>*/}
            </Row>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Communications
