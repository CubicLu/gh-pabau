import React from 'react'
import { render } from '@testing-library/react'
import { ticks, seriesData } from './mock'

import TeamReportModal from './TeamReportModal'

describe('TeamReportModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TeamReportModal
        ticks={ticks}
        series={seriesData}
        type="line"
        prefix="£"
        suffix="K"
        visible={true}
        employee="Total Team"
        service="Services Revenue"
        description="Two-factor authentication adds an extra layer of security to your Pabau account. By asking you to enter a verification code after entering the correct email address and password, it will protect you from potential attackers who also might have gained access to your email address."
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
