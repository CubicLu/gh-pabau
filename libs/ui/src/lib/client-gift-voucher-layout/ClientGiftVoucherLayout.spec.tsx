import { render } from '@testing-library/react'
import React from 'react'
import ClientGiftVoucherLayout from './ClientGiftVoucherLayout'

describe('ClientGiftVoucherLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientGiftVoucherLayout
        activeVouchers={[]}
        expiredVouchers={[]}
        onCardSelect={() => Promise.resolve(true)}
        onChangeTab={() => Promise.resolve(true)}
        activeVouchersCount={0}
        expiredVouchersCount={0}
        activeKey={'0'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
