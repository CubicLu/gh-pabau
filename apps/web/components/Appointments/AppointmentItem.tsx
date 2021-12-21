import React, { FC, useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Avatar } from '@pabau/ui'
import { ButtonLabel } from '@pabau/ui'
import { TeamOutlined } from '@ant-design/icons'
import styles from './AppointmentItem.module.less'
import { useCheckPathwayStatusQuery } from '@pabau/graphql'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { ReactComponent as OutlinedClockCircle } from '../../assets/images/icons/outline-clock-circle.svg'
import { ReactComponent as ListCircle } from '../../assets/images/icons/list-circle.svg'
import dayjs from 'dayjs'

export interface JourneyAppointmentItem {
  id?: number
  key?: string
  time?: string
  avatar?: string
  clientName?: string
  serviceName?: string
  serviceColour?: string
  staffMember?: string
  checkedInTime?: string
  paymentStatus: string
  status?: string
  date?: number
  service_id?: number
}

interface JourneyAppointmentItemHandler {
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

export const AppointmentItem: FC<
  JourneyAppointmentItem & JourneyAppointmentItemHandler
> = ({
  id,
  time,
  avatar,
  clientName,
  serviceName,
  serviceColour,
  staffMember,
  paymentStatus,
  status,
  service_id,
  checkedInTime,
  addInProgressAppt,
}) => {
  const [pathwayStep, setPathwayStep] = useState<PathwayStep[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [grow, setGrow] = useState<boolean>(false)
  const { t } = useTranslationI18()

  const { data: pathwayTakenData } = useCheckPathwayStatusQuery({
    pollInterval: 5000,
    variables: {
      bookingId: id,
    },
  })

  useEffect(() => {
    setGrow(false)
  }, [currentStep])

  useEffect(() => {
    if (pathwayStep?.length > 0) {
      const completedSteps = pathwayStep.filter(
        (step) => step.status === 'completed'
      )
      const activeStep =
        completedSteps?.length !== pathwayStep?.length
          ? completedSteps?.length + 1
          : completedSteps?.length
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
            style={{ background: serviceColour ? serviceColour : '' }}
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
              {pathwayStep?.length > 0 && (
                <p>
                  <ListCircle />
                </p>
              )}
              <Avatar size={52} src={avatar} name={clientName} />
            </div>
            <div className={styles.clientInfo}>
              <p className={status === 'no-show' && styles.strikeThrough}>
                <p>{clientName}</p>
              </p>
              <span className={status === 'no-show' && styles.strikeThrough}>
                <span>{serviceName}</span>
              </span>
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
            <TeamOutlined style={{ fontSize: 18 }} />
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
