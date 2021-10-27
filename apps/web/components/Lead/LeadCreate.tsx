import React, { FC, useEffect, useState } from 'react'
import {
  Employee,
  CustomFieldsProps,
  LeadCreate,
  InitialDetailsDataProps,
  cmFieldsCreateProps,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import {
  useGetMarketingSourcesLazyQuery,
  useGetSalutationsLazyQuery,
  useGetLeadTblModuleFieldsSettingsLazyQuery,
  useGetLeadCustomFieldsLazyQuery,
  useGetLeadEmployeeListLazyQuery,
  useGetLeadStatusLazyQuery,
  useGetLocationListLazyQuery,
  useCreateOneLeadMutation,
} from '@pabau/graphql'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'

export interface LeadCreateProps {
  modalVisible?: boolean
  handleClose?: () => void
  selectTemplate?: string
  onSelectTemplate?: (string) => void
  searchText?: string
  onSearchTextChange?: (string) => void
}

export const LeadCreateWeb: FC<LeadCreateProps> = ({
  modalVisible = true,
  handleClose,
}) => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [customFields, setCustomFields] = useState<CustomFieldsProps[]>([])
  const [isVisible, setVisible] = useState(modalVisible)
  const { t } = useTranslation('common')
  const [validationObject, setValidationObject] = useState({})
  const [initialValues, setInitialValues] = useState<InitialDetailsDataProps>({
    firstName: '',
    lastName: '',
    Salutation: '',
    DOB: undefined,
    Email: '',
    Description: '',
    MailingStreet: '',
    MailingProvince: '',
    MailingCity: '',
    MailingCountry: '',
    MailingPostal: '',
    Phone: '',
    Mobile: '',
    note: '',
    leadStatus: 0,
    lead_source: undefined,
    location: 0,
    MarketingOptInEmail: false,
    MarketingOptInText: false,
    MarketingOptInPost: false,
    MarketingOptInPhone: false,
  })

  const [
    getFieldSettingData,
    { data: fieldSettingData, loading: isFieldSettingLoading },
  ] = useGetLeadTblModuleFieldsSettingsLazyQuery()

  const [
    getSalutationData,
    { data: salutationData, loading: isSalutationLoading },
  ] = useGetSalutationsLazyQuery()

  const [
    getMarketingSourceData,
    { data: marketingSourceData, loading: isMarketingSourceLoading },
  ] = useGetMarketingSourcesLazyQuery()

  const [
    getEmployeeList,
    { data: employeeListData, loading: isEmployeeLoading },
  ] = useGetLeadEmployeeListLazyQuery()

  const [
    getLeadStatusData,
    { data: leadStatusData, loading: isLeadStatusLoading },
  ] = useGetLeadStatusLazyQuery()

  const [
    getCustomFieldData,
    { data: customFieldData, loading: isCustomFieldLoading },
  ] = useGetLeadCustomFieldsLazyQuery()

  const [
    getLocationData,
    { data: locationData, loading: isLocationLoading },
  ] = useGetLocationListLazyQuery()

  const [addMutation] = useCreateOneLeadMutation({
    onCompleted(data) {
      if (data) {
        Notification(
          NotificationType.success,
          t('quickCreate.lead.modal.create.success')
        )
      }
    },
    onError() {
      Notification(
        NotificationType.error,
        t('quickCreate.lead.modal.create.error')
      )
    },
  })

  useEffect(() => {
    if (isVisible) {
      getFieldSettingData()
      getEmployeeList()
      getSalutationData()
      getMarketingSourceData()
      getLeadStatusData()
      getLocationData()
      getCustomFieldData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  const handleCloseModal = () => {
    setVisible(false)
    handleClose?.()
  }

  useEffect(() => {
    if (employeeListData?.findManyUser) {
      const data = employeeListData.findManyUser.map((thread) => {
        return {
          id: thread.id,
          name: thread.full_name,
          avatar: thread.image && getImage(thread.image),
          selected: false,
        }
      })
      setEmployeeList(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeListData])

  useEffect(() => {
    const requiredField = {
      firstName: Yup.string().required(
        t('quickCreate.validation.firstName.required')
      ),
      lastName: Yup.string().required(
        t('quickCreate.validation.lastName.required')
      ),
    }
    if (fieldSettingData) {
      for (const item of fieldSettingData.findManyTblModuleFieldsSetting) {
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
    if (salutationData?.findManyUserSalutation?.length > 0) {
      const initialValuesObj = initialValues
      initialValuesObj['Salutation'] =
        salutationData?.findManyUserSalutation[0].name
      setInitialValues(initialValuesObj)
    } else {
      const validationObj = validationObject
      delete validationObj['Salutation']
      setValidationObject(validationObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salutationData, initialValues])

  useEffect(() => {
    if (marketingSourceData?.findManyMarketingSource?.length === 0) {
      const validationObj = validationObject
      delete validationObj['lead_source']
      setValidationObject(validationObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingSourceData, initialValues])

  useEffect(() => {
    if (locationData?.findAllowedLocation?.length === 0) {
      const validationObj = validationObject
      delete validationObj['location']
      setValidationObject(validationObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingSourceData, initialValues])

  useEffect(() => {
    if (leadStatusData?.findManyLeadStatus?.length > 0) {
      const initialValuesObj = initialValues
      initialValuesObj['leadStatus'] = leadStatusData?.findManyLeadStatus[0].id
      setInitialValues(initialValuesObj)
    }
  }, [leadStatusData, initialValues])

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
      isSalutationLoading ||
      isFieldSettingLoading ||
      isMarketingSourceLoading ||
      isLocationLoading ||
      isCustomFieldLoading ||
      isLeadStatusLoading ||
      isEmployeeLoading
    )
  }

  const handleSubmit = async (
    values,
    selectedEmployees,
    resetForm,
    setSelectedEmployees
  ) => {
    const customFieldsValue: cmFieldsCreateProps[] = []
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
      }
    }

    const variables = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.Email,
      salutation: values.Salutation,
      mailingProvince: values.MailingProvince,
      mailingCity: values.MailingCity,
      mailingStreet: values.MailingStreet,
      mailingPostal: values.MailingPostal,
      mailingCountry: values.MailingCountry,
      marketingOptInEmail: values.MarketingOptInEmail ? 1 : 0,
      marketingOptInPhone: values.MarketingOptInPhone ? 1 : 0,
      marketingOptInPost: values.MarketingOptInPost ? 1 : 0,
      marketingOptInText: values.MarketingOptInText ? 1 : 0,
      leadSource: values.lead_source || 0,
      DOB: values.DOB ? values.DOB.toString() : '',
      mobile: values.Mobile,
      phone: values.Phone,
      leadStatus:
        values.leadStatus === 0
          ? leadStatusData?.findManyLeadStatus[0].id
          : values.leadStatus,
      location: values.location,
      description: values.Description,
    }

    if (values.note) {
      variables['notes'] = values.note
    }

    if (customFieldsValue.length > 0) {
      variables['customFields'] = customFieldsValue
    }

    if (selectedEmployees.length > 0) {
      variables['ownerId'] = selectedEmployees[0].id
    }

    const response = await addMutation({
      variables,
      optimisticResponse: {},
    })

    if (response.data) {
      resetForm()
      setSelectedEmployees([])
    }
  }

  return (
    <LeadCreate
      modalVisible={isVisible}
      handleSubmit={handleSubmit}
      handleClose={handleCloseModal}
      employeeList={employeeList}
      fieldsSettings={fieldSettingData?.findManyTblModuleFieldsSetting}
      salutationData={salutationData?.findManyUserSalutation}
      marketingSources={marketingSourceData?.findManyMarketingSource}
      leadStatusData={leadStatusData?.findManyLeadStatus}
      locationData={locationData?.findAllowedLocation}
      isFieldSettingLoading={isFieldSettingLoading}
      isMarketingSourceLoading={isMarketingSourceLoading}
      isLocationLoading={isLocationLoading}
      isLeadStatusLoading={isLeadStatusLoading}
      isSalutationLoading={isSalutationLoading}
      customFields={customFields}
      initialValues={initialValues}
      validationObject={validationObject}
      loading={checkIsLoading()}
    />
  )
}

export default LeadCreateWeb
