import { useRouter } from 'next/router'
import {
  useBasicContactDetailsQuery,
  useGetMarketingSourcesQuery,
  useGetContactCustomFieldsQuery,
  useGetContactHeaderLazyQuery,
  useCreateOneContactNoteMutation,
  GetContactHeaderDocument,
} from '@pabau/graphql'
import {
  ClientCard,
  TabItem,
  ClientNotes,
  Notification,
  NotificationType,
} from '@pabau/ui'
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
import ClientCreate from '../Clients/ClientCreate'
import { getRealIp } from '../../helper/getRealIp'
import { useUser } from '../../context/UserContext'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

interface P
  extends Omit<ComponentPropsWithoutRef<typeof ClientCard>, 'client'> {
  clientId: number
}

export const ClientCardLayout: FC<P> = ({ clientId, children, activeTab }) => {
  const baseUrl = `/clients/${clientId}` //TODO: we should use relative url instead. But not sure how
  const router = useRouter()
  const { me } = useUser()
  const [customField, setCustomField] = useState([])
  const [contactData, setContactData] = useState<ClientNotes>({
    notes: [],
    count: 0,
    loading: true,
    appointments: [],
  })
  const [basicContactData, setBasicContactData] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [addMutation] = useCreateOneContactNoteMutation({
    onCompleted() {
      Notification(NotificationType.success, 'Successfully created the note')
    },
    onError() {
      Notification(NotificationType.error, 'Error occured while creating note')
    },
  })

  const getQueryVariables = useMemo(() => {
    return {
      variables: { id: clientId },
    }
  }, [clientId])

  const { data, loading, refetch } = useBasicContactDetailsQuery({
    skip: !router.query['id'],
    ssr: false,
    notifyOnNetworkStatusChange: true,
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
    if (customFieldData && data?.findFirstCmContact?.customField) {
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
    if (data?.findFirstCmContact) {
      setContactData((item) => {
        return {
          ...item,
          notes: [],
          count:
            data?.findFirstCmContact?.contactNotes?.length +
              data?.findFirstCmContact?.bookingNotes?.length || 0,
          loading: true,
          appointments: [],
        }
      })
      const contactDetails = { ...data?.findFirstCmContact }
      delete contactDetails?.contactNotes
      delete contactDetails?.bookingNotes
      setBasicContactData(contactDetails)
    }
  }, [customFieldData, data])

  const handleAddNewClientNote = async (note) => {
    const ipAddress = await getRealIp()
    if (ipAddress) {
      const noteBody = {
        Note: note,
        IpAddress: ipAddress + '',
        // CreatedDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        CreatedDate: dayjs
          .tz(dayjs(), me?.companyTimezone)
          .format('YYYY-MM-DD HH:mm:ss'),
        // CreatedDate: dayjs.tz(dayjs(), 'Europe/Kaliningrad').format(''),
        User: { connect: { id: me?.user } },
        CmContact: { connect: { ID: clientId } },
      }
      await addMutation({
        variables: { data: noteBody },
        refetchQueries: [
          {
            query: GetContactHeaderDocument,
            ...getQueryVariables,
          },
        ],
      })
    }
  }

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
      setContactData((item) => {
        return {
          ...item,
          loading: notesCountLoading,
          notes: contactDetails?.notes?.contact,
          appointments: contactDetails?.notes?.appointment,
        }
      })
    }
  }, [contactDetails, notesCountLoading])
<<<<<<< HEAD

=======
>>>>>>> 2c7d4435d1bfc54ef009c5b72559174f3bb66c35
  const handleEditAll = () => {
    setOpenEditModal(true)
  }

  const handleEditSubmit = () => {
    setOpenEditModal(false)
    refetch()
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
        handleEditAll={handleEditAll}
        client={
          basicContactData
            ? ({
                ...basicContactData,
                fullName: `${basicContactData?.firstName}
                  ${basicContactData?.lastName}`,
                referredBy: basicContactData?.marketingSource?.name,
                avatar: basicContactData?.avatar
                  ? getImage(basicContactData?.avatar)
                  : '',
                phone: {
                  mobile: basicContactData?.mobile,
                  home: basicContactData?.home,
                },
                isActive:
                  data.findFirstCmContact?.isActive === 1 ? true : false,
                address: [
                  basicContactData?.street,
                  basicContactData?.city,
                  basicContactData?.county,
                  basicContactData?.postCode,
                  basicContactData?.country,
                ]
                  .filter((val) => val?.trim())
                  .join(', '),
                relationships: [],
                labels:
                  data.findFirstCmContact?.labelData?.map((data) => {
                    return {
                      label: data?.labelDetail?.label,
                      color: data?.labelDetail?.color,
                    }
                  }) || [],
              } as any) //@@@ TODO: remove this any, and fill in the missing fields!
            : undefined
        }
        notes={contactData}
        getContactDetails={getContactDetails}
        handleAddNewClientNote={handleAddNewClientNote}
      >
        {children}
      </ClientCard>
      {openEditModal && (
        <ClientCreate
          modalVisible={openEditModal}
          handleClose={() => {
            setOpenEditModal(false)
          }}
          isEdit={openEditModal}
          handleSubmit={handleEditSubmit}
          contactId={clientId}
        />
      )}
    </Layout>
  )
}
