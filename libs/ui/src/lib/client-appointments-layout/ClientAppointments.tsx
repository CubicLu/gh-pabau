import React, { useState, useRef } from 'react'
import {
  TabMenu,
  ClientAppointmentCard,
  AppointmentStatus,
  displayStatusLabel,
  Avatar,
  AvatarStatus,
} from '@pabau/ui'
import {
  Checkbox,
  Popover,
  DatePicker,
  Radio,
  Space,
  Divider,
  Drawer,
  Button,
  Skeleton,
} from 'antd'
import {
  FilterOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import { ReactComponent as BookmarkOutlined } from '../../assets/images/bookmark.svg'
import { ReactComponent as UserDeleteImg } from '../../assets/images/client-card/user-delete.svg'
import { clientAppointments } from './mock'
import styles from './ClientAppointments.module.less'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import User1 from '../../assets/images/user1.png'
import User5 from '../../assets/images/user5.png'
import User9 from '../../assets/images/user9.png'
import dayjs from 'dayjs'
import { MutationFunction } from '@apollo/client'

interface Employee {
  avatar: string
  name: string
  relationship?: string
}

export interface CancelReason {
  value: number
  text: string
}

export interface ClientAppointmentItem {
  id: number
  serviceName: string
  employee: Employee
  otherEmployees?: Employee[]
  status: AppointmentStatus | string
  locationName: string
  createdDate: string
  apptDate: string
  isVirtual: boolean
  smsReminder: boolean
  emailReminder: boolean
  remindersSent: boolean
  feedbackSurvey: number
  notes?: string
  isVideoCall: number
  bookedBy: string
  isCourse: boolean
  isOnline: number
  cancellationReason?: number
  reasonComment?: string
  cancelBy?: number
}

export interface ClientI {
  fullName?: string
}
interface P {
  appointments?: ClientAppointmentItem[]
  loading?: boolean
  clientInfo?: ClientI
  cancelReasons?: CancelReason[]
  updateApptNoteMutation?: MutationFunction
  adjustApptNotificationsMutation?: MutationFunction
  updateAppointmentStatusMutation?: MutationFunction
  cancelBookingMutation?: MutationFunction
  updateCancelReasonMutation?: MutationFunction
}

//TODO: remove these dummy funcctions
const deleteAppointment = (
  a: unknown = undefined,
  b: unknown = undefined,
  c: unknown = undefined
) => console.log('TODO')

export const ClientAppointments = ({
  appointments,
  loading,
  clientInfo,
  updateApptNoteMutation,
  adjustApptNotificationsMutation,
  updateAppointmentStatusMutation,
  cancelBookingMutation,
  cancelReasons,
  updateCancelReasonMutation,
}: P) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleEditCancelReason = (id, reason, reasonId, cancelBy) => {
    updateCancelReasonMutation?.({
      variables: {
        appointmentId: id,
        reason,
        reasonId,
        cancelBy,
      },
    })
  }

  const handleCancelAppointment = (id, reason, comment) => {
    cancelBookingMutation?.({
      variables: {
        bookingId: id,
        reason: comment,
        type: '',
        reasonId: reason,
      },
    })
  }

  const editNote = (id: number, note?: string) =>
    updateApptNoteMutation?.({
      variables: {
        bookingId: id,
        note,
      },
    })

  const updateAppointmentStatus = (id: number, status: string) =>
    updateAppointmentStatusMutation?.({
      variables: {
        booking_id: id,
        status,
      },
    })

  const adjustApptNotification = (
    id: number,
    reminder: boolean,
    requestFeedback: number
  ) =>
    adjustApptNotificationsMutation?.({
      variables: {
        booking_id: id,
        sent_sms: reminder ? 1 : 0,
        sent_survey: requestFeedback,
      },
    })

  const personList = [
    { name: 'Hugo Miller', avatar: User9 },
    { name: 'Aydin Austin', avatar: User5 },
    { name: 'Jemima Mellerio', avatar: User1 },
  ]

  enum FilterRadioValue {
    none = 'none',
    upcoming = 'upcoming',
    past = 'past',
  }
  const { t } = useTranslation('common')
  const [serviceFilter, setServiceFilter] = useState<CheckboxValueType[]>([])
  const [tempServiceFilter, setTempServiceFilter] = useState<
    CheckboxValueType[]
  >([])
  const [personFilter, setPersonFilter] = useState<string[]>([])
  const [tempPersonFilter, setTempPersonFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<CheckboxValueType[]>([])
  const [tempStatusFilter, setTempStatusFilter] = useState<CheckboxValueType[]>(
    []
  )
  const [nowFilter, setNowFilter] = useState(FilterRadioValue.none)
  const [tempNowFilter, setTempNowFilter] = useState(FilterRadioValue.none)
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [tempStartDate, setTempStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [tempEndDate, setTempEndDate] = useState('')

  const clearTempFilter = () => {
    setTempServiceFilter([])
    setTempPersonFilter([])
    setTempStatusFilter([])
    setTempNowFilter(FilterRadioValue.none)
    setTempStartDate('')
    setTempEndDate('')
  }

  const confirmApply = () => {
    setServiceFilter([...tempServiceFilter])
    setPersonFilter([...tempPersonFilter])
    setStatusFilter([...tempStatusFilter])
    setNowFilter(tempNowFilter)
    setStartDate(tempStartDate)
    setEndDate(tempEndDate)
  }

  const isMobile = useMedia('(max-width: 767px)', false)

  const changeTempStartDate = (date, dateString) => {
    setTempStartDate(dateString)
  }

  const changeTempEndDate = (date, dateString) => {
    setTempEndDate(dateString)
  }

  const changeTempNowFilter = (e) => {
    setTempNowFilter(e.target.value)
  }

  const changeAvatarCheck = (name, checkable) => {
    const resultArr = [...personFilter]
    const index = resultArr.indexOf(name)
    if (checkable && index < 0) {
      setPersonFilter([...resultArr, name])
    } else if (!checkable && index > -1) {
      resultArr.splice(index, 1)
      setPersonFilter([...resultArr])
    }
  }

  const changeTempAvatarCheck = (name, checkable) => {
    const resultArr = [...tempPersonFilter]
    const index = resultArr.indexOf(name)
    if (checkable && index < 0) {
      setTempPersonFilter([...resultArr, name])
    } else if (!checkable && index > -1) {
      resultArr.splice(index, 1)
      setTempPersonFilter([...resultArr])
    }
  }

  const changeTempServiceFilter = (values) => {
    setTempServiceFilter(values)
  }

  const changeTempStatusFilter = (values) => {
    setTempStatusFilter(values)
  }

  const noShowAppointmentTabTitle = (
    <>
      {t('client.appointments.layout.tab.no.shows')}
      <span style={{ color: 'red' }}>
        {` (${
          appointments?.filter(
            (item) => item.status === AppointmentStatus.noShow
          ).length
        })`}
      </span>
    </>
  )

  const purpleColorDot = <div className={styles.purpleColorDot}></div>
  const yellowColorDot = <div className={styles.yellowColorDot}></div>

  const appointmentsFilterPopover = (
    <div className={styles.filterContainer}>
      <div className={styles.filterTitle}></div>
      <div className={styles.serviceFilter}>
        <div className={styles.filterName}>
          {t('client.appointments.layout.filter.service')}
        </div>
        <Checkbox.Group
          className={styles.serviceList}
          onChange={changeTempServiceFilter}
          value={tempServiceFilter}
        >
          <Checkbox value="Brachioplasty">
            <div className={styles.serviceTextWrapper}>
              <span className={styles.serviceText}>
                {purpleColorDot}Brachioplasty
              </span>
              <span className={styles.serviceCounter}>
                {`(${
                  appointments?.filter(
                    (el) => el.serviceName === 'Brachioplasty'
                  ).length
                })`}
              </span>
            </div>
          </Checkbox>
          <Checkbox value="Abdominoplasty">
            <div className={styles.serviceTextWrapper}>
              <span className={styles.serviceText}>
                {yellowColorDot}Abdominoplasty
              </span>
              <span className={styles.serviceCounter}>
                {`(${
                  appointments?.filter(
                    (el) => el.serviceName === 'Abdominoplasty'
                  ).length
                })`}
              </span>
            </div>
          </Checkbox>
        </Checkbox.Group>
      </div>
      <div className={styles.personFilter}>
        <div className={styles.filterName}>
          {t('client.appointments.layout.filter.person')}
        </div>
        <div className={styles.avatarList}>
          {personList.map((item, index) => (
            <Avatar
              active={AvatarStatus.select}
              size="large"
              src={item.avatar}
              name={item.name}
              key={index}
              handleCheck={(name, checkable) =>
                changeTempAvatarCheck(name, checkable)
              }
              checkList={tempPersonFilter}
              counter={
                appointments?.filter((el) => item.name === el?.employee?.name)
                  .length
              }
            />
          ))}
        </div>
      </div>
      <div className={styles.statusFilter}>
        <div className={styles.filterName}>
          {t('client.appointments.layout.filter.status')}
        </div>
        <Checkbox.Group
          className={styles.checkList}
          onChange={changeTempStatusFilter}
          value={tempStatusFilter}
        >
          <Checkbox value={AppointmentStatus.cancelled}>
            {displayStatusLabel(
              AppointmentStatus.cancelled,
              tempStatusFilter.includes(AppointmentStatus.cancelled)
            )}
          </Checkbox>
          <Checkbox value={AppointmentStatus.new}>
            {displayStatusLabel(
              AppointmentStatus.new,
              tempStatusFilter.includes(AppointmentStatus.new)
            )}
          </Checkbox>
          <Checkbox value={AppointmentStatus.noShow}>
            {displayStatusLabel(
              AppointmentStatus.noShow,
              tempStatusFilter.includes(AppointmentStatus.noShow)
            )}
          </Checkbox>
          <Checkbox value={AppointmentStatus.waiting}>
            {displayStatusLabel(
              AppointmentStatus.waiting,
              tempStatusFilter.includes(AppointmentStatus.waiting)
            )}
          </Checkbox>
          <Checkbox value={AppointmentStatus.arrived}>
            {displayStatusLabel(
              AppointmentStatus.arrived,
              tempStatusFilter.includes(AppointmentStatus.arrived)
            )}
          </Checkbox>
          <Checkbox value={AppointmentStatus.inRoom}>
            {displayStatusLabel(
              AppointmentStatus.inRoom,
              tempStatusFilter.includes(AppointmentStatus.inRoom)
            )}
          </Checkbox>
        </Checkbox.Group>
      </div>
      <div className={styles.dateFilter}>
        <div className={styles.filterName}>
          {t('client.appointments.layout.filter.date')}
        </div>
        <div className={styles.datePickerList}>
          <div className={styles.datePickerWrapper}>
            <span>{t('client.appointments.layout.filter.date.from')}</span>
            <div className={styles.datePicker}>
              <DatePicker onChange={changeTempStartDate} />
            </div>
          </div>
          <div className={styles.middleLine}></div>
          <div className={styles.datePickerWrapper}>
            <span>{t('client.appointments.layout.filter.date.to')}</span>
            <div className={styles.datePicker}>
              <DatePicker onChange={changeTempEndDate} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.nowFilter}>
        <div className={styles.filterName}></div>
        <div className={styles.nowFilterWrapper}>
          <Radio.Group onChange={changeTempNowFilter} value={tempNowFilter}>
            <Space direction="vertical">
              <Radio
                value="none"
                style={{ display: 'none', marginBottom: '0' }}
              >
                <span className={styles.radioText}></span>
              </Radio>
              <Radio value="upcoming">
                <span className={styles.radioText}>
                  {t('client.appointments.layout.filter.upcoming')}
                </span>
              </Radio>
              <Radio value="past">
                <span className={styles.radioText}>
                  {t('client.appointments.layout.filter.past')}
                </span>
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button className={styles.clearAllButton} onClick={clearTempFilter}>
          {t('client.appointments.layout.filter.button.clear.all')}
        </Button>
        <Button
          className={styles.applyButton}
          onClick={() => {
            confirmApply()
            setShowFilterDrawer(false)
          }}
        >
          {t('client.appointments.layout.filter.button.apply')}
        </Button>
      </div>
    </div>
  )

  const appointmentsFilterDrawer = (
    <Drawer
      visible={showFilterDrawer}
      placement="bottom"
      closable={false}
      className={styles.filterDrawer}
      onClose={() => setShowFilterDrawer(false)}
    >
      <div className={styles.filterDrawerHeader}>
        <div
          className={styles.handler}
          onClick={() => setShowFilterDrawer(!showFilterDrawer)}
        />
        <div className={styles.title}>
          {t('client.appointments.layout.filter.title')}
        </div>
      </div>
      <div className={styles.filterDrawerBody}>{appointmentsFilterPopover}</div>
    </Drawer>
  )

  const appointmentTabHeader = (
    <div className={styles.appointmentTabHeader}>
      <div>
        <BookmarkOutlined />
      </div>
      {!isMobile ? (
        <div className={styles.popoverWrapper}>
          <Popover
            placement="bottomRight"
            title={<span>{t('client.appointments.layout.filter.title')}</span>}
            content={appointmentsFilterPopover}
            trigger="click"
            align={{
              overflow: { adjustX: false, adjustY: false },
            }}
            getPopupContainer={(trigger) =>
              trigger.parentElement as HTMLElement
            }
          >
            <FilterOutlined />
          </Popover>
        </div>
      ) : (
        <div onClick={() => setShowFilterDrawer(!showFilterDrawer)}>
          <FilterOutlined />
        </div>
      )}
    </div>
  )

  // useEffect(() => {
  //   let xDown = 0
  //   let yDown = 0

  //   const getTouches = (evt) => {
  //     return evt.touches || evt.originalEvent.touches
  //   }

  //   const handleTouchStart = (evt) => {
  //     const firstTouch = getTouches(evt)[0]
  //     xDown = firstTouch.clientX
  //     yDown = firstTouch.clientY
  //   }
  //   const handleTouchMove = (evt) => {
  //     if (!xDown || !yDown) {
  //       return
  //     }
  //     const xUp = evt.touches[0].clientX
  //     const yUp = evt.touches[0].clientY

  //     const xDiff = xDown - xUp
  //     const yDiff = yDown - yUp

  //     if (Math.abs(xDiff) > Math.abs(yDiff)) {
  //       /*most significant*/
  //       if (xDiff > 0) {
  //         /* right swipe */
  //       } else {
  //         /* left swipe */
  //       }
  //     } else {
  //       if (yDiff > 0) {
  //         console.log('down')
  //         /* down swipe */
  //       } else {
  //         console.log('up')
  //         setShowFilterDrawer(false)
  //         /* up swipe */
  //       }
  //     }
  //     /* reset values */
  //     xDown = 0
  //     yDown = 0
  //   }

  //   if (showFilterDrawer) {
  //     document.addEventListener('touchstart', handleTouchStart, false)
  //     document.addEventListener('touchmove', handleTouchMove, false)
  //   } else {
  //     document.removeEventListener('touchstart', handleTouchStart, false)
  //     document.removeEventListener('touchmove', handleTouchMove, false)
  //   }
  // }, [showFilterDrawer])

  const renderAppointmentSkeleton = () => {
    return [1, 2, 3, 4, 5].map((i) => {
      return (
        <div key={i} className={styles.appointmentSkeleton}>
          <Skeleton avatar active paragraph={{ rows: 1 }} />
        </div>
      )
    })
  }

  const renderFilteredItem = (item, index) => {
    if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate === '' &&
      endDate === '' &&
      nowFilter === FilterRadioValue.upcoming &&
      item.apptDate >= moment(new Date()).format('YYYY-MM-DD')
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          {...clientInfo}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate === '' &&
      endDate === '' &&
      nowFilter === FilterRadioValue.past &&
      item.apptDate < moment(new Date()).format('YYYY-MM-DD')
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          {...clientInfo}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate === '' &&
      endDate === '' &&
      nowFilter === FilterRadioValue.none
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          {...clientInfo}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate !== '' &&
      endDate === '' &&
      item.apptDate >= startDate &&
      nowFilter === FilterRadioValue.upcoming &&
      item.apptDate >= moment(new Date()).format('YYYY-MM-DD')
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          {...clientInfo}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate !== '' &&
      endDate === '' &&
      item.apptDate >= startDate &&
      nowFilter === FilterRadioValue.past &&
      item.apptDate < moment(new Date()).format('YYYY-MM-DD')
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          {...clientInfo}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate !== '' &&
      endDate === '' &&
      item.apptDate >= startDate &&
      nowFilter === FilterRadioValue.none
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          {...clientInfo}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate === '' &&
      endDate !== '' &&
      item.apptDate <= endDate &&
      nowFilter === FilterRadioValue.upcoming &&
      item.apptDate >= moment(new Date()).format('YYYY-MM-DD')
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          {...clientInfo}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate === '' &&
      endDate !== '' &&
      item.apptDate <= endDate &&
      nowFilter === FilterRadioValue.past &&
      item.apptDate < moment(new Date()).format('YYYY-MM-DD')
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate === '' &&
      endDate !== '' &&
      item.apptDate <= endDate &&
      nowFilter === FilterRadioValue.none
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate !== '' &&
      endDate !== '' &&
      item.apptDate >= startDate &&
      item.apptDate <= endDate &&
      nowFilter === FilterRadioValue.upcoming &&
      item.apptDate >= moment(new Date()).format('YYYY-MM-DD')
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate !== '' &&
      endDate !== '' &&
      item.apptDate >= startDate &&
      item.apptDate <= endDate &&
      nowFilter === FilterRadioValue.past &&
      item.apptDate < moment(new Date()).format('YYYY-MM-DD')
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(id, value) => editNote(id, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    } else if (
      ([...serviceFilter].includes(item.serviceName) ||
        serviceFilter.length === 0) &&
      ([...personFilter].includes(item.employee.name) ||
        personFilter.length === 0) &&
      ([...statusFilter].includes(item.status) || statusFilter.length === 0) &&
      item.status !== AppointmentStatus.cancelled &&
      startDate !== '' &&
      endDate !== '' &&
      item.apptDate >= startDate &&
      item.apptDate <= endDate &&
      nowFilter === FilterRadioValue.none
    ) {
      return (
        <ClientAppointmentCard
          {...item}
          index={index}
          key={`all-bookings-${index}`}
          handleDelete={() => deleteAppointment(index)}
          handleEditNotes={(index, value) => editNote(index, value)}
          handleCancel={(id, reason, comment) =>
            handleCancelAppointment(id, reason, comment)
          }
        />
      )
    }
    return null
  }

  const EmptyPlaceholder = ({ message, icon }) => (
    <div className={styles.emptyContent}>
      <div className={styles.iconWrapper}>{icon}</div>
      <span className={styles.emptyText}>{message}</span>
    </div>
  )

  return (
    <div className={styles.clientLayout} ref={ref}>
      {appointments && (
        <div className={styles.appointmentTabs}>
          <TabMenu
            tabPosition="top"
            minHeight="730px"
            menuItems={[
              `${t('client.appointments.layout.tab.all.bookings')} (${
                appointments?.length
              })`,
              `${t('client.appointments.layout.tab.classes')} (${
                appointments.filter(
                  (item) =>
                    item.isCourse && item.status !== AppointmentStatus.cancelled
                ).length
              })`,
              `${t('client.appointments.layout.tab.cancelled')} (${
                appointments.filter(
                  (item) => item.status === AppointmentStatus.cancelled
                ).length
              })`,
              noShowAppointmentTabTitle,
            ]}
          >
            <div className={styles.appointmentTab}>
              {appointments.length > 0 && appointmentTabHeader}
              {isMobile && appointmentsFilterDrawer}
              {loading && renderAppointmentSkeleton()}
              {!loading &&
                appointments.length > 0 &&
                serviceFilter.length === 0 &&
                personFilter.length === 0 &&
                statusFilter.length === 0 &&
                startDate === '' &&
                endDate === '' &&
                nowFilter === FilterRadioValue.none && (
                  <div className={styles.appointmentTabBody}>
                    {appointments.filter((el) => el.apptDate > dayjs().format())
                      .length > 0 && (
                      <>
                        <Divider className={styles.nowDivider}>
                          {t('client.appointments.layout.filter.upcoming')}{' '}
                          {`(${
                            appointments.filter(
                              (el) => el.apptDate > dayjs().format()
                            ).length
                          })`}
                        </Divider>
                        {appointments
                          .sort((appt1, appt2) => {
                            return (
                              +new Date(appt2.apptDate) -
                              +new Date(appt1.apptDate)
                            )
                          })
                          .map((item, index) => {
                            if (item.apptDate > dayjs().format()) {
                              return (
                                <ClientAppointmentCard
                                  {...item}
                                  {...clientInfo}
                                  index={index}
                                  cancelReasons={cancelReasons}
                                  key={`all-bookings-${index}`}
                                  handleDelete={() => deleteAppointment(index)}
                                  handleEditNotes={(id, value) => {
                                    editNote(id, value)
                                  }}
                                  handleAppointmentStatus={(id, status) => {
                                    updateAppointmentStatus(id, status)
                                  }}
                                  handleAdjustApptNotification={(
                                    id,
                                    reminder,
                                    requestFeedback
                                  ) => {
                                    adjustApptNotification(
                                      id,
                                      reminder,
                                      requestFeedback
                                    )
                                  }}
                                  handleCancel={(id, reason, comment) =>
                                    handleCancelAppointment(id, reason, comment)
                                  }
                                  handleEditCancel={handleEditCancelReason}
                                />
                              )
                            }
                            return null
                          })}
                      </>
                    )}
                    <Divider className={styles.nowDivider}>
                      {t('client.appointments.layout.filter.past')}{' '}
                      {`(${
                        appointments.filter(
                          (el) => el.apptDate < dayjs().format()
                        ).length
                      })`}
                    </Divider>
                    {appointments
                      .sort((appt1, appt2) => {
                        return (
                          +new Date(appt2.apptDate) - +new Date(appt1.apptDate)
                        )
                      })
                      .map((item, index) => {
                        if (item.apptDate < dayjs().format()) {
                          return (
                            <ClientAppointmentCard
                              {...item}
                              {...clientInfo}
                              index={index}
                              cancelReasons={cancelReasons}
                              key={`all-bookings-${index}`}
                              handleDelete={() => deleteAppointment(index)}
                              handleEditNotes={(id, value) => {
                                editNote(id, value)
                              }}
                              handleAppointmentStatus={(id, status) => {
                                updateAppointmentStatus(id, status)
                              }}
                              handleAdjustApptNotification={(
                                id,
                                reminder,
                                requestFeedback
                              ) => {
                                adjustApptNotification(
                                  id,
                                  reminder,
                                  requestFeedback
                                )
                              }}
                              handleCancel={(id, reason, comment) =>
                                handleCancelAppointment(id, reason, comment)
                              }
                              handleEditCancel={handleEditCancelReason}
                            />
                          )
                        }
                        return null
                      })}
                  </div>
                )}
              {appointments.length > 0 &&
                (serviceFilter.length > 0 ||
                  personFilter.length > 0 ||
                  statusFilter.length > 0 ||
                  startDate !== '' ||
                  endDate !== '' ||
                  nowFilter === FilterRadioValue.upcoming ||
                  nowFilter === FilterRadioValue.past) &&
                appointments.map((item, index) => {
                  return renderFilteredItem(item, index)
                })}
              {!loading && appointments.length === 0 && (
                <EmptyPlaceholder
                  icon={<CalendarOutlined style={{ fontSize: '40px' }} />}
                  message={t('client.appointments.all.booking.empty.message')}
                />
              )}
            </div>
            <div className={styles.appointmentTab}>
              {appointments.length > 0 && appointmentTabHeader}
              {isMobile && appointmentsFilterDrawer}
              {loading && renderAppointmentSkeleton()}
              {!loading &&
                appointments.length > 0 &&
                serviceFilter.length === 0 &&
                personFilter.length === 0 &&
                statusFilter.length === 0 &&
                startDate === '' &&
                endDate === '' &&
                nowFilter === FilterRadioValue.none && (
                  <div className={styles.appointmentTabBody}>
                    {appointments
                      .sort((appt1, appt2) => {
                        return (
                          +new Date(appt2.apptDate) - +new Date(appt1.apptDate)
                        )
                      })
                      .map((item, index) => {
                        if (
                          item.isCourse &&
                          item.status !== AppointmentStatus.cancelled
                        ) {
                          return (
                            <ClientAppointmentCard
                              {...item}
                              {...clientInfo}
                              index={index}
                              key={`all-bookings-${index}`}
                              handleDelete={() => deleteAppointment(index)}
                              handleEditNotes={(index, value) =>
                                editNote(index, value)
                              }
                              cancelReasons={cancelReasons}
                              handleAdjustApptNotification={(
                                id,
                                reminder,
                                requestFeedback
                              ) => {
                                adjustApptNotification(
                                  id,
                                  reminder,
                                  requestFeedback
                                )
                              }}
                              handleCancel={(id, reason, comment) =>
                                handleCancelAppointment(id, reason, comment)
                              }
                              handleEditCancel={handleEditCancelReason}
                            />
                          )
                        }
                        return null
                      })}
                  </div>
                )}

              {appointments.length > 0 &&
                (serviceFilter.length > 0 ||
                  personFilter.length > 0 ||
                  statusFilter.length > 0 ||
                  startDate !== '' ||
                  endDate !== '' ||
                  nowFilter === FilterRadioValue.upcoming ||
                  nowFilter === FilterRadioValue.past) &&
                appointments.map((item, index) => {
                  return renderFilteredItem(item, index)
                })}
              {!loading &&
                appointments.filter(
                  (appt) =>
                    appt.isCourse && appt.status !== AppointmentStatus.cancelled
                ).length === 0 && (
                  <EmptyPlaceholder
                    icon={<ScheduleOutlined style={{ fontSize: '40px' }} />}
                    message={t('client.appointments.classes.empty.message')}
                  />
                )}
            </div>
            <div className={styles.appointmentTab}>
              {appointments.length > 0 && appointmentTabHeader}
              {isMobile && appointmentsFilterDrawer}
              {loading && renderAppointmentSkeleton()}
              {!loading &&
                appointments.length > 0 &&
                serviceFilter.length === 0 &&
                personFilter.length === 0 &&
                statusFilter.length === 0 &&
                startDate === '' &&
                endDate === '' &&
                nowFilter === FilterRadioValue.none && (
                  <div className={styles.appointmentTabBody}>
                    {appointments
                      .sort((appt1, appt2) => {
                        return (
                          +new Date(appt2.apptDate) - +new Date(appt1.apptDate)
                        )
                      })
                      .map((item, index) => {
                        if (item.status === AppointmentStatus.cancelled) {
                          return (
                            <ClientAppointmentCard
                              {...item}
                              {...clientInfo}
                              index={index}
                              key={`all-bookings-${index}`}
                              cancelReasons={cancelReasons}
                              handleDelete={() => deleteAppointment(index)}
                              handleEditNotes={(index, value) =>
                                editNote(index, value)
                              }
                              handleAppointmentStatus={(id, status) => {
                                updateAppointmentStatus(id, status)
                              }}
                              handleAdjustApptNotification={(
                                id,
                                reminder,
                                requestFeedback
                              ) => {
                                adjustApptNotification(
                                  id,
                                  reminder,
                                  requestFeedback
                                )
                              }}
                              handleCancel={(id, reason, comment) =>
                                handleCancelAppointment(id, reason, comment)
                              }
                              handleEditCancel={handleEditCancelReason}
                            />
                          )
                        }
                        return null
                      })}
                  </div>
                )}
              {appointments.length > 0 &&
                (serviceFilter.length > 0 ||
                  personFilter.length > 0 ||
                  statusFilter.length > 0 ||
                  startDate !== '' ||
                  endDate !== '' ||
                  nowFilter === FilterRadioValue.upcoming ||
                  nowFilter === FilterRadioValue.past) &&
                appointments.map((item, index) => {
                  return renderFilteredItem(item, index)
                })}
              {!loading &&
                appointments.filter(
                  (appt) => appt.status === AppointmentStatus.cancelled
                ).length === 0 && (
                  <EmptyPlaceholder
                    icon={<CloseCircleOutlined style={{ fontSize: '40px' }} />}
                    message={t('client.appointments.cancelled.empty.message')}
                  />
                )}
            </div>
            <div className={styles.appointmentTab}>
              {appointments.length > 0 && appointmentTabHeader}
              {isMobile && appointmentsFilterDrawer}
              {loading && renderAppointmentSkeleton()}
              {!loading &&
                appointments.length > 0 &&
                serviceFilter.length === 0 &&
                personFilter.length === 0 &&
                statusFilter.length === 0 &&
                startDate === '' &&
                endDate === '' &&
                nowFilter === FilterRadioValue.none && (
                  <div className={styles.appointmentTabBody}>
                    {appointments
                      .sort((appt1, appt2) => {
                        return (
                          +new Date(appt2.apptDate) - +new Date(appt1.apptDate)
                        )
                      })
                      .map((item, index) => {
                        if (item.status === AppointmentStatus.noShow) {
                          return (
                            <ClientAppointmentCard
                              {...item}
                              {...clientInfo}
                              index={index}
                              cancelReasons={cancelReasons}
                              key={`all-bookings-${index}`}
                              handleDelete={() => deleteAppointment(index)}
                              handleEditNotes={(index, value) =>
                                editNote(index, value)
                              }
                              handleAdjustApptNotification={(
                                id,
                                reminder,
                                requestFeedback
                              ) => {
                                adjustApptNotification(
                                  id,
                                  reminder,
                                  requestFeedback
                                )
                              }}
                              handleCancel={(id, reason, comment) =>
                                handleCancelAppointment(id, reason, comment)
                              }
                            />
                          )
                        }
                        return null
                      })}
                  </div>
                )}
              {appointments.length > 0 &&
                (serviceFilter.length > 0 ||
                  personFilter.length > 0 ||
                  statusFilter.length > 0 ||
                  startDate !== '' ||
                  endDate !== '' ||
                  nowFilter === FilterRadioValue.upcoming ||
                  nowFilter === FilterRadioValue.past) &&
                appointments.map((item, index) => {
                  return renderFilteredItem(item, index)
                })}
              {!loading &&
                appointments.filter(
                  (appt) => appt.status === AppointmentStatus.noShow
                ).length === 0 && (
                  <EmptyPlaceholder
                    icon={<UserDeleteImg />}
                    message={t('client.appointments.no.show.empty.message')}
                  />
                )}
            </div>
          </TabMenu>
        </div>
      )}
    </div>
  )
}
