import React, { FC, useState } from 'react'
import moment from 'moment'
import cn from 'classnames'
import {
  Popover,
  Select,
  Form,
  Input,
  Modal,
  Divider,
  Tooltip,
  Badge,
} from 'antd'
import { useTranslation } from 'react-i18next'
import {
  MoreOutlined,
  VideoCameraOutlined,
  MailOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  CalendarOutlined,
  BellOutlined,
  HistoryOutlined,
  CloseOutlined,
  LikeOutlined,
  DeleteOutlined,
  RollbackOutlined,
  EditFilled,
  CopyOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Avatar,
  AvatarList,
  Button,
  ClientAppointmentItem,
  Notification,
  NotificationType,
} from '@pabau/ui'
import SetNotification from './SetNotification'
import styles from './ClientAppointmentCard.module.less'
import { AvatarStatus } from '../avatar/Avatar'
import { ReactComponent as ReinstateIcon } from '../../assets/images/client-card/reinstate-icon.svg'
import { ReactComponent as MedicalHistory } from '../../assets/images/client-card-ops/medical-history.svg'
import { ReactComponent as CheckIcon } from '../../assets/images/client-card/check-badge.svg'

const { Option } = Select
const { TextArea } = Input

export enum AppointmentStatus {
  waiting = 'waiting',
  arrived = 'arrived',
  cancelled = 'cancelled',
  noShow = 'no show',
  complete = 'complete',
  new = 'new',
  inRoom = 'in room',
}

interface AppointmentHandler {
  index: number
  handleDelete: () => void
  handleEditNotes: (index, value) => void
  handleCancel: (index) => void
}

export const ClientAppointmentCard: FC<
  ClientAppointmentItem & AppointmentHandler
> = (props) => {
  const {
    serviceName,
    employee,
    otherEmployees,
    status,
    locationName,
    createdDate,
    apptDate,
    isVirtual,
    remindersSent,
    notes,
    isVideoCall,
    index,
    handleDelete,
    handleEditNotes,
    handleCancel,
  } = props
  const { t } = useTranslation('common')
  const [form] = Form.useForm()
  const [isHover, setIsHover] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [openCancelPopover, setOpenCancelPopover] = useState(false)
  const [openNotificationModal, setOpenNotificationModal] = useState(false)
  const [reminder, setReminder] = useState(false)
  const [requestFeedback, setRequestFeedBack] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [editNote, setEditNote] = useState(notes)
  const joinVideoUrl = 'meet.pabau.com/12r8d'

  const handleReminder = (reminder) => {
    setReminder(reminder)
  }

  const handleRequestFeedback = (requestFeedback) => {
    setRequestFeedBack(requestFeedback)
  }

  const deleteModalTitle = (
    <span>{t('client.appointment.card.pop.delete.appointment')}</span>
  )

  const cancelFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reason: '',
      comment: '',
    },
    validationSchema: Yup.object({
      reason: Yup.string().required('Cancel reason is required!'),
    }),
    onSubmit: (values) => {
      cancelFormik.validateForm().then(() => {
        setOpenPopover(false)
        setOpenCancelPopover(false)
        handleCancel(index)
      })
    },
  })
  const handleChange = (key, value) => {
    cancelFormik.setFieldValue(key, value)
  }
  const opsPopover = (
    <div className={styles.opsPopoverContainer}>
      {isVideoCall === 1 && (
        <>
          <div
            className={styles.opsItemJoinVideo}
            onClick={() => setOpenPopover(false)}
          >
            <div className={styles.icon}>
              <VideoCameraOutlined />
            </div>
            <span>
              {t('client.appointment.card.pop.join.with.pabau.video')}
            </span>
          </div>
          <div className={styles.opsItemJoinVideoUrl}>
            <span>meet.pabau.com/12r8d</span>
            <div className={styles.icon}>
              <CopyOutlined
                onClick={() => {
                  navigator.clipboard.writeText(joinVideoUrl)
                  Notification(
                    NotificationType.success,
                    'Copied URL to clipboard'
                  )
                }}
              />
            </div>
          </div>
          <Divider className={styles.appointmentPopoverDivider} />
        </>
      )}
      {remindersSent && (
        <div className={styles.opsItem} onClick={() => setOpenPopover(false)}>
          <div className={styles.icon}>
            <MailOutlined />
          </div>
          <span>{t('client.appointment.card.pop.resend.confirmation')}</span>
        </div>
      )}
      {status !== AppointmentStatus.cancelled ? (
        <div
          className={styles.opsItem}
          onClick={() => setOpenCancelPopover(true)}
        >
          <div className={styles.icon}>
            <CloseCircleOutlined />
          </div>
          <span>{t('client.appointment.card.pop.cancel')}</span>
        </div>
      ) : (
        <div className={styles.opsItem}>
          <div className={styles.icon}>
            <RollbackOutlined />
          </div>
          <span>{t('client.appointment.card.pop.restore')}</span>
        </div>
      )}
      <div
        className={styles.opsItem}
        onClick={() => {
          setOpenPopover(false)
        }}
      >
        <div className={styles.icon}>
          <ReloadOutlined />
        </div>
        <span>{t('client.appointment.card.pop.rebook')}</span>
      </div>
      <div
        className={styles.opsItem}
        onClick={() => {
          setOpenPopover(false)
        }}
      >
        <div className={styles.icon}>
          <CalendarOutlined />
        </div>
        <span>{t('client.appointment.card.pop.reschedule')}</span>
      </div>
      {!reminder && (
        <div
          className={styles.opsItem}
          onClick={() => {
            setOpenPopover(false)
            setOpenNotificationModal(true)
          }}
        >
          <div className={styles.icon}>
            <BellOutlined />
          </div>
          <span>{t('client.appointment.card.pop.add.Notification')}</span>
        </div>
      )}
      {reminder && (
        <div
          className={styles.opsItem}
          onClick={() => {
            setOpenPopover(false)
            setOpenNotificationModal(true)
          }}
        >
          <div className={styles.icon}>
            <HistoryOutlined />
          </div>
          <span>{t('client.appointment.card.pop.add.24.hours.before')}</span>
        </div>
      )}
      {requestFeedback && (
        <div className={styles.opsItem}>
          <div className={styles.icon}>
            <LikeOutlined />
          </div>
          <span>{t('client.appointment.card.pop.add.immediately.after')}</span>
        </div>
      )}
      {status === AppointmentStatus.cancelled && (
        <div
          className={styles.opsItemRed}
          onClick={() => {
            setOpenPopover(false)
            setDeleteModalVisible(true)
          }}
        >
          <div className={styles.icon}>
            <DeleteOutlined />
          </div>
          <span>{t('client.appointment.card.pop.delete')}</span>
        </div>
      )}
    </div>
  )
  const cancelPopover = (
    <div className={styles.cancelPopover}>
      <div className={styles.header}>
        <span>{t('client.appointment.card.pop.cancel.mark.as.cancelled')}</span>
        <div
          className={styles.close}
          onClick={() => {
            cancelFormik.handleReset(true)
            setOpenCancelPopover(false)
          }}
        >
          <CloseOutlined />
        </div>
      </div>
      <div className={styles.body}>
        <Form form={form} layout="vertical">
          <Form.Item
            label={t('client.appointment.card.pop.cancel.cancel.reson')}
          >
            <Select
              placeholder={t(
                'client.appointment.card.pop.cancel.select.reason'
              )}
              value={cancelFormik.values.reason}
              onSelect={(value) => handleChange('reason', value)}
            >
              <Option value="work">
                {t('client.appointment.card.pop.cancel.reason.work')}
              </Option>
              <Option value="booking-error">
                {t('client.appointment.card.pop.cancel.reason.booking.error')}
              </Option>
              <Option value="changed-mind">
                {t('client.appointment.card.pop.cancel.reason.changed.mind')}
              </Option>
            </Select>
            {cancelFormik.errors.reason && (
              <div className={styles.error}>{cancelFormik.errors.reason}</div>
            )}
          </Form.Item>
          <Form.Item label="Comments (optional)">
            <TextArea
              rows={3}
              value={cancelFormik.values.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
            />
          </Form.Item>
          <div className={styles.manageCancelReason}>
            {t(
              'client.appointment.card.pop.cancel.reason.manage.cancel.reasons'
            )}
            <a href="/">
              {t('client.appointment.card.pop.cancel.reason.company.settings')}
            </a>
          </div>
          <div className={styles.submitButton}>
            <Button
              type="primary"
              danger
              onClick={() => {
                cancelFormik.handleSubmit()
              }}
            >
              {t('client.appointment.card.pop.cancel.appointment')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )

  const textTooltip = (
    <div className={styles.textTooltip}>
      COVID 19 Consent - Completed on: 23/10/2010
    </div>
  )

  return (
    <>
      <div
        className={cn(
          styles.clientAppointmentCard,
          openPopover ? styles.hoverCard : ''
        )}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className={styles.avatarContainer}>
          {(!otherEmployees || otherEmployees?.length === 0) && (
            <Avatar
              active={isVirtual ? AvatarStatus.booking : AvatarStatus.active}
              src={employee.avatar}
              name={employee.name}
              isTooltip={true}
              size={40}
            />
          )}
          {otherEmployees && otherEmployees.length > 0 && (
            <AvatarList
              users={[
                { id: 0, name: employee.name, avatarUrl: employee.avatar },
                ...otherEmployees.map((item, index) => ({
                  id: index + 1,
                  name: item.name,
                  avatarUrl: item.avatar,
                })),
              ]}
            />
          )}
        </div>
        <div className={styles.appointmentContent}>
          <div className={styles.content}>
            <div className={styles.apptDate}>
              <p>{moment(apptDate).format('DD')}</p>
              <p>{moment(apptDate).format('MMM')}</p>
            </div>
            <div className={styles.serviceContent}>
              <div className={styles.serviceLine}>
                {/* <p className={styles.service}>{`${serviceName} with ${
                  employee.name
                }${
                  otherEmployees && otherEmployees.length > 0
                    ? ` +${otherEmployees.length}`
                    : ''
                }`}</p> */}
                <p className={styles.service}>{`${serviceName}`}</p>
                <Tooltip placement="topLeft" title={textTooltip}>
                  <Badge
                    count={<CheckCircleFilled style={{ fontSize: '8px' }} />}
                    offset={[-1, 12]}
                    style={{ color: '#65cd98' }}
                  >
                    <MedicalHistory className={styles.historyIcon} />
                  </Badge>
                </Tooltip>
              </div>
              <p className={styles.locationTime}>{`(${moment(apptDate).format(
                'ddd'
              )}) @ ${moment(apptDate).format('hh:mm')} | ${locationName}`}</p>
            </div>
          </div>
          {notes && (
            <div className={styles.notesWrapper}>
              {!showNoteEditor && (
                <div className={styles.notes}>
                  <div>{notes}</div>
                </div>
              )}
              {showNoteEditor ? (
                <div className={styles.noteEditor}>
                  <textarea
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                  />
                  <div className={styles.noteEditorButtonWrapper}>
                    <Button
                      size="small"
                      onClick={() => {
                        setShowNoteEditor(false)
                        handleEditNotes(index, editNote)
                      }}
                    >
                      {t('client.appointment.card.description.save')}
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setShowNoteEditor(false)}
                    >
                      {t('client.appointment.card.description.cancel')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.addDescriptionNotice}
                  onClick={() => setShowNoteEditor(true)}
                >
                  <span>{notes}</span>
                  <EditFilled />
                </div>
              )}
            </div>
          )}
          {!notes && (
            <div className={styles.newNotesWrapper}>
              {!showNoteEditor && (
                <div
                  className={styles.addDescriptionNotice}
                  onClick={() => setShowNoteEditor(true)}
                >
                  <span>Add description</span>
                  <EditFilled />
                </div>
              )}
              {showNoteEditor && (
                <div className={styles.noteEditor}>
                  <textarea
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                  />
                  <div className={styles.noteEditorButtonWrapper}>
                    <Button
                      size="small"
                      onClick={() => {
                        setShowNoteEditor(false)
                        handleEditNotes(index, editNote)
                      }}
                    >
                      {t('client.appointment.card.description.save')}
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setShowNoteEditor(false)}
                    >
                      {t('client.appointment.card.description.cancel')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.statusContainer}>
          {!isHover && !openPopover && (
            <div className={styles.status}>
              {createdDate < moment().format() &&
                moment().diff(moment(createdDate), 'hours') < 24 &&
                displayStatusLabel(AppointmentStatus.new)}
              {status === AppointmentStatus.cancelled &&
                displayStatusLabel(AppointmentStatus.cancelled)}
              {status === AppointmentStatus.noShow &&
                displayStatusLabel(AppointmentStatus.noShow)}
            </div>
          )}
          {(isHover || openPopover) && (
            <>
              {status === AppointmentStatus.cancelled && (
                <div className={styles.reinstateButton}>
                  <ReinstateIcon />
                  <span>{t('client.appointment.card.reinstate.button')}</span>
                </div>
              )}
              <Popover
                content={openCancelPopover ? cancelPopover : opsPopover}
                trigger="click"
                overlayClassName={styles.opsPopover}
                placement="bottomRight"
                visible={openPopover}
                onVisibleChange={(visible) => {
                  setOpenPopover(visible)
                  setOpenCancelPopover(false)
                  cancelFormik.handleReset(true)
                }}
                getPopupContainer={(trigger) =>
                  trigger.parentElement as HTMLElement
                }
              >
                <div
                  className={styles.ops}
                  onClick={() => setOpenPopover(true)}
                >
                  <MoreOutlined />
                </div>
              </Popover>
            </>
          )}
        </div>
      </div>
      <SetNotification
        visible={openNotificationModal}
        onClose={() => setOpenNotificationModal(false)}
        reminder={reminder}
        requestFeedback={requestFeedback}
        handleReminder={(reminder) => handleReminder(reminder)}
        handleRequestFeedback={(reminder) => handleRequestFeedback(reminder)}
      />
      <Modal
        visible={deleteModalVisible}
        title={deleteModalTitle}
        centered
        footer={false}
        width={384}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <div className={styles.modalContainer}>
          <div className={styles.confirmButtonContainer}>
            <Button
              type="primary"
              danger
              onClick={() => {
                setDeleteModalVisible(false)
                handleDelete()
              }}
            >
              {t('client.appointment.card.delete.yes.button')}
            </Button>
            <Button type="primary" onClick={() => setDeleteModalVisible(false)}>
              {t('client.appointment.card.delete.no.button')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export const displayStatusLabel = (
  status: string,
  select = false
): React.ReactNode => {
  if (status === AppointmentStatus.cancelled) {
    return (
      <Badge
        color="#00000000"
        count={select ? <CheckIcon /> : null}
        offset={[0, 0]}
      >
        <span
          className={
            select
              ? `${styles.commonStatusLabel} ${styles.selectedStatusLabel} ${styles.cancelledLabel}`
              : `${styles.commonStatusLabel} ${styles.cancelledLabel}`
          }
        >
          {AppointmentStatus.cancelled}
        </span>
      </Badge>
    )
  } else if (status === AppointmentStatus.new) {
    return (
      <Badge
        color="#00000000"
        count={select ? <CheckIcon /> : null}
        offset={[0, 0]}
      >
        <span
          className={
            select
              ? `${styles.commonStatusLabel} ${styles.selectedStatusLabel} ${styles.newLabel}`
              : `${styles.commonStatusLabel} ${styles.newLabel}`
          }
        >
          {AppointmentStatus.new}
        </span>
      </Badge>
    )
  } else if (status === AppointmentStatus.noShow) {
    return (
      <Badge
        color="#00000000"
        count={select ? <CheckIcon /> : null}
        offset={[0, 0]}
      >
        <span
          className={
            select
              ? `${styles.commonStatusLabel} ${styles.selectedStatusLabel} ${styles.noShowLabel}`
              : `${styles.commonStatusLabel} ${styles.noShowLabel}`
          }
        >
          {AppointmentStatus.noShow}
        </span>
      </Badge>
    )
  } else if (status === AppointmentStatus.waiting) {
    return (
      <Badge
        color="#00000000"
        count={select ? <CheckIcon /> : null}
        offset={[0, 0]}
      >
        <span
          className={
            select
              ? `${styles.commonStatusLabel} ${styles.selectedStatusLabel} ${styles.waitingLabel}`
              : `${styles.commonStatusLabel} ${styles.waitingLabel}`
          }
        >
          {AppointmentStatus.waiting}
        </span>
      </Badge>
    )
  } else if (status === AppointmentStatus.arrived) {
    return (
      <Badge
        color="#00000000"
        count={select ? <CheckIcon /> : null}
        offset={[0, 0]}
      >
        <span
          className={
            select
              ? `${styles.commonStatusLabel} ${styles.selectedStatusLabel} ${styles.arrivedLabel}`
              : `${styles.commonStatusLabel} ${styles.arrivedLabel}`
          }
        >
          {AppointmentStatus.arrived}
        </span>
      </Badge>
    )
  } else if (status === AppointmentStatus.inRoom) {
    return (
      <Badge
        color="#00000000"
        count={select ? <CheckIcon /> : null}
        offset={[0, 0]}
      >
        <span
          className={
            select
              ? `${styles.commonStatusLabel} ${styles.selectedStatusLabel} ${styles.inRoomLabel}`
              : `${styles.commonStatusLabel} ${styles.inRoomLabel}`
          }
        >
          {AppointmentStatus.inRoom}
        </span>
      </Badge>
    )
  }
  return null
}

export default ClientAppointmentCard
