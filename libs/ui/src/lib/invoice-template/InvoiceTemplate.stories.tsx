import React from 'react'
import logo from '../../assets/images/normal-clinic-logo.svg'
import InvoiceTemplateComponents from './InvoiceTemplate'

export default {
  component: InvoiceTemplateComponents,
  title: 'InvoiceTemplate',
  args: {
    visible: true,
    logo,
    title: 'Invoice',
    titleDescription: 'The Pabau Skin and Helth Clinic',
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
    invoiceDetails: [
      {
        key: 0,
        invoice: '#344565',
        issuedTo: 'Georgina Rayner #2928',
        issuedBy: 'Carina Briggs',
        date: '12/03/2021',
      },
    ],
    paymentDetails: [
      {
        key: 0,
        totalVat: 0,
        amountPaid: 0,
        subTotalAmount: 2520,
        outstanding: 2520,
        grandTotal: 2500,
        paymentTime: '29 May 2021, 1:09PM',
        total: 15,
        card: 5,
        cash: 10,
      },
    ],
  },
}

const InvoiceTemplateStory = ({
  visible,
  logo,
  title,
  titleDescription,
  clinicDetails,
  invoiceDetails,
  paymentDetails,
}) => (
  <InvoiceTemplateComponents
    visible={visible}
    title={title}
    logo={logo}
    titleDescription={titleDescription}
    clinicDetails={clinicDetails}
    invoiceDetails={invoiceDetails}
    paymentDetails={paymentDetails}
  />
)

export const InvoiceTemplate = InvoiceTemplateStory.bind({})
