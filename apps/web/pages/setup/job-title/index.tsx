import { NextPage } from 'next'
import React, { useContext } from 'react'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { UserContext } from '../../../context/UserContext'
import {
  CompanyPositionsDocument,
  CompanyPositionsAggregateDocument,
  DeleteCompanyPositionsDocument,
  CreateCompanyPositionsDocument,
  UpdateCompanyPositionsDocument,
  UpdateCompanyPositionOrderDocument,
} from '@pabau/graphql'

export const JobTitle: NextPage = () => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

  const schema: Schema = {
    full: t('setup.jobtitle.schema.title'),
    fullLower: t('setup.jobtitle.schema.title.lowercase'),
    short: t('setup.jobtitle.schema.title'),
    shortLower: t('setup.jobtitle.schema.title.lowercase'),
    createButtonLabel: t('setup.jobtitle.schema.create.job.title'),
    createModalHeader: t('setup.jobtitle.schema.header.create'),
    editModalHeader: t('setup.jobtitle.schema.header.edit'),
    deleteModalHeader: t('setup.jobtitle.schema.header.delete'),
    deleteBtnLabel: t('setup.jobtitle.schema.delete.button.label'),
    messages: {
      create: {
        success: t('setup.jobtitle.schema.created.job.message'),
        error: t('setup.jobtitle.schema.create.job.error.message'),
      },
      update: {
        success: t('setup.jobtitle.schema.updated.job.message'),
        error: t('setup.jobtitle.schema.update.job.error.message'),
      },
      delete: {
        success: t('setup.jobtitle.schema.deleted.job.message'),
        error: t('setup.jobtitle.schema.delete.job.error.message'),
      },
    },
    fields: {
      position: {
        full: t('setup.jobtitle.schema.jobname'),
        fullLower: t('setup.jobtitle.schema.friendlyname'),
        short: t('marketingsource-name-textfield'),
        shortLower: t('marketingsource-name-lower'),
        min: 2,
        max: 50,
        example: 'Therapist',
        // description: 'A friendly name',
        // extra: <i>Please note: blah blah blahh</i>,
        cssWidth: 'max',
        type: 'string',
      },
    },
    deleteDescField: 'position',
  }

  return (
    <CrudLayout
      schema={schema}
      tableSearch={true}
      addQuery={CreateCompanyPositionsDocument}
      deleteQuery={DeleteCompanyPositionsDocument}
      listQuery={CompanyPositionsDocument}
      editQuery={UpdateCompanyPositionsDocument}
      aggregateQuery={CompanyPositionsAggregateDocument}
      updateOrderQuery={UpdateCompanyPositionOrderDocument}
      addFilter={false}
      draggable={false}
      requireAdminAccess={true}
      {...user}
    />
  )
}

export default JobTitle
