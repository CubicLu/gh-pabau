import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { Avatar } from '@pabau/ui'
import styles from './TopBoard.module.less'
import {
  UsergroupDeleteOutlined,
  FolderOutlined,
  FileTextOutlined,
} from '@ant-design/icons'

export const TopBoard: FC = () => {
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
                    <div className={styles.title}>0</div>
                    <div className={styles.subtitle}>Appointments</div>
                    <div className={styles.description}>0% previous day</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Completed</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Not completed</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Canceled</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>No show</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}></Row>
              </Col>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>£0</div>
                    <div className={styles.subtitle}>Sales</div>
                    <div className={styles.description}>0% previous day</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Services</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Products</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Packages</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Gift Vouchers</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}></Row>
              </Col>
              <Col className={styles.table} xs={{ span: 24 }} md={{ span: 8 }}>
                <Row>
                  <div className={styles.topheader}>
                    <div className={styles.title}>0 (0%)</div>
                    <div className={styles.subtitle}>Online appointments</div>
                    <div className={styles.description}>0% previous day</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Completed</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Not completed</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Canceled</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>No show</div>
                    <div className={styles.text}>0 (0%)</div>
                  </div>
                </Row>
                <Row className={styles.record}>
                  <div className={styles.content}>
                    <div className={styles.text}>Deposits</div>
                    <div className={styles.text}>0 (0%)</div>
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
