/* eslint-disable */
import {
  CalendarOutlined, DollarCircleOutlined, InboxOutlined, MailOutlined,
  SlackSquareOutlined, UserOutlined, WindowsOutlined
} from '@ant-design/icons'
import React from 'react'
import RulesContainer from './RulesContainer'

export default {
  component: RulesContainer,
  title: 'Rules Container',
  args: {
    noConfiguredMessage: 'No field rules are configured for this form',
    configureBtnText: 'Configure Now',
    ifText: 'If',
    ifConditionText: 'of the following conditions are met',
    thenText: 'Then',
    thenConditionText: 'Perform the following actions',
    fieldRulesText: 'Field Rules',
    configureRules: 'Configure rules to change the behaviour of your form based on the answers selected',
    newRuleText: 'New Rule',
    ruleNameText: 'Rule name',
    cancelText: 'Cancel',
    saveRuleText: 'Save Rule',
    ruleConditionPlaceHolder: 'Write Condition here',
    answersOptions: {
        short_answer: 'Short Answer',
        long_answer: 'Long Answer',
        single_choice_answer: 'Single Choice Answer',
        multiple_choice_answer: 'Multiple Choice Answer',
        dropdown_answer: 'Dropdown Answer',
        medical_condition: 'Medical Condition',
        drugs_prescribed: 'Drugs Prescribed',
        travel_destination: 'Travel Destination',
        labs_ordered: 'Labs Ordered',
    },
    answersClientOptions: {
      gender: 'Gender',
      age: 'Age',
    },
    operatorOptions: {
        is: 'is',
        is_not: 'is not',
        is_empty: 'is empty',
        is_not_empty: 'is not empty',
    },
    actionTitle: 'Pabau',
    actions: [
      {
        key: 'display_notice_cancel_booking',
        text: 'Display Notice & Cancel Booking',
        icon: <DollarCircleOutlined />
      },
      {
        key: 'display_notice',
        text: 'Display Notice',
        icon: <UserOutlined />
      },
      {
        key: 'sms',
        text: 'SMS',
        icon: <InboxOutlined />
      },
      {
        key: 'activity',
        text: 'Activity',
        icon:<CalendarOutlined />
      },
      {
        key: 'email',
        text: 'Email',
        icon: <MailOutlined />,
        events: [
          {
            key: 'send_email',
            text: 'Send email',
            subtext: 'Send an email from your personal email account'
          },
          {
            key: 'send_email_using_template',
            text: 'Send email using template',
            subtext: 'Send an email from your personal email account'
          }
        ]
      },

    ],
    actionsNotAvailableTitle: 'Apps & Integrations (coming soon)',
    actionsNotAvailable:[
      {
        key: 'slack',
        text: 'Slack',
        icon: <SlackSquareOutlined />
      },
      {
        key: 'microsoft',
        text: 'Microsoft Teams',
        icon: <WindowsOutlined />
      }
    ],
    medicalForms: [],
  },
  onChange: { action: 'onChange' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const BackgroundStory = ({ ...args }) => <RulesContainer {...args} />

export const BackgroundColour = BackgroundStory.bind({})
