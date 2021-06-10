import React, { FC, useEffect, useState } from 'react'
import {
  BasicModal,
  FullScreenReportModal,
  OperationType,
  OperationType as Operation,
} from '@pabau/ui'
import { Formik } from 'formik'
import General from './General/index'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { Dayjs } from 'dayjs'

export interface ClientCreateProps {
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

export interface InitialDetailsProps {
  salutation?: string
  firstName: string
  lastName: string
  gender?: string
  hearOption?: string
  dateOfBirth: Dayjs | undefined
  preferredLanguage?: string
  email: string
  phoneNumber: string
  telePhone?: string
  address?: string
  country?: string
  city: string
  postCode: string
  thirdPartyDetails?: string
  newsLetter?: string
  sms?: string
  postal?: string
  phoneCalls?: string
}

export interface Label {
  label?: string
  color?: string
  count?: number
}

export const ClientCreate: FC<ClientCreateProps> = ({
  modalVisible = true,
  handleClose,
  handleSubmit,
  isEdit = false,
  editedValues,
  activated,
  onActivated,
  defaultLabels,
  defaultSelectedLabels,
  handleDelete,
  deleteModalVisible,
  onDelete,
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

  const initialValue: InitialDetailsProps = {
    salutation: 'Mr',
    firstName: '',
    lastName: '',
    gender: t('quickCreate.client.modal.general.gender.other'),
    hearOption: t('quickCreate.client.modal.general.hearOption.selectOption'),
    dateOfBirth: undefined,
    preferredLanguage: '',
    email: '',
    phoneNumber: '',
    telePhone: '',
    address: '',
    country: '',
    city: '',
    postCode: '',
    thirdPartyDetails: t(
      'quickCreate.client.modal.general.thirdParty.selfPaid'
    ),
    newsLetter: '',
    sms: '',
    postal: '',
    phoneCalls: '',
  }

  const [initialValues, setInitialValues] = useState(initialValue)

  useEffect(() => {
    if (isEdit && editedValues) {
      setInitialValues((prevState) => ({ ...prevState, ...editedValues }))
    }
  }, [isEdit, editedValues])

  const validationSchema = Yup.object({
    salutation: Yup.string().required(
      t('quickCreate.validation.salutation.required')
    ),
    firstName: Yup.string().required(
      t('quickCreate.validation.firstName.required')
    ),
    lastName: Yup.string().required(
      t('quickCreate.validation.lastName.required')
    ),
    gender: Yup.string().required(t('quickCreate.validation.gender.required')),
    dateOfBirth: Yup.date().required(
      t('quickCreate.validation.birthday.required')
    ),
    phoneNumber: Yup.string().required(
      t('quickCreate.validation.phoneNumber.required')
    ),
    hearOption: Yup.string().required(
      t('quickCreate.validation.hearOption.required')
    ),
    preferredLanguage: Yup.string().required(
      t('quickCreate.validation.preferredLanguage.required')
    ),
    email: Yup.string()
      .email(t('quickCreate.validation.email.validate'))
      .required(t('quickCreate.validation.email.required')),
    address: Yup.string().required(
      t('quickCreate.validation.address.required')
    ),
    country: Yup.string().required(
      t('quickCreate.validation.country.required')
    ),
    city: Yup.string().required(t('quickCreate.validation.city.required')),
    postCode: Yup.string().required(
      t('quickCreate.validation.postCode.required')
    ),
    thirdPartyDetails: Yup.string().required(
      t('quickCreate.validation.thirdPartyDetails.required')
    ),
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit?.({ ...values, labels, selectedLabels })
        }}
      >
        {({ setFieldValue, handleSubmit, values, isValid, dirty, errors }) => {
          return (
            <FullScreenReportModal
              title={
                !isEdit
                  ? t('quickCreate.client.modal.newContact')
                  : t('clients.editClient')
              }
              operations={
                !isEdit
                  ? [Operation.create]
                  : [
                      OperationType.active,
                      OperationType.delete,
                      OperationType.create,
                    ]
              }
              visible={modalVisible}
              onBackClick={handleClose}
              createBtnText={
                !isEdit
                  ? t('quickCreate.client.modal.create')
                  : t('common-label-save')
              }
              subMenu={[
                t('quickCreate.client.modal.tab.general'),
                t('quickCreate.client.modal.tab.gpDetails'),
                t('quickCreate.client.modal.tab.customDetails'),
              ]}
              enableCreateBtn={isValid}
              onCreate={handleSubmit}
              activated={activated}
              onActivated={onActivated}
              deleteBtnText={t('common-label-delete')}
              activeBtnText={
                activated
                  ? t('common-label-active')
                  : t('common-label-archived')
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
              />
              <div>{t('quickCreate.client.modal.tab.gpDetails')}</div>
              <div>{t('quickCreate.client.modal.tab.customDetails')}</div>
            </FullScreenReportModal>
          )
        }}
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
