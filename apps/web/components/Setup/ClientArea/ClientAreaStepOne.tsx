import React, { FC, useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import { Radio, Form, Input as AntInput } from 'antd'
import {
  Button,
  ColorPicker,
  Background,
  RegistrationFields,
  TabMenu,
  SimpleDropdown,
} from '@pabau/ui'
import {
  DesktopOutlined,
  MobileOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons'
import {
  defaultBuilderSetting,
  ClientAreaBuilderSetting,
} from './ClientAreaSetting'
import clinicLogo from '../../../assets/images/normal-clinic-logo.png'
import { ReactComponent as Palette } from '../../../assets/images/palette.svg'
import { ReactComponent as Profile } from '../../../assets/images/profile.svg'
import styles from './style.module.less'

interface ClientAreaStepOneProps {
  settings: ClientAreaBuilderSetting
}

export const ClientAreaStepOne: FC<ClientAreaStepOneProps> = ({ settings }) => {
  const isMdScreen = useMedia('(min-width: 992px)', false)
  const [isDashboardPreview, setIsDashboardPreview] = useState(false)
  const [isMobilePreview, setIsMobilePreview] = useState(false)
  const [setting, setSetting] = useState<ClientAreaBuilderSetting>(
    defaultBuilderSetting
  )

  const handleColorSetting = (key, val) => {
    const builder = { ...setting }
    builder.appearance[key] = val
    setSetting({ ...builder })
  }

  const onCustomFieldCheckboxChange = (event, key, checkboxField) => {
    const records = [...setting.customFields]
    for (const record of records) {
      if (record.key === key) {
        record[checkboxField] = event.target.checked
      }
    }
    const builder = { ...setting }
    builder.customFields = [...records]
    setSetting({ ...builder })
  }

  const onMainFieldCheckboxChange = (event, key, checkboxField) => {
    const records = [...setting.registrationFields]
    for (const record of records) {
      if (record.key === key) {
        record[checkboxField] = event.target.checked
      }
    }
    const builder = { ...setting }
    builder.registrationFields = [...records]
    setSetting({ ...builder })
  }

  const LoginForm = () => {
    const [form] = Form.useForm()
    return (
      <div className={styles.clientAreaLoginForm}>
        <Form form={form} layout="vertical">
          <div className={styles.loginFormCenter}>
            <img src={clinicLogo} alt="" style={{ marginBottom: '2rem' }} />
          </div>
          <Form.Item label="Username">
            <AntInput />
          </Form.Item>
          <Form.Item label="Password">
            <AntInput.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <div
            className={styles.loginFormRight}
            style={{
              marginBottom: isMdScreen ? '2rem' : '20px',
              color: 'var(--primary-color)',
            }}
          >
            Forgot password?
          </div>
          <Button type="primary" block>
            Login
          </Button>
          <div className={styles.loginFormCenter} style={{ margin: '8px 0' }}>
            or
          </div>
          <Button block className={styles.loginViaFB}>
            Login via Facebook
          </Button>
          <div className={styles.loginFormCenter} style={{ marginTop: '1rem' }}>
            <span style={{ color: 'var(--grey-text-color)' }}>
              Not a member yet?{' '}
              <span style={{ color: 'var(--primary-color)' }}>Sign in</span>
            </span>
          </div>
          <div
            className={styles.loginFormCenter}
            style={{ marginTop: '1rem', color: '#cccfd6' }}
          >
            Powered by Pabau
          </div>
        </Form>
      </div>
    )
  }

  useEffect(() => {
    setSetting(settings)
  }, [settings])

  return (
    <div className={styles.clientAreaBody}>
      <div className={styles.clientAreaBodyDesktop}>
        <div>
          <h2>Builder</h2>
          <div>
            <div className={styles.section}>
              <h3>
                <Palette style={{ marginRight: '.5rem' }} />
                <span>Appearance</span>
              </h3>
              <h4>
                Customize the layout of your client portal to match your brand
                colors.
              </h4>
              <div className={styles.sectionItem}>
                <Background
                  list={[
                    { name: 'None', color: '' },
                    {
                      name: 'Strong',
                      color:
                        'linear-gradient(125.34deg, #79E6E1 -8.96%, #93B8D5 111.79%)',
                    },
                    {
                      name: 'Emerald',
                      color:
                        'linear-gradient(125.34deg, #67E97D -8.96%, #68F7D3 111.79%)',
                    },
                    {
                      name: 'Skyline',
                      color:
                        'linear-gradient(125.34deg, #56F1FF -8.96%, #5CB0FF 111.79%)',
                    },
                  ]}
                  onChange={(val) => handleColorSetting('backgroundColor', val)}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Icon colours for the menu"
                  onSelected={(val) => handleColorSetting('iconColor', val)}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Top header colours"
                  onSelected={(val) => handleColorSetting('headerColor', val)}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Bottom footer colours"
                  onSelected={(val) => handleColorSetting('footerColor', val)}
                />
              </div>
            </div>
            <div className={styles.section}>
              <RegistrationFields
                icon={<Profile style={{ marginRight: '.5rem' }} />}
                customFieldTitle="Custom Fields"
                fields={setting.registrationFields}
                description="Choose which fields you would like to be visible or mandatory when clients register to your portal."
                requiredTitle="Required"
                customFields={setting.customFields}
                fieldTitle="Field Name"
                title="Registration Fields"
                visibleTitle="Visible"
                onCustomFieldCheckboxChange={(event, key, checkboxField) =>
                  onCustomFieldCheckboxChange(event, key, checkboxField)
                }
                onMainFieldCheckboxChange={(event, key, checkboxField) =>
                  onMainFieldCheckboxChange(event, key, checkboxField)
                }
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Preview</h2>
          <div className={styles.previewPanel}>
            <div className={styles.previewPanelHeader}>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isDashboardPreview}
                value={isDashboardPreview}
                onChange={(e) => setIsDashboardPreview(e.target.value)}
              >
                <Radio.Button value={false}>Login</Radio.Button>
                <Radio.Button value={true}>Dashboard</Radio.Button>
              </Radio.Group>
              <Radio.Group
                buttonStyle="solid"
                defaultValue={isMobilePreview}
                value={isMobilePreview}
                onChange={(e) => setIsMobilePreview(e.target.value)}
              >
                <Radio.Button value={false}>
                  <DesktopOutlined />
                </Radio.Button>
                <Radio.Button value={true}>
                  <MobileOutlined />
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className={styles.previewPanelBody}>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.clientAreaBodyMobile}>
        <TabMenu
          menuItems={['BUILDER', 'PREVIEW']}
          tabPosition="top"
          minHeight="1px"
        >
          <div>
            <div className={styles.section}>
              <h3>
                <Palette style={{ marginRight: '.5rem' }} />
                <span>Apperance</span>
              </h3>
              <h4>
                Here you can customize the look and feel of client area to match
                your brand colours.
              </h4>
              <div className={styles.sectionItem}>
                <Background
                  list={[
                    { name: 'None', color: '' },
                    {
                      name: 'Strong',
                      color:
                        'linear-gradient(125.34deg, #79E6E1 -8.96%, #93B8D5 111.79%)',
                    },
                    {
                      name: 'Emerald',
                      color:
                        'linear-gradient(125.34deg, #67E97D -8.96%, #68F7D3 111.79%)',
                    },
                    {
                      name: 'Skyline',
                      color:
                        'linear-gradient(125.34deg, #56F1FF -8.96%, #5CB0FF 111.79%)',
                    },
                  ]}
                  onChange={(val) => handleColorSetting('backgroundColor', val)}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Icon colours for the menu"
                  onSelected={(val) => handleColorSetting('iconColor', val)}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Top header colours"
                  onSelected={(val) => handleColorSetting('headerColor', val)}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Bottom footer colours"
                  onSelected={(val) => handleColorSetting('footerColor', val)}
                />
              </div>
            </div>
            <div className={styles.section}>
              <RegistrationFields
                icon={<Profile style={{ marginRight: '.5rem' }} />}
                customFieldTitle="Custom Fields"
                fields={setting.registrationFields}
                description="Choose which fields you would like to be visible or mandatory on the registration page"
                requiredTitle="Required"
                customFields={setting.customFields}
                fieldTitle="Field Name"
                title="Registration Fields"
                visibleTitle="Visible"
                onCustomFieldCheckboxChange={(event, key, checkboxField) =>
                  onCustomFieldCheckboxChange(event, key, checkboxField)
                }
                onMainFieldCheckboxChange={(event, key, checkboxField) =>
                  onMainFieldCheckboxChange(event, key, checkboxField)
                }
              />
            </div>
          </div>
          <div className={styles.previewPanel}>
            <div className={styles.previewPanelHeader}>
              <div style={{ width: '200px' }}>
                <SimpleDropdown
                  dropdownItems={['Login', 'Dashboard']}
                  onSelected={(val) => val}
                />
              </div>
            </div>
            <div className={styles.previewPanelBody}>
              <LoginForm />
            </div>
          </div>
        </TabMenu>
      </div>
    </div>
  )
}

export default ClientAreaStepOne
