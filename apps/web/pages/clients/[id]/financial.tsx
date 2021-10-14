import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { TabMenu } from '@pabau/ui'
import dayjs from 'dayjs'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { Invoices } from '../../../components/ClientCard/client-financial-layout/invoices/Invoices'
import { Payments } from '../../../components/ClientCard/client-financial-layout/payments/Payments'
import { Items } from '../../../components/ClientCard/client-financial-layout/items/Items'
import { Voided } from '../../../components/ClientCard/client-financial-layout/voided/Voided'
import { Statements } from '../../../components/ClientCard/client-financial-layout/statements/Statements'
import { ClientFinancialsLayoutProps } from '../../../components/ClientCard/client-financial-layout/ClientFinancialsLayout'
import { useQuery } from '@apollo/client'
import { GetFinanceInvoicesDocument } from '@pabau/graphql'
import {
  financialInvoices,
  financialPayments,
  financialItems,
  financialVoidedPayments,
  financialStatements,
  invoiceEmployeeOptions,
  locationOptions,
} from '../../../mocks/ClientCardMock'

const Appointments = () => {
  const router = useRouter()
  const props = {
    ...financialInvoices,
    payments: financialPayments,
    items: financialItems,
    voidedPayments: financialVoidedPayments,
    statements: financialStatements,
  }
  const [data, setData] = useState<ClientFinancialsLayoutProps>(props)

  const { data: invoice } = useQuery(GetFinanceInvoicesDocument, {
    variables: {
      id: Number.parseInt(`${router.query.id}`),
    },
  })

  useEffect(() => {
    const invoices = []
    if (invoice) {
      invoice.findManyInvDetail.map((item) => {
        invoices.push({
          id: `${item.id}`,
          type: 'package',
          date: dayjs(`${item.date}`).format('DD/MM/YYYY'),
          location: item.location_name,
          employee: item.billers,
          issuedTo: item.issue_to,
          paid: item.status === 'paid' ? true : false,
          items: [
            {
              employee: 'Anika Kadir',
              id: 1,
              name: 'Dispensary - prescription medications',
              price: 28,
              quantity: 1,
              discount: 20,
              tax: 0,
              totalPrice: 28,
            },
            {
              employee: 'Anika Kadir',
              id: 2,
              name: 'Viviscal Professional - one pack (60 tablets)',
              price: 28,
              quantity: 2,
              discount: 30,
              tax: 0,
              totalPrice: 56,
            },
          ],
          totalVat: 0,
          amountPaid: 0,
          subtotal: 2250,
          tips: 0,
          grandTotal: 2250,
          paymentStatus: 2,
          paymentStatusTooltip:
            'Full payment received on Sunday, 16 May 2021 at CHISSY BEAUTY STUDIO by Chissy Stylist',
          tip: {
            amount: '10',
            type: '%',
            staff: 'John Doe',
          },
          history: [
            {
              title: 'Issued to: Vedran Taneski',
              date: 'Last Friday at 3:00 PM',
              notif_by: 'Ben Gough',
              type: 'issue',
            },
            {
              title: 'Invoice issue',
              date: '12 Mar at 3:00 PM',
              description:
                'Dear John, I have gone ahead and looked to book an appointment in with Dr Smith Brandham for next Thursday if that time works ok with you?',
              notif_by: 'Martin Wade',
              views: 2,
              type: 'email',
            },
            {
              title: 'Refund #38128',
              date: '12 Mar at 3:00 PM',
              notif_by: 'Martin Wade',
              amount: 32,
              type: 'refund',
            },
            {
              title: 'Payment deleted #38128',
              date: '12 Mar at 3:00 PM',
              notif_by: 'Martin Wade',
              amount: 41,
              type: 'delete',
            },
            {
              title: 'Payment added #38128',
              date: '12 Mar at 3:00 PM',
              notif_by: 'Martin Wade',
              amount: 41,
              type: 'add',
            },
          ],
          payments: [
            {
              id: 1,
              employee: 'Anika Kadir',
              method: 'Electronic Transfer',
              amount: 28,
              date: '18/12/2020',
              note: '',
              showNote: false,
              noteSaved: false,
            },
            {
              id: 2,
              employee: 'John Doe',
              method: 'Electronic Transfer',
              amount: 400,
              date: '02/12/2020',
              note: 'edited prices',
              showNote: true,
              noteSaved: true,
            },
          ],
        })
        return invoices
      })
      data.invoices = invoices
      setData({
        ...data,
        payments: financialPayments,
        items: financialItems,
        voidedPayments: financialVoidedPayments,
        statements: financialStatements,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice])

  const tabsProps = {
    ...financialInvoices,
    payments: financialPayments,
    items: financialItems,
    voidedPayments: financialVoidedPayments,
    statements: financialStatements,
  }
  return (
    <ClientCardLayout
      clientId={Number(router.query['id'])}
      activeTab="financial"
    >
      <TabMenu
        minHeight={'0vh'}
        tabPosition="top"
        menuItems={[`Invoices`, `Payments`, `Items`, `Voided`, `Statements`]}
      >
        <Invoices
          dataProps={tabsProps}
          invoiceEmployeeOptions={invoiceEmployeeOptions}
          locationOptions={locationOptions}
        />
        <Payments {...tabsProps} />
        <Items
          dataProps={tabsProps}
          invoiceEmployeeOptions={invoiceEmployeeOptions}
        />
        <Voided {...tabsProps} />
        <Statements dataProps={tabsProps} locationOptions={locationOptions} />
      </TabMenu>
    </ClientCardLayout>
  )
}

export default Appointments
