import React from 'react'
import { render } from '@testing-library/react'

import VoucherCard from './VoucherCard'

describe('VoucherCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <VoucherCard
        voucherNum={1}
        voucherType={'example voucher'}
        voucherPrice={100}
        backgroundColor1={'red'}
        backgroundColor2={'blue'}
        borderColor={'black'}
        buttonLabel={'Button label'}
        cardWidth={200}
        currencyType={'GBP'}
        gradientType={'example'}
        onMenuClick={() => {
          return true
        }}
        voucherPriceLabel={'Price label example'}
        voucherRelation={'example relation'}
        voucherRelationLabel={'example relation label'}
        voucherSoldPrice={200}
        voucherSoldPriceLabel={'Example sold price label'}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
