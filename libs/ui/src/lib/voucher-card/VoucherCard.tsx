import React, { FC, ReactNode, useRef, useState } from 'react'
import { Button, DotButton } from '@pabau/ui'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  NotificationOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styles from './VoucherCard.module.less'
import classNames from 'classnames'
import { Drawer } from 'antd'

interface MenuOption {
  key: number
  label: string
  icon: ReactNode
  onClick?: () => void
}

export interface VoucherCardProps {
  cardWidth?: number
  backgroundColor1?: string
  backgroundColor2?: string
  background?: string
  gradientType: string
  bookNowButton?: boolean
  buttonLabel: string
  borderColor: string
  voucherType?: string
  voucherNum?: number
  voucherPrice: number
  voucherPriceLabel: string
  voucherSoldPrice?: number
  voucherSoldPriceLabel?: string
  voucherRelation: string
  voucherRelationLabel: string
  currencyType?: string
  termsConditions?: string
  voucherBackgroundUrl?: string
  showMenu?: boolean
  menuOptions?: MenuOption[]
  onMenuClick?: (key) => void
  showDrawerMenu?: boolean
}

export const VoucherCard: FC<VoucherCardProps> = ({
  cardWidth = 500,
  backgroundColor1,
  backgroundColor2,
  background,
  gradientType,
  bookNowButton,
  buttonLabel,
  showMenu,
  menuOptions,
  onMenuClick,
  borderColor,
  voucherType = '',
  voucherNum,
  voucherPrice = 0,
  voucherPriceLabel,
  voucherSoldPrice = 0,
  voucherSoldPriceLabel,
  voucherRelation,
  voucherRelationLabel,
  currencyType = '$',
  termsConditions = 'N/A',
  voucherBackgroundUrl,
  showDrawerMenu = false,
}) => {
  const { t } = useTranslation('common')
  const cardRef = useRef<HTMLDivElement>(null)
  const voucherTypes = ['flowers', 'valentine', 'birthday']
  const [menuPopover, setMenuPopover] = useState(false)

  const defaultMenuOptions: MenuOption[] = [
    {
      key: 1,
      icon: <EditOutlined />,
      label: 'Edit',
    },
    {
      key: 1,
      icon: <EditOutlined />,
      label: 'Edit',
    },
    {
      key: 2,
      icon: <NotificationOutlined />,
      label: 'Promote',
    },
    {
      key: 3,
      icon: <DeleteOutlined />,
      label: 'Delete',
    },
    {
      key: 4,
      icon: <ExclamationCircleOutlined />,
      label: 'Show terms and conditions',
    },
  ]

  const cardFaceBgColor = {
    background: `${gradientType}(${
      gradientType === 'radial-gradient' ? 'circle at center' : '47.23deg'
    }, ${backgroundColor1} 3.53%, ${backgroundColor2} 95.41%)`,
  }

  const dotsStyles = {
    width: `${cardWidth ? `${cardWidth / 25 / 2}px` : '25px'}`,
    height: `${cardWidth ? `${cardWidth / 25}px` : '10px'}`,
  }

  const flipCard = () => {
    if (cardRef?.current) {
      if (cardRef.current.classList.contains('flip')) {
        cardRef.current.classList.remove('flip')
      } else {
        cardRef.current.classList.add('flip')
      }
    }
  }

  return (
    <div className={styles.voucherCardMain}>
      <div
        className="flip-card"
        style={{
          width: `${`100%`}`,
          height: `${cardWidth ? `${cardWidth / 2}px` : '100%'}`,
        }}
      >
        <div className="flip-card-inner" ref={cardRef} onClick={flipCard}>
          <div
            className={`flip-card-front ${voucherType}`}
            style={
              !voucherType && !voucherTypes.includes(voucherType)
                ? voucherBackgroundUrl
                  ? { backgroundImage: `url(${voucherBackgroundUrl})` }
                  : background
                  ? { background: background }
                  : { ...cardFaceBgColor }
                : {}
            }
          >
            <div
              className={classNames(
                styles.dots,
                (voucherBackgroundUrl || voucherType) && styles.bgOpacity
              )}
            >
              <div className="dotsInner">
                <div className="dot1" style={{ ...dotsStyles }}></div>
                <div className="dot2" style={{ ...dotsStyles }}></div>
              </div>
            </div>

            <div className={styles.frontFaceContent}>
              <div className={styles.pRelative}>
                <div className={styles.buttonsRow}>
                  <div onClick={flipCard}>
                    {bookNowButton && (
                      <Button type="default">{buttonLabel}</Button>
                    )}
                  </div>
                  <div onClick={flipCard}>
                    {showMenu && (
                      <>
                        <DotButton
                          onMenuClick={(key) => {
                            setMenuPopover(() => false)
                            onMenuClick?.(key)
                          }}
                          popoverVisible={showDrawerMenu ? false : menuPopover}
                          setPopoverVisible={(popover) =>
                            setMenuPopover(() => popover)
                          }
                          menuList={menuOptions || defaultMenuOptions}
                        />
                        <Drawer
                          closable
                          placement="bottom"
                          visible={showDrawerMenu ? menuPopover : false}
                          className={styles.voucherDrawer}
                          title={<div />}
                          height="auto"
                          onClose={() => setMenuPopover(() => false)}
                        >
                          {(menuOptions || defaultMenuOptions)?.map(
                            ({ key, icon, label, onClick }) => (
                              <div
                                key={label}
                                onClick={() => {
                                  setMenuPopover(() => false)
                                  if (onClick) {
                                    onClick?.()
                                  } else {
                                    onMenuClick?.(key)
                                  }
                                }}
                              >
                                {icon}
                                <span>{label}</span>
                              </div>
                            )
                          )}
                        </Drawer>
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.middleRow}>
                  <div>
                    <h1>{voucherPrice >= 0 && currencyType + voucherPrice}</h1>
                    <p>{voucherPriceLabel}</p>
                  </div>
                </div>

                <div className={styles.lastRow}>
                  <div className={styles.generalDetails}>
                    <h1>{voucherRelation}</h1>
                    <p>{voucherRelationLabel}</p>
                  </div>
                  <div className={styles.soldDetails}>
                    <h1>
                      {voucherSoldPrice >= 0 &&
                        `${currencyType + voucherSoldPrice}`}
                    </h1>
                    <p>{voucherSoldPriceLabel && voucherSoldPriceLabel}</p>
                    <h1>{voucherNum && `#${voucherNum}`}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flip-card-back" style={{ borderColor }}>
            <div className={styles.dots}>
              <div className="dotsInner">
                <div
                  className="dot1"
                  style={{ ...dotsStyles, borderColor }}
                ></div>
                <div
                  className="dot2"
                  style={{ ...dotsStyles, borderColor }}
                ></div>
              </div>
            </div>
            <div className={styles.backFaceContent}>
              <div className={styles.pRelative}>
                <h1>{t('ui.vouchercard.back.title')}</h1>
                <p>{termsConditions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoucherCard
