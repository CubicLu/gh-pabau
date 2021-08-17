import {
  CheckOutlined,
  FileTextOutlined,
  LinkOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useAccountInformationsQuery } from '@pabau/graphql'
import {
  Avatar,
  SubscriptionInfo,
  SubscriptionInfoProps,
  SubscriptionType,
} from '@pabau/ui'
import { Card, Col, Row, Typography, Skeleton } from 'antd'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import React, { FC, useEffect, useState } from 'react'
import profileImg from '../../../assets/images/icons/img.png'
import location from '../../../assets/images/icons/location.png'
import paymentTerminal from '../../../assets/images/icons/payment_terminal.png'
import styles from './SubscriptionComponents.module.less'

const AccountInformation: FC = () => {
  const { Text, Paragraph, Link } = Typography
  const { t } = useTranslationI18()
  const [info, setInfo] = useState<SubscriptionInfoProps>()
  const { data, loading } = useAccountInformationsQuery()

  useEffect(() => {
    if (data !== undefined) {
      const trial_days = Math.round(
        Math.abs(
          (Date.now() -
            new Date(data.company?.subscription?.license_expiry).valueOf()) /
            (24 * 60 * 60 * 1000)
        )
      )

      const goPlusActive =
        data.metas?.filter(
          (item) => item.meta_name === 'goPlusActive' && item.meta_value === '1'
        ).length > 0
          ? true
          : false

      const automationActive =
        data.metas?.filter(
          (item) =>
            item.meta_name === 'automationActive' && item.meta_value === '1'
        ).length > 0
          ? true
          : false

      const intelligenceActive =
        data.metas?.filter(
          (item) =>
            item.meta_name === 'intelligenceActive' && item.meta_value === '1'
        ).length > 0
          ? true
          : false

      const teamPlusActive =
        data.metas?.filter(
          (item) =>
            item.meta_name === 'teamPlusActive' && item.meta_value === '1'
        ).length > 0
          ? true
          : false

      const goPlusStartDate = data.metas?.filter(
        (item) => item.meta_name === 'goPlusStartDate'
      )[0]?.meta_value

      const automationStartDate = data.metas?.filter(
        (item) => item.meta_name === 'automationStartDate'
      )[0]?.meta_value

      const intelligenceStartDate = data.metas?.filter(
        (item) => item.meta_name === 'intelligenceStartDate'
      )[0]?.meta_value

      const teamPlusStartDate = data.metas?.filter(
        (item) => item.meta_name === 'teamPlusStartDate'
      )[0]?.meta_value

      const preparedData = {
        subscriptionName: data.company?.subscription
          ?.subscription_name as SubscriptionType,
        inTrial: data.company?.subscription?.trial as boolean,
        trialDaysRemaining: trial_days,
        marketingPlusStartDate: new Date(
          data?.company?.subscription?.am_start_date
        ),
        marketingPlusActive:
          data.company?.subscription?.advanced_marketing_addon === 1
            ? true
            : false,
        goPlusActive: goPlusActive,
        automationActive: automationActive,
        intelligenceActive: intelligenceActive,
        teamPlusActive: teamPlusActive,
        goPlusStartDate: new Date(goPlusStartDate),
        automationStartDate: new Date(automationStartDate),
        intelligenceStartDate: new Date(intelligenceStartDate),
        teamPlusStartDate: new Date(teamPlusStartDate),
      }
      setInfo(preparedData)
    }
  }, [data])

  const CheckedItem = (text: string) => {
    return (
      <Col span={24}>
        <Row gutter={18}>
          <Col>
            <CheckOutlined className={styles.link} />
          </Col>
          <Paragraph className={styles.blackText}>{text}</Paragraph>
        </Row>
      </Col>
    )
  }

  const AccountSummary = () => {
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <div className={styles.subTitle}>
          {t('setup.subscription.account-summary')}
        </div>
        {loading ? (
          <Skeleton loading={loading} active />
        ) : (
          <div>
            <Row style={{ marginTop: 16 }}>
              <Avatar
                src={
                  data?.company?.owner?.image
                    ? `https://crm.pabau.com${data?.company?.owner?.image}`
                    : profileImg
                }
              />
              <Col style={{ marginLeft: 12 }}>
                <Text className={styles.blackText}>
                  {data?.company?.owner?.full_name}
                </Text>
                <Paragraph type="secondary">
                  {t('setup.subscription.account-owner')}
                </Paragraph>
              </Col>
            </Row>
            <Paragraph className={styles.font12p} style={{ marginTop: 10 }}>
              {t('setup.subscription.your-pabau-url')}:
            </Paragraph>
            <Row>
              <LinkOutlined
                className={styles.link}
                style={{ fontSize: 13, marginTop: 4 }}
              />
              <Link className={styles.link} style={{ marginLeft: 8 }}>
                {data?.company?.remote_url.replace('https://', '')}
              </Link>
            </Row>
            <Row style={{ marginTop: 16 }}>
              <Col span={12}>
                <Paragraph className={styles.font12p}>
                  {t('setup.subscription.active-employees')}:
                </Paragraph>
                <UserOutlined
                  className={styles.link}
                  style={{ fontSize: 13 }}
                />
                <Text className={styles.link} style={{ marginLeft: 8 }}>
                  {data?.usersCount}
                </Text>
              </Col>
              <Col span={12}>
                <Paragraph className={styles.font12p}>
                  {t('setup.subscription.server-name')}:
                </Paragraph>
                <img src={location} height={13} alt="logo" />
                <Text className={styles.link} style={{ marginLeft: 8 }}>
                  {data?.company?.subscription?.live_server
                    ?.toUpperCase()
                    .split('.')[0] ?? 'CRM01'}
                </Text>
              </Col>
            </Row>
            <div style={{ marginTop: 16 }}>
              <Paragraph className={styles.font12p}>
                {t('setup.subscription.file-storage')}:
              </Paragraph>
              <FileTextOutlined
                className={styles.link}
                style={{ fontSize: 13 }}
              />
              <Text className={styles.link} style={{ marginLeft: 8 }}>
                {data?.company?.subscription?.storage.toFixed(2)} MB
              </Text>
            </div>
          </div>
        )}
      </Card>
    )
  }

  const PaymentHistory = () => {
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <Text className={styles.subTitle}>
          Pabau {t('setup.subscription.payments')}
        </Text>
        <Row gutter={24} style={{ marginTop: 16 }}>
          <Col>
            <div className={styles.iconBtn}>
              <img src={paymentTerminal} height={18} alt="logo" />
            </div>
          </Col>
          <Col span={20}>
            <Paragraph className={styles.subTitle} style={{ marginBottom: 4 }}>
              {t('setup.subscription.payments-title')}
            </Paragraph>
            <Paragraph type="secondary">
              {t('setup.subscription.payments-subtitle')}
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          {CheckedItem('#INV001 Dummy')}
          {CheckedItem('#INV002 Dummy')}
          {CheckedItem('#INV003 Dummy')}
          {CheckedItem('#INV004 Dummy')}
          {CheckedItem('#INV005 Dummy')}
        </Row>
      </Card>
    )
  }

  return (
    <Row gutter={24} style={{ padding: 20 }}>
      <Col span={9}>
        {loading ? (
          <div className={styles.skeletonBorder}>
            <Skeleton.Button
              active={loading}
              className={styles.skeletonAccountInformation}
            />
            <Skeleton.Avatar
              active={loading}
              className={styles.skeletonAccountInformation}
            />
            <Skeleton.Input
              active={loading}
              className={styles.skeletonAccountInformation}
            />
            <Skeleton.Input
              active={loading}
              className={styles.skeletonAccountInformation}
            />
            <Skeleton.Input
              active={loading}
              className={styles.skeletonAccountInformation}
            />
          </div>
        ) : (
          <SubscriptionInfo
            subscriptionName={info?.subscriptionName}
            trialDaysRemaining={info?.trialDaysRemaining}
            marketingPlusActive={info?.marketingPlusActive}
            marketingPlusStartDate={info?.marketingPlusStartDate}
            inTrial={info?.inTrial}
            goPlusActive={info?.goPlusActive}
            goPlusStartDate={info?.goPlusStartDate}
            teamPlusActive={info?.teamPlusActive}
            teamPlusStartDate={info?.teamPlusStartDate}
            intelligenceActive={info?.intelligenceActive}
            intelligenceStartDate={info?.intelligenceStartDate}
            automationActive={info?.automationActive}
            automationStartDate={info?.automationStartDate}
          />
        )}
      </Col>
      <Col span={15}>
        <Row gutter={24} style={{ display: 'flex' }}>
          <Col span={12}>
            <AccountSummary />
          </Col>
          <Col span={12}>
            <Card bodyStyle={{ padding: 20 }}>
              <Paragraph
                className={styles.subTitle}
                style={{ marginBottom: 2 }}
              >
                {t('setup.subscription.account-manager')}
              </Paragraph>
              <Paragraph type="secondary" style={{ maxWidth: '90%' }}>
                {t('setup.subscription.account-manager-info')}...
              </Paragraph>
              <Link
                className={styles.learnMoreLink}
                href={`https://pabau.com/education/`}
                target="_blank"
              >
                {t('news.learn')}
              </Link>
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: 24 }}>
          <PaymentHistory />
        </div>
      </Col>
    </Row>
  )
}

export default AccountInformation
