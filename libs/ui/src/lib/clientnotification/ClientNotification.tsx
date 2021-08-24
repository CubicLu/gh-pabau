import React, { FC, useState } from 'react'
import { Row, Col, Radio, Input, Modal, Dropdown, Menu, Checkbox } from 'antd'
import styles from './ClientNotification.module.less'
import {
  Button,
  Notification,
  NotificationType,
  PhoneNumberInput,
} from '@pabau/ui'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface P {
  tabComponent?: React.ReactNode
  previewComponent?: React.ReactNode
  smsComponent?: React.ReactNode
  onSmsTabChanged?: (index) => void
  displayButtons?: boolean
  displayRadioGroup?: boolean
  handleNotificationSubmit?(val: string): void
}

export const ClientNotification: FC<P> = ({
  tabComponent,
  previewComponent,
  smsComponent,
  onSmsTabChanged,
  displayButtons = true,
  displayRadioGroup = true,
  handleNotificationSubmit,
}) => {
  const [previewStatus, setPreviewStatus] = useState('emailPreview')
  const [sendEmail, setSendEmail] = useState(false)
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation('common')

  const handleVisibleChange = (flag) => {
    setVisible(flag)
  }

  const handleShowNotification = () => {
    setSendEmail(false)
  }

  function handleSmsTabChanged(value) {
    setPreviewStatus(value)
    if (onSmsTabChanged) {
      onSmsTabChanged(value)
    }
  }

  const sendEmailForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(
        t('notifications.commonNotificationHeader.error')
      ),
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

  return (
    <Row className={styles.notificationPage}>
      {tabComponent && (
        <Col className={styles.builderColumn}>
          <Row className={styles.headerStyle}>
            <div>{t('notifications.clientNotification.builder')}</div>
          </Row>
          <Row className={styles.tabsAlign}>{tabComponent}</Row>
        </Col>
      )}
      <Col className={styles.buttonGroup}>
        {displayButtons && (
          <Row className={styles.justifyCenter}>
            <Col span={8} className={styles.buttonWrapper}>
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                onVisibleChange={handleVisibleChange}
                visible={visible}
                arrow
              >
                <Button style={{ width: '100%' }}>
                  {t('notifications.commonNotificationHeader.enableSettings')}{' '}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
            <Col span={8} className={styles.buttonWrapper}>
              <Button
                onClick={() => setSendEmail(!sendEmail)}
                type="default"
                style={{ width: '100%' }}
              >
                {previewStatus === 'emailPreview'
                  ? t('notifications.commonNotificationHeader.sendExampleEmail')
                  : t('notifications.commonNotificationHeader.sendTestSms')}
              </Button>
            </Col>
            <Col span={8} className={styles.buttonWrapper}>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={() =>
                  Notification(
                    NotificationType.success,
                    t('notifications.commonNotificationHeader.successMessage')
                  )
                }
              >
                {t('notifications.commonNotificationHeader.save')}
              </Button>
            </Col>
          </Row>
        )}

        <Modal
          title={
            previewStatus === 'emailPreview'
              ? t('notifications.commonNotificationHeader.sendExampleEmailail')
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
              {previewStatus === 'emailPreview' ? (
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
                {previewStatus === 'emailPreview' && (
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
                {previewStatus === 'smsPreview' && (
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
      </Col>
      <Col className={styles.previewColumn}>
        <Row className={styles.headerStyle}>
          <div>{t('notifications.clientNotification.preview')}</div>
        </Row>
        {displayRadioGroup && (
          <Row justify="center" className={styles.previewButtonGroup}>
            <Radio.Group defaultValue="emailPreview" buttonStyle="solid">
              <Radio.Button
                className={styles.radioLeftButton}
                value="emailPreview"
                onClick={() => handleSmsTabChanged('emailPreview')}
              >
                {t('notifications.commonNotificationHeader.model.email')}
              </Radio.Button>
              <Radio.Button
                className={styles.radioRightButton}
                value="smsPreview"
                onClick={() => handleSmsTabChanged('smsPreview')}
              >
                {t('notifications.clientNotification.smsText')}
              </Radio.Button>
            </Radio.Group>
          </Row>
        )}
        {previewStatus === 'emailPreview' && (
          <Row justify="center">
            <div className={styles.previewCard}>{previewComponent}</div>
          </Row>
        )}
        {previewStatus === 'smsPreview' && (
          <Row justify="center">
            <div className={styles.previewSms}>{smsComponent}</div>
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default ClientNotification
