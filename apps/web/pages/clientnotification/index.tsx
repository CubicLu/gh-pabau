import { Breadcrumb, Button, Notification, PhoneNumberInput } from '@pabau/ui'
import { Input, Modal, Typography } from 'antd'
import React, { FC, useState } from 'react'
import { useUser } from '../../context/UserContext'
import useWindowSize from '../../hooks/useWindowSize'
import CommonHeader from '../../components/CommonHeader'
import ClientNotification from '../../components/ClientNotification/Index'
import Layout from '../../components/Layout/Layout'
import styles from './index.module.less'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const { Title } = Typography

enum NotificationType {
  info = 'info',
  success = 'success',
  error = 'error',
  warning = 'warning',
  loading = 'loading',
  connect = 'connect',
}

const Index: FC = () => {
  const [setIndexTab, setSelectedTab] = useState(1)
  const [sendEmail, setSendEmail] = useState(false)
  const [valideEmail, setValidEmail] = useState(false)

  const { t } = useTranslationI18()
  const size = useWindowSize()
  const user = useUser()

  function handleSendEmailBtn(value) {
    setSendEmail(value)
  }

  function showNotification() {
    if (valideEmail && setIndexTab === 1) {
      Notification(NotificationType.success, 'Test message sent')
      setSendEmail(false)
    }
    if (setIndexTab === 2) {
      Notification(NotificationType.success, 'Test SMS sent')
      setSendEmail(false)
    }
  }

  function isEmail(search: string) {
    const regexp = new RegExp(
      /* eslint-disable-next-line */
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    const serchfind = regexp.test(search)
    setValidEmail(serchfind)
  }

  return (
    <Layout {...user}>
      <CommonHeader
        isLeftOutlined
        title={t('notifications.upcomingAppointmentReminder.title')}
        reversePath="/client-notifications"
      />
      {size.width > 767 && (
        <>
          <div style={{ backgroundColor: '#FFF' }}>
            <Breadcrumb
              items={[
                {
                  breadcrumbName: t('notifications.breadcrumb.setup'),
                  path: 'setup',
                },
                {
                  breadcrumbName: t(
                    'notifications.breadcrumb.notificationMessage'
                  ),
                  path: 'client-notifications',
                },
                {
                  breadcrumbName: t(
                    'notifications.upcomingAppointmentReminder.title'
                  ),
                  path: '',
                },
              ]}
            />
            <Title>
              {t('notifications.upcomingAppointmentReminder.title')}
            </Title>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: '1em 8px',
              height: '40px',
              minWidth: '124px',
              fontSize: '14px',
            }}
          >
            <Button
              className={styles.notificationSendButton}
              style={{ margin: '1em 8px', height: '40px', fontSize: '14px' }}
              type="default"
              onClick={() => handleSendEmailBtn(!sendEmail)}
            >
              {setIndexTab === 1
                ? t('notifications.commonNotificationHeader.sendExampleEmail')
                : t('notifications.commonNotificationHeader.sendTestSms')}
            </Button>

            <Button
              className={styles.notificationSaveButton}
              style={{
                margin: '1em 8px',
                height: '40px',
                fontSize: '14px',
              }}
              type="primary"
              onClick={() =>
                Notification(
                  NotificationType.success,
                  'Success! Notification Source Updated'
                )
              }
            >
              {t('common-label-save')}
            </Button>
          </div>
        </>
      )}
      <ClientNotification onSelectedTab={(value) => setSelectedTab(value)} />
      <Modal
        title={
          setIndexTab === 1
            ? t('notifications.commonNotificationHeader.sendExampleEmail')
            : 'Send Test Message'
        }
        visible={sendEmail}
        onCancel={() => setSendEmail(false)}
        centered={true}
        wrapClassName={styles.modal}
        footer={null}
      >
        <div>
          {setIndexTab === 1 ? (
            <div>
              <p style={{ color: '#9292A3' }}>Email</p>
              <Input
                placeholder="client@email.com"
                onChange={(event) => isEmail(event.target.value)}
              />
            </div>
          ) : (
            <div>
              <PhoneNumberInput
                countryCode={'GB'}
                onChange={(val) => {
                  console.log(val)
                }}
              />
            </div>
          )}

          <div className={styles.footerBtnGroup}>
            <Button
              type="default"
              style={{ marginRight: '10px' }}
              onClick={() => setSendEmail(false)}
            >
              {t('common-label-cancel')}
            </Button>
            {setIndexTab === 1 && (
              <Button
                type="primary"
                disabled={valideEmail ? false : true}
                onClick={() => showNotification()}
              >
                {t('common-label-send')}
              </Button>
            )}
            {setIndexTab === 2 && (
              <Button type="primary" onClick={() => showNotification()}>
                {t('common-label-send')}
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </Layout>
  )
}

export default Index
