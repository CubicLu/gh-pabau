import {
  ClientData,
  ClientDetails,
  CustomTabMenu,
  ClientDashboardLayout,
  Button,
  TabMenu,
  Avatar,
  Search,
  StickyPopout,
} from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Modal, Popover, Input } from 'antd'
import {
  RightOutlined,
  LeftOutlined,
  EyeOutlined,
  PrinterOutlined,
  MailOutlined,
  HistoryOutlined,
  PlusOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import React, { FC, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useMedia } from 'react-use'
import { ReactComponent as MedicalHistory } from '../../assets/images/client-card-ops/medical-history.svg'
import { ReactComponent as Note } from '../../assets/images/client-card-ops/note.svg'
import { ReactComponent as Alert } from '../../assets/images/client-card-ops/alert.svg'
import { ReactComponent as SvgPathway } from '../../assets/images/popout/pathway.svg'
import { ReactComponent as SvgTreatment } from '../../assets/images/popout/treatment.svg'
import { ReactComponent as SvgRequest } from '../../assets/images/popout/request.svg'
import { ReactComponent as SvgPrescription } from '../../assets/images/popout/prescription.svg'
import { ReactComponent as SvgAppointment } from '../../assets/images/popout/appointment.svg'
import { ReactComponent as SvgScale } from '../../assets/images/popout/scale.svg'
import { ReactComponent as SvgCommunication } from '../../assets/images/popout/communication.svg'
import { ReactComponent as SvgEmail } from '../../assets/images/popout/email.svg'
import { ReactComponent as SvgLetter } from '../../assets/images/popout/letter.svg'
import { ReactComponent as SvgCall } from '../../assets/images/popout/call.svg'
import { ReactComponent as SvgSMS } from '../../assets/images/popout/sms.svg'
import menuAlert from '../../assets/images/menu-alert.svg'
import styles from './ClientCard.module.less'
import {
  nextAppointments,
  medicalHistory,
  medications,
  conversation,
  tests,
  products,
} from './mock'

const { TextArea } = Input

interface PopoutProps {
  id: string
  type: string
  clientId: string
  title: string
}

interface ClientNote {
  avatar: string
  content: string
  client: string
  date: string
}

interface ClientNotes {
  client: ClientNote[]
  appointment: ClientNote[]
}

interface SearchItem {
  id: string
  firstName: string
  lastName: string
  avatarUrl: string
}

export interface ClientCardProps {
  searchResults: SearchItem[]
  visible: boolean
  clientData: ClientData
  notes: ClientNotes
  medicalConditions: string[]
  alerts: string[]
  onClose: () => void
}

const ClientCardModal: FC<ClientCardProps> = ({
  visible,
  clientData,
  searchResults,
  notes,
  medicalConditions,
  alerts,
  onClose,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [init, setInit] = useState(false)
  const [client, setClient] = useState<ClientData>()
  const [search, setSearch] = useState(false)
  const [alert, setAlert] = useState('')
  const [note, setNote] = useState('')
  const [noteItems, setNoteItems] = useState<ClientNote[]>([])
  const [alertItems, setAlertItems] = useState<string[]>([])
  const [addingAlert, setAddingAlert] = useState(false)
  const [addingNote, setAddingNote] = useState(false)

  const customTabMenutItem = (title, alert) => {
    return (
      <div className={styles.customTabMenuItem}>
        <div>{title}</div>
        <div style={{ backgroundImage: `url(${menuAlert})` }}>{alert}</div>
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
      content: customTabMenutItem('Financials', 5),
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
          content: 'EMR 1',
        },
        {
          key: 6,
          content: 'EMR 2',
        },
      ],
    },
    {
      key: 7,
      content: customTabMenutItem('Gift voucher', 15),
    },
    {
      key: 8,
      content: customTabMenutItem('Loyalty', 7),
    },
    {
      key: 9,
      content: customTabMenutItem('Tasks & Recalls', 8),
    },
  ]
  const [showMobileHeaderOps, setShowMobileHeaderOps] = useState(false)
  const [subOps, setSubOps] = useState(0)
  const [menuHeaderTitle, setMenuHeaderTitle] = useState(
    t('dashboard.create.menu.title.create')
  )
  const [isSubMenu, setIsSubMenu] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleAddAlert = () => {
    if (alert !== '') {
      const items = [...alertItems, alert]
      setAlertItems(items)
      setAlert('')
    }
    setAddingAlert(false)
  }

  const handleAddNote = () => {
    if (note !== '') {
      const items: ClientNote[] = [
        ...noteItems,
        {
          content: note,
          date: moment().format('YYYY-MM-DD hh:mm A'),
          client: client?.fullName || '',
          avatar: client?.avatar || '',
        },
      ]
      setNoteItems(items)
      setNote('')
    }
    setAddingNote(false)
  }

  const handleSearchSelect = (id) => {
    const selected = searchResults.find((el) => Number(el.id) === id)
    if (selected && client) {
      const { firstName, lastName } = selected
      setClient({ ...client, fullName: `${firstName} ${lastName}` })
    }
    setSearch(false)
  }

  const onClickCommunication = () => {
    setIsSubMenu(true)
    setMenuHeaderTitle(t('dashboard.create.menu.title.communication'))
  }

  const onBackToMainMenu = () => {
    setIsSubMenu(false)
    setMenuHeaderTitle(t('dashboard.create.menu.title.create'))
  }

  const menuItems = [
    {
      name: t('dashboard.create.menu.item.pathway.title'),
      icon: <SvgPathway className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.pathway.description'),
    },
    {
      name: t('dashboard.create.menu.item.treatment.title'),
      icon: <SvgTreatment className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.treatment.description'),
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
    },
    {
      name: t('dashboard.create.menu.item.appointment.title'),
      icon: <SvgAppointment className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.appointment.description'),
    },
    {
      name: t('dashboard.create.menu.item.scale.title'),
      icon: <SvgScale className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.scale.description'),
    },
    {
      name: t('dashboard.create.menu.item.communication.title'),
      icon: <SvgCommunication className={styles.menuItemIcon} />,
      description: t('dashboard.create.menu.item.communication.description'),
      handler: onClickCommunication,
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
      handler: () => handleCreatePopout('email'),
    },
    {
      name: t('dashboard.create.menu.item.call.title'),
      icon: <SvgCall className={styles.svgType} />,
      handler: () => handleCreatePopout('form'),
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
        {data.handler && (
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
        <div>{data.name}</div>
      </div>
    )
  }

  const handleCreatePopout = async (type) => {
    const popoutList = JSON.parse(
      window.localStorage.getItem('pabau_popout_list') || '[]'
    )
    let item: PopoutProps = {
      id: '',
      type: '',
      clientId: '',
      title: '',
    }
    switch (type) {
      case 'sms': {
        item = {
          type,
          title: t('dashboard.create.modal.create.sms.title'),
          id: uuidv4(),
          clientId: '',
        }
        break
      }
      case 'email': {
        item = {
          type,
          title: t('dashboard.create.modal.create.email.title'),
          id: uuidv4(),
          clientId: '',
        }
        break
      }
      case 'letter': {
        item = {
          type,
          title: t('dashboard.create.modal.create.letter.title'),
          id: uuidv4(),
          clientId: '',
        }
        break
      }
      case 'form': {
        item = {
          type,
          title: t('dashboard.create.modal.create.form.title'),
          id: uuidv4(),
          clientId: '',
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
    await window.localStorage.setItem(
      'pabau_popout_fullscreen',
      JSON.stringify(false)
    )
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

  useEffect(() => {
    if (!init) {
      if (alerts.length > 0) setAlertItems(alerts)
      if (clientData) setClient(clientData)
      if (notes?.client?.length > 0) setNoteItems(notes.client)
      setInit(true)
    }
  }, [init, alerts, clientData, notes])

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
          {alertItems.map((item, index) => (
            <div className={styles.staffAlert} key={`staff-alert-${index}`}>
              {item}
            </div>
          ))}
        </div>
      )}
      {addingAlert && (
        <TextArea
          autoFocus
          value={alert}
          onChange={(e) => setAlert(e.target.value)}
          onPressEnter={(_) => handleAddAlert()}
          onBlur={(_) => handleAddAlert()}
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
          <div className={styles.clientNotesContainer}>
            {noteItems.map((note, index) => (
              <div key={`client-${index}`} className={styles.clientNote}>
                <div>
                  <Avatar src={note.avatar} name={note.client} size={32} />
                </div>
                <div>
                  <div className={styles.content}>{note.content}</div>
                  <div className={styles.client}>{`By ${note.client}`}</div>
                  <div className={styles.date}>{`On ${moment(note.date).format(
                    'D MMM YYYY hh:mm A'
                  )}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.clientNoteAdd}>
            {addingNote && (
              <TextArea
                value={note}
                autoFocus
                onChange={(e) => setNote(e.target.value)}
                onPressEnter={(_) => handleAddNote()}
                onBlur={(_) => handleAddNote()}
                style={{ marginBottom: '8px' }}
              />
            )}
            <Button
              icon={<PlusOutlined />}
              type="primary"
              block
              onClick={() => setAddingNote(true)}
            >
              Create Note
            </Button>
          </div>
        </div>
        <div className={styles.clientNotesTab}>
          <div className={styles.clientNotesContainer}>
            {notes.appointment.map((note, index) => (
              <div key={`appointment-${index}`} className={styles.clientNote}>
                <div>
                  <Avatar src={note.avatar} name={note.client} size={32} />
                </div>
                <div>
                  <div className={styles.content}>{note.content}</div>
                  <div className={styles.client}>{`By ${note.client}`}</div>
                  <div className={styles.date}>{`On ${moment(note.date).format(
                    'D MMM YYYY hh:mm A'
                  )}`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabMenu>
    </div>
  )

  const mobileHeaderOps = (
    <div className={styles.mobileHeaderOpsContainer}>
      {showMobileHeaderOps && (
        <>
          <div
            className={styles.item}
            onClick={() => {
              setSubOps(1)
              setShowMobileHeaderOps(false)
            }}
          >
            <MedicalHistory className={styles.headerOpsIcon} /> Medical history
          </div>
          <div
            className={styles.item}
            onClick={() => {
              setSubOps(2)
              setShowMobileHeaderOps(false)
            }}
          >
            <Note className={styles.headerOpsIcon} /> Notes
          </div>
          <div
            className={styles.item}
            onClick={() => {
              setSubOps(3)
              setShowMobileHeaderOps(false)
            }}
          >
            <Alert className={styles.headerOpsIcon} /> Staff alerts
          </div>
        </>
      )}
      {!showMobileHeaderOps && subOps === 1 && (
        <div>{medicalHistoryPopover}</div>
      )}
      {!showMobileHeaderOps && subOps === 2 && <div>{clientNotesPopover}</div>}
      {!showMobileHeaderOps && subOps === 3 && <div>{clientAlertsPopover}</div>}
    </div>
  )

  const plusButtonContent = (
    <div>
      <div className={styles.contentHeader}>
        {isSubMenu && (
          <LeftOutlined
            style={{ fontSize: '12px', color: '#9292A3', marginRight: '16px' }}
            onClick={onBackToMainMenu}
          />
        )}
        {menuHeaderTitle}
      </div>
      <div className={styles.divider} />
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

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      width={'100%'}
      wrapClassName={styles.clientCard}
    >
      <div className={styles.clientCardContainer}>
        <div className={styles.clientCardHeader}>
          <div className={styles.clientCardHeaderTitle}>
            <LeftOutlined
              onClick={() => {
                window.dispatchEvent(new Event('storage'))
                onClose()
              }}
              className={styles.backToButton}
            />
            <div
              className={styles.clientFullName}
              onClick={() => !search && setSearch(true)}
            >
              {!search && `${client?.fullName}`}
              {search && (
                <Search
                  searchResults={searchResults}
                  resultSelectedHandler={(id) => handleSearchSelect(id)}
                />
              )}
            </div>
          </div>
          <div className={styles.clientCardHeaderOps}>
            {isMobile && (
              <div className={styles.clientCardHeaderOp}>
                <Popover
                  trigger="click"
                  placement="bottomRight"
                  overlayClassName={styles.mobileHeaderOps}
                  content={mobileHeaderOps}
                >
                  <div
                    className={styles.moreButton}
                    onClick={() => setShowMobileHeaderOps(true)}
                  >
                    <MoreOutlined />
                  </div>
                </Popover>
              </div>
            )}
            {!isMobile && (
              <>
                <div className={styles.clientCardHeaderOp}>
                  <Popover
                    title={'Medical history'}
                    placement="bottomRight"
                    trigger="click"
                    content={medicalHistoryPopover}
                    overlayClassName={styles.clientCardHeaderPopover}
                  >
                    <MedicalHistory className={styles.headerOpsIcon} />
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
                    <Note className={styles.headerOpsIcon} />
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
                    <Alert className={styles.headerOpsIcon} />
                  </Popover>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.clientCardBody}>
          <div className={styles.clientDetails}>
            {client && <ClientDetails clientData={client} />}
          </div>
          <div className={styles.clientCardContent}>
            <CustomTabMenu
              tabPosition={isMobile ? 'top' : 'left'}
              tabWidth={isMobile ? '160px' : '200px'}
              tabItems={tabItems}
              minHeight={isMobile ? '1px' : '750px'}
            >
              <div style={{ padding: '24px' }}>
                <ClientDashboardLayout
                  nextAppointments={nextAppointments}
                  medicalHistory={medicalHistory}
                  medications={medications}
                  products={products}
                  tests={tests}
                  alerts={alertItems}
                  conversation={conversation}
                />
              </div>
              <div>Appointments Content</div>
              <div>Financials Content</div>
              <div>Packages Content</div>
              <div>Communications Content</div>
              <div>EMR Content 1</div>
              <div>EMR Content 2</div>
              <div>Gift voucher Content</div>
              <div>Loyalty Content</div>
              <div>Tasks & Recalls Content</div>
            </CustomTabMenu>
          </div>
        </div>
        <div className={styles.clientCreateButton}>
          <Popover
            placement="topRight"
            content={plusButtonContent}
            overlayClassName={styles.plusButtonContent}
            trigger="click"
            onVisibleChange={onChangeVisibleHanlder}
            visible={isOpenMenu}
          >
            <Button type="primary" className={styles.createButton}>
              <PlusOutlined />
            </Button>
          </Popover>
        </div>
        <div className={styles.stickyPopoutContainer}>
          <StickyPopout />
        </div>
      </div>
    </Modal>
  )
}

export const ClientCard: FC<ClientCardProps> = ({ visible, ...props }) => {
  return visible ? <ClientCardModal visible={visible} {...props} /> : <div />
}

export default ClientCard
