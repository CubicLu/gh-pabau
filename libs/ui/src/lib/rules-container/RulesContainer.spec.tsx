import { render } from '@testing-library/react'
import React from 'react'
import RulesContainer from './RulesContainer'

describe('RulesContainer', () => {
  it('should render successfully', () => {
    const props = {
      noConfiguredMessage: 'No field rules are configured for this form',
      configureBtnText: 'Configure Now',
      ifText: 'If',
      ifConditionText: 'of the following conditions are met',
      thenText: 'Then',
      thenConditionText: 'Perform the following actions',
      fieldRulesText: 'Field Rules',
      configureRules:
        'Configure rules to change the behaviour of your form based on the answers selected',
      newRuleText: 'New Rule',
      ruleNameText: 'Rule name',
      cancelText: 'Cancel',
      saveRuleText: 'Save Rule',
      ruleConditionPlaceHolder: 'Write Condition here',
      answersOptions: {
        0: { id: 'short_answer', answer: 'Short Answer' },
        1: { id: 'long_answer', answer: 'Long Answer' },
        2: { id: 'single_choice_answer', answer: 'Single Choice Answer' },
      },
      answersClientOptions: {
        gender: { id: 'gender', answer: 'Gender' },
        age: { id: 'age', answer: 'Age' },
      },
      operatorOptions: {
        is: 'is',
        is_not: 'is not',
        is_empty: 'is empty',
        is_not_empty: 'is not empty',
        greater_than: 'greater than',
        less_than: 'less than',
      },
      actionTitle: 'Pabau',
      actions: [
        {
          key: 'display_notice_cancel_booking',
          text: 'Display Notice & Cancel Booking',
          icon: 'icon',
        },
      ],
      actionsNotAvailableTitle: 'Apps & Integrations (coming soon)',
      actionsNotAvailable: [
        {
          key: 'slack',
          text: 'Slack',
          icon: 'icon',
        },
        {
          key: 'microsoft',
          text: 'Microsoft Teams',
          icon: 'icon',
        },
      ],
      medicalForms: [],
      currentRules: [],
    }
    const { baseElement } = render(<RulesContainer {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
