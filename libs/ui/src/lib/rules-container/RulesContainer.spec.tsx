import React from 'react'
import { render } from '@testing-library/react'

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
      operatorOptions: {
        is: 'is',
        not_is: 'Not is',
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
    }
    const { baseElement } = render(<RulesContainer {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
