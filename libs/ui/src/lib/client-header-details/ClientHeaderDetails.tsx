import React, { FC, useState, useRef } from 'react'
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
} from '@ant-design/icons'
import { TabMenu, Avatar, Button } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import { Popover, Tooltip, Badge, Input } from 'antd'
import moment from 'moment'
import { useMedia } from 'react-use'
import { ReactComponent as MedicalHistory } from '../../assets/images/client-card-ops/medical-history.svg'
import { ReactComponent as Note } from '../../assets/images/client-card-ops/note.svg'
import { ReactComponent as Alert } from '../../assets/images/client-card-ops/alert.svg'
import styles from './ClientHeaderDetails.module.less'

const { TextArea } = Input
/* eslint-disable-next-line */
export interface ClientHeaderDetailsProps {}

export const ClientHeaderDetails: FC<ClientHeaderDetailsProps> = (props) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const clientNotePopoverRef = useRef<HTMLDivElement>(null)
  const [noteItems, setNoteItems] = useState<ClientNote[]>([])
  const [currentClientNote, setCurrentClientNote] = useState(-1)
  const [alertItems, setAlertItems] = useState<string[]>([])
  const [currentNote, setCurrentNote] = useState('')
  const [note, setNote] = useState('')
  const [addingAlert, setAddingAlert] = useState(false)

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
      {console.log('alert items-=-=-=-', alertItems)}
      {alertItems && (
        <div className={styles.staffAlertsContainer}>
          {alertItems?.map((item, index) => (
            <div className={styles.staffAlert} key={`staff-alert-${index}`}>
              {item.Note}
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

  const clientNotesPopover = (
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
                        src={item.User.avatar}
                        name={item.User.client}
                        size={32}
                      />
                    </div>
                    <div>
                      <div className={styles.content}>{item.content}</div>
                      <div
                        className={styles.client}
                      >{`By ${item.User.client}`}</div>
                      <div className={styles.date}>{`On ${moment(
                        item.date
                      ).format('D MMM YYYY hh:mm A')}`}</div>
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
                        // onClick={() => handleDeleteClientNote(index)}
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
                        // onClick={() => handleEditClientNote()}
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
              // onPressEnter={(e) => handleAddNote(e)}
              style={{ marginBottom: '8px' }}
            />
          </div>
        </div>
        <div className={styles.clientNotesTab}>
          <div className={styles.clientNotesContainer}>
            TODO
            {/*{notes.appointment.map((note, index) => (*/}
            {/*  <div key={`appointment-${index}`} className={styles.clientNote}>*/}
            {/*    <div>*/}
            {/*      <Avatar src={note.avatar} name={note.client} size={32} />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*      <div className={styles.content}>{note.content}</div>*/}
            {/*      <div className={styles.client}>{`By ${note.client}`}</div>*/}
            {/*      <div className={styles.date}>{`On ${moment(note.date).format(*/}
            {/*        'D MMM YYYY hh:mm A'*/}
            {/*      )}`}</div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*))}*/}
          </div>
        </div>
      </TabMenu>
    </div>
  )

  return (
    <div>
      <div className={styles.clientCardHeaderOp}>
        <Popover
          title={'Medical history'}
          placement="bottomRight"
          trigger="click"
          content={medicalHistoryPopover}
          overlayClassName={styles.clientCardHeaderPopover}
        >
          <Tooltip title="Medical history">
            <Badge
              count={<CheckCircleFilled />}
              offset={[0, 18]}
              style={{ color: '#65cd98' }}
            >
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
        >
          <Tooltip title="Notes">
            <Badge
              count={noteItems?.length}
              overflowCount={9}
              size="small"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <Note className={styles.headerOpsIcon} />
            </Badge>
          </Tooltip>
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
              count={alertItems?.length}
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
