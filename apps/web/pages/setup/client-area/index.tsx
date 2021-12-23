import { ClientAreaLayout } from '../../../components/Setup/ClientArea'
import LayoutArea from '../../../components/Setup/ClientArea/BookingPageClientPage/LayoutArea'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import React from 'react'

const Index = () => {
  const { t } = useTranslationI18()

  const pageData = {
    breadcrumbName: t('setup.client-area.client-area'),
    path: 'setup/client-area',
    setup: 'Setup',
    titleBooking: t('setup.client-area.client-activity'),
    onlineTitleBooking: t('setup.client-area.client-bookings-by-month'),
    textFacebook: 'App downloads',
    textWebsite: 'Registrations',
    textInstagram: 'Active users',
    stats: [
      {
        statIcon: '',
        statValue: '853',
        statName: 'App Downloads',
        statQuestion: '',
      },
      {
        statIcon: '',
        statValue: '1221',
        statName: 'Registrations',
        statQuestion: '',
      },
      {
        statIcon: '',
        statValue: '2567',
        statName: 'Active users',
        statQuestion: '',
      },
    ],
  }

  return (
    <LayoutArea pageData={pageData}>
      <ClientAreaLayout />
    </LayoutArea>
  )
}

export default Index
