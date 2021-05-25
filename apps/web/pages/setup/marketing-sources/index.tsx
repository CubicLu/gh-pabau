import gql from 'graphql-tag'
import { NextPage } from 'next'
import React, { useContext } from 'react'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import { UserContext } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const LIST_QUERY = gql`
  query marketing_sources(
    $isActive: Boolean = true
    $searchTerm: String = ""
    $offset: Int
    $limit: Int
  ) {
    marketingSources(
      take: $limit
      skip: $offset
      orderBy: { id: desc }
      where: {
        public: { equals: $isActive }
        OR: [{ AND: [{ name: { contains: $searchTerm } }] }]
      }
    ) {
      __typename
      id
      name
      public
    }
  }
`

const LIST_AGGREGATE_QUERY = gql`
  query marketing_source_aggregate(
    $isActive: Boolean = true
    $searchTerm: String = ""
  ) {
    marketingSourcesCount(
      where: {
        public: { equals: $isActive }
        OR: [{ AND: [{ name: { contains: $searchTerm } }] }]
      }
    )
  }
`

const DELETE_MUTATION = gql`
  mutation delete_marketing_source($id: Int) {
    deleteOneMarketingSource(where: { id: $id }) {
      __typename
      id
    }
  }
`

const ADD_MUTATION = gql`
  mutation add_marketing_source(
    $imported: Int = 0
    $public: Boolean = true
    $name: String!
    $custom_id: Int = 0
  ) {
    createOneMarketingSource(
      data: {
        imported: $imported
        company: {}
        name: $name
        public: $public
        custom_id: $custom_id
      }
    ) {
      __typename
      id
      name
    }
  }
`

const EDIT_MUTATION = gql`
  mutation update_marketing_source_by_pk(
    $id: Int!
    $name: String
    $public: Boolean
  ) {
    updateOneMarketingSource(
      data: { name: { set: $name }, public: { set: $public } }
      where: { id: $id }
    ) {
      __typename
      id
    }
  }
`

// const UPDATE_ORDER_MUTATION = gql`
//   mutation update_marketing_source_order($id: Int!, $order: Int) {
//     update_marketing_source(
//       where: { id: { _eq: $id } }
//       _set: { order: $order }
//     ) {
//       affected_rows
//     }
//   }
// `

export const Index: NextPage = () => {
  const { t } = useTranslationI18()

  const user = useContext(UserContext)

  const schema: Schema = {
    full: t('marketingsource-title'),
    fullLower: t('marketingsource-title'),
    short: t('marketingsource-title-short'),
    shortLower: t('marketingsource-title-short'),
    createButtonLabel: t('marketingsource-header-create.translation'),
    createModalHeader: t('marketingsource-header-create'),
    editModalHeader: t('marketingsource-header-edit'),
    deleteModalHeader: t('marketingsource-header-delete'),
    messages: {
      create: {
        success: 'New marketings source created.',
        error: 'While creating marketing source.',
      },
      update: {
        success: t('marketingsource-notification-update-success'),
        error: t('marketingsource-notification-update-error'),
      },
      delete: {
        success: t('marketingsource-notification-delete-success'),
        error: t('marketingsource-notification-delete-error'),
      },
    },
    deleteBtnLabel: t('marketingsource-delete-button-label'),
    fields: {
      name: {
        full: t('marketingsource-name-full'),
        fullLower: t('marketingsource-name-full-lower'),
        short: t('marketingsource-name'),
        shortLower: t('marketingsource-name-lower'),
        min: 2,
        placeholder: t('marketingsource-name-placeholder'),
        tooltip: t('marketingsource-name-tooltip'),
        description: t('marketingsource-name-description'),
        cssWidth: 'max',
        type: 'string',
        max: 50,
      },
      public: {
        full: t('marketingsource-status-field'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
    filter: {
      primary: {
        name: 'public',
        type: 'string',
        default: true,
        active: true,
        inactive: false,
      },
    },
    company: 'company_id',
    noDataBtnText: t('setup.marketingsource.schema.noDataBtnText'),
    noDataText: t('setup.marketingsource.schema.noDataText'),
  }

  return (
    <CrudLayout
      schema={schema}
      addQuery={ADD_MUTATION}
      deleteQuery={DELETE_MUTATION}
      listQuery={LIST_QUERY}
      editQuery={EDIT_MUTATION}
      aggregateQuery={LIST_AGGREGATE_QUERY}
      // updateOrderQuery={UPDATE_ORDER_MUTATION} //TODO: Toshe
      needTranslation={false}
      draggable={false}
      {...user}
    />
  )
}
export default Index
