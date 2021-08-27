import React, { FC, useRef, useState, useEffect } from 'react'
import { MyLottie as Lottie, Table, Pagination } from '@pabau/ui'
import dayjs from 'dayjs'
import emptyState from '../../assets/lottie/empty-state.json'
import { useTranslation } from 'react-i18next'
import styles from './ClientLoyaltyLayout.module.less'

export interface ClientLoyaltyLayoutProps {
  isEmpty?: boolean
  data: LoyaltyDataProps[]
  onLoyaltySelect: (e: LoyaltyDataProps) => Promise<boolean>
}

interface LoyaltyDataProps {
  id: number
  date: string
  time: string
  action: string
  points: string
}

export const ClientLoyaltyLayout: FC<ClientLoyaltyLayoutProps> = ({
  isEmpty,
  data,
  onLoyaltySelect,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('common')
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })

  const columns = [
    {
      title: t('ui.clientloyaltylayout.field.date'),
      dataIndex: 'date',
      visible: true,
      width: 180,
      className: 'loyaltyName',
      render: function renderSourceName(val) {
        return (
          <div className={styles.loyaltyName}>
            {`${dayjs(val).format('DD/MM/YYYY')}, ${dayjs(val).format('dddd')}`}
          </div>
        )
      },
    },
    {
      title: t('ui.clientloyaltylayout.field.time'),
      dataIndex: 'time',
      visible: true,
      className: 'loyaltyName',
      render: function renderSourceName(val) {
        return <div className={styles.loyaltyName}>{val}</div>
      },
    },
    {
      title: t('ui.clientloyaltylayout.field.action'),
      dataIndex: 'action',
      visible: true,
      className: 'loyaltyName',
      render: function renderSourceName(val) {
        return <div className={styles.loyaltyName}>{val}</div>
      },
    },
    {
      title: t('ui.clientloyaltylayout.field.points'),
      dataIndex: 'points',
      visible: true,
      className: 'loyaltyName',
      render: function renderSourceName(val) {
        return (
          <div className={styles.loyaltyName}>
            <span style={{ color: '#65CD98' }}>{val}</span>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    setPaginateData({
      ...paginateData,
      total: data?.length,
      showingRecords: data?.length,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  const onPaginationChange = (currentPage, limit) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      limit,
      currentPage: currentPage,
    })
  }

  return (
    <div>
      {isEmpty ? (
        <div className={styles.clientLayout} ref={ref}>
          <Lottie
            options={{
              loop: true,
              autoPlay: true,
              animationData: emptyState,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
        </div>
      ) : (
        <div className={styles.loyaltyLayoutMain}>
          <Table
            columns={columns}
            style={{ height: '100%' }}
            sticky={{ offsetScroll: 80, offsetHeader: 0 }}
            scroll={{ x: 'max-content' }}
            dataSource={data?.map((e: { id: string | number }) => ({
              key: e.id,
              ...e,
            }))}
            onRowClick={(e) => onLoyaltySelect(e)}
          />
          <div className={styles.totalWrapper}>
            <span>{t('ui.clientloyaltylayout.field.totalamount')}</span>
            <span>{t('ui.clientloyaltylayout.field.totalpoints')}</span>
          </div>
          <div className={styles.amountWrapper}>
            <span>£652.45</span>
            <span>652.45</span>
          </div>
          <div className={styles.paginationWrapper}>
            <Pagination
              total={paginateData.total}
              defaultPageSize={50}
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSizeOptions={['10', '25', '50', '100']}
              onPageSizeChange={(pageSize) => {
                if (pageSize)
                  setPaginateData({
                    ...paginateData,
                    limit: pageSize,
                    offset: 0,
                    currentPage: 1,
                  })
              }}
              pageSize={paginateData.limit}
              current={paginateData.currentPage}
              showingRecords={paginateData.showingRecords}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientLoyaltyLayout
