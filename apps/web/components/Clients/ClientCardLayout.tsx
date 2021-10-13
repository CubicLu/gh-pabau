import { useRouter } from 'next/router'
import {
  useBasicContactDetailsQuery,
  useGetMarketingSourcesQuery,
  useGetContactCustomFieldsQuery,
  useGetContactHeaderLazyQuery,
  useGetClientNotesCountQuery,
} from '@pabau/graphql'
import { ClientCard, TabItem } from '@pabau/ui'
import React, {
  ComponentPropsWithoutRef,
  FC,
  useEffect,
  useState,
  useMemo,
} from 'react'
import Layout from '../Layout/Layout'
import { getImage } from '../../components/Uploaders/UploadHelpers/UploadHelpers'
import { GetFormat } from '../../hooks/displayDate'

interface P
  extends Omit<ComponentPropsWithoutRef<typeof ClientCard>, 'client'> {
  clientId: number
}

export const ClientCardLayout: FC<P> = ({ clientId, children, activeTab }) => {
  const baseUrl = `/clients/${clientId}` //TODO: we should use relative url instead. But not sure how
  const router = useRouter()
  const [customField, setCustomField] = useState([])
  const [contactData, setContactData] = useState(null)
  const [notesCountData, setNotesCountData] = useState(null)

  const getQueryVariables = useMemo(() => {
    return {
      variables: { id: clientId },
    }
  }, [clientId])

  const { data, loading } = useBasicContactDetailsQuery({
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

  const { data: referredByOptions } = useGetMarketingSourcesQuery({
    skip: !router.query['id'],
  })

  const {
    data: customFieldData,
    loading: customFieldLoading,
  } = useGetContactCustomFieldsQuery({
    skip: !router.query['id'],
  })

  useEffect(() => {
    if (customFieldData && data?.findFirstCmContact) {
      const customFields = customFieldData.custom
        .flatMap((thread) =>
          thread?.ManageCustomField?.filter((thread) => thread.is_active)
        )
        .filter((thread) => thread)

      if (customFieldData.generalCustom.length > 0) {
        for (const general of customFieldData.generalCustom) {
          if (
            general.field_type === 'bool' ||
            general.field_type === 'multiple' ||
            general.field_type === 'list'
          ) {
            if (general?.ManageCustomFieldItem?.length > 0) {
              customFields.push(general)
            }
          } else {
            customFields.push(general)
          }
        }
      }

      if (customFields.length > 0) {
        const final = customFields.map((fields) => {
          return {
            title: fields.field_label,
            value:
              data?.findFirstCmContact?.customField?.find(
                (contactField) => contactField.id === fields.id
              )?.value || '',
            fieldName: `customField_${fields.id}`,
            type: fields.field_type,
            selectOptions: fields.ManageCustomFieldItem.map(
              (option) => option.item_label
            ),
          }
        })
        setCustomField(final)
      }
    }
  }, [customFieldData, data])

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
        referredByOptions={referredByOptions?.findManyMarketingSource}
        loading={loading || customFieldLoading || !router.query['id']}
        customFields={customField}
        dateFormat={GetFormat()}
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
