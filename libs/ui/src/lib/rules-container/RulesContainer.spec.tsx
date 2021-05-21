import React from 'react'
import { render } from '@testing-library/react'

import RulesContainer from './RulesContainer'

describe('RulesContainer', () => {
  it('should render successfully', () => {
    const props = {
      noConfiguredMessage: 'string',
      configureBtnText: 'string',
      ifText: 'string',
      ifConditionText: 'string',
      thenText: 'string',
      thenConditionText: 'string',
      fieldRulesText: 'string',
      configureRules: 'string',
      newRuleText: 'string',
      ruleNameText: 'string',
      cancelText: 'string',
      saveRuleText: 'string',
      ruleConditionPlaceHolder: 'string',
      answersOptions: { string: 'string' },
      actionOptions: { string: 'string' },
      operatorOptions: { string: 'string' },
    }
    const { baseElement } = render(<RulesContainer {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
