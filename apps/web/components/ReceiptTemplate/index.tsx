import React, { FC, useEffect, useState, useMemo } from 'react'
import { ReceiptTemplate, ITotalDetails } from '@pabau/ui'
import { getImage } from '../../../web/components/Uploaders/UploadHelpers/UploadHelpers'
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
  const [grandTotalData, setGrandTotalData] = useState<ITotalDetails>({
    enabled: 1,
    label: 'Grand total',
  })
  const [total, setTotal] = useState<ITotalDetails>({
    enabled: 1,
    label: 'total',
  })
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

  const activity = useMemo(() => {
    const data = templateData
      ? JSON.parse(templateData?.company?.InvoiceDefaultTemplate?.activity)
      : {}
    return data
  }, [templateData])

  useEffect(() => {
    let grand_total
    let total_data
    Object.keys(activity).map((key) => {
      if (key === 'totals') {
        Object.keys(activity?.totals).map((i) => {
          if (i === 'grand_total') {
            grand_total = activity?.totals[i]
          }
          return i
        })
      }
      if (key === 'total') {
        total_data = {
          enabled: activity?.[key].enabled,
          label: activity?.[key].label,
        }
      }
      return key
    })
    setTotal(total_data)
    setGrandTotalData(grand_total)
  }, [templateData, activity])

  return !invoice_loading && !template_loading ? (
    <ReceiptTemplate
      visible={true}
      grandTotal={grandTotalData}
      Total={total}
      logo={getImage(appearance?.logo)}
      title={templateData?.company?.InvoiceDefaultTemplate?.name}
      titleDescription={
        templateData?.company?.InvoiceDefaultTemplate?.description
      }
      clinicDetails={[
        {
          key: 0,
          website: templateData?.company?.website ?? '',
          email: templateData?.company?.info_email ?? '',
          phone: templateData?.company?.phone ?? '',
          regCompanyNo: paymentInfo?.registeredCompanyNumber,
          address: `${templateData?.company?.street}${
            templateData?.company?.city === ''
              ? ''
              : templateData?.company?.city
          }`,
          regCompanyAddress: paymentInfo?.registeredCompanyAddress ?? '',
          country: templateData?.company?.country ?? '',
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
          receipt: `#${salesDetails?.data?.details?.invoice_id ?? ''}`,
          issuedTo: salesDetails?.data?.details?.issue_to ?? '',
          issuedBy: salesDetails?.data?.details?.issue_by ?? '',
          paymentDate: `${new Date(
            salesDetails?.data?.payment_details.payment_time
          ).toLocaleDateString('en-GB')}`,
        },
      ]}
      paymentDetails={[
        {
          key: 0,
          paymentTime: salesDetails?.data?.payment_details.payment_time,
          paymentId: `#${salesDetails?.data?.details?.invoice_id ?? ''}`,
          totalPayment: salesDetails?.data?.payment_details.grand_total ?? 0,
          total: salesDetails?.data?.payment_details.total ?? 0,
          card: salesDetails?.data?.payment_details.card ?? 0,
          cash: salesDetails?.data?.payment_details.cash ?? 0,
          appliedToInvoice: salesDetails?.data?.payments?.payment_amount ?? 0,
        },
      ]}
    />
  ) : (
    <ReceiptTemplateSkeleton />
  )
}
