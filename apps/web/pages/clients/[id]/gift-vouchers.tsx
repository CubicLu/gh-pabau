import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Skeleton } from 'antd'
import styles from '../clients.module.less'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import {
  useGetSoldVouchersLazyQuery,
  useCountVouchersByStatusLazyQuery,
} from '@pabau/graphql'
import { ClientGiftVoucherLayout, Pagination } from '@pabau/ui'
import dayjs from 'dayjs'
import { useUser } from '../../../context/UserContext'
import stringToCurrencySignConverter from '../../../helper/stringToCurrencySignConverter'

const Vouchers = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const user = useUser()
  const [status, setStatus] = useState<string>('0')
  const [vouchers, setVouchers] = useState([])
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })

  const contactID = Number(router.query['id'])
  const [
    countVouchersByStatus,
    { data: count },
  ] = useCountVouchersByStatusLazyQuery()
  const [getSoldVouchers, { data, loading }] = useGetSoldVouchersLazyQuery()
  useEffect(() => {
    if (data) {
      setVouchers(data.vouchers)
    }
  }, [data])

  useEffect(() => {
    countVouchersByStatus({
      variables: {
        contactID: contactID,
        date: new Date().toISOString(),
      },
    })
    if (status === '1') {
      getSoldVouchers({
        variables: {
          where: {
            OR: [
              {
                Contact: {
                  ID: {
                    equals: contactID,
                  },
                },
                expiry_date: {
                  lt: new Date().toISOString(),
                },
              },
              {
                Contact: {
                  ID: {
                    equals: contactID,
                  },
                },
                remaining_balance: {
                  equals: 0,
                },
              },
            ],
          },
          take: paginateData.limit,
          skip: paginateData.offset,
        },
      })
    } else {
      getSoldVouchers({
        variables: {
          where: {
            Contact: {
              ID: {
                equals: contactID,
              },
            },
            status: {
              equals: 'Active',
            },
            expiry_date: {
              gte: new Date().toISOString(),
            },
            remaining_balance: { gte: 0 },
          },
          take: paginateData.limit,
          skip: paginateData.offset,
        },
      })
    }
  }, [status, contactID, paginateData, countVouchersByStatus, getSoldVouchers])

  const onPaginationChange = (currentPage, limit) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      limit,
      currentPage: currentPage,
    })
  }

  const voucherData = (data) => {
    return data?.map((val) => {
      return {
        id: val.id,
        validTill: val?.expiry_date,
        voucher: {
          backgroundColor1: '#9013FE',
          backgroundColor2: '#BD10E0',
          gradientType: 'linear-gradient',
          borderColor: '#000',
          voucherPrice: val?.amount,
          voucherNum: val?.code,
          voucherSoldPrice: val?.remaining_balance,
          currencyType: stringToCurrencySignConverter(user.me?.currency),
          voucherPriceLabel: t('ui.client.giftvoucher.pricelabel'),
          voucherSoldPriceLabel: `Expires on: ${dayjs(val?.expiry_date).format(
            'DD MMM YY'
          )}`,
          voucherRelation: val?.description,
          termsConditions: t('ui.vouchercard.back.subtitle'),
        },
      }
    })
  }

  return (
    <div>
      <ClientCardLayout
        clientId={Number(router.query['id'])}
        activeTab="gift-vouchers"
      >
        {loading ? (
          <div className={styles.skeletonWrapper}>
            <div className={styles.skeletonTabs}>
              {[...Array.from({ length: 2 })].map((item, index) => (
                <Skeleton.Button
                  className={styles.skeletonTab}
                  active
                  size={'default'}
                  key={index}
                />
              ))}
            </div>
            <div className={styles.skeletonTabsContent}>
              {[...Array.from({ length: 6 })].map((item, index) => (
                <Skeleton.Button
                  className={styles.skeletonTabContent}
                  size={'default'}
                  active
                  key={index}
                />
              ))}
            </div>
          </div>
        ) : (
          <ClientGiftVoucherLayout
            activeKey={status}
            onChangeTab={(val) => setStatus(val)}
            isEmpty={count?.activeCount || count?.expiredCount ? false : true}
            activeVouchersCount={count?.activeCount}
            activeVouchers={voucherData(vouchers) || []}
            expiredVouchersCount={count?.expiredCount}
            expiredVouchers={voucherData(vouchers) || []}
            onCardSelect={(e) => Promise.resolve(true)}
          />
        )}
        <Pagination
          total={status === '0' ? count?.activeCount : count?.expiredCount}
          defaultPageSize={50}
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSizeOptions={['10', '25', '50', '100']}
          onPageSizeChange={(pageSize) => {
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
      </ClientCardLayout>
    </div>
  )
}

export default Vouchers
