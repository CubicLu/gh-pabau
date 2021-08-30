import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { Avatar } from '@pabau/ui'
import styles from './TopBoard.module.less'
import {
  UsergroupDeleteOutlined,
  FolderOutlined,
  FileTextOutlined,
} from '@ant-design/icons'

interface ICount {
  count: number
  per: string
}

interface IAppointment {
  completed: ICount
  notCompleted: ICount
  canceled: ICount
  noShow: ICount
}

interface IOnlineAppointment {
  completed: ICount
  notCompleted: ICount
  canceled: ICount
  noShow: ICount
  deposits: ICount
}

interface ISales {
  services: ICount
  products: ICount
  packages: ICount
  giftVouchers: ICount
}

interface ITopBoard {
  appointment: IAppointment
  onlineAppointment: IOnlineAppointment
  sales: ISales
  totalBooking: ICount
  totalOnlineBooking: ICount
  totalSalesCount: ICount
}

export const TopBoard: FC<ITopBoard> = ({
  appointment,
  sales,
  onlineAppointment,
  totalBooking,
  totalOnlineBooking,
  totalSalesCount,
}) => {
  return (
    <div>
      <div className={styles.mainCard}>
        <Row gutter={16}>
          <Col xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.avatarIcon}>
                  <Avatar
                    size="large"
                    icon={<UsergroupDeleteOutlined className={styles.user} />}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.title}>42</div>
                  <div className={styles.description}>New clients</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.docsIcon}>
                  <Avatar
                    size="large"
                    icon={<FileTextOutlined className={styles.file} />}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.title}>£82.50</div>
                  <div className={styles.description}>Average bill</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.userIcon}>
                  <Avatar
                    size="large"
                    icon={<UsergroupDeleteOutlined className={styles.users} />}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.title}>£82.50</div>
                  <div className={styles.description}>Rev. per hour</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={styles.card}>
              <div className={styles.cardWrapper}>
                <div className={styles.folderIcon}>
                  <Avatar
                    size="large"
                    icon={<FolderOutlined className={styles.folder} />}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.title}>42%</div>
                  <div className={styles.description}>Utilization</div>
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
                    <div className={styles.title}>{totalBooking.count}</div>
                    <div className={styles.subtitle}>Appointments</div>
                    <div className={styles.description}>
                      {totalBooking.per} previous day
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Completed</div>
                    <div className={styles.text}>
                      {appointment.completed.count} ({appointment.completed.per}
                      )
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Waiting</div>
                    <div className={styles.text}>
                      {appointment.notCompleted.count} (
                      {appointment.notCompleted.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Canceled</div>
                    <div className={styles.text}>
                      {appointment.canceled.count} ({appointment.canceled.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>No show</div>
                    <div className={styles.text}>
                      {appointment.noShow.count} ({appointment.noShow.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}></Row>
              </Col>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>{totalSalesCount.count}</div>
                    <div className={styles.subtitle}>Sales</div>
                    <div className={styles.description}>
                      {totalSalesCount.per} previous day
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Services</div>
                    <div className={styles.text}>
                      {sales.services.count} ({sales.services.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Products</div>
                    <div className={styles.text}>
                      {sales.products.count} ({sales.products.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Packages</div>
                    <div className={styles.text}>
                      {sales.packages.count} ({sales.packages.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Gift Vouchers</div>
                    <div className={styles.text}>
                      {sales.giftVouchers.count} ({sales.giftVouchers.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}></Row>
              </Col>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>
                      {totalOnlineBooking.count} ({totalOnlineBooking.per})
                    </div>
                    <div className={styles.subtitle}>Online appointments</div>
                    <div className={styles.description}>
                      {totalOnlineBooking.per} previous day
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Completed</div>
                    <div className={styles.text}>
                      {onlineAppointment.completed.count} (
                      {onlineAppointment.completed.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Waiting</div>
                    <div className={styles.text}>
                      {onlineAppointment.notCompleted.count} (
                      {onlineAppointment.notCompleted.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Canceled</div>
                    <div className={styles.text}>
                      {onlineAppointment.canceled.count} (
                      {onlineAppointment.canceled.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>No show</div>
                    <div className={styles.text}>
                      {onlineAppointment.noShow.count} (
                      {onlineAppointment.noShow.per})
                    </div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Deposits</div>
                    <div className={styles.text}>
                      {onlineAppointment.deposits.count} (
                      {onlineAppointment.deposits.per})
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
