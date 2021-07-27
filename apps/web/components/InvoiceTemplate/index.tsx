import React, { FC, useState, useEffect } from 'react'
import { InvoiceTemplate, ICol } from '@pabau/ui'
import { getImage } from '../../../web/helper/cdn/imageUrl'
import { useQuery } from '@apollo/client'
import InvoiceSkeleton from './skeleton'
import {
  GetInvoiceDataDocument,
  GetInvoiceTemplateDocument,
} from '@pabau/graphql'

interface InvoiceProps {
  guid?: string
  saleId?: number
}

export const InvoiceTemplates: FC<InvoiceProps> = ({ guid, saleId }) => {
  const [columnData, setColumnData] = useState<ICol[]>()
  const [paymentColumnData, setPaymentColumnData] = useState<ICol[]>()
  const { data: salesDetails, loading: invoice_loading } = useQuery(
    GetInvoiceDataDocument,
    {
      variables: {
        guid: guid,
        saleId: saleId,
      },
    }
  )

  const { data: templateData, loading: template_loading } = useQuery(
    GetInvoiceTemplateDocument
  )

  const paymentInfo = templateData
    ? JSON.parse(
        templateData?.company?.InvoiceDefaultTemplate?.payment_information
      )
    : {}

  const appearance = templateData
    ? JSON.parse(templateData?.company?.InvoiceDefaultTemplate?.appearance)
    : {}

  const activity = templateData
    ? JSON.parse(templateData?.company?.InvoiceDefaultTemplate?.activity)
    : {}

  useEffect(() => {
    const sale_columns = []
    const payment_columns = []
    Object.keys(activity).map((key) => {
      if (
        key !== 'totals' &&
        key !== 'payments' &&
        activity[key].enabled === 1
      ) {
        if (key === 'practitioner') {
          sale_columns[activity[key].order - 1] = {
            key: key,
            title: 'Employee Name',
            dataIndex: key,
          }
        } else {
          sale_columns[activity[key].order - 1] = {
            key: key,
            title: activity[key].label,
            dataIndex: key,
          }
        }
      }

      if (key === 'payments') {
        Object.keys(activity[key]).map((item) => {
          if (activity[key][item].enabled === 1) {
            payment_columns.push({
              dataIndex: item,
              key: item,
              title: activity[key][item].label,
            })
          }
          return item
        })
      }
      setColumnData(sale_columns)
      setPaymentColumnData(payment_columns)
      return key
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData])

  return !invoice_loading && !template_loading ? (
    <InvoiceTemplate
      visible={true}
      totals={activity?.totals}
      title={templateData?.company?.InvoiceDefaultTemplate?.name}
      logo={getImage(appearance?.logo)}
      titleDescription={
        templateData?.company?.InvoiceDefaultTemplate?.description
      }
      columns={columnData}
      salesData={salesDetails?.getInvoiceData?.items}
      paymentColumns={paymentColumnData}
      paymentData={salesDetails?.getInvoiceData?.payments}
      clinicDetails={[
        {
          key: 0,
          website:
            templateData?.company?.InvoiceDefaultTemplate?.CompanyDetails
              ?.website ?? '',
          email:
            templateData?.company?.InvoiceDefaultTemplate?.CompanyDetails
              ?.info_email ?? '',
          phone:
            templateData?.company?.InvoiceDefaultTemplate?.CompanyDetails
              ?.phone ?? '',
          regCompanyNo: paymentInfo?.registeredCompanyNumber,
          address: `${
            templateData?.company?.InvoiceDefaultTemplate?.CompanyDetails
              ?.street
          }${
            templateData?.company?.InvoiceDefaultTemplate?.CompanyDetails
              ?.city === ''
              ? ''
              : templateData?.company?.InvoiceDefaultTemplate?.CompanyDetails
                  ?.city
          }`,
          regCompanyAddress: paymentInfo?.registeredCompanyAddress ?? '',
          country:
            templateData?.company?.InvoiceDefaultTemplate?.CompanyDetails
              ?.country ?? '',
          account: paymentInfo?.bankAccount ?? '',
          accountNumber: paymentInfo?.bankNumber ?? '',
          sortCode: paymentInfo?.sortCode ?? '',
          bankName: paymentInfo?.bankName ?? '',
          iban: paymentInfo?.iban ?? '',
          swift: paymentInfo?.swift ?? '',
        },
      ]}
      invoiceDetails={[
        {
          key: 0,
          invoice: salesDetails?.getInvoiceData?.details?.invoice_id ?? '',
          issuedTo: salesDetails?.getInvoiceData?.details?.issue_to ?? '',
          issuedBy: salesDetails?.getInvoiceData?.details?.issue_by ?? '',
          date: `${new Date(
            templateData?.company?.InvoiceDefaultTemplate?.date_created
          ).toLocaleDateString('en-GB')}`,
        },
      ]}
      paymentDetails={[
        {
          key: salesDetails?.getInvoiceData?.payment_details.key,
          totalVat: salesDetails?.getInvoiceData?.payment_details.total_vat,
          amountPaid: salesDetails?.getInvoiceData?.payment_details.amount_paid,
          subTotalAmount:
            salesDetails?.getInvoiceData?.payment_details.sub_total_amount,
          outstanding:
            salesDetails?.getInvoiceData?.payment_details.outstanding,
          grandTotal: salesDetails?.getInvoiceData?.payment_details.grand_total,
          paymentTime:
            salesDetails?.getInvoiceData?.payment_details.payment_time,
          total: salesDetails?.getInvoiceData?.payment_details.total,
          card: salesDetails?.getInvoiceData?.payment_details.card,
          cash: salesDetails?.getInvoiceData?.payment_details.cash,
          paid: salesDetails?.getInvoiceData?.payment_details.paid,
          refundAmount:
            salesDetails?.getInvoiceData?.payment_details.refund_amount,
          totalNet: salesDetails?.getInvoiceData?.payment_details.total_net,
        },
      ]}
    />
  ) : (
    <InvoiceSkeleton />
  )
}
