import { useRouter } from 'next/router'
import {
  useBasicContactDetailsQuery,
  useGetMarketingSourcesQuery,
} from '@pabau/graphql'
import { ClientCard, TabItem } from '@pabau/ui'
import React, { ComponentPropsWithoutRef, FC } from 'react'
import Layout from '../Layout/Layout'
import { getImage } from '../../components/Uploaders/UploadHelpers/UploadHelpers'

interface P
  extends Omit<ComponentPropsWithoutRef<typeof ClientCard>, 'client'> {
  clientId: number
}

export const ClientCardLayout: FC<P> = ({ clientId, children, activeTab }) => {
  const baseUrl = `/clients/${clientId}` //TODO: we should use relative url instead. But not sure how
  const router = useRouter()

  const { data, loading } = useBasicContactDetailsQuery({
    skip: !router.query['id'],
    ssr: false,
    variables: { id: clientId },
  })

  const { data: referredByOptions } = useGetMarketingSourcesQuery({
    skip: !router.query['id'],
  })

  const tabItems: readonly TabItem[] = [
    { key: 'dashboard', name: 'Dashboard', count: 123, tags: undefined },
    { key: 'appointments', name: 'Appointments' },
    { key: 'financial', name: 'Financials' },
    { key: 'packages', name: 'Packages' },
    { key: 'communications', name: 'Communications' },
    { key: 'emr', name: 'EMR' },
    { key: 'gift-vouchers', name: 'Gift Vouchers' },
    { key: 'loyalty', name: 'Loyalty' },
    { key: 'activities', name: 'Activities' },

    // {
    //   key: 2,
    //   content: customTabMenutItem('Financials', 5, 200),
    // },
    // {
    //   key: 3,
    //   content: customTabMenutItem('Packages', 8),
    // },
    // {
    //   key: 4,
    //   content: customTabMenutItem('Communications', 2),
    // },
    // {
    //   key: 5,
    //   content: 'EMR',
    //   children: [
    //     {
    //       key: 5,
    //       content: 'Medical History',
    //     },
    //     {
    //       key: 6,
    //       content: 'Treatment Notes',
    //     },
    //     {
    //       key: 7,
    //       content: 'Photos',
    //     },
    //     {
    //       key: 8,
    //       content: 'Prescriptions',
    //     },
    //     {
    //       key: 9,
    //       content: 'Lab Tests',
    //     },
    //     {
    //       key: 10,
    //       content: 'Vaccine History',
    //     },
    //   ],
    // },
    // {
    //   key: 11,
    //   content: customTabMenutItem('Gift voucher', 15),
    // },
    // {
    //   key: 12,
    //   content: customTabMenutItem('Loyalty', 7),
    // },
    // {
    //   key: 13,
    //   content: customTabMenutItem('Activities', 8),
    // },
  ] as const

  return (
    <Layout>
      <ClientCard
        onClose={() => router.push('/clients')}
        tabs={tabItems}
        activeTab={activeTab}
        onTabChanged={(key) =>
          router.push(key === 'dashboard' ? baseUrl : `${baseUrl}/${key}`)
        }
        referredByOptions={referredByOptions?.findManyMarketingSource}
        loading={loading || !router.query['id']}
        client={
          data?.findFirstCmContact
            ? ({
                ...data.findFirstCmContact,
                fullName: `${data.findFirstCmContact.firstName}
                  ${data.findFirstCmContact.lastName}`,
                referredBy: data.findFirstCmContact.marketingSource?.name,
                avatar: data.findFirstCmContact.avatar
                  ? getImage(data.findFirstCmContact.avatar)
                  : '',
                phone: {
                  mobile: data.findFirstCmContact.mobile,
                  home: data.findFirstCmContact.home,
                },
                address: [
                  data.findFirstCmContact.street,
                  data.findFirstCmContact.city,
                  data.findFirstCmContact.county,
                  data.findFirstCmContact.postCode,
                  data.findFirstCmContact.country,
                ]
                  .filter((val) => val?.trim())
                  .join(', '),
                relationships: [],
                labels: data.findFirstCmContact.labelData.map((data) => {
                  return {
                    label: data.labelDetail.label,
                    color: data.labelDetail.color,
                  }
                }),
              } as any) //@@@ TODO: remove this any, and fill in the missing fields!
            : undefined
        }
      >
        {children}
      </ClientCard>
    </Layout>
  )
}
