/**
 * This is a Pabau Appointments
 */

import React, { FC } from 'react'
import { Row, Col } from 'antd'
import { Avatar } from '@pabau/ui'
import { UserOutlined } from '@ant-design/icons'
import { ButtonLabel } from '@pabau/ui'
import styles from './AppointmentItem.module.less'

export interface AppointmentItemP {
  time?: string
  avatar?: string
  clientName?: string
  serviceName?: string
  checkingStatus?: string
  staffMember?: string
  paymentStatus: string
  status?: string
  date?: string | Date
  serviceColor?: string
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
  serviceColor,
}) => {
  return (
    <div className={styles.appointmentItem}>
      <Row className={styles.content}>
        <Col lg={1} md={1}>
          <div
            style={{ background: serviceColor ? serviceColor : '' }}
            className={styles.divider}
          ></div>
        </Col>
        <Col lg={2} md={2}>
          <div className={styles.timeTextStyle}>
            <span>{time}</span>
          </div>
        </Col>
        <Col lg={7} md={7}>
          <div className={styles.clientContainer}>
            <Avatar size={52} src={avatar} />
            <div className={styles.clientInfo}>
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
            <ButtonLabel
              type={paymentStatus === 'paid' ? 'success' : 'danger'}
              text={paymentStatus}
            />
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
