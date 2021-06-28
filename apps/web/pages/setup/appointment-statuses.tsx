import React, { useContext } from 'react'
import { NextPage } from 'next'
import {
  AppointmentStatusDocument,
  AppointmentStatusAggregateDocument,
  LastAppointmentStatusOrderDocument,
  CreateOneBookingStatusDocument,
  UpdateOneBookingStatusDocument,
  DeleteOneBookingStatusDocument,
} from '@pabau/graphql'
import CrudLayout from '../../components/CrudLayout/CrudLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { UserContext } from '../../context/UserContext'

export const AppointmentStatuses: NextPage = () => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)

  const schema: Schema = {
    full: t('setup.appointmentstatuses.schema.title'),
    fullLower: t('setup.appointmentstatuses.schema.title.lowercase'),
    short: t('setup.appointmentstatuses.schema.title'),
    shortLower: t('setup.appointmentstatuses.schema.title.lowercase'),
    shemaType: t('setup.appointmentstatuses.schema.schematype'),
    createButtonLabel: t(
      'setup.appointmentstatuses.schema.create.appointmentstatuses'
    ),
    messages: {
      create: {
        success: t(
          'setup.appointmentstatuses.schema.created.appointmentstatuses.message'
        ),
        error: t(
          'setup.appointmentstatuses.schema.create.appointmentstatuses.error.message'
        ),
      },
      update: {
        success: t(
          'setup.appointmentstatuses.schema.updated.appointmentstatuses.message'
        ),
        error: t(
          'setup.appointmentstatuses.schema.update.appointmentstatuses.error.message'
        ),
      },
      delete: {
        success: t(
          'setup.appointmentstatuses.schema.deleted.appointmentstatuses.message'
        ),
        error: t(
          'setup.appointmentstatuses.schema.delete.appointmentstatuses.error.message'
        ),
      },
    },
    fields: {
      indicator: {
        radio: [
          {
            label: t(
              'setup.appointmentstatuses.schema.fields.appointmenttype.line'
            ),
            value: 'LINE',
          },
          {
            label: t(
              'setup.appointmentstatuses.schema.fields.appointmenttype.icon'
            ),
            value: 'ICON',
          },
        ],
        type: 'radio-group',
        visible: false,
        defaultvalue: 'EMPTY_ENUM_VALUE',
      },
      icon: {
        type: 'icon',
        visible: false,
      },
      name: {
        full: 'Friendly Name',
        fullLower: 'friendly name',
        short: t('setup.appointmentstatuses.schema.fields.short.name'),
        shortLower: t(
          'setup.appointmentstatuses.schema.fields.short.name.lowercase'
        ),
        min: 2,
        max: 50,
        example: t('setup.appointmentstatuses.schema.fields.name.example'),
        cssWidth: 'max',
        type: 'string',
      },
      icon_color: {
        full: t('setup.appointmentstatuses.schema.fields.color'),
        type: 'color-picker',
        visible: false,
        required: false,
        validateMsg: t(
          'setup.appointmentstatuses.schema.fields.color.validatemsg'
        ),
      },
      track_time: {
        full: t('setup.appointmentstatuses.schema.fields.tracktime'),
        type: 'checkbox',
        defaultvalue: true,
        visible: false,
        description: t(
          'setup.appointmentstatuses.schema.fields.tracktime.description'
        ),
      },
      basic_field: {
        full: t('setup.appointmentstatuses.schema.fields.active'),
        type: 'boolean',
        defaultvalue: false,
        visible: false,
      },
    },
    filter: {
      primary: {
        name: 'is_active',
        type: 'boolean',
        default: true,
        active: true,
        inactive: false,
      },
    },
    disable: {
      type: 'boolean',
      conditionalField: 'basic_field',
      deleteable: true,
    },
    ordering: {
      name: 'ord',
      type: 'number',
    },
    company: 'Company',
  }

  return (
    <CrudLayout
      schema={schema}
      tableSearch={false}
      addFilter={false}
      addQuery={CreateOneBookingStatusDocument}
      deleteQuery={DeleteOneBookingStatusDocument}
      listQuery={AppointmentStatusDocument}
      editQuery={UpdateOneBookingStatusDocument}
      aggregateQuery={AppointmentStatusAggregateDocument}
      updateOrderQuery={UpdateOneBookingStatusDocument}
      getLastOrder={LastAppointmentStatusOrderDocument}
      isCustomOrder={true}
      isDependentField={true}
      requireAdminAccess={true}
      displayColor={true}
      displayLock={true}
      isCodeGen={true}
      {...user}
    />
  )
}

export default AppointmentStatuses
