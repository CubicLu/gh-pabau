import React from 'react'
import logo from '../../assets/images/normal-clinic-logo.svg'
import StatementTemplateComponents from './StatementTemplate'

export default {
  component: StatementTemplateComponents,
  title: 'StatementTemplate',
  args: {
    visible: true,
    logo,
    title: 'Statement',
    titleDescription: 'The London Skin and Helth Clinic',
    clinicDetails: [
      {
        key: 0,
        website: 'www.thepabauskinandhairclinic.com',
        email: 'accounts@pabau.co.uk ',
        phone: 8965421589,
        regCompanyNo: 474788925,
        address: '748 Guild Street , First Floor, London WCQV 7DN',
        regCompanyAddress: '748 Guild Street , First Floor, London WCQV 7DN',
        country: 'United Kingdom',
        account: 'The Pabau Skin and Helth Clinic',
        accountNumber: 3214526321452,
        sortCode: '20-40-71',
        bankName: 'Barclays High Wycombe',
        iban: 'NLADJD3454WE3K2N434',
        swift: 'BIFGH564KENEM',
      },
    ],
    statementDetails: [
      {
        key: 0,
        statementInvoice: '#344565',
        issuedTo: 'Georgina Rayner #2928',
        issuedBy: 'Carina Briggs',
        statementDate: '12/03/2021',
        statementPeriodFrom: '23/10/2021',
        statementPeriodTo: '24/11/2021',
      },
    ],
    headersColumns: [
      'ID',
      'Date',
      'Type',
      'Payment Method',
      'Item Name',
      'Qty',
      'Price',
      'Net',
      'VAT',
      'Total',
    ],
    data: [
      [
        'INV-891',
        '12/03/2021',
        'Invoice',
        'Card',
        'Laser Hair Removal – HollyWood and Abdomen (9)',
        '2',
        '2,520.00',
        '2,520.00',
        '2,520.00',
        '2,520.00',
      ],
      [
        'INV-892',
        '12/03/2021',
        'Invoice',
        'Card',
        'Laser Hair Removal',
        '3',
        '3,520.00',
        '3,520.00',
        '3,520.00',
        '3,520.00',
      ],
      [
        'INV-893',
        '12/03/2021',
        'Invoice',
        'Card',
        'Botox area 1',
        '5',
        '3,520.00',
        '3,520.00',
        '3,520.00',
        '3,520.00',
      ],
      [
        'INV-894',
        '12/03/2021',
        'Invoice',
        'Card',
        'Laser Hair Removal',
        '1',
        '3,520.00',
        '3,520.00',
        '3,520.00',
        '3,520.00',
      ],
      [
        'INV-895',
        '12/03/2021',
        'Invoice',
        'Card',
        'Botox area 1',
        '2',
        '3,520.00',
        '3,520.00',
        '3,520.00',
        '3,520.00',
      ],
    ],
    paymentDetails: [
      {
        key: 0,
        totalVat: 0,
        amountPaid: 0,
        subTotalAmount: 2520,
        outStanding: 2520,
        totalInvoiced: 2500,
      },
    ],
  },
}

const StatementTemplateStory = ({
  visible,
  logo,
  title,
  titleDescription,
  clinicDetails,
  statementDetails,
  data,
  headersColumns,
  paymentDetails,
}) => (
  <StatementTemplateComponents
    visible={visible}
    title={title}
    logo={logo}
    titleDescription={titleDescription}
    clinicDetails={clinicDetails}
    statementDetails={statementDetails}
    headersColumns={headersColumns}
    data={data}
    paymentDetails={paymentDetails}
  />
)

export const StatementTemplate = StatementTemplateStory.bind({})
