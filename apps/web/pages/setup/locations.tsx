import { NextPage } from 'next'
import React from 'react'
import LocationsLayout from '../../components/Locations/LocationsLayout'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

export const Index: NextPage = () => {
  const { t } = useTranslationI18()
  const schema: Schema = {
    full: t('setup.locations.title'),
    fullLower: t('setup.locations.title'),
    short: t('setup.locations.title.short'),
    shortLower: t('setup.locations.title.short'),
    createButtonLabel: t('setup.locations.header.create.title'),
    searchPlaceholder: t('setup.locations.header.search.placeholder'),
    noDataText: t('setup.locations.noDataText'),
    messages: {
      create: {
        success: t('setup.locations.notification.create.success'),
        error: t('setup.locations.notification.create.error'),
      },
      update: {
        success: t('setup.locations.notification.edit.success'),
        error: t('setup.locations.notification.edit.error'),
      },
      delete: {
        success: t('setup.locations.notification.delete.success'),
        error: t('setup.locations.notification.delete.error'),
      },
    },
    fields: {},
  }
  return <LocationsLayout schema={schema} />
}

export default Index
