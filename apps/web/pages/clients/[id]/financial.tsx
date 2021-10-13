import React from 'react'
import { useRouter } from 'next/router'
import { TabMenu } from '@pabau/ui'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { Invoices } from '../../../components/ClientCard/client-financial-layout/invoices/Invoices'
import { Payments } from '../../../components/ClientCard/client-financial-layout/payments/Payments'
import { Items } from '../../../components/ClientCard/client-financial-layout/items/Items'
import { Voided } from '../../../components/ClientCard/client-financial-layout/voided/Voided'
import { Statements } from '../../../components/ClientCard/client-financial-layout/statements/Statements'
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
