import React, { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import styles from './CarePathwaySelectionModal.module.less'
import { ReactComponent as EditIcon } from '../../assets/images/door.svg'
import { Button, Skeleton } from 'antd'
import { Avatar, FullScreenReportModal } from '@pabau/ui'
import {
  ClockCircleOutlined,
  DashOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import {
  CheckPathwayStatusDocument,
  GetCarePathwaysDocument,
  useCheckinPathwayClientMutation,
  useCheckPathwayStatusQuery,
  useGetBookingByIdQuery,
} from '@pabau/graphql'
import { useQuery } from '@apollo/client'
import { cdnURL } from '../../baseUrl'
import { PreLoader } from './PreLoader/PreLoader'
import { useRouter } from 'next/router'
import { useTranslationI18 } from '../../../web/hooks/useTranslationI18'

interface P {
  appointmentId: number
  onClose?: () => void
  visible?: boolean
}

interface PathwayStep {
  id: number
  step: string
  stepName: string
  status: string
  order: number
}

export const CarePathwaySelectionModal: FC<P> = ({
  appointmentId,
  onClose,
  visible,
}) => {
  const [clientName, setClientName] = useState('')
  const [roomName, setRoomName] = useState(0)
  const [image, setImage] = useState('')
  const [appointmentWith, setAppointmentWith] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [isManyPathway, setIsManyPathway] = useState(false)
  const [btnClick, setBtnClick] = useState(false)
  const [pathwayStep, setPathwayStep] = useState<PathwayStep[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const { t } = useTranslationI18()
  const router = useRouter()

  const { data: bookingById, loading } = useGetBookingByIdQuery({
    variables: {
      id: appointmentId,
    },
  })
  const [checkinPathwayClient] = useCheckinPathwayClientMutation()

  const { data: pathwayTakenData } = useCheckPathwayStatusQuery({
    variables: {
      bookingId: appointmentId,
    },
  })

  const { data: carePathwaysData } = useQuery(GetCarePathwaysDocument)

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathwayTakenData])

  useEffect(() => {
    if (pathwayStep?.length > 0) {
      const activeStep = pathwayStep.filter(
        (step) => step.status === 'completed' || step.status === 'skipped'
      )?.length

      setCurrentStep(activeStep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathwayStep])

  useEffect(() => {
    if (carePathwaysData?.findManyPathway?.length > 2) {
      setIsManyPathway(true)
    } else {
      setIsManyPathway(false)
    }
    if (bookingById?.findManyBooking[0]?.Contact?.Avatar !== '') {
      setImage(cdnURL + bookingById?.findManyBooking[0]?.Contact?.Avatar)
    } else {
      setImage(undefined)
    }

    setAppointmentTime(
      dayjs(Number(bookingById?.findManyBooking[0]?.start_date)).format(
        'HH:mm a'
      )
    )

    setClientName(
      String(
        bookingById?.findManyBooking[0]?.Contact?.Fname +
          ' ' +
          bookingById?.findManyBooking[0]?.Contact?.Lname
      )
    )
    setAppointmentWith(
      String(
        bookingById?.findManyBooking[0]?.CmStaffGeneral?.Fname +
          ' ' +
          bookingById?.findManyBooking[0]?.CmStaffGeneral?.Lname
      )
    )
    setRoomName(bookingById?.findManyBooking[0]?.room_id)
  }, [bookingById?.findManyBooking, carePathwaysData?.findManyPathway?.length])
  const RenderSkeletonInput = () => (
    <Skeleton.Input style={{ width: '50px', height: '30px' }} active />
  )
  const RenderSkeletonBodyInput = () => (
    <Skeleton.Input
      style={{
        width: 200,
      }}
      active
    />
  )

  const CarePathwayHeader = () => {
    return (
      <div>
        {loading ? (
          <div className={styles.pathwayHeader}>
            <div className={styles.avatar}>
              <Skeleton.Avatar active />
            </div>
            <div>
              <h5>
                <RenderSkeletonInput />
              </h5>
              <div className={styles.svgIcons}>
                <div className={styles.spanItems}>
                  <RenderSkeletonInput />
                </div>
                <div className={styles.spanItems}>
                  <RenderSkeletonInput />
                </div>
                <div className={styles.spanItems}>
                  <RenderSkeletonInput />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.pathwayHeader}>
            <div className={styles.avatar}>
              <Avatar
                size="large"
                isLoading={loading}
                name={clientName}
                src={image}
                isTooltip={false}
              />
            </div>
            <div>
              <h5>{clientName}</h5>
              <div className={styles.svgIcons}>
                <div className={styles.spanItems}>
                  <ClockCircleOutlined />
                  <span>{appointmentTime}</span>
                </div>
                <div className={styles.spanItems}>
                  <EditIcon />
                  <span>{roomName}</span>
                </div>
                <div className={styles.spanItems}>
                  <UserOutlined />
                  <span>{appointmentWith}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {btnClick && pathwayTakenData?.PathwayTaken[0]?.id ? (
        <div className={styles.preLoader}>
          <PreLoader
            display={true}
            avatar={image}
            name={clientName}
            pathwayTakenId={pathwayTakenData?.PathwayTaken[0]?.id}
          />
        </div>
      ) : (
        <div>
          <div>
            <div>
              <FullScreenReportModal
                operations={[]}
                title={<CarePathwayHeader />}
                visible={visible}
                enableCreateBtn={true}
                onBackClick={() => {
                  onClose()
                }}
                footer={false}
              >
                <div className={styles.pathwayModal}>
                  {(loading
                    ? [...Array.from({ length: 6 })]
                    : carePathwaysData?.findManyPathway
                  )?.map((item, i) => (
                    <div
                      className={item?.is_active ? styles.pathwayWrapper : ''}
                      key={i}
                    >
                      {loading ? (
                        <div>
                          <div>
                            <div className={styles.pathwayTile}>
                              <Skeleton.Avatar
                                active
                                style={{
                                  width: 40,
                                  marginBottom: '10px',
                                }}
                              />
                              {isManyPathway ? (
                                <div>
                                  <div className={styles.pathwayData}>
                                    <h2>
                                      <RenderSkeletonBodyInput />
                                    </h2>
                                  </div>
                                  <p>
                                    <RenderSkeletonBodyInput />
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <h2>
                                    <RenderSkeletonBodyInput />
                                  </h2>
                                  <p>
                                    <RenderSkeletonBodyInput />
                                  </p>
                                </div>
                              )}
                              <Skeleton.Button active style={{ width: 200 }} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {item?.is_active && (
                            <div key={i}>
                              <div className={styles.pathwayTile}>
                                <CheckCircleOutlined />
                                {isManyPathway ? (
                                  <div>
                                    <div className={styles.pathwayData}>
                                      <h2>{item?.pathway_name}</h2>
                                      <span className={styles.pathwaySpan}>
                                        {item?.Steps.length}
                                      </span>
                                    </div>

                                    <p>{item?.description}</p>
                                  </div>
                                ) : (
                                  <div>
                                    <h2>{item?.pathway_name}</h2>
                                    <p>{item?.description}</p>
                                    {item?.Steps?.map((i, index) => (
                                      <div key={i.key}>
                                        <div
                                          key={i.key}
                                          className={styles.pathwaySteps}
                                        >
                                          <span
                                            className={
                                              styles.pathwayTileContent
                                            }
                                          >
                                            {index + 1}
                                          </span>

                                          {i.name}
                                        </div>
                                        {index + 1 < item?.Steps?.length && (
                                          <div
                                            key={i.key}
                                            className={styles.pathwayDashed}
                                          >
                                            <DashOutlined
                                              rotate={90}
                                              style={{ color: '#54B2D3' }}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div>
                                  <div>
                                    {pathwayTakenData?.PathwayTaken[0]?.Pathway
                                      ?.id === item.id &&
                                      pathwayStep?.length > 0 &&
                                      pathwayStep?.length === currentStep && (
                                        <div>
                                          <div
                                            onClick={() => {
                                              router.push(
                                                `/journey/${pathwayTakenData?.PathwayTaken[0]?.id}`
                                              )
                                            }}
                                          >
                                            <Button>
                                              {t(
                                                'care.pathway.modal.button.completed'
                                              )}
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                  {pathwayTakenData?.PathwayTaken[0]?.Pathway
                                    ?.id === item.id &&
                                    pathwayStep?.length > 0 &&
                                    pathwayStep?.length !== currentStep && (
                                      <div>
                                        <div
                                          onClick={() => {
                                            router.push(
                                              `/journey/${pathwayTakenData?.PathwayTaken[0]?.id}`
                                            )
                                          }}
                                        >
                                          <Button>
                                            {t(
                                              'care.pathway.modal.button.resume'
                                            )}
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  {pathwayTakenData?.PathwayTaken[0]?.Pathway
                                    ?.id !== item.id && (
                                    <div
                                      onClick={async () => {
                                        await checkinPathwayClient({
                                          variables: {
                                            bookingId: appointmentId,
                                            pathwayTemplateId: item.id,
                                            contactId:
                                              bookingById?.findManyBooking[0]
                                                ?.contact_id,
                                            comment: '',
                                          },

                                          refetchQueries: [
                                            {
                                              query: CheckPathwayStatusDocument,
                                              variables: {
                                                bookingId: appointmentId,
                                              },
                                            },
                                          ],
                                          fetchPolicy: 'network-only',
                                        })
                                        setBtnClick(true)
                                      }}
                                    >
                                      <Button>
                                        {t('care.pathway.modal.button.start')}
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </FullScreenReportModal>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarePathwaySelectionModal
