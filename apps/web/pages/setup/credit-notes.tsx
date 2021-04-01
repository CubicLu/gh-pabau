import { gql } from '@apollo/client'
import { NextPage } from 'next'
import React from 'react'
import CrudLayout from '../../components/CrudLayout/CrudLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

const LIST_QUERY = gql`
  query credit_note_types(
    $isActive: Boolean = true
    $offset: Int
    $limit: Int
  ) {
    credit_note_type(
      offset: $offset
      limit: $limit
      order_by: { order: desc }
      where: { is_active: { _eq: $isActive } }
    ) {
      id
      name
      code
      invoice_prefix
      is_active
      order
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query credit_note_type_aggregate($isActive: Boolean = true) {
    credit_note_type_aggregate(where: { is_active: { _eq: $isActive } }) {
      aggregate {
        count
      }
    }
  }
`
const DELETE_MUTATION = gql`
  mutation delete_credit_note_type($id: uuid!) {
    delete_credit_note_type_by_pk(id: $id) {
      __typename
      id
    }
  }
`
const ADD_MUTATION = gql`
  mutation add_credit_note_types(
    $name: String!
    $invoice_prefix: String
    $is_active: Boolean
  ) {
    insert_credit_note_type_one(
      object: {
        name: $name
        is_active: $is_active
        invoice_prefix: $invoice_prefix
      }
    ) {
      name
      id
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_credit_note_type_by_pk(
    $id: uuid!
    $name: String!
    $is_active: Boolean
    $invoice_prefix: String
    $order: Int
  ) {
    update_credit_note_type_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        invoice_prefix: $invoice_prefix
        is_active: $is_active
        order: $order
      }
    ) {
      __typename
      id
      is_active
      order
    }
  }
`
const UPDATE_ORDER_MUTATION = gql`
  mutation update_credit_note_type_order($id: uuid!, $order: Int) {
    update_credit_note_type(
      where: { id: { _eq: $id } }
      _set: { order: $order }
    ) {
      affected_rows
    }
  }
`

export const CreditNotes: NextPage = () => {
  const { t } = useTranslationI18()
  const schema: Schema = {
    full: t('setup.creditnotes.schema.full'),
    fullLower: t('setup.creditnotes.schema.full.lower'),
    short: t('setup.creditnotes.schema.short'),
    shortLower: t('setup.creditnotes.schema.short.lower'),
    createButtonLabel: t('setup.creditnotes.schema.createbutton'),
    messages: {
      create: {
        success: t('setup.creditnotes.schema.create.success'),
        error: t('setup.creditnotes.schema.create.error'),
      },
      update: {
        success: t('setup.creditnotes.schema.edit.success'),
        error: t('setup.creditnotes.schema.edit.error'),
      },
      delete: {
        success: t('setup.creditnotes.schema.delete.success'),
        error: t('setup.creditnotes.schema.delete.error'),
      },
    },
    fields: {
      name: {
        full: t('setup.creditnotes.schema.fields.name.full'),
        fullLower: t('setup.creditnotes.schema.fields.name.full.lower'),
        short: t('setup.creditnotes.schema.fields.name.short'),
        shortLower: t('setup.creditnotes.schema.fields.name.short.lower'),
        min: 2,
        max: 50,
        example: t('setup.creditnotes.schema.fields.name.example'),
        cssWidth: 'max',
        type: 'string',
      },
      code: {
        full: t('setup.creditnotes.schema.fields.code.full'),
        fullLower: t('setup.creditnotes.schema.fields.code.full.lower'),
        short: t('setup.creditnotes.schema.fields.code.short'),
        shortLower: t('setup.creditnotes.schema.fields.code.short.lower'),
        min: 0,
        max: 50,
        example: 2,
        description: t('setup.creditnotes.schema.fields.code.description'),
        cssWidth: 'max',
        type: 'number',
        visible: false,
      },
      invoice_prefix: {
        full: t('setup.creditnotes.schema.fields.invoiceprefix.full'),
        fullLower: t(
          'setup.creditnotes.schema.fields.invoiceprefix.full.lower'
        ),
        short: t('setup.creditnotes.schema.fields.invoiceprefix.short'),
        shortLower: t(
          'setup.creditnotes.schema.fields.invoiceprefix.short.lower'
        ),
        example: t('setup.creditnotes.schema.fields.invoiceprefix.example'),
        min: 0,
        max: 50,
        description: t(
          'setup.creditnotes.schema.fields.invoiceprefix.description'
        ),
        cssWidth: 'max',
        visible: false,
        type: 'string',
      },
      is_active: {
        full: t('setup.creditnotes.schema.fields.isactive'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
  }

  return (
    <CrudLayout
      schema={schema}
      addQuery={ADD_MUTATION}
      deleteQuery={DELETE_MUTATION}
      listQuery={LIST_QUERY}
      editQuery={EDIT_MUTATION}
      aggregateQuery={LIST_AGGREGATE_QUERY}
      tableSearch={false}
      updateOrderQuery={UPDATE_ORDER_MUTATION}
    />
  )
}

export default CreditNotes
