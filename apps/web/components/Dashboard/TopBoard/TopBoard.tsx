import React, { FC } from 'react'
import { Row, Col, Skeleton } from 'antd'
import { Avatar } from '@pabau/ui'
import styles from './TopBoard.module.less'
import { useUser } from '../../../context/UserContext'
import {
  UsergroupDeleteOutlined,
  FolderOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import stringToCurrencySignConverter from '../../../helper/stringToCurrencySignConverter'

export interface ICount {
  label?: string
  count: number
  per: string
}

interface ITopBoard {
  appointment: ICount[]
  onlineAppointment: ICount[]
  sales: ICount[]
  totalBooking: ICount
  totalOnlineBooking: ICount
  totalSalesCount: ICount
  filterRange: string
  newClientCount: number
  avgBill: string
  revPerHour: string
  loading: boolean
}

export const TopBoard: FC<ITopBoard> = ({
  appointment,
  sales,
  onlineAppointment,
  totalBooking,
  totalOnlineBooking,
  totalSalesCount,
  filterRange,
  newClientCount,
  avgBill,
  revPerHour,
  loading,
}) => {
  const { t } = useTranslationI18()
  const user = useUser()
  return (
    <div>
      <div className={styles.mainCard}>
        <Row gutter={16}>
          <Col xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.avatarIcon}>
                  {!loading ? (
                    <Avatar
                      size="large"
                      icon={<UsergroupDeleteOutlined className={styles.user} />}
                    />
                  ) : (
                    <Skeleton.Avatar size={'large'} shape={'circle'} />
                  )}
                </div>
                <div className={styles.cardContent}>
                  {!loading ? (
                    <div className={styles.title}>{newClientCount ?? 0}</div>
                  ) : (
                    <Skeleton.Input active className={styles.titleSkeleton} />
                  )}
                  {!loading ? (
                    <div className={styles.description}>
                      {t('dashboard.new.client', {
                        fallbackLng: 'en',
                      })}
                    </div>
                  ) : (
                    <Skeleton.Input active className={styles.descSkeleton} />
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.docsIcon}>
                  {!loading ? (
                    <Avatar
                      size="large"
                      icon={<FileTextOutlined className={styles.file} />}
                    />
                  ) : (
                    <Skeleton.Avatar size={'large'} shape={'circle'} />
                  )}
                </div>
                <div className={styles.cardContent}>
                  {!loading ? (
                    <div className={styles.title}>
                      {stringToCurrencySignConverter(user.me?.currency)}
                      {Number.parseInt(avgBill ?? '0').toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                    </div>
                  ) : (
                    <Skeleton.Input active className={styles.titleSkeleton} />
                  )}
                  {!loading ? (
                    <div className={styles.description}>
                      {t('dashboard.average.bill', {
                        fallbackLng: 'en',
                      })}
                    </div>
                  ) : (
                    <Skeleton.Input active className={styles.descSkeleton} />
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.userIcon}>
                  {!loading ? (
                    <Avatar
                      size="large"
                      icon={
                        <UsergroupDeleteOutlined className={styles.users} />
                      }
                    />
                  ) : (
                    <Skeleton.Avatar size={'large'} shape={'circle'} />
                  )}
                </div>
                <div className={styles.cardContent}>
                  {!loading ? (
                    <div className={styles.title}>
                      {stringToCurrencySignConverter(user.me?.currency)}
                      {Number.parseFloat(revPerHour).toLocaleString()}
                    </div>
                  ) : (
                    <Skeleton.Input active className={styles.titleSkeleton} />
                  )}
                  {!loading ? (
                    <div className={styles.description}>
                      {t('dashboard.rev.per.hour', {
                        fallbackLng: 'en',
                      })}
                    </div>
                  ) : (
                    <Skeleton.Input active className={styles.descSkeleton} />
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.folderIcon}>
                  {!loading ? (
                    <Avatar
                      size="large"
                      icon={<FolderOutlined className={styles.folder} />}
                    />
                  ) : (
                    <Skeleton.Avatar size={'large'} shape={'circle'} />
                  )}
                </div>
                <div className={styles.cardContent}>
                  {!loading ? (
                    <div className={styles.title}>42%</div>
                  ) : (
                    <Skeleton.Input active className={styles.titleSkeleton} />
                  )}
                  {!loading ? (
                    <div className={styles.description}>
                      {t('dashboard.utilization', {
                        fallbackLng: 'en',
                      })}{' '}
                      (Coming soon)
                    </div>
                  ) : (
                    <Skeleton.Input active className={styles.descSkeleton} />
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.mainCard}>
        <Row>
          <Col className={styles.tablebox} span={24}>
            <Row>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>
                      {!loading ? (
                        totalBooking.count ?? 0
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.titleSkeleton}
                        />
                      )}
                    </div>

                    <div className={styles.subtitle}>
                      {!loading ? (
                        t('dashboard.appoinments', {
                          fallbackLng: 'en',
                        })
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.countSkeleton}
                        />
                      )}
                    </div>

                    <div className={styles.description}>
                      {!loading ? (
                        (totalBooking.per ?? '0%') + ' ' + filterRange
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.countSkeleton}
                        />
                      )}
                    </div>
                  </div>
                </Row>
                <div className={styles.apptContant}>
                  {appointment?.map((item, index) => (
                    <Row className={styles.record} key={index}>
                      <div className={styles.content}>
                        <div className={`${styles.text} ${styles.label}`}>
                          {!loading ? (
                            item.label
                          ) : (
                            <Skeleton.Input
                              active
                              className={styles.countSkeleton}
                            />
                          )}
                        </div>
                        <div className={styles.text}>
                          {!loading ? (
                            item.count + ` (${item.per})`
                          ) : (
                            <Skeleton.Input
                              active
                              className={styles.countSkeleton}
                            />
                          )}
                        </div>
                      </div>
                    </Row>
                  ))}
                </div>
              </Col>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>
                      {!loading ? (
                        stringToCurrencySignConverter(user.me?.currency) +
                        (totalSalesCount.count ?? 0).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.titleSkeleton}
                        />
                      )}
                    </div>
                    <div className={styles.subtitle}>
                      {!loading ? (
                        t('dashboard.sales', {
                          fallbackLng: 'en',
                        })
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.countSkeleton}
                        />
                      )}
                    </div>
                    <div className={styles.description}>
                      {!loading ? (
                        (totalSalesCount.per ?? '0%') + ' ' + filterRange
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.countSkeleton}
                        />
                      )}
                    </div>
                  </div>
                </Row>
                <div className={styles.apptContant}>
                  {sales?.map((item, index) => (
                    <Row className={styles.record} key={index}>
                      <div className={styles.content}>
                        <div className={`${styles.text} ${styles.label}`}>
                          {!loading ? (
                            item.label
                          ) : (
                            <Skeleton.Input
                              active
                              className={styles.countSkeleton}
                            />
                          )}
                        </div>
                        <div className={styles.text}>
                          {!loading ? (
                            item.count + ` (${item.per})`
                          ) : (
                            <Skeleton.Input
                              active
                              className={styles.countSkeleton}
                            />
                          )}
                        </div>
                      </div>
                    </Row>
                  ))}
                </div>
              </Col>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>
                      {!loading ? (
                        (totalOnlineBooking.count ?? 0) +
                        ` (${totalOnlineBooking.per ?? '0%'})`
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.titleSkeleton}
                        />
                      )}
                    </div>
                    <div className={styles.subtitle}>
                      {!loading ? (
                        t('dashboard.online.appointment', {
                          fallbackLng: 'en',
                        })
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.countSkeleton}
                        />
                      )}
                    </div>
                    <div className={styles.description}>
                      {!loading ? (
                        (totalOnlineBooking.per ?? '0%') + ' ' + filterRange
                      ) : (
                        <Skeleton.Input
                          active
                          className={styles.countSkeleton}
                        />
                      )}
                    </div>
                  </div>
                </Row>
                <div className={styles.apptContant}>
                  {onlineAppointment?.map((item, index) => (
                    <Row className={styles.record} key={index}>
                      <div className={styles.content}>
                        <div className={`${styles.text} ${styles.label}`}>
                          {!loading ? (
                            item.label
                          ) : (
                            <Skeleton.Input
                              active
                              className={styles.countSkeleton}
                            />
                          )}
                        </div>
                        <div className={styles.text}>
                          {!loading ? (
                            item.count + ` (${item.per})`
                          ) : (
                            <Skeleton.Input
                              active
                              className={styles.countSkeleton}
                            />
                          )}
                        </div>
                      </div>
                    </Row>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
