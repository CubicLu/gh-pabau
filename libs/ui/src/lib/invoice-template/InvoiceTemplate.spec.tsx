import { render } from '@testing-library/react'
import React from 'react'

import InvoiceTemplate from './InvoiceTemplate'

describe('InvoiceTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <InvoiceTemplate
        visible={true}
        onCancel={() => {
          console.log()
        }}
        logo={''}
        title={'Invoice'}
        titleDescription={'Invoice'}
        clinicDetails={[
          {
            key: 0,
            website: 'www.thelondonskinandhairclinic.com',
            email: 'accounts@lsah.co.uk ',
            phone: 20718045651,
            address: '233 High Holborn,London WC1V 7DN',
            regCompanyNo: '47478925',
            regCompanyAddress: '233 High Holborn,London WC1V 7DN',
            country: 'United Kingdom',
            account: 'The London Skin and Helth Clinic',
            accountNumber: 3214526321452,
            sortCode: '20-40-71',
            bankName: 'Barclays High Wycombe',
            iban: 'NLAJD345WE3K2N434',
            swift: 'BIFGH564KENEM',
          },
        ]}
        invoiceDetails={[
          {
            key: 0,
            invoice: '#344565',
            issuedTo: 'Georgina Rayner #2928',
            issuedBy: 'Carina Briggs',
            date: '12/03/2021',
          },
        ]}
        paymentDetails={[
          {
            key: 0,
            totalVat: 0,
            amountPaid: 0,
            subTotalAmount: 2520,
            outstanding: 2520,
            grandTotal: 2500,
            paymentTime: new Date(),
            total: 15,
            card: 5,
            cash: 10,
            paid: 0,
            refundAmount: 0,
            totalNet: 0,
          },
        ]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
