import React, { FC, useEffect, useState } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import {
  PrinterOutlined,
  EyeOutlined,
  PaperClipOutlined,
  FileImageFilled,
  FileFilled,
  EditOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  SwitcherOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'
import { Popover, Tooltip, Drawer, Pagination } from 'antd'
import styles from './CommunicationTimeline.module.less'
import { groupByDay } from './utils'
import dayjs from 'dayjs'
import {
  Button,
  Avatar,
  DotButton,
  Epaper,
  FullScreenReportModal,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import calendar from 'dayjs/plugin/calendar'
import { useMedia } from 'react-use'

import { ReactComponent as LetterIcon } from '../../assets/images/timeline/letter-icon.svg'
import { ReactComponent as MailIcon } from '../../assets/images/timeline/mail-icon.svg'
import { ReactComponent as SmsIcon } from '../../assets/images/timeline/sms-icon.svg'
import { ReactComponent as CallIcon } from '../../assets/images/timeline/call-icon.svg'
import { ReactComponent as CollapseIcon } from '../../assets/images/timeline/collpase-icon.svg'
import { ReactComponent as MobileSmsIcon } from '../../assets/images/timeline/mobile-sms.svg'
import { ReactComponent as MailOutlineIcon } from '../../assets/images/timeline/mail-outline.svg'
import { ReactComponent as VoiceIcon } from '../../assets/images/timeline/voice.svg'
import { ReactComponent as ReplayIcon } from '../../assets/images/timeline/replay-icon.svg'
import { ReactComponent as ForwardIcon } from '../../assets/images/timeline/forward-icon.svg'
import TimelineSkeleton from './CommunicationSkeleton'
import dynamic from 'next/dynamic'
import { getImage } from '../../helper/uploaders/UploadHelpers'
import ReactHtmlParser from 'react-html-parser'
import {
  transform,
  checkIsDocx,
  getDocumentURL,
} from '../../helper/CommunicationHelper'
dayjs.extend(calendar)

export interface CommunicationTimelineProps {
  eventsData: EventsDataProps[]
  eventDateFormat: string
  isLoading?: boolean
  pagination?: CommunicationPaginationType
  setPagination?: (e: CommunicationPaginationType) => void
}
export interface CommunicationPaginationType {
  total?: number
  limit?: number
  offSet?: number
  currentPage?: number
}
interface ClientDetailProps {
  name?: string
  createdAt?: string
}

interface OpenByProps {
  firstName?: string
  lastName?: string
}

interface SharedByProps {
  firstName?: string
  lastName?: string
}

interface MovedProps {
  from?: ClientDetailProps
  to?: ClientDetailProps
}

export interface EventsDataProps {
  id: number
  type: string
  eventName?: string
  clientName?: string
  description?: string
  dateTime: string
  status?: string
  appointmentWith?: string
  openedBy?: OpenByProps[]
  numberOfOpened?: string
  moved?: MovedProps
  displayCollapse?: boolean
  pinItems?: PinItemProps[]
  audioFile?: string
  sharedWith?: SharedByProps[]
  authorName?: string
  letterUrl?: string
  isReceived?: boolean
}

export interface PinItemProps {
  item?: string
}

const statuses = {
  awaitingReview: 'Awaiting review',
  awaitingCorrection: 'Awaiting Correction',
  failed: 'Failed',
  completed: 'Completed',
}

const types = {
  mail: 'email',
  sms: 'sms',
  letter: 'letter',
  call: 'call',
  voice: 'voice',
}

const headerFilter = {
  all: 'All',
  mail: 'mail',
  sms: 'sms',
  letter: 'letter',
  call: 'call',
  voice: 'voice',
}

// const Waveform = dynamic(() => import('./WaveForm'), {
//   ssr: false,
// })

export const CommunicationTimeline: FC<CommunicationTimelineProps> = ({
  eventsData,
  eventDateFormat,
  isLoading,
  pagination,
  setPagination,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 768px)')
  const [events, setEvents] = useState<EventsDataProps[]>([])
  const [filteredEvents, setFilteredEvents] = useState<EventsDataProps[]>([])
  const [collapseEvent, setCollapseEvent] = useState({})
  const [isDocFile, setIsDocFile] = useState(false)
  const [letterUrl, setLetterUrl] = useState<string>()
  const [selectedFilter, setSelectedFilter] = useState(
    Object.values(headerFilter)
  )
  const [paginateData, setPaginateData] = useState({
    total: pagination?.total ?? 0,
    offset: pagination?.offSet ?? 0,
    pageSize: pagination?.limit ?? 50,
    currentPage: pagination?.currentPage ?? 1,
  })

  const options = {
    decodeEntities: true,
    transform,
  }
  const { days = [], eventsByDay } = groupByDay(
    !pagination
      ? filteredEvents.slice(
          paginateData.offset,
          paginateData.currentPage * paginateData.pageSize
        )
      : filteredEvents,
    'MM-DD-YYYY hh:mm',
    t
  )
  const [showDocumentViewer, setShowDocumentViewer] = useState<boolean>(false)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  const onSetNumPages = (page: number) => {
    setPageNumber(page)
  }
  const onPageChange = (currentPage, size) => {
    const offset = paginateData.pageSize * (currentPage - 1)
    setPagination?.({
      ...pagination,
      offSet: offset,
      currentPage: currentPage,
      limit: size,
    })
    setPaginateData((d) => ({ ...d, offset, currentPage, pageSize: size }))
  }
  useEffect(() => {
    if (eventsData) {
      setEvents(
        eventsData.sort((a, b) => {
          return (
            dayjs(b.dateTime, eventDateFormat).valueOf() -
            dayjs(a.dateTime, eventDateFormat).valueOf()
          )
        })
      )
    }
  }, [eventsData, eventDateFormat])

  useEffect(() => {
    let filterEvents = [...events]
    if (selectedFilter.includes(headerFilter.all)) {
      filterEvents = [...filterEvents]
    } else {
      filterEvents = filterEvents.filter((data) => {
        return selectedFilter.includes(data.type)
      })
    }
    setFilteredEvents(filterEvents)
    setPaginateData((d) => ({
      ...d,
      currentPage: pagination?.currentPage ?? 1,
      offset: pagination?.offSet ?? 0,
      total: pagination?.total ?? filterEvents?.length,
    }))
  }, [events, selectedFilter, pagination])

  const handleCollapse = (event) => {
    setCollapseEvent((e) => ({
      [`event_${event.id}`]: collapseEvent?.[`event_${event.id}`]
        ? !collapseEvent?.[`event_${event.id}`]
        : true,
    }))
    if (event.letterUrl && !collapseEvent?.[`event_${event.id}`]) {
      setLetterUrl(event.letterUrl ?? undefined)
      setShowDocumentViewer((e) => !e)
    } else {
      setLetterUrl('')
    }
  }

  const timeFormat = (date) => {
    const standardDateFormat = dayjs(date, eventDateFormat)
    if (
      dayjs(standardDateFormat) < dayjs().subtract(6, 'days') ||
      dayjs(standardDateFormat) > dayjs().add(6, 'days')
    ) {
      return dayjs(date).format(eventDateFormat)
    }
    return dayjs(date, eventDateFormat).calendar()
  }

  const renderStatusColor = (status) => {
    switch (status) {
      case statuses.awaitingReview:
        return {
          color: '#54B2D3',
          background: 'rgba(84, 178, 211, 0.05)',
        }
      case statuses.awaitingCorrection:
        return {
          color: '#FAAD14',
          background: 'rgba(250, 173, 20, 0.05)',
        }
      case statuses.completed:
        return {
          color: '#65CD98',
          background: 'rgba(101, 205, 152, 0.05)',
        }
      case statuses.failed:
        return {
          color: '#F6434D',
          background: '#FFF3F2',
        }
      default:
        return {
          color: '#65CD98',
          background: 'rgba(101, 205, 152, 0.05)',
        }
    }
  }

  const renderStatus = (status) => {
    const { color, background } = renderStatusColor(status)
    return (
      <Button
        style={{ borderColor: color, color: color }}
        backgroundColor={background}
        className={styles.statusButtonClass}
      >
        {status}
      </Button>
    )
  }

  const renderEvent = (event) => {
    const content = (items) => {
      return (
        <div className={styles.eyeWrap}>
          {items.map((data, index) => {
            const { firstName } = data
            return (
              <Avatar
                size="small"
                className={styles.avatarIcon}
                key={index}
                name={firstName}
              />
            )
          })}
        </div>
      )
    }

    const renderSpecificIcon = (event) => {
      const { type } = event
      switch (type) {
        case types.letter:
          return (
            <div className={styles.wrapIcon}>
              <span className={styles.dot} />
              <PrinterOutlined />
            </div>
          )
      }
    }

    const renderAttachmentIcon = (item = '') => {
      const data = item.split('.')
      const extension = data[data.length - 1]
      switch (extension) {
        case 'pdf':
          return <FileFilled />
        case 'jpeg':
        case 'jpg':
          return <FileImageFilled />
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

    const openFile = (url) => {
      if (checkIsDocx(url)) {
        window.open(getDocumentURL(getImage(url)), '_blank')
      } else {
        window.open(getImage(url), '_blank')
      }
    }
    const pinPopoverContent = (items = []) => {
      return (
        <div className={styles.feedbackPopUp}>
          {items?.map((item: PinItemProps, index) => {
            return (
              <div
                className={styles.feedWrap}
                key={index}
                onClick={() => openFile(item?.item)}
              >
                <span className={styles.iconWrap}>
                  {renderAttachmentIcon(item?.item)}
                </span>
                <h5>{getFilename(item?.item)}</h5>
              </div>
            )
          })}
        </div>
      )
    }

    const RenderPinIcon = ({ event }) => {
      const [visible, setVisible] = useState(false)

      const toggleVisible = () => {
        setVisible((e) => !e)
      }

      return (
        <>
          <Popover
            content={() => pinPopoverContent(event?.pinItems)}
            trigger="click"
            visible={visible && !isMobile}
            onVisibleChange={(val) => setVisible(val)}
            placement={'bottomRight'}
            overlayClassName={styles.wrapPopover}
          >
            <div>
              {event?.pinItems?.length > 0 && (
                <div className={styles.pinWrap}>
                  <Button
                    className={classNames(styles.pinButtonClass, {
                      [styles.activePin]: visible,
                    })}
                    icon={<PaperClipOutlined />}
                  >
                    {event?.pinItems?.length}
                  </Button>
                </div>
              )}
            </div>
          </Popover>
          {isMobile && (
            <Drawer
              title={t('communicationTimeline.pin.drawer.title')}
              placement={'bottom'}
              closable={false}
              className={styles.pinMobileDrawer}
              onClose={toggleVisible}
              visible={visible}
              key={'bottom'}
            >
              <span className={styles.line}></span>
              {pinPopoverContent(event?.pinItems)}
            </Drawer>
          )}
        </>
      )
    }

    const RenderInboundEmail = ({ event }) => {
      const [visible, setVisible] = useState(false)

      const inboundEmailContent = () => {
        return (
          <div className={styles.inboundEmailContent}>
            <div>
              <ReplayIcon />
              <p>{t('communicationTimeline.inboundEmail.replay')}</p>
            </div>
            <div>
              <ForwardIcon />
              <p>{t('communicationTimeline.inboundEmail.forward')}</p>
            </div>
            <div>
              <p className={styles.deleteTxt}>
                {t('communicationTimeline.inboundEmail.delete')}
              </p>
            </div>
          </div>
        )
      }

      return (
        <div className={styles.inboundEmailWrap}>
          <div className={styles.leftButton}>
            <ReplayIcon />
          </div>
          <div className={styles.rightButton}>
            <Popover
              content={() => inboundEmailContent()}
              trigger="click"
              visible={visible && !isMobile}
              onVisibleChange={(val) => setVisible(val)}
              placement={'bottomRight'}
            >
              <CaretDownOutlined />
            </Popover>
          </div>
        </div>
      )
    }

    const { menuList = [] } = renderMenu(event)
    return (
      <div className={styles.followContent}>
        <div className={styles.boxText}>
          <div className={styles.taskContent}>
            <h4>{event.eventName}</h4>
          </div>
          <div className={styles.timeWrap}>
            {!isMobile && <RenderPinIcon event={event} />}
            {event.status && !isMobile && (
              <div className={styles.statusWrap}>
                {renderStatus(event.status)}
              </div>
            )}
            {event?.displayCollapse && (
              <Tooltip
                title={
                  collapseEvent?.[`event_${event.id}`]
                    ? t('communicationTimeline.collapse.title')
                    : t('communicationTimeline.expand.title')
                }
              >
                <span
                  className={classNames(styles.statusClass, {
                    [styles.activeCollapse]:
                      collapseEvent?.[`event_${event.id}`],
                  })}
                >
                  <CollapseIcon
                    className={styles.circleIcon}
                    onClick={() => handleCollapse(event)}
                  />
                </span>
              </Tooltip>
            )}
            {event.type.toLocaleLowerCase() === types.mail && event.isReceived && (
              <div className={styles.inboundEmailWrapper}>
                <RenderInboundEmail event={event} />
              </div>
            )}
            {menuList.length > 0 && <DotButton menuList={menuList} />}
          </div>
        </div>
        <div className={styles.lineWrap}>
          {isMobile && <RenderPinIcon event={event} />}
          {event.status && isMobile && (
            <div className={styles.statusWrap}>
              {renderStatus(event.status)}
            </div>
          )}
          <div className={styles.time}>{timeFormat(event.dateTime)}</div>
          {event.authorName && (
            <div className={styles.clientNameText}>
              <span className={styles.dot} />
              <span>{event.authorName}</span>
            </div>
          )}
          {event.moved.from.name && event.moved.to.name && (
            <div className={styles.clientNameText}>
              <span className={styles.dot} />
              <span>
                {t('communicationTimeline.from')}: {event.moved.from.name}
              </span>
              <span className={styles.arrowWrap}>{` ${String.fromCodePoint(
                Number.parseInt('2192', 16)
              )} `}</span>
              <span>
                {t('communicationTimeline.to')}: {event.moved.to.name}
              </span>
            </div>
          )}
          {
            <div className={styles.specificIcon}>
              {renderSpecificIcon(event)}
            </div>
          }
          {event?.numberOfOpened && (
            <div className={styles.openByWrap}>
              <span className={styles.dot} />
              {/* <Popover
                overlayClassName={styles.mailOpen}
                title={t('communicationTimeline.openedBy')}
                content={() => content(event?.openedBy)}
                trigger="hover" 
              >*/}
              <div className={styles.opened}>
                <EyeOutlined />
                <span>
                  {`${event?.numberOfOpened} ${t(
                    'communicationTimeline.opened'
                  )}`}
                </span>
              </div>
              {/*  </Popover> */}
            </div>
          )}
          {event?.sharedWith?.length > 0 && (
            <>
              <span className={styles.dot} />
              <div className={styles.customEye}>
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
              </div>
            </>
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
            {/* <h5>{event.description}</h5> */}
            <div className={styles.dangerousWrapper}>
              {ReactHtmlParser(event.description, options)}
            </div>
          </span>
        )}
        {event.audioFile && event.type === types.voice && (
          <div>{/* <Waveform audioFile={event.audioFile} /> */}</div>
        )}
        <div className={styles.clientNameWrap}>
          <div className={styles.clientNameText}>{event.clientName}</div>
        </div>
      </div>
    )
  }

  const renderIcon = (type) => {
    switch (type) {
      case types.mail:
        return { icon: <MailIcon />, color: '#5F37B6' }
      case types.sms:
        return { icon: <SmsIcon />, color: '#5F37B6' }
      case types.letter:
        return { icon: <LetterIcon />, color: '#5F37B6' }
      case types.call:
        return { icon: <CallIcon />, color: '#5F37B6' }
      case types.voice:
        return { icon: <VoiceIcon />, color: '#5F37B6' }
      default:
        return { icon: null, color: '#5F37B6' }
    }
  }

  const handleHeaderIconClick = (value) => {
    let filterTabs = [...selectedFilter]
    const index = filterTabs.indexOf(value)
    if (value === headerFilter.all) {
      filterTabs = index === -1 ? Object.values(headerFilter) : []
    } else {
      index === -1 ? filterTabs.push(value) : filterTabs.splice(index, 1)
      if (
        filterTabs.includes(headerFilter.mail) &&
        filterTabs.includes(headerFilter.call) &&
        filterTabs.includes(headerFilter.sms) &&
        filterTabs.includes(headerFilter.letter) &&
        filterTabs.includes(headerFilter.voice)
      ) {
        !filterTabs.includes(headerFilter.all) &&
          filterTabs.push(headerFilter.all)
      } else {
        const allIndex = filterTabs.indexOf(headerFilter.all)
        allIndex > -1 && filterTabs.splice(allIndex, 1)
      }
    }
    setSelectedFilter(filterTabs)
  }

  const menuItems = {
    edit: {
      key: 1,
      icon: <EditOutlined />,
      label: t('communicationTimeline.dotMenu.edit'),
    },
    delete: {
      key: 2,
      icon: <DeleteOutlined />,
      label: t('communicationTimeline.dotMenu.delete'),
    },
    share: {
      key: 3,
      icon: <ShareAltOutlined />,
      label: t('communicationTimeline.dotMenu.share'),
    },
    print: {
      key: 4,
      icon: <PrinterOutlined />,
      label: t('communicationTimeline.dotMenu.print'),
    },
    cancel: {
      key: 5,
      icon: <CloseCircleOutlined />,
      label: t('communicationTimeline.dotMenu.cancel'),
    },
    retry: {
      key: 6,
      icon: <ReloadOutlined />,
      label: t('communicationTimeline.dotMenu.retry'),
    },
    duplicate: {
      key: 7,
      icon: <SwitcherOutlined />,
      label: t('communicationTimeline.dotMenu.duplicate'),
    },
  }

  const contentMenuItems = (menus: string[] = []) => {
    const menuList = menus.map((menu) => {
      return menuItems[menu]
    })
    return menuList
  }

  const renderMenu = (event) => {
    if (
      dayjs(event.dateTime, eventDateFormat) > dayjs() &&
      (event.type === types.mail || event.type === types.sms)
    ) {
      return {
        menuList: contentMenuItems(['cancel']),
      }
    }
    switch (event.type) {
      case types.mail:
        return {
          menuList: contentMenuItems(['delete']),
        }
      case types.sms:
        return {
          menuList:
            event.status !== statuses.failed
              ? contentMenuItems(['delete'])
              : contentMenuItems(['delete', 'retry']),
        }
      case types.letter:
        return {
          menuList: contentMenuItems(['edit', 'share', 'duplicate', 'delete']),
        }
      case types.voice:
        return {
          menuList: contentMenuItems(['edit', 'delete']),
        }
      case types.call:
        return {
          menuList: contentMenuItems(['delete']),
        }
      default:
        return {
          menuList: [],
        }
    }
  }

  return (
    <div className={styles.followWrapper}>
      {showDocumentViewer && (
        <FullScreenReportModal
          className={styles.modalPreview}
          visible={showDocumentViewer}
          isDocFileOpen={isDocFile}
          title={''}
          footer={false}
          onBackClick={() => setShowDocumentViewer(false)}
          onClose={() => setShowDocumentViewer(false)}
        >
          <div className={styles.documentViewerWrapper}>
            <div className={styles.documentWrapper}>
              <Epaper
                title={''}
                pdfURL={letterUrl}
                numPages={numPages}
                pageNumber={pageNumber}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
                onSetNumPages={onSetNumPages}
              />
            </div>
          </div>
        </FullScreenReportModal>
      )}
      <div className={styles.headerLian}>
        <div className={styles.header}>
          <div className={styles.iconGroup}>
            <div className={styles.headerIconWrap}>
              <Button
                onClick={() => handleHeaderIconClick(headerFilter.all)}
                className={classNames({
                  [styles.active]: selectedFilter.includes(headerFilter.all),
                })}
              >
                {t('communicationTimeline.header.all')}
              </Button>
            </div>
            {[
              {
                icon: <MobileSmsIcon />,
                tooltip: t('communicationTimeline.header.sms'),
                value: headerFilter.sms,
              },
              {
                icon: <LetterIcon />,
                tooltip: t('communicationTimeline.header.letter'),
                value: headerFilter.letter,
              },
              {
                icon: <CallIcon />,
                tooltip: t('communicationTimeline.header.call'),
                value: headerFilter.call,
              },
              {
                icon: <MailOutlineIcon />,
                tooltip: t('communicationTimeline.header.mail'),
                value: headerFilter.mail,
              },
              {
                icon: <VoiceIcon />,
                tooltip: t('communicationTimeline.header.voice'),
                value: headerFilter.voice,
              },
            ].map(({ icon, tooltip, value }, i) => {
              return (
                <div key={i} className={styles.headerIconWrap}>
                  <Tooltip title={tooltip}>
                    <Button
                      icon={icon}
                      onClick={() => handleHeaderIconClick(value)}
                      className={classNames({
                        [styles.active]: selectedFilter.includes(value),
                      })}
                    ></Button>
                  </Tooltip>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={styles.timelineWrap}>
        <div className="vertical-timeline-element--work">
          {isLoading ? (
            <TimelineSkeleton />
          ) : (
            <div className={styles.contentWrapper}>
              {filteredEvents.length === 0 ? (
                <div className={styles.emptyEvents}>
                  {t('communicationTimeline.filter.noEvent')}
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
                              day === t('communicationTimeline.status.done')
                                ? 'pointer'
                                : 'default',
                          }}
                        >
                          {day}
                        </p>
                      </div>
                      <VerticalTimeline layout={'1-column-left'}>
                        {eventsByDay?.[day].map((event, index) => {
                          const { icon, color } = renderIcon(event.type)
                          return (
                            <VerticalTimelineElement
                              key={index}
                              className={'vertical-timeline-element--work'}
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
        <div className={styles.customPage}>
          <Pagination
            defaultCurrent={1}
            current={paginateData.currentPage}
            pageSize={paginateData.pageSize}
            onChange={(page, size) => onPageChange(page, size)}
            total={paginateData?.total}
          />
        </div>
      </div>
    </div>
  )
}

export default CommunicationTimeline
