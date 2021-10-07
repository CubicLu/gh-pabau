import { useRouter } from 'next/router'
import { useState, useMemo, useEffect } from 'react'
import {
  useBasicContactDetailsQuery,
  useGetContactHeaderLazyQuery,
  useGetClientNotesCountQuery,
} from '@pabau/graphql'
import { ClientCard, TabItem } from '@pabau/ui'
import React, { ComponentPropsWithoutRef, FC } from 'react'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import Layout from '../Layout/Layout'

interface P
  extends Omit<ComponentPropsWithoutRef<typeof ClientCard>, 'client'> {
  clientId: number
}

export const ClientCardLayout: FC<P> = ({ clientId, children, activeTab }) => {
  const baseUrl = `/clients/${clientId}` //TODO: we should use relative url instead. But not sure how
  const router = useRouter()
  const [contactData, setContactData] = useState(null)
  const [notesCountData, setNotesCountData] = useState(null)

  const getQueryVariables = useMemo(() => {
    return {
      variables: { id: clientId },
    }
  }, [clientId])

  const { data } = useBasicContactDetailsQuery({
    skip: !router.query['id'],
    ssr: false,
    ...getQueryVariables,
  })

  const { data: countData } = useGetClientNotesCountQuery({
    skip: !router.query['id'],
    ssr: false,
    ...getQueryVariables,
  })

  const [
    getContactDetails,
    { data: contactDetails, loading: notesCountLoading },
  ] = useGetContactHeaderLazyQuery({
    ssr: false,
    ...getQueryVariables,
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

  useEffect(() => {
    if (contactDetails?.notes) {
      setContactData(() => {
        return {
          notes: getContactNotesWithUrl(contactDetails?.notes?.contact),
          appointments: getContactNotesWithUrl(
            contactDetails?.notes?.appointment
          ),
        }
      })
    }
  }, [contactDetails])

  useEffect(() => {
    if (countData?.count) {
      setNotesCountData(() => {
        return {
          notes: countData?.count?.notes?.length || 0,
          appointments: countData?.count?.appointments?.length || 0,
        }
      })
    }
  }, [countData])

  const getContactNotesWithUrl = (notes) => {
    return notes?.map((item) => {
      return {
        ...item,
        user: {
          ...item?.user,
          avatar: item?.user?.avatar && getImage(item?.user?.avatar),
        },
      }
    })
  }

  return (
    <Layout>
      <ClientCard
        onClose={() => router.push('/clients')}
        tabs={tabItems}
        activeTab={activeTab}
        onTabChanged={(key) =>
          router.push(key === 'dashboard' ? baseUrl : `${baseUrl}/${key}`)
        }
        client={
          data
            ? ({
                fullName:
                  data?.findFirstCmContact.Fname +
                  ' ' +
                  data?.findFirstCmContact.Lname,
                gender: data?.findFirstCmContact.gender,
                phone: '',
                relationships: [],
                labels: [],
              } as any) //@@@ TODO: remove this any, and fill in the missing fields!
            : undefined
        }
        notes={contactData}
        notesCount={notesCountData}
        notesCountLoading={notesCountLoading}
        getContactDetails={getContactDetails}
      >
        {children}
      </ClientCard>
    </Layout>
  )
}
