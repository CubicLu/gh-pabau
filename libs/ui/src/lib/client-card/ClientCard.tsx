import {
  ClientData,
  ClientDetails,
  CustomTabMenu,
  ClientDashboardLayout,
  // ClientAppointments,
  // ClientCommunicationsLayout,
  // ClientDocumentsLayout,
  // ClientFinancialsLayout,
  // ClientGiftVoucherLayout,
  // ClientLabTestsLayout,
  // ClientLoyaltyLayout,
  // ClientFormsLayout,
  // ClientPackagesLayout,
  // ClientPhotosLayout,
  // ClientPrescriptionsLayout,
  // ClientTaskLayout,
  // ClientVaccineHistoryLayout,
  Button,
  TabMenu,
  Avatar,
  Search,
  StickyPopout,
  TabItem,
  CommunicationTimelineProps,
  ActivitiesProps,
  AvatarUploader,
  ReferredByOption,
  CategoryFieldType,
  ClientHeaderDetails,
  // AllTemplateModal,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import {
  Modal,
  Popover,
  Input,
  Badge,
  Drawer,
  Tag,
  ConfigProvider,
  Tooltip,
  Skeleton,
} from 'antd'
import {
  RightOutlined,
  LeftOutlined,
  EyeOutlined,
  PrinterOutlined,
  MailOutlined,
  HistoryOutlined,
  PlusOutlined,
  MoreOutlined,
  FormOutlined,
  DeleteOutlined,
  UndoOutlined,
  CheckCircleFilled,
  SaveOutlined,
  EditOutlined,
} from '@ant-design/icons'
import React, { FC, useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useMedia } from 'react-use'
import Confetti from 'react-confetti'
import { ReactComponent as MedicalHistory } from '../../assets/images/client-card-ops/medical-history.svg'
import { ReactComponent as Note } from '../../assets/images/client-card-ops/note.svg'
import { ReactComponent as Alert } from '../../assets/images/client-card-ops/alert.svg'
import { ReactComponent as SvgTreatment } from '../../assets/images/popout/treatment.svg'
import { ReactComponent as SvgConsent } from '../../assets/images/popout/consent.svg'
import { ReactComponent as SvgRequest } from '../../assets/images/popout/request.svg'
import { ReactComponent as SvgPrescription } from '../../assets/images/popout/prescription.svg'
import { ReactComponent as SvgAppointment } from '../../assets/images/popout/appointment.svg'
import { ReactComponent as SvgScale } from '../../assets/images/popout/scale.svg'
import { ReactComponent as SvgCommunication } from '../../assets/images/popout/communication.svg'
import { ReactComponent as SvgEmail } from '../../assets/images/popout/email.svg'
import { ReactComponent as SvgLetter } from '../../assets/images/popout/letter.svg'
import { ReactComponent as SvgCall } from '../../assets/images/popout/call.svg'
import { ReactComponent as SvgSMS } from '../../assets/images/popout/sms.svg'
import { ReactComponent as SvgVoiceNote } from '../../assets/images/popout/voice-note.svg'
import menuAlert from '../../assets/images/menu-alert.svg'
import styles from './ClientCard.module.less'
import {
  thirdPartySearchResults,
  appointments,
  vouchers,
  // nextAppointments,
  // medicalHistory,
  // medications,
  // conversation,
  // tests,
  // products,
  // loyaltyData,
  // clientPackages,
  // formFilterButtons,
  // forms,
  // prescriptions,
  // testList,
} from './mock'
import { useRouter } from 'next/router'
import { MutationFunction } from '@apollo/client'

const { TextArea } = Input
interface PopoutProps {
  receiverData: string
  type: string
  client: {
    id: string
    name: string
    email: string
  }
  title: string
}

export interface ClientNote {
  avatar: string
  content: string
  client: string
  date: string
}

interface StaffDetails {
  contact?: string
  avatar?: string
}

export interface ClientNoteDetails {
  ID?: number | string
  content: string
  date: string
  User: StaffDetails
}

export interface ClientAppointmentDetails {
  title: string
  date?: number
  User?: StaffDetails
}

export interface ClientNotes {
  notes: ClientNoteDetails[]
  count: number
  loading: boolean
  appointments: ClientAppointmentDetails[]
}

export interface MedicalHistoryDetails {
  status?: string
  requestedDate?: string
  formLastUpdatedDate?: string
}

interface P {
  client: ClientData
  notes?: ClientNotes
  medicalHistoryDetails?: MedicalHistoryDetails
  getContactDetails?: () => void
  handleAddNewClientNote?: (e: string) => void
  handleEditNote?: (id: number | string, e: string) => void
  handleDeleteNote?: (id: number | string) => void
  onClose?: () => void
  tabs?: readonly TabItem[]
  onTabChanged?(newKey: string): void
  activeTab: string
  referredByOptions?: ReferredByOption[]
  loading?: boolean
  customFields?: CategoryFieldType[]
  dateFormat?: string
  handleEditAll?: () => void
  cssClass?: string
  updatebasicContactMutation?: MutationFunction
  updateContactCustomMutation?: MutationFunction
  clientId?: number
  companyId?: number
  setBasicContactData?: React.Dispatch<React.SetStateAction<ClientData>>
  searchRender?: () => JSX.Element
  showAvatarModal?: () => void
}

const ClientCardModal: FC<P> = ({
  client,
  cssClass,
  notes,
  medicalHistoryDetails,
  getContactDetails,
  handleAddNewClientNote,
  handleEditNote,
  handleDeleteNote,
  onClose,
  tabs,
  activeTab = 'dashboard',
  children,
  onTabChanged,
  referredByOptions,
  loading,
  customFields,
  dateFormat,
  handleEditAll,
  updatebasicContactMutation,
  updateContactCustomMutation,
  clientId,
  companyId,
  setBasicContactData,
  searchRender,
  showAvatarModal,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const clientNotePopoverRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState(false)
  const [note, setNote] = useState('')
  const [currentNote, setCurrentNote] = useState('')
  const [noteItems, setNoteItems] = useState<ClientNote[]>([])
  const [alertItems, setAlertItems] = useState<string[]>([])
  const [addingAlert, setAddingAlert] = useState(false)
  const [currentClientNote, setCurrentClientNote] = useState(-1)
  const { activeVouchers, expiredVouchers } = vouchers()
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [showLetterModal, setShowLetterModal] = useState(false)
  const [showHeaderOpsDrawer, setShowHeaderOpsDrawer] = useState(false)

  const customTabMenutItem = (title, alert, tabTotal = 0) => {
    return (
      <div className={styles.customTabMenuItem}>
        <div>{title}</div>
        <div style={{ backgroundImage: `url(${menuAlert})` }}>{alert}</div>
        {tabTotal !== 0 && (
          <Tag style={{ marginLeft: 10 }} color="green">
            £ {tabTotal}
          </Tag>
        )}
      </div>
    )
  }

  const tabItems = [
    {
      key: 0,
      content: 'Dashboard',
    },
    {
      key: 1,
      content: customTabMenutItem('Appointments', 2),
    },
    {
      key: 2,
      content: customTabMenutItem('Financials', 5, 200),
    },
    {
      key: 3,
      content: customTabMenutItem('Packages', 8),
    },
    {
      key: 4,
      content: customTabMenutItem('Communications', 2),
    },
    {
      key: 5,
      content: 'EMR',
      children: [
        {
          key: 5,
          content: 'Forms',
        },
        {
          key: 6,
          content: 'Photos',
        },
        {
          key: 7,
          content: 'Documents',
        },
        {
          key: 8,
          content: 'Prescriptions',
        },
        {
          key: 9,
          content: 'Lab Tests',
        },
      ],
    },
    {
      key: 10,
      content: customTabMenutItem('Gift voucher', 15),
    },
    {
      key: 11,
      content: customTabMenutItem('Loyalty', 7),
    },
    {
      key: 12,
      content: customTabMenutItem('Activities', 8),
    },
  ]

  const [showMobileHeaderOps, setShowMobileHeaderOps] = useState(false)
  const [subOps, setSubOps] = useState(0)
  const [menuHeaderTitle, setMenuHeaderTitle] = useState(
    t('dashboard.create.menu.title.create')
  )
  const [isSubMenu, setIsSubMenu] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  useEffect(() => {
    if (loading) {
      setSearch(false)
    }
  }, [loading])

  const handleAddNote = (e) => {
    e.preventDefault()
    if (note !== '') {
      const items: ClientNote[] = [
        {
          content: note,
          date: moment().format('YYYY-MM-DD hh:mm A'),
          client: client?.fullName || '',
          avatar: client?.avatar || '',
        },
        ...noteItems,
      ]
      setNoteItems(items)
      setNote('')
      handleAddNewClientNote?.(note)
    }
  }

  const onClickCommunication = () => {
    setIsSubMenu(true)
    setMenuHeaderTitle(t('dashboard.create.menu.title.communication'))
  }

  const onBackToMainMenu = () => {
    //TODO: review this. Prefer <Link />
  }

  const menuItems = [
    {
      name: t('dashboard.create.menu.item.treatment.title'),
      icon: <SvgTreatment className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.treatment.description'),
      handler: () => handleCreatePopout('treatment'),
    },
    {
      name: t('dashboard.create.menu.item.consent.title'),
      icon: (
        <div className={styles.pencilIconContainer}>
          <SvgConsent className={styles.pencilIcon} />
        </div>
      ),
      description: t('dashboard.create.menu.item.consent.description'),
      handler: () => handleCreatePopout('consent'),
    },
    {
      name: t('dashboard.create.menu.item.request.title'),
      icon: <SvgRequest className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.request.description'),
    },
    {
      name: t('dashboard.create.menu.item.prescription.title'),
      icon: <SvgPrescription className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.prescription.description'),
      handler: () => handleCreatePopout('prescription'),
    },
    {
      name: t('dashboard.create.menu.item.appointment.title'),
      icon: <SvgAppointment className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.appointment.description'),
    },
    {
      name: t('dashboard.create.menu.item.sale.title'),
      icon: <SvgScale className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.sale.description'),
    },
    {
      name: t('dashboard.create.menu.item.activity.title'),
      icon: <SvgAppointment className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.activity.description'),
    },
    {
      name: t('dashboard.create.menu.item.dictation.title'),
      icon: <SvgVoiceNote className={styles.svgType} />,
      description: t('dashboard.create.menu.item.dictation.description'),
      handler: () => handleCreatePopout('voiceNote'),
    },
    {
      name: t('dashboard.create.menu.item.communication.title'),
      icon: <SvgCommunication className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.communication.description'),
      handler: onClickCommunication,
      hasSubMenus: true,
    },
  ]

  const subMenuItems = [
    {
      name: t('dashboard.create.menu.item.email.title'),
      icon: <SvgEmail className={styles.svgType} />,
      handler: () => handleCreatePopout('email'),
    },
    {
      name: t('dashboard.create.menu.item.sms.title'),
      icon: <SvgSMS className={styles.svgType} />,
      handler: () => handleCreatePopout('sms'),
    },
    {
      name: t('dashboard.create.menu.item.letter.title'),
      icon: <SvgLetter className={styles.svgType} />,
      handler: () => setShowLetterModal(true),
    },
    {
      name: t('dashboard.create.menu.item.call.title'),
      icon: <SvgCall className={styles.svgType} />,
      handler: () => handleCreatePopout('call'),
    },
  ]

  const generateMenuItem = (data) => {
    return (
      <div
        className={styles.menuItemWrapper}
        key={data.name}
        onClick={data.handler || null}
      >
        {data.icon}
        <div className={styles.menuItemTexts}>
          <div className={styles.menuTitle}>{data.name}</div>
          <div className={styles.menuDescription}>{data.description}</div>
        </div>
        {data.hasSubMenus && (
          <RightOutlined
            style={{ fontSize: '12px', color: '#9292A3', marginLeft: '28px' }}
          />
        )}
      </div>
    )
  }

  const generateSubMenuItem = (data) => {
    return (
      <div
        className={styles.plusContentItem}
        onClick={data.handler}
        key={data.name}
      >
        {data.icon}
        <div className={styles.subMenuItemTitle}>{data.name}</div>
      </div>
    )
  }

  const handleCreatePopout = async (type) => {
    const popoutList = JSON.parse(
      window.localStorage.getItem('pabau_popout_list') || '[]'
    )
    const defaultClient = {
      id: '',
      name: 'Bruno Ballardin',
      email: 'bruno.ballardin@exmaple.com',
    }
    let item: PopoutProps = {
      receiverData: '',
      type: '',
      client: {
        id: '',
        name: '',
        email: '',
      },
      title: '',
    }
    switch (type) {
      case 'sms': {
        item = {
          type,
          title: t('dashboard.create.modal.create.sms.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
      case 'email': {
        item = {
          type,
          title: t('dashboard.create.modal.create.email.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
      case 'letter': {
        item = {
          type,
          title: t('dashboard.create.modal.create.letter.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
      case 'form': {
        item = {
          type,
          title: t('dashboard.create.modal.create.form.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
      case 'call': {
        item = {
          type,
          title: t('dashboard.create.menu.item.call.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
      case 'treatment': {
        item = {
          type,
          title: t('dashboard.create.modal.create.treatment.note.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
      case 'consent': {
        item = {
          type,
          title: t('dashboard.create.modal.create.form.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
      case 'prescription': {
        item = {
          type,
          title: t('dashboard.create.modal.create.prescript.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
      case 'voiceNote': {
        item = {
          type,
          title: t('dashboard.create.menu.item.voice.note.title'),
          receiverData: uuidv4(),
          client: defaultClient,
        }
        break
      }
    }
    const items = [...popoutList, item]
    await window.localStorage.setItem(
      'pabau_popout_list',
      JSON.stringify(items)
    )
    await window.localStorage.setItem('pabau_popout_item', JSON.stringify(item))
    // await window.localStorage.setItem(
    //   'pabau_popout_fullscreen',
    //   JSON.stringify(false)
    // )
    await window.localStorage.setItem('pabau_popout_new', JSON.stringify(true))
    window.dispatchEvent(new Event('storage'))

    onChangeVisibleHanlder(false)
  }

  const onChangeVisibleHanlder = (visible: boolean) => {
    setIsOpenMenu(visible)

    if (!visible) {
      setTimeout(() => {
        setIsSubMenu(false)
        setMenuHeaderTitle(t('dashboard.create.menu.title.create'))
      }, 1000)
    }
  }

  const handleEditClientNote = () => {
    const notes = [...noteItems]
    if (currentNote) notes[currentClientNote].content = currentNote
    setNoteItems(notes)
    setCurrentNote('')
    setCurrentClientNote(-1)
  }

  const handleDeleteClientNote = (index) => {
    const notes = [...noteItems]
    notes.splice(index, 1)
    setNoteItems(notes)
    setCurrentNote('')
    setCurrentClientNote(-1)
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
                      <Avatar src={item.avatar} name={item.client} size={32} />
                    </div>
                    <div>
                      <div className={styles.content}>{item.content}</div>
                      <div className={styles.client}>{`By ${item.client}`}</div>
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
                        onClick={() => handleDeleteClientNote(index)}
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
                        onClick={() => handleEditClientNote()}
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

  const mobileHeaderOps = (
    <div className={styles.mobileHeaderOpsContainer}>
      {showHeaderOpsDrawer && (
        <>
          <div
            className={styles.item}
            onClick={() => {
              setSubOps(1)
              setShowHeaderOpsDrawer(false)
            }}
          >
            <MedicalHistory className={styles.headerOpsIcon} /> Medical history
          </div>
          <div
            className={styles.item}
            onClick={() => {
              setSubOps(2)
              setShowHeaderOpsDrawer(false)
            }}
          >
            <Note className={styles.headerOpsIcon} /> Notes
          </div>
          <div
            className={styles.item}
            onClick={() => {
              setSubOps(3)
              setShowHeaderOpsDrawer(false)
            }}
          >
            <Alert className={styles.headerOpsIcon} /> Staff alerts
          </div>
        </>
      )}
      {!showHeaderOpsDrawer && subOps === 1 && (
        <div>{medicalHistoryPopover}</div>
      )}
      {!showHeaderOpsDrawer && subOps === 2 && <div>{clientNotesPopover}</div>}
      {!showHeaderOpsDrawer && subOps === 3 && <div>{clientAlertsPopover}</div>}
    </div>
  )

  const plusButtonContent = (
    <div>
      {!isMobile && (
        <div className={styles.contentHeader}>
          {isSubMenu && (
            <LeftOutlined
              style={{
                fontSize: '12px',
                color: '#9292A3',
                marginRight: '16px',
              }}
              onClick={onBackToMainMenu}
            />
          )}
          {menuHeaderTitle}
        </div>
      )}
      {isMobile && isSubMenu && (
        <div className={styles.contentHeaderMobile}>
          <LeftOutlined
            style={{
              fontSize: '12px',
              color: '#9292A3',
              marginRight: '16px',
            }}
            onClick={onBackToMainMenu}
          />
          {t('dashboard.create.menu.title.communication')}
        </div>
      )}
      {!isMobile && <div className={styles.divider} />}
      {!isSubMenu && (
        <div className={styles.plusContentItems}>
          {menuItems.map((mi) => {
            return generateMenuItem(mi)
          })}
        </div>
      )}
      {isSubMenu && (
        <div className={styles.plusContentItems}>
          {subMenuItems.map((smi) => {
            return generateSubMenuItem(smi)
          })}
        </div>
      )}
    </div>
  )

  const haveSubTabs = ['financial', 'gift-vouchers']

  //TODO: remove the Modal from top level (it'll break css:( )
  return (
    <Modal
      visible={true}
      transitionName="" //TODO: only set this to empty after first animation?
      closable={false}
      footer={null}
      width={'100%'}
      wrapClassName={styles.clientCard}
    >
      <ConfigProvider
        getPopupContainer={(node) => {
          if (node) {
            return node as HTMLElement
          }
          return document.body as HTMLElement
        }}
      >
        {client?.dob &&
          moment().format('MM/DD') === moment(client?.dob).format('MM/DD') && (
            <Confetti
              recycle={false}
              tweenDuration={60000}
              numberOfPieces={1000}
            />
          )}
        <div className={styles.clientCardContainer}>
          <div className={styles.clientCardHeader}>
            <div className={styles.clientCardHeaderTitle}>
              <LeftOutlined
                onClick={() => {
                  window.dispatchEvent(new Event('storage'))
                  onClose?.()
                }}
                className={styles.backToButton}
              />
              {isMobile && (
                <div className={styles.detailsAvatar}>
                  <div
                    className={styles.avatarContent}
                    onClick={() => setShowAvatarUploader(true)}
                  >
                    <Avatar src={client?.avatar} size={30} />
                  </div>
                  <AvatarUploader
                    visible={showAvatarUploader}
                    title={t('ui.clientdetails.uploadavatar.title')}
                    onCreate={() => alert('TODO')}
                    imageURL={client ? client.avatar : ''}
                    onCancel={() => setShowAvatarUploader(false)}
                  />
                </div>
              )}
              <div
                className={styles.clientFullName}
                onClick={() => !search && setSearch(true)}
              >
                {loading ? (
                  <Skeleton
                    className={styles.skeletonName}
                    paragraph={false}
                    active
                  />
                ) : !search && client?.fullName ? (
                  client?.fullName
                ) : (
                  search && (searchRender ? searchRender() : <Search />)
                )}
              </div>
            </div>
            <div className={styles.clientCardHeaderOps}>
              {isMobile && (
                <div>
                  <Drawer
                    closable={false}
                    placement="bottom"
                    visible={showMobileHeaderOps}
                    onClose={() => setShowMobileHeaderOps(false)}
                    className={styles.createContentMobile}
                  >
                    <div className={styles.createContentMobileHeader}>
                      <div
                        className={styles.handler}
                        onClick={() => setShowMobileHeaderOps(false)}
                      />
                      <div className={styles.title}>
                        {t('dashboard.create.menu.title.create')}
                      </div>
                    </div>
                    <div className={styles.createContentMobileBody}>
                      {mobileHeaderOps}
                    </div>
                  </Drawer>
                  <div
                    className={styles.moreButton}
                    onClick={() => {
                      setShowMobileHeaderOps(true)
                      setShowHeaderOpsDrawer(true)
                    }}
                  >
                    <MoreOutlined />
                  </div>
                </div>
              )}
              {!isMobile && (
                <ClientHeaderDetails
                  notes={notes}
                  medicalHistoryDetails={medicalHistoryDetails}
                  getContactDetails={getContactDetails}
                  client={client}
                  handleAddNewClientNote={handleAddNewClientNote}
                  handleEditNote={handleEditNote}
                  handleDeleteNote={handleDeleteNote}
                />
              )}
            </div>
          </div>
          <div className={styles.clientCardBody}>
            <div className={styles.clientDetails}>
              <ClientDetails
                clientData={client}
                onCreateEmail={() => handleCreatePopout('email')}
                onCreateCall={() => handleCreatePopout('call')}
                searchResults={thirdPartySearchResults}
                appointments={appointments}
                referredByOptions={referredByOptions}
                loading={loading}
                customFields={customFields}
                dateFormat={dateFormat}
                handleEditAll={handleEditAll}
                updatebasicContactMutation={updatebasicContactMutation}
                updateContactCustomMutation={updateContactCustomMutation}
                clientId={clientId}
                companyId={companyId}
                setBasicContactData={setBasicContactData}
                showAvatarModal={showAvatarModal}
              />
            </div>
            <div className={styles.clientCardContent}>
              <CustomTabMenu
                tabPosition={isMobile ? 'top' : 'left'}
                tabWidth={isMobile ? '160px' : '200px'}
                tabs={tabs || []}
                onActiveChanged={(key) => onTabChanged?.(key)}
                activeTab={activeTab}
                minHeight={isMobile ? '1px' : '750px'}
              >
                <div
                  className={
                    haveSubTabs.includes(activeTab)
                      ? styles.customTabs
                      : t(
                          'clients.communications.title'
                        ).toLocaleLowerCase() === activeTab
                      ? ''
                      : styles.tab
                  }
                >
                  <ClientDashboardLayout>{children}</ClientDashboardLayout>
                </div>
                {/*<div>*/}
                {/*  <ClientAppointmentsLayout isEmpty={true} />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  {FinancialTabComponent ? (*/}
                {/*    FinancialTabComponent*/}
                {/*  ) : (*/}
                {/*    <ClientFinancialsLayout />*/}
                {/*  )}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientPackagesLayout items={clientPackages} />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientCommunicationsLayout isEmpty={true} />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientFormsLayout*/}
                {/*    isEmpty={false}*/}
                {/*    formFilters={formFilterButtons}*/}
                {/*    forms={forms}*/}
                {/*    onButtonFilterClick={(e) => {*/}
                {/*      console.log('Filter button selected:', e) //Removed while integration*/}
                {/*      return Promise.resolve(true)*/}
                {/*    }}*/}
                {/*    onFilterClick={(e) => Promise.resolve(true)}*/}
                {/*    onPrintClick={(e) => Promise.resolve(true)}*/}
                {/*    onShareCick={(e) => Promise.resolve(true)}*/}
                {/*    onVersionClick={(e) => Promise.resolve(true)}*/}
                {/*    onEditClick={(e) => Promise.resolve(true)}*/}
                {/*    onPinClick={(e) => Promise.resolve(true)}*/}
                {/*    onDeleteClick={(e) => Promise.resolve(true)}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientPhotosLayout isEmpty={true} />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientDocumentsLayout isEmpty={true} />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientPrescriptionsLayout*/}
                {/*    isEmpty={false}*/}
                {/*    prescriptions={prescriptions}*/}
                {/*    onPreviewClick={(e) => {*/}
                {/*      console.log('Preview selected:', e)*/}
                {/*      return Promise.resolve(true)*/}
                {/*    }}*/}
                {/*    onPrintClick={(e) => Promise.resolve(true)}*/}
                {/*    onShareClick={(e) => Promise.resolve(true)}*/}
                {/*    onEditClick={(e) => Promise.resolve(true)}*/}
                {/*    onRepeatClick={(e) => Promise.resolve(true)}*/}
                {/*    onDeleteClick={(e) => Promise.resolve(true)}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientLabTestsLayout*/}
                {/*    isEmpty={false}*/}
                {/*    testList={testList}*/}
                {/*    onViewReportClick={(e) => {*/}
                {/*      console.log('View report selected:', e)*/}
                {/*      return Promise.resolve(true)*/}
                {/*    }}*/}
                {/*    onPrintClick={(e) => Promise.resolve(true)}*/}
                {/*    onShareClick={(e) => Promise.resolve(true)}*/}
                {/*    onDeleteClick={(e) => Promise.resolve(true)}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientVaccineHistoryLayout isEmpty={true} />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientGiftVoucherLayout*/}
                {/*    isEmpty={false}*/}
                {/*    activeVouchers={activeVouchers}*/}
                {/*    expiredVouchers={expiredVouchers}*/}
                {/*    onCardSelect={(e) => {*/}
                {/*      console.log('Card selected:', e)*/}
                {/*      return Promise.resolve(true)*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientLoyaltyLayout*/}
                {/*    isEmpty={false}*/}
                {/*    data={loyaltyData}*/}
                {/*    onLoyaltySelect={(e) => {*/}
                {/*      console.log('Loyalty selected:', e) //Removed while integration*/}
                {/*      return Promise.resolve(true)*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <ClientTaskLayout isEmpty={true} />*/}
                {/*</div>*/}
              </CustomTabMenu>
            </div>
          </div>
          <div className={styles.clientCreateButton}>
            {!isMobile && (
              <Popover
                placement="topRight"
                content={plusButtonContent}
                overlayClassName={styles.plusButtonContent}
                trigger="click"
                onVisibleChange={onChangeVisibleHanlder}
                visible={isOpenMenu}
              >
                <div className={styles.createButton}>
                  <PlusOutlined />
                </div>
              </Popover>
            )}
            {isMobile && (
              <Button
                type="primary"
                className={styles.createButton}
                onClick={() => setIsOpenMenu(true)}
              >
                <PlusOutlined />
              </Button>
            )}
          </div>
          <div className={styles.stickyPopoutContainer}>
            <StickyPopout />
          </div>
        </div>
        {isMobile && (
          <Drawer
            visible={isOpenMenu}
            placement="bottom"
            closable={false}
            onClose={() => setIsOpenMenu(false)}
            className={styles.createContentMobile}
          >
            <div className={styles.createContentMobileHeader}>
              <div
                className={styles.handler}
                onClick={() => setIsOpenMenu(false)}
              />
              <div className={styles.title}>
                {t('dashboard.create.menu.title.create')}
              </div>
            </div>
            <div className={styles.createContentMobileBody}>
              {plusButtonContent}
            </div>
          </Drawer>
        )}
      </ConfigProvider>
    </Modal>
  )
}

export const ClientCard: FC<P> = ({ ...props }) => {
  return <ClientCardModal {...props} />
}

export default ClientCard
