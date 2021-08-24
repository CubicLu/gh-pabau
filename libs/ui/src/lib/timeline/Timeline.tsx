import React, { FC, useEffect, useState } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import confetti from 'canvas-confetti'
import {
  PrinterOutlined,
  MailOutlined,
  SearchOutlined,
  FilterOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  UserAddOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CalendarOutlined,
  CopyOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
  PushpinOutlined,
  FolderViewOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Popover, Input, Tooltip } from 'antd'
import styles from './Timeline.module.less'
import { groupByDay } from './utils'
import dayjs, { Dayjs } from 'dayjs'
import { Button, Avatar } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import { ReactComponent as PaymentIcon } from '../../assets/images/timeline/payment-icon.svg'
import { ReactComponent as AppointmentIcon } from '../../assets/images/timeline/appointment.svg'
import { ReactComponent as ClientNoteIcon } from '../../assets/images/timeline/client-note-icon.svg'
import { ReactComponent as StaffAlertIcon } from '../../assets/images/timeline/staff-alert-icon.svg'
import { ReactComponent as PhotosIcon } from '../../assets/images/timeline/photos-img.svg'
import { ReactComponent as DocumentIcon } from '../../assets/images/timeline/documnet-icon.svg'
import { ReactComponent as LetterIcon } from '../../assets/images/timeline/letter-icon.svg'
import { ReactComponent as MailIcon } from '../../assets/images/timeline/mail-icon.svg'
import { ReactComponent as SmsIcon } from '../../assets/images/timeline/sms-icon.svg'
import { ReactComponent as CallIcon } from '../../assets/images/timeline/call-icon.svg'
import { ReactComponent as PabauLogo } from '../../assets/images/logo.svg'
import { ReactComponent as ArrivedIcon } from '../../assets/images/timeline/arrived-icon.svg'
import { ReactComponent as TimelineFooterIcon } from '../../assets/images/timeline/timeline-footer-icon.svg'
import { ReactComponent as RecallIcon } from '../../assets/images/timeline/recall-icon.svg'
import { ReactComponent as LabOrderIcon } from '../../assets/images/timeline/lab-order-icon.svg'
import { ReactComponent as MedicalFormIcon } from '../../assets/images/timeline/medical-form-icon.svg'
import { ReactComponent as MedicalConditionIcon } from '../../assets/images/timeline/medical-condition-icon.svg'
import { ReactComponent as CollapseIcon } from '../../assets/images/timeline/collpase-icon.svg'
import { ReactComponent as LostMailIcon } from '../../assets/images/timeline/lost-mail-icon.svg'
import { ReactComponent as RadioUnchecked } from '../../assets/images/timeline/radio-button-unchecked.svg'
import { ReactComponent as RadioChecked } from '../../assets/images/circle-check.svg'
import { ReactComponent as UserIcon } from '../../assets/images/timeline/filled-user.svg'

import TimeLineFilterPopover from './TimeLineFilterPopover'
import { DotButton } from '@pabau/ui'
import TimelineSkeleton from './TimelineSkeleton'
import classNames from 'classnames'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

export interface TimelineProps {
  eventsData: EventsProps[]
  eventDateFormat: string
  clientDetail?: ClientDetailProps
  isLoading?: boolean
}

interface ClientDetailProps {
  name?: string
  createdAt?: string
}

interface OpenByProps {
  firstName?: string
  lastName?: string
}

interface MovedProps {
  from?: ClientDetailProps
  to?: ClientDetailProps
}

export interface EventsProps {
  id: number
  type: string
  eventName?: string
  clientName?: string
  description?: string
  dateTime: string
  paymentMethod?: string
  status?: string
  payment?: string
  appointmentWith?: string
  photos?: string[]
  documentFile?: string
  openedBy?: OpenByProps[]
  sharedWith?: OpenByProps[]
  moved?: MovedProps
  displayCollapse?: boolean
  taskChecked?: boolean
  taskUserName?: string
}

export const statuses = {
  arrived: 'Arrived',
  cancelled: 'Cancelled',
  confirmed: 'Confirmed',
  rescheduled: 'Rescheduled',
  noShow: 'No Show',
  created: 'Created',
  sent: 'Sent',
  requested: 'Requested',
  received: 'Received',
  scheduled: 'Scheduled',
  upcoming: 'Upcoming',
}

export const types = {
  appointment: 'appointment',
  payment: 'payment',
  refund: 'refund',
  invoice: 'invoice',
  credit: 'credit',
  clientNote: 'clientNote',
  staffAlert: 'staffAlert',
  photos: 'photos',
  document: 'document',
  mail: 'mail',
  sms: 'sms',
  letter: 'letter',
  call: 'call',
  taskEmail: 'taskEmail',
  taskSms: 'taskSMS',
  taskCall: 'taskCall',
  taskLetter: 'taskLetter',
  taskLostEmail: 'taskLostEmail',
  medicalHistory: 'medicalHistory',
  lab: 'lab',
  medicalForm: 'medicalForm',
  recall: 'recall',
  medicalCondition: 'medicalCondition',
  pabauConnect: 'pabauConnect',
  task: 'task',
}

const DocumentPdf = dynamic(() => import('./DocumentPdf'), {
  ssr: false,
})

export const Timeline: FC<TimelineProps> = ({
  eventsData = [],
  eventDateFormat,
  clientDetail,
  isLoading,
}) => {
  const { t } = useTranslation('common')
  const [events, setEvents] = useState<EventsProps[]>([])
  const [filteredEvents, setFilteredEvents] = useState<EventsProps[]>([])
  const [displaySearch, setDisplaySearch] = useState(false)
  const [collapseEvent, setCollapseEvent] = useState({})
  const [visibleFilterPopUp, setVisibleFilterPopUp] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedFilterKey, setSelectedFilterKey] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<Dayjs[]>([])

  const { days = [], eventsByDay } = groupByDay(
    filteredEvents,
    eventDateFormat,
    t
  )

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData)
    }
  }, [eventsData])

  useEffect(() => {
    setFilteredEvents(events)
  }, [events])

  useEffect(() => {
    let filteredData = [...events]
    if (selectedFilterKey.length > 0) {
      const filterData: EventsProps[] = []
      for (const data of events) {
        if (
          selectedFilterKey.includes(data.type) ||
          (data.type === types.appointment &&
            selectedFilterKey.includes(data.status || '')) ||
          (data.type.includes('task') && selectedFilterKey.includes('task'))
        ) {
          filterData.push(data)
        }
      }
      filteredData = filterData
    }
    if (dateRange.length > 0) {
      const startDate = dayjs(dateRange[0], eventDateFormat)
      const endDate = dayjs(dateRange[1], eventDateFormat)
      filteredData = filteredData.filter((data) => {
        const eventDateTime = dayjs(data.dateTime, eventDateFormat)
        return eventDateTime >= startDate && eventDateTime <= endDate
      })
    }
    if (searchText) {
      const filterObject: EventsProps[] = []
      for (const data of filteredData) {
        for (const key of Object.keys(data)) {
          if (`${data[key]}`.toLowerCase().includes(searchText.toLowerCase())) {
            filterObject.push(data)
            break
          }
        }
      }
      filteredData = filterObject
    }
    setFilteredEvents(filteredData)
  }, [searchText, selectedFilterKey, dateRange, events, eventDateFormat])

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }

  const displayConfetti = (day) => {
    if (day === t('timeline.status.done')) {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      })
    }
  }
  const handleTaskChecked = (event) => {
    const newEvents = events?.map((data) => {
      const temp = { ...data }
      if (data.id === event.id) {
        temp.taskChecked = !temp.taskChecked
      }
      return temp
    })
    setEvents(newEvents)
  }

  const handleCollapse = (event) => {
    setCollapseEvent((e) => ({
      ...e,
      [`event_${event.id}`]: collapseEvent?.[`event_${event.id}`]
        ? !collapseEvent?.[`event_${event.id}`]
        : true,
    }))
  }

  const timeFormat = (date) => {
    const standardDateFormat = dayjs(date, eventDateFormat)
    if (
      dayjs(standardDateFormat) < dayjs().subtract(6, 'days') ||
      dayjs(standardDateFormat) > dayjs().add(6, 'days')
    ) {
      return dayjs(date, eventDateFormat).format('DD MMM [at] h:mm a')
    }
    return dayjs(date, eventDateFormat).calendar()
  }

  const renderStatus = (status) => {
    switch (status) {
      case statuses.arrived:
        return (
          <div className={styles.arrivedStatus}>
            <div style={{ color: '#54B2D3' }} className={styles.statusClass}>
              <ClockCircleOutlined />
              {status}
            </div>
            <div className={styles.iconArrived}>
              <ArrivedIcon />
            </div>
          </div>
        )
      case statuses.cancelled:
        return (
          <div style={{ color: '#FF5B64' }} className={styles.statusClass}>
            <CloseCircleOutlined />
            {status}
          </div>
        )
      case statuses.confirmed:
        return (
          <div style={{ color: '#65CD98' }} className={styles.statusClass}>
            <CheckCircleOutlined />
            {status}
          </div>
        )
      case statuses.rescheduled:
        return (
          <div style={{ color: '#FAAD14' }} className={styles.statusClass}>
            <WarningOutlined />
            {status}
          </div>
        )
      case statuses.noShow:
        return (
          <div style={{ color: '#6383F1' }} className={styles.statusClass}>
            <UserAddOutlined />
            {status}
          </div>
        )
      case statuses.created:
        return (
          <div style={{ color: '#54B2D3' }} className={styles.statusClass}>
            <CalendarOutlined />
            {status}
          </div>
        )
      case statuses.sent:
        return (
          <div className={styles.statusButtonClass}>
            <Button backgroundColor={'#6383F1'}>{status}</Button>
          </div>
        )
      case statuses.requested:
        return (
          <div className={styles.statusButtonClass}>
            <Button backgroundColor={'#65CD98'}>{status}</Button>
          </div>
        )
      case statuses.received:
        return (
          <div className={styles.statusButtonClass}>
            <Button backgroundColor={'#FAAD14'}>{status}</Button>
          </div>
        )
      case statuses.scheduled:
        return (
          <div className={styles.statusButtonClass}>
            <Button backgroundColor={'#54B2D3'}>{status}</Button>
          </div>
        )
      default:
        return <div className={styles.statusClass}>{status}</div>
    }
  }

  const getFilename = (url) => {
    if (url) {
      const m = url.toString().split('/')
      if (m && m.length > 0) {
        return m[m.length - 1]
      }
    }
    return ''
  }

  const menuItems = {
    edit: {
      key: 1,
      icon: <EditOutlined />,
      label: t('timeline.dotMenu.edit'),
    },
    markedAsToDo: {
      key: 2,
      icon: <ShareAltOutlined />,
      label: t('timeline.dotMenu.markedAsToDo'),
    },
    markedAsDone: {
      key: 3,
      icon: <ShareAltOutlined />,
      label: t('timeline.dotMenu.markedAsDone'),
    },
    delete: {
      key: 4,
      icon: <DeleteOutlined />,
      label: t('timeline.dotMenu.delete'),
    },
    clone: {
      key: 5,
      icon: <CopyOutlined />,
      label: t('timeline.dotMenu.clone'),
    },
    share: {
      key: 6,
      icon: <ShareAltOutlined />,
      label: t('timeline.dotMenu.share'),
    },
    pinThisNote: {
      key: 7,
      icon: <PushpinOutlined />,
      label: t('timeline.dotMenu.pinThisNote'),
    },
    shareUnShare: {
      key: 8,
      icon: <ShareAltOutlined />,
      label: t('timeline.dotMenu.shareUnshare'),
    },
    view: {
      key: 9,
      icon: <FolderViewOutlined />,
      label: t('timeline.dotMenu.view'),
    },
    forward: {
      key: 10,
      icon: <ShareAltOutlined />,
      label: t('timeline.dotMenu.forward'),
    },
    print: {
      key: 11,
      icon: <PrinterOutlined />,
      label: t('timeline.dotMenu.print'),
    },
    cancel: {
      key: 12,
      icon: <CloseCircleOutlined />,
      label: t('timeline.dotMenu.cancel'),
    },
    sendNow: {
      key: 13,
      icon: <SendOutlined />,
      label: t('timeline.dotMenu.sendNow'),
    },
  }

  const contentMenuItems = (menus: string[] = []) => {
    const menuList = menus.map((menu) => {
      return menuItems[menu]
    })
    return menuList
  }

  const renderMenu = (event) => {
    if (event.type.includes('task')) {
      return {
        menuList: contentMenuItems([
          'edit',
          event.taskChecked ? 'markedAsToDo' : 'markedAsDone',
          'delete',
        ]),
      }
    }
    switch (event.type) {
      case types.appointment:
        return {
          menuList: contentMenuItems(['clone', 'share', 'delete']),
        }
      case types.clientNote:
      case types.staffAlert:
        return {
          menuList: contentMenuItems(['edit', 'pinThisNote', 'delete']),
        }
      case types.payment:
      case types.invoice:
      case types.credit:
        return {
          menuList: contentMenuItems(['edit', 'shareUnShare', 'view']),
        }
      case types.letter:
        return {
          menuList: contentMenuItems(['forward', 'print']),
        }
      case types.call:
        return {
          menuList: contentMenuItems(['delete']),
        }
      case types.recall:
        return {
          menuList: contentMenuItems(['cancel', 'sendNow']),
        }
      case types.medicalForm:
        return {
          menuList: contentMenuItems(['view', 'edit', 'shareUnShare', 'print']),
        }
      case types.lab:
        return {
          menuList:
            event.status === statuses.sent || event.status === statuses.received
              ? contentMenuItems(['view', 'edit', 'shareUnShare', 'print'])
              : contentMenuItems(['view', 'edit', 'print']),
        }
      default:
        return {
          menuList: [],
        }
    }
  }

  const renderEvent = (event) => {
    const isTaskEvent = event.type.includes('task')
    const content = (items) => {
      return (
        <div className={styles.eyeWrap}>
          {items.map((data, index) => {
            const { firstName } = data
            return (
              <Avatar
                size="small"
                className={styles.avtarIcon}
                key={index}
                name={firstName}
              />
            )
          })}
        </div>
      )
    }
    const { menuList = [] } = renderMenu(event)
    return (
      <div className={styles.followContent}>
        <div className={styles.boxText}>
          <div className={styles.taskContent}>
            {isTaskEvent && (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleTaskChecked(event)}
              >
                {event.taskChecked ? <RadioChecked /> : <RadioUnchecked />}
              </span>
            )}
            <h4>{event.eventName}</h4>
          </div>
          <div className={styles.timeWrap}>
            {menuList.length > 0 && <DotButton menuList={menuList} />}
            {event?.displayCollapse && (
              <span
                className={classNames(styles.statusClass, {
                  [styles.activeCollapse]: collapseEvent?.[`event_${event.id}`],
                })}
              >
                <CollapseIcon
                  className={styles.circleIcon}
                  onClick={() => handleCollapse(event)}
                />
              </span>
            )}
            {event.status && (
              <div className={styles.statusWrap}>
                {renderStatus(event.status)}
              </div>
            )}
            {(event.type === types.photos || event.type === types.document) && (
              <div className={styles.customEye}>
                {event?.sharedWith?.length > 0 ? (
                  <Popover
                    overlayClassName={styles.mailOpen}
                    title={t('timeline.photos.sharedWith')}
                    content={() => content(event?.sharedWith)}
                    trigger="click"
                  >
                    <div className={styles.sharedWith}>
                      <EyeOutlined />
                    </div>
                  </Popover>
                ) : (
                  <div>
                    <Tooltip
                      trigger={'click'}
                      arrowPointAtCenter
                      title={<div>{t('timeline.share.clickToShare')}</div>}
                    >
                      <EyeInvisibleOutlined />
                    </Tooltip>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          style={
            isTaskEvent
              ? event.type === types.taskLostEmail
                ? { color: '#FF5B64' }
                : { color: '#65CD98' }
              : {}
          }
          className={styles.time}
        >
          {timeFormat(event.dateTime)}
        </div>
        {event.type === types.photos && (
          <div
            className={`${styles.imgPreview} ${
              event.photos.length >= 4
                ? styles.singleLinePreview
                : event.photos.length > 1
                ? styles.threeImagePreview
                : event.photos.length === 1
                ? styles.singleImage
                : ''
            }`}
          >
            {event.photos.map((photo, index) => {
              return <img key={index} src={photo} alt={'img'}></img>
            })}
          </div>
        )}
        {event.documentFile && (
          <div>
            <div className={styles.pdfViewWrap}>
              <DocumentPdf pageNumber={1} pdfURL={event.documentFile} />
            </div>
            <div>{getFilename(event.documentFile)}</div>
          </div>
        )}
        {event.moved && (
          <div className={styles.clientNameText}>
            <span>Moved: </span>
            <span>{event.moved.from.name}</span>
            <span>{` ${String.fromCodePoint(
              Number.parseInt('2192', 16)
            )} `}</span>
            <span>{event.moved.to.name}</span>
          </div>
        )}
        <div>
          {event.payment && (
            <div className={styles.payment}>{event.payment}</div>
          )}
        </div>
        {event.description && (
          <span
            className={`${styles.bottomText} ${
              event?.displayCollapse && collapseEvent?.[`event_${event.id}`]
                ? styles.expandClass
                : styles.collapseClass
            }`}
          >
            <h5>{event.description}</h5>
          </span>
        )}
        <div className={styles.clientNameWrap}>
          <div className={styles.clientNameText}>{event.clientName}</div>
          {isTaskEvent && (
            <div className={styles.clientNameText}>
              <UserIcon /> &nbsp;
              {event.taskUserName}
            </div>
          )}
        </div>
        {event?.openedBy?.length > 0 && (
          <Popover
            overlayClassName={styles.mailOpen}
            title={t('timeline.openedBy')}
            content={() => content(event?.openedBy)}
            trigger="hover"
          >
            <div className={styles.opened}>
              <EyeOutlined />
              <span>{`${event.openedBy.length} ${t('timeline.opened')}`} </span>
            </div>
          </Popover>
        )}
        {event.paymentMethod && <h6>{event.paymentMethod}</h6>}
      </div>
    )
  }

  const renderIcon = (type) => {
    switch (type) {
      case types.appointment:
        return { icon: <AppointmentIcon />, color: '#3D9588' }
      case types.payment:
      case types.refund:
      case types.invoice:
      case types.credit:
        return { icon: <PaymentIcon />, color: '#3D4EB4' }
      case types.clientNote:
        return { icon: <ClientNoteIcon />, color: '#FAAD14' }
      case types.staffAlert:
        return { icon: <StaffAlertIcon />, color: '#FF5B64' }
      case types.photos:
        return { icon: <PhotosIcon />, color: '#ED72AA' }
      case types.document:
        return { icon: <DocumentIcon />, color: '#4DBAD4' }
      case types.mail:
        return { icon: <MailIcon />, color: '#5F37B6' }
      case types.sms:
        return { icon: <SmsIcon />, color: '#5F37B6' }
      case types.letter:
        return { icon: <LetterIcon />, color: '#5F37B6' }
      case types.call:
        return { icon: <CallIcon />, color: '#5F37B6' }
      case types.taskEmail:
        return { icon: <MailIcon />, color: '#40A0C1' }
      case types.taskSms:
        return { icon: <SmsIcon />, color: '#40A0C1' }
      case types.taskCall:
        return { icon: <CallIcon />, color: '#40A0C1' }
      case types.taskLetter:
        return { icon: <LetterIcon />, color: '#40A0C1' }
      case types.taskLostEmail:
        return { icon: <LostMailIcon />, color: '#40A0C1' }
      case types.medicalHistory:
        return { icon: <DocumentIcon />, color: '#3D9588' }
      case types.lab:
        return { icon: <LabOrderIcon />, color: '#3D9588' }
      case types.medicalForm:
        return { icon: <MedicalFormIcon />, color: '#3D9588' }
      case types.medicalCondition:
        return { icon: <MedicalConditionIcon />, color: '#3D9588' }
      case types.pabauConnect:
        return { icon: <PabauLogo />, color: '#EEF7FB' }
      case types.recall:
        return { icon: <RecallIcon />, color: '#9292A3' }
      default:
        return { icon: <AppointmentIcon />, color: '#ED72AA' }
    }
  }

  const toggleSearchBar = () => {
    setDisplaySearch((e) => !e)
    setSearchText('')
  }

  return (
    <div className={styles.followWrapper}>
      <div className={styles.header}>
        <h5>{t('timeline.photos.activity')}</h5>
        <div className={styles.iconGroup}>
          <div className={styles.headerIconWrap}>
            <PrinterOutlined />
          </div>
          <div className={styles.headerIconWrap}>
            <MailOutlined />
          </div>
          <div
            className={`${styles.headerIconWrap} ${
              displaySearch && styles.active
            }`}
          >
            <SearchOutlined onClick={toggleSearchBar} />
          </div>
          <div
            className={`${styles.headerIconWrap} ${
              visibleFilterPopUp && styles.active
            }`}
          >
            <TimeLineFilterPopover
              visible={visibleFilterPopUp}
              setVisible={setVisibleFilterPopUp}
              selectedFilterKey={selectedFilterKey}
              setSelectedFilterKey={setSelectedFilterKey}
              dateRange={dateRange}
              setDateRange={setDateRange}
              eventDateFormat={eventDateFormat}
            >
              <FilterOutlined />
            </TimeLineFilterPopover>
          </div>
        </div>
      </div>
      <div className={styles.timelineWrap}>
        <div className="vertical-timeline-element--work">
          {displaySearch && (
            <div className={styles.searchText}>
              <Input
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t('timeline.photos.searchPlaceHolder')}
                prefix={<SearchOutlined />}
                allowClear={true}
              />
            </div>
          )}
          {isLoading ? (
            <TimelineSkeleton />
          ) : (
            <div className={styles.contentWrapper}>
              {filteredEvents.length === 0 ? (
                <div className={styles.emptyEvents}>
                  {t('timeline.filter.noEvent')}
                </div>
              ) : (
                <div>
                  {days.map((day) => (
                    <div className={styles.timeEleWrap} key={day}>
                      <div className={styles.dayName}>
                        <span className={styles.line} />
                        <p
                          style={{
                            cursor:
                              day === t('timeline.status.done')
                                ? 'pointer'
                                : 'default',
                          }}
                          onClick={() => displayConfetti(day)}
                        >
                          {day}
                        </p>
                      </div>
                      <VerticalTimeline layout={'1-column-left'}>
                        {eventsByDay?.[day]
                          .sort((a, b) => {
                            return (
                              dayjs(b.dateTime, eventDateFormat).valueOf() -
                              dayjs(a.dateTime, eventDateFormat).valueOf()
                            )
                          })
                          .map((event, index) => {
                            const { icon, color } = renderIcon(event.type)
                            return (
                              <VerticalTimelineElement
                                key={index}
                                className={classNames(
                                  'vertical-timeline-element--work',
                                  {
                                    [styles.staffAlertClass]:
                                      event.type === types.staffAlert,
                                    [styles.clientNoteClass]:
                                      event.type === types.clientNote,
                                  }
                                )}
                                icon={icon}
                                iconStyle={{
                                  background: color,
                                  color: '#fff',
                                }}
                              >
                                {renderEvent(event)}
                              </VerticalTimelineElement>
                            )
                          })}
                      </VerticalTimeline>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.clientFooter}>
        <TimelineFooterIcon />
        <h5>{t('timeline.clientCreated')}</h5>
        <div className={styles.clientContent}>
          <span>{clientDetail?.createdAt}</span>
          <span className={styles.dot} />
          <span>{clientDetail?.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Timeline
