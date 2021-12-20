import { useClientLoyaltyLazyQuery } from '@pabau/graphql'
import { Breadcrumb } from '@pabau/ui'
import { Table, Typography } from 'antd'
import cn from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/UserContext/context/ClientContext'
import { useDateFormatter } from '../../hooks/useDateFormatter'
import styles from './loyalty.module.less'

const { Title } = Typography

interface LoyaltyActivity {
  date: string
  time: string
  action: string
  points: number
}

export const Loyalty = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [loyaltyData, setLoyaltyData] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [activity, setActivity] = useState([])
  const clientContext = useContext(ClientContext)
  const { formatDateFromUnix } = useDateFormatter()
  const [loadClientLoyalty] = useClientLoyaltyLazyQuery({
    onCompleted(data) {
      if (data.findManyCmContact.length > 0) {
        setTotalPoints(data.findManyCmContact[0].LoyaltyPoint.points)
        setTotalAmount(data.findManyCmContact[0].LoyaltyPoint.points)
        const loyaltyLogData = data.findManyCmContact[0].LoyaltyLog.map(
          (logItem) => {
            const date = formatDateFromUnix(logItem.date, {
              full_date_and_weekday_long: 1,
            })
            const time = formatDateFromUnix(logItem.date, {
              single_hour_minutes: 1,
            })
            return {
              date: date,
              time: time,
              action: 'Purchasing each service - at ringup only',
              points: logItem.amount,
            }
          }
        )

        setActivity(loyaltyLogData)
      }
    },
    onError(error) {
      console.log('error', error)
    },
  })

  const columns = [
    {
      title: t('connect.account.loyalty.column.date'),
      dataIndex: 'date',
      key: 'date',
      width: '210px',
    },
    {
      title: t('connect.account.loyalty.column.time'),
      dataIndex: 'time',
      key: 'time',
      width: '100px',
    },
    {
      title: t('connect.account.loyalty.column.action'),
      dataIndex: 'action',
      key: 'action',
      width: '364px',
    },
    {
      title: t('connect.account.loyalty.column.points'),
      dataIndex: 'points',
      key: 'points',
      width: '140px',
      // eslint-disable-next-line react/display-name
      render: (points) => {
        return (
          <div
            className={
              points >= 0
                ? cn(styles.activityPoints, styles.activityGreen)
                : cn(styles.activityPoints, styles.activityRed)
            }
          >{`${points >= 0 ? '+' : '-'}${Number(points).toFixed(2)}`}</div>
        )
      },
    },
  ]

  useEffect(() => {
    loadClientLoyalty({
      variables: {
        contact_id: clientContext[0].contact_id,
      },
    })
  }, [clientContext, loadClientLoyalty])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.loyaltyContainer}>
        <div className={styles.loyaltyHeader}>
          {!isMobile ? (
            <>
              <Breadcrumb
                items={[
                  {
                    breadcrumbName: t('connect.account.title'),
                    path: 'account',
                  },
                  {
                    breadcrumbName: t('connect.account.loyalty'),
                    path: '',
                  },
                ]}
              />
              <Title>{t('connect.account.loyalty')}</Title>
            </>
          ) : (
            <Title>{t('connect.account.loyalty')}</Title>
          )}
        </div>
        <div className={styles.loyaltyContent}>
          <div>
            <div className={styles.header}>
              {t('connect.account.loyalty.bonuses')}
            </div>
            <div className={cn(styles.content, styles.bonucesContent)}>
              <div>
                <p>{t('connect.account.loyalty.totalpoints')}</p>
                <p>{totalPoints}</p>
              </div>
              <div>
                <p>{t('connect.account.loyalty.totalamount')}</p>
                <p>{totalAmount}</p>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.header}>
              {t('connect.account.loyalty.activity')}
            </div>
            <div className={styles.content}>
              <Table
                dataSource={
                  activity.map((item, index) => ({
                    ...item,
                    key: index,
                  })) as never[]
                }
                columns={columns}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </div>
          </div>
        </div>
      </div>
    </ConnectLayout>
  )
}

export default Loyalty
