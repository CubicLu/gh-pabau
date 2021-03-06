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
  useGetClientFormsCountQuery,
  useGetClientPhotoCountQuery,
  useGetClientDocumentCountQuery,
  useGetContactAccountBalanceQuery,
  useCountVouchersQuery,
  useGetStaffAlertsLazyQuery,
  useUpdateContactAlertWithTagsMutation,
  GetStaffAlertsQuery,
  useCountClientAppointmentsQuery,
  AggregateInvoiceCountsDocument,
  GetStaffAlertsDocument,
  useDeleteContactAlertWithTagsMutation,
  useCountClientCommunicationQuery,
  useCreateContactAlertWithTagsMutation,
  Cm_Contact_Alerts_Status,
  useGetCmLabelsLazyQuery,
  useUpdateContactLableMutation,
} from '@pabau/graphql'
import {
  ClientCard,
  TabItem,
  ClientNotes,
  Notification,
  NotificationType,
  StaffAlerts,
} from '@pabau/ui'
import React, {
  ComponentPropsWithoutRef,
  FC,
  useEffect,
  useState,
  useMemo,
  createContext,
} from 'react'
import Layout from '../Layout/Layout'
import {
  getImage,
  ImgBlock,
} from '../../components/Uploaders/UploadHelpers/UploadHelpers'
import { useQuery } from '@apollo/client'
import { GetFormat } from '../../hooks/displayDate'
import ClientCreate from '../Clients/ClientCreate'
import { useUser } from '../../context/UserContext'
import Search from '../Search'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import useCompanyTimezoneDate from '../../hooks/useCompanyTimezoneDate'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import stringToCurrencySignConverter from '../../helper/stringToCurrencySignConverter'
import AvatarUploader from '../Uploaders/AvatarUploader/AvatarUploader'
import {
  updateClientNotesCount,
  NoteCountOperandType,
  updateStaffAlertCount,
} from './utils'
dayjs.extend(utc)
dayjs.extend(timezone)
interface P
  extends Omit<ComponentPropsWithoutRef<typeof ClientCard>, 'client'> {
  clientId: number
  cssClass?: string
}
interface ClientContextData {
  fullName: string
  avatar: string
  phone?: {
    mobile: string
    home: string
  }
}

export const ClientContext = createContext<ClientContextData>({
  fullName: null,
  avatar: null,
})

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
  const { data: countCommunition } = useCountClientCommunicationQuery({
    variables: { contactID: clientId },
    skip: !clientId,
  })
  const {
    data: countInvoice,
    loading: countInvoiceLoading,
  } = useTotalInvoiceCountQuery({
    variables: { contactID: clientId },
    skip: !clientId,
  })

  const { data: countVouchers } = useCountVouchersQuery({
    variables: { contactID: clientId },
    skip: !clientId,
  })

  const { data: invAmount } = useGetContactAccountBalanceQuery({
    variables: { contactID: clientId },
    skip: !clientId,
  })

  const { data: forms } = useGetClientFormsCountQuery({
    variables: {
      contactId: clientId,
    },
    skip: !clientId,
    fetchPolicy: 'network-only',
  })

  const { data: photos } = useGetClientPhotoCountQuery({
    variables: {
      contactId: clientId,
    },
    skip: !clientId,
    fetchPolicy: 'network-only',
  })

  const { data: documents } = useGetClientDocumentCountQuery({
    variables: {
      contactId: clientId,
    },
    skip: !clientId,
    fetchPolicy: 'network-only',
  })

  const { data: appointments } = useCountClientAppointmentsQuery({
    variables: { contactId: clientId },
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
  const [staffAlertData, setStaffAlertData] = useState<StaffAlerts>({
    alerts: [],
    count: 0,
    loading: true,
  })
  const [basicContactData, setBasicContactData] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false)
  const [medicalHistoryDetails, setMedicalHistoryDetails] = useState(null)
  const [outstanding, setOutstanding] = useState(0)
  const [accountBalance, setAccountBalance] = useState(0)
  const [contactLabels, setContactLabels] = useState([])

  const [addClientNote] = useCreateOneContactNoteMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.notes.clientnote.create')
      )
    },
  })

  const [editClientNote] = useUpdateOneContactNoteMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.notes.clientnote.edit')
      )
    },
  })

  const [deleteClientNote] = useDeleteOneContactNoteMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.notes.clientnote.delete')
      )
    },
  })

  const [addAlertMutation] = useCreateContactAlertWithTagsMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.staffalerts.add')
      )
    },
    update: (cache, { data: { createContactAlertAdvanced } }) => {
      const existing: GetStaffAlertsQuery = cache.readQuery({
        query: GetStaffAlertsDocument,
        ...getQueryVariables,
      })
      if (existing) {
        const key = Object.keys(existing)[0]
        const alerts = [...existing?.staff[0]?.alerts]
        alerts?.unshift({
          __typename: 'ContactAlert',
          ID: createContactAlertAdvanced?.ID,
          content: createContactAlertAdvanced?.Note,
          date: createContactAlertAdvanced?.CreatedDate,
          User: { id: me?.user, contact: me?.fullName, __typename: 'User' },
        })
        cache.writeQuery({
          query: GetStaffAlertsDocument,
          ...getQueryVariables,
          data: {
            [key]: [
              {
                ID: existing?.staff[0]?.ID,
                alerts: [...alerts],
              },
            ],
          },
        })
        updateStaffAlertCount(
          clientId,
          cache,
          createContactAlertAdvanced?.ID,
          NoteCountOperandType.Add
        )
      }
    },
  })

  const [editAlertMutation] = useUpdateContactAlertWithTagsMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.staffalerts.edit')
      )
    },
    update: (cache, { data: { updateContactAlertAdvanced } }) => {
      const existing: GetStaffAlertsQuery = cache.readQuery({
        query: GetStaffAlertsDocument,
        ...getQueryVariables,
      })
      if (existing) {
        const key = Object.keys(existing)[0]
        const index = existing?.staff[0]?.alerts.findIndex(
          (item) => item.ID === updateContactAlertAdvanced?.ID
        )
        if (index >= 0) {
          const alerts = [...existing?.staff[0]?.alerts]
          alerts?.splice(index, 1, {
            ID: updateContactAlertAdvanced?.ID,
            content: updateContactAlertAdvanced?.Note,
            date: updateContactAlertAdvanced?.CreatedDate,
            User: { ...existing?.staff[0]?.alerts[index]?.User },
          })
          cache.writeQuery({
            query: GetStaffAlertsDocument,
            ...getQueryVariables,
            data: {
              [key]: [
                {
                  ID: existing?.staff[0]?.ID,
                  alerts: [...alerts],
                },
              ],
            },
          })
        }
      }
    },
  })

  const [
    deleteAlertMutation,
    { loading: deleteAlertLoading },
  ] = useDeleteContactAlertWithTagsMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('clients.clientcard.staffalerts.delete')
      )
    },
    update: (cache, { data: { deleteContactAlertAdvanced } }) => {
      const existing: GetStaffAlertsQuery = cache.readQuery({
        query: GetStaffAlertsDocument,
        ...getQueryVariables,
      })
      if (existing) {
        const key = Object.keys(existing)[0]
        const index = existing?.staff[0]?.alerts.findIndex(
          (item) => item.ID === deleteContactAlertAdvanced?.ID
        )
        if (index >= 0) {
          const alerts = [...existing?.staff[0]?.alerts]
          alerts?.splice(index, 1)
          cache.writeQuery({
            query: GetStaffAlertsDocument,
            ...getQueryVariables,
            data: {
              [key]: [
                {
                  ID: existing?.staff[0]?.ID,
                  alerts: [...alerts],
                },
              ],
            },
          })
          updateStaffAlertCount(
            clientId,
            cache,
            deleteContactAlertAdvanced?.ID,
            NoteCountOperandType.Subtract
          )
        }
      }
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
    {
      data: contactDetails,
      loading: notesCountLoading,
      refetch: getContactHeaderRefetch,
    },
  ] = useGetContactHeaderLazyQuery({
    ssr: false,
    ...getQueryVariables,
  })

  const [
    getStaffAlertDetails,
    { data: staffAlertDetails, loading: staffAlertLoading },
  ] = useGetStaffAlertsLazyQuery({
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

  const {
    data: medicalHistoryData,
    loading: checkMedicalHistoryLoading,
  } = useCheckMedicalHistoryQuery({
    ssr: false,
    skip: !router.query['id'],
    variables: {
      contactID: clientId,
    },
  })
  const { data: outstandingCounts, loading: loadingCounts } = useQuery(
    AggregateInvoiceCountsDocument,
    {
      skip: !clientId,
      variables: {
        contactID: clientId,
      },
    }
  )
  const [
    getLabels,
    { data: labelsQueryData, refetch: getContactLablesRefetch },
  ] = useGetCmLabelsLazyQuery()

  const [updatebasicContactMutation] = useUpdateOneCmContactMutation()
  const [updateContactCustomMutation] = useUpsertOneCmContactCustomMutation()
  const [updateContactLableMutation] = useUpdateContactLableMutation()

  useEffect(() => {
    getLabels()
    if (
      labelsQueryData?.findManyCmLabel &&
      labelsQueryData.findManyCmLabel.length > 0
    ) {
      const data = labelsQueryData.findManyCmLabel.map((thread) => {
        return {
          id: thread.id,
          value: thread.name,
          color: thread.color,
        }
      })
      setContactLabels(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelsQueryData])

  useEffect(() => {
    if (!loadingCounts) {
      setOutstanding(
        (outstandingCounts?.aggregateInvSale?.sum?.inv_total ?? 0) +
          (outstandingCounts?.aggregateInvSale?.sum?.credit_amount ?? 0) -
          (outstandingCounts?.aggregateInvSale?.sum?.paid_amount ?? 0) +
          (outstandingCounts?.aggregateInvSale?.sum?.credit_amount ?? 0)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outstandingCounts])

  useEffect(() => {
    setAccountBalance(invAmount?.AccountBalance?.balance ?? 0)
  }, [invAmount])
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
          count: data?.findFirstCmContact?.contactNotes?.length || 0,
        }
      })
      setStaffAlertData((item) => {
        return {
          ...item,
          count: data?.findFirstCmContact?.staffAlerts?.length || 0,
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

  useEffect(() => {
    if (medicalHistoryData && !checkMedicalHistoryLoading) {
      medicalHistoryData?.form
        ? setMedicalHistoryDetails({
            status: medicalHistoryData?.form?.status,
            requestedDate:
              medicalHistoryData?.form?.Contact?.RequestedForms[0]
                ?.created_date,
            formLastUpdatedDate:
              medicalHistoryData?.form?.updated_at ??
              medicalHistoryData?.form?.created_at,
          })
        : setMedicalHistoryDetails((val) => {
            return {
              ...val,
              status: 'not_completed',
            }
          })
    }
  }, [medicalHistoryData, checkMedicalHistoryLoading])

  const handleAddNewClientNote = async (note: string) => {
    const noteBody = {
      Note: note,
      CreatedDate: timezoneDate() || dayjs().utc().format(),
      User: { connect: { id: me?.user } },
      CmContact: { connect: { ID: clientId } },
    }
    await addClientNote({
      variables: { data: noteBody },
      update: (cache, { data: { createOneContactNote } }) => {
        updateClientNotesCount(
          clientId,
          cache,
          createOneContactNote?.ID,
          NoteCountOperandType.Add
        )
      },
    })
    getContactHeaderRefetch()
  }
  const handleEditNote = async (id, note) => {
    await editClientNote({
      variables: { where: { ID: id }, data: { Note: { set: note } } },
    })
    getContactHeaderRefetch()
  }

  const handelContactLabel = () => {
    getContactLablesRefetch()
    refetch()
  }

  const handleDeleteNote = async (id) => {
    await deleteClientNote({
      variables: {
        where: { ID: id },
      },
      update: (cache, { data: { deleteOneContactNote } }) => {
        updateClientNotesCount(
          clientId,
          cache,
          deleteOneContactNote?.ID,
          NoteCountOperandType.Subtract
        )
      },
    })
    getContactHeaderRefetch()
  }

  const tabItems: readonly TabItem[] = [
    { key: 'dashboard', name: 'Dashboard', count: 123, tags: undefined },
    {
      key: 'appointments',
      name: 'Appointments',
      count: appointments?.total?.length ?? 0,
    },
    {
      key: 'financial',
      name: 'Financials',
      count: !countInvoiceLoading && (countInvoice?.total ?? 0),
      tags:
        (accountBalance ?? 0) - (outstanding ?? 0) !== 0
          ? [
              {
                tag:
                  stringToCurrencySignConverter(me?.currency) +
                  Math.abs(accountBalance - outstanding).toFixed(2),
                color: outstanding > accountBalance ? 'red' : 'green',
              },
            ]
          : [],
    },
    { key: 'packages', name: 'Packages' },
    {
      key: 'communications',
      name: t('clients.communications.title'),
      count: countCommunition?.aggregateCommunication?.count?.id,
    },
    {
      key: 'emr',
      name: 'EMR',
      count:
        (forms?.findManyMedicalFormContactCount || 0) +
        (photos?.findManyContactAttachmentCount || 0) +
        (documents?.findManyContactAttachmentCount || 0),
      childTabs: [
        {
          key: 'forms',
          name: 'Forms',
          count: forms?.findManyMedicalFormContactCount,
        },
        {
          key: 'photos',
          name: 'Photos',
          count: photos?.findManyContactAttachmentCount,
        },
        { key: 'prescription', name: 'Prescription' },
        {
          key: 'documents',
          name: 'Documents',
          count: documents?.findManyContactAttachmentCount,
        },
      ],
    },
    {
      key: 'gift-vouchers',
      name: 'Gift Vouchers',
      count: countVouchers?.total,
    },
    { key: 'loyalty', name: 'Loyalty' },
    {
      key: 'activities',
      name: t('clients.activities.title'),
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

  useEffect(() => {
    if (staffAlertDetails?.staff)
      setStaffAlertData((item) => {
        return {
          ...item,
          alerts: staffAlertDetails?.staff[0]?.alerts,
          loading: staffAlertLoading,
        }
      })
  }, [staffAlertDetails, staffAlertLoading])

  const handleEditAll = () => {
    setOpenEditModal(true)
  }

  const handleEditAllSubmit = () => {
    setOpenEditModal(false)
    refetch()
  }

  const handleAddAlert = async (alert: string) => {
    await addAlertMutation({
      variables: {
        data: {
          Note: alert,
          Status: Cm_Contact_Alerts_Status.Enable,
          IpAddress: 0,
          Critical: 1,
          CreatedDate: timezoneDate() || dayjs().utc().format(),
          User: { connect: { id: me?.user } },
          CmContact: { connect: { ID: clientId } },
        },
      },
    })
  }

  const handleEditAlert = async (
    id: number,
    alert: string,
    ownerId: number
  ) => {
    await editAlertMutation({
      variables: {
        where: {
          ID: id,
        },
        data: {
          Note: { set: alert },
          User: { connect: { id: ownerId } },
          CmContact: { connect: { ID: clientId } },
        },
      },
    })
  }

  const handleDeleteAlert = async (id) => {
    await deleteAlertMutation({
      variables: {
        where: { ID: id },
      },
    })
  }

  const handleAvatarUpload = async (
    isDelete: boolean,
    imageData?: ImgBlock
  ) => {
    if (imageData?.path === undefined && basicContactData?.avatar === '') {
      return
    }
    const avatarResponse = await updatebasicContactMutation({
      variables: {
        where: { ID: clientId },
        data: {
          Avatar: { set: !isDelete ? imageData?.path : '' },
        },
      },
    })

    if (avatarResponse?.data) {
      setBasicContactData((item) => {
        return {
          ...item,
          avatar: !isDelete ? imageData?.path : '',
        }
      })

      isDelete
        ? Notification(
            NotificationType.success,
            t('team.user.personal.details.avtar.remove.success')
          )
        : Notification(
            NotificationType.success,
            t('team.user.personal.details.avtar.update.success')
          )
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
        updateContactLableMutation={updateContactLableMutation}
        handelContactLabel={handelContactLabel}
        clientId={clientId}
        userId={me?.user}
        companyId={me?.company}
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
                      id: data?.labelDetail?.label_id,
                      label: data?.labelDetail?.label,
                      color: data?.labelDetail?.color,
                    }
                  }) || [],
              } as any) //@@@ TODO: remove this any, and fill in the missing fields!
            : undefined
        }
        clientIsAdmin={me?.admin}
        contactLabels={contactLabels.map((item) => {
          return {
            id: item.id,
            label: item.value,
            color: item.color,
          }
        })}
        notes={contactData}
        staffAlerts={staffAlertData}
        medicalHistoryDetails={medicalHistoryDetails}
        getContactDetails={getContactDetails}
        getStaffAlertDetails={getStaffAlertDetails}
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
        handleAddAlert={handleAddAlert}
        handleEditAlert={handleEditAlert}
        handleDeleteAlert={handleDeleteAlert}
        showAvatarModal={() => setAvatarModalOpen(true)}
        deleteAlertLoading={deleteAlertLoading}
      >
        <ClientContext.Provider
          value={{
            fullName: `${basicContactData?.firstName}
                  ${basicContactData?.lastName}`,
            avatar: basicContactData?.avatar
              ? getImage(basicContactData?.avatar)
              : '',
          }}
        >
          {children}
        </ClientContext.Provider>
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
      {isAvatarModalOpen && (
        <AvatarUploader
          visible={isAvatarModalOpen}
          title={t('account.settings.profile.avatarupload.title')}
          imageURL={
            basicContactData?.avatar ? getImage(basicContactData?.avatar) : ''
          }
          onCancel={() => setAvatarModalOpen(false)}
          width={400}
          height={400}
          section={'avatar_photos'}
          type={'file_attachments'}
          successHandler={(imageData) => handleAvatarUpload(false, imageData)}
          onDelete={() => handleAvatarUpload(true)}
        />
      )}
    </Layout>
  )
}
