import { DesktopOutlined, MobileOutlined } from '@ant-design/icons'
import {
  Background,
  ColorPicker,
  RegistrationFields,
  SimpleDropdown,
  TabMenu,
} from '@pabau/ui'

import { Radio } from 'antd'
import React, { FC, useState } from 'react'
import { LoginForm } from '../../../../web/components/Setup/ClientArea/LoginForm'
import { ReactComponent as Palette } from '../../../assets/images/palette.svg'
import { ReactComponent as Profile } from '../../../assets/images/profile.svg'
import styles from './Style.module.less'

interface DefaultFields {
  fieldName: string
  label: string
  visible: boolean
  required: boolean
  key: number
}

interface CustomFields {
  field_label?: string
  field_type?: string
  is_active: boolean
  is_required: number
  id: number
}
interface Colors {
  bgcolor: string
  headercolor?: string
  footercolor?: string
  buttoncolor?: string
  buttontextcolor?: string
}

export interface Company {
  slug?: string
  ConnectTheme: Colors[]
  ManageCustomField: CustomFields[]
}
interface ClientAreaStepOneProps {
  stepOneData: Company
  defaultData: DefaultFields[]
  setStepOneData: (CustomFields) => void
}
export const ClientAreaStepOne: FC<ClientAreaStepOneProps> = ({
  stepOneData,
  setStepOneData,
  defaultData,
}) => {
  const [isDashboardPreview, setIsDashboardPreview] = useState(false)
  const [isMobilePreview, setIsMobilePreview] = useState(false)
  const onCustomFieldCheckboxChange = (e, id, checkboxField) => {
    const customFields = stepOneData.ManageCustomField.map((a) => {
      return { ...a }
    })
    customFields.map((field) => {
      if (field.id === id && checkboxField === 'is_required') {
        field.is_required = e.target.checked ? 1 : 0
      }
      if (field.id === id && checkboxField === 'is_active') {
        field.is_active = e.target.checked ? true : false
      }
      return field
    })

    setStepOneData({
      ManageCustomField: customFields,
      ConnectTheme: stepOneData.ConnectTheme,
    })
  }
  const handleColorSetting = (name, color) => {
    const currentTheme = { ...stepOneData.ConnectTheme[0] }
    currentTheme[name] = color
    setStepOneData({
      ManageCustomField: stepOneData.ManageCustomField,
      ConnectTheme: [currentTheme],
    })
  }

  const onMainFieldCheckboxChange = (event, id, checkboxField) => {
    return true
  }
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
                        'linear-gradient(125.34deg , rgb(121, 230, 225) -8.96%, rgb(147, 184, 213) 111.79%)',
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
                  onChange={(val) => handleColorSetting('bgcolor', val)}
                  defaultSelectedColor={stepOneData.ConnectTheme[0].bgcolor}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Icon colours for the menu"
                  selectedColor={stepOneData.ConnectTheme[0].buttoncolor}
                  onSelected={(val) => handleColorSetting('buttoncolor', val)}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Top header colours"
                  selectedColor={stepOneData.ConnectTheme[0].headercolor}
                  onSelected={(val) => handleColorSetting('headercolor', val)}
                />
              </div>
              <div className={styles.sectionItem}>
                <ColorPicker
                  heading="Bottom footer colours"
                  selectedColor={stepOneData.ConnectTheme[0].footercolor}
                  onSelected={(val) => handleColorSetting('footercolor', val)}
                />
              </div>
            </div>
            <div className={styles.section}>
              <RegistrationFields
                icon={<Profile style={{ marginRight: '.5rem' }} />}
                customFieldTitle="Custom Fields"
                fields={defaultData}
                description="Choose which fields you would like to be visible or mandatory when clients register to your portal."
                requiredTitle="Required"
                fieldTitle="Field Name"
                customFields={stepOneData.ManageCustomField}
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
            <div
              style={{ background: stepOneData.ConnectTheme[0].bgcolor }}
              className={styles.previewPanelBody}
            >
              <LoginForm color1={stepOneData.ConnectTheme[0].bgcolor} />
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
          <div className={styles.previewPanel}>
            <div className={styles.previewPanelHeader}>
              <div style={{ width: '200px' }}>
                <SimpleDropdown
                  dropdownItems={['Login', 'Dashboard']}
                  onSelected={(val) => val}
                />
              </div>
            </div>
          </div>
        </TabMenu>
      </div>
    </div>
  )
}

export default ClientAreaStepOne
