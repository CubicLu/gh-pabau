import React, { FC, useEffect, useRef, useState } from 'react'
import { MyLottie as Lottie, TabMenu, VoucherCard } from '@pabau/ui'
import { CloseOutlined, EditOutlined, StarOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import emptyState from '../../assets/lottie/empty-state.json'
import styles from './ClientGiftVoucherLayout.module.less'
import { VoucherCardProps } from '../voucher-card/VoucherCard'

export interface ClientGiftVoucherLayoutProps {
  isEmpty?: boolean
  activeVouchers: VoucherListProps[]
  expiredVouchers: VoucherListProps[]
  onCardSelect: (e: VoucherListProps) => Promise<boolean>
}

export interface VoucherListProps {
  id: number
  validTill: string
  voucher: VoucherCardProps
}

export const ClientGiftVoucherLayout: FC<ClientGiftVoucherLayoutProps> = ({
  isEmpty,
  activeVouchers,
  expiredVouchers,
  onCardSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('common')
  const [activeVoucherList, setActiveVoucherList] = useState<
    VoucherListProps[]
  >([])
  const [expiredVoucherList, setExpiredVoucherList] = useState<
    VoucherListProps[]
  >([])

  const DotMenuOptions = [
    {
      key: 1,
      icon: <EditOutlined />,
      label: t('ui.vouchercard.menu.changeexpiry'),
    },
    {
      key: 2,
      icon: <CloseOutlined />,
      label: t('ui.vouchercard.menu.forceexpire'),
    },
  ]

  useEffect(() => {
    setActiveVoucherList(activeVouchers)
    setExpiredVoucherList(expiredVouchers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVouchers, expiredVouchers])

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
        <div style={{ background: '#fff' }}>
          <TabMenu
            menuItems={[
              `${t('ui.client.giftvoucher.tab.active')} (${
                activeVoucherList.length
              })`,
              `${t('ui.client.giftvoucher.tab.expired')} (${
                expiredVoucherList.length
              })`,
            ]}
            tabPosition="top"
          >
            <div className={styles.voucher}>
              {activeVoucherList.length > 0 &&
                activeVoucherList.map((item) => (
                  <div
                    key={item.id}
                    className={styles.voucherItem}
                    onClick={() => onCardSelect(item)}
                  >
                    <VoucherCard
                      {...item.voucher}
                      dotMenuOptions={DotMenuOptions}
                    />
                  </div>
                ))}
            </div>
            <div className={styles.voucher}>
              {expiredVoucherList.length > 0 &&
                expiredVoucherList.map((item) => (
                  <div
                    key={item.id}
                    className={styles.voucherItem}
                    onClick={() => onCardSelect(item)}
                  >
                    <VoucherCard
                      {...item.voucher}
                      dotMenuOptions={[...DotMenuOptions].map((item) => {
                        const newItem = { ...item }
                        if (newItem.label === 'Force Expire') {
                          newItem.icon = <StarOutlined />
                          newItem.label = t('ui.vouchercard.menu.reactivate')
                        }
                        return newItem
                      })}
                    />
                  </div>
                ))}
            </div>
          </TabMenu>
        </div>
      )}
    </div>
  )
}

export default ClientGiftVoucherLayout
