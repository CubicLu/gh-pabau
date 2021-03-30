import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LaptopOutlined,
  MobileOutlined,
} from '@ant-design/icons'
import { Passcode, PasswordWithHelper, Button } from '@pabau/ui'
import { Descriptions, Divider, Form, Input, Collapse } from 'antd'
import React, { FC, useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Security: FC = () => {
  const { Panel } = Collapse
  const { t } = useTranslationI18()
  const [passcode, setPasscode] = useState<string>('')
  return (
    <>
      <Descriptions title={t('account.settings.tab.header2')}>
        <Descriptions.Item>
          {t('account.settings.security.description')}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h2>{t('account.settings.security.change-password.header')}</h2>
          <span>
            {t('account.settings.security.change-password.description')}
          </span>
        </Form.Item>
        <Form.Item label={t('account.settings.security.old-password.label')}>
          <Input.Password
            placeholder={t(
              'account.settings.security.old-password.placeholder'
            )}
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item label={t('account.settings.security.new-password.label')}>
          <PasswordWithHelper stength={3} />
        </Form.Item>
        <Form.Item
          label={t('account.settings.security.confirm-password.label')}
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
          <Button>
            {t('account.settings.security.change-password.button')}
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h2>{t('account.settings.security.passcode.label')}</h2>
          <span>{t('account.settings.security.passcode.description')}</span>
          <br />
          <br />
          <Passcode text={passcode} onChange={(val) => setPasscode(val)} />
        </Form.Item>
      </Form>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h2>
            {t('account.settings.security.two-factor.label')}
            <span className="two-faceor-status">
              {t('account.settings.security.two-factor.label1')}
            </span>
          </h2>
          <span>{t('account.settings.security.two-factor.description')}</span>
          <br />
          <span>{t('account.settings.security.two-factor.label2')}</span>
          <br />
          <br />
          <Button>{t('account.settings.security.two-factor.button')}</Button>
        </Form.Item>
      </Form>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h2>{t('account.settings.security.security-question.label')}</h2>
          <span>
            {t('account.settings.security.security-question.description')}
          </span>
          <br />
          <br />
          <Button>
            {t('account.settings.security.security-question.button')}
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Form layout="vertical">
        <Form.Item>
          <h2>{t('account.settings.security.logged-in.label')}</h2>
          <span>{t('account.settings.security.logged-in.description')}</span>
          <br />
          <Divider className="smallDivider" />
          <div className="whereLoggedIn">
            <div className="iCon">
              <LaptopOutlined />
            </div>
            <div className="whereDescription">
              <div className="osInfo">
                {t('account.settings.security.logged-in.info')}
              </div>
              <div className="appInfo">
                {t('account.settings.security.logged-in.info1')} |{' '}
                <span className="active">
                  {t('account.settings.security.logged-in.info2')}
                </span>
              </div>
            </div>
          </div>
          <Divider className="smallDivider" />
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
              <Divider className="smallDivider" />
              <div className="whereLoggedIn">
                <div className="iCon">
                  <MobileOutlined />
                </div>
                <div className="whereDescription">
                  <div className="osInfo">
                    {t('account.settings.security.logged-in.mobile.info')}
                  </div>
                  <div className="appInfo">
                    {t('account.settings.security.logged-in.mobile.info1')} |{' '}
                    <span>
                      {t('account.settings.security.logged-in.mobile.info2')}
                    </span>
                  </div>
                </div>
              </div>
              <Divider className="smallDivider" />
            </Panel>
          </Collapse>
        </Form.Item>
      </Form>
    </>
  )
}

export default Security
