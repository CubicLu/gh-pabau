/**
 * This is a Pabau Appointments
 */

import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { Avatar } from '@pabau/ui'
import { UserOutlined } from '@ant-design/icons'
import { ButtonLabel } from '@pabau/ui'
import styles from './AppointmentItem.module.less'
import classNames from 'classnames'

export interface AppointmentItemP {
  time?: string
  avatar?: string
  clientName?: string
  serviceName?: string
  checkingStatus?: string
  staffMember?: string
  paymentStatus: string
  status?: string
}

export const AppointmentItem: FC<AppointmentItemP> = ({
  time,
  avatar,
  clientName,
  serviceName,
  checkingStatus,
  staffMember,
  paymentStatus,
  status,
}) => {
  const getDividerColor = () => {
    if (status === 'waiting') {
      return classNames(styles.divider, styles.waiting)
    } else if (status === 'In Progress') {
      return classNames(styles.divider, styles.inProgress)
    } else if (status === 'Arrived') {
      return classNames(styles.divider, styles.arrived)
    } else if (status === 'Completed') {
      return classNames(styles.divider, styles.completed)
    } else {
      return classNames(styles.divider)
    }
  }

  return (
    <div className={styles.appointmentItem}>
      <Row className={styles.content}>
        <Col lg={1} md={1}>
          <div className={getDividerColor()}></div>
        </Col>
        <Col lg={2} md={2}>
          <div className={styles.timeTextStyle}>
            <span>{time}</span>
          </div>
        </Col>
        <Col lg={7} md={7}>
          <div className={styles.profileGrid}>
            <div className={styles.profileGridItems}>
              <Avatar size={52} src={avatar} />
            </div>
            <div className={styles.profileGridItems}>
              <p>{clientName}</p>
              <span>{serviceName}</span>
              <div>{checkingStatus}</div>
            </div>
          </div>
        </Col>
        <Col lg={5} md={5}>
          <div className={styles.textAlignment}>
            <UserOutlined className={styles.iconSize} />
            <span>{staffMember}</span>
          </div>
        </Col>
        <Col lg={4} md={4}>
          <div className={styles.statusLabel}>
            <ButtonLabel type={'success'} text={paymentStatus} />
          </div>
        </Col>
        <Col lg={4} md={4}>
          <div className={styles.counterButtonStyle}>
            <button>0/5</button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AppointmentItem
