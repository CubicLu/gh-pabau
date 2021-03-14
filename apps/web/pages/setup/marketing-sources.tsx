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
    $offset: Int = 0
    $limit: Int = 10
  ) {
    marketingSources(
      first: $offset
      last: $limit
      orderBy: { name: desc }
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
    $companyId: Int!
  ) {
    createOneMarketingSource(
      data: {
        imported: $imported
        name: $name
        public: $isActive
        custom_id: $custom_id
        company: { connect: { id: $companyId } }
      }
    ) {
      id
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_marketing_source_by_pk(
    $id: Int!
    $source_name: String
    $isActive: Int = 1
  ) {
    updateOneMarketingSource(
      data: { name: { set: $source_name }, public: { set: $isActive } }
      where: { id: $id }
    ) {
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
      console.log(user)
      const lanCode = lan ? languageMapper(lan) : 'en'
      i18n.changeLanguage(lanCode)
    }
  }, [user, i18n])

  const schema: Schema = {
    full: t('marketingsource-title.translation'),
    fullLower: t('marketingsource-title.translation'),
    short: 'Source',
    shortLower: 'source',
    createButtonLabel: 'Create Source',
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
    deleteBtnLabel: 'Yes, Delete Source',
    fields: {
      name: {
        full: 'Friendly Name',
        fullLower: 'friendly name',
        short: t('marketingsource-name-textfield.translation'),
        shortLower: 'name',
        min: 2,
        example: t('marketingsource-name-textfield.translation'),
        description: 'A friendly name',
        cssWidth: 'max',
        type: 'string',
      },
      public: {
        full: t('marketingsource-tableColumn-active.translation'),
        type: 'number',
        defaultvalue: 1,
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
