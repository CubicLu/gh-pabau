import React, { FC, useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Avatar } from '@pabau/ui'
import { UserOutlined } from '@ant-design/icons'
import { ButtonLabel } from '@pabau/ui'
import styles from './AppointmentItem.module.less'
import {
  useGetServicesByIdQuery,
  useCheckPathwayStatusQuery,
} from '@pabau/graphql'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { ReactComponent as OutlinedClockCircle } from '../../assets/images/icons/outline-clock-circle.svg'
import dayjs from 'dayjs'

export interface AppointmentItemP {
  id?: number
  key?: string
  time?: string
  avatar?: string
  clientName?: string
  serviceName?: string
  staffMember?: string
  checkedInTime?: string
  paymentStatus: string
  status?: string
  date?: number
  service_id?: number
}

interface AppointmentItemHandler {
  addInProgressAppt?: (appt: number) => void
}

export enum PaymentStatus {
  paid = 'paid',
  unpaid = 'unpaid',
}
interface PathwayStep {
  id: number
  step: string
  stepName: string
  status: string
  order: number
}

export const AppointmentItem: FC<AppointmentItemP & AppointmentItemHandler> = ({
  id,
  time,
  avatar,
  clientName,
  serviceName,
  staffMember,
  paymentStatus,
  status,
  service_id,
  checkedInTime,
  addInProgressAppt,
}) => {
  const [appointementColor, setAppointmentColor] = useState('')
  const [pathwayStep, setPathwayStep] = useState<PathwayStep[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [grow, setGrow] = useState<boolean>(false)
  const { t } = useTranslationI18()
  const { data: serviceData } = useGetServicesByIdQuery({
    variables: {
      service_id: service_id,
    },
  })

  const { data: pathwayTakenData } = useCheckPathwayStatusQuery({
    variables: {
      bookingId: id,
    },
  })

  useEffect(() => {
    setGrow(false)
  }, [currentStep])

  useEffect(() => {
    if (pathwayStep?.length > 0) {
      const activeStep =
        pathwayStep.filter((step) => step.status === 'completed')?.length + 1
      currentStep > 0 && setGrow(true)
      setTimeout(() => {
        setCurrentStep(activeStep)
      }, 400)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathwayStep])

  useEffect(() => {
    if (pathwayTakenData?.PathwayTaken?.length > 0) {
      const { PathwayTaken } = pathwayTakenData
      const activePathway = PathwayTaken.find(
        (pathway) => pathway.status === 'ACTIVE'
      )?.Pathway
      const pathwaySteps = [...activePathway?.PathwayStep]
        .sort((a, b) => a.order - b.order)
        ?.map((step) => {
          return {
            id: step.id,
            stepName: step?.name,
            step: step?.step,
            status: step.PathwayStepsTaken?.[0]?.status || '',
            order: step.order,
          }
        })
      setPathwayStep(pathwaySteps)
      addInProgressAppt(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathwayTakenData])

  useEffect(() => {
    if (serviceData?.services.length > 0) {
      const color = serviceData.services?.[0]?.color
      setAppointmentColor(color)
    }
  }, [serviceData])

  const getCurrentCheckedInTime = () => {
    const currentTime = dayjs().format()
    const hours = dayjs(currentTime).diff(checkedInTime, 'hours')
    const minutes = dayjs(currentTime).diff(checkedInTime, 'minute')
    return `${hours}:${minutes}`
  }

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
            <div className={styles.avatarContainer}>
              {pathwayStep?.length > 0 && <p>{currentStep}</p>}
              <Avatar size={52} src={avatar} name={clientName} />
            </div>
            <div className={styles.clientInfo}>
              <p
                style={{ color: status === 'no-show' ? '#ff5b64' : '#3d3d46' }}
              >
                {clientName}
              </p>
              <span>{serviceName}</span>
              <div
                className={styles.appointementStatus}
                style={{
                  color: status === 'checked-in' ? '#FF5B64' : '#54B2D3',
                }}
              >
                {status}
                {status === 'checked-in' && (
                  <div>
                    <OutlinedClockCircle />{' '}
                    <span>{getCurrentCheckedInTime()}</span>
                  </div>
                )}
              </div>
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
              text={t(
                `journey.modal.appointments.item.payment.status.${paymentStatus}`
              )}
            />
          </div>
        </Col>
        <Col lg={4} md={4} xs={2}>
          {pathwayStep?.length > 0 && (
            <div className={styles.counterButtonStyle}>
              <button
                style={{ transform: grow ? 'scale(1.5)' : 'none' }}
              >{`${currentStep}/${pathwayStep?.length}`}</button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default AppointmentItem
