import React, { FC, useEffect, useState } from 'react'
import {
  Notification,
  NotificationType,
  ClientCreate,
  cmFieldsCreateProps,
  CustomFieldsProps,
  InitialDetailsProps,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import {
  useGetTblModuleFieldsSettingsLazyQuery,
  useGetSalutationsLazyQuery,
  useGetMarketingSourcesLazyQuery,
  useGetContactCustomFieldsLazyQuery,
  useFindManyLimitContactLocationLazyQuery,
  useGetCmLabelsLazyQuery,
  useCreateOneContactMutation,
  GetTblModuleFieldsSettingsQuery,
  useFindEditContactDetailLazyQuery,
  useUpdateOneContactMutation,
} from '@pabau/graphql'
import { useUser } from '../../context/UserContext'
import dayjs from 'dayjs'

export interface Label {
  label?: string
  color?: string
  count?: number
}

export interface LabelDataProps {
  id?: number
  value: string
  color?: string | null
}

export interface ClientCreateWebProps {
  modalVisible?: boolean
  handleClose?: () => void
  selectTemplate?: string
  onSelectTemplate?: (string) => void
  searchText?: string
  onSearchTextChange?: (string) => void
  handleSubmit?: (val?) => void
  isEdit?: boolean
  contactId?: number
  handleDelete?: () => void
  deleteModalVisible?: boolean
  onDelete?: () => void
}

export const ClientCreateWeb: FC<ClientCreateWebProps> = ({
  modalVisible = true,
  handleClose,
  isEdit = false,
  contactId,
  handleSubmit,
}) => {
  const { t } = useTranslation('common')
  const user = useUser()
  const [labelsData, setLabelsData] = useState<LabelDataProps[]>([])
  const [validationObject, setValidationObject] = useState({})
  const [initialValues, setInitialValues] = useState<InitialDetailsProps>({
    salutation: '',
    Fname: '',
    Lname: '',
    gender: '',
    MarketingSource: '',
    DOB: undefined,
    preferredLanguage: '',
    Email: '',
    Mobile: '',
    Phone: '',
    MailingProvince: '',
    MailingCountry: '',
    MailingStreet: '',
    MailingCity: '',
    MailingPostal: '',
    marketingPromotion: ['sms', 'email', 'phone', 'postal', 'needToKnows'],
    recordSharing: {
      company: 0,
      emergencyContact: 0,
      family: 0,
      gp: 0,
      insuranceProvider: 0,
      nextOfKin: 0,
    },
    privacyPolicy: '0',
    settingSharing: {
      bookAppointments: 0,
      bookClass: 0,
      loyalty: 0,
      myPackages: 0,
      purchasePackage: 0,
      payments: 0,
      appointments: 0,
      class: 0,
      documents: 0,
      medications: 0,
      allergies: 0,
      gpDetails: 0,
    },
    shareLink: '',
  })
  const [customFields, setCustomFields] = useState<CustomFieldsProps[]>([])
  const [isVisible, setVisible] = useState(modalVisible)
  const [accessCode, setAceessCode] = useState(0)
  const [isSuccess, setSuccess] = useState(false)
  const [labels, setLabels] = useState([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!isEdit) {
      setAceessCode(Math.floor(1000 + Math.random() * 9000))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const [
    getFieldSettingData,
    { data: fieldSettingData, loading },
  ] = useGetTblModuleFieldsSettingsLazyQuery()

  const [
    getSalutationData,
    { data: salutationData, loading: salutationLoading },
  ] = useGetSalutationsLazyQuery()

  const [
    getMarketingSourceData,
    { data: marketingSourceData, loading: marketingSourceLoading },
  ] = useGetMarketingSourcesLazyQuery()

  const [
    getLimitLocationData,
    { data: limitLocationData, loading: locationLoading },
  ] = useFindManyLimitContactLocationLazyQuery()

  const [
    getCustomFieldData,
    { data: customFieldData, loading: customFieldLoading },
  ] = useGetContactCustomFieldsLazyQuery()

  const [
    getLabels,
    { data: labelsQueryData, loading: labelLoading },
  ] = useGetCmLabelsLazyQuery({
    fetchPolicy: 'no-cache',
  })

  const [
    getContact,
    { data: contactData, loading: editContactLoading },
  ] = useFindEditContactDetailLazyQuery({
    variables: {
      id: contactId,
    },
    fetchPolicy: 'no-cache',
  })

  const [addMutation] = useCreateOneContactMutation({
    onCompleted(data) {
      if (data) {
        Notification(
          NotificationType.success,
          t('quickCreate.client.modal.create.success')
        )
        setSuccess(!isSuccess)
      }
    },
    onError(error) {
      if (error.message === 'Duplicate contact exist') {
        Notification(
          NotificationType.error,
          t('quickCreate.client.modal.create.contact.exits.error')
        )
      }
    },
  })

  const [updateMutation] = useUpdateOneContactMutation({
    onCompleted(data) {
      if (data) {
        Notification(
          NotificationType.success,
          t('quickCreate.client.modal.update.success')
        )
        setSuccess(!isSuccess)
      }
    },
  })

  useEffect(() => {
    if (isVisible) {
      getFieldSettingData()
      getSalutationData()
      getMarketingSourceData()
      getLabels()
      getLimitLocationData()
      getCustomFieldData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  useEffect(() => {
    if (
      !loading &&
      !marketingSourceLoading &&
      !locationLoading &&
      !customFieldLoading &&
      !labelLoading &&
      isEdit
    ) {
      getContact()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loading,
    marketingSourceLoading,
    locationLoading,
    customFieldLoading,
    isEdit,
    labelLoading,
  ])

  useEffect(() => {
    const requiredField = {
      Fname: Yup.string().required(
        t('quickCreate.validation.firstName.required')
      ),
      Lname: Yup.string().required(
        t('quickCreate.validation.lastName.required')
      ),
    }
    if (fieldSettingData) {
      const data: GetTblModuleFieldsSettingsQuery = fieldSettingData
      for (const item of data.findManyTblModuleFieldsSetting) {
        if (
          item.field_name &&
          item.is_required === 1 &&
          item.field_name !== 'Fname' &&
          item.field_name !== 'Lname' &&
          item.field_name in initialValues
        ) {
          requiredField[item.field_name] = Yup.string().required(
            `${t('quickCreate.validation.is.required', {
              field: item.field_label,
            })}`
          )
        }
      }
    }
    setValidationObject(requiredField)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSettingData])

  useEffect(() => {
    if (
      labelsQueryData?.findManyCmLabel &&
      labelsQueryData.findManyCmLabel.length > 0
    ) {
      const data: LabelDataProps[] = labelsQueryData.findManyCmLabel.map(
        (thread) => {
          return {
            id: thread.id,
            value: thread.name,
            color: thread.color,
          }
        }
      )
      setLabelsData(data)
    }
  }, [labelsQueryData])

  useEffect(() => {
    if (limitLocationData?.findManyLimitContactLocation) {
      const initialValuesObj = initialValues
      for (const location of limitLocationData.findManyLimitContactLocation) {
        initialValuesObj[`limitContactsLocations_${location?.id}`] = true
      }
      setInitialValues(initialValuesObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitLocationData])

  useEffect(() => {
    const initialValuesObj = initialValues
    if (salutationData?.findManyUserSalutation?.length > 0) {
      initialValuesObj['salutation'] =
        salutationData?.findManyUserSalutation[0].name
    } else {
      const validationObj = validationObject
      delete validationObj['salutation']
      setValidationObject(validationObj)
    }
    if (salutationData?.findFirstCompanyDetails) {
      initialValuesObj['MailingCountry'] =
        salutationData?.findFirstCompanyDetails?.country
    }
    setInitialValues(initialValuesObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salutationData])

  useEffect(() => {
    if (marketingSourceData?.findManyMarketingSource?.length === 0) {
      const validationObj = validationObject
      delete validationObj['MarketingSource']
      setValidationObject(validationObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingSourceData])

  useEffect(() => {
    if (customFieldData) {
      const data = customFieldData.custom
        .map((thread) => {
          return {
            id: thread.id,
            name: thread.name,
            CmFields: thread.ManageCustomField.filter(
              (thread) => thread.is_active
            ),
          }
        })
        .filter((thread) => thread.CmFields.length > 0)

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
        data.push({
          id: 0,
          name: 'General',
          CmFields: generalCmFields,
        })
      }
      setCustomFields(data)

      if (data.length > 0) {
        const initialValuesObj = initialValues
        const requiredField = validationObject
        for (const item of data) {
          if (item.CmFields.length > 0) {
            for (const thread of item.CmFields) {
              initialValuesObj[`customField_${thread.id}`] = ''
              if (thread.is_required === 1) {
                requiredField[`customField_${thread.id}`] =
                  thread.field_type === 'multiple'
                    ? Yup.array().required(
                        `${t('quickCreate.validation.is.required', {
                          field: thread.field_label,
                        })}`
                      )
                    : thread.field_type === 'number'
                    ? Yup.number()
                        .required(
                          `${t('quickCreate.validation.is.required', {
                            field: thread.field_label,
                          })}`
                        )
                        .typeError(
                          `${t('quickCreate.number.validation.message', {
                            field: thread.field_label,
                          })}`
                        )
                    : Yup.string().required(
                        `${t('quickCreate.validation.is.required', {
                          field: thread.field_label,
                        })}`
                      )
              }
            }
          }
        }
        setInitialValues(initialValuesObj)
        setValidationObject(requiredField)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customFieldData])

  useEffect(() => {
    const values = initialValues
    const marketingPromotionValues = []
    if (contactData?.contact) {
      const data = contactData.contact
      for (const key of Object.keys(values)) {
        if (key === 'recordSharing') {
          if (data.contactPreference) {
            Object.keys(values['recordSharing']).map(
              (key) =>
                (values['recordSharing'][key] = data.contactPreference[key])
            )
          }
        } else if (key === 'settingSharing') {
          if (data.contactPreference) {
            Object.keys(values['settingSharing']).map(
              (key) =>
                (values['settingSharing'][key] = data.contactPreference[key])
            )
          }
        } else if (key === 'shareLink') {
          values['shareLink'] = data.contactPreference?.shareLink ?? ''
        } else if (key === 'marketingPromotion') {
          if (data.MarketingOptInPost) {
            marketingPromotionValues.push('postal')
          }
          if (data.MarketingOptInEmail) {
            marketingPromotionValues.push('email')
          }
          if (data.MarketingOptInPhone) {
            marketingPromotionValues.push('phone')
          }
          if (data.MarketingOptInText) {
            marketingPromotionValues.push('sms')
          }
          if (data.needToKnows) {
            marketingPromotionValues.push('needToKnows')
          }
          values['marketingPromotion'] = marketingPromotionValues
        } else if (key === 'preferredLanguage') {
          if (data.contactMeta.length > 0) {
            values['preferredLanguage'] = data.contactMeta[0].meta_value
          }
        } else if (key === 'MarketingSource') {
          if (
            marketingSourceData?.findManyMarketingSource.find(
              (source) => source.id === data['MarketingSource']
            )
          ) {
            values['MarketingSource'] = data['MarketingSource'].toString()
          }
        } else if (key.includes('customField_')) {
          if (data.customField.length > 0) {
            const id = Number.parseInt(key.split('_')[1])
            if (
              data.customField.find((field) => field.custom_field_id === id)
            ) {
              values[key] = data.customField.find(
                (field) => field.custom_field_id === id
              ).custom_field_value
            }
          }
        } else if (key === 'MailingCountry') {
          values[key] =
            data[key] || salutationData?.findFirstCompanyDetails?.country
        } else {
          values[key] = data[key]
        }
      }
      setAceessCode(
        Number.parseInt(data.contactPreference?.accessCode) ??
          Math.floor(1000 + Math.random() * 9000)
      )
      if (data.labels.length > 0) {
        const labelData = data.labels.map((label) => {
          const findLabel = labelsData.find(
            (labelData) => labelData.id === label.id
          )
          return {
            id: label.id,
            label: findLabel.value,
            color: findLabel.color,
          }
        })
        setLabels(labelData)
      }
      if (data.active) {
        setActive(true)
      } else {
        setActive(false)
      }
      setInitialValues({ ...values })
    } else if (contactData && !editContactLoading) {
      handleSubmit?.()
      Notification(
        NotificationType.error,
        t('quickCreate.client.modal.update.detail.error')
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactData])

  const checkIsLoading = () => {
    return (
      salutationLoading ||
      loading ||
      marketingSourceLoading ||
      locationLoading ||
      customFieldLoading ||
      editContactLoading
    )
  }

  const handleCloseModal = () => {
    setVisible(false)
    setLabels([])
    setActive(false)
    handleClose?.()
  }

  const onActivated = (value) => {
    setActive(value)
  }

  const handleCreate = async (values, resetForm, setSelectedLabels) => {
    const customFieldsValue: cmFieldsCreateProps[] = []
    const limitContactsLocationsIds: number[] = []
    const deleteLabels: number[] = []
    let createLabels = values.selectedLabels
    for (const field of Object.keys(values)) {
      let value = values[field]

      if (field.includes('customField') && value) {
        if (Array.isArray(value)) {
          value = value.join(',')
        }

        const strVal = field.split('_')

        for (const thread of customFields) {
          const matchedField = thread.CmFields.find(
            (thread) => thread.id === Number.parseInt(strVal[1])
          )
          if (matchedField) {
            customFieldsValue.push({
              label: matchedField.field_label ? matchedField.field_label : '',
              id: Number.parseInt(strVal[1]),
              value:
                matchedField.field_type === 'date'
                  ? dayjs(value).format('YYYY-MM-DD')
                  : value.toString(),
            })
          }
        }
      } else if (field.includes('limitContactsLocations_') && value) {
        const strVal = field.split('_')
        limitContactsLocationsIds.push(Number.parseInt(strVal[1]))
      }
    }

    if (isEdit && contactData.contact?.labels.length > 0) {
      for (const label of contactData.contact.labels) {
        if (
          !values.selectedLabels.find((selected) => selected.id === label.id)
        ) {
          deleteLabels.push(label.id)
        } else {
          createLabels = createLabels.filter(
            (selected) => selected.id !== label.id
          )
        }
      }
    }

    const variables = {
      firstName: values.Fname,
      lastName: values.Lname,
      email: values.Email,
      salutation: values.salutation ?? '',
      mailingProvince: values.MailingProvince,
      mailingCity: values.MailingCity,
      mailingStreet: values.MailingStreet,
      mailingPostal: values.MailingPostal,
      mailingCountry: values.MailingCountry,
      marketingOptInEmail: values.marketingPromotion.includes('email') ? 1 : 0,
      marketingOptInPhone: values.marketingPromotion.includes('phone') ? 1 : 0,
      marketingOptInPost: values.marketingPromotion.includes('postal') ? 1 : 0,
      marketingOptInText: values.marketingPromotion.includes('sms') ? 1 : 0,
      needToKnows: values.marketingPromotion.includes('needToKnows'),
      marketingSource: values.MarketingSource
        ? Number.parseInt(values.MarketingSource)
        : 0,
      DOB: values.DOB ? values.DOB.toString() : '',
      mobile: values.Mobile,
      phone: values.Phone,
      gender: values.gender,
      preferredLanguage: values.preferredLanguage.toLowerCase(),
      privacyPolicy: values.privacyPolicy,
      labels: !isEdit
        ? createLabels
        : {
            createLabels,
            deleteLabels,
          },
      customFields: customFieldsValue,
      contactPreferences: {
        family: values.recordSharing.family,
        emergency_contact: values.recordSharing.emergencyContact,
        next_of_kin: values.recordSharing.nextOfKin,
        insurance_provider: values.recordSharing.insuranceProvider,
        gp: values.recordSharing.gp,
        company: values.recordSharing.company,
        book_appointments: values.settingSharing.bookAppointments,
        book_class: values.settingSharing.bookClass,
        loyalty: values.settingSharing.loyalty,
        my_packages: values.settingSharing.myPackages,
        purchase_package: values.settingSharing.purchasePackage,
        payments: values.settingSharing.payments,
        appointments: values.settingSharing.appointments,
        class: values.settingSharing.class,
        documents: values.settingSharing.documents,
        medications: values.settingSharing.medications,
        allergies: values.settingSharing.allergies,
        gp_details: values.settingSharing.gpDetails,
        share_link: values.shareLink,
        access_code: accessCode.toString(),
      },
    }

    if (limitContactsLocationsIds.length > 0 && !isEdit) {
      variables['limitContactsLocations'] = limitContactsLocationsIds
    }

    if (values.selectedLabels.length === 0) {
      delete variables.labels
    }

    if (customFieldsValue.length === 0) {
      delete variables.customFields
    }

    let response
    if (!isEdit) {
      response = await addMutation({
        variables,
        optimisticResponse: {},
      })
    } else {
      response = await updateMutation({
        variables: {
          ...variables,
          isActive: active ? 1 : 0,
          contactId,
        },
        optimisticResponse: {},
      })
    }

    if (response.data) {
      resetForm()
      setSelectedLabels([])
      if (isEdit) {
        handleSubmit?.()
        setActive(false)
      }
    }
  }

  return (
    <ClientCreate
      modalVisible={isVisible}
      handleSubmit={handleCreate}
      handleClose={handleCloseModal}
      customFields={customFields}
      salutationData={salutationData?.findManyUserSalutation}
      fieldsSettings={fieldSettingData?.findManyTblModuleFieldsSetting}
      marketingSources={marketingSourceData?.findManyMarketingSource}
      limitContactsLocations={limitLocationData?.findManyLimitContactLocation}
      isLoading={!isEdit ? loading : checkIsLoading()}
      isMarketingSourceLoading={marketingSourceLoading}
      isSalutationLoading={salutationLoading}
      labelsData={labelsData}
      defaultLabels={labels}
      defaultSelectedLabels={labels}
      initialValues={initialValues}
      validationObject={validationObject}
      isDisabledBtn={checkIsLoading()}
      companyName={user?.me?.companyName}
      accessCode={accessCode}
      isEdit={isEdit}
      activated={active}
      onActivated={onActivated}
    />
  )
}

export default ClientCreateWeb
