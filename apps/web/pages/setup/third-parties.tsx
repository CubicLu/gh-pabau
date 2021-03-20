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

import { gql } from '@apollo/client'
import CrudLayout from '../../components/CrudLayout/CrudLayout'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import { useMedia } from 'react-use'
import { NextPage } from 'next'

/* eslint-disable graphql/template-strings */
const LIST_QUERY = gql`
  query third_parties(
    $isActive: Boolean = true
    $type: [String!]
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
    $type: [String!]
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

export const schema: Schema = {
  full: 'Third Parties',
  fullLower: 'third parties',
  short: 'third parties',
  shortLower: 'third parties',
  createButtonLabel: 'Create Third Party',
  messages: {
    create: {
      success: 'You have successfully created a third party',
      error: 'While creating a third party',
    },
    update: {
      success: 'You have successfully updated a third party',
      error: 'While updating a third party',
    },
    delete: {
      success: 'You have successfully deleted a third party',
      error: 'While deleting a third party',
    },
  },
  fields: {
    name: {
      full: 'Third Party Name',
      fullLower: 'third party name',
      short: 'Name',
      shortLower: 'name',
      min: 2,
      max: 50,
      cssWidth: 'max',
      type: 'string',
    },
    provider_no: {
      full: 'Third Party Provider No',
      fullLower: 'third party provider no',
      short: 'Provider No',
      shortLower: 'provider no',
      min: 2,
      max: 50,
      cssWidth: 'max',
      type: 'string',
    },
    type: {
      full: 'Type',
      fullLower: 'type',
      short: 'Type',
      shortLower: 'type',
      min: 2,
      max: 50,
      cssWidth: 'max',
      type: 'string',
    },
    email: {
      full: 'Email',
      fullLower: 'email',
      short: 'Email',
      shortLower: 'email',
      min: 2,
      max: 50,
      cssWidth: 'max',
      type: 'string',
    },
    phone: {
      full: 'Phone',
      fullLower: 'phone',
      short: 'Phone',
      shortLower: 'phone',
      min: 2,
      max: 50,
      cssWidth: 'max',
      type: 'string',
    },
    is_active: {
      full: 'Status',
      type: 'boolean',
      defaultvalue: true,
    },
  },
}

const ThirdParties: NextPage = () => {
  const isMobile = useMedia('(max-width: 768px)', false)
  const { Option } = Select
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

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
        `Success! You have successfully created a third parties`
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        `Error! While creating a third parties`
      )
    },
  })

  const [editMutation] = useMutation(EDIT_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        `Success! You have successfully edited a third parties`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `Error! While editing a third parties`
      )
    },
  })

  const [deleteMutation] = useMutation(DELETE_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        `Success! You have successfully deleted a third parties`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `Error! While deleting a third parties`
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

  const handleBackClick = (e, handleReset) => {
    handleReset(e)
    setEditPage(formikEditFields())
    setShowModal(false)
  }

  const handleThirdPartyType = (type, setFieldValue) => {
    setFieldValue('type', type)
  }

  const handleOperationsType = () => {
    return !editPage.id
      ? [OperationType.active, OperationType.cancel, OperationType.create]
      : [
          OperationType.active,
          OperationType.cancel,
          OperationType.delete,
          OperationType.save,
        ]
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
    name: Yup.string().required('Name is required'),
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
          filterType: ['Company', 'Insurance'],
        }}
        onSubmit={(values) => {
          console.log('Filter Values:', values)
        }}
      >
        {({ setFieldValue, handleSubmit, handleReset, values }) => (
          <div className={styles.thirdPartyFilterContent}>
            {!isMobile && (
              <div className={classNames(styles.thirdPartyFilterHeader)}>
                <h6>Filter</h6>
              </div>
            )}
            <div className={styles.thirdPartyFilterBody}>
              <div className={styles.radioTextStyle}>
                <p>Status</p>
                <Radio.Group
                  onChange={(e) => {
                    setFieldValue('isActive', e.target.value)
                  }}
                  value={values.isActive}
                >
                  <Radio value={true}>
                    <span>Active</span>
                  </Radio>
                  <Radio value={false}>
                    <span>Disabled</span>
                  </Radio>
                </Radio.Group>
              </div>
              <div className={styles.filterType}>
                <p>Type</p>
                <SimpleDropdown
                  placeHolderText={'All Companies'}
                  value={values.type}
                  onSelected={(e) => {
                    onSelect(e, setFieldValue)
                  }}
                  dropdownItems={['Company', 'Insurance']}
                />
              </div>
              {!isMobile && (
                <div className={styles.filterAction}>
                  <Button
                    type="default"
                    onClick={() => clearAll(handleReset)}
                    className={styles.btnClearAll}
                  >
                    {' '}
                    Clear all{' '}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    Apply filters
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
            <h3>Type</h3>
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
                <span>Company</span>
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
                <span>Insurance</span>
                <img className={styles.imgActive} src={active} alt="checked" />
              </div>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>General</h3>
            <div className={styles.customForm}>
              <Form.Item label="Name" name="name">
                <Input name="name" placeholder="Enter Name" />
              </Form.Item>
              <Form.Item label="Provider No." name="providerNo">
                <Input name="providerNo" placeholder="Enter provider number" />
              </Form.Item>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>Contact information</h3>
            <div className={styles.customForm}>
              <Form.Item name="phone">
                <PhoneNumberInput
                  label="Phone"
                  value={values.phone}
                  onChange={(e) => setFieldValue('phone', e)}
                />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input name="email" placeholder="company@company.com" />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input name="website" placeholder="www.company.com" />
              </Form.Item>
              {values.type === 'Insurance' && (
                <Form.Item
                  label="Healthcode identifier"
                  name="healthCodeIdentifier"
                  tooltip="Contact your Healthcode representative to obtain this code"
                >
                  <Input
                    name="healthCodeIdentifier"
                    placeholder="www.company.com"
                  />
                </Form.Item>
              )}
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <h3>Address information</h3>
            <div className={styles.customForm}>
              <Form.Item label={'Country'} name="country">
                <Select
                  name="country"
                  showSearch
                  placeholder="Select Country"
                  value={values.country ? values.country : 'Select country'}
                >
                  {countryOptions()}
                </Select>
              </Form.Item>
              <Form.Item label={'City'} name="city">
                <Input name="city" placeholder="Enter city" />
              </Form.Item>
              <Form.Item label={'Street'} name="street">
                <Input name="street" placeholder="Enter street" />
              </Form.Item>
              <Form.Item label={'Post code'} name="postCode">
                <Input name="postCode" placeholder="Enter post code" />
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
            title={`${!editPage.id ? 'Create' : 'Edit'} Third Parties`}
            visible={showModal}
            operations={handleOperationsType()}
            enableCreateBtn={true}
            onCancel={(e) => handleBackClick(e, handleReset)}
            onBackClick={(e) => handleBackClick(e, handleReset)}
            activated={values.isActive}
            onActivated={(value) => setFieldValue('isActive', value)}
            onDelete={showDelteConfirmDialog}
            onCreate={handleSubmit}
            onSave={handleSubmit}
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
            title={`Delete ${schema.short}?`}
            newButtonText={schema.deleteBtnLabel || 'Yes, Delete'}
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
              {editPage?.name} will be deleted. This action is irreversable
            </span>
          </Modal>
        </>
      )}
    </Formik>
  )
}

export default ThirdParties
