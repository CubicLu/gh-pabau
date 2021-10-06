import {
  CloseOutlined,
  EditOutlined,
  LeftOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  MoreOutlined,
  PieChartOutlined,
  DeleteOutlined,
  PhoneFilled,
  DownOutlined,
  KeyOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import {
  AddContact,
  AddRelationship,
  AddThirdParty,
  Avatar,
  AvatarUploader,
  Relationship,
  RelationshipType,
  CustomizeFields,
  InlineEditDataTypes,
  Button,
  CreateLabels,
  InlineEdit,
  AddAddress,
  AddressValueProp,
} from '@pabau/ui'
import {
  Carousel,
  Form,
  Popconfirm,
  Popover,
  Tooltip,
  Modal,
  Badge,
  Skeleton,
} from 'antd'
import { CarouselRef } from 'antd/lib/carousel'
import cn from 'classnames'
import moment from 'moment'
import React, { FC, useEffect, useRef, useState } from 'react'
import { CardBadgeComponent } from './CardBadgeComponent'
import { ConnectionBadgeComponent } from './ConnectionBadgeComponent'
import ClientInfoInlineEdit from './ClientInfoInlineEdit'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import dayjs from 'dayjs'
import { ReactComponent as DefaultPayerBupa } from '../../assets/images/default-payer-bupa.svg'
import { ReactComponent as MedicalCenterGrey } from '../../assets/images/medical-center-grey.svg'
import { ReactComponent as MedicalCenter } from '../../assets/images/medical-center.svg'
import { ReactComponent as CardImg } from '../../assets/images/client-card/card.svg'
import { ReactComponent as CheckImg } from '../../assets/images/client-card/check.svg'
import { ReactComponent as ConnectionImg } from '../../assets/images/client-card/connection.svg'
import { ReactComponent as DeleteImg } from '../../assets/images/client-card/delete.svg'
import { ReactComponent as PlusImg } from '../../assets/images/client-card/plus.svg'
import styles from './ClientDetails.module.less'

interface Labels {
  label?: string
  count?: number
  color?: string
}

export interface ReferredByOption {
  id: number
  name: string
}

export interface PhoneProp {
  mobile: string
  home: string
}

export interface ClientData extends AddressValueProp {
  avatar: string
  isActive: boolean
  cardOption: string
  fullName: string
  firstName: string
  lastName: string
  labels: Labels[]
  onAccount: number
  outStanding: number
  patientID: string
  referredBy: string
  dob: string
  gender: string
  address: string
  phone: PhoneProp
  mobile: string
  email: string
  regDate: string
  relationships: Relationship[]
  defaultPayer: string
  discount: string
  pricelist: string
  membershipNumber: string
  allocatedAuthorisations: string
}

interface SearchItem {
  name: string
  street: string
  postCode: string
  city: string
  country: string
  phone: string
}

interface Appointment {
  id: string
  firstName: string
  lastName: string
  avatarUrl?: string
  mobile?: string
  email?: string
}

export interface ClientDetailsProps {
  clientData: ClientData
  referredByOptions?: ReferredByOption[]
  customFields?: FieldOrderItem[]
  loading?: boolean
  onCreateEmail: () => void
  onCreateCall: () => void
  searchResults: SearchItem[]
  appointments: Appointment[]
  dateFormat: string
}

enum FieldType {
  patientId,
  referredBy,
  dob,
  gender,
  address,
  mobile,
  email,
  priceList,
  membershipNumber,
}

export interface FieldOrderItem {
  title: string
  fieldName: string
  type: string
  field: FieldType
  value: string | PhoneProp
  selectOptions?: string[]
}

export const ClientDetails: FC<ClientDetailsProps> = ({
  clientData,
  onCreateEmail,
  onCreateCall,
  searchResults,
  appointments,
  referredByOptions,
  loading,
  customFields,
  dateFormat,
}) => {
  const { t } = useTranslation('common')
  const [initFields, setInitFields] = useState(false)
  const defaultFieldOrder = [
    {
      type: 'string',
      field: FieldType.patientId,
      fieldName: 'patientID',
      title: t('ui.clientdetails.patientid'),
      value: '',
    },
    {
      type: 'list',
      field: FieldType.referredBy,
      fieldName: 'referredBy',
      title: t('ui.clientdetails.referredby'),
      value: '',
      selectOptions: [],
    },
    {
      type: 'date',
      field: FieldType.dob,
      fieldName: 'dob',
      title: t('ui.clientdetails.dob'),
      value: '',
    },
    {
      type: 'list',
      field: FieldType.gender,
      fieldName: 'gender',
      title: t('ui.clientdetails.gender'),
      value: '',
      selectOptions: ['Male', 'Female'],
    },
    {
      type: 'address',
      field: FieldType.address,
      fieldName: 'address',
      title: t('ui.clientdetails.address'),
      value: '',
    },
    {
      type: 'basicPhone',
      field: FieldType.mobile,
      fieldName: 'phone',
      title: t('ui.clientdetails.mobilephone'),
      value: {
        mobile: '',
        home: '',
      },
      selectOptions: ['Mobile', 'Home'],
    },
    {
      type: 'email',
      field: FieldType.email,
      fieldName: 'email',
      title: t('ui.clientdetails.email'),
      value: '',
    },
  ]

  const priceList: FieldOrderItem = {
    type: InlineEditDataTypes.list,
    field: FieldType.priceList,
    fieldName: 'pricelist',
    title: 'PriceList',
    value: '100',
    selectOptions: ['100', '200', '300', '400', '500'],
  }

  const membershipNumber: FieldOrderItem = {
    type: InlineEditDataTypes.text,
    field: FieldType.membershipNumber,
    fieldName: 'membershipNumber',
    title: 'Membership Number',
    value: 'BL-4444-0000-2222',
  }

  const billingDetailsItem: FieldOrderItem[] = [
    {
      type: InlineEditDataTypes.list,
      field: FieldType.priceList,
      fieldName: 'pricelist',
      title: 'PriceList',
      value: '',
      selectOptions: ['100', '200', '300', '400', '500'],
    },
    {
      type: InlineEditDataTypes.text,
      field: FieldType.membershipNumber,
      fieldName: 'membershipNumber',
      title: 'Membership Number',
      value: 'BL-4444-0000-2222',
    },
  ]

  const CardBadgeUpdateType = {
    plus: 'plus',
    check: 'check',
    delete: 'delete',
  }

  const ConnectionBadgeUpdateType = {
    plus: 'plus',
    check: 'check',
  }
  const isMobile = useMedia('(max-width: 767px)', false)
  const ref = useRef<CarouselRef>(null)
  const [client, setClient] = useState<ClientData>({
    avatar: '',
    isActive: true,
    cardOption: '',
    fullName: '',
    firstName: '',
    lastName: '',
    labels: [],
    onAccount: 0,
    outStanding: 0,
    patientID: '123',
    referredBy: '',
    dob: '1969-11-28',
    gender: '',
    address: '',
    street: '',
    city: '',
    county: '',
    postCode: '',
    country: '',
    phone: {
      mobile: '',
      home: '',
    },
    mobile: '',
    email: '',
    regDate: '2021-1-1',
    relationships: [],
    defaultPayer: 'Self paid',
    discount: '',
    pricelist: '',
    membershipNumber: '',
    allocatedAuthorisations: '',
  })
  const [initialized, setInitialized] = useState(false)
  const [activeClient, setActiveClient] = useState(true)
  const [hoverClientDetails, setHoverClientDetails] = useState(false)
  const [detailsCard, setDetailsCard] = useState(0)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [addRelationship, setAddRelationship] = useState(false)
  const [addContact, setAddContact] = useState(false)
  const [addThirdParty, setAddThirdParty] = useState(false)
  const [type, setType] = useState<RelationshipType>('family-member')
  const [customizingFields, setCustomizingFields] = useState(false)
  const [hoverDetails, setHoverDetails] = useState(false)
  const [fieldsOrder, setFieldsOrder] = useState<FieldOrderItem[]>(
    defaultFieldOrder
  )
  const [form] = Form.useForm()
  const [clientLabels, setClientLabels] = useState<Labels[]>([])
  const [cardBadgeUpdate, setCardBadgeUpdate] = useState(
    CardBadgeUpdateType.check
  )
  const [connectionBadgeUpdate, setConnectionBadgeUpdate] = useState(
    ConnectionBadgeUpdateType.check
  )
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)

  useEffect(() => {
    if (!initFields && clientData) {
      const fields = [...fieldsOrder]
      fields[0].value = clientData.patientID
      fields[1].value = clientData.referredBy
      fields[2].value = clientData.dob
      fields[3].value = clientData.gender
      fields[4].value = clientData.address
      fields[5].value = {
        mobile: clientData.phone.mobile,
        home: clientData.phone.home,
      }
      fields[6].value = clientData.email
      setInitFields(true)
    }
  }, [clientData, fieldsOrder, initFields])

  useEffect(() => {
    const result = fieldsOrder.map((item) => {
      if (item.fieldName === 'referredBy') {
        item.selectOptions = referredByOptions?.map((option) => {
          return option.name
        })
      }
      return item
    })
    setFieldsOrder([...result])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referredByOptions])

  useEffect(() => {
    if (customFields) {
      setFieldsOrder([...fieldsOrder, ...customFields])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customFields])

  const handleOpenAddModal = (type: RelationshipType) => {
    setType(type)
    if (
      type === 'family-member' ||
      type === 'emergency-contact' ||
      type === 'next-of-kin'
    ) {
      setAddRelationship(false)
      setAddContact(true)
    } else {
      setAddRelationship(false)
      setAddThirdParty(true)
    }
  }

  const handleAddRelationship = (relationship: Relationship) => {
    setAddContact(false)
    setAddThirdParty(false)
    const data = { ...client }
    const findIndex = data.relationships.findIndex((el) => {
      const {
        type,
        firstName,
        lastName,
        phone,
        email,
        address,
        avatar,
        surgeryName,
        company,
      } = relationship
      if (
        (type === 'family-member' ||
          type === 'emergency-contact' ||
          type === 'next-of-kin') &&
        el.type === type &&
        el.firstName === firstName &&
        el.lastName === lastName &&
        el.phone === phone &&
        el.email === email &&
        el.avatar === avatar
      )
        return true
      if (
        (type === 'company' || type === 'insurance-provider') &&
        el.type === type &&
        company === el.company &&
        address === el.address &&
        phone === el.phone
      )
        return true
      if (
        type === 'practioner' &&
        type === el.type &&
        el.surgeryName === surgeryName &&
        address === el.address &&
        phone === el.phone
      )
        return true
      return false
    })
    if (findIndex < 0) {
      data.relationships.push(relationship)
    }
    setClient(data)
  }

  const handleChangeDetailsCard = (val) => {
    if (!!ref && ref.current) {
      ref.current.goTo(val)
      setDetailsCard(val)
    }
  }

  const handleChangeImage = (avatar) => {
    setClient({ ...client, avatar })
  }

  const handleRemoveRelationship = (index) => {
    const data = { ...client }
    data.relationships.splice(index, 1)
    if (data.relationships.length === 0) data.defaultPayer = 'Self paid'
    setClient(data)
  }

  const handleSelectDefaultPayer = (payer) => {
    const data = { ...client }
    data.defaultPayer = payer
    setClient(data)
  }

  const moreButtonContent = (
    <div className={styles.moreButtonContent}>
      <div className={styles.item}>
        <div className={styles.icon}>
          <PieChartOutlined />
        </div>
        <div className={styles.title}>{t('ui.clientdetails.more.merge')}</div>
      </div>
      <div
        className={styles.item}
        onClick={() => setShowDeleteClientModal(true)}
      >
        <div className={styles.iconRed}>
          <DeleteOutlined />
        </div>
        <div className={styles.titleRed}>
          {t('ui.clientdetails.more.delete')}
        </div>
      </div>
    </div>
  )

  const setLabels = (val) => {
    setClientLabels([...val])
  }

  const handleUpdateFieldValue = (index: number, value: string | PhoneProp) => {
    const result = fieldsOrder.map((item, id) => {
      if (id === index) {
        item.value = value
      }
      return item
    })

    setFieldsOrder(result)
  }

  const handleUpdatePhoneFieldValue = (
    index: number,
    value: string,
    type: string
  ) => {
    const phone = {
      ...client.phone,
      [type]: value,
    }
    setClient({
      ...client,
      phone,
    })
    handleUpdateFieldValue(index, phone)
  }

  const handleAddAddress = (value: AddressValueProp) => {
    const { street, city, county, postCode, country } = value
    const addressJoin = [street, city, county, postCode, country]
      .filter((val) => val?.trim())
      .join(', ')
    setClient({
      ...client,
      street,
      city,
      county,
      postCode,
      country,
      address: addressJoin,
    })
    const result = fieldsOrder.map((item) => {
      if (item.fieldName === 'address') {
        item.value = addressJoin
      }
      return item
    })

    setFieldsOrder([...result])
  }

  const handleUpdateClientInfo = (key: string, value: string) => {
    setClient({ ...client, [key]: value })
  }

  const getFieldName = (fieldTitle: string) => {
    let result = 0
    // eslint-disable-next-line unicorn/no-array-for-each
    fieldsOrder.forEach((item, index) => {
      // eslint-disable-next-line unicorn/no-array-for-each
      Object.values(item).forEach((el, ind) => {
        if (el === fieldTitle) {
          result = index
        }
      })
    })
    return result
  }

  useEffect(() => {
    if (clientData && !initialized) {
      const { defaultPayer, relationships } = clientData
      setClient({
        ...clientData,
        defaultPayer: relationships.length > 0 ? defaultPayer : 'Self paid',
      })
      setInitialized(true)
    }
    if (clientData && initialized) {
      setClient(clientData)
      setClientLabels([...clientData?.labels])
    }
  }, [clientData, initialized])

  const updateCardBadgeComponent = () => {
    if (cardBadgeUpdate === CardBadgeUpdateType.check) {
      return <CheckImg />
    } else if (cardBadgeUpdate === CardBadgeUpdateType.plus) {
      return <PlusImg />
    } else if (cardBadgeUpdate === CardBadgeUpdateType.delete) {
      return <DeleteImg />
    }
  }

  const updateConnectionBadgeComponent = () => {
    if (connectionBadgeUpdate === ConnectionBadgeUpdateType.check) {
      return <CheckImg />
    } else if (connectionBadgeUpdate === ConnectionBadgeUpdateType.plus) {
      return <PlusImg />
    }
  }

  const handleCardBadgeUpdate = () => {
    if (cardBadgeUpdate === CardBadgeUpdateType.check) {
      setCardBadgeUpdate(CardBadgeUpdateType.plus)
    } else if (cardBadgeUpdate === CardBadgeUpdateType.plus) {
      setCardBadgeUpdate(CardBadgeUpdateType.delete)
    } else if (cardBadgeUpdate === CardBadgeUpdateType.delete) {
      setCardBadgeUpdate(CardBadgeUpdateType.check)
    }
  }

  const deleteCardTooltipTitle = (
    <span>{t('ui.clientdetails.delete.card.tooltop')}</span>
  )

  const checkConnectionBadgeTooltipTitle = (
    <span>Registered to Pabau Connect</span>
  )

  const plusConnectionBadgeTooltipTitle = (
    <span>Not registered to Pabau Connect</span>
  )

  const pabauConnectPopoverTitle = <span>Pabau connect</span>

  const handlePlusConnectionBadgeClick = () => {
    if (connectionBadgeUpdate === ConnectionBadgeUpdateType.check) {
      setConnectionBadgeUpdate(ConnectionBadgeUpdateType.plus)
    }
  }

  const handleCheckConnectionBadgeClick = () => {
    if (connectionBadgeUpdate === ConnectionBadgeUpdateType.check) {
      setConnectionBadgeUpdate(ConnectionBadgeUpdateType.plus)
    }
  }

  const plusConnectionBadgePopoverContent = (
    <div className={styles.plusConnectionBadgePopover}>
      <p>
        <KeyOutlined />
        Reset password
      </p>
      <p>
        <CloseCircleOutlined />
        Disable account
      </p>
      <p onClick={handlePlusConnectionBadgeClick}>
        <DeleteOutlined />
        Delete
      </p>
    </div>
  )

  const checkConnectionBadgePopoverContent = (
    <div className={styles.checkConnectionBadgePopover}>
      <p onClick={handleCheckConnectionBadgeClick}>
        <KeyOutlined />
        Reset password
      </p>
    </div>
  )

  return (
    <div
      className={styles.clientDetailsContainer}
      onMouseEnter={() => setHoverClientDetails(true)}
      onMouseLeave={() => setHoverClientDetails(false)}
    >
      {!isMobile && hoverClientDetails && (
        <div
          className={styles.arrowLeft}
          onClick={() => handleChangeDetailsCard(0)}
        >
          <LeftOutlined />
        </div>
      )}
      {!isMobile && hoverClientDetails && (
        <div
          className={styles.arrowRight}
          onClick={() => handleChangeDetailsCard(1)}
        >
          <RightOutlined />
        </div>
      )}
      {!isMobile && (
        <div className={styles.dotsContainer}>
          <div
            className={cn(
              styles.dot,
              detailsCard === 0 ? styles.active : styles.inactive
            )}
            onClick={() => handleChangeDetailsCard(0)}
          ></div>
          <div
            className={cn(
              styles.dot,
              detailsCard === 1 ? styles.active : styles.inactive
            )}
            onClick={() => handleChangeDetailsCard(1)}
          ></div>
        </div>
      )}
      {!isMobile && (
        <div className={styles.moreButtonContainer}>
          <Popover
            trigger="click"
            content={moreButtonContent}
            overlayClassName={styles.moreButtonPopover}
            placement="bottomRight"
          >
            <Button
              className={styles.dotButton}
              icon={<MoreOutlined />}
              shape="circle"
            />
          </Popover>
        </div>
      )}
      {!isMobile && (
        <div className={styles.detailsContent}>
          <Carousel autoplay={false} dots={false} ref={ref}>
            <div className={styles.detailsOne}>
              {loading ? (
                <div className={styles.detailsOne}>
                  <div className={styles.detailsOneContent}>
                    <div className={styles.detailsAvatar}>
                      <Skeleton.Avatar active size={112} shape={'circle'} />
                    </div>
                    <div className={styles.detailsClientName}>
                      <Skeleton
                        className={styles.skeletonName}
                        paragraph={false}
                        active
                      />
                    </div>
                    <div className={styles.detailsActiveStatus}>
                      <Skeleton
                        className={styles.skeletonStatus}
                        paragraph={false}
                        active
                        round
                      />
                    </div>
                    <div className={styles.detailsLabels}>
                      {[...Array.from({ length: 4 })].map((item, index) => (
                        <Skeleton
                          className={styles.skeletonLabel}
                          paragraph={false}
                          active
                          key={index}
                        />
                      ))}
                    </div>
                    <div className={styles.detailsContainer}>
                      <div className={styles.title}>
                        <Skeleton
                          className={styles.skeletonTitle}
                          paragraph={false}
                          active
                        />
                      </div>
                    </div>
                    {[...Array.from({ length: 7 })].map((item, index) => (
                      <div className={styles.clientDetailsItem} key={index}>
                        <div>
                          <div className={styles.title}>
                            <Skeleton
                              className={styles.skeletonTitle}
                              paragraph={false}
                              active
                            />
                          </div>
                          <div className={styles.content}>
                            <Skeleton
                              className={styles.skeletonContent}
                              paragraph={false}
                              active
                              round
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.detailsOneContent}>
                  <div className={styles.detailsAvatar}>
                    <div className={styles.avatarContent}>
                      <Avatar
                        src={client?.avatar}
                        size={112}
                        name={client?.fullName}
                      />
                      <div
                        className={styles.cardBadge}
                        onClick={handleCardBadgeUpdate}
                      >
                        {cardBadgeUpdate === CardBadgeUpdateType.delete ? (
                          <Tooltip
                            placement="top"
                            overlayInnerStyle={{
                              borderRadius: '3px',
                            }}
                            title={deleteCardTooltipTitle}
                          >
                            <div>
                              <CardBadgeComponent
                                primaryBadge={<CardImg />}
                                secondaryBadge={<DeleteImg />}
                              />
                            </div>
                          </Tooltip>
                        ) : (
                          <CardBadgeComponent
                            primaryBadge={<CardImg />}
                            secondaryBadge={updateCardBadgeComponent()}
                          />
                        )}
                      </div>
                      <div className={styles.connectionBadge}>
                        {connectionBadgeUpdate ===
                        ConnectionBadgeUpdateType.check ? (
                          <Popover
                            placement="topRight"
                            title={pabauConnectPopoverTitle}
                            content={plusConnectionBadgePopoverContent}
                            trigger="click"
                          >
                            <Tooltip
                              placement="top"
                              overlayInnerStyle={{
                                maxWidth: '128px',
                                borderRadius: '3px',
                              }}
                              title={checkConnectionBadgeTooltipTitle}
                            >
                              <div>
                                <ConnectionBadgeComponent
                                  primaryBadge={<ConnectionImg />}
                                  secondaryBadge={updateConnectionBadgeComponent()}
                                />
                              </div>
                            </Tooltip>
                          </Popover>
                        ) : (
                          <Popover
                            placement="topRight"
                            title={pabauConnectPopoverTitle}
                            content={checkConnectionBadgePopoverContent}
                            trigger="click"
                          >
                            <Tooltip
                              placement="top"
                              overlayInnerStyle={{
                                maxWidth: '128px',
                                borderRadius: '3px',
                              }}
                              title={plusConnectionBadgeTooltipTitle}
                            >
                              <div>
                                <ConnectionBadgeComponent
                                  primaryBadge={<ConnectionImg />}
                                  secondaryBadge={updateConnectionBadgeComponent()}
                                />
                              </div>
                            </Tooltip>
                          </Popover>
                        )}
                      </div>
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => setShowAvatarUploader(true)}
                    >
                      <EditOutlined />
                    </div>
                  </div>
                  <div className={styles.detailsClientName}>
                    <div className={!activeClient ? styles.inactiveName : ''}>
                      <ClientInfoInlineEdit
                        fieldTitle="First Name"
                        keyValue="firstName"
                        type={InlineEditDataTypes.text}
                        initialValue={client?.firstName}
                        onUpdateValue={handleUpdateClientInfo}
                      >
                        {client?.firstName}
                      </ClientInfoInlineEdit>{' '}
                      <ClientInfoInlineEdit
                        fieldTitle="Last Name"
                        keyValue="lastName"
                        type={InlineEditDataTypes.text}
                        initialValue={client?.lastName}
                        onUpdateValue={handleUpdateClientInfo}
                      >
                        {client?.lastName}
                      </ClientInfoInlineEdit>
                    </div>
                    <div className={styles.edit}>
                      <EditOutlined />
                    </div>
                  </div>
                  {activeClient && (
                    <div className={styles.detailsActiveStatus}>
                      <Popconfirm
                        title={t('ui.clientdetails.deactive.confirm')}
                        onConfirm={() => setActiveClient(false)}
                      >
                        <Tooltip title="Inactive">
                          <div className={styles.active}>
                            <div className={styles.greenDot} />
                            {t('ui.clientdetails.active')}
                          </div>
                        </Tooltip>
                      </Popconfirm>
                    </div>
                  )}
                  {!activeClient && (
                    <div className={styles.detailsActiveStatus}>
                      <Tooltip title="Activate">
                        <div
                          className={styles.deactivate}
                          onClick={() => setActiveClient(true)}
                        >
                          {t('ui.clientdetails.deactivate')}
                        </div>
                      </Tooltip>
                    </div>
                  )}
                  <div className={styles.detailsLabels}>
                    {clientLabels.map((label, index) => (
                      <div
                        className={styles.detailsLabel}
                        key={`client-label-${index}`}
                        style={{
                          color: label.color,
                          borderColor: label.color,
                          backgroundColor: `rgba(${label.color}, 0.5)`,
                        }}
                      >
                        {label.label}
                      </div>
                    ))}
                    <div className={styles.edit}>
                      <CreateLabels
                        labels={clientLabels}
                        setLabels={(val) => setLabels(val)}
                      >
                        <PlusCircleOutlined />
                      </CreateLabels>
                    </div>
                  </div>
                  {!customizingFields && (
                    <div className={styles.detailsContainer}>
                      <div className={styles.title}>
                        {t('ui.clientdetails.details')}
                      </div>
                      <div
                        className={styles.customizeFields}
                        onClick={() => setCustomizingFields(true)}
                      >
                        {t('ui.clientdetails.customise')}
                        <Tooltip
                          title={t('ui.clientdetails.customise.edit')}
                          overlayStyle={{ width: '100px' }}
                        >
                          <div
                            className={styles.editCustomizeFields}
                            onClick={() => setCustomizingFields(true)}
                          >
                            <EditOutlined />
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                  {!customizingFields &&
                    fieldsOrder.map((field, index) => (
                      <React.Fragment key={`client-details-item-${index}`}>
                        {field.type === InlineEditDataTypes.address ? (
                          <div
                            className={
                              field.value
                                ? styles.clientDetailsItem
                                : styles.emptyClientDetailsItem
                            }
                          >
                            <div>
                              <div className={styles.title}>{field.title}</div>
                              <div
                                className={cn(
                                  styles.content,
                                  field.value ? '' : styles.emptyContent
                                )}
                              >
                                {field.value}
                              </div>
                            </div>
                            <div
                              className={styles.addAddress}
                              onClick={(e) => {
                                e.preventDefault()
                                setShowAddressModal(true)
                              }}
                            >
                              <PlusCircleOutlined /> <h5>Add Address</h5>
                            </div>
                          </div>
                        ) : field.type === InlineEditDataTypes.basicPhone ? (
                          <div
                            className={
                              field.value['mobile'] || field.value['home']
                                ? styles.clientDetailsItem
                                : styles.emptyClientDetailsItem
                            }
                          >
                            <div className={styles.emptyHoverTag}>
                              <div className={styles.title}>{field.title}</div>
                              <div
                                className={cn(
                                  styles.content,
                                  styles.phoneContent,
                                  field.value ? '' : styles.emptyContent
                                )}
                              >
                                <InlineEdit
                                  fieldTitle={field.title}
                                  orderIndex={getFieldName(field.title)}
                                  type={field.type}
                                  initialValue={
                                    field.value || t('ui.clientdetails.empty')
                                  }
                                  onUpdateValue={handleUpdatePhoneFieldValue}
                                  selectOptions={field.selectOptions}
                                >
                                  {!field.value['mobile'] &&
                                  !field.value['home'] ? (
                                    t('ui.clientdetails.empty')
                                  ) : (
                                    <div className={styles.phoneLeftContent}>
                                      <div className={styles.phoneContentTitle}>
                                        {field.value['mobile'] && (
                                          <span>{`${field.value['mobile']} (Mobile)`}</span>
                                        )}
                                        {field.value['home'] && (
                                          <span>{`${field.value['home']} (Home)`}</span>
                                        )}
                                      </div>
                                      <div className={styles.phoneCallContent}>
                                        <Tooltip
                                          placement="top"
                                          title="Call with Caller"
                                        >
                                          <div
                                            className={styles.iconContent}
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              if (client[field.fieldName])
                                                onCreateCall()
                                            }}
                                          >
                                            <PhoneFilled />
                                          </div>
                                        </Tooltip>
                                        <div className={styles.iconContent}>
                                          <DownOutlined />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </InlineEdit>
                              </div>
                            </div>
                            <div className={styles.edit}>
                              <EditOutlined />
                            </div>
                          </div>
                        ) : (
                          !isMobile && (
                            <div
                              className={
                                field.value
                                  ? styles.clientDetailsItem
                                  : styles.emptyClientDetailsItem
                              }
                            >
                              <div>
                                <div className={styles.title}>
                                  {field.title}
                                </div>
                                <div
                                  className={cn(
                                    styles.content,
                                    field.value ? '' : styles.emptyContent,
                                    field.value &&
                                      field.type === InlineEditDataTypes.email
                                      ? styles.emailContent
                                      : ''
                                  )}
                                  onClick={() =>
                                    field.type === InlineEditDataTypes.email &&
                                    field.value &&
                                    onCreateEmail()
                                  }
                                >
                                  {field.type !== 'date' && (
                                    <InlineEdit
                                      fieldTitle={field.title}
                                      orderIndex={getFieldName(field.title)}
                                      type={field.type}
                                      initialValue={
                                        field.value ||
                                        t('ui.clientdetails.empty')
                                      }
                                      onUpdateValue={handleUpdateFieldValue}
                                      selectOptions={field.selectOptions}
                                    >
                                      {field.value ? (
                                        field.value
                                      ) : (
                                        <span>
                                          {t('ui.clientdetails.empty')}
                                        </span>
                                      )}
                                    </InlineEdit>
                                  )}
                                  {field.type === 'date' && (
                                    <InlineEdit
                                      fieldTitle={field.title}
                                      orderIndex={getFieldName(field.title)}
                                      type={field.type}
                                      initialValue={
                                        field.value &&
                                        typeof field.value === 'string'
                                          ? dayjs(field.value).format(
                                              dateFormat
                                            )
                                          : ''
                                      }
                                      dateFormat={dateFormat}
                                      onUpdateValue={handleUpdateFieldValue}
                                    >
                                      {field.value &&
                                      dateFormat &&
                                      typeof field.value === 'string'
                                        ? `${dayjs(field.value).format(
                                            dateFormat
                                          )} (${moment(field.value).fromNow(
                                            true
                                          )})`
                                        : t('ui.clientdetails.empty')}
                                    </InlineEdit>
                                  )}
                                </div>
                              </div>
                              <div className={styles.edit}>
                                <EditOutlined />
                              </div>
                            </div>
                          )
                        )}
                      </React.Fragment>
                    ))}
                  {customizingFields && (
                    <CustomizeFields
                      defaultOrder={fieldsOrder}
                      onCancel={() => setCustomizingFields(false)}
                      onChange={(order) => {
                        setFieldsOrder(order)
                        setCustomizingFields(false)
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            <div className={styles.detailsTwo}>
              <div className={styles.section}>
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>
                    {t('ui.clientdetails.relationships')}
                  </div>
                  <Tooltip
                    title={t('ui.clientdetails.relationships.tooltip')}
                    placement="bottom"
                  >
                    <QuestionCircleOutlined className={styles.tooltipIcon} />
                  </Tooltip>
                </div>
                <div className={styles.content}>
                  {client.relationships.length > 0 ? (
                    client.relationships.map((relationship, index) => (
                      <div
                        className={styles.relationshipItem}
                        key={`relationship-item-${index}`}
                      >
                        <div>
                          {relationship.avatar ? (
                            <Avatar src={relationship.avatar} size={32} />
                          ) : (
                            <MedicalCenter />
                          )}
                        </div>
                        <div>
                          <div className={styles.companyName}>
                            {relationship.company ||
                              relationship.surgeryName ||
                              `${relationship.firstName} ${relationship.lastName}`}
                          </div>
                          <div className={styles.address}>
                            {relationship.address || relationship.email}
                          </div>
                          <div className={styles.phone}>
                            {relationship.phone}
                          </div>
                        </div>
                        <div onClick={() => handleRemoveRelationship(index)}>
                          <CloseOutlined />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noRelationshipsCard}>
                      <MedicalCenterGrey style={{ marginBottom: '8px' }} />
                      <span>{t('ui.clientdetails.norelationships')}</span>
                    </div>
                  )}
                  <div
                    className={styles.addRelationshipButton}
                    onClick={() => setAddRelationship(true)}
                  >
                    <PlusOutlined style={{ marginRight: '8px' }} />{' '}
                    {t('ui.clientdetails.add')}
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>
                    {t('ui.clientdetails.billingdetails')}
                  </div>
                </div>
                <div className={styles.content}>
                  <Form form={form} layout="vertical">
                    {client.relationships.length === 0 ? (
                      <div className={styles.billingItem}>
                        <Form.Item
                          label={t('ui.clientdetails.defaultpayer')}
                          tooltip={t('ui.clientdetails.defaultpayer.tooltip')}
                        >
                          <div
                            className={styles.billingItemContent}
                            style={{ color: 'var(--grey-text-color)' }}
                          >
                            {client.defaultPayer}
                          </div>
                        </Form.Item>
                      </div>
                    ) : (
                      <div className={styles.billingItem}>
                        <Form.Item
                          label={t('ui.clientdetails.defaultpayer')}
                          tooltip={t('ui.clientdetails.defaultpayer.tooltip')}
                        >
                          <div className={styles.defaultPayerSelect}>
                            <div
                              onClick={() =>
                                handleSelectDefaultPayer('Self paid')
                              }
                              className={
                                client.defaultPayer === 'Self paid'
                                  ? styles.selected
                                  : ''
                              }
                            >
                              {t('ui.clientdetails.selfpaid')}
                            </div>
                            <div
                              onClick={() => handleSelectDefaultPayer('Bupa')}
                              className={
                                client.defaultPayer === 'Bupa'
                                  ? styles.selected
                                  : ''
                              }
                            >
                              <DefaultPayerBupa
                                style={{ marginRight: '8px' }}
                              />
                              <div>BUPA</div>
                            </div>
                          </div>
                        </Form.Item>
                      </div>
                    )}
                    {client.defaultPayer === 'Self paid' ? (
                      <div className={styles.billingItem}>
                        <Form.Item label={t('ui.clientdetails.discount')}>
                          <div
                            className={styles.billingItemContent}
                            style={{
                              color: client.discount
                                ? 'var(--grey-text-color)'
                                : 'var(--light-grey-color)',
                            }}
                          >
                            {client.discount || t('ui.clientdetails.empty')}
                          </div>
                        </Form.Item>
                      </div>
                    ) : (
                      <>
                        <div className={styles.billingItem}>
                          <Form.Item
                            label={t('ui.clientdetails.pricelist')}
                            tooltip={t('ui.clientdetails.pricelist')}
                          >
                            <InlineEdit
                              fieldTitle={priceList.title}
                              orderIndex={getFieldName(priceList.title)}
                              type={priceList.type}
                              initialValue={
                                client[priceList.fieldName] ||
                                t('ui.clientdetails.empty')
                              }
                              selectOptions={priceList.selectOptions}
                              onUpdateValue={handleUpdateFieldValue}
                            >
                              {priceList.value || t('ui.clientdetails.empty')}
                            </InlineEdit>
                          </Form.Item>
                        </div>
                        <div className={styles.billingItem}>
                          <Form.Item
                            label={t('ui.clientdetails.membershipnumber')}
                          >
                            <InlineEdit
                              fieldTitle={membershipNumber.title}
                              orderIndex={getFieldName(membershipNumber.title)}
                              type={membershipNumber.type}
                              initialValue={
                                client[membershipNumber.fieldName] ||
                                t('ui.clientdetails.empty')
                              }
                              onUpdateValue={handleUpdateFieldValue}
                            >
                              {membershipNumber.value ||
                                t('ui.clientdetails.empty')}
                            </InlineEdit>
                          </Form.Item>
                        </div>
                        <div className={styles.billingItem}>
                          <Form.Item label={t('ui.clientdetails.allocated')}>
                            <div
                              className={styles.billingItemContent}
                              style={{
                                color: client.allocatedAuthorisations
                                  ? 'var(--grey-text-color)'
                                  : 'var(--light-grey-color)',
                              }}
                            >
                              {client.allocatedAuthorisations ||
                                t('ui.clientdetails.empty')}
                            </div>
                          </Form.Item>
                        </div>
                      </>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      )}
      {isMobile && (
        <div className={styles.detailsLabelContainer}>
          <div className={styles.detailsLabelsMobile}>
            {clientLabels.map((label, index) => (
              <div
                className={styles.detailsLabel}
                key={`client-label-mobile-${index}`}
                style={{
                  color: label.color,
                  borderColor: label.color,
                  backgroundColor: `rgba(${label.color}, 0.5)`,
                }}
              >
                <span>{label.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <AvatarUploader
        visible={showAvatarUploader}
        title={t('ui.clientdetails.uploadavatar.title')}
        onCreate={handleChangeImage}
        imageURL={client.avatar}
        onCancel={() => setShowAvatarUploader(false)}
      />

      <AddAddress
        visible={showAddressModal}
        title={'Add Address'}
        onClose={() => setShowAddressModal(false)}
        onAdd={handleAddAddress}
        values={{
          street: client.street,
          city: client.city,
          county: client.county,
          postCode: client.postCode,
          country: client.country,
        }}
      />

      {addRelationship && (
        <AddRelationship
          visible={addRelationship}
          title={t('ui.add.relationship.title')}
          onClose={() => setAddRelationship(false)}
          onOpenAddModal={(type) => handleOpenAddModal(type)}
        />
      )}

      {addContact && (
        <AddContact
          visible={addContact}
          contactType={type}
          appointments={appointments}
          onClose={() => setAddContact(false)}
          onAddRelationship={handleAddRelationship}
        />
      )}

      {addThirdParty && (
        <AddThirdParty
          visible={addThirdParty}
          thirdPartyType={type}
          onClose={() => setAddThirdParty(false)}
          onAddRelationship={handleAddRelationship}
          searchResults={searchResults}
        />
      )}
      <Modal
        centered
        visible={showDeleteClientModal}
        onCancel={() => setShowDeleteClientModal(false)}
        footer={null}
        width={600}
      >
        <div className={styles.clientDeleteModal}>
          <div className={styles.textContent}>
            <div className={styles.modalTitle}>
              <p>
                Delete <span className={styles.clientName}> Jon Snow </span>
              </p>
            </div>
            <p className={styles.redText}>
              This will permanently delete this patient
            </p>
            <p>
              Any appointments associated with this patient will be removed from
              the calendar and archived.
            </p>
            <p>
              Other related information associated with this patient will also
              be permanently deleted. This includes:
            </p>
            <Badge color="#b8b8c0" text="Document" />
            <br />
            <Badge color="#b8b8c0" text="Treatment records" />
            <br />
            <Badge color="#b8b8c0" text="Financials" />
            <br />
            <p>...and more</p>
            <p>
              This action is not reversible. None of this patient information
              will be recoverable.
            </p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button type="primary">Yes, Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ClientDetails
