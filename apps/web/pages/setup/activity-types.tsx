import { NextPage } from 'next'
import React from 'react'
import CrudLayout from '../../components/CrudLayout/CrudLayout'

import {
  UpdateActivityTypeByPkDocument,
  InsertActivityTypeOneDocument,
  DeleteActivityTypeDocument,
  ActivityTypesAggregateDocument,
  ActivityTypesListQueryDocument,
} from '@pabau/graphql'

import {
  SendOutlined,
  PhoneOutlined,
  MessageOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  CustomerServiceOutlined,
  BellOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  CameraOutlined,
  TrophyOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

export const ActivityTypes: NextPage = () => {
  const { t } = useTranslationI18()

  const subjectOptions = [
    {
      text: t('setup.activity-types.send'),
      key: 'Send',
      value: <SendOutlined />,
    },
    {
      text: t('setup.activity-types.phone'),
      key: 'Phone',
      value: <PhoneOutlined />,
    },
    {
      text: t('setup.activity-types.chat'),
      key: 'Chat',
      value: <MessageOutlined />,
    },
    {
      text: t('setup.activity-types.team'),
      key: 'Team',
      value: <TeamOutlined />,
    },
    {
      text: t('setup.activity-types.medical'),
      key: 'Medical',
      value: <MedicineBoxOutlined />,
    },
    {
      text: t('setup.activity-types.customer'),
      key: 'Customer',
      value: <CustomerServiceOutlined />,
    },
    {
      text: t('setup.activity-types.emergency'),
      key: 'Emergency',
      value: <BellOutlined />,
    },
    {
      text: t('setup.activity-types.reward'),
      key: 'Reward',
      value: <TrophyOutlined />,
    },
    {
      text: t('setup.activity-types.shopping'),
      key: 'Shopping',
      value: <ShoppingOutlined />,
    },
    {
      text: t('setup.activity-types.time'),
      key: 'Time',
      value: <ClockCircleOutlined />,
    },
    {
      text: t('setup.activity-types.camera'),
      key: 'Camera',
      value: <CameraOutlined />,
    },
    {
      text: t('setup.activity-types.location'),
      key: 'Location',
      value: <EnvironmentOutlined />,
    },
  ]

  const schema: Schema = {
    full: t('setup.activity.types'),
    fullLower: t('setup.activity.types.lower-case'),
    short: t('setup.activity.types'),
    shortLower: t('setup.activity.types.lower-case'),
    shemaType: t('setup.activity.types'),
    createButtonLabel: t('setup.activity.types.create'),
    messages: {
      create: {
        success: t('setup.activity-types.create.success'),
        error: t('setup.activity-types.create.error'),
      },
      update: {
        success: t('setup.activity-types.update.success'),
        error: t('setup.activity-types.update.error'),
      },
      delete: {
        success: t('setup.activity-types.delete.success'),
        error: t('setup.activity-types.delete.error'),
      },
    },
    fields: {
      name: {
        full: t('setup.activity.types.name'),
        fullLower: t('setup.activity.types.name.lower-case'),
        short: t('setup.activity.types.name'),
        shortLower: t('setup.activity.types.name.lower-case'),
        min: 2,
        max: 50,
        example: 'Medicine',
        cssWidth: 'max',
        type: 'string',
      },
      subject: {
        full: t('setup.activity.types.subject'),
        fullLower: t('setup.activity.types.subject.lower-case'),
        short: t('setup.activity.types.subject'),
        shortLower: t('setup.activity.types.subject.lower-case'),
        type: 'subjects',
        visible: true,
        defaultvalue: 'Send',
        cssWidth: 'max',
        // eslint-disable-next-line react/display-name
        render: (text) => {
          const icon = subjectOptions.find((s) => s.key === text).value
          const textVal = subjectOptions.find((s) => s.key === text).text
          return (
            <span>
              {icon}
              {' ' + textVal}
            </span>
          )
        },
      },
      is_active: {
        full: 'Active',
        type: 'boolean',
        defaultvalue: true,
      },
    },
  }

  return (
    <CrudLayout
      schema={schema}
      tableSearch={false}
      addQuery={InsertActivityTypeOneDocument}
      deleteQuery={DeleteActivityTypeDocument}
      listQuery={ActivityTypesListQueryDocument}
      editQuery={UpdateActivityTypeByPkDocument}
      aggregateQuery={ActivityTypesAggregateDocument}
      updateOrderQuery={UpdateActivityTypeByPkDocument}
      draggable={false}
    />
  )
}

export default ActivityTypes
