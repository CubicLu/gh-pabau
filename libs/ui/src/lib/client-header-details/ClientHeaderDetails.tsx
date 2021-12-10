import React, { FC, useState, useRef, useEffect } from 'react'
import {
  CheckCircleFilled,
  EyeOutlined,
  EditOutlined,
  ShareAltOutlined,
  HistoryOutlined,
  FormOutlined,
  DeleteOutlined,
  SaveOutlined,
  UndoOutlined,
  PlusOutlined,
  CloseCircleFilled,
  BellOutlined,
  InfoCircleFilled,
  InfoOutlined,
} from '@ant-design/icons'
import {
  TabMenu,
  Avatar,
  Button,
  ClientData,
  MyLottie,
  BasicModal as Modal,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { Popover, Tooltip, Badge, Input, Skeleton, Button as Btn } from 'antd'
import { useMedia } from 'react-use'
import { ReactComponent as MedicalHistory } from '../../assets/images/client-card-ops/medical-history.svg'
import { ReactComponent as Note } from '../../assets/images/client-card-ops/note.svg'
import { ReactComponent as Alert } from '../../assets/images/client-card-ops/alert.svg'
import {
  ClientNotes,
  ClientNoteDetails,
  ClientAppointmentDetails,
  StaffAlerts,
  MedicalHistoryDetails,
} from '../client-card/ClientCard'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getImage } from '../../helper/uploaders/UploadHelpers'
import medicalShield from '../../assets/lottie/medical-shield.json'
import ClassNames from 'classnames'
import styles from './ClientHeaderDetails.module.less'
dayjs.extend(utc)
dayjs.extend(relativeTime)
const { TextArea } = Input

export interface ClientHeaderDetailsProps {
  notes?: ClientNotes
  staffAlerts?: StaffAlerts
  medicalHistoryDetails?: MedicalHistoryDetails
  userId?: number
  getContactDetails?: () => void
  getStaffAlertDetails?: () => void
  client?: ClientData
  handleAddNewClientNote?: (e: string) => void
  handleEditNote?: (id: number, e: string) => void
  handleDeleteNote?: (id: number | string) => void
  handleAddAlert?: (e: string) => void
  handleEditAlert?: (
    id: number | string,
    e: string,
    val: number | string
  ) => void
  handleDeleteAlert?: (id: number | string) => void
  deleteAlertLoading?: boolean
}

interface ClientCountDetails {
  notes: number
  staff: number
}

interface StaffAlertDetails {
  id: number | string | undefined
  newAlert: string
  ownerId: number | string | undefined
}

interface DeleteItemType {
  note: boolean
  staffAlert: boolean
}

export const ClientHeaderDetails: FC<ClientHeaderDetailsProps> = ({
  notes = { notes: [], count: 0, loading: false, appointments: [] },
  staffAlerts = { alerts: [], count: 0, loading: false },
  medicalHistoryDetails,
  userId,
  getContactDetails,
  getStaffAlertDetails,
  client,
  handleAddNewClientNote,
  handleEditNote,
  handleDeleteNote,
  handleAddAlert,
  handleEditAlert,
  handleDeleteAlert,
  deleteAlertLoading,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const formLastUpdated = medicalHistoryDetails?.formLastUpdatedDate
    ? dayjs().diff(medicalHistoryDetails?.formLastUpdatedDate, 'day')
    : undefined
  const clientNotePopoverRef = useRef<HTMLDivElement>(null)
  const [noteItems, setNoteItems] = useState<ClientNoteDetails[]>([])
  const [appointmentItems, setAppointmentItems] = useState<
    ClientAppointmentDetails[] | undefined
  >([])
  const [currentClientNote, setCurrentClientNote] = useState(-1)
  const [alertItems, setAlertItems] = useState<ClientNoteDetails[]>([])
  const [currentNote, setCurrentNote] = useState('')
  const [note, setNote] = useState('')
  const [newAlert, setNewAlert] = useState<StaffAlertDetails>({
    id: 0,
    newAlert: '',
    ownerId: 0,
  })
  const [activeAlert, setActiveAlert] = useState<number | string | undefined>(0)
  const [countDetails, setCountDetails] = useState<ClientCountDetails>({
    notes: 0,
    staff: 0,
  })
  const [openPopover, setOpenPopover] = useState<DeleteItemType>({
    note: false,
    staffAlert: false,
  })
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [deleteItemId, setDeleteItemId] = useState<number | string | null>(null)

  const activeItem = Object.keys(openPopover).find(
    (i) => openPopover[i] === true
  )
  useEffect(() => {
    setNoteItems(notes?.notes)
    setAppointmentItems(notes?.appointments)
    setOpenDeleteModal(false)
    if (notes?.count)
      setCountDetails((item) => {
        return { ...item, notes: notes?.count }
      })
  }, [notes])

  useEffect(() => {
    setAlertItems(staffAlerts?.alerts)
    setOpenDeleteModal(false)
    if (staffAlerts?.count)
      setCountDetails((item) => {
        return { ...item, staff: staffAlerts?.count }
      })
  }, [staffAlerts])

  const handleAddNote = (e) => {
    e.preventDefault()
    if (note !== '') {
      setNote('')
      handleAddNewClientNote?.(note)
    }
  }

  const handleEditClientNote = (id) => {
    handleEditNote?.(id, currentNote)
    setCurrentNote('')
    setCurrentClientNote(-1)
  }

  const handleDeleteClientNote = (id) => {
    setDeleteItemId(id)
    setCurrentNote('')
    setCurrentClientNote(-1)
    setOpenDeleteModal((e) => !e)
  }

  const handleAddStaffAlert = (e) => {
    e.preventDefault()
    if (newAlert?.newAlert !== '') {
      setNewAlert((val) => {
        return { ...val, newAlert: '' }
      })
      handleAddAlert?.(newAlert.newAlert)
    }
  }

  const handleEditStaffAlert = (e) => {
    e.preventDefault()
    if (newAlert?.newAlert !== '') {
      setNewAlert((val) => {
        return { ...val, newAlert: '' }
      })
      newAlert?.id &&
        newAlert?.ownerId &&
        handleEditAlert?.(newAlert.id, newAlert.newAlert, newAlert.ownerId)
    }
  }

  const handleDeleteStaffAlert = (id) => {
    setDeleteItemId(id)
    setOpenDeleteModal((e) => !e)
  }

  const handleDeleteSubmit = (e) => {
    if (deleteItemId)
      switch (e) {
        case 'note':
          handleDeleteNote?.(deleteItemId)
          setOpenDeleteModal(false)
          break
        case 'staffAlert':
          handleDeleteAlert?.(deleteItemId)
          break
      }
  }

  const handleAlertPopoverVisible = (val: boolean) => {
    if (!openDeleteModal) {
      setActiveAlert(0)
      setOpenPopover((e) => {
        return { ...e, staffAlert: val }
      })
      setNewAlert({
        id: 0,
        newAlert: '',
        ownerId: 0,
      })
    }
  }

  const handleAlertMutation = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    newAlert?.id ? handleEditStaffAlert(e) : handleAddStaffAlert(e)
  }

  const getMedicalhistoryIcon = () => {
    switch (medicalHistoryDetails?.status) {
      case 'not_completed':
        return <CloseCircleFilled style={{ color: '#ec6669' }} />
      case 'completed':
        return formLastUpdated !== null &&
          formLastUpdated !== undefined &&
          formLastUpdated > 180 ? (
          <div className={styles.toBeCompletedIcon}>
            <InfoOutlined style={{ color: '#fff' }} />
          </div>
        ) : (
          <CheckCircleFilled style={{ color: '#65cd98' }} />
        )
      case 'to_be_completed':
        return (
          <div className={styles.toBeCompletedIcon}>
            <HistoryOutlined style={{ color: '#fff' }} />
          </div>
        )
    }
  }

  const handleMedicalHistoryPopoverContent = () => {
    switch (medicalHistoryDetails?.status) {
      case 'not_completed':
      case 'to_be_completed':
        return medicalShieldPopover
      case 'completed':
        return medicalHistoryPopover
    }
  }

  const getUpdatedDay = (value) => {
    return value?.toString() === '0'
      ? 'today'
      : value?.toString() === '1'
      ? 'yesterday'
      : value
  }

  const medicalShieldPopover = (
    <div className={styles.medicalShieldWrapper}>
      <MyLottie
        width="121px"
        height="110px"
        options={{
          loop: true,
          autoPlay: true,
          animationData: medicalShield,
        }}
      />
      <h3>
        {medicalHistoryDetails?.status === 'not_completed'
          ? t('clients.clientcard.medical.history.no.medical.history')
          : t('clients.clientcard.medical.history.requested', {
              what: dayjs(medicalHistoryDetails?.requestedDate).fromNow(),
            })}
      </h3>
      <div className={styles.medicalButtons}>
        <Button type="primary" icon={<BellOutlined />}>
          {medicalHistoryDetails?.status === 'not_completed'
            ? t('clients.clientcard.medical.history.send.request')
            : t('clients.clientcard.medical.history.send.reminder')}
        </Button>
        <h3>{t('clients.clientcard.medical.history.or')}</h3>
        <Button type="primary">
          {t('clients.clientcard.medical.history.complete')}
        </Button>
      </div>
    </div>
  )

  const medicalHistoryPopover = (
    <div className={styles.medicalHistoryWrapper}>
      <div className={styles.titleWrapper}>
        <h3>{t('clients.clientcard.medical.history')}</h3>
        {formLastUpdated !== null && formLastUpdated !== undefined && (
          <h4>
            {formLastUpdated > 180 && (
              <InfoCircleFilled
                style={{ color: '#FAAD14', marginRight: '4px' }}
              />
            )}
            {t('clients.clientcard.medical.history.last.updated', {
              what: getUpdatedDay(formLastUpdated),
              which: formLastUpdated > 2 ? 'days ago' : null,
            })}
          </h4>
        )}
      </div>
      <div className={styles.medicalHistoryItem}>
        <EyeOutlined /> {t('clients.clientcard.medical.history.view')}
      </div>
      <div className={styles.medicalHistoryItem}>
        <EditOutlined /> {t('clients.clientcard.medical.history.edit')}
      </div>
      <div className={styles.medicalHistoryItem}>
        <ShareAltOutlined /> {t('clients.clientcard.medical.history.share')}
      </div>
      <div className={styles.medicalHistoryItem}>
        <HistoryOutlined /> {t('clients.clientcard.medical.history.change.log')}
      </div>
      <div className={styles.medicalHistoryBtnWrap}>
        <Button type="primary" icon={<BellOutlined />}>
          {t('clients.clientcard.medical.history.request.update')}
        </Button>
      </div>
    </div>
  )

  const clientAlertsPopover = (
    <div
      className={styles.clientAlertsPopover}
      style={{ width: isMobile ? '320px' : '472px' }}
    >
      <div className={styles.staffAlertsContainer}>
        {staffAlerts?.loading ? (
          <div className={styles.staffAlertSkeleton}>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className={styles.alertContent}>
                <Skeleton.Input active={true} />
              </div>
            ))}
          </div>
        ) : (
          alertItems?.map((item, index) => (
            <Tooltip
              key={`staff-alert-${index}`}
              title={t('clients.clientcard.staffalerts.createdby', {
                who: item?.User?.contact,
                when: dayjs(item?.date).format('DD/MM/YYYY'),
              })}
            >
              <div
                className={
                  activeAlert === item?.ID
                    ? ClassNames(styles.staffAlert, styles.focused)
                    : styles.staffAlert
                }
                onClick={() => setActiveAlert(item?.ID)}
              >
                <span className={styles.text}>{item?.content}</span>
                <div className={styles.editDeleteBtnWrap}>
                  <div
                    onClick={() => {
                      if (userId === item?.User?.id) {
                        setNewAlert(() => {
                          return {
                            id: item?.ID,
                            newAlert: item?.content,
                            ownerId: item?.User?.id,
                          }
                        })
                      }
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    <Tooltip
                      title={
                        userId !== item?.User?.id
                          ? t('clients.clientcard.staffalerts.nopermission')
                          : null
                      }
                      placement="bottom"
                    >
                      <EditOutlined
                        style={
                          userId !== item?.User?.id
                            ? { cursor: 'not-allowed' }
                            : undefined
                        }
                      />
                    </Tooltip>
                  </div>
                  <div
                    onClick={() => {
                      if (userId === item?.User?.id)
                        handleDeleteStaffAlert(item?.ID)
                    }}
                  >
                    <Tooltip
                      title={
                        userId !== item?.User?.id
                          ? t('clients.clientcard.staffalerts.nopermission')
                          : null
                      }
                      placement="bottom"
                    >
                      <DeleteOutlined
                        style={
                          userId !== item?.User?.id
                            ? { color: '#ff4d4f', cursor: 'not-allowed' }
                            : { color: '#ff4d4f' }
                        }
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Tooltip>
          ))
        )}
      </div>
      <TextArea
        placeholder={t('clients.clientcard.staffalerts.input.placeholder')}
        value={newAlert?.newAlert}
        onChange={(e) =>
          setNewAlert((val) => {
            return { ...val, newAlert: e.target.value }
          })
        }
        onPressEnter={(e) => {
          handleAlertMutation(e)
        }}
        style={{ marginTop: '12px' }}
      />
    </div>
  )

  const skeletonContent = () => {
    return (
      <div className={styles.notesSkeletonWrapper}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className={styles.notesSkeletonContainer}>
            <div className={styles.avatarWrapper}>
              <Skeleton.Avatar active={true} size="default" shape={'circle'} />
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.notesContent}>
                <Skeleton.Input active={true} />
              </div>
              <div className={styles.notesDate}>
                <Skeleton.Input active={true} />
                <Skeleton.Input active={true} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const clientNotesPopover = () => {
    return (
      <div
        className={styles.clientNotesPopover}
        style={{ width: isMobile ? '320px' : '472px' }}
      >
        <TabMenu
          tabPosition="top"
          minHeight="1px"
          menuItems={[
            t('clients.clientcard.notes.clients'),
            t('clients.clientcard.notes.appointments'),
          ]}
        >
          <div className={styles.clientNotesTab}>
            {notes?.loading ? (
              skeletonContent()
            ) : (
              <>
                <div
                  className={styles.clientNotesContainer}
                  ref={clientNotePopoverRef}
                >
                  {noteItems?.map((item, index) => (
                    <div key={`client-${index}`} className={styles.clientNote}>
                      {index !== currentClientNote && (
                        <div className={styles.clientNoteItem}>
                          <div>
                            <Avatar
                              src={
                                item?.User?.avatar &&
                                getImage(item?.User?.avatar)
                              }
                              name={item?.User?.contact}
                              size={32}
                            />
                          </div>
                          <div>
                            <div className={styles.content}>
                              {item?.content}
                            </div>
                            <div
                              className={styles.contact}
                            >{`By ${item?.User?.contact}`}</div>
                            <div className={styles.date}>{`On ${dayjs(
                              item?.date
                            )
                              .utc()
                              .format('D MMM YYYY hh:mm A')}`}</div>
                          </div>
                          <div>
                            <Tooltip
                              title={
                                userId !== item?.User?.id
                                  ? t(
                                      'clients.clientcard.staffalerts.nopermission'
                                    )
                                  : null
                              }
                              placement="bottomRight"
                            >
                              <div
                                className={
                                  userId !== item?.User?.id
                                    ? styles.disableIcon
                                    : ClassNames(
                                        styles.disableIcon,
                                        styles.editIcon
                                      )
                                }
                                onClick={() => {
                                  userId === item?.User?.id &&
                                    setCurrentClientNote(index)
                                }}
                              >
                                <FormOutlined />
                              </div>
                            </Tooltip>
                            <Tooltip
                              title={
                                userId !== item?.User?.id
                                  ? t(
                                      'clients.clientcard.staffalerts.nopermission'
                                    )
                                  : null
                              }
                              placement="bottomRight"
                            >
                              <div
                                className={
                                  userId !== item?.User?.id
                                    ? styles.disableIcon
                                    : ClassNames(
                                        styles.disableIcon,
                                        styles.deleteIcon
                                      )
                                }
                                onClick={() => {
                                  userId === item?.User?.id &&
                                    handleDeleteClientNote(item.ID)
                                }}
                              >
                                <DeleteOutlined />
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      )}
                      {index === currentClientNote && (
                        <div className={styles.clientNoteItemEdit}>
                          <TextArea
                            defaultValue={item.content}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            style={{ marginBottom: '8px' }}
                          />
                          <div className={styles.editOps}>
                            <Button
                              type="primary"
                              shape="circle"
                              size="small"
                              icon={<SaveOutlined />}
                              onClick={() => handleEditClientNote(item.ID)}
                            />
                            <Button
                              icon={<UndoOutlined />}
                              shape="circle"
                              size="small"
                              onClick={() => setCurrentClientNote(-1)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.clientNoteAdd}>
                  <TextArea
                    value={note}
                    placeholder={t(
                      'clients.clientcard.notes.clientnote.input.placeholder'
                    )}
                    autoFocus
                    onChange={(e) => setNote(e.target.value)}
                    onPressEnter={(e) => handleAddNote(e)}
                    style={{ marginBottom: '8px' }}
                  />
                </div>
              </>
            )}
          </div>
          <div className={styles.clientNotesTab}>
            {notes?.loading ? (
              skeletonContent()
            ) : (
              <div className={styles.clientNotesContainer}>
                {appointmentItems?.map((note, index) => (
                  <div
                    key={`appointment-${index}`}
                    className={styles.clientNote}
                  >
                    <div className={styles.clientNoteItem}>
                      <div>
                        <Avatar
                          src={
                            note?.User?.avatar && getImage(note?.User?.avatar)
                          }
                          name={note?.User?.contact}
                          size={32}
                        />
                      </div>
                      <div>
                        <div className={styles.content}>{note.title}</div>
                        <div
                          className={styles.contact}
                        >{`By ${note?.User?.contact}`}</div>
                        {note?.date && (
                          <div className={styles.date}>{`On ${dayjs(
                            note?.date.toString()
                          ).format('D MMM YYYY hh:mm A')}`}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabMenu>
      </div>
    )
  }

  return (
    <div className={styles.clientCardHeaderOps}>
      <div className={styles.clientCardHeaderOp}>
        <Popover
          placement="bottomRight"
          trigger="click"
          content={handleMedicalHistoryPopoverContent}
          overlayClassName={ClassNames(
            styles.clientCardHeaderPopover,
            medicalHistoryDetails?.status === 'not_completed' ||
              medicalHistoryDetails?.status === 'to_be_completed'
              ? styles.medicalShieldPopover
              : styles.medicalHistoryPopover
          )}
        >
          <Tooltip
            title={
              formLastUpdated !== null && formLastUpdated !== undefined
                ? t('clients.clientcard.medical.history.last.updated', {
                    what: getUpdatedDay(formLastUpdated),
                    which: formLastUpdated > 2 ? 'days ago' : null,
                  })
                : t('clients.clientcard.medical.history')
            }
          >
            <Badge count={getMedicalhistoryIcon()} offset={[0, 18]}>
              <MedicalHistory className={styles.headerOpsIcon} />
            </Badge>
          </Tooltip>
        </Popover>
      </div>
      <div className={styles.clientCardHeaderOp}>
        <Popover
          title={t('clients.clientcard.notes')}
          placement="bottomRight"
          trigger="click"
          content={clientNotesPopover}
          overlayClassName={styles.clientCardHeaderPopover}
          visible={openPopover?.note}
          onVisibleChange={(val) => {
            !openDeleteModal &&
              setOpenPopover((e) => {
                return { ...e, note: val }
              })
          }}
        >
          <div
            onClick={() => {
              getContactDetails?.()
            }}
          >
            <Tooltip title={t('clients.clientcard.notes')}>
              <Badge
                count={countDetails?.notes}
                overflowCount={9}
                size="small"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <Note className={styles.headerOpsIcon} />
              </Badge>
            </Tooltip>
          </div>
        </Popover>
      </div>
      <div className={styles.clientCardHeaderOp}>
        <Popover
          title={t('clients.clientcard.staffalerts.title')}
          placement="bottomRight"
          trigger="click"
          content={clientAlertsPopover}
          overlayClassName={styles.clientCardHeaderPopover}
          visible={openPopover?.staffAlert}
          onVisibleChange={(val) => handleAlertPopoverVisible(val)}
        >
          <div
            onClick={() => {
              getStaffAlertDetails?.()
            }}
          >
            <Tooltip
              title={t('clients.clientcard.staffalerts.title')}
              placement="bottomRight"
            >
              <Badge
                count={countDetails?.staff}
                overflowCount={9}
                size="small"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <Alert className={styles.headerOpsIcon} />
              </Badge>
            </Tooltip>
          </div>
        </Popover>
      </div>
      <Modal
        modalWidth={682}
        centered={true}
        visible={openDeleteModal}
        loading={deleteAlertLoading}
        onCancel={() => setOpenDeleteModal((val) => !val)}
        onOk={() => handleDeleteSubmit(activeItem)}
        newButtonText={t('clients.content.delete.confirm.yes')}
        title={t('clients.clientcard.notes.clientnote.deletemodal.title', {
          what: activeItem === 'note' ? 'Client Note' : 'Staff Alert',
        })}
      >
        <span
          style={{
            fontFamily: 'Circular-Std-Book',
            fontWeight: 'normal',
            fontSize: '16px',
            lineHeight: '20px',
            color: '#9292A3',
          }}
        >
          {t('clients.clientcard.notes.clientnote.deletemodal.content', {
            what: activeItem === 'note' ? 'note' : 'staff alert',
          })}
        </span>
      </Modal>
    </div>
  )
}

export default ClientHeaderDetails
