import React, { FC, useEffect, useState } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import confetti from 'canvas-confetti'
import {
  PrinterOutlined,
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
import { ReactComponent as DropDown } from '../../assets/images/timeline/dropdown.svg'
import { ReactComponent as ShareIcon } from '../../assets/images/timeline/share-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/timeline/delete-icon.svg'
import { ReactComponent as MedicalTreatment } from '../../assets/images/timeline/medical-treatment.svg'
import TimeLineFilterPopover from './TimeLineFilterPopover'
import { DotButton } from '@pabau/ui'
import TimelineSkeleton from './TimelineSkeleton'
import classNames from 'classnames'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

const { TextArea } = Input

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

interface callDetailProps {
  from?: ClientDetailProps
  to?: ClientDetailProps
}

export interface EventsProps {
  typeIcon?: string
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
  activityChecked?: boolean
  activityUserName?: string
  callConnected?: boolean
  audioFile?: string
  callDetail?: callDetailProps
  callDescription?: string
  audioTime?: string
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
  activityEmail: 'activityEmail',
  activitySms: 'activitySMS',
  activityCall: 'activityCall',
  activityLetter: 'activityLetter',
  activityLostEmail: 'activityLostEmail',
  medicalHistory: 'medicalHistory',
  lab: 'lab',
  medicalForm: 'medicalForm',
  recall: 'recall',
  medicalCondition: 'medicalCondition',
  treatment: 'treatment',
  consent: 'Consent',
  pabauConnect: 'pabauConnect',
  activity: 'activity',
}

const DocumentPdf = dynamic(() => import('./DocumentPdf'), {
  ssr: false,
})

// const Waveform = dynamic(() => import('./WaveForm'), {
//   ssr: false,
// })

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
  const [editNote, setEditNote] = useState({})
  const [displayAudio, setDisplayAudio] = useState(true)
  const [descriptionNote, setDescriptionNote] = useState({})

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
          (data.type.includes(types.activity) &&
            selectedFilterKey.includes(types.activity))
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
    const data = filteredData.map((item) => {
      const temp = { ...item }
      temp.displayCollapse = (temp?.description || '').length > 250
      return temp
    })
    setFilteredEvents(data)
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
        origin: { y: 0.5 },
        zIndex: 2000,
      })
    }
  }
  const handleActivityChecked = (event) => {
    const newEvents = events?.map((data) => {
      const temp = { ...data }
      if (data.id === event.id) {
        temp.activityChecked = !temp.activityChecked
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
    UnShare: {
      key: 8,
      icon: <ShareAltOutlined />,
      label: t('timeline.dotMenu.Unshare'),
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
    if (event.type.includes(types.activity)) {
      return {
        menuList: contentMenuItems([
          'edit',
          event.activityChecked ? 'markedAsToDo' : 'markedAsDone',
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
        return {
          menuList: contentMenuItems(['edit', 'pinThisNote', 'delete']),
        }
      case types.staffAlert:
        return {
          menuList: contentMenuItems(['edit', 'delete']),
        }
      case types.payment:
      case types.invoice:
      case types.credit:
        return {
          menuList: contentMenuItems([
            'edit',
            event?.sharedWith?.length > 0 ? 'UnShare' : 'share',
            'view',
          ]),
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
          menuList: contentMenuItems([
            'view',
            'edit',
            event?.sharedWith?.length > 0 ? 'UnShare' : 'share',
            'print',
          ]),
        }
      case types.lab:
        return {
          menuList:
            event.status === statuses.sent || event.status === statuses.received
              ? contentMenuItems([
                  'view',
                  'edit',
                  event?.sharedWith?.length > 0 ? 'UnShare' : 'share',
                  'print',
                ])
              : contentMenuItems(['view', 'edit', 'print']),
        }
      default:
        return {
          menuList: [],
        }
    }
  }

  const renderEvent = (event) => {
    const isActivityEvent = event.type.includes(types.activity)
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
            {isActivityEvent && event.type !== 'activityCall' && (
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleActivityChecked(event)}
              >
                {event.activityChecked ? <RadioChecked /> : <RadioUnchecked />}
              </span>
            )}
            <h4>{event.eventName}</h4>
          </div>
          <div className={styles.timeWrap}>
            {menuList.length > 0 && (
              <DotButton
                customClass={styles.wrapDotButton}
                menuList={menuList}
              />
            )}
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
            isActivityEvent
              ? event.type === types.activityLostEmail
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
            <span>{t('timeline.moved')} </span>
            <span>{event.moved.from.name}</span>
            <span>{` ${String.fromCodePoint(
              Number.parseInt('2192', 16)
            )} `}</span>
            <span>{event.moved.to.name}</span>
          </div>
        )}
        {event.type === 'activityCall' && (
          <div>
            <div className={styles.clientNameText}>
              <span>{t('timeline.callTab.from')} </span>
              <span>{event.callDetail.from.name}</span>
              <span>{` ${String.fromCodePoint(
                Number.parseInt('2192', 16)
              )} `}</span>
              <span>{t('timeline.callTab.to')} </span>
              <span>{event.callDetail.to.name}</span>
            </div>
            <span
              className={`${styles.bottomText} ${
                event?.displayCollapse && collapseEvent?.[`event_${event.id}`]
                  ? styles.expandClass
                  : styles.collapseClass
              }`}
            >
              <h5>{event.description}</h5>
            </span>
            <h6 className={styles.tagText}>{t('timeline.callTab.outcome')}</h6>
            <div className={styles.outcome}>
              <h5>{t('timeline.callTab.connected')}</h5>
              <span>
                <DropDown onClick={() => setDisplayAudio(!displayAudio)} />
              </span>
            </div>
            {displayAudio && event.audioFile && event.type === 'activityCall' && (
              <div className={styles.audioWrapper}>
                {/* <Waveform audioFile={event.audioFile} /> */}
                <ShareIcon className={styles.icon} />
                <DeleteIcon className={styles.icon} />
              </div>
            )}
          </div>
        )}
        <div>
          {event.payment && (
            <div className={styles.payment}>{event.payment}</div>
          )}
        </div>
        {editNote?.[event.id] ? (
          <div className={styles.addNote}>
            <TextArea
              placeholder={t('timeline.editNote.addDescription')}
              defaultValue={event.description}
              value={descriptionNote[event.id]}
              onChange={(e) => handleNoteChange(e.target.value, event)}
            ></TextArea>
            <div className={styles.addNoteBtn}>
              <Button type={'primary'} onClick={() => handleNoteSave(event)}>
                {t('timeline.editNote.save')}
              </Button>
              <Button onClick={() => handleEditNoteCancel(event)}>
                {t('timeline.editNote.cancel')}
              </Button>
            </div>
          </div>
        ) : event.type !== 'activityCall' && event.description ? (
          <div
            className={
              event.type === types.appointment ? styles.editNoteWidth : ''
            }
          >
            <span
              className={`${styles.bottomText} ${
                event?.displayCollapse && collapseEvent?.[`event_${event.id}`]
                  ? styles.expandClass
                  : styles.collapseClass
              }`}
            >
              <h5>{event.description}</h5>
              {event.type === types.appointment && (
                <div className={styles.editIcon}>
                  <EditOutlined onClick={() => handleEditNoteClick(event)} />
                </div>
              )}
            </span>
          </div>
        ) : (
          event.type === types.appointment && (
            <div className={styles.editNote}>
              {t('timeline.editNote.addDescription')}
              <EditOutlined onClick={() => handleEditNoteClick(event)} />
            </div>
          )
        )}
        <div className={styles.clientNameWrap}>
          <div className={styles.clientNameText}>{event.clientName}</div>
          {isActivityEvent && event.type !== 'activityCall' && (
            <div className={styles.clientNameText}>
              <UserIcon /> &nbsp;
              {event.activityUserName}
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
        return { icon: <DocumentIcon />, color: '#5F37B6' }
      case types.mail:
        return { icon: <MailIcon />, color: '#5F37B6' }
      case types.sms:
        return { icon: <SmsIcon />, color: '#5F37B6' }
      case types.letter:
        return { icon: <LetterIcon />, color: '#5F37B6' }
      case types.call:
        return { icon: <CallIcon />, color: '#5F37B6' }
      case types.activityEmail:
        return { icon: <MailIcon />, color: '#40A0C1' }
      case types.activitySms:
        return { icon: <SmsIcon />, color: '#40A0C1' }
      case types.activityCall:
        return { icon: <CallIcon />, color: '#40A0C1' }
      case types.activityLetter:
        return { icon: <LetterIcon />, color: '#40A0C1' }
      case types.activityLostEmail:
        return { icon: <LostMailIcon />, color: '#40A0C1' }
      case types.medicalHistory:
        return { icon: <DocumentIcon />, color: '#3D9588' }
      case types.lab:
        return { icon: <LabOrderIcon />, color: '#3D9588' }
      case types.medicalForm:
        return { icon: <MedicalFormIcon />, color: '#3D9588' }
      case types.medicalCondition:
        return { icon: <MedicalConditionIcon />, color: '#3D9588' }
      case types.treatment:
        return { icon: <MedicalTreatment />, color: '#3D9588' }
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

  const handleEditNoteClick = (event) => {
    Object.keys(editNote).includes(event.id.toString())
      ? setEditNote((e) => ({ ...e, [event.id]: !editNote[event.id] }))
      : setEditNote((e) => ({ ...e, [event.id]: true }))
  }
  const handleEditNoteCancel = (event) => {
    handleEditNoteClick(event)
    setDescriptionNote((e) => ({ ...e, [event.id]: event.description }))
  }

  const handleNoteSave = (event) => {
    const newEvents = events?.map((data) => {
      const temp = { ...data }
      if (data.id === event.id) {
        temp.description = descriptionNote[event.id]
      }
      return temp
    })
    setEvents(newEvents)
    setEditNote((e) => ({ ...e, [event.id]: false }))
  }

  const handleNoteChange = (value, event) => {
    Object.keys(descriptionNote).includes(event.id.toString())
      ? setDescriptionNote((e) => ({ ...e, [event.id]: value }))
      : setDescriptionNote((e) => ({ ...e, [event.id]: '' }))
  }

  return (
    <div className={styles.followWrapper}>
      <div className={styles.header}>
        <h5>{t('timeline.photos.activity')}</h5>
        <div className={styles.iconGroup}>
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
                          onClick={() => {
                            displayConfetti(day)
                          }}
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
