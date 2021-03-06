import React from 'react'
import { render } from '@testing-library/react'

import Security from './Security'

describe('Security', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Security
        twoFAstatus={1}
        dangerButtonText={'Cancel'}
        newButtonText={'New'}
        onDelete={() => true}
        onOk={() => true}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
