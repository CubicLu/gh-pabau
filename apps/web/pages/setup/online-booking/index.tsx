import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import React, { FC, useState, useEffect } from 'react'
import LayoutArea from '../../../components/Setup/ClientArea/BookingPageClientPage/LayoutArea'
import {
  AnalyticsTab,
  BuilderTab,
  defaultBuilderData,
  OnlineBookingBuilder,
  PaymentTab,
  PromoteTab,
} from '../../../components/Setup/OnlineBooking'

import {
  FacebookOutlined,
  GlobalOutlined,
  InstagramOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'

export interface OnlineBookingProps {
  builderSetting: OnlineBookingBuilder
}

export const Index: FC<OnlineBookingProps> = ({
  builderSetting = defaultBuilderData,
}) => {
  const [builder, setBuilder] = useState<OnlineBookingBuilder>(
    defaultBuilderData
  )
  const { t } = useTranslationI18()

  const pageData = {
    breadcrumbName: t('setup.online-booking.online-booking'),
    path: t('setup/online-booking'),
    setup: 'Setup',
    titleBooking: t('setup.online-booking.booking-activity'),
    onlineTitleBooking: t('setup.online-booking.online-bookings-by-month'),
    stats: [
      {
        statIcon: <GlobalOutlined style={{ color: '#55B2D3' }} />,
        statValue: '1221',
        statName: 'Website',
        statQuestion: <QuestionCircleOutlined />,
      },
      {
        statIcon: <FacebookOutlined style={{ color: '#3576CF' }} />,
        statValue: '853',
        statName: 'Facebook',
        statQuestion: <QuestionCircleOutlined />,
      },
      {
        statIcon: <InstagramOutlined style={{ color: '#CF3A56' }} />,
        statValue: '2567',
        statName: 'Instagram',
        statQuestion: <QuestionCircleOutlined />,
      },
    ],
  }

  useEffect(() => {
    setBuilder(builderSetting)
  }, [builderSetting])

  return (
    <LayoutArea pageData={pageData}>
      <BuilderTab builder={builder} />
      <PaymentTab />
      <AnalyticsTab />
      <PromoteTab />
    </LayoutArea>
  )
}

export default Index
