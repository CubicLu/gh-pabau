import {
  CalendarOutlined,
  ControlOutlined,
  DollarCircleOutlined,
  EditOutlined,
  EyeOutlined,
  InboxOutlined,
  MailOutlined,
  SlackSquareOutlined,
  UserOutlined,
  WindowsOutlined,
} from '@ant-design/icons'
import {
  EmailMessageTemplateItem,
  MedicaFormAdvanceSettingData,
  MedicalFormTypes,
  RuleProp,
  RulesContainer,
  SmsMessageTemplateItem,
  UserListItem,
  UserGroupListItem,
} from '@pabau/ui'
import { Tabs } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import styles from './MedicalFormAdvance.module.less'
import MedicalFormAdvanceSettings from './MedicalFormAdvanceSettings'

const { TabPane } = Tabs
interface P {
  formSaveLabel: string
  changeFormSaveLabel: (string) => void
  draggedForms: MedicalFormTypes[]
  onSaveRules?: (rules: RuleProp[]) => void
  currentRules?: RuleProp[]
  emailMessageTemplateItems?: EmailMessageTemplateItem[]
  smsMessageTemplateItems?: SmsMessageTemplateItem[]
  userListItems?: UserListItem[]
  onSaveAdvSettings?: (advSettings: MedicaFormAdvanceSettingData) => void
  currentAdvSettings?: MedicaFormAdvanceSettingData
}

const MedicalFormAdvance: FC<P> = ({
  formSaveLabel = '',
  changeFormSaveLabel,
  draggedForms = [],
  onSaveRules,
  currentRules = [],
  emailMessageTemplateItems = [],
  smsMessageTemplateItems = [],
  userListItems = [],
  onSaveAdvSettings,
  currentAdvSettings,
}) => {
  const [activatePanel, setActivatePanel] = useState('1')
  const [answersOptions, setAnswersOptions] = useState({})
  const [medicalForms, setMedicalForms] = useState<MedicalFormTypes[]>([])

  useEffect(() => {
    setMedicalForms(draggedForms)
    const draggedFormsObject = draggedForms
      .filter(
        (item) => item.txtQuestion !== '' && item.formName !== 'basic_signature'
      )
      .map((item, index) => {
        return { [item.id]: { id: item.id, answer: item.txtQuestion } }
      })
      .reduce(function (result, item) {
        const key = Object.keys(item)[0]
        result[key] = item[key]
        return result
      }, {})
    setAnswersOptions(draggedFormsObject)
  }, [draggedForms])

  return (
    <Tabs
      activeKey={activatePanel}
      className={styles.medicalFormAdvancedTab}
      onChange={(e) => setActivatePanel(e)}
    >
      <TabPane
        tab={
          <span className={styles.tabName}>
            &nbsp;&nbsp;
            <EditOutlined />
            Rules
          </span>
        }
        key="1"
      >
        <RulesContainer
          noConfiguredMessage={'No field rules are configured for this form'}
          configureBtnText={'Configure Now'}
          ifText={'If'}
          ifConditionText={'of the following conditions are met'}
          thenText={'Then'}
          thenConditionText={'Perform the following actions'}
          fieldRulesText={'Field Rules'}
          configureRules={
            'Configure rules to change the behaviour of your form based on the answers selected'
          }
          newRuleText={'New Rule'}
          ruleNameText={'Rule name'}
          cancelText={'Cancel'}
          saveRuleText={'Save Rule'}
          ruleConditionPlaceHolder={'Write Condition here'}
          answersOptions={answersOptions}
          answersClientOptions={{
            gender: { id: 'gender', answer: 'Gender' },
            age: { id: 'age', answer: 'Age' },
          }}
          medicalForms={medicalForms}
          smsMessageTemplateItems={smsMessageTemplateItems}
          emailMessageTemplateItems={emailMessageTemplateItems}
          userListItems={userListItems}
          operatorOptions={{
            is: 'is',
            is_not: 'is not',
            is_empty: 'is empty',
            is_not_empty: 'is not empty',
            is_any_of: 'is any of',
            greater_than: 'is greater than',
            less_than: 'is less than',
            equal_greater_than: 'is equal or greater than',
            equal_less_than: 'is equal or less than',
          }}
          actionTitle={'Pabau'}
          actions={[
            {
              key: 'display_notice_cancel_booking',
              text: 'Display Notice & Cancel Booking',
              icon: <DollarCircleOutlined />,
            },
            {
              key: 'display_notice',
              text: 'Display Notice',
              icon: <UserOutlined />,
            },
            {
              key: 'sms',
              text: 'SMS',
              icon: <InboxOutlined />,
            },
            {
              key: 'activity',
              text: 'Create Activity',
              icon: <CalendarOutlined />,
            },
            {
              key: 'email',
              text: 'Email',
              icon: <MailOutlined />,
              events: [
                {
                  key: 'send_email',
                  text: 'Send email',
                  subtext: 'Send an email from your personal email account',
                },
                {
                  key: 'send_email_using_template',
                  text: 'Send email using template',
                  subtext: 'Send an email from your personal email account',
                },
              ],
            },
          ]}
          actionsNotAvailableTitle={'Apps & Integrations (coming soon)'}
          actionsNotAvailable={[
            {
              key: 'slack',
              text: 'Slack',
              icon: <SlackSquareOutlined />,
            },
            {
              key: 'microsoft',
              text: 'Microsoft Teams',
              icon: <WindowsOutlined />,
            },
          ]}
          onSaveRules={onSaveRules}
          currentRules={currentRules}
        />
      </TabPane>
      <TabPane
        tab={
          <span className={styles.tabName}>
            <EyeOutlined />
            Settings
          </span>
        }
        key="2"
      >
        <MedicalFormAdvanceSettings
          changeFormSaveLabel={changeFormSaveLabel}
          formSaveLabel={formSaveLabel}
          onSaveAdvSettings={onSaveAdvSettings}
          currentAdvSettings={currentAdvSettings}
        />
      </TabPane>
      <TabPane
        tab={
          <span className={styles.tabName}>
            <ControlOutlined />
            Theme
          </span>
        }
        key="3"
      >
        <h1>Theme</h1>
      </TabPane>
    </Tabs>
  )
}

export default MedicalFormAdvance
