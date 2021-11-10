import React, { FC, useState, useRef, useEffect } from 'react'
import {
  CheckCircleFilled,
  EyeOutlined,
  PrinterOutlined,
  MailOutlined,
  HistoryOutlined,
  FormOutlined,
  DeleteOutlined,
  SaveOutlined,
  UndoOutlined,
  PlusOutlined,
  CloseCircleFilled,
} from '@ant-design/icons'
import { TabMenu, Avatar, Button, ClientData } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { Popover, Tooltip, Badge, Input, Skeleton } from 'antd'
import { useMedia } from 'react-use'
import { ReactComponent as MedicalHistory } from '../../assets/images/client-card-ops/medical-history.svg'
import { ReactComponent as Note } from '../../assets/images/client-card-ops/note.svg'
import { ReactComponent as Alert } from '../../assets/images/client-card-ops/alert.svg'
import {
  ClientNotes,
  ClientNoteDetails,
  ClientAppointmentDetails,
} from '../client-card/ClientCard'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { getImage } from '../../helper/uploaders/UploadHelpers'
import styles from './ClientHeaderDetails.module.less'
dayjs.extend(utc)
const { TextArea } = Input

export interface ClientHeaderDetailsProps {
  notes?: ClientNotes
  medicalHistoryIconStatus?: string
  getContactDetails?: () => void
  client?: ClientData
  handleAddNewClientNote?: (e: string) => void
  handleEditNote?: (id: number, e: string) => void
  handleDeleteNote?: (id: number | string) => void
}

interface ClientCountDetails {
  notes: number
  staff: number
}

export const ClientHeaderDetails: FC<ClientHeaderDetailsProps> = ({
  notes = { notes: [], count: 0, notesCountLoading: false, appointments: [] },
  medicalHistoryIconStatus,
  getContactDetails,
  client,
  handleAddNewClientNote,
  handleEditNote,
  handleDeleteNote,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const clientNotePopoverRef = useRef<HTMLDivElement>(null)
  const [noteItems, setNoteItems] = useState<ClientNoteDetails[]>([])
  const [appointmentItems, setAppointmentItems] = useState<
    ClientAppointmentDetails[] | undefined
  >([])
  const [currentClientNote, setCurrentClientNote] = useState(-1)
  const [alertItems, setAlertItems] = useState<string[]>([])
  const [currentNote, setCurrentNote] = useState('')
  const [note, setNote] = useState('')
  const [addingAlert, setAddingAlert] = useState(false)
  const [countDetails, setCountDetails] = useState<ClientCountDetails>({
    notes: 0,
    staff: 0,
  })
  const [openNotes, setOpenNotes] = useState<boolean>(false)
  const [isDeletingNotes, setIsDeletingNotes] = useState<boolean>(false)

  useEffect(() => {
    setNoteItems(notes?.notes)
    setAppointmentItems(notes?.appointments)
    setIsDeletingNotes(false)
    if (notes?.count)
      setCountDetails((item) => {
        return { ...item, notes: notes?.count }
      })
  }, [notes])

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
    handleDeleteNote?.(id)
    setCurrentNote('')
    setCurrentClientNote(-1)
    setIsDeletingNotes(true)
  }

  const getMedicalhistoryIcon = () => {
    switch (medicalHistoryIconStatus) {
      case 'not_completed':
        return <CloseCircleFilled style={{ color: '#ec6669' }} />
      case 'completed':
        return <CheckCircleFilled style={{ color: '#65cd98' }} />
      case 'to_be_completed':
        return (
          <div className={styles.toBeCompletedIcon}>
            <HistoryOutlined style={{ color: '#fff' }} />
          </div>
        )
    }
  }

  const medicalHistoryPopover = (
    <>
      <div className={styles.medicalHistoryItem}>
        <EyeOutlined /> View and Edit
      </div>
      <div className={styles.medicalHistoryItem}>
        <PrinterOutlined /> Print
      </div>
      <div className={styles.medicalHistoryItem}>
        <MailOutlined /> Email history
      </div>
      <div className={styles.medicalHistoryItem}>
        <HistoryOutlined /> Change log
      </div>
    </>
  )

  const clientAlertsPopover = (
    <div
      className={styles.clientAlertsPopover}
      style={{ width: isMobile ? '320px' : '472px' }}
    >
      {alertItems && (
        <div className={styles.staffAlertsContainer}>
          {alertItems?.map((item, index) => (
            <div className={styles.staffAlert} key={`staff-alert-${index}`}>
              {item}
            </div>
          ))}
        </div>
      )}
      {addingAlert && (
        // TODO: make this formik
        <TextArea
          autoFocus
          // value={alert}
          onChange={(e) => alert('TODO: fire mutation here')}
          // onPressEnter={(_) => handleAddAlert()}
          // onBlur={(_) => handleAddAlert()}
          style={{ marginTop: '12px' }}
        />
      )}
      <Button
        icon={<PlusOutlined />}
        type="primary"
        style={{ marginTop: '12px' }}
        onClick={() => setAddingAlert(true)}
      >
        {t('common-label-add')}
      </Button>
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
          menuItems={["Client's", "Appointment's"]}
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
                            <Button
                              type="primary"
                              shape="circle"
                              size="small"
                              icon={<FormOutlined />}
                              onClick={() => setCurrentClientNote(index)}
                            />
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              shape="circle"
                              size="small"
                              onClick={() => handleDeleteClientNote(item.ID)}
                            />
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
                    placeholder="Take a note, @name"
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
                {/* TODO  */}
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
          title={'Medical history'}
          placement="bottomRight"
          trigger="click"
          content={medicalHistoryPopover}
          overlayClassName={styles.clientCardHeaderPopover}
        >
          <Tooltip title="Medical history">
            <Badge count={getMedicalhistoryIcon()} offset={[0, 18]}>
              <MedicalHistory className={styles.headerOpsIcon} />
            </Badge>
          </Tooltip>
        </Popover>
      </div>
      <div className={styles.clientCardHeaderOp}>
        <Popover
          title={'Notes'}
          placement="bottomRight"
          trigger="click"
          content={clientNotesPopover}
          overlayClassName={styles.clientCardHeaderPopover}
          visible={openNotes}
          onVisibleChange={(val) => {
            !isDeletingNotes && setOpenNotes(val)
          }}
        >
          <div
            onClick={() => {
              getContactDetails?.()
            }}
          >
            <Tooltip title="Notes">
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
          title={'Staff alerts'}
          placement="bottomRight"
          trigger="click"
          content={clientAlertsPopover}
          overlayClassName={styles.clientCardHeaderPopover}
        >
          <Tooltip title="Staff alerts" placement="bottomRight">
            <Badge
              count={countDetails?.staff}
              overflowCount={9}
              size="small"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <Alert className={styles.headerOpsIcon} />
            </Badge>
          </Tooltip>
        </Popover>
      </div>
    </div>
  )
}

export default ClientHeaderDetails
