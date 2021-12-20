import { ClientAreaLayout } from '../../../components/Setup/ClientArea'
import LayoutArea from '../../../components/Setup/ClientArea/BookingPageClientPage/LayoutArea'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import React from 'react'

const Index = () => {
  const { t } = useTranslationI18()

  const pageData = {
    breadcrumbName: t('setup.online-booking.online-booking'),
    path: t('setup/online-booking'),
    setup: 'Setup',
    titleBooking: t('setup.online-booking.booking-activity'),
    onlineTitleBooking: t('setup.online-booking.online-bookings-by-month'),
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
