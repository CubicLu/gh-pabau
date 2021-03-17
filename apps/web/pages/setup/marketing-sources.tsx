import { gql } from '@apollo/client'
import { NextPage } from 'next'
import React, { useContext, useEffect } from 'react'
import CrudLayout from '../../components/CrudLayout/CrudLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { UserContext } from '../../context/UserContext'
import { languageMapper } from '../../helper/languageMapper'

const LIST_QUERY = gql`
  query marketing_sources(
    $isActive: Int = 1
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
    $isActive: Int = 1
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
    $isActive: Int = 1
    $name: String!
    $custom_id: Int = 0
  ) {
    createOneMarketingSource(
      data: {
        imported: $imported
        company: {}
        name: $name
        public: $isActive
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
    $public: Int = 1
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
const UPDATE_ORDER_MUTATION = gql`
  mutation update_marketing_source_order($id: Int!, $order: Int) {
    update_marketing_source(
      where: { id: { _eq: $id } }
      _set: { order: $order }
    ) {
      affected_rows
    }
  }
`

export const Index: NextPage = () => {
  const { t, i18n } = useTranslationI18()

  const user = useContext(UserContext)

  useEffect(() => {
    if (user) {
      const lan = user?.data?.me?.company?.details?.language
      console.log(user?.data?.me?.company?.id)
      const lanCode = lan ? languageMapper(lan) : 'en'
      i18n.changeLanguage(lanCode)
    }
  }, [user, i18n])

  const schema: Schema = {
    full: t('marketingsource-title'),
    fullLower: t('marketingsource-title'),
    short: 'Source',
    shortLower: 'source',
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
        success: 'Marketings source updated.',
        error: 'While updating marketings source.',
      },
      delete: {
        success: 'Marketings source deleted.',
        error: 'While deleting marketing sources.',
      },
    },
    deleteBtnLabel: t('marketingsource-delete-button-label'),
    fields: {
      name: {
        full: 'Friendly Name',
        fullLower: 'friendly name',
        short: t('marketingsource-name-textfield'),
        shortLower: 'name',
        min: 2,
        example: t('marketingsource-name-placeholder'),
        description: 'A friendly name',
        cssWidth: 'max',
        type: 'string',
        max: 50,
      },
      public: {
        full: t('marketingsource-status-field'),
        type: 'boolean',
        defaultvalue: true,
      },
      company_id: {
        type: 'number',
      },
    },
    filter: {
      primary: {
        name: 'public',
        type: 'number',
        default: 1,
        active: 1,
        inactive: 0,
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
      updateOrderQuery={UPDATE_ORDER_MUTATION}
      needTranslation={false}
    />
  )
}
export default Index
