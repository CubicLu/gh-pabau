import {
  CloseOutlined,
  EditOutlined,
  LeftOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
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
} from '@pabau/ui'
import { Carousel, Form } from 'antd'
import { CarouselRef } from 'antd/lib/carousel'
import cn from 'classnames'
import moment from 'moment'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import stc from 'string-to-color'
import { ReactComponent as DefaultPayerBupa } from '../../assets/images/default-payer-bupa.svg'
import { ReactComponent as MedicalCenterGrey } from '../../assets/images/medical-center-grey.svg'
import { ReactComponent as MedicalCenter } from '../../assets/images/medical-center.svg'
import styles from './ClientDetails.module.less'
export interface ClientData {
  avatar: string
  isActive: boolean
  cardOption: string
  fullName: string
  labels: string[]
  onAccount: number
  outStanding: number
  patientID: string
  referredBy: string
  dob: string
  gender: string
  address: string
  phone: string
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

type FieldType =
  | 'patientId'
  | 'referredBy'
  | 'dob'
  | 'gender'
  | 'address'
  | 'mobile'
  | 'email'

interface FieldOrderItem {
  title: string
  fieldName: string
  type: string
  field: FieldType
}

export interface ClientDetailsProps {
  clientData: ClientData
  searchResults: SearchItem[]
  appointments: Appointment[]
}

export const ClientDetails: FC<ClientDetailsProps> = ({
  clientData,
  searchResults,
  appointments,
}) => {
  const { t } = useTranslation('common')
  const defaultFieldOrder: FieldOrderItem[] = [
    {
      type: 'text',
      field: 'patientId',
      fieldName: 'patientID',
      title: t('ui.clientdetails.patientid'),
    },
    {
      type: 'text',
      field: 'referredBy',
      fieldName: 'referredBy',
      title: t('ui.clientdetails.referredby'),
    },
    {
      type: 'date',
      field: 'dob',
      fieldName: 'dob',
      title: t('ui.clientdetails.dob'),
    },
    {
      type: 'text',
      field: 'gender',
      fieldName: 'gender',
      title: t('ui.clientdetails.gender'),
    },
    {
      type: 'text',
      field: 'address',
      fieldName: 'address',
      title: t('ui.clientdetails.address'),
    },
    {
      type: 'phone',
      field: 'mobile',
      fieldName: 'phone',
      title: t('ui.clientdetails.mobilephone'),
    },
    {
      type: 'email',
      field: 'email',
      fieldName: 'email',
      title: t('ui.clientdetails.email'),
    },
  ]
  const isMobile = useMedia('(max-width: 767px)', false)
  const ref = useRef<CarouselRef>(null)
  const [client, setClient] = useState<ClientData>({
    avatar: '',
    isActive: true,
    cardOption: '',
    fullName: '',
    labels: [],
    onAccount: 0,
    outStanding: 0,
    patientID: '123',
    referredBy: '',
    dob: '1969-11-28',
    gender: '',
    address: '',
    phone: '',
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
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [addRelationship, setAddRelationship] = useState(false)
  const [addContact, setAddContact] = useState(false)
  const [addThirdParty, setAddThirdParty] = useState(false)
  const [type, setType] = useState<RelationshipType>('family-member')
  const [customizingFields, setCustomizingFields] = useState(false)
  const [hoverDetails, setHoverDetails] = useState(false)
  const [fieldsOrder, setFieldsOrder] =
    useState<FieldOrderItem[]>(defaultFieldOrder)
  const [form] = Form.useForm()

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
    }
  }, [clientData, initialized])

  return (
    <div
      className={styles.clientDetailsContainer}
      onMouseEnter={() => setHoverClientDetails(true)}
      onMouseLeave={() => setHoverClientDetails(false)}
    >
      {hoverClientDetails && (
        <div
          className={styles.arrowLeft}
          onClick={() => handleChangeDetailsCard(0)}
        >
          <LeftOutlined />
        </div>
      )}
      {hoverClientDetails && (
        <div
          className={styles.arrowRight}
          onClick={() => handleChangeDetailsCard(1)}
        >
          <RightOutlined />
        </div>
      )}
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

      <div className={styles.detailsContent}>
        <Carousel autoplay={false} dots={false} ref={ref}>
          <div className={styles.detailsOne}>
            <div className={styles.detailsOneContent}>
              <div className={styles.detailsAvatar}>
                <Avatar src={client?.avatar} size={112} />
                <div
                  className={styles.edit}
                  onClick={() => setShowAvatarUploader(true)}
                >
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.detailsClientName}>
                <div className={styles.name}>{`${client?.fullName}`}</div>
                <div className={styles.edit}>
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.detailsActiveStatus}>
                <div className={styles.active}>
                  <div className={styles.greenDot} />
                  {t('ui.clientdetails.active')}
                </div>
                <div className={styles.deactivate}>
                  {t('ui.clientdetails.deactivate')}
                </div>
              </div>
              <div className={styles.detailsLabels}>
                {client?.labels.map((label, index) => (
                  <div
                    className={styles.detailsLabel}
                    key={`client-label-${index}`}
                    style={{
                      color: stc(label),
                      borderColor: stc(label),
                      backgroundColor: `rgba(${stc(label)}, 0.5)`,
                    }}
                  >
                    {label}
                  </div>
                ))}
                <div className={styles.edit}>
                  <PlusCircleOutlined />
                </div>
              </div>
              {!customizingFields && (
                <div
                  className={styles.detailsContainer}
                  onMouseOver={() => setHoverDetails(true)}
                  onMouseLeave={() => setHoverDetails(false)}
                >
                  <div className={styles.title}>
                    {t('ui.clientdetails.details')}
                  </div>
                  {hoverDetails && (
                    <div
                      className={styles.customizeFields}
                      onClick={() => setCustomizingFields(true)}
                    >
                      <EditOutlined />
                      {t('ui.clientdetails.customise')}
                    </div>
                  )}
                </div>
              )}
              {!customizingFields &&
                fieldsOrder.map((field, index) => (
                  <React.Fragment key={`client-details-item-${index}`}>
                    {(field.fieldName === 'phone' ||
                      field.fieldName === 'email') && (
                      <div className={styles.clientDetailsItem}>
                        <div>
                          <div className={styles.title}>{field.title}</div>
                          <div
                            className={styles.content}
                            style={{
                              color: `${
                                client[field.fieldName]
                                  ? 'var(--grey-text-color)'
                                  : 'var(--light-grey-color)'
                              }`,
                            }}
                          >
                            {client[field.fieldName] ||
                              t('ui.clientdetails.empty')}
                          </div>
                        </div>
                        <div>
                          {client[field.fieldName] ? (
                            <EditOutlined />
                          ) : (
                            <PlusOutlined />
                          )}
                        </div>
                      </div>
                    )}
                    {field.fieldName !== 'phone' &&
                      field.fieldName !== 'email' &&
                      !isMobile && (
                        <div className={styles.clientDetailsItem}>
                          <div>
                            <div className={styles.title}>{field.title}</div>
                            <div
                              className={styles.content}
                              style={{
                                color: `${
                                  client[field.fieldName]
                                    ? 'var(--grey-text-color)'
                                    : 'var(--light-grey-color)'
                                }`,
                              }}
                            >
                              {field.type !== 'date' &&
                                (client[field.fieldName] ||
                                  t('ui.clientdetails.empty'))}
                              {field.type === 'date' &&
                                (client[field.fieldName]
                                  ? `${moment(client.dob).format(
                                      'DD/MM/YYYY'
                                    )} (${moment(client.dob).fromNow(true)})`
                                  : t('ui.clientdetails.empty'))}
                            </div>
                          </div>
                          <div>
                            {client[field.fieldName] ? (
                              <EditOutlined />
                            ) : (
                              <PlusOutlined />
                            )}
                          </div>
                        </div>
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
          </div>
          <div className={styles.detailsTwo}>
            <div className={styles.regDate}>
              {`Registered by ${client.fullName} on ${moment(
                client.regDate
              ).format('MM-DD-YYYY')}`}
            </div>
            <div className={styles.section}>
              <div className={styles.title}>
                {t('ui.clientdetails.relationships')}
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
                        <div className={styles.phone}>{relationship.phone}</div>
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
              <div className={styles.title}>
                {t('ui.clientdetails.billingdetails')}
              </div>
              <div className={styles.content}>
                <Form form={form} layout="vertical">
                  {client.relationships.length === 0 ? (
                    <div className={styles.billingItem}>
                      <Form.Item
                        label={t('ui.clientdetails.defaultpayer')}
                        tooltip={t('ui.clientdetails.defaultpayer')}
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
                        tooltip={t('ui.clientdetails.defaultpayer')}
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
                            <DefaultPayerBupa style={{ marginRight: '8px' }} />
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
                          <div
                            className={styles.billingItemContent}
                            style={{
                              color: client.pricelist
                                ? 'var(--grey-text-color)'
                                : 'var(--light-grey-color)',
                            }}
                          >
                            {client.pricelist || t('ui.clientdetails.empty')}
                          </div>
                        </Form.Item>
                      </div>
                      <div className={styles.billingItem}>
                        <Form.Item
                          label={t('ui.clientdetails.membershipnumber')}
                        >
                          <div
                            className={styles.billingItemContent}
                            style={{
                              color: client.membershipNumber
                                ? 'var(--grey-text-color)'
                                : 'var(--light-grey-color)',
                            }}
                          >
                            {client.membershipNumber ||
                              t('ui.clientdetails.empty')}
                          </div>
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

      <AvatarUploader
        visible={showAvatarUploader}
        title={t('ui.clientdetails.uploadavatar.title')}
        onCreate={handleChangeImage}
        imageURL={client.avatar}
        onCancel={() => setShowAvatarUploader(false)}
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
    </div>
  )
}

export default ClientDetails
