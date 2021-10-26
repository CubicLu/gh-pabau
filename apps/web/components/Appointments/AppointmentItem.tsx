/**
 * This is a Pabau Appointments
 */

import React, { FC, useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Avatar } from '@pabau/ui'
import { UserOutlined } from '@ant-design/icons'
import { ButtonLabel } from '@pabau/ui'
import styles from './AppointmentItem.module.less'
import { useGetServicesByIdQuery } from '@pabau/graphql'

export interface AppointmentItemP {
  id?: number
  key?: string
  time?: string
  avatar?: string
  clientName?: string
  serviceName?: string
  checkingStatus?: string
  staffMember?: string
  paymentStatus: string
  status?: string
  date?: string | Date
  service_id?: number
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
  service_id,
}) => {
  const [appointementColor, setAppointmentColor] = useState('')

  const { data: serviceData } = useGetServicesByIdQuery({
    variables: {
      service_id: service_id,
    },
  })

  useEffect(() => {
    if (serviceData?.services.length > 0) {
      const color = serviceData.services?.[0]?.color
      setAppointmentColor(color)
    }
  }, [serviceData])

  return (
    <div className={styles.appointmentItem}>
      <Row className={styles.content}>
        <Col lg={1} md={1} xs={1}>
          <div
            style={{ background: appointementColor ? appointementColor : '' }}
            className={styles.divider}
          ></div>
        </Col>
        <Col lg={2} md={2} xs={3}>
          <div className={styles.timeTextStyle}>
            <span>{time}</span>
          </div>
        </Col>
        <Col lg={7} md={7} xs={17}>
          <div className={styles.clientContainer}>
            <Avatar size={52} src={avatar} name={clientName} />
            <div className={styles.clientInfo}>
              <p>{clientName}</p>
              <span>{serviceName}</span>
              <div>{checkingStatus}</div>
            </div>
          </div>
        </Col>
        <Col lg={5} md={5} className={styles.mobileViewHidden}>
          <div className={styles.textAlignment}>
            <UserOutlined className={styles.iconSize} />
            <span>{staffMember}</span>
          </div>
        </Col>
        <Col lg={4} md={4} className={styles.mobileViewHidden}>
          <div className={styles.statusLabel}>
            <ButtonLabel
              type={paymentStatus === 'paid' ? 'success' : 'danger'}
              text={paymentStatus}
            />
          </div>
        </Col>
        <Col lg={4} md={4} xs={2}>
          <div className={styles.counterButtonStyle}>
            <button>0/5</button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AppointmentItem
