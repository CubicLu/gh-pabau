import React, { FC, useState } from 'react'
import { Typography, Input, Modal, Menu, Dropdown, Checkbox, Row } from 'antd'
import {
  Button,
  Breadcrumb,
  PhoneNumberInput,
  Notification,
  NotificationType,
  BreadcrumbItemInterface,
} from '@pabau/ui'
import { useFormik } from 'formik'
import styles from '../../pages/client-notifications/style.module.less'
import CommonHeader from '../../components/CommonHeader'
import { DownOutlined, LeftOutlined } from '@ant-design/icons'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const { Title } = Typography

interface p {
  selectedTab: 'emailPreview' | 'smsPreview'
  handleNotificationSubmit?(val: string): void
  title: string
  breadcrumbItems: BreadcrumbItemInterface[]
}

const CommonNotificationHeader: FC<p> = ({
  selectedTab,
  breadcrumbItems,
  title,
  handleNotificationSubmit,
}) => {
  const [sendEmail, setSendEmail] = useState(false)
  const [visible, setVisible] = useState(false)
  const router = useRouter()
  const { t } = useTranslationI18()

  const handleVisibleChange = (flag) => {
    setVisible(flag)
  }

  const handleShowNotification = () => {
    setSendEmail(false)
  }

  const sendEmailForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address'),
    }),
    onSubmit: (val) => {
      handleNotificationSubmit?.(val.email)
      setSendEmail(false)
    },
  })

  const menu = (
    <Menu className={styles.menuListUl}>
      <Menu.Item className={styles.menuListItem}>
        <Row>
          <Checkbox value="enable_reminder">
            {t('notifications.commonNotificationHeader.enableReminderViaEmail')}
          </Checkbox>
        </Row>
      </Menu.Item>
      <Menu.Item className={styles.menuListItem}>
        <Row>
          <Checkbox value="enable_reminder">
            {t('notifications.commonNotificationHeader.enableReminderViaSms')}
          </Checkbox>
        </Row>
      </Menu.Item>
    </Menu>
  )

  const handleBackClick = () => {
    router.push('/client-notifications')
  }
  return (
    <>
      <CommonHeader />
      <div>
        <div className={styles.appointmentWrapper}>
          <span className={styles.hideSection}>
            <Breadcrumb breadcrumbItems={breadcrumbItems} />
          </span>
          <Title>
            <span className={`${styles.backArrow} ${styles.hideSection}`}>
              <LeftOutlined
                onClick={handleBackClick}
                className={styles.leftIcon}
              />
            </span>
            {title}
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
          <span className={styles.hideSection}>
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              onVisibleChange={handleVisibleChange}
              visible={visible}
              arrow
            >
              <Button size={'large'}>
                {t('notifications.commonNotificationHeader.enableSettings')}
                <DownOutlined />
              </Button>
            </Dropdown>
          </span>
          <Button
            className={styles.notificationSendButton}
            style={{ margin: '1em 8px', height: '40px', fontSize: '14px' }}
            type="default"
            onClick={() => setSendEmail(!sendEmail)}
          >
            {selectedTab === 'emailPreview'
              ? t('notifications.commonNotificationHeader.sendExampleEmail')
              : t('notifications.commonNotificationHeader.sendTestSms')}
          </Button>
          <Modal
            title={
              selectedTab === 'emailPreview'
                ? t(
                    'notifications.commonNotificationHeader.sendExampleEmailail'
                  )
                : t('notifications.commonNotificationHeader.sendTestMessage')
            }
            visible={sendEmail}
            onCancel={() => setSendEmail(false)}
            centered={true}
            wrapClassName={styles.modal}
            footer={null}
          >
            <form onSubmit={sendEmailForm.handleSubmit}>
              <div>
                {selectedTab === 'emailPreview' ? (
                  <div>
                    <p style={{ color: '#9292A3' }}>
                      {t('notifications.commonNotificationHeader.model.email')}
                    </p>
                    <Input
                      placeholder="client@email.com"
                      onChange={sendEmailForm.handleChange('email')}
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
                    {t('notifications.commonNotificationHeader.Modal.cancel')}
                  </Button>
                  {selectedTab === 'emailPreview' && (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        sendEmailForm.errors.email === undefined &&
                        sendEmailForm.values.email !== ''
                          ? false
                          : true
                      }
                    >
                      {t('notifications.commonNotificationHeader.Modal.send')}
                    </Button>
                  )}
                  {selectedTab === 'smsPreview' && (
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleShowNotification}
                    >
                      {t('notifications.commonNotificationHeader.Modal.send')}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Modal>
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
                t('notifications.commonNotificationHeader.successMessage')
              )
            }
          >
            {t('notifications.commonNotificationHeader.save')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default CommonNotificationHeader
