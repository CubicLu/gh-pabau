import { render } from '@testing-library/react'
import React from 'react'

import ReceiptTemplate from './ReceiptTemplate'

describe('ReceiptTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ReceiptTemplate
        visible={true}
        onCancel={() => {
          console.log()
        }}
        logo={''}
        title={'Recepit'}
        titleDescription={'Recepit'}
        clinicDetails={[
          {
            key: 0,
            website: 'www.thepabauskinandhairclinic.com',
            email: 'accounts@pabau.co.uk ',
            phone: 8965421589,
            regCompanyNo: '474788925',
            address: '748 Guild Street , First Floor, London WCQV 7DN',
            regCompanyAddress:
              '748 Guild Street , First Floor, London WCQV 7DN',
            country: 'United Kingdom',
            account: 'The Pabau Skin and Helth Clinic',
            accountNumber: 3214526321452,
            sortCode: '20-40-71',
            bankName: 'Barclays High Wycombe',
            iban: 'NLADJD3454WE3K2N434',
            swift: 'BIFGH564KENEM',
          },
        ]}
        receiptDetails={[
          {
            key: 0,
            receipt: '#31214321',
            issuedTo: 'Georgina Rayner #2928',
            issuedBy: 'Carina Briggs',
            paymentDate: '12/03/2021',
          },
        ]}
        paymentDetails={[
          {
            key: 0,
            paymentTime: '29 May 2021, 1:09PM',
            paymentId: '#31214321',
            totalPayment: 2500,
            total: 15,
            card: 5,
            cash: 10,
            appliedToInvoice: 150,
          },
        ]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
