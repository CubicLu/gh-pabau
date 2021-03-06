import React, { FC } from 'react'

import './SubscriptionInfo.module.less'
import { Card, Divider, Typography } from 'antd'
import { Button } from '@pabau/ui'
import {
  DashboardOutlined,
  DollarCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import ve from '../../assets/images/icons/Vector.png'
import logo from '../../assets/images/icons/log.png'
import stamp from '../../assets/images/icons/stamp.png'
import styles from './SubscriptionInfo.module.less'
import { useTranslation } from 'react-i18next'

export type SubscriptionType =
  | 'Trial'
  | 'Startup'
  | 'Solo'
  | 'Medium'
  | 'Group'
  | 'Enterprise'
  | 'Bespoke'

export interface SubscriptionInfoProps {
  subscriptionName: SubscriptionType
  marketingPlusActive?: boolean
  marketingPlusStartDate?: Date
  goPlusActive?: boolean
  goPlusStartDate?: Date
  automationActive?: boolean
  automationStartDate?: Date
  intelligenceActive?: boolean
  intelligenceStartDate?: Date
  teamPlusActive?: boolean
  teamPlusStartDate?: Date
  inTrial?: boolean
  trialDaysRemaining?: number
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const getDateStr = (date: Date | undefined): string => {
  if (!date || !date?.getDate?.()) return ''
  date = new Date(date)
  return ` since ${months[date.getMonth()]} ${date.getFullYear()}`
}

const getBtnStyle = (isActive = false): string => {
  return `${styles.iconBtn} ${isActive ? styles.active : ''}`
}

export const SubscriptionInfo: FC<SubscriptionInfoProps> = (props) => {
  const {
    subscriptionName,
    inTrial,
    trialDaysRemaining,
    marketingPlusStartDate,
  } = props
  const { Text, Paragraph } = Typography
  const { t } = useTranslation('common')

  const renderLearnMore = (isActive = false) => {
    if (isActive) return
    return (
      <Text className={styles.link}>{t('setup.subscription.learn-more')}</Text>
    )
  }

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <div className={styles.header}>
        <h6 className={styles.title}>{subscriptionName}</h6>
        {inTrial && (
          <Button type="link" size="small" className={styles.inTrial}>
            {t('setup.subscription.in-trial')}
          </Button>
        )}
        <div className={styles.logo}>
          <img src={logo} style={{ height: '100%' }} alt="logo" />
        </div>
      </div>
      {inTrial && (
        <>
          <Divider style={{ margin: 0 }} />
          <div style={{ padding: 20 }}>
            <Text className={styles.blackText}>
              {t('setup.subscription.you-have-trial-d', {
                trialDays: trialDaysRemaining || 7,
              })}
            </Text>
            <Paragraph className={styles.info} style={{ marginBottom: 0 }}>
              {t('setup.subscription.reach-out', {
                phoneNumber: '801-724-6601',
              })}
            </Paragraph>
          </div>
        </>
      )}
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: 20 }}>
        <div className={styles.feature}>
          <div className={getBtnStyle(props.marketingPlusActive)}>
            <DollarCircleOutlined style={{ fontSize: 16 }} />
          </div>
          <div>
            <Paragraph className={styles.subTitle}>
              {t('setup.subscription.marketing-plus')}
            </Paragraph>
            <Text className={styles.info}>
              {props.marketingPlusActive
                ? `Using it${getDateStr(marketingPlusStartDate)}.`
                : t('setup.subscription.supercharge-your-m')}{' '}
            </Text>
            {renderLearnMore(props.marketingPlusActive)}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={getBtnStyle(props.goPlusActive)}>
            <img src={ve} height={16} alt="logo" />
          </div>
          <div>
            <Paragraph className={styles.subTitle}>
              {t('setup.subscription.care-plus')}
            </Paragraph>
            <Text className={styles.info}>
              {props.goPlusActive
                ? `Using it${getDateStr(props.goPlusStartDate)}.`
                : t('setup.subscription.create-custom-p')}{' '}
            </Text>
            {renderLearnMore(props.goPlusActive)}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={getBtnStyle(props.automationActive)}>
            <img src={stamp} height={16} alt="logo" />
          </div>
          <div>
            <Paragraph className={styles.subTitle}>
              {t('setup.subscription.automation')}
            </Paragraph>
            <Text className={styles.info}>
              {props.automationActive
                ? `Using it${getDateStr(props.automationStartDate)}.`
                : 'Integrated payroll from BambooHR that makes paying your people surprisingly easy.'}{' '}
            </Text>
            {renderLearnMore(props.automationActive)}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={getBtnStyle(props.intelligenceActive)}>
            <DashboardOutlined style={{ fontSize: 16 }} />
          </div>
          <div>
            <Paragraph className={styles.subTitle}>
              {t('setup.subscription.intelligence')}
            </Paragraph>
            <Text className={styles.info}>
              {props.intelligenceActive
                ? `Using it${getDateStr(props.intelligenceStartDate)}.`
                : 'Integrated payroll from BambooHR that makes paying your people surprisingly easy.'}{' '}
            </Text>
            {renderLearnMore(props.intelligenceActive)}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={getBtnStyle(props.teamPlusActive)}>
            <TeamOutlined style={{ fontSize: 16 }} />
          </div>
          <div>
            <Paragraph className={styles.subTitle}>
              {t('setup.subscription.team-plus')}
            </Paragraph>
            <Text className={styles.info}>
              {' '}
              {props.teamPlusActive
                ? `Using it${getDateStr(props.teamPlusStartDate)}.`
                : 'Integrated payroll from BambooHR that makes paying your people surprisingly easy.'}{' '}
            </Text>
            {renderLearnMore(props.teamPlusActive)}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SubscriptionInfo
