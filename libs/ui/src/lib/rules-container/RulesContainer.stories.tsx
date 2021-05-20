/* eslint-disable */
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
    actionOptions: {
        send_email: 'Send Email',
        send_sms: 'Send SMS',
    },
    operatorOptions: {
        is: 'is',
        not_is: 'Not is',
    }
  },
  onChange: { action: 'onChange' },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const BackgroundStory = ({ ...args }) => <RulesContainer {...args} />

export const BackgroundColour = BackgroundStory.bind({})
