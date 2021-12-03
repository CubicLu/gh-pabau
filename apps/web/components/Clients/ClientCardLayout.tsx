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
  useGetContactAccountBalanceQuery,
  useCountVouchersQuery,
  useCountClientAppointmentsQuery,
  AggregateInvoiceCountsDocument,
  useCountClientCommunicationQuery,
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
dayjs.extend(utc)
dayjs.extend(timezone)

export const ClientContext = createContext(null)

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
  const [basicContactData, setBasicContactData] = useState(null)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [deleteNoteId, setDeleteNoteId] = useState<number>(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false)
  const [medicalHistoryDetails, setMedicalHistoryDetails] = useState(null)
  const [outstanding, setOutstanding] = useState(0)
  const [accountBalance, setAccountBalance] = useState(0)
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
  const { data: outstandingCounts, loading: loadingCounts } = useQuery(
    AggregateInvoiceCountsDocument,
    {
      skip: !clientId,
      variables: {
        contactID: clientId,
      },
    }
  )
  const [updatebasicContactMutation] = useUpdateOneCmContactMutation()
  const [updateContactCustomMutation] = useUpsertOneCmContactCustomMutation()

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

  useEffect(() => {
    if (medicalHistoryData?.form) {
      setMedicalHistoryDetails({
        status: medicalHistoryData?.form?.status,
        requestedDate:
          medicalHistoryData?.form?.Contact?.RequestedForms[0]?.created_date,
        formLastUpdatedDate:
          medicalHistoryData?.form?.updated_at ??
          medicalHistoryData?.form?.created_at,
      })
    } else if (!medicalHistoryData?.form) {
      setMedicalHistoryDetails((val) => {
        return {
          ...val,
          status: 'not_completed',
        }
      })
    }
  }, [medicalHistoryData])

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
                  stringToCurrencySignConverter(user.me?.currency) +
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
      childTabs: [
        { key: 'forms', name: 'Forms' },
        { key: 'photos', name: 'Photos' },
        { key: 'prescription', name: 'Prescription' },
        { key: 'documents', name: 'Documents' },
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
        medicalHistoryDetails={medicalHistoryDetails}
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
        showAvatarModal={() => setAvatarModalOpen(true)}
      >
        <ClientContext.Provider value={basicContactData}>
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
