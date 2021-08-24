import { render } from '@testing-library/react'
import React from 'react'

import StatementTemplate from './StatementTemplate'

describe('StatementTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <StatementTemplate
        visible={true}
        onCancel={() => {
          console.log()
        }}
        logo={''}
        title={'Statement'}
        titleDescription={'Statement'}
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
        statementDetails={[
          {
            key: 0,
            statementInvoice: '#344565',
            issuedTo: 'Georgina Rayner #2928',
            issuedBy: 'Carina Briggs',
            statementDate: '12/03/2021',
            statementPeriodFrom: '23/10/2021',
            statementPeriodTo: '24/11/2021',
          },
        ]}
        paymentDetails={[
          {
            key: 0,
            totalVat: 0,
            amountPaid: 0,
            subTotalAmount: 0,
            outstanding: 0,
            grandTotal: 0,
            refundAmount: 0,
            paid: 0,
            totalNet: 0,
          },
        ]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
