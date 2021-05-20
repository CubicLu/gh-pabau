import { RightOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import { Form, Input as AntInput } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import setupMedicalFormNewEPaper from '../../../assets/images/setup-medicalforms-new-epaper.png'
import { ClientAreaShare, defaultShareData } from './ClientAreaSetting'
import styles from './Style.module.less'

interface ClientAreaStepThreeProps {
  settings: ClientAreaShare
}

export const ClientAreaStepThree: FC<ClientAreaStepThreeProps> = ({
  settings,
}) => {
  const [form] = Form.useForm()
  const [setting, setSetting] = useState<ClientAreaShare>(defaultShareData)
  useEffect(() => {
    setSetting(settings)
  }, [settings])
  return (
    <div className={styles.clientAreaBody}>
      <div className={styles.clientAreaShare}>
        <div>
          <div className={styles.clientAreaShareItem}>
            <img
              src={setupMedicalFormNewEPaper}
              width="100%"
              alt=""
              style={{ marginBottom: '14px' }}
            />
            <h3>Client Portal</h3>
            <h4>
              Your client can login to review their activity, manage their
              appointments, securely access information, make payments and
              engage with your business.
            </h4>
            <Form form={form} layout="vertical" style={{ marginTop: '14px' }}>
              <Form.Item label="Client Portal URL">
                <AntInput.Group>
                  <AntInput
                    style={{ width: 'calc(100% - 67px)' }}
                    defaultValue={setting.clientPortalURL}
                    disabled={true}
                  />
                  <Button
                    type="primary"
                    style={{ width: '67px', marginLeft: '-3px' }}
                  >
                    Copy
                  </Button>
                </AntInput.Group>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div>
          <div className={styles.clientAreaShareItem}>
            <h3>
              <UsergroupAddOutlined
                style={{
                  color: 'var(--primary-color)',
                  marginRight: '8px',
                }}
              />{' '}
              Invite clients
            </h3>
            <h4>
              Let your clients know they can use the portal by inviting them
              from one of the following methods:
            </h4>
            <div className={styles.clientAreaInviteClients}>
              <a
                href={setting.addWordpressPlugin}
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.clientAreaInviteClientItem}>
                  <span>Add Wordpress Plugin to your website</span>
                  <RightOutlined />
                </div>
              </a>
              <a href={setting.sendCampaign} target="_blank" rel="noreferrer">
                <div className={styles.clientAreaInviteClientItem}>
                  <span>Send a campaign</span>
                  <RightOutlined />
                </div>
              </a>
              <a
                href={setting.addConfirmationAndReminder}
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.clientAreaInviteClientItem}>
                  <span>Add to Confirmations & Reminders</span>
                  <RightOutlined />
                </div>
              </a>
            </div>
          </div>
          <div className={styles.clientAreaShareItem}>
            <div className={styles.clientPortalOnTheGo}>
              <div>
                <h3>
                  <UsergroupAddOutlined
                    style={{
                      color: 'var(--primary-color)',
                      marginRight: '8px',
                    }}
                  />{' '}
                  Client portal on-the-go
                </h3>
                <h4>
                  Offer clients an easy, app-like experience of your branded
                  portal
                </h4>
              </div>
              <div>
                <a
                  href={setting.learnMore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientAreaStepThree
