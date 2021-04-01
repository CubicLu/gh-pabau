import React, { useState } from 'react'
import {
  OperationType,
  FullScreenReportModal,
  PhoneNumberInput,
  Notification,
  NotificationType,
  BasicModal as Modal,
  SimpleDropdown,
  Button,
} from '@pabau/ui'
import countries from 'i18n-iso-countries'
import * as Yup from 'yup'
import english from 'i18n-iso-countries/langs/en.json'
import { Form, Input, Select } from 'formik-antd'
import { Radio } from 'antd'
import classNames from 'classnames'
import styles from './third-parties.module.less'
import active from '../../assets/images/active.svg'
import company from '../../assets/images/company.svg'
import activeCompany from '../../assets/images/active-company.svg'
import insurance from '../../assets/images/insurance.svg'
import activeInsurance from '../../assets/images/active-insurance.svg'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { gql } from '@apollo/client'
import CrudLayout from '../../components/CrudLayout/CrudLayout'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { useMedia } from 'react-use'
import { NextPage } from 'next'

const LIST_QUERY = gql`
  query third_parties(
    $isActive: Boolean = true
    $offset: Int
    $limit: Int
    $searchTerm: String = ""
  ) {
    third_parties(
      offset: $offset
      limit: $limit
      order_by: { order: desc }
      where: {
        is_active: { _eq: $isActive }
        _or: [{ _and: [{ name: { _ilike: $searchTerm } }] }]
      }
    ) {
      id
      name
      provider_no
      type
      email
      phone
      website
      health_code_identifier
      country
      city
      street
      post_code
      is_active
      order
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query third_parties_aggregate(
    $isActive: Boolean = true
    $searchTerm: String = ""
  ) {
    third_parties_aggregate(
      where: {
        is_active: { _eq: $isActive }
        _or: [{ _and: [{ name: { _ilike: $searchTerm } }] }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

const ADD_MUTATION = gql`
  mutation insert_third_parties_one(
    $name: String!
    $providerNo: String
    $type: String
    $email: String
    $phone: String
    $website: String
    $healthCodeIdentifier: String
    $country: String
    $city: String
    $street: String
    $postCode: String
    $isActive: Boolean
  ) {
    insert_third_parties_one(
      object: {
        name: $name
        provider_no: $providerNo
        type: $type
        email: $email
        phone: $phone
        website: $website
        health_code_identifier: $healthCodeIdentifier
        country: $country
        city: $city
        street: $street
        post_code: $postCode
        is_active: $isActive
      }
    ) {
      __typename
      id
    }
  }
`

const EDIT_MUTATION = gql`
  mutation update_job_title_by_pk(
    $id: uuid!
    $name: String!
    $providerNo: String
    $type: String
    $email: String
    $phone: String
    $website: String
    $healthCodeIdentifier: String
    $country: String
    $city: String
    $street: String
    $postCode: String
    $isActive: Boolean
  ) {
    update_third_parties_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        provider_no: $providerNo
        type: $type
        email: $email
        phone: $phone
        website: $website
        health_code_identifier: $healthCodeIdentifier
        country: $country
        city: $city
        street: $street
        post_code: $postCode
        is_active: $isActive
      }
    ) {
      id
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete_third_parties_by_pk($id: uuid!) {
    delete_third_parties_by_pk(id: $id) {
      id
    }
  }
`
const UPDATE_ORDER_MUTATION = gql`
  mutation update_third_parties_order($id: uuid!, $order: Int) {
    update_third_parties(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`

const ThirdParties: NextPage = () => {
  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 768px)', false)
  const { Option } = Select
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const schema: Schema = {
    full: t('setup.third.schema.full'),
    fullLower: t('setup.third.schema.full.lower'),
    short: t('setup.third.schema.short'),
    shortLower: t('setup.third.schema.short.lower'),
    createButtonLabel: t('setup.third.schema.createbutton'),
    messages: {
      create: {
        success: t('setup.third.schema.message.create.success'),
        error: t('setup.third.schema.message.create.error'),
      },
      update: {
        success: t('setup.third.schema.message.edit.success'),
        error: t('setup.third.schema.message.edit.error'),
      },
      delete: {
        success: t('setup.third.schema.message.delete.success'),
        error: t('setup.third.schema.message.delete.error'),
      },
    },
    fields: {
      name: {
        full: t('setup.third.schema.name.full'),
        fullLower: t('setup.third.schema.name.full.lower'),
        short: t('setup.third.schema.name.short'),
        shortLower: t('setup.third.schema.name.short.lower'),
        min: 2,
        max: 50,
        cssWidth: 'max',
        type: 'string',
      },
      provider_no: {
        full: t('setup.third.schema.provider.full'),
        fullLower: t('setup.third.schema.provider.full.lower'),
        short: t('setup.third.schema.provider.short'),
        shortLower: t('setup.third.schema.provider.short.lower'),
        min: 2,
        max: 50,
        cssWidth: 'max',
        type: 'string',
      },
      type: {
        full: t('setup.third.schema.type.full'),
        fullLower: t('setup.third.schema.type.full.lower'),
        short: t('setup.third.schema.type.short'),
        shortLower: t('setup.third.schema.type.short.lower'),
        min: 2,
        max: 50,
        cssWidth: 'max',
        type: 'string',
      },
      email: {
        full: t('setup.third.schema.email.full'),
        fullLower: t('setup.third.schema.email.full.lower'),
        short: t('setup.third.schema.email.short'),
        shortLower: t('setup.third.schema.email.short.lower'),
        min: 2,
        max: 50,
        cssWidth: 'max',
        type: 'string',
      },
      phone: {
        full: t('setup.third.schema.phone.full'),
        fullLower: t('setup.third.schema.phone.full.lower'),
        short: t('setup.third.schema.phone.short'),
        shortLower: t('setup.third.schema.phone.short.lower'),
        min: 2,
        max: 50,
        cssWidth: 'max',
        type: 'string',
      },
      is_active: {
        full: t('setup.third.schema.isactive.full'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
  }

  const formikEditFields = () => {
    const fields: ThirdPartiesEditFieldsType = {
      id: '',
      type: '',
      name: '',
      provider_no: '',
      phone: '',
      email: '',
      website: '',
      country: '',
      city: '',
      street: '',
      post_code: '',
      healthCodeIdentifier: '',
      is_active: true,
    }
    return fields
  }
  const [editPage, setEditPage] = useState<ThirdPartiesEditFieldsType>(
    formikEditFields()
  )

  countries.registerLocale(english)
  const countriesName = countries.getNames('en')

  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.third.notification.create.success')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.third.notification.create.error')
      )
    },
  })

  const [editMutation] = useMutation(EDIT_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.third.notification.edit.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.third.notification.edit.error')
      )
    },
  })

  const [deleteMutation] = useMutation(DELETE_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.third.notification.delete.success')
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        t('setup.third.notification.delete.error')
      )
    },
  })

  const initialValues = {
    type: '',
    name: '',
    providerNo: '',
    phone: '',
    email: '',
    website: '',
    country: '',
    city: '',
    street: '',
    postCode: '',
    healthCodeIdentifier: '',
    isActive: true,
  }

  const setEditFields = () => {
    const editObj = {
      id: editPage.id,
      type: editPage.type,
      name: editPage.name,
      providerNo: editPage.provider_no,
      phone: editPage.phone,
      email: editPage.email,
      website: editPage.website,
      country: editPage.country,
      city: editPage.city,
      street: editPage.street,
      postCode: editPage.post_code,
      healthCodeIdentifier: editPage.healthCodeIdentifier,
      isActive: editPage.is_active,
    }
    return editObj
  }

  const createPageOnClick = (setFieldValue) => {
    setFieldValue('type', 'Company')
    setEditPage(formikEditFields())
    setShowModal(true)
  }

  const handleBackClick = (handleReset) => {
    handleReset()
    setEditPage(formikEditFields())
    setShowModal(false)
  }

  const handleThirdPartyType = (type, setFieldValue) => {
    setFieldValue('type', type)
  }

  const handleOperationsType = () => {
    return !editPage.id
      ? [OperationType.active, OperationType.create]
      : [OperationType.active, OperationType.delete, OperationType.create]
  }

  const handleEditPage = (data) => {
    setEditPage(data)
    setShowModal(true)
  }

  const showDelteConfirmDialog = () => {
    setShowDeleteModal(true)
  }

  const onSubmit = async (values, { resetForm }) => {
    !editPage.id
      ? await addMutation({
          variables: values,
          optimisticResponse: {},
        })
      : await editMutation({
          variables: values,
          optimisticResponse: {},
        })
    resetForm()
    setEditPage(formikEditFields())
    setShowModal(false)
  }

  const countryOptions = () => {
    const options = Object.keys(countriesName).map((c) => (
      <Option key={c} value={countriesName[c]}>
        {countriesName[c]}
      </Option>
    ))
    return options
  }

  const thirdPartiesSchema = Yup.object({
    name: Yup.string().required(t('setup.third.name.validate.required')),
  })

  const onSelect = (value: string, setFieldValue) => {
    setFieldValue('type', value)
    setFieldValue('filterType', value)
  }

  const clearAll = (handleReset) => {
    handleReset()
  }

  const customFilter = () => {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          type: null,
          isActive: true,
          filterType: [
            t('setup.third.filter.type.company'),
            t('setup.third.filter.type.insurance'),
          ],
        }}
        onSubmit={(values) => {
          console.log('Filter Values:', values)
        }}
      >
        {({ setFieldValue, handleSubmit, handleReset, values }) => (
          <div className={styles.thirdPartyFilterContent}>
            {!isMobile && (
              <div className={classNames(styles.thirdPartyFilterHeader)}>
                <h6>{t('setup.third.filter')}</h6>
              </div>
            )}
            <div className={styles.thirdPartyFilterBody}>
              <div className={styles.radioTextStyle}>
                <p>{t('setup.third.filter.status')}</p>
                <Radio.Group
                  onChange={(e) => {
                    setFieldValue('isActive', e.target.value)
                  }}
                  value={values.isActive}
                >
                  <Radio value={true}>
                    <span>{t('setup.third.filter.status.active')}</span>
                  </Radio>
                  <Radio value={false}>
                    <span>{t('setup.third.filter.status.diabled')}</span>
                  </Radio>
                </Radio.Group>
              </div>
              <div className={styles.filterType}>
                <p>{t('setup.third.filter.type')}</p>
                <SimpleDropdown
                  placeHolderText={t('setup.third.filter.type.placeholder')}
                  value={values.type}
                  onSelected={(e) => {
                    onSelect(e, setFieldValue)
                  }}
                  dropdownItems={[
                    t('setup.third.filter.type.company'),
                    t('setup.third.filter.type.insurance'),
                  ]}
                />
              </div>
              {!isMobile && (
                <div className={styles.filterAction}>
                  <Button
                    type="default"
                    onClick={() => clearAll(handleReset)}
                    className={styles.btnClearAll}
                  >
                    {t('setup.third.filter.clear')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    {t('setup.third.filter.apply')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Formik>
    )
  }

  const modelContent = (setFieldValue, values) => {
    return (
      <div className={styles.mainWrapper}>
        <Form layout="vertical">
          <div className={styles.contentWrapper}>
            <h3>{t('setup.third.form.type')}</h3>
            <div className={styles.thirdPartyType}>
              <div
                className={
                  values.type === 'Company'
                    ? classNames(styles.typeWrapper, styles.active)
                    : styles.typeWrapper
                }
                onClick={() => handleThirdPartyType('Company', setFieldValue)}
              >
                {values.type === 'Company' ? (
                  <img src={activeCompany} alt="companyLogo" />
                ) : (
                  <img src={company} alt="companyLogo" />
                )}
                <span>{t('setup.third.form.type.company')}</span>
                <img className={styles.imgActive} src={active} alt="checked" />
              </div>
              <div
                className={
                  values.type === 'Insurance'
                    ? classNames(styles.typeWrapper, styles.active)
                    : styles.typeWrapper
                }
                onClick={() => handleThirdPartyType('Insurance', setFieldValue)}
              >
                {values.type === 'Insurance' ? (
                  <img src={activeInsurance} alt="insuranceLogo" />
                ) : (
                  <img src={insurance} alt="insuranceLogo" />
                )}
                <span>{t('setup.third.form.type.insurance')}</span>
                <img className={styles.imgActive} src={active} alt="checked" />
              </div>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>{t('setup.third.form.general')}</h3>
            <div className={styles.customForm}>
              <Form.Item label={t('setup.third.form.general.name')} name="name">
                <Input
                  name="name"
                  placeholder={t('setup.third.form.general.name.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.general.provider')}
                name="providerNo"
              >
                <Input
                  name="providerNo"
                  placeholder={t(
                    'setup.third.form.general.provider.placeholder'
                  )}
                />
              </Form.Item>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>{t('setup.third.form.contact')}</h3>
            <div className={styles.customForm}>
              <Form.Item name="phone">
                <PhoneNumberInput
                  label={t('setup.third.form.contact.phone')}
                  value={values.phone}
                  onChange={(e) => setFieldValue('phone', e)}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.contact.email')}
                name="email"
              >
                <Input
                  name="email"
                  placeholder={t('setup.third.form.contact.email.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.contact.website')}
                name="website"
              >
                <Input
                  name="website"
                  placeholder={t(
                    'setup.third.form.contact.website.placeholder'
                  )}
                />
              </Form.Item>
              {values.type === 'Insurance' && (
                <Form.Item
                  label={t('setup.third.form.contact.healthcode')}
                  name="healthCodeIdentifier"
                  tooltip={t('setup.third.form.contact.healthcode.tooltip')}
                >
                  <Input
                    name="healthCodeIdentifier"
                    placeholder={t(
                      'setup.third.form.contact.healthcode.placeholder'
                    )}
                  />
                </Form.Item>
              )}
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>{t('setup.third.form.address')}</h3>
            <div className={styles.customForm}>
              <Form.Item
                label={t('setup.third.form.address.country')}
                name="country"
              >
                <Select
                  name="country"
                  showSearch
                  placeholder={t(
                    'setup.third.form.address.country.placeholder'
                  )}
                  value={
                    values.country
                      ? values.country
                      : t('setup.third.form.address.country.placeholder')
                  }
                >
                  {countryOptions()}
                </Select>
              </Form.Item>
              <Form.Item label={t('setup.third.form.address.city')} name="city">
                <Input
                  name="city"
                  placeholder={t('setup.third.form.address.city.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.address.street')}
                name="street"
              >
                <Input
                  name="street"
                  placeholder={t('setup.third.form.address.street.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.third.form.address.postcode')}
                name="postCode"
              >
                <Input
                  name="postCode"
                  placeholder={t(
                    'setup.third.form.address.postcode.placeholder'
                  )}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={editPage.id ? setEditFields() : initialValues}
      validationSchema={thirdPartiesSchema}
      onSubmit={(values, { resetForm }) => {
        const newValues = { ...values }
        if (values.type === 'company') {
          delete newValues.healthCodeIdentifier
        }
        onSubmit(newValues, { resetForm })
      }}
    >
      {({ setFieldValue, handleSubmit, handleReset, values }) => (
        <>
          <CrudLayout
            schema={schema}
            tableSearch={true}
            addQuery={ADD_MUTATION}
            deleteQuery={DELETE_MUTATION}
            listQuery={LIST_QUERY}
            editQuery={EDIT_MUTATION}
            aggregateQuery={LIST_AGGREGATE_QUERY}
            updateOrderQuery={UPDATE_ORDER_MUTATION}
            addFilter={true}
            createPage={true}
            isCustomFilter={true}
            customFilter={customFilter}
            createPageOnClick={() => createPageOnClick(setFieldValue)}
            setEditPage={handleEditPage}
          />
          <FullScreenReportModal
            title={
              !editPage.id
                ? t('setup.third.fullscreenmodal.title.edit')
                : t('setup.third.fullscreenmodal.title.create')
            }
            visible={showModal}
            operations={handleOperationsType()}
            enableCreateBtn={true}
            onBackClick={() => handleBackClick(handleReset)}
            activated={values.isActive}
            onActivated={(value) => setFieldValue('isActive', value)}
            onDelete={showDelteConfirmDialog}
            onCreate={handleSubmit}
            createBtnText={
              !editPage.id ? t('common-label-create') : t('common-label-save')
            }
            deleteBtnText={t('common-label-delete')}
            activeBtnText={
              values.isActive
                ? t('common-label-active')
                : t('common-label-inactive')
            }
            footer={true}
          >
            {modelContent(setFieldValue, values)}
          </FullScreenReportModal>
          <Modal
            modalWidth={682}
            centered={true}
            onCancel={() => {
              setShowDeleteModal(false)
            }}
            onOk={async () => {
              const { id } = editPage as { id: string }
              await deleteMutation({
                variables: { id },
                optimisticResponse: {},
              })
              setEditPage(formikEditFields())
              setShowDeleteModal(false)
              setShowModal(false)
            }}
            visible={showDeleteModal}
            title={t('setup.third.deletemodal.title', { what: schema.short })}
            newButtonText={
              schema.deleteBtnLabel || t('setup.third.deletemodal.button')
            }
            isValidate={true}
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
              {t('setup.third.deletemodal.message', { what: editPage?.name })}
            </span>
          </Modal>
        </>
      )}
    </Formik>
  )
}

export default ThirdParties
