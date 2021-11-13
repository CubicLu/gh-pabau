import { useRouter } from 'next/router'
import {
  useBasicContactDetailsQuery,
  useGetMarketingSourcesQuery,
  useGetContactCustomFieldsQuery,
  useGetContactHeaderLazyQuery,
  useCreateOneContactNoteMutation,
  useUpdateOneContactNoteMutation,
  useDeleteOneContactNoteMutation,
  useCountClientActivityQuery,
  useUpdateOneCmContactMutation,
  useUpsertOneCmContactCustomMutation,
  useTotalInvoiceCountQuery,
  useCheckMedicalHistoryQuery,
  useAggregateAccountPaymentsQuery,
} from '@pabau/graphql'
import {
  ClientCard,
  TabItem,
  ClientNotes,
  Notification,
  NotificationType,
  BasicModal as Modal,
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
import { useUser } from '../../context/UserContext'
import Search from '../Search'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import useCompanyTimezoneDate from '../../hooks/useCompanyTimezoneDate'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

interface P
  extends Omit<ComponentPropsWithoutRef<typeof ClientCard>, 'client'> {
  clientId: number
  cssClass?: string
}

export const ClientCardLayout: FC<P> = ({
  clientId,
  children,
  activeTab,
  cssClass,
}) => {
  const baseUrl = `/clients/${clientId}` //TODO: we should use relative url instead. But not sure how
  const router = useRouter()
  const { data: countActivities } = useCountClientActivityQuery({
    variables: { contactID: clientId },
    skip: !clientId,
  })

  const { data: countInvoice } = useTotalInvoiceCountQuery({
    variables: { contactID: clientId },
    skip: !clientId,
  })

  const { data: invAmount } = useAggregateAccountPaymentsQuery({
    variables: { contactID: clientId },
    skip: !clientId,
  })

  const { t } = useTranslationI18()
  const { me } = useUser()
  const { timezoneDate } = useCompanyTimezoneDate()
  const [customField, setCustomField] = useState([])
  const [contactData, setContactData] = useState<ClientNotes>({
    notes: [],
    count: 0,
    loading: true,
    appointments: [],
  })
  const [basicContactData, setBasicContactData] = useState(null)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [deleteNoteId, setDeleteNoteId] = useState<number>(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const user = useUser()

  const [addClientNote] = useCreateOneContactNoteMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.notes.clientnote.create')
      )
    },
  })

  const [editMutation] = useUpdateOneContactNoteMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.notes.clientnote.edit')
      )
    },
  })

  const [deleteMutation] = useDeleteOneContactNoteMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.notes.clientnote.delete')
      )
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
    fetchPolicy: 'no-cache',
    ...getQueryVariables,
  })

  const [
    getContactDetails,
    {
      data: contactDetails,
      loading: notesCountLoading,
      refetch: getContactHeaderRefetch,
    },
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

  const { data: medicalHistoryData } = useCheckMedicalHistoryQuery({
    ssr: false,
    skip: !router.query['id'],
    variables: {
      contactID: clientId,
    },
  })
  const [updatebasicContactMutation] = useUpdateOneCmContactMutation()
  const [updateContactCustomMutation] = useUpsertOneCmContactCustomMutation()

  useEffect(() => {
    if (customFieldData && data?.findFirstCmContact?.customField) {
      let customFields = customFieldData.custom
        .map((thread) => {
          return {
            id: thread.id,
            category: thread.name,
            fields: thread.ManageCustomField.filter(
              (thread) => thread.is_active
            ),
          }
        })
        .filter((thread) => thread.fields.length > 0)

      if (customFieldData.generalCustom.length > 0) {
        const generalCmFields = []
        for (const general of customFieldData.generalCustom) {
          if (
            general.field_type === 'bool' ||
            general.field_type === 'multiple' ||
            general.field_type === 'list'
          ) {
            if (general.ManageCustomFieldItem.length > 0) {
              generalCmFields.push(general)
            }
          } else {
            generalCmFields.push(general)
          }
        }
        customFields = [
          {
            id: 0,
            category: 'detail',
            fields: generalCmFields,
          },
          ...customFields,
        ]
      }

      if (customFields.length > 0) {
        const customFieldData = customFields.map((cmField) => {
          return {
            ...cmField,
            fields: cmField.fields.map((field) => {
              return {
                title: field.field_label,
                value:
                  data?.findFirstCmContact?.customField?.find(
                    (contactField) => contactField.id === field.id
                  )?.value || '',
                fieldName: `customField_${field.id}`,
                type: field.field_type,
                selectOptions: field.ManageCustomFieldItem.map(
                  (option) => option.item_label
                ),
                order: field.field_order,
              }
            }),
          }
        })
        setCustomField(customFieldData)
      }
    }
    if (data?.findFirstCmContact) {
      setContactData((item) => {
        return {
          ...item,
          notes: [],
          count: data?.findFirstCmContact?.contactNotes?.length || 0,
          loading: true,
          appointments: [],
        }
      })
      const contactDetails = {
        ...data?.findFirstCmContact,
        referredBy: data?.findFirstCmContact.marketingSource,
        isActive: data?.findFirstCmContact?.isActive,
        country:
          data?.findFirstCmContact?.country ||
          data?.findFirstCmContact?.Company?.details?.country,
      }
      delete contactDetails?.contactNotes
      delete contactDetails?.bookingNotes
      setBasicContactData(contactDetails)
    }
  }, [customFieldData, data])

  const handleAddNewClientNote = async (note: string) => {
    const noteBody = {
      Note: note,
      CreatedDate: timezoneDate() || dayjs().utc().format(),
      User: { connect: { id: me?.user } },
      CmContact: { connect: { ID: clientId } },
    }
    await addClientNote({
      variables: { data: noteBody },
    })
    getContactHeaderRefetch()
  }
  const handleEditNote = async (id, note) => {
    await editMutation({
      variables: { where: { ID: id }, data: { Note: { set: note } } },
    })
    getContactHeaderRefetch()
  }

  const handleDeleteNote = async (id) => {
    setOpenDeleteModal((val) => !val)
    setDeleteNoteId(id)
  }

  const tabItems: readonly TabItem[] = [
    { key: 'dashboard', name: 'Dashboard', count: 123, tags: undefined },
    { key: 'appointments', name: 'Appointments' },
    {
      key: 'financial',
      name: 'Financials',
      count: countInvoice?.total ?? 0,
      tags: [
        {
          tag: invAmount?.totalInv?.total_amount?.inv_total,
          color: 'green',
        },
      ],
    },
    { key: 'packages', name: 'Packages' },
    { key: 'communications', name: 'Communications' },
    {
      key: 'emr',
      name: 'EMR',
      childTabs: [
        { key: 'forms', name: 'Forms' },
        { key: 'photos', name: 'Photos' },
        { key: 'prescription', name: 'Prescription' },
        { key: 'documents', name: 'Documents' },
      ],
    },
    { key: 'gift-vouchers', name: 'Gift Vouchers' },
    { key: 'loyalty', name: 'Loyalty' },
    {
      key: 'activities',
      name: 'Activities',
      count: countActivities?.findManyActivityCount,
    },

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

  const handleEditAll = () => {
    setOpenEditModal(true)
  }

  const handleEditAllSubmit = () => {
    setOpenEditModal(false)
    refetch()
  }

  const handleDeleteSubmit = async () => {
    if (deleteNoteId) {
      setOpenDeleteModal((val) => !val)
      await deleteMutation({
        variables: {
          where: { ID: deleteNoteId },
        },
      })
      getContactHeaderRefetch()
    }
  }

  return (
    <Layout>
      <ClientCard
        cssClass={cssClass}
        onClose={() => router.back()}
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
        updatebasicContactMutation={updatebasicContactMutation}
        updateContactCustomMutation={updateContactCustomMutation}
        clientId={clientId}
        companyId={user?.me?.company}
        client={
          basicContactData
            ? ({
                ...basicContactData,
                fullName: `${basicContactData?.firstName}
                  ${basicContactData?.lastName}`,
                avatar: basicContactData?.avatar
                  ? getImage(basicContactData?.avatar)
                  : '',
                phone: {
                  mobile: basicContactData?.mobile,
                  home: basicContactData?.home,
                },
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
                  data?.findFirstCmContact?.labelData?.map((data) => {
                    return {
                      label: data?.labelDetail?.label,
                      color: data?.labelDetail?.color,
                    }
                  }) || [],
              } as any) //@@@ TODO: remove this any, and fill in the missing fields!
            : undefined
        }
        notes={contactData}
        medicalHistoryIconStatus={medicalHistoryData?.form?.status}
        getContactDetails={getContactDetails}
        handleAddNewClientNote={handleAddNewClientNote}
        handleEditNote={handleEditNote}
        handleDeleteNote={handleDeleteNote}
        setBasicContactData={setBasicContactData}
        searchRender={() => (
          <Search
            isHideLead={true}
            placeHolder={t('search.client.placeholder')}
          />
        )}
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
          handleSubmit={handleEditAllSubmit}
          contactId={clientId}
        />
      )}
      <Modal
        modalWidth={682}
        centered={true}
        visible={openDeleteModal}
        onCancel={() => setOpenDeleteModal((val) => !val)}
        onOk={() => handleDeleteSubmit()}
        newButtonText={t('clients.content.delete.confirm.yes')}
        title={t('clients.clientcard.notes.clientnote.deletemodal.title')}
      >
        <span
          style={{
            fontFamily: 'Circular-Std-Book',
            fontWeight: 'normal',
            fontSize: '16px',
            lineHeight: '20px',
            color: '#9292A3',
          }}
        >
          {t('clients.clientcard.notes.clientnote.deletemodal.content')}
        </span>
      </Modal>
    </Layout>
  )
}
