import { gql } from '@apollo/client'
import { NextPage } from 'next'
import React, { useContext } from 'react'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { UserContext } from '../../../context/UserContext'

const LIST_QUERY = gql`
  query company_departments(
    $searchTerm: String = ""
    $offset: Int
    $limit: Int
  ) {
    companyDepartments(
      take: $limit
      skip: $offset
      orderBy: { id: desc }
      where: { OR: [{ AND: [{ department: { contains: $searchTerm } }] }] }
    ) {
      id
      department
      company_id
    }
  }
`
const LIST_AGGREGATE_QUERY = gql`
  query company_departmentsCount_aggregate($searchTerm: String = "") {
    companyDepartmentsCount(
      where: { OR: [{ AND: [{ department: { contains: $searchTerm } }] }] }
    )
  }
`
const DELETE_MUTATION = gql`
  mutation delete_department($id: Int) {
    deleteOneCompanyDepartment(where: { id: $id }) {
      __typename
      id
    }
  }
`
const ADD_MUTATION = gql`
  mutation add_company_department($department: String!) {
    createOneCompanyDepartment(data: { Company: {}, department: $department }) {
      id
      department
    }
  }
`
const EDIT_MUTATION = gql`
  mutation update_department($id: Int!, $department: String) {
    updateOneCompanyDepartment(
      data: { department: { set: $department } }
      where: { id: $id }
    ) {
      __typename
      id
    }
  }
`

const UPDATE_ORDER_MUTATION = gql`
  mutation update_departments_order($id: uuid!, $order: Int) {
    update_departments(where: { id: { _eq: $id } }, _set: { order: $order }) {
      affected_rows
    }
  }
`

export const Departments: NextPage = () => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

  const schema: Schema = {
    full: t('setup.department.schema.title'),
    fullLower: t('setup.department.schema.title.lowercase'),
    short: t('setup.department.schema.title'),
    shortLower: t('setup.department.schema.title.lowercase'),
    createButtonLabel: t('setup.department.schema.create.job.title'),
    createModalHeader: t('setup.department.schema.header.create'),
    editModalHeader: t('setup.department.schema.header.edit'),
    deleteModalHeader: t('setup.department.schema.header.delete'),
    deleteBtnLabel: t('setup.department.schema.delete.button.label'),
    messages: {
      create: {
        success: t('setup.department.schema.created.job.message'),
        error: t('setup.department.schema.create.job.error.message'),
      },
      update: {
        success: t('setup.department.schema.updated.job.message'),
        error: t('setup.department.schema.update.job.error.message'),
      },
      delete: {
        success: t('setup.department.schema.deleted.job.message'),
        error: t('setup.department.schema.delete.job.error.message'),
      },
    },
    fields: {
      department: {
        full: t('setup.department.schema.department'),
        fullLower: t('setup.department.schema.department.lower'),
        short: t('marketingsource-name-textfield'),
        shortLower: t('marketingsource-name-lower'),
        min: 2,
        max: 50,
        example: 'Surgical Department',
        // description: 'A friendly name',
        // extra: <i>Please note: blah blah blahh</i>,
        cssWidth: 'max',
        type: 'string',
      },
    },
  }
  return (
    <CrudLayout
      schema={schema}
      tableSearch={true}
      addFilter={false}
      draggable={false}
      addQuery={ADD_MUTATION}
      deleteQuery={DELETE_MUTATION}
      listQuery={LIST_QUERY}
      editQuery={EDIT_MUTATION}
      aggregateQuery={LIST_AGGREGATE_QUERY}
      updateOrderQuery={UPDATE_ORDER_MUTATION}
      {...user}
    />
  )
}

export default Departments
