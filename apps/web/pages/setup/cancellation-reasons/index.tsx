import { gql } from '@apollo/client'
import { NextPage } from 'next'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const LIST_QUERY = gql`
  query cancellation_reasons(
    $searchTerm: String = ""
    $offset: Int
    $limit: Int
  ) {
    findManyCancelReason(
      skip: $offset
      take: $limit
      orderBy: { id: desc }
      where: { reason_name: { contains: $searchTerm } }
    ) {
      id
      name: reason_name
      type: late_cancel
      cancellation_policy: apply_cancellation_policy
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query cancellation_reasons_aggregate($searchTerm: String = "") {
    findManyCancelReasonCount(where: { reason_name: { contains: $searchTerm } })
  }
`
const DELETE_MUTATION = gql`
  mutation delete_cancellation_reasons($id: Int!) {
    deleteOneCancelReason(where: { id: $id }) {
      id
    }
  }
`
const ADD_MUTATION = gql`
  mutation insert_cancellation_reasons(
    $cancellation_policy: Int!
    $name: String!
    $type: Int!
  ) {
    createOneCancelReason(
      data: {
        Company: {}
        apply_cancellation_policy: $cancellation_policy
        reason_name: $name
        late_cancel: $type
      }
    ) {
      id
      name: reason_name
      type: late_cancel
      cancellation_policy: apply_cancellation_policy
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_cancellation_reasons_by_pk(
    $id: Int!
    $cancellation_policy: Int!
    $name: String!
    $type: Int!
  ) {
    updateOneCancelReason(
      where: { id: $id }
      data: {
        apply_cancellation_policy: { set: $cancellation_policy }
        reason_name: { set: $name }
        late_cancel: { set: $type }
      }
    ) {
      id
      name: reason_name
      type: late_cancel
      cancellation_policy: apply_cancellation_policy
    }
  }
`
const UPDATE_ORDER_MUTATION = gql`
  mutation update_cancellation_reasons_order($id: uuid!, $order: Int) {
    update_cancellation_reasons(
      where: { id: { _eq: $id } }
      _set: { order: $order }
    ) {
      affected_rows
    }
  }
`

export const CancellationReasons: NextPage = () => {
  const { t } = useTranslationI18()
  const user = useUser()

  const schema: Schema = {
    full: t('setup.cancellation.reason.schema.title'),
    fullLower: t('setup.cancellation.reason.schema.title.lowercase'),
    short: t('setup.cancellation.reason.schema.title'),
    shortLower: t('setup.cancellation.reason.schema.title.lowercase'),
    createButtonLabel: t('setup.cancellation.reason.schema.create.title'),
    createModalHeader: t('setup.cancellation.reason.schema.header.create'),
    editModalHeader: t('setup.cancellation.reason.schema.header.edit'),
    deleteModalHeader: t('setup.cancellation.reason.schema.header.delete'),
    messages: {
      create: {
        success: t('setup.cancellation.reason.schema.created.message'),
        error: t('setup.cancellation.reason.schema.create.error.message'),
      },
      update: {
        success: t('setup.cancellation.reason.schema.updated.message'),
        error: t('setup.cancellation.reason.schema.update.error.message'),
      },
      delete: {
        success: t('setup.cancellation.reason.schema.deleted.message'),
        error: t('setup.cancellation.reason.schema.delete.error.message'),
      },
    },
    deleteBtnLabel: t('setup.cancellation.reason.schema.delete.button.label'),
    fields: {
      name: {
        full: t('setup.cancellation.reason.schema.name.full'),
        fullLower: t('setup.cancellation.reason.schema.name.full.lower'),
        short: t('setup.cancellation.reason.schema.name.short'),
        shortLower: t('setup.cancellation.reason.schema.name.short.lower'),
        min: 2,
        max: 50,
        description: t('setup.cancellation.reason.schema.name.desc'),
        cssWidth: 'max',
        type: 'string',
      },
      type: {
        full: t('setup.cancellation.reason.schema.type.full'),
        fullLower: t('setup.cancellation.reason.schema.type.full.lower'),
        short: t('setup.cancellation.reason.schema.type.short'),
        shortLower: t('setup.cancellation.reason.schema.type.short.lower'),
        description: t('setup.cancellation.reason.schema.type.desc'),
        cssWidth: 'max',
        defaultvalue: 0,
        type: 'select',
        selectOptions: [
          {
            label: t(
              'setup.cancellation.reason.schema.type.select.early.cancel'
            ),
            value: 0,
          },
          {
            label: t(
              'setup.cancellation.reason.schema.type.select.late.cancel'
            ),
            value: 1,
          },
        ],
        render: function render(value) {
          return (
            <div>
              {value
                ? t('setup.cancellation.reason.schema.type.select.late.cancel')
                : t(
                    'setup.cancellation.reason.schema.type.select.early.cancel'
                  )}
            </div>
          )
        },
      },
      cancellation_policy: {
        full: t('setup.cancellation.reason.schema.policy.full'),
        fullLower: t('setup.cancellation.reason.schema.policy.full.lower'),
        short: t('setup.cancellation.reason.schema.policy.short'),
        shortLower: t('setup.cancellation.reason.schema.policy.short.lower'),
        description: t('setup.cancellation.reason.schema.policy.desc'),
        cssWidth: 'max',
        defaultvalue: 1,
        type: 'select',
        selectOptions: [
          {
            label: t('setup.cancellation.reason.schema.policy.select.yes'),
            value: 1,
          },
          {
            label: t('setup.cancellation.reason.schema.policy.select.no'),
            value: 0,
          },
        ],
        render: function render(value) {
          return (
            <div>
              {value
                ? t('setup.cancellation.reason.schema.policy.select.yes')
                : t('setup.cancellation.reason.schema.policy.select.no')}
            </div>
          )
        },
      },
    },
    noDataBtnText: t('setup.cancellation.reason.schema.noDataBtnText'),
    noDataText: t('setup.cancellation.reason.schema.noDataText'),
  }
  return (
    <CrudLayout
      schema={schema}
      tableSearch={true}
      addFilter={false}
      addQuery={ADD_MUTATION}
      deleteQuery={DELETE_MUTATION}
      listQuery={LIST_QUERY}
      editQuery={EDIT_MUTATION}
      aggregateQuery={LIST_AGGREGATE_QUERY}
      updateOrderQuery={UPDATE_ORDER_MUTATION}
      draggable={false}
      requireAdminAccess={true}
      {...user}
    />
  )
}

export default CancellationReasons
