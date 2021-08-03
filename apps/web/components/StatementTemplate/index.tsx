import React, { FC, useEffect, useState, useMemo } from 'react'
import { StatementTemplate, ICol } from '@pabau/ui'
import { getImage } from '../../../web/components/Uploaders/UploadHelpers/UploadHelpers'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { StatementTemplateSkeleton } from './skeleton'
import {
  GetInvoiceTemplateDocument,
  GetStatementDataDocument,
} from '@pabau/graphql'

interface IStatement {
  statementPeriodFrom?: string
  statementPeriodTo?: string
  customerId: number
  locationId?: number
}

export const StatementTemplates: FC<IStatement> = ({
  statementPeriodFrom,
  statementPeriodTo,
  customerId,
  locationId,
}) => {
  const [columnData, setColumnData] = useState<ICol[]>()

  const { data: statementData, loading: statementLoading } = useQuery(
    GetStatementDataDocument,
    {
      variables: {
        locationId: locationId,
        customerId: customerId,
        statementPeriodFrom: statementPeriodFrom,
        statementPeriodTo: statementPeriodTo,
      },
    }
  )
  const { data: templateData, loading: templateLoading } = useQuery(
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
    const sale_columns = []
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
      setColumnData(sale_columns)
      return key
    })
  }, [templateData, activity])
  return !statementLoading && !templateLoading ? (
    <div>
      <StatementTemplate
        visible={true}
        totals={activity?.totals}
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
            address: `${templateData?.company?.street ?? ''}${
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
        statementDetails={[
          {
            key: 0,
            statementInvoice: `#${dayjs().format('DDMMYYYY')}`,
            issuedTo: statementData?.data?.details?.issue_to ?? '',
            issuedBy: statementData?.data?.details?.issue_by ?? '',
            statementDate: dayjs().format('DD/MM/YYYY'),
            statementPeriodFrom: dayjs(statementPeriodFrom).format(
              'DD/MM/YYYY'
            ),
            statementPeriodTo: dayjs(statementPeriodTo).format('DD/MM/YYYY'),
          },
        ]}
        columns={columnData}
        salesData={statementData?.data?.items}
        paymentDetails={[
          {
            key: statementData?.data?.payments.key,
            totalVat: statementData?.data?.payments.total_vat,
            amountPaid: statementData?.data?.payments.amount_paid,
            subTotalAmount: statementData?.data?.payments.sub_total_amount,
            outstanding: statementData?.data?.payments.outstanding,
            grandTotal: statementData?.data?.payments.grand_total,
            paid: statementData?.data?.payments.paid,
            refundAmount: statementData?.data?.payments.refund_amount,
            totalNet: statementData?.data?.payments.total_net,
          },
        ]}
      />
    </div>
  ) : (
    <StatementTemplateSkeleton />
  )
}
