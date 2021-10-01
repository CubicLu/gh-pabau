import {
  CloseCircleOutlined,
  DownOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
  FormOutlined,
  HistoryOutlined,
  PaperClipOutlined,
  PercentageOutlined,
  RightOutlined,
  SolutionOutlined,
} from '@ant-design/icons'
import { useGetBookingByIdLazyQuery } from '@pabau/graphql'
import {
  Breadcrumb,
  Button,
  ButtonLabel,
  DotButton,
  FileUploder,
} from '@pabau/ui'
import { Drawer, Input, Modal, Popover, Typography } from 'antd'
import { UploadProps } from 'antd/es/upload'
import { useRouter } from 'next/router'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import ConnectLayout from '../../../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../../../components/UserContext/context/ClientContext'
import { useApptFormatter } from '../../../../hooks/useApptFormatter'
import styles from './index.module.less'

const { Title } = Typography
const { TextArea } = Input

interface Appointment {
  id: string
  date: string
  time: string
  duration: string
  service: string
  clinician: string[]
  format: string
  comments: string
  attachments: {
    name: string
    type: string
    path: string
  }[]
  doctor: {
    name: string
    avatar: string
    medicalHistoryForm: string
    position: string[]
  }
  status: string
}

interface UploadModalProps {
  visible: boolean
  onUpload: (fileList: UploadProps[]) => void
  onCancel: () => void
  title: string
  okText: string
  cancelText: string
}

const defaultAppointment: Appointment = {
  id: '7abc73d7-e51a-44b6-b795-7d202e972ee9',
  date: 'Fri 17th April, 2021',
  time: '17:00 - 17:40',
  duration: '40 min',
  service: 'Acne Consultation',
  clinician: ['Dermatologist', 'Cosmetologist'],
  format: 'Offline Appointment',
  comments: '',
  attachments: [],
  doctor: {
    name: 'Alisa Moor',
    avatar:
      'https://s3-alpha-sig.figma.com/img/104f/84ff/3a2a8d65420949181f043fa5e73bd8c7?Expires=1618185600&Signature=NyZNf3qB3KanaJti4oIoOzc9Ux0jiVgV7QNm97PpjIhwC6FrB5XWy73JduxuBYWGRxhLqXOdPV91XPS5QRPn7D4unT3SgiQ060RjMP64~xNYYMbj2Uxj7469T~3p77l~KMIQyM5M~~uMCsRM~habPLEDQOLcIcD7TXVm7-MqaIaL0prwsTOb0JOG5wSVlxetu3Jr1TqhKJMp0G6wdP8s4q7dhy7TkmfG3vzTpwNaOxywk4puxQR7wAJ2h8ZFMOsutr3zjOipnheZP6ThQZaZvmqYteCzJ5ODZ2pvblIgr0hqOqnx~yhXd3ZKaCu~pEhxDgPn9yq4ATYoyZVgRXdybA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    medicalHistoryForm: 'completed',
    position: ['Dermatologist', 'Cosmetologist'],
  },
  status: 'past',
}

const UploadModal: FC<UploadModalProps> = ({
  visible,
  onUpload,
  onCancel,
  title,
  okText,
  cancelText,
}) => {
  const [fileList, setUploadList] = useState<UploadProps[]>([])
  return (
    <Modal
      visible={visible}
      width={682}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onOk={() => onUpload(fileList)}
      onCancel={() => onCancel()}
      wrapClassName={styles.uploadModal}
    >
      <FileUploder
        withList={true}
        onFileChange={(file) => setUploadList([...fileList, file])}
        onDelete={(list) => setUploadList(list)}
      />
    </Modal>
  )
}

export const AppointmentDetails = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const router = useRouter()
  const isMobile = useMedia('(max-width: 767px)', false)
  const [openUpload, setOpenUpload] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [appointment, setAppointment] = useState(null)
  const [editComment, setEditComment] = useState(false)
  const [comment, setComment] = useState('')
  const [draftComment, setDraftComment] = useState('')
  const [attachments, setAttachments] = useState<UploadProps[]>([])
  const { formatAppts } = useApptFormatter()
  const [
    fetchBookingById,
    {
      data: appointmentData,
      loading: appointmentLoading,
      error: appointmentError,
    },
  ] = useGetBookingByIdLazyQuery()
  const clientContext = useContext(ClientContext)

  useEffect(() => {
    fetchBookingById({
      variables: {
        id: Number(router.query.id),
      },
    })
  }, [fetchBookingById, router.query.id])

  if (!appointmentLoading && appointmentData && !appointment) {
    const formatted_appt = formatAppts(appointmentData.findManyBooking)
    setAppointment(formatted_appt[0])
    console.table(formatted_appt)
  }

  const handleClickEditComment = () => {
    setEditComment(true)
    setDraftComment(comment)
  }

  const handleSaveComment = () => {
    setEditComment(false)
    setComment(draftComment)
  }

  const getFileType = (extension) => {
    switch (extension) {
      case 'application/pdf':
        return <FilePdfOutlined className={styles.pdfIcon} />
      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg':
        return <FileImageOutlined className={styles.imageIcon} />
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined className={styles.excelIcon} />
      default:
        return <i>alt</i>
    }
  }

  const appointmentGeneral = (
    <div className={styles.appointmentGeneral}>
      <div className={styles.header}>
        <h3>{t('connect.account.appointments.details.general')}</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <div className={styles.label}>
            {t('connect.account.appointments.details.general.service')}
          </div>
          <div className={styles.contentWrapper}>{appointment?.service}</div>
        </div>
        <div className={styles.contentItem}>
          <div className={styles.label}>
            {t('connect.account.appointments.details.general.clinician')}
          </div>
          <div className={styles.contentWrapper}>
            {appointment?.doctor?.name}
          </div>
        </div>
        <div className={styles.contentItem}>
          <div className={styles.label}>
            {t('connect.account.appointments.details.general.format')}
          </div>
          <div className={styles.contentWrapper} style={{ marginBottom: 0 }}>
            Offline Appointment
          </div>
        </div>
      </div>
    </div>
  )

  const appointmentDate = (
    <div className={styles.appointmentDate}>
      <div className={styles.header}>
        <h3>{t('connect.account.appointments.details.datetime')}</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTwoItems}>
          <div className={styles.contentItem}>
            <div className={styles.label}>
              {t('connect.account.appointments.details.datetime.date')}
            </div>
            <div className={styles.contentWrapper}>{appointment?.date}</div>
          </div>
          <div className={styles.contentItem}>
            <div className={styles.label}>
              {t('connect.account.appointments.details.datetime.status')}
            </div>
            <div className={styles.contentWrapper}>
              <ButtonLabel
                text={
                  appointment?.status === 'upcoming'
                    ? t(
                        'connect.account.appointments.details.datetime.status.upcoming'
                      )
                    : appointment?.status === 'past'
                    ? t(
                        'connect.account.appointments.details.datetime.status.past'
                      )
                    : t(
                        'connect.account.appointments.details.datetime.status.cancelled'
                      )
                }
                type={
                  appointment?.status === 'upcoming'
                    ? 'success'
                    : appointment?.status === 'past'
                    ? 'warning'
                    : undefined
                }
                className={
                  appointment?.status === 'cancelled'
                    ? styles.buttonLabelCancelled
                    : styles.buttonLabel
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.contentItem}>
          <div className={styles.label}>
            {t('connect.account.appointments.details.datetime.time')}
          </div>
          <div className={styles.contentWrapper}>
            {appointment?.time} - {appointment?.time_to}
          </div>
        </div>
        <div className={styles.contentItem}>
          <div className={styles.label}>
            {t('connect.account.appointments.details.datetime.duration')}
          </div>
          <div
            className={styles.contentWrapper}
            style={isMobile ? {} : { marginBottom: 0 }}
          >
            {appointment?.duration}
          </div>
        </div>
        {isMobile && (
          <Button type="primary" block>
            {t('connect.account.appointments.details.join')}
          </Button>
        )}
      </div>
    </div>
  )

  const appointmentYourDoctor = (
    <div className={styles.appointmentYourDoctor}>
      <div className={styles.header}>
        <h3>{t('connect.account.appointments.details.doctor')}</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.avatarContainer}>
          <div
            style={{
              backgroundImage: `url(${appointment?.doctor.avatar})`,
            }}
          />
          <div>
            <p>{appointment?.doctor.name}</p>
            <p>{appointment?.doctor.title}</p>
          </div>
        </div>
        <div className={styles.doctorItem}>
          <p>
            <FileOutlined className={styles.icon} />{' '}
            {t('connect.account.appointments.details.doctor.note', {
              doctor: appointment?.doctor.name,
            })}
          </p>
          <RightOutlined className={styles.doctorItemIcon} />
        </div>
        <div className={styles.doctorItem}>
          <p>
            <PercentageOutlined className={styles.icon} />{' '}
            {t('connect.account.appointments.details.doctor.referral')}
          </p>
          <RightOutlined className={styles.doctorItemIcon} />
        </div>
        <div
          className={styles.doctorItem}
          style={{ marginBottom: 0 }}
          onClick={() => {
            router.push(`/account/medical-history/${router.query.id}`)
          }}
        >
          <p>
            <SolutionOutlined className={styles.icon} />{' '}
            {t(
              'connect.account.appointments.details.doctor.medicalhistoryform'
            )}
          </p>
          <ButtonLabel
            text={
              appointment?.doctor.medicalHistoryForm === 'completed'
                ? t(
                    'connect.account.appointments.details.doctor.medicalhistoryform.complete'
                  )
                : t(
                    'connect.account.appointments.details.doctor.medicalhistoryform.incomplete'
                  )
            }
            type={
              appointment?.doctor.medicalHistoryForm === 'completed'
                ? 'success'
                : 'warning'
            }
            className={styles.buttonLabel}
            style={{ minWidth: '88px' }}
          />
        </div>
      </div>
    </div>
  )

  const appointmentYourComments = (
    <div className={styles.appointmentYourComments}>
      <div className={styles.header}>
        <h3>{t('connect.account.appointments.details.comments')}</h3>
        <div className={styles.commentsOperations}>
          <PaperClipOutlined
            className={styles.attachFiles}
            onClick={() => setOpenUpload(true)}
          />
          <FormOutlined
            className={styles.editComments}
            onClick={() => handleClickEditComment()}
          />
        </div>
      </div>
      <div className={styles.content}>
        {!editComment ? (
          <div className={styles.commentsView}>
            {comment ? (
              <p>{comment}</p>
            ) : (
              <p className={styles.placeholder}>
                {t('connect.account.appointments.details.comments.placeholder')}
              </p>
            )}
            {attachments.length > 0 && (
              <div className={styles.attachments}>
                {attachments.map((attachment, index) => (
                  <div
                    key={`attachment-${index}`}
                    className={styles.attachment}
                  >
                    {getFileType(attachment.type)}
                    {attachment.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.commentsEditor}>
            <TextArea
              rows={6}
              value={draftComment}
              onChange={(e) => setDraftComment(e.target.value)}
              maxLength={200}
              style={{ resize: 'none' }}
            />
            <div className={styles.commentsEditorOperations}>
              <Button type="primary" onClick={() => handleSaveComment()}>
                {t('connect.account.appointments.details.comments.save')}
              </Button>
              <Button onClick={() => setEditComment(false)}>
                {t('connect.account.appointments.details.comments.cancel')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  useEffect(() => {
    const data = { ...defaultAppointment }
    setComment(data.comments)
    setDraftComment(data.comments)
  }, [])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.appointmentDetailsContainer}>
        <div className={styles.appointmentDetailsHeader}>
          <div>
            <Breadcrumb
              items={[
                {
                  breadcrumbName: t('connect.account.title'),
                  path: 'account',
                },
                {
                  breadcrumbName: t('connect.account.appointments'),
                  path: 'account/appointments',
                },
                {
                  breadcrumbName: t(
                    'connect.account.appointments.details.title'
                  ),
                  path: '',
                },
              ]}
            />
            <Title>{t('connect.account.appointments.details.title')}</Title>
          </div>
          <div>
            <Button type="primary" className={styles.joinNowButton}>
              {t('connect.account.appointments.details.join')}
            </Button>
            <Popover
              overlayClassName={styles.optionsWrapper}
              placement="bottomRight"
              content={
                <div className={styles.options}>
                  <div className={styles.option}>
                    <HistoryOutlined className={styles.optionIcon} />{' '}
                    {t('connect.account.appointments.details.reschedule')}
                  </div>
                  <div className={styles.option}>
                    <CloseCircleOutlined className={styles.optionIcon} />{' '}
                    {t('connect.account.appointments.details.cancel')}
                  </div>
                </div>
              }
              trigger="click"
            >
              <Button className={styles.optionsButton}>
                {t('connect.account.appointments.details.options')}{' '}
                <DownOutlined />
              </Button>
            </Popover>
          </div>
        </div>
        <div className={styles.appointmentDetailsMobileHeader}>
          <Title>{t('connect.account.appointments.details.title')}</Title>
          <span onClick={() => setOpenDrawer(true)}>
            <DotButton />
          </span>
        </div>
        <div className={styles.appointmentDetailsContent}>
          <div>
            <div>
              <div>{appointmentGeneral}</div>
              <div>{appointmentDate}</div>
            </div>
            <div>{appointmentYourDoctor}</div>
          </div>
          <div>{appointmentYourComments}</div>
        </div>
        <div className={styles.appointmentDetailsMobileContent}>
          {appointmentGeneral}
          {appointmentDate}
          {appointmentYourComments}
          {appointmentYourDoctor}
        </div>
        <UploadModal
          visible={openUpload}
          onUpload={(list) => {
            setAttachments(list)
            setOpenUpload(false)
          }}
          onCancel={() => setOpenUpload(false)}
          title={t('connect.account.appointments.details.upload.title')}
          okText={t('connect.account.appointments.details.upload.ok')}
          cancelText={t('connect.account.appointments.details.upload.cancel')}
        />
        <Drawer
          className={styles.appointmentDetailsDrawer}
          visible={openDrawer}
          closable={false}
          onClose={() => setOpenDrawer(false)}
          placement="bottom"
          height="128px"
        >
          <div className={styles.drawerContainer}>
            <div
              className={styles.drawerHandler}
              onClick={() => setOpenDrawer(false)}
            />
            <div
              className={styles.drawerItem}
              onClick={() => {
                setOpenDrawer(false)
              }}
            >
              <HistoryOutlined className={styles.drawerIcon} />
              <span>
                {t('connect.account.appointments.details.reschedule')}
              </span>
            </div>
            <div
              className={styles.drawerItem}
              onClick={() => {
                setOpenDrawer(false)
              }}
              style={{ color: '#ff5b64' }}
            >
              <CloseCircleOutlined className={styles.drawerIcon} />
              <span>{t('connect.account.appointments.details.cancel')}</span>
            </div>
          </div>
        </Drawer>
      </div>
    </ConnectLayout>
  )
}

AppointmentDetails.getInitialProps = async () => {
  return { testprop: true }
}

export default AppointmentDetails
