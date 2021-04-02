import React from 'react'
import { render } from '@testing-library/react'

import SMSPurchaseModal from './SMSPurchaseModal'
import CoinIcon0 from '../../assets/images/sms-purchase-modal/coins-0.svg'
import CoinIcon1 from '../../assets/images/sms-purchase-modal/coins-1.svg'
import CoinIcon2 from '../../assets/images/sms-purchase-modal/coins-2.svg'
import CoinIcon3 from '../../assets/images/sms-purchase-modal/coins-3.svg'
import CoinIcon4 from '../../assets/images/sms-purchase-modal/coins-4.svg'
import CoinIcon5 from '../../assets/images/sms-purchase-modal/coins-5.svg'

function noop() {
  console.log('noop called')
}
describe('SMSPurchaseModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SMSPurchaseModal
        visible={true}
        numberFormatter={new Intl.NumberFormat('en-US')}
        options={[
          {
            count: 200,
            cost: 39,
            costPerUnit: 0.08,
            img: CoinIcon0,
            id: 0,
          },
          {
            count: 500,
            cost: 39,
            costPerUnit: 0.08,
            img: CoinIcon1,
            id: 1,
          },
          {
            count: 2000,
            cost: 39,
            costPerUnit: 0.08,
            img: CoinIcon2,
            id: 2,
          },
          {
            count: 5000,
            cost: 39,
            costPerUnit: 0.08,
            img: CoinIcon3,
            id: 3,
          },
          {
            count: 10000,
            cost: 39,
            costPerUnit: 0.08,
            img: CoinIcon4,
            id: 4,
          },
          {
            count: 20000,
            cost: 39,
            costPerUnit: 0.08,
            img: CoinIcon5,
            id: 5,
          },
        ]}
        onClose={noop}
        onComplete={noop}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
