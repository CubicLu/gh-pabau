/* eslint-disable graphql/template-strings */
import { gql } from '@apollo/client'
import { NextPage } from 'next'
import React, { useState, useContext } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import CrudLayout from '../../components/CrudLayout/CrudLayout'
import { NotificationBanner } from '@pabau/ui'
import PaymentNotificationImage from '../../assets/images/payment-type-notify-image.png'
import { UserContext } from '../../context/UserContext'

const LIST_QUERY = gql`
  query payment_types($isActive: Int = 1, $offset: Int = 0, $limit: Int = 50) {
    stripe: bookitProGenerals(
      where: {
        AND: {
          stripe_public_key: { equals: "" }
          stripe_private_key: { equals: "" }
          create_invoice: { equals: "1" }
        }
      }
    ) {
      create_invoice
    }
    invPaymentTypes(
      skip: $offset
      take: $limit
      orderBy: { name: desc }
      where: { is_active: { equals: $isActive } }
    ) {
      id
      name
      type
      description
      is_active
      company_id
      GlCode {
        GlCode_id: id
        GlCode: code
        description
      }
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query payment_types_aggregate($isActive: Int = 1) {
    invPaymentTypesCount(where: { is_active: { equals: $isActive } })
  }
`
const DELETE_MUTATION = gql`
  mutation delete_payment_types($id: Int) {
    deleteOneInvPaymentType(where: { id: $id }) {
      __typename
      id
    }
  }
`

const ADD_MUTATION = gql`
  mutation add_payment_types(
    $name: String!
    $type: String = "money"
    $is_money: Int = 1
    $description: String = ""
    $is_active: Int = 1
  ) {
    createOneInvPaymentType(
      data: {
        name: $name
        type: $type
        is_money: $is_money
        description: $description
        is_active: $is_active
        Company: {}
      }
    ) {
      __typename
      id
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_inv_payment_type(
    $id: Int!
    $name: String!
    $type: String = "money"
    $is_money: Int = 1
    $description: String = ""
    $is_active: Int = 1
  ) {
    updateOneInvPaymentType(
      data: {
        name: { set: $name }
        type: { set: $type }
        is_money: { set: $is_money }
        is_active: { set: $is_active }
        description: { set: $description }
      }
      where: { id: $id }
    ) {
      id
    }
  }
`
const UPDATE_ORDER_MUTATION = gql`
  mutation update_payment_types_order($id: uuid!, $order: Int) {
    update_payment_types(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`
const DATA_INTEGRITY_CHECK = gql`
  query payment_methods_data_integrity($paymentName: String!) {
    invPaymentsCount(where: { pmethod: { equals: $paymentName } })
  }
`

export const PaymentTypes: NextPage = () => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

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
    padlocked: ['Card', 'Cash', 'Loyalty'],
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
      list: 'invPaymentTypes',
    },
    company: 'company_id',
  }

  const [showNotificationBanner, setShowNotificationBanner] = useState(false)
  return (
    <CrudLayout
      schema={schema}
      tableSearch={false}
      addQuery={ADD_MUTATION}
      deleteQuery={DELETE_MUTATION}
      listQuery={LIST_QUERY}
      editQuery={EDIT_MUTATION}
      aggregateQuery={LIST_AGGREGATE_QUERY}
      updateOrderQuery={UPDATE_ORDER_MUTATION}
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
      isDataIntegrityCheck={true}
      dataIntegrityCheckQuery={DATA_INTEGRITY_CHECK}
      requireAdminAccess={true}
      isNotificationBannerOnData={true}
      {...user}
    />
  )
}

export default PaymentTypes
