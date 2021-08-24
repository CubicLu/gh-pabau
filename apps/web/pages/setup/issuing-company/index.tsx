import { gql, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import React, { useState } from 'react'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import {
  FullScreenReportModal,
  PhoneNumberInput,
  Notification,
  NotificationType,
  FormikInput,
  OperationType,
  BasicModal as Modal,
} from '@pabau/ui'
import { Form, Select, Switch } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './issuing-company.module.less'

const LIST_QUERY = gql`
  query issuing_company($isActive: Boolean = true, $offset: Int, $limit: Int) {
    issuing_company(
      offset: $offset
      limit: $limit
      order_by: { order: desc }
      where: { is_active: { _eq: $isActive } }
    ) {
      __typename
      id
      name
      phone
      website
      is_active
      country
      city
      street
      post_code
      invoice_template
      invoice_prefix
      invoice_starting_number
      vat_registered
      order
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query issuing_company_aggregate($isActive: Boolean = true) {
    issuing_company_aggregate(where: { is_active: { _eq: $isActive } }) {
      aggregate {
        count
      }
    }
  }
`
const DELETE_MUTATION = gql`
  mutation delete_issuing_company_by_pk($id: uuid!) {
    delete_issuing_company_by_pk(id: $id) {
      __typename
      id
    }
  }
`
const ADD_MUTATION = gql`
  mutation insert_issuing_company_one(
    $companyName: String!
    $phone: String
    $website: String
    $country: String
    $city: String
    $street: String
    $postCode: numeric
    $invoiceTemplate: String
    $invoicePrefix: String
    $invoiceStartingNumber: numeric
    $vatRegistered: Boolean
    $isActive: Boolean
  ) {
    insert_issuing_company_one(
      object: {
        name: $companyName
        phone: $phone
        website: $website
        country: $country
        city: $city
        street: $street
        post_code: $postCode
        invoice_template: $invoiceTemplate
        invoice_prefix: $invoicePrefix
        invoice_starting_number: $invoiceStartingNumber
        vat_registered: $vatRegistered
        is_active: $isActive
      }
    ) {
      __typename
      id
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_issuing_company_by_pk(
    $id: uuid!
    $companyName: String!
    $phone: String
    $website: String
    $country: String
    $city: String
    $street: String
    $postCode: numeric
    $invoiceTemplate: String
    $invoicePrefix: String
    $invoiceStartingNumber: numeric
    $vatRegistered: Boolean
    $isActive: Boolean
  ) {
    update_issuing_company_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $companyName
        phone: $phone
        website: $website
        country: $country
        city: $city
        street: $street
        post_code: $postCode
        invoice_template: $invoiceTemplate
        invoice_prefix: $invoicePrefix
        invoice_starting_number: $invoiceStartingNumber
        vat_registered: $vatRegistered
        is_active: $isActive
      }
    ) {
      __typename
      id
      is_active
    }
  }
`

const UPDATE_ORDER_MUTATION = gql`
  mutation update_issuing_company_order($id: uuid!, $order: Int) {
    update_issuing_company(
      where: { id: { _eq: $id } }
      _set: { order: $order }
    ) {
      affected_rows
    }
  }
`

interface InputTypes {
  companyName: string
  phone: string
  website: string
  country: string
  city: string
  street: string
  postCode: string
  invoiceTemplate: string
  invoicePrefix: string
  invoiceStartingNumber: string
  vatRegistered: boolean
  isActive: boolean
}

interface EditFieldsTypes {
  id: string
  name: string
  phone: string
  website: string
  country: string
  city: string
  street: string
  post_code: string
  invoice_template: string
  invoice_prefix: string
  invoice_starting_number: string
  vat_registered: boolean
  is_active: boolean
}

interface FocusedTypes {
  general?: boolean
  address?: boolean
  financial?: boolean
}

export const IssuingCompany: NextPage = () => {
  const { t } = useTranslationI18()
  const [showModal, setShowModal] = useState<boolean>(false)
  const { Option } = Select
  const [focused, setFocused] = useState<FocusedTypes>({
    general: false,
    address: false,
    financial: false,
  })
  const schema: Schema = {
    full: t('setup.issuing.title'),
    fullLower: t('setup.issuing.title.lower'),
    short: t('setup.issuing.title.short'),
    shortLower: t('setup.issuing.title.short.lower'),
    createButtonLabel: t('setup.issuing.createbutton'),
    messages: {
      create: {
        success: t('setup.issuing.notification.create.success'),
        error: t('setup.issuing.notification.create.error'),
      },
      update: {
        success: t('setup.issuing.notification.edit.success'),
        error: t('setup.issuing.notification.edit.error'),
      },
      delete: {
        success: t('setup.issuing.notification.delete.success'),
        error: t('setup.issuing.notification.delete.error'),
      },
    },
    fields: {
      name: {
        full: t('setup.issuing.fields.name'),
        fullLower: t('setup.issuing.fields.name.lower'),
        short: t('setup.issuing.fields.name.short'),
        shortLower: t('setup.issuing.fields.name.short.lower'),
        min: 2,
        example: t('setup.issuing.fields.name.example'),
        cssWidth: 'max',
        type: 'string',
      },
      address: {
        full: t('setup.issuing.fields.address'),
        fullLower: t('setup.issuing.fields.address.lower'),
        short: t('setup.issuing.fields.address.short'),
        shortLower: t('setup.issuing.fields.address.short.lower'),
        min: 2,
        example: t('setup.issuing.fields.address.example'),
        cssWidth: 'max',
        type: 'string',
      },
      is_active: {
        full: t('setup.issuing.fields.isactive'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
  }
  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.issuing.notification.create.success')
      )
      setShowModal(false)
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.issuing.notification.create.error')
      )
    },
  })

  const [editMutation] = useMutation(EDIT_MUTATION, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.issuing.notification.edit.success')
      )
      setShowModal(false)
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.issuing.notification.edit.error')
      )
    },
  })

  const [deleteMutation] = useMutation(DELETE_MUTATION, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        t('setup.issuing.notification.delete.success')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.issuing.notification.delete.error')
      )
    },
  })

  const setEditFields = () => {
    const editObj = {
      id: editPage.id,
      companyName: editPage.name,
      phone: editPage.phone,
      website: editPage.website,
      country: editPage.country,
      city: editPage.city,
      street: editPage.street,
      postCode: editPage.post_code,
      invoiceTemplate: editPage.invoice_template,
      invoicePrefix: editPage.invoice_prefix,
      invoiceStartingNumber: editPage.invoice_starting_number,
      vatRegistered: editPage.vat_registered,
      isActive: editPage.is_active,
    }
    return editObj
  }

  const formikFields = () => {
    const initialValues: InputTypes = {
      companyName: '',
      phone: undefined,
      website: null,
      country: null,
      city: null,
      street: null,
      postCode: undefined,
      invoiceTemplate: null,
      invoicePrefix: null,
      invoiceStartingNumber: undefined,
      vatRegistered: false,
      isActive: true,
    }
    return initialValues
  }

  const formikEditFields = () => {
    const fields: EditFieldsTypes = {
      id: '',
      name: '',
      phone: '',
      website: '',
      country: '',
      city: '',
      street: '',
      post_code: '',
      invoice_template: '',
      invoice_prefix: '',
      invoice_starting_number: '',
      vat_registered: false,
      is_active: true,
    }
    return fields
  }

  const [editPage, setEditPage] = useState<EditFieldsTypes>(formikEditFields())
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  countries.registerLocale(english)
  const countriesName = countries.getNames('en')

  const createOptions = () => {
    const options = Object.keys(countriesName).map((c) => (
      <Option key={c} value={countriesName[c]}>
        {countriesName[c]}
      </Option>
    ))
    return options
  }

  const issuingCompanySchema = Yup.object({
    companyName: Yup.string().required(
      t('setup.issuing.company.validate.required')
    ),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editPage?.id ? setEditFields() : formikFields(),
    validationSchema: issuingCompanySchema,
    onSubmit: (values) => {
      formik.validateForm().then(async () => {
        await (!editPage.id
          ? addMutation({
              variables: values,
              optimisticResponse: {},
            })
          : editMutation({
              variables: values,
              optimisticResponse: {},
            }))
      })
    },
  })

  const showDeleteConfirmDialog = () => {
    setShowDeleteModal(true)
  }

  const onchange = (value: string | boolean | number, key: string) => {
    formik.setFieldValue(key, value)
  }

  const createPageOnClick = () => {
    setEditPage(formikEditFields())
    setFocused({ general: false, address: false, financial: false })
    setShowModal(true)
  }

  const handleFocusElement = (name: string, status: boolean) => {
    setFocused({ [name]: status })
  }

  const handleSetEditPage = (value: EditFieldsTypes) => {
    setFocused({ general: true, address: true, financial: true })
    setEditPage(value)
    setShowModal(true)
  }

  const handlePhoneInputValue = (): string => {
    return formik.values.phone
  }

  const handleFullScreenModalBackClick = () => {
    setShowModal(false)
    formik.handleReset(true)
  }

  const handleOperations = () => {
    return !editPage.id
      ? [OperationType.active, OperationType.create]
      : [OperationType.active, OperationType.delete, OperationType.create]
  }

  const ModalContents = () => {
    return (
      <div className={styles.mainWrapper}>
        <Form layout="vertical">
          <div
            className={
              focused.general
                ? styles.focusedContentWrapper
                : styles.contentWrapper
            }
            onFocus={() => handleFocusElement('general', true)}
            onBlur={() => handleFocusElement('general', false)}
          >
            <h3>{t('setup.issuing.form.field.general')}</h3>
            <div className={styles.customForm}>
              <Form.Item label={t('setup.issuing.form.field.companyname')}>
                <FormikInput
                  name="companyName"
                  placeholder={t(
                    'setup.issuing.form.field.companyname.placeholder'
                  )}
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                />
                {formik.errors.companyName && (
                  <div className={styles.error}>
                    {formik.errors.companyName}
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <PhoneNumberInput
                  label={t('setup.issuing.form.field.phone')}
                  value={handlePhoneInputValue()}
                  onChange={(e: string) => onchange(e, 'phone')}
                />
              </Form.Item>
              <Form.Item label={t('setup.issuing.form.field.website')}>
                <FormikInput
                  name="website"
                  placeholder={t(
                    'setup.issuing.form.field.website.placeholder'
                  )}
                  onChange={formik.handleChange}
                  value={formik.values.website}
                />
              </Form.Item>
            </div>
          </div>
          <div
            className={
              focused.address
                ? styles.focusedContentWrapper
                : styles.contentWrapper
            }
            onFocus={() => handleFocusElement('address', true)}
            onBlur={() => handleFocusElement('address', false)}
          >
            <h3>{t('setup.issuing.form.field.address')}</h3>
            <div className={styles.customForm}>
              <Form.Item label={t('setup.issuing.form.field.country')}>
                <Select
                  showSearch
                  value={
                    formik.values.country
                      ? formik.values.country
                      : t('setup.issuing.form.field.country.placeholder')
                  }
                  onChange={(e) => onchange(e, 'country')}
                >
                  {createOptions()}
                </Select>
              </Form.Item>
              <Form.Item label={t('setup.issuing.form.field.city')}>
                <FormikInput
                  name="city"
                  placeholder={t('setup.issuing.form.field.city.placeholder')}
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
              </Form.Item>
              <Form.Item label={t('setup.issuing.form.field.street')}>
                <FormikInput
                  name="street"
                  placeholder={t('setup.issuing.form.field.street.placeholder')}
                  className="input-style"
                  onChange={formik.handleChange}
                  value={formik.values.street}
                />
              </Form.Item>
              <Form.Item label={t('setup.issuing.form.field.postcode')}>
                <FormikInput
                  name="postCode"
                  placeholder={t(
                    'setup.issuing.form.field.postcode.placeholder'
                  )}
                  className="input-style"
                  onChange={formik.handleChange}
                  value={formik.values.postCode}
                />
              </Form.Item>
            </div>
          </div>
          <div
            className={
              focused.financial
                ? styles.focusedContentWrapper
                : styles.contentWrapper
            }
            onFocus={() => handleFocusElement('financial', true)}
            onBlur={() => handleFocusElement('financial', false)}
          >
            <h3>{t('setup.issuing.form.field.financial')}</h3>
            <div className={styles.customForm}>
              <Form.Item label={t('setup.issuing.form.field.invoicetemplate')}>
                <Select
                  onChange={(e) => onchange(e, 'invoiceTemplate')}
                  value={
                    formik.values.invoiceTemplate
                      ? formik.values.invoiceTemplate
                      : t(
                          'setup.issuing.form.field.invoicetemplate.placeholder'
                        )
                  }
                >
                  <Option value="I">I</Option>
                  <Option value="II">II</Option>
                  <Option value="III">III</Option>
                  <Option value="IV">IV</Option>
                  <Option value="V">V</Option>
                </Select>
              </Form.Item>
              <Form.Item label={t('setup.issuing.form.field.invoiceprefix')}>
                <FormikInput
                  name="invoicePrefix"
                  placeholder={t(
                    'setup.issuing.form.field.invoiceprefix.placeholder'
                  )}
                  onChange={formik.handleChange}
                  value={formik.values.invoicePrefix}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.issuing.form.field.invoicestartingnumber')}
              >
                <FormikInput
                  name="invoiceStartingNumber"
                  placeholder={t(
                    'setup.issuing.form.field.invoicestartingnumber.placeholder'
                  )}
                  onChange={formik.handleChange}
                  value={formik.values.invoiceStartingNumber}
                />
              </Form.Item>
              <Form.Item>
                <div className={styles.operationSwitch}>
                  {`${t('setup.issuing.form.field.vat')} `}
                  <Switch
                    size="small"
                    checked={formik.values.vatRegistered}
                    onChange={(checked) => onchange(checked, 'vatRegistered')}
                    style={{ marginLeft: '12px' }}
                  />
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }
  return (
    <>
      <CrudLayout
        schema={schema}
        tableSearch={false}
        addQuery={ADD_MUTATION}
        deleteQuery={DELETE_MUTATION}
        listQuery={LIST_QUERY}
        editQuery={EDIT_MUTATION}
        aggregateQuery={LIST_AGGREGATE_QUERY}
        updateOrderQuery={UPDATE_ORDER_MUTATION}
        addFilter={true}
        createPage={true}
        createPageOnClick={createPageOnClick}
        setEditPage={handleSetEditPage}
      />
      <FullScreenReportModal
        operations={handleOperations()}
        title={t('setup.issuing.fullscreenmodal.title', {
          what: !editPage.id
            ? t('common-label-create')
            : t('common-label-edit'),
        })}
        deleteBtnText={t('common-label-delete')}
        visible={showModal}
        onBackClick={() => handleFullScreenModalBackClick()}
        activated={formik.values.isActive}
        activeBtnText={
          formik.values.isActive
            ? t('common-label-active')
            : t('common-label-inactive')
        }
        enableCreateBtn={true}
        createBtnText={
          !editPage.id ? t('common-label-create') : t('common-label-save')
        }
        onActivated={(value) => onchange(value, 'isActive')}
        onCreate={() => formik.handleSubmit()}
        onDelete={showDeleteConfirmDialog}
        footer={true}
      >
        {ModalContents()}
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
          setShowDeleteModal(false)
          setShowModal(false)
        }}
        visible={showDeleteModal}
        title={t('setup.issuing.deletemodal.title', { what: schema.short })}
        newButtonText={
          schema.deleteBtnLabel || t('setup.issuing.deletemodal.button')
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
          {t('setup.issuing.deletemodal.message', { what: editPage?.name })}
        </span>
      </Modal>
    </>
  )
}

export default IssuingCompany
