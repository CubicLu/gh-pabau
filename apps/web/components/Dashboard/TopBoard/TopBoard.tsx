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
}

export const TopBoard: FC<ITopBoard> = ({
  appointment,
  sales,
  onlineAppointment,
  totalBooking,
  totalOnlineBooking,
  totalSalesCount,
  filterRange,
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
                      {totalBooking.per} {filterRange}
                    </div>
                  </div>
                </Row>
                {appointment?.map((item, index) => (
                  <Row className={styles.record} key={index}>
                    <div className={styles.content}>
                      <div className={`${styles.text} ${styles.label}`}>
                        {item.label}
                      </div>
                      <div className={styles.text}>
                        {item.count} ({item.per})
                      </div>
                    </div>
                  </Row>
                ))}
              </Col>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>{totalSalesCount.count}</div>
                    <div className={styles.subtitle}>Sales</div>
                    <div className={styles.description}>
                      {totalSalesCount.per} {filterRange}
                    </div>
                  </div>
                </Row>
                {sales?.map((item, index) => (
                  <Row className={styles.record} key={index}>
                    <div className={styles.content}>
                      <div className={`${styles.text} ${styles.label}`}>
                        {item.label}
                      </div>
                      <div className={styles.text}>
                        {item.count} ({item.per})
                      </div>
                    </div>
                  </Row>
                ))}
              </Col>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>
                      {totalOnlineBooking.count} ({totalOnlineBooking.per})
                    </div>
                    <div className={styles.subtitle}>Online appointments</div>
                    <div className={styles.description}>
                      {totalOnlineBooking.per} {filterRange}
                    </div>
                  </div>
                </Row>
                {onlineAppointment?.map((item, index) => (
                  <Row className={styles.record} key={index}>
                    <div className={styles.content}>
                      <div className={`${styles.text} ${styles.label}`}>
                        {item.label}
                      </div>
                      <div className={styles.text}>
                        {item.count} ({item.per})
                      </div>
                    </div>
                  </Row>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
