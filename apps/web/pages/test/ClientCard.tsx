import React, { FC, useState } from 'react'
import { ClientCard as ClientCardComponent, Button } from '@pabau/ui'
import {
  searchResults,
  notes,
  clientData,
  financialInvoices,
  financialPayments,
  financialItems,
  financialVoidedPayments,
  financialStatements,
  invoiceEmployeeOptions,
  locationOptions,
} from './ClientCardMock'
import { ClientFinancialsLayout } from './../../components/ClientCard/client-financial-layout/ClientFinancialsLayout'
import { useTranslation } from 'react-i18next'
import { Invoices } from './../../components/ClientCard/client-financial-layout/invoices/Invoices'
import { Payments } from './../../components/ClientCard/client-financial-layout/payments/Payments'
import { Items } from './../../components/ClientCard/client-financial-layout/items/Items'
import { Voided } from './../../components/ClientCard/client-financial-layout/voided/Voided'
import { Statements } from './../../components/ClientCard/client-financial-layout/statements/Statements'

const ClientCard: FC = () => {
  const { t } = useTranslation('common')
  const [show, setShow] = useState(true)
  const [medicalConditions] = useState(['Anxiety'])

  const tabsProps = {
    ...financialInvoices,
    payments: financialPayments,
    items: financialItems,
    voidedPayments: financialVoidedPayments,
    statements: financialStatements,
  }

  return (
    <>
      <ClientCardComponent
        visible={show}
        onClose={() => setShow((show) => !show)}
        clientData={clientData}
        notes={notes}
        searchResults={searchResults}
        medicalConditions={medicalConditions}
        alerts={[]}
        FinancialTabComponent={
          <ClientFinancialsLayout
            tabLabels={[
              t('ui.client-card-financial.invoices'),
              t('ui.client-card-financial.payments'),
              t('ui.client-card-financial.items'),
              t('ui.client-card-financial.voided'),
              t('ui.client-card-financial.statements'),
            ]}
            {...tabsProps}
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
            <Statements {...tabsProps} />
          </ClientFinancialsLayout>
        }
      />
      {!show && (
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button type="primary" onClick={() => setShow((show) => !show)}>
            Show Client Card
          </Button>
        </div>
      )}
    </>
  )
}

export default ClientCard
