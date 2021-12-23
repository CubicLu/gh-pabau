import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import CrudLayout from '../../components/CrudLayout/CrudLayout'
import { NotificationBanner } from '@pabau/ui'
import {
  PaymentTypesDocument,
  PaymentTypesAggregateDocument,
  CreateOneInvPaymentTypeDocument,
  UpdateOneInvPaymentTypeDocument,
  DeleteOneInvPaymentTypeDocument,
} from '@pabau/graphql'
import PaymentNotificationImage from '../../assets/images/payment-type-notify-image.png'
import { useUser } from '../../context/UserContext'

export const PaymentTypes: NextPage = () => {
  const { t } = useTranslationI18()
  const user = useUser()

  const schema: Schema = {
    full: t('setup.paymenttypes.schema.title'),
    fullLower: t('setup.paymenttypes.schema.title.lowercase'),
    short: t('setup.paymenttypes.schema.title'),
    shortLower: t('setup.paymenttypes.schema.title.lowercase'),
    shemaType: t('setup.paymenttypes.schema.schematype'),
    messages: {
      create: {
        success: t('setup.paymenttypes.schema.created.paymenttype.message'),
        error: t('setup.paymenttypes.schema.create.paymenttype.error.message'),
      },
      update: {
        success: t('setup.paymenttypes.schema.updated.paymenttype.message'),
        error: t('setup.paymenttypes.schema.updated.paymenttype.error.message'),
      },
      delete: {
        success: t('setup.paymenttypes.schema.deleted.paymenttype.message'),
        error: t('setup.paymenttypes.schema.deleted.paymenttype.error.message'),
      },
      dataIntegrity: t('setup.paymenttypes.schema.dataintegrity.message'),
    },
    tooltip: t('setup.paymenttypes.schema.tooltip'),
    createButtonLabel: t('setup.paymenttypes.schema.create.paymenttypes'),
    padlocked: ['Card', 'Cash', 'Loyalty', 'Packages', 'Account', 'Voucher'],
    fields: {
      type: {
        full: '',
        fullLower: '',
        short: '',
        shortLower: '',
        radio: [
          {
            label: t('setup.paymenttypes.schema.fields.type.radio.money.label'),
            value: 'money',
          },
          {
            label: t(
              'setup.paymenttypes.schema.fields.type.radio.nonmoney.label'
            ),
            value: 'nonmoney',
          },
          {
            label: t(
              'setup.paymenttypes.schema.fields.type.radio.accountcredit.label'
            ),
            value: 'account_credit',
          },
        ],
        type: 'radio-group',
        defaultvalue: 'money',
        visible: false,
      },
      name: {
        full: t('setup.paymenttypes.schema.fields.name'),
        fullLower: t('setup.paymenttypes.schema.fields.name.lowercase'),
        short: t('setup.paymenttypes.schema.fields.name'),
        shortLower: t('setup.paymenttypes.schema.fields.name.lowercase'),
        min: 2,
        max: 50,
        cssWidth: 'max',
        type: 'string',
        visible: true,
      },
      description: {
        full: t('setup.paymenttypes.schema.fields.description'),
        fullLower: t('setup.paymenttypes.schema.fields.description.lowercase'),
        short: t('setup.paymenttypes.schema.fields.description'),
        shortLower: t('setup.paymenttypes.schema.fields.description.lowercase'),
        cssWidth: 'max',
        type: 'string',
        max: 50,
      },
      // gl_code: {
      //   full: 'GL code',
      //   fullLower: 'gl code',
      //   short: 'GL code',
      //   shortLower: 'gl code',
      //   example: 'Lunchbreak',
      //   extra: <span>Advanced</span>,
      //   cssWidth: 'max',
      //   type: 'string',
      //   max: 50,
      //   visible: false,
      //   collapsible: true,
      // },
      is_active: {
        full: t('setup.paymenttypes.schema.fields.isactive'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
    filter: {
      primary: {
        name: 'is_active',
        type: 'number',
        default: 1,
        active: 1,
        inactive: 0,
      },
    },
    dataIntegrity: {
      name: 'name',
      type: 'string',
      default: '',
    },
    showNotification: {
      query: 'stripe',
      list: 'findManyInvPaymentType',
    },
    company: 'Company',
  }

  const [showNotificationBanner, setShowNotificationBanner] = useState(false)
  return (
    <CrudLayout
      schema={schema}
      tableSearch={false}
      addQuery={CreateOneInvPaymentTypeDocument}
      deleteQuery={DeleteOneInvPaymentTypeDocument}
      listQuery={PaymentTypesDocument}
      editQuery={UpdateOneInvPaymentTypeDocument}
      aggregateQuery={PaymentTypesAggregateDocument}
      updateOrderQuery={UpdateOneInvPaymentTypeDocument}
      showNotificationBanner={true}
      notificationBanner={
        <NotificationBanner
          title={t('setup.paymenttypes.notificationbanner.title')}
          desc={t('setup.paymenttypes.notificationbanner.desc')}
          imgPath={PaymentNotificationImage}
          allowClose={true}
          setHide={[showNotificationBanner, setShowNotificationBanner]}
        />
      }
      draggable={false}
      isNestedQuery={true}
      isFilterNumber={true}
      requireAdminAccess={true}
      isNotificationBannerOnData={true}
      isCodeGen={true}
      deleteOnInactive={false}
      isHavingDefaultRecords={true}
      {...user}
    />
  )
}

export default PaymentTypes
