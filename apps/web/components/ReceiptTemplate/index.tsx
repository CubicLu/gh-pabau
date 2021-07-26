import React, { FC } from 'react'
import { ReceiptTemplate } from '@pabau/ui'
import { getImage } from '../../../web/helper/cdn/imageUrl'
import { useQuery } from '@apollo/client'
import { ReceiptTemplateSkeleton } from './skeleton'
import {
  GetInvoiceDataDocument,
  GetInvoiceTemplateDocument,
} from '@pabau/graphql'

interface ReceiptProps {
  guid?: string
  saleId?: number
}

export const ReceiptTemplates: FC<ReceiptProps> = ({ guid, saleId }) => {
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

  return !invoice_loading && !template_loading ? (
    <ReceiptTemplate
      visible={true}
      logo={getImage(appearance?.logo)}
      title={templateData?.company?.InvoiceDefaultTemplate?.name}
      titleDescription={
        templateData?.company?.InvoiceDefaultTemplate?.description
      }
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
      receiptDetails={[
        {
          key: 0,
          receipt: `#${
            salesDetails?.getInvoiceData?.details?.invoice_id ?? ''
          }`,
          issuedTo: salesDetails?.getInvoiceData?.details?.issue_to ?? '',
          issuedBy: salesDetails?.getInvoiceData?.details?.issue_by ?? '',
          paymentDate: `${new Date(
            salesDetails?.getInvoiceData?.payment_details.payment_time
          ).toLocaleDateString('en-GB')}`,
        },
      ]}
      paymentDetails={[
        {
          key: 0,
          paymentTime:
            salesDetails?.getInvoiceData?.payment_details.payment_time,
          paymentId: `#${
            salesDetails?.getInvoiceData?.details?.invoice_id ?? ''
          }`,
          totalPayment:
            salesDetails?.getInvoiceData?.payment_details.grand_total ?? 0,
          total: salesDetails?.getInvoiceData?.payment_details.total ?? 0,
          card: salesDetails?.getInvoiceData?.payment_details.card ?? 0,
          cash: salesDetails?.getInvoiceData?.payment_details.cash ?? 0,
          appliedToInvoice:
            salesDetails?.getInvoiceData?.payments?.payment_amount ?? 0,
        },
      ]}
    />
  ) : (
    <ReceiptTemplateSkeleton />
  )
}
