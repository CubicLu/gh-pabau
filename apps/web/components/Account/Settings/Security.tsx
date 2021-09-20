import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LaptopOutlined,
  MobileOutlined,
} from '@ant-design/icons'
import {
  Button,
  Notification,
  NotificationType,
  Passcode,
  PasswordWithHelper,
} from '@pabau/ui'
import { useUpdateUserPasswordMutation } from '@pabau/graphql'
import { Collapse, Descriptions, Divider, Form, Input, Skeleton } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { browserName, isMobile, osName } from 'react-device-detect'
import { useUser } from '../../../context/UserContext'
import { relativeTime } from '../../../helper/relativeTimeFormat'
import { dateTimeFormatter } from '../../../helper/dateTimeFormat'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './skeleton.module.less'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

export interface SecurityProps {
  profileData?: {
    id?: number
    passcode?: number
    full_name?: string
    email: string
    last_login?: string
    company_details?: {
      timezone?: {
        offset_seconds?: number
      }
    }
  }
  loading?: boolean
  onSecurityChange: (data) => void
}

const Security: FC<SecurityProps> = ({
  loading = false,
  profileData,
  onSecurityChange,
  ...rest
}) => {
  const { Panel } = Collapse
  const { t } = useTranslationI18()
  const [cPassLoading, setCPassLoading] = useState(false)
  const [passcode, setPasscode] = useState(null)
  const [locationInfo, setLocationInfo] = useState(null)
  const user = useUser()
  const [form] = Form.useForm()

  const PasswordErrors = {
    'You can not use your email as password!': t(
      'account.settings.response.notification.password.error.username'
    ),
    'Password too short!': t(
      'account.settings.response.notification.password.error.short'
    ),
    'Password must include at least one number!': t(
      'account.settings.response.notification.password.error.number'
    ),
    'Password must include at least one lowercase letter!': t(
      'account.settings.response.notification.password.error.lower'
    ),
    'Password must include at least one uppercase letter!': t(
      'account.settings.response.notification.password.error.upper'
    ),
    'Password must include at least one special character!': t(
      'account.settings.response.notification.password.error.special'
    ),
    'Old password not matched': t(
      'account.settings.response.notification.password.error.notmatched'
    ),
  }

  const [updateUserPassword] = useUpdateUserPasswordMutation({
    onCompleted() {
      form.resetFields()
      setCPassLoading(false)
      Notification(
        NotificationType.success,
        t('account.settings.response.notification.password')
      )
    },
    onError(error) {
      setCPassLoading(false)
      Notification(
        NotificationType.error,
        PasswordErrors[error.message] || error.message
      )
    },
  })

  useEffect(() => {
    async function getIPLocation() {
      await fetch(`https://extreme-ip-lookup.com/json`)
        .then((res) => res.json())
        .then((response) => {
          setLocationInfo(response)
        })
    }
    setPasscode(profileData?.passcode)
    getIPLocation()
  }, [profileData])

  const changePassword = (passwords) => {
    if (
      passwords?.oldPassword &&
      passwords?.newPassword &&
      passwords?.cNewPassword &&
      passwords?.newPassword === passwords?.cNewPassword
    ) {
      setCPassLoading(true)
      updateUserPassword({
        variables: {
          currentPassword: passwords?.oldPassword,
          newPassword: passwords?.newPassword,
        },
      })
    } else {
      Notification(
        NotificationType.error,
        t('account.settings.response.notification.password.error.confirm')
      )
    }
  }

  const LastLogin = () => {
    const date1 = dayjs().utc()
    const date2 = dayjs(profileData?.last_login).utc()

    let last_login = dayjs(profileData?.last_login).format()
    if (date2.diff(date1, 'second') > 0) {
      last_login = dayjs(profileData?.last_login)
        .subtract(
          profileData?.company_details?.timezone?.offset_seconds,
          'seconds'
        )
        .format()
    }
    return (
      <>
        {relativeTime(
          user?.me?.Company?.details?.language?.toString().slice(0, 2) || 'en',
          new Date(last_login)
        )}
        <span className="lastDate">
          {' '}
          |{' '}
          {dateTimeFormatter({
            date: new Date(String(last_login)),
            lan: user?.me?.Company?.details?.language?.toString().slice(0, 2),
          })}
        </span>
      </>
    )
  }

  return (
    <div className={styles.skeletonWrapper}>
      <Descriptions title={t('account.settings.tab.header2')}>
        <Descriptions.Item>
          {t('account.settings.security.description')}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form
        layout="vertical"
        onFinish={(values) => {
          changePassword(values)
        }}
        form={form}
      >
        <Form.Item>
          <h2>{t('account.settings.security.change-password.header')}</h2>
          <span>
            {t('account.settings.security.change-password.description')}
          </span>
        </Form.Item>
        <Form.Item
          name="oldPassword"
          label={t('account.settings.security.old-password.label')}
          rules={[
            {
              required: true,
              message: t('account.settings.security.password.error1'),
            },
          ]}
        >
          <Input.Password
            placeholder={t(
              'account.settings.security.old-password.placeholder'
            )}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={t('account.settings.security.new-password.label')}
          rules={[
            {
              required: true,
              message: t('account.settings.security.password.error2'),
            },
            {
              min: 8,
              message: t(
                'account.settings.response.notification.password.error.short'
              ),
            },
            {
              pattern: /\d/,
              message: t(
                'account.settings.response.notification.password.error.number'
              ),
            },
            {
              pattern: /[a-z]/,
              message: t(
                'account.settings.response.notification.password.error.lower'
              ),
            },
            {
              pattern: /[A-Z]/,
              message: t(
                'account.settings.response.notification.password.error.upper'
              ),
            },
            {
              pattern: /[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}-]+/,
              message: t(
                'account.settings.response.notification.password.error.special'
              ),
            },
          ]}
        >
          <PasswordWithHelper stength={3} />
        </Form.Item>
        <Form.Item
          name="cNewPassword"
          dependencies={['newPassword']}
          label={t('account.settings.security.confirm-password.label')}
          rules={[
            {
              required: true,
              message: t('account.settings.security.password.error3'),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error(t('account.settings.security.password.error4'))
                )
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={t(
              'account.settings.security.confirm-password.placeholder'
            )}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            disabled={loading}
            loading={!loading && cPassLoading}
          >
            {t('account.settings.security.change-password.button')}
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Form layout="vertical">
        <Form.Item className={loading && 'pRelative'}>
          <h2>{t('account.settings.security.passcode.label')}</h2>
          <span>{t('account.settings.security.passcode.description')}</span>
          <br />
          <br />
          {loading ? (
            <Skeleton.Input active />
          ) : (
            <Passcode
              text={passcode}
              onChange={(val) => {
                setPasscode(val)
                onSecurityChange(val)
              }}
            />
          )}
        </Form.Item>
      </Form>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h2>{t('account.settings.security.logged-in.label')}</h2>
          <span>{t('account.settings.security.logged-in.description')}</span>
          <br />
          <Divider className="smallDivider" />
          {loading ? (
            <div className="wherelogged-in">
              <div className="iCon">
                <Skeleton.Avatar />
              </div>
              <div className="whereDescription">
                <div className="osInfo">
                  <label>
                    <Skeleton active paragraph={{ rows: 0 }} />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="wherelogged-in">
              <div className="iCon">
                {isMobile ? <MobileOutlined /> : <LaptopOutlined />}
              </div>
              <div className="whereDescription">
                <div className="osInfo">
                  {osName}{' '}
                  {isMobile
                    ? `${t('account.settings.security.logged-in.mobile')}`
                    : `${t('account.settings.security.logged-in.pc')}`}{' '}
                  {locationInfo?.city && locationInfo?.country && '|'}{' '}
                  {locationInfo?.city && locationInfo?.city}
                  {locationInfo?.country && `, ${locationInfo?.country}`}{' '}
                  <span className="ip"> | {locationInfo?.query}</span>
                </div>
                <div className="appInfo">
                  {browserName}{' '}
                  {user?.me && (
                    <>
                      |{' '}
                      <span className="active">
                        {t('account.settings.security.logged-in.info2')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <Divider className="smallDivider" />
          {profileData?.last_login && (
            <Collapse accordion key={'1'} style={{ background: '#fff' }}>
              <Panel
                header={
                  <div key={'1'}>
                    <span>
                      {t('account.settings.security.logged-in.collapse.label')}
                    </span>
                  </div>
                }
                key="1"
                showArrow={false}
              >
                <span>
                  {t('account.settings.security.last.loggedin.label')}
                </span>
                <Divider className="smallDivider" />
                {loading ? (
                  <div className="wherelogged-in">
                    <div className="iCon">
                      <Skeleton.Avatar />
                    </div>
                    <div className="whereDescription">
                      <div className="osInfo">
                        <label>
                          <Skeleton active paragraph={{ rows: 0 }} />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="wherelogged-in">
                    <div className="iCon">
                      <MobileOutlined />
                    </div>
                    <div className="whereDescription">
                      <div className="osInfo"></div>
                      <div className="appInfo">
                        <LastLogin />
                      </div>
                    </div>
                  </div>
                )}
                <Divider className="smallDivider" />
              </Panel>
            </Collapse>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default Security
