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
  useFindManySharedCompanyLazyQuery,
  useGetCmLabelsLazyQuery,
  useCreateOneContactMutation,
  GetTblModuleFieldsSettingsQuery,
} from '@pabau/graphql'

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
  const [labelsData, setLabelsData] = useState<LabelDataProps[]>([])
  const [validationObject, setValidationObject] = useState({})
  const [initialValues, setInitialValues] = useState<InitialDetailsProps>({
    salutation: '',
    Fname: '',
    Lname: '',
    gender: t('quickCreate.client.modal.general.gender.other'),
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
    MarketingOptInEmail: false,
    MarketingOptInText: false,
    MarketingOptInPost: false,
    MarketingOptInPhone: false,
  })
  const [customFields, setCustomFields] = useState<CustomFieldsProps[]>([])
  const [isVisible, setVisible] = useState(modalVisible)

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
    getOtherCompaniesData,
    { data: otherCompaniesData, loading: otherCompanyLoading },
  ] = useFindManySharedCompanyLazyQuery()

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
      }
    },
    onError(error) {
      if (error.message === 'Duplicate contact exist') {
        Notification(
          NotificationType.error,
          t('quickCreate.client.modal.create.contact.exits.error')
        )
      } else {
        Notification(
          NotificationType.error,
          t('quickCreate.client.modal.create.contact.error')
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
      getOtherCompaniesData()
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
      customFieldLoading ||
      otherCompanyLoading
    )
  }

  const handleCloseModal = () => {
    setVisible(false)
    handleClose?.()
  }

  const handleCreate = async (values, resetForm, setSelectedLabels) => {
    const customFieldsValue: cmFieldsCreateProps[] = []
    const limitContactsLocationsIds: number[] = []
    const otherCompanyIds: number[] = []

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
      } else if (field.includes('otherCompany_') && value) {
        const strVal = field.split('_')
        otherCompanyIds.push(Number.parseInt(strVal[1]))
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
      marketingOptInEmail: values.MarketingOptInEmail ? 1 : 0,
      marketingOptInPhone: values.MarketingOptInPhone ? 1 : 0,
      marketingOptInPost: values.MarketingOptInPost ? 1 : 0,
      marketingOptInText: values.MarketingOptInText ? 1 : 0,
      marketingSource: values.MarketingSource
        ? Number.parseInt(values.MarketingSource)
        : 0,
      DOB: values.DOB ? values.DOB.toString() : '',
      mobile: values.Mobile,
      phone: values.Phone,
      gender: values.gender,
      preferredLanguage: values.preferredLanguage.toLowerCase(),
      otherCompanyIds: otherCompanyIds,
      limitContactsLocations: limitContactsLocationsIds,
      labels: values.selectedLabels,
      customFields: customFieldsValue,
    }

    if (otherCompanyIds.length === 0) {
      delete variables.otherCompanyIds
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
      otherCompanies={otherCompaniesData?.findManySharedCompany}
      isLoading={loading}
      isMarketingSourceLoading={marketingSourceLoading}
      isSalutationLoading={salutationLoading}
      labelsData={labelsData}
      initialValues={initialValues}
      validationObject={validationObject}
      isDisabledBtn={checkIsLoading()}
      {...props}
    />
  )
}

export default ClientCreateWeb
