import React, { FC } from 'react'
import { FullScreenReportModal, OperationType as Operation } from '@pabau/ui'
import { Formik } from 'formik'
import General from './General/index'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export interface ClientCreateProps {
  modalVisible?: boolean
  handleClose?: () => void
  selectTemplate?: string
  onSelectTemplate?: (string) => void
  searchText?: string
  onSearchTextChange?: (string) => void
}

export interface InitialDetailsProps {
  salutation: string
  firstName: string
  lastName: string
  gender: string
  hearOption: string
  dateOfBirth: Date
  preferredLanguage: string
  email: string
  phoneNumber: string
  telePhone: string
  address: string
  country: string
  city: string
  postCode: string
  thirdPartyDetails: string
  newsLetter: string
  sms: string
  postal: string
  phoneCalls: string
}

export const ClientCreate: FC<ClientCreateProps> = ({
  modalVisible = true,
  handleClose,
}) => {
  const { t } = useTranslation('common')

  const initialValues: InitialDetailsProps = {
    salutation: 'Mr',
    firstName: '',
    lastName: '',
    gender: 'Other',
    hearOption: t('quickCreate.client.modal.general.hearOption.selectOption'),
    dateOfBirth: new Date(),
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
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={() => console.log('submitted')}
    >
      {({ setFieldValue, handleSubmit, values, isValid, dirty, errors }) => {
        return (
          <FullScreenReportModal
            title={t('quickCreate.client.modal.newContact')}
            operations={[Operation.create]}
            visible={modalVisible}
            onBackClick={handleClose}
            createBtnText={t('quickCreate.client.modal.create')}
            subMenu={[
              t('quickCreate.client.modal.tab.general'),
              t('quickCreate.client.modal.tab.gpDetails'),
              t('quickCreate.client.modal.tab.customDetails'),
            ]}
            enableCreateBtn={isValid}
            onCreate={handleSubmit}
          >
            <General values={initialValues} setFieldValue={setFieldValue} />
            <div>{t('quickCreate.client.modal.tab.gpDetails')}</div>
            <div>{t('quickCreate.client.modal.tab.customDetails')}</div>
          </FullScreenReportModal>
        )
      }}
    </Formik>
  )
}

export default ClientCreate
