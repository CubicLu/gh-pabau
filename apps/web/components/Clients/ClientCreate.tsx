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
} from '@pabau/graphql'
import { useUser } from '../../context/UserContext'

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
  handleSubmit?: (val) => void
  isEdit?: boolean
  editedValues?: InitialDetailsProps
  activated?: boolean
  onActivated?: (val: boolean) => void
  defaultLabels?: Label[]
  defaultSelectedLabels?: Label[]
  handleDelete?: () => void
  deleteModalVisible?: boolean
  onDelete?: () => void
}

export const ClientCreateWeb: FC<ClientCreateWebProps> = ({
  modalVisible = true,
  handleClose,
  isEdit = false,
  editedValues,
  defaultLabels,
  defaultSelectedLabels,
  ...props
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
    marketingPromotion: ['needToKnows'],
    recordSharing: {
      company: 1,
      emergencyContact: 0,
      family: 0,
      gp: 0,
      insuranceProvider: 0,
      nextOfKin: -1,
    },
    privacyPolicy: '',
    settingSharing: {
      bookAppointments: 1,
      bookClass: 0,
      loyalty: 1,
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

  useEffect(() => {
    const code = Math.floor(1000 + Math.random() * 9000)
    setAceessCode(code)
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

  const [getLabels, { data: labelsQueryData }] = useGetCmLabelsLazyQuery()

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
    const requiredField = {
      Fname: Yup.string().required(
        t('quickCreate.validation.firstName.required')
      ),
      Lname: Yup.string().required(
        t('quickCreate.validation.lastName.required')
      ),
    }
    let initialValuesObj = initialValues
    if (isEdit && editedValues) {
      initialValuesObj = {
        ...initialValuesObj,
        ...editedValues,
      }
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
    setInitialValues(initialValuesObj)
    setValidationObject(requiredField)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSettingData, isEdit, editedValues])

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
    if (salutationData?.findManyUserSalutation?.length > 0) {
      const initialValuesObj = initialValues
      initialValuesObj['salutation'] =
        salutationData?.findManyUserSalutation[0].name
      setInitialValues(initialValuesObj)
    } else {
      const validationObj = validationObject
      delete validationObj['salutation']
      setValidationObject(validationObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salutationData, initialValues])

  useEffect(() => {
    if (marketingSourceData?.findManyMarketingSource?.length === 0) {
      const validationObj = validationObject
      delete validationObj['MarketingSource']
      setValidationObject(validationObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingSourceData, initialValues])

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

  const checkIsLoading = () => {
    return (
      salutationLoading ||
      loading ||
      marketingSourceLoading ||
      locationLoading ||
      customFieldLoading
    )
  }

  const handleCloseModal = () => {
    setVisible(false)
    handleClose?.()
  }

  const handleCreate = async (values, resetForm, setSelectedLabels) => {
    const customFieldsValue: cmFieldsCreateProps[] = []
    const limitContactsLocationsIds: number[] = []

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
                  ? value.format('YYYY-MM-DD')
                  : value.toString(),
            })
          }
        }
      } else if (field.includes('limitContactsLocations_') && value) {
        const strVal = field.split('_')
        limitContactsLocationsIds.push(Number.parseInt(strVal[1]))
      }
    }

    const variables = {
      firstName: values.Fname,
      lastName: values.Lname,
      email: values.Email,
      salutation: values.salutation,
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
      limitContactsLocations: limitContactsLocationsIds,
      labels: values.selectedLabels,
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

    if (limitContactsLocationsIds.length === 0) {
      delete variables.limitContactsLocations
    }

    if (values.selectedLabels.length === 0) {
      delete variables.labels
    }

    if (customFieldsValue.length === 0) {
      delete variables.customFields
    }

    const response = await addMutation({
      variables,
      optimisticResponse: {},
    })

    if (response.data) {
      resetForm()
      setSelectedLabels([])
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
      isLoading={loading}
      isMarketingSourceLoading={marketingSourceLoading}
      isSalutationLoading={salutationLoading}
      labelsData={labelsData}
      initialValues={initialValues}
      validationObject={validationObject}
      isDisabledBtn={checkIsLoading()}
      companyName={user?.me?.companyName}
      accessCode={accessCode}
      {...props}
    />
  )
}

export default ClientCreateWeb
