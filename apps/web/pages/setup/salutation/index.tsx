import { gql } from '@apollo/client'
import { NextPage } from 'next'
import React, { useContext } from 'react'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { UserContext } from '../../../context/UserContext'

const LIST_QUERY = gql`
  query user_salutations($limit: Int!, $offset: Int!) {
    userSalutations(take: $limit, skip: $offset, orderBy: { id: desc }) {
      id
      name
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query user_salutations_aggregate {
    userSalutationsCount
  }
`
const DELETE_MUTATION = gql`
  mutation delete_user_salutation($id: Int) {
    deleteOneUserSalutation(where: { id: $id }) {
      __typename
      id
    }
  }
`
const ADD_MUTATION = gql`
  mutation insert_user_salutations($name: String!) {
    createOneUserSalutation(data: { name: $name, Company: {} }) {
      id
      name
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_user_salutation($id: Int!, $name: String!) {
    updateOneUserSalutation(
      where: { id: $id }
      data: { name: { set: $name } }
    ) {
      id
      name
    }
  }
`

const UPDATE_ORDER_MUTATION = gql`
  mutation update_salutation_order($id: uuid!, $order: Int) {
    update_salutation(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`

export const Salutation: NextPage = () => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

  const schema: Schema = {
    full: t('setup.salutation.schema.title'),
    fullLower: t('setup.salutation.schema.title.lowercase'),
    short: t('setup.salutation.schema.title'),
    shortLower: t('setup.salutation.schema.title.lowercase'),
    createButtonLabel: t('setup.salutation.schema.create.salutation.title'),
    createModalHeader: t('setup.salutation.schema.header.create'),
    editModalHeader: t('setup.salutation.schema.header.edit'),
    deleteModalHeader: t('setup.salutation.schema.header.delete'),
    deleteBtnLabel: t('setup.salutation.schema.delete.button.label'),
    messages: {
      create: {
        success: t('setup.salutation.schema.created.salutation.message'),
        error: t('setup.salutation.schema.create.salutation.error.message'),
      },
      update: {
        success: t('setup.salutation.schema.updated.salutation.message'),
        error: t('setup.salutation.schema.update.salutation.error.message'),
      },
      delete: {
        success: t('setup.salutation.schema.deleted.salutation.message'),
        error: t('setup.salutation.schema.delete.salutation.error.message'),
      },
    },
    fields: {
      name: {
        full: t('setup.salutation.schema.salutation.name.full'),
        fullLower: t('setup.salutation.schema.salutation.name.full.lower'),
        short: t('setup.salutation.schema.title'),
        shortLower: t('setup.salutation.schema.title.lowercase'),
        min: 2,
        max: 50,
        example: 'King',
        // description: 'A friendly name',
        // extra: <i>Please note: blah blah blahh</i>,
        cssWidth: 'max',
        type: 'string',
      },
    },
    noDataBtnText: t('setup.salutation.schema.noDataBtnText'),
    noDataText: t('setup.salutation.schema.noDataText'),
  }

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
      addFilter={false}
      draggable={false}
      requireAdminAccess={true}
      {...user}
    />
  )
}

export default Salutation
