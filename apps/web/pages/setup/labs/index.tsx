import React, { useState } from 'react'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import {
  OperationType,
  NotificationBanner,
  Notification,
  NotificationType,
  FullScreenReportModal,
  PhoneNumberInput,
} from '@pabau/ui'
import {
  useInsertLabsOneMutation,
  useUpdateLabsByPkMutation,
  useDeleteLabsByPkMutation,
  InsertLabsOneDocument,
  DeleteLabsByPkDocument,
  UpdateLabsByPkDocument,
  LabsTmpDocument,
  LabsAggregateDocument,
  UpdateLabsOrderDocument,
} from '@pabau/graphql'
import * as Yup from 'yup'
import { Form, Input } from 'formik-antd'
import notificationBannerLabPageImage from '../../../assets/images/notification-image-lab-page.png'
import { NextPage } from 'next'
import { Formik } from 'formik'
import styles from './index.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const Labs: NextPage = () => {
  const { t } = useTranslationI18()
  const schema: Schema = {
    full: t('setup.labs.data.capitalizelabs'),
    fullLower: t('setup.labs.data.lowercaselabs'),
    short: t('setup.labs.data.capitalizelab'),
    shortLower: t('setup.labs.data.lowercaselab'),
    createButtonLabel: t('setup.labs.data.createlab'),
    messages: {
      create: {
        success: t('setup.labs.data.createlabsuccessmessage'),
        error: t('setup.labs.data.createlaberrormessage'),
      },
      update: {
        success: t('setup.labs.data.updatelabsuccessmessage'),
        error: t('setup.labs.data.updatelaberrormessage'),
      },
      delete: {
        success: t('setup.labs.data.deletelabsuccessmessage'),
        error: t('setup.labs.data.deletelaberrormessage'),
      },
    },
    fields: {
      name: {
        full: t('setup.labs.data.capitallabname'),
        fullLower: t('setup.labs.data.lowercaselabname'),
        short: t('setup.labs.data.capitalname'),
        shortLower: t('setup.labs.data.lowercasename'),
        min: 2,
        example: 'Surgical lab',
        cssWidth: 'max',
        type: 'string',
      },
      integration: {
        full: t('setup.labs.data.capitalintegration'),
        type: 'boolean',
        defaultvalue: true,
      },
      is_active: {
        full: t('setup.labs.data.capitalstatus'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
  }
  const [showModal, setShowModal] = useState<boolean>(false)
  const formikEditFields = () => {
    const fields: LabsEditFieldsType = {
      id: '',
      name: '',
      provider_number: null,
      phone: '',
      email: '',
      country: '',
      city: '',
      street: '',
      street2: '',
      postal_code: null,
      is_active: true,
    }
    return fields
  }
  const [editPage, setEditPage] = useState<LabsEditFieldsType>(
    formikEditFields()
  )

  const [addMutation] = useInsertLabsOneMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        `${t('setup.labs.data.success')}${t(
          'setup.labs.data.createlabsuccessmessage'
        )}`
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        `${t('setup.labs.data.error')}${t(
          'setup.labs.data.createlaberrormessage'
        )}`
      )
    },
  })

  const [editMutation] = useUpdateLabsByPkMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        `${t('setup.labs.data.success')}${t(
          'setup.labs.data.updatelabsuccessmessage'
        )}`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `${t('setup.labs.data.error')}${t(
          'setup.labs.data.updatelaberrormessage'
        )}`
      )
    },
  })

  const [deleteMutation] = useDeleteLabsByPkMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        `${t('setup.labs.data.success')}${t(
          'setup.labs.data.deletelabsuccessmessage'
        )}`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `${t('setup.labs.data.error')}${t(
          'setup.labs.data.deletelaberrormessage'
        )}`
      )
    },
  })

  const initialValues = {
    id: '',
    name: '',
    providerNumber: undefined,
    phone: '',
    email: '',
    country: '',
    city: '',
    street: '',
    street2: '',
    postal_code: undefined,
    isActive: true,
  }
  const setEditFields = () => {
    const editObj = {
      id: editPage.id,
      name: editPage.name,
      providerNumber: editPage.provider_number,
      phone: editPage.phone,
      email: editPage.email,
      country: editPage.country,
      city: editPage.city,
      street: editPage.street,
      street2: editPage.street2,
      postalCode: editPage.postal_code,
      isActive: editPage.is_active,
    }
    return editObj
  }
  const createPageOnClick = (setFieldValue) => {
    //setFieldValue('type', 'Company')
    setEditPage(formikEditFields())
    setShowModal(true)
  }

  const handleBackClick = (e, handleReset) => {
    handleReset(e)
    setEditPage(formikEditFields())
    setShowModal(false)
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
  const formikValidationSchema = Yup.object({
    name: Yup.string()
      .max(40, t('setup.labs.length.forty'))
      .required(t('setup.name.is.required')),
    email: Yup.string()
      .max(50, t('setup.labs.length.fifty'))
      .email(t('setup.valid.email.id'))
      .required(t('labs.email.required')),
  })
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
  const NotificationRender = () => {
    const [hideBanner, setHideBanner] = React.useState(false)
    return (
      <NotificationBanner
        title={t('labs.automatte.results')}
        desc={t('labs.notification.descriptive')}
        imgPath={notificationBannerLabPageImage}
        allowClose={true}
        setHide={[hideBanner, setHideBanner]}
        showPaymentButton={false}
        showEmail={true}
        email="3143+bloods@automation.pabau.com"
      />
    )
  }

  const modelContent = (setFieldValue, values) => {
    return (
      <div>
        <div className={styles.basicInfo}>
          <h6>{t('setup.labs.create.basic')}</h6>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label={t('setup.labs.create.name.lable')}
              name="name"
            >
              <Input
                name="name"
                autoComplete="off"
                placeholder={t('setup.labs.create.name.placeHolder')}
              />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label={t('setup.labs.create.providerNo.lable')}
              name="providerNumber"
            >
              <Input
                name="providerNumber"
                type="number"
                placeholder={t('setup.labs.create.providerNo.placeHolder')}
              />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item className={styles.listing} name={'phone'}>
              <PhoneNumberInput
                label={t('setup.labs.create.phoneNo.lable')}
                onChange={(value) => setFieldValue('phone', value)}
              />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label={t('setup.labs.create.email.lable')}
              name="email"
            >
              <Input
                name="email"
                autoComplete="off"
                placeholder={t('setup.labs.create.email.placeHolder')}
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.basicInfo}>
          <h6>{t('setup.labs.create.address')}</h6>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label={t('setup.labs.create.country.lable')}
              name="country"
            >
              <Input name="country" autoComplete="off" />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label={t('setup.labs.create.city.lable')}
              name="city"
            >
              <Input name="city" autoComplete="off" />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label={t('setup.labs.create.street.lable')}
              name="street"
            >
              <Input name="street" autoComplete="off" />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label={t('setup.labs.create.street2.lable')}
              name="street2"
            >
              <Input name="street2" autoComplete="off" />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label={t('setup.labs.create.postalCode.lable')}
              name="postalCode"
            >
              <Input type="number" name="postalCode" autoComplete="off" />
            </Form.Item>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={editPage.id ? setEditFields() : initialValues}
      validationSchema={formikValidationSchema}
      onSubmit={(values, { resetForm }) => {
        const newValues = { ...values }
        onSubmit(newValues, { resetForm })
      }}
    >
      {({ setFieldValue, handleSubmit, handleReset, values }) => (
        <>
          <CrudLayout
            schema={schema}
            tableSearch={false}
            addQuery={InsertLabsOneDocument}
            deleteQuery={DeleteLabsByPkDocument}
            listQuery={LabsTmpDocument}
            editQuery={UpdateLabsByPkDocument}
            aggregateQuery={LabsAggregateDocument}
            updateOrderQuery={UpdateLabsOrderDocument}
            addFilter={true}
            createPage={true}
            showNotificationBanner={true}
            notificationBanner={<NotificationRender />}
            createPageOnClick={() => createPageOnClick(setFieldValue)}
            setEditPage={handleEditPage}
          />
          <FullScreenReportModal
            title={`${
              !editPage.id ? t('labs.setup.create') : t('setup.labs.edit')
            } ${t('setup.labs.labs')}`}
            visible={showModal}
            operations={handleOperationsType()}
            enableCreateBtn={true}
            onBackClick={(e) => handleBackClick(e, handleReset)}
            activated={values.isActive}
            onActivated={(value) =>
              setFieldValue(t('setup.labs.isactive'), value)
            }
            onDelete={async () => {
              const { id } = editPage as { id: string }
              await deleteMutation({
                variables: { id },
                optimisticResponse: {},
              })
              setEditPage(formikEditFields())
              setShowModal(false)
            }}
            onCreate={handleSubmit}
            onSave={handleSubmit}
            createBtnText={
              !editPage.id ? t('labs.setup.create') : t('setup.labs.save')
            }
            deleteBtnText={t('setup.labs.delete')}
            saveBtnText={t('setup.labs.save')}
            activeBtnText={
              values.isActive
                ? t('setup.labs.active')
                : t('setup.labs.inactive')
            }
            footer={true}
          >
            {modelContent(setFieldValue, values)}
          </FullScreenReportModal>
        </>
      )}
    </Formik>
  )
}

export default Labs
