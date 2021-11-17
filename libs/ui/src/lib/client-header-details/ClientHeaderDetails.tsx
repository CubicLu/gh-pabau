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
import { TabMenu, Avatar, Button, ClientData, MyLottie } from '@pabau/ui'
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
  medicalHistoryDetails?: MedicalHistoryDetails
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
  medicalHistoryDetails,
  getContactDetails,
  client,
  handleAddNewClientNote,
  handleEditNote,
  handleDeleteNote,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const formLastUpdated = medicalHistoryDetails?.formLastUpdatedDate
    ? dayjs().diff(medicalHistoryDetails?.formLastUpdatedDate, 'day')
    : 0
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
    switch (medicalHistoryDetails?.status) {
      case 'not_completed':
        return <CloseCircleFilled style={{ color: '#ec6669' }} />
      case 'completed':
        return formLastUpdated > 180 ? (
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
        {formLastUpdated !== 0 && (
          <h4>
            {formLastUpdated > 180 && (
              <InfoCircleFilled
                style={{ color: '#FAAD14', marginRight: '4px' }}
              />
            )}
            {t('clients.clientcard.medical.history.last.updated', {
              what: formLastUpdated,
              which: formLastUpdated > 0 ? 'days' : 'day',
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
          <Tooltip title={t('clients.clientcard.medical.history')}>
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
