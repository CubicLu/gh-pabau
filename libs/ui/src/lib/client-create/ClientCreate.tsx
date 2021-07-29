import React, { FC, useEffect, useState } from 'react'
import {
  BasicModal,
  FullScreenReportModal,
  OperationType as Operation,
} from '@pabau/ui'
import { Formik } from 'formik'
import General, { CommonProps } from './General/index'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { Dayjs } from 'dayjs'

export interface cmFieldsCreateProps {
  id: number
  label: string
  value: string
}

export interface ManageCustomFieldItemProps {
  id: number
  item_label?: string
}

export interface ManageCustomFieldProps {
  id: number
  field_label?: string
  field_type?: string
  is_required: number
  is_active?: boolean
  ManageCustomFieldItem: ManageCustomFieldItemProps[]
}

export interface CustomFieldsProps {
  id: number
  name: string
  CmFields: ManageCustomFieldProps[]
}

export interface LimitLocation {
  id: number
  name: string
}

export interface OtherCompany {
  company_id: number
  company_name: string
}

export interface InitialDetailsProps {
  salutation?: string
  Fname: string
  Lname: string
  gender: string
  MarketingSource: string
  DOB: Dayjs | undefined
  preferredLanguage?: string
  Email: string
  Mobile: string
  Phone: string
  MailingProvince?: string
  MailingCountry?: string
  MailingStreet?: string
  MailingCity: string
  MailingPostal: string
  OtherStreet?: string
  OtherProvince?: string
  OtherCity?: string
  OtherCountry?: string
  OtherPostal?: string
  MarketingOptInEmail?: boolean
  MarketingOptInText?: boolean
  MarketingOptInPost?: boolean
  MarketingOptInPhone?: boolean
  [key: string]: string | number | Dayjs | boolean | undefined | null
}

export interface FieldSetting {
  id: number
  field_name?: string
  field_label?: string
  is_required: number
  is_active?: boolean
}

export interface ClientCreateProps {
  modalVisible?: boolean
  handleClose?: () => void
  selectTemplate?: string
  onSelectTemplate?: (string) => void
  searchText?: string
  onSearchTextChange?: (string) => void
  handleSubmit?: (
    val,
    resetForm?: () => void,
    setSelectedLabels?: (
      value: ((prevState: Label[]) => Label[]) | Label[]
    ) => void
  ) => void
  isEdit?: boolean
  activated?: boolean
  onActivated?: (val: boolean) => void
  defaultLabels?: Label[]
  defaultSelectedLabels?: Label[]
  handleDelete?: () => void
  deleteModalVisible?: boolean
  onDelete?: () => void
  salutationData?: CommonProps[]
  customFields?: CustomFieldsProps[]
  fieldsSettings?: FieldSetting[]
  marketingSources?: CommonProps[]
  limitContactsLocations?: LimitLocation[]
  otherCompanies?: OtherCompany[]
  isLoading?: boolean
  isMarketingSourceLoading?: boolean
  labelsData?: LabelDataProps[]
  validationObject?: {
    [key: string]: Yup.AnyObjectSchema
  }
  initialValues: InitialDetailsProps
}

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

export const ClientCreate: FC<ClientCreateProps> = ({
  modalVisible = true,
  handleClose,
  handleSubmit,
  isEdit = false,
  activated,
  onActivated,
  defaultLabels,
  defaultSelectedLabels,
  handleDelete,
  deleteModalVisible,
  onDelete,
  labelsData,
  initialValues,
  validationObject,
  ...props
}) => {
  const { t } = useTranslation('common')
  const [labels, setLabels] = useState<Label[]>([])
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([])

  useEffect(() => {
    defaultLabels && setLabels(defaultLabels)
  }, [defaultLabels])

  useEffect(() => {
    defaultSelectedLabels && setSelectedLabels(defaultSelectedLabels)
  }, [defaultSelectedLabels])

  const validationSchema = Yup.object({
    ...validationObject,
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          setSubmitting(true)
          await handleSubmit?.(
            { ...values, selectedLabels, labels },
            resetForm,
            setSelectedLabels
          )
          setSubmitting(false)
        }}
      >
        {({ setFieldValue, handleSubmit, values, isSubmitting }) => (
          <FullScreenReportModal
            title={
              !isEdit
                ? t('quickCreate.client.modal.newContact')
                : t('clients.editClient')
            }
            operations={
              !isEdit
                ? [Operation.create]
                : [Operation.active, Operation.delete, Operation.create]
            }
            visible={modalVisible}
            onBackClick={handleClose}
            createBtnText={
              !isEdit
                ? t('quickCreate.client.modal.create')
                : t('common-label-save')
            }
            enableCreateBtn={!isSubmitting}
            onCreate={handleSubmit}
            activated={activated}
            onActivated={onActivated}
            deleteBtnText={t('common-label-delete')}
            activeBtnText={
              activated ? t('common-label-active') : t('common-label-archived')
            }
            onSave={handleSubmit}
            onDelete={handleDelete}
          >
            <General
              values={values}
              setFieldValue={setFieldValue}
              labels={labels}
              setLabels={setLabels}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
              labelsData={labelsData ?? []}
              {...props}
            />
          </FullScreenReportModal>
        )}
      </Formik>
      <BasicModal
        modalWidth={682}
        centered={true}
        visible={deleteModalVisible}
        title={t('clients.content.delete.title')}
        newButtonText={t('clients.content.delete.confirm.yes')}
        onOk={() => onDelete?.()}
        onCancel={handleDelete}
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
          {t('clients.content.delete.confirmMessage')}
        </span>
      </BasicModal>
    </>
  )
}

export default ClientCreate
