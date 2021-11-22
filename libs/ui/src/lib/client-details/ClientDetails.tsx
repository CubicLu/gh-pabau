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
  MailFilled,
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
  Notification,
  NotificationType,
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
import { MutationFunction } from '@apollo/client'

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
  referredBy: number
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
  customFields?: CategoryFieldType[]
  loading?: boolean
  onCreateEmail: () => void
  onCreateCall: () => void
  searchResults: SearchItem[]
  appointments: Appointment[]
  handleEditAll?: () => void
  dateFormat?: string
  updatebasicContactMutation?: MutationFunction
  updateContactCustomMutation?: MutationFunction
  clientId?: number
  companyId?: number
  setBasicContactData?: React.Dispatch<React.SetStateAction<ClientData>>
  showAvatarModal?: () => void
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

export interface selectOptionType {
  id: number
  name: string
}

export interface FieldOrderItem {
  title: string
  fieldName: string
  type: string
  field: FieldType
  value: number | string | PhoneProp
  selectOptions?: string[] | selectOptionType[]
  order?: number
}

export interface CategoryFieldType {
  id: number
  category: string
  fields: FieldOrderItem[]
}

const FieldName = {
  firstName: 'Fname',
  lastName: 'Lname',
  isActive: 'is_active',
  custom_id: 'patientID',
  referredBy: 'MarketingSourceData',
  dob: 'DOB',
  gender: 'gender',
  street: 'MailingStreet',
  city: 'MailingCity',
  county: 'MailingProvince',
  postCode: 'MailingPostal',
  country: 'MailingCountry',
  mobile: 'Mobile',
  home: 'Phone',
  email: 'Email',
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
  handleEditAll,
  updatebasicContactMutation,
  updateContactCustomMutation,
  clientId,
  companyId,
  setBasicContactData,
  showAvatarModal,
}) => {
  const { t } = useTranslation('common')
  const defaultFieldOrder: FieldOrderItem[] = [
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
      value: 0,
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
    referredBy: 0,
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
  const [hoverClientDetails, setHoverClientDetails] = useState(false)
  const [detailsCard, setDetailsCard] = useState(0)
  const [addRelationship, setAddRelationship] = useState(false)
  const [addContact, setAddContact] = useState(false)
  const [addThirdParty, setAddThirdParty] = useState(false)
  const [type, setType] = useState<RelationshipType>('family-member')
  const [customizingFields, setCustomizingFields] = useState(false)
  const [hoverDetails, setHoverDetails] = useState(false)
  const [fieldsOrder, setFieldsOrder] = useState<CategoryFieldType[]>()
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
  const [isAddressLoading, setIsAddressLoading] = useState(false)
  const [isActiveLoading, setIsActiveLoading] = useState(false)

  useEffect(() => {
    if (clientData) {
      let categoryCustom
      let fields = [...defaultFieldOrder]
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
      if (referredByOptions?.length) {
        fields[1].selectOptions = referredByOptions
      }
      if (customFields?.length) {
        const generalCustom = customFields.find(
          (data) => data.category === 'detail'
        )
        categoryCustom = customFields.filter(
          (data) => data.category !== 'detail'
        )
        if (generalCustom) {
          fields = [...fields, ...generalCustom.fields]
        }
      }
      let data = [
        {
          id: 0,
          category: 'detail',
          fields,
        },
      ]

      if (categoryCustom?.length) {
        data = [...data, ...categoryCustom]
      }

      setFieldsOrder(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData, customFields, referredByOptions])

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
      data.relationships?.push(relationship)
    }
    setClient(data)
  }

  const handleChangeDetailsCard = (val) => {
    if (!!ref && ref.current) {
      ref.current.goTo(val)
      setDetailsCard(val)
    }
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

  const handleUpdateFieldValue = async (
    index: number,
    value: string | PhoneProp | number,
    type?: string,
    category?: number
  ) => {
    if (fieldsOrder) {
      const fieldsOrderData = [...fieldsOrder]
      const fieldOrderIndex = fieldsOrderData.findIndex(
        (fields) => fields.id === category
      )
      const data = fieldsOrderData[fieldOrderIndex]?.fields.find(
        (item, id) => id === index
      )

      if (data && clientId) {
        const response = await handleUpdate(data.fieldName, value, data.title)
        if (response?.data) {
          if (!data.fieldName.includes('customField_')) {
            setBasicContactData?.((item) => {
              return {
                ...item,
                [data.fieldName]: value,
              }
            })
          } else {
            data.value = value
            fieldsOrderData[fieldOrderIndex].fields[index] = data
            setFieldsOrder([...fieldsOrderData])
          }
          Notification(
            NotificationType.success,
            `${data.title} updated to ${
              data.fieldName === 'referredBy'
                ? referredByOptions?.find((option) => option.id === value)?.name
                : value
            }`
          )
        }
      }
    }
  }

  const handleUpdate = async (field: string, value, label?: string) => {
    let data
    if (field.includes('customField_')) {
      const id = Number.parseInt(field.split('_')[1])
      return await updateContactCustomMutation?.({
        variables: {
          contactId: clientId,
          companyId,
          customId: id,
          customLabel: label,
          customValue: value,
        },
      })
    } else {
      if (field === 'referredBy') {
        data = {
          [FieldName[field]]: {
            connect: {
              id: value,
            },
          },
        }
      } else if (field === 'address') {
        data = {}
        for (const key of Object.keys(value)) {
          data = {
            ...data,
            [FieldName[key]]: { set: value[key] },
          }
        }
      } else {
        data = {
          [FieldName[field]]: { set: value },
        }
      }
      return await updatebasicContactMutation?.({
        variables: {
          where: { ID: clientId },
          data,
        },
      })
    }
  }

  const handleUpdatePhoneFieldValue = async (
    index: number,
    value: string,
    type: string,
    category: number
  ) => {
    const response = await handleUpdate(type, value)
    if (response?.data && fieldsOrder) {
      const fieldsOrderData = [...fieldsOrder]
      const fieldOrderIndex = fieldsOrderData.findIndex(
        (fields) => fields.id === category
      )
      const data = fieldsOrderData[fieldOrderIndex]?.fields.find(
        (item, id) => id === index
      )
      if (data) {
        setBasicContactData?.((item) => {
          return {
            ...item,
            [type]: value,
          }
        })
        Notification(
          NotificationType.success,
          `${data.title} updated to ${value}`
        )
      }
    }
  }

  const handleAddAddress = async (value: AddressValueProp) => {
    setIsAddressLoading(true)
    const { street, city, county, postCode, country } = value
    const addressJoin = [street, city, county, postCode, country]
      .filter((val) => val?.trim())
      .join(', ')

    const response = await handleUpdate('address', value)
    setShowAddressModal(false)
    setIsAddressLoading(false)

    if (response?.data) {
      setBasicContactData?.((item) => {
        return {
          ...item,
          street,
          city,
          county,
          postCode,
          country,
          address: addressJoin,
        }
      })
    }
  }

  const handleUpdateClientInfo = async (
    key: string,
    value: string,
    title?: string
  ) => {
    const response = await handleUpdate(key, value)
    if (response?.data) {
      setBasicContactData?.((item) => {
        return {
          ...item,
          [key]: value,
        }
      })
      Notification(NotificationType.success, `${title} updated to ${value}`)
    }
  }

  const getFieldName = (category: number, fieldTitle: string) => {
    let result = 0

    const fieldsData = fieldsOrder?.find((item) => item.id === category)
    // eslint-disable-next-line unicorn/no-array-for-each
    fieldsData?.fields.forEach((item, index) => {
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
      setClient({ ...clientData })
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

  const handleActiveClient = async (active: boolean) => {
    setIsActiveLoading(true)
    const response = await handleUpdate('isActive', active ? 1 : 0)
    if (response?.data) {
      setBasicContactData?.((item) => {
        return {
          ...item,
          isActive: active,
        }
      })
    }
    setIsActiveLoading(false)
  }

  const getReferredByValue = (value) => {
    return referredByOptions?.find((option) => option.id === value)?.name
  }

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
                    <div className={styles.detailTop}>
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
                    </div>
                    <div className={styles.detailBottom}>
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
                </div>
              ) : (
                <div className={styles.detailsOneContent}>
                  <div className={styles.detailTop}>
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
                        onClick={() => showAvatarModal?.()}
                      >
                        <EditOutlined />
                      </div>
                    </div>
                    <div className={styles.detailsClientName}>
                      <div
                        className={!client.isActive ? styles.inactiveName : ''}
                      >
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
                    {isActiveLoading ? (
                      <div className={styles.detailsActiveStatus}>
                        <Skeleton
                          className={styles.skeletonStatus}
                          paragraph={false}
                          active
                          round
                        />
                      </div>
                    ) : client.isActive ? (
                      <div className={styles.detailsActiveStatus}>
                        <Popconfirm
                          title={t('ui.clientdetails.deactive.confirm')}
                          onConfirm={() => handleActiveClient(false)}
                        >
                          <Tooltip title="Inactive">
                            <div className={styles.active}>
                              <div className={styles.greenDot} />
                              {t('ui.clientdetails.active')}
                            </div>
                          </Tooltip>
                        </Popconfirm>
                      </div>
                    ) : (
                      <div className={styles.detailsActiveStatus}>
                        <Tooltip title="Activate">
                          <div
                            className={styles.deactivate}
                            onClick={() => handleActiveClient(true)}
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
                  </div>
                  {!customizingFields &&
                    fieldsOrder?.map((item, index) => (
                      <div key={item.id} className={styles.detailBottom}>
                        <div className={styles.detailsContainer}>
                          <div className={styles.title}>
                            {index === 0
                              ? t('ui.clientdetails.details')
                              : item.category}
                          </div>
                          {index === 0 && (
                            <div className={styles.customizeFields}>
                              <div onClick={() => setCustomizingFields(true)}>
                                {t('ui.clientdetails.customise')}
                              </div>
                              <Tooltip
                                title={t('ui.clientdetails.customise.edit')}
                                overlayStyle={{ width: '100px' }}
                              >
                                <div
                                  className={styles.editCustomizeFields}
                                  onClick={() => handleEditAll?.()}
                                >
                                  <EditOutlined />
                                </div>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                        {item.fields.map((field, index) => (
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
                                  <div className={styles.title}>
                                    {field.title}
                                  </div>
                                  <div
                                    className={cn(
                                      styles.content,
                                      field.value ? '' : styles.emptyContent
                                    )}
                                    onClick={() => {
                                      field.value && setShowAddressModal(true)
                                    }}
                                  >
                                    {field.value}
                                  </div>
                                </div>
                                <div
                                  className={styles.addAddress}
                                  onClick={() => {
                                    setShowAddressModal(true)
                                  }}
                                >
                                  {field.value ? (
                                    <div className={styles.edit}>
                                      <EditOutlined />
                                    </div>
                                  ) : (
                                    <div className={styles.addAddressContent}>
                                      <PlusCircleOutlined />{' '}
                                      <h5>
                                        {t('ui.clientdetails.add.address')}
                                      </h5>{' '}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : field.type ===
                              InlineEditDataTypes.basicPhone ? (
                              <div
                                className={
                                  field.value['mobile'] || field.value['home']
                                    ? styles.clientDetailsItem
                                    : styles.emptyClientDetailsItem
                                }
                              >
                                <div className={styles.emptyHoverTag}>
                                  <div className={styles.title}>
                                    {field.title}
                                  </div>
                                  <div
                                    className={cn(
                                      styles.content,
                                      styles.phoneContent,
                                      field.value ? '' : styles.emptyContent
                                    )}
                                  >
                                    <InlineEdit
                                      fieldTitle={field.title}
                                      orderIndex={getFieldName(
                                        item.id,
                                        field.title
                                      )}
                                      type={field.type}
                                      initialValue={field.value}
                                      category={item.id}
                                      onUpdateValue={
                                        handleUpdatePhoneFieldValue
                                      }
                                      selectOptions={field.selectOptions}
                                    >
                                      {!field.value['mobile'] &&
                                      !field.value['home'] ? (
                                        <span className={styles.emptyValue}>
                                          {t('ui.clientdetails.empty')}
                                        </span>
                                      ) : (
                                        <div className={styles.leftContent}>
                                          <div
                                            className={styles.leftContentTitle}
                                          >
                                            {field.value['mobile'] && (
                                              <span>{`${field.value['mobile']} (Mobile)`}</span>
                                            )}
                                            {field.value['home'] && (
                                              <span>{`${field.value['home']} (Home)`}</span>
                                            )}
                                          </div>
                                          <div className={styles.boxContent}>
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
                                    !field.value
                                      ? styles.emptyClientDetailsItem
                                      : field.fieldName === 'referredBy' &&
                                        !getReferredByValue(field.value)
                                      ? styles.emptyClientDetailsItem
                                      : styles.clientDetailsItem
                                  }
                                >
                                  <div>
                                    <div className={styles.title}>
                                      {field.title}
                                    </div>
                                    <div
                                      className={cn(
                                        styles.content,
                                        !field.value
                                          ? styles.emptyContent
                                          : field.fieldName === 'referredBy' &&
                                            !getReferredByValue(field.value)
                                          ? styles.emptyContent
                                          : ''
                                      )}
                                    >
                                      {field.fieldName === 'patientID' &&
                                      field.value ? (
                                        <span>{field.value}</span>
                                      ) : (
                                        field.type !== 'date' && (
                                          <InlineEdit
                                            fieldTitle={field.title}
                                            orderIndex={getFieldName(
                                              item.id,
                                              field.title
                                            )}
                                            type={field.type}
                                            initialValue={
                                              field.fieldName ===
                                                'referredBy' &&
                                              !getReferredByValue(field.value)
                                                ? ''
                                                : field.value
                                            }
                                            category={item.id}
                                            onUpdateValue={
                                              handleUpdateFieldValue
                                            }
                                            selectOptions={field.selectOptions}
                                          >
                                            {!field.value ? (
                                              <span
                                                className={styles.emptyValue}
                                              >
                                                {t('ui.clientdetails.empty')}
                                              </span>
                                            ) : field.type === 'email' ? (
                                              <div
                                                className={styles.leftContent}
                                              >
                                                <div
                                                  className={cn(
                                                    styles.leftContentTitle,
                                                    styles.emailContent
                                                  )}
                                                >
                                                  {field.value}
                                                </div>
                                                {field.value && (
                                                  <div
                                                    className={
                                                      styles.boxContent
                                                    }
                                                  >
                                                    <div
                                                      className={
                                                        styles.iconContent
                                                      }
                                                      onClick={(e) => {
                                                        e.stopPropagation()
                                                        onCreateEmail()
                                                      }}
                                                    >
                                                      <MailFilled />
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            ) : field.type === 'list' &&
                                              field.fieldName ===
                                                'referredBy' ? (
                                              getReferredByValue(
                                                field.value
                                              ) || (
                                                <span
                                                  className={styles.emptyValue}
                                                >
                                                  {t('ui.clientdetails.empty')}
                                                </span>
                                              )
                                            ) : (
                                              field.value
                                            )}
                                          </InlineEdit>
                                        )
                                      )}
                                      {field.type === 'date' && (
                                        <InlineEdit
                                          fieldTitle={field.title}
                                          orderIndex={getFieldName(
                                            item.id,
                                            field.title
                                          )}
                                          type={field.type}
                                          initialValue={
                                            field.value &&
                                            dateFormat &&
                                            typeof field.value === 'string'
                                              ? dayjs(field.value).format(
                                                  dateFormat
                                                )
                                              : ''
                                          }
                                          dateFormat={dateFormat}
                                          category={item.id}
                                          onUpdateValue={handleUpdateFieldValue}
                                        >
                                          {field.value &&
                                          dateFormat &&
                                          typeof field.value === 'string' ? (
                                            `${dayjs(field.value).format(
                                              dateFormat
                                            )} (${moment(field.value).fromNow(
                                              true
                                            )})`
                                          ) : (
                                            <span className={styles.emptyValue}>
                                              {t('ui.clientdetails.empty')}
                                            </span>
                                          )}
                                        </InlineEdit>
                                      )}
                                    </div>
                                  </div>
                                  {field.fieldName === 'patientID' &&
                                  field.value ? null : (
                                    <div className={styles.edit}>
                                      <EditOutlined />
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    ))}
                  {customizingFields && (
                    <CustomizeFields
                      defaultOrder={fieldsOrder || []}
                      onCancel={() => setCustomizingFields(false)}
                      onChange={(order) => {
                        // setFieldsOrder(order)
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
                              orderIndex={getFieldName(0, priceList.title)}
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
                              orderIndex={getFieldName(
                                0,
                                membershipNumber.title
                              )}
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
      {isMobile && clientLabels?.length > 0 && (
        <div className={styles.detailsLabelContainer}>
          <div className={styles.detailsLabelsMobile}>
            {clientLabels?.map((label, index) => (
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
      {showAddressModal && (
        <AddAddress
          visible={showAddressModal}
          title={
            client.address
              ? t('ui.clientdetails.edit.address')
              : t('ui.clientdetails.add.address')
          }
          onClose={() => setShowAddressModal(false)}
          onAdd={handleAddAddress}
          values={{
            street: client.street,
            city: client.city,
            county: client.county,
            postCode: client.postCode,
            country: client.country,
          }}
          isLoading={isAddressLoading}
        />
      )}
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
