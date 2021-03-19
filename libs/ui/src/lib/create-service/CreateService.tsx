import React, { FC, useState, useEffect, ReactNode } from 'react'
import classNames from 'classnames'
import {
  Avatar,
  Button,
  TabMenu,
  Switch,
  Input,
  Checkbox,
  Slider,
  Employees,
  Employee,
  SearchTags,
  ChooseModal,
  FullScreenReportModal,
  OperationType,
  ImageSelectorModal,
  PabauPlus,
  CurrencyInput,
} from '@pabau/ui'
import {
  Collapse,
  Form,
  Select,
  Tooltip,
  InputNumber,
  Divider,
  Input as AntInput,
} from 'antd'
import {
  CalendarOutlined,
  VideoCameraOutlined,
  TeamOutlined,
  PictureOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  CheckCircleFilled,
  PercentageOutlined,
} from '@ant-design/icons'
import { ReactComponent as Read } from '../../assets/images/pricing/read.svg'
import { ReactComponent as Money } from '../../assets/images/pricing/money.svg'
import { ReactComponent as Botox } from '../../assets/images/botox.svg'
import { ReactComponent as Treatment } from '../../assets/images/form-type/treatment.svg'
import { ReactComponent as MedicalHistory } from '../../assets/images/form-type/medical-history.svg'
import { ReactComponent as Environment } from '../../assets/images/environment.svg'
import styles from './CreateService.module.less'

const { Panel } = Collapse
const { Option, OptGroup } = Select

interface LocationItem {
  location: string
  detail: string
  img?: string
  selected: boolean
}

interface ContractItem {
  logo: ReactNode
  name: string
  type: string
}

export interface CreateServiceProps {
  contracts: ContractItem[]
  employees: Employee[]
  employeesTitle?: string
  employeesDesc?: string
  locations: LocationItem[]
  rooms: Array<string>
  roomsTitle?: string
  roomsDesc?: string
  roomsItemType?: string
  equipment: Array<string>
  equipmentTitle?: string
  equipmentDesc?: string
  equipemntItemType?: string
  visible: boolean
  onClose: () => void
  onCreate?: () => void
}

export const CreateService: FC<CreateServiceProps> = ({
  contracts,
  employees,
  employeesTitle,
  employeesDesc,
  locations,
  rooms,
  roomsDesc,
  roomsItemType,
  roomsTitle,
  equipment,
  equipemntItemType,
  equipmentDesc,
  equipmentTitle,
  visible,
  onClose,
  onCreate,
}) => {
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [showChooseModal, setShowChooseModal] = useState(false)
  const [serviceType, setServiceType] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [category, setCategory] = useState('')
  const [servicePrice, setServicePrice] = useState(0)
  const [sliderValue, setSliderValue] = useState(1)
  const [paymentUnit, setPaymentUnit] = useState('%')
  const [duration, setDuration] = useState('')
  const [locationItems, setLocationItems] = useState<LocationItem[]>([])
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const appointmentColors = [
    '#7986cb',
    '#64b5f6',
    '#4dd0e1',
    '#9575cd',
    '#ba68c8',
    '#d46bd4',
    '#ff679b',
    '#fff176',
    '#a1887f',
    '#4db6ac',
    '#81c784',
    '#90a4ae',
    '#ffc38e',
    '#d2a3a3',
  ]
  const categories = [
    {
      groupTitle: 'Hair',
      groupItems: [
        'Japanese straightening',
        'Haircuts and hairdressing',
        'Hair transplants',
      ],
    },
  ]
  const durations = [
    '5min',
    '10min',
    '15min',
    '20min',
    '25min',
    '30min',
    '35min',
    '40min',
    '45min',
    '50min',
    '55 min',
    '1h',
    '1h 5min',
    '1h 10min',
    '1h 15min',
    '1h 20min',
    '1h 25min',
    '1h 30min',
    '1h 35min',
    '1h 40min',
    '1h 45min',
    '1h 50min',
    '1h 55 min',
    '2h',
  ]
  const [pricingOptions, setPricingOptions] = useState([
    {
      title: 'Book & Sell',
      isBook: true,
      isSell: true,
      selected: true,
    },
    {
      title: 'Book',
      isBook: true,
      isSell: false,
      selected: false,
    },
    {
      title: 'Sell',
      isBook: false,
      isSell: true,
      selected: false,
    },
  ])
  const [paymentProcessing, setPaymentProcessing] = useState([
    {
      type: 'Amount',
      selected: false,
    },
    {
      type: 'Percent',
      selected: true,
    },
  ])
  const [patientBookings, setPatientBookings] = useState([
    {
      type: 'Existing & New',
      selected: true,
    },
    {
      type: 'Existing',
      selected: false,
    },
    {
      type: 'New',
      selected: false,
    },
  ])
  const [availableOn, setAvailableOn] = useState([
    {
      weekDay: 'Mon',
      isAvailable: false,
    },
    {
      weekDay: 'Tue',
      isAvailable: false,
    },
    {
      weekDay: 'Wed',
      isAvailable: false,
    },
    {
      weekDay: 'Thu',
      isAvailable: false,
    },
    {
      weekDay: 'Fri',
      isAvailable: false,
    },
    {
      weekDay: 'Sat',
      isAvailable: false,
    },
    {
      weekDay: 'Sun',
      isAvailable: false,
    },
  ])
  const handleSelectPricingOption = (item) => {
    const options = [...pricingOptions]
    for (const option of options) {
      option.selected = option.title === item.title
    }
    setPricingOptions([...options])
  }
  const handleSelectPaymentProcessingOption = (item) => {
    const options = [...paymentProcessing]
    for (const option of options) {
      option.selected = option.type === item.type
      if (option.type === item.type) {
        setPaymentUnit(option.type === 'Amount' ? '£' : '%')
      }
    }
    setPaymentProcessing([...options])
  }
  const handleSelectPatientBookings = (item) => {
    const options = [...patientBookings]
    for (const option of options) {
      option.selected = option.type === item.type
    }
    setPatientBookings([...options])
  }
  const handleChangeAvailableOn = (weekDay, status) => {
    const options = [...availableOn]
    for (const option of options) {
      if (option.weekDay === weekDay) option.isAvailable = status
    }
    setAvailableOn([...options])
  }
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const items = [...locationItems]
      for (const item of items) {
        item.selected = true
      }
      setLocationItems([...items])
    }
  }
  const handleCheckLocation = (e, location) => {
    const items = [...locationItems]
    for (const item of items) {
      item.selected =
        location.location === item.location ? e.target.checked : item.selected
    }
    setLocationItems([...items])
  }
  useEffect(() => {
    setShowChooseModal(visible)
    setShowModal(false)
  }, [visible])
  useEffect(() => {
    setSelectedEmployees(employees.filter((item) => item.selected === true))
    setLocationItems(locations)
  }, [locations, employees])
  return (
    <>
      <ChooseModal
        title="Choose a service type to add to your menu"
        items={[
          {
            title: 'Service',
            description: 'Services booked by one client in a single visit',
            icon: <CalendarOutlined />,
          },
          {
            title: 'Virtual',
            description: 'Use Pabau’s online video conferencing',
            icon: <VideoCameraOutlined />,
          },
          {
            title: 'Class',
            description:
              'Services booked by multiple clients in scheduled sessions',
            icon: <TeamOutlined />,
          },
        ]}
        visible={showChooseModal}
        onSelected={(item) => {
          setShowChooseModal(false)
          setShowModal(true)
          setServiceType(item.title)
        }}
        onClose={() => {
          setShowChooseModal(false)
          setShowModal(false)
          onClose()
        }}
      />
      <FullScreenReportModal
        visible={showModal}
        title={`Create ${serviceType}`}
        operations={[
          OperationType.active,
          OperationType.cancel,
          OperationType.create,
        ]}
        activated={true}
        onBackClick={() => {
          setShowModal(false)
          setShowChooseModal(false)
          onClose()
        }}
        cancelBtnText="Cancel"
        createBtnText="Create"
        enableCreateBtn={!!serviceName && !!servicePrice && !!category}
        subMenu={[
          'General',
          'Pricing',
          'Staff & Resources',
          'Online Booking',
          <div
            key="client-pathway"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            Client pathway{' '}
            <span style={{ marginLeft: '8px' }}>
              <PabauPlus label="Plus" modalType="Care" />
            </span>
          </div>,
        ]}
        onCancel={() => {
          setShowModal(false)
          setShowChooseModal(false)
          onClose()
        }}
        onCreate={() => {
          onCreate?.()
        }}
        footer={true}
      >
        <div className={styles.createServiceGeneral}>
          <div className={styles.createServiceSection}>
            <h2 className={styles.createServiceSectionTitle}>
              Service details
            </h2>
            <div className={styles.createServiceSectionItem}>
              <Input
                label="Service name"
                placeHolderText="Enter service name"
                text={serviceName}
                onChange={(val) => setServiceName(val)}
              />
            </div>
            {serviceType !== 'Service' && (
              <div className={styles.createServiceSectionItem}>
                <Form form={form} layout="vertical">
                  <Form.Item label="Max number clients allowed">
                    <Slider
                      title={''}
                      value={sliderValue}
                      onChange={(val) => setSliderValue(val)}
                      calculatedValue={`${sliderValue}`}
                      min={1}
                      max={50}
                    />
                  </Form.Item>
                </Form>
              </div>
            )}
            <div className={styles.createServiceSectionItem}>
              <Input
                label="Service code"
                placeHolderText="Enter service code"
              />
            </div>
            <div className={styles.createServiceSectionItem}>
              <Form form={form} layout="vertical">
                <Form.Item label="Category">
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select Category"
                    onSelect={(val: string) => setCategory(val)}
                  >
                    {categories.map((item) => (
                      <OptGroup
                        label={
                          <span
                            style={{
                              color: 'var(--grey-text-color)',
                              fontSize: '14px',
                            }}
                          >
                            {item?.groupTitle}
                          </span>
                        }
                        key={item?.groupTitle}
                      >
                        {item?.groupItems?.map((subItem) => (
                          <Option key={subItem} value={subItem}>
                            {subItem}
                          </Option>
                        ))}
                      </OptGroup>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </div>
            <div className={styles.appointmentColor}>
              <p className={styles.appointmentColorTitle}>Appointment colour</p>
              <div className={styles.appointmentColorItems}>
                {appointmentColors.map((color) => (
                  <div
                    key={color}
                    className={
                      color === selectedColor
                        ? classNames(
                            styles.appointmentColorItem,
                            styles.appointmentColorSelected
                          )
                        : styles.appointmentColorItem
                    }
                    onClick={() => setSelectedColor(color)}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className={styles.createServiceSectionItemTitle}>Image</p>
                <div
                  className={styles.createServiceImageContainer}
                  style={{ backgroundImage: `url(${selectedImage})` }}
                >
                  {!selectedImage && (
                    <PictureOutlined
                      style={{
                        color: 'var(--light-grey-color)',
                        fontSize: '32px',
                      }}
                    />
                  )}
                </div>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowImageSelector(true)}
                >
                  Choose from library
                </Button>
                <ImageSelectorModal
                  visible={showImageSelector}
                  initialSearch={serviceName}
                  onOk={(image) => {
                    setSelectedImage(image.source)
                    setShowImageSelector(false)
                  }}
                  onCancel={() => {
                    setShowImageSelector(false)
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.advancedSettings}>
            <Collapse ghost>
              <Panel header="Advanced settings" key="advanced-settings">
                <div className={styles.createServiceSection}>
                  <h2
                    className={styles.createServiceSectionTitle}
                    style={{ margin: 0 }}
                  >
                    Bundling{' '}
                    <Tooltip title="Bundling allows you to ">
                      <QuestionCircleOutlined
                        style={{
                          color: 'var(--light-grey-color)',
                          marginLeft: '5px',
                        }}
                      />
                    </Tooltip>
                  </h2>
                  <h3
                    className={styles.createServiceSectionSubTitle}
                    style={{ marginBottom: '1rem' }}
                  >
                    Which items work well with a{' '}
                    {serviceName || '{Service name}'}
                  </h3>
                  <div className={styles.createServiceBundling}>
                    <div>
                      <Select placeholder="Type"></Select>
                    </div>
                    <div>
                      <Select placeholder="Select service or product"></Select>
                    </div>
                    <div>
                      <InputNumber placeholder="0" />
                    </div>
                  </div>
                  <Button icon={<PlusOutlined />}>Add bundle item</Button>
                </div>
                <div className={styles.createServiceSection}>
                  <h2 className={styles.createServiceSectionTitle}>
                    Auto consumption{' '}
                    <Tooltip title="We will automatically add this item to the checkout as a consumable when taking payment for an appointment.">
                      <QuestionCircleOutlined
                        style={{
                          color: 'var(--light-grey-color)',
                          marginLeft: '5px',
                        }}
                      />
                    </Tooltip>
                  </h2>
                  <div className={styles.createServiceAutoConsumption}>
                    <div>
                      <Select placeholder="Select product"></Select>
                    </div>
                    <div>
                      <InputNumber placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Checkbox defaultChecked={false}>
                      Consumable deduction
                    </Checkbox>
                  </div>
                  <Divider style={{ margin: '15px 0' }} />
                  <Button icon={<PlusOutlined />}>Add new item</Button>
                </div>
                <div
                  className={styles.createServiceSection}
                  style={{ margin: 0 }}
                >
                  <h2 className={styles.createServiceSectionTitle}>
                    Financial information
                  </h2>
                  <div className={styles.createServiceSectionItem}>
                    <Input label="SKU" placeHolderText="Enter SKU" />
                  </div>
                  <div className={styles.createServiceSectionItem}>
                    <Input
                      label="Procedure code"
                      tooltip="Enter a procedure code for this service (usually used for integrations, diagnostic coding or reporting)"
                      placeHolderText="eg. 71001"
                    />
                  </div>
                  <div className={styles.createServiceSectionItem}>
                    <Input
                      label="Invoice item name"
                      placeHolderText="Enter invoice item name"
                      tooltip="Enter a custom name for this service which will over-ride the service name."
                    />
                  </div>
                  <div className={styles.createServiceSectionItem}>
                    <Input
                      label="Display text on invoice"
                      placeHolderText="Enter display text"
                      tooltip="We will display this specific text on the invoice when this service is rendered."
                    />
                  </div>
                  <div>
                    <Checkbox defaultChecked={false}>
                      Use a package session to pay for the service{' '}
                      <Tooltip title="This service can only be redeemed with a pre-paid package.">
                        <QuestionCircleOutlined
                          style={{
                            color: 'var(--light-grey-color)',
                            marginLeft: '5px',
                          }}
                        />
                      </Tooltip>
                    </Checkbox>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className={styles.createServicePricing}>
          <div className={styles.createServiceSection}>
            <h2
              className={styles.createServiceSectionTitle}
              style={{ margin: 0 }}
            >
              Pricing & Duration{' '}
              <Tooltip title="lorem ipsum1">
                <QuestionCircleOutlined
                  style={{
                    color: 'var(--light-grey-color)',
                    marginLeft: '5px',
                  }}
                />
              </Tooltip>
            </h2>
            <h3
              className={styles.createServiceSectionSubTitle}
              style={{ marginBottom: '1rem' }}
            >
              Add the pricing options and duration of the service
            </h3>
            <div className={styles.createServiceSectionItem}>
              <div className={styles.pricingOptions}>
                {pricingOptions.map((option) => (
                  <div
                    key={option.title}
                    className={
                      option.selected ? styles.pricingOptionSelected : ''
                    }
                    onClick={() => handleSelectPricingOption(option)}
                  >
                    <div className={styles.pricingOptionLogos}>
                      {option.isBook && <Read />}
                      {option.isSell && <Money />}
                    </div>
                    <div className={styles.pricingOptionTitle}>
                      {option.title}
                    </div>
                    <div className={styles.pricingChecked}>
                      <CheckCircleFilled />
                    </div>
                    <Tooltip title="lorem ipsum2" mouseLeaveDelay={2}>
                      <div className={styles.tooltipContainer} />
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.createServiceSectionItem}>
              <Form form={form} layout="vertical">
                <Form.Item label="Service price">
                  <CurrencyInput
                    unit="£"
                    value={servicePrice}
                    onChange={(val) => setServicePrice(val.value)}
                  />
                </Form.Item>
              </Form>
            </div>
            <div className={styles.createServiceSectionItem}>
              <Form form={form} layout="vertical">
                <Form.Item label="Duration">
                  <Select
                    placeholder="Select duration"
                    onSelect={(val: string) => setDuration(val)}
                  >
                    {durations.map((duration) => (
                      <Option key={duration} value={duration}>
                        {duration}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </div>
            <div className={styles.createServiceSectionItem}>
              <Form form={form} layout="vertical">
                <Form.Item label="Tax">
                  <Select placeholder="Select tax">
                    <Option selected value="defaultSetting">
                      Default tax setting
                    </Option>
                  </Select>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={styles.advancedSettings}>
            <Collapse ghost>
              <Panel header="Special Pricing" key="special-pricing-options">
                <div className={styles.createServiceSection}>
                  <h2
                    className={styles.createServiceSectionTitle}
                    style={{ margin: 0 }}
                  >
                    Employees
                  </h2>
                  <h3
                    className={styles.createServiceSectionSubTitle}
                    style={{ marginBottom: '1rem' }}
                  >
                    Add pricing for each team member
                  </h3>
                  <div className={styles.teamMemberPricingHeader}>
                    <div>Name</div>
                    <div>
                      <span>Price</span>
                      <span>Duration</span>
                    </div>
                  </div>
                  {selectedEmployees.map((item) => (
                    <div className={styles.teamMemberPricing} key={item.name}>
                      <div>
                        <Avatar src={item?.avatar} name={item.name} size={40} />
                        <span>{item.name}</span>
                      </div>
                      <div>
                        <div className={styles.currencyInput}>
                          <CurrencyInput
                            unit="£"
                            placeholder={`${servicePrice}`}
                          />
                        </div>
                        <div>
                          <Select placeholder={duration}>
                            {durations.map((item) => (
                              <Option key={item} value={item}>
                                {item}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.createServiceSection}>
                  <h2
                    className={styles.createServiceSectionTitle}
                    style={{ margin: 0 }}
                  >
                    Location
                  </h2>
                  <h3
                    className={styles.createServiceSectionSubTitle}
                    style={{ marginBottom: '1rem' }}
                  >
                    Add pricing for each location
                  </h3>
                  <div className={styles.locationPricingHeader}>
                    <span>Name</span>
                    <span>Price</span>
                  </div>
                  {locationItems
                    .filter((location) => location.selected === true)
                    .map((item) => (
                      <div
                        className={styles.locationPricingItem}
                        key={item.location}
                      >
                        <div>
                          <div
                            style={{
                              backgroundImage: item.img
                                ? `url(${item.img})`
                                : 'none',
                            }}
                          >
                            {!item.img && <Environment />}
                          </div>
                          <div>
                            <span>{item.location}</span>
                            <span>{item.detail}</span>
                          </div>
                        </div>
                        <div>
                          <CurrencyInput
                            placeholder={`${servicePrice}`}
                            unit="£"
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <div className={styles.createServiceSection}>
                  <h2
                    className={styles.createServiceSectionTitle}
                    style={{ margin: 0 }}
                  >
                    Contract
                  </h2>
                  <h3
                    className={styles.createServiceSectionSubTitle}
                    style={{ marginBottom: '1rem' }}
                  >
                    Add pricing for each contract
                  </h3>
                  <div className={styles.contractPricingHeader}>
                    <span>Name</span>
                    <span>Price</span>
                  </div>
                  {contracts.map((item) => (
                    <div className={styles.contractPricingItem} key={item.name}>
                      <div>
                        <div>{item.logo}</div>
                        <div>
                          <span>{item.name}</span>
                          <span>{item.type}</span>
                        </div>
                      </div>
                      <div>
                        <CurrencyInput
                          placeholder={`${servicePrice}`}
                          unit="£"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className={styles.createServiceSection}>
            <h2
              className={styles.createServiceSectionTitle}
              style={{ margin: 0 }}
            >
              Deposits & Online Payments
            </h2>
            <h3
              className={styles.createServiceSectionSubTitle}
              style={{ marginBottom: '1rem' }}
            >
              Take a deposit on the service prior to the client booking.
            </h3>
            <div className={styles.createServiceSectionItem}>
              <div className={styles.paymentProcessing}>
                {paymentProcessing.map((option) => (
                  <div
                    key={option.type}
                    className={
                      option.selected
                        ? styles.paymentProcessingOptionSelected
                        : ''
                    }
                    onClick={() => handleSelectPaymentProcessingOption(option)}
                  >
                    <div className={styles.paymentProcessingOptionLogos}>
                      {option.type === 'Amount' && <Money />}
                      {option.type === 'Percent' && <PercentageOutlined />}
                    </div>
                    <div className={styles.paymentProcessingOptionTitle}>
                      {option.type}
                    </div>
                    <div className={styles.paymentProcessingChecked}>
                      <CheckCircleFilled />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.createServiceSectionItem}>
              <Form form={form} layout="vertical">
                <Form.Item label="Amount">
                  <CurrencyInput
                    placeholder={`${servicePrice}`}
                    unit={paymentUnit}
                  />
                </Form.Item>
              </Form>
            </div>
            <div
              className={styles.createServiceSectionItem}
              style={{ margin: 0 }}
            >
              <Checkbox defaultChecked={true}>
                Require payment before completing booking
              </Checkbox>
            </div>
          </div>
        </div>
        <TabMenu
          menuItems={['Employees', 'Resources', 'Locations']}
          tabPosition="top"
          minHeight="1px"
        >
          <div className={styles.employeesContainer}>
            <div className={styles.createServiceSection}>
              <Employees
                employees={employees}
                title={employeesTitle || ''}
                description={employeesDesc || ''}
                onSelected={(items) => setSelectedEmployees(items)}
              />
            </div>
          </div>
          <div className={styles.resoucesContainer}>
            <div className={styles.createServiceSection}>
              <SearchTags
                title={roomsTitle || ''}
                description={roomsDesc || ''}
                items={rooms}
                itemType={roomsItemType || 'room'}
              />
            </div>
            <div className={styles.createServiceSection}>
              <SearchTags
                title={equipmentTitle || ''}
                description={equipmentDesc || ''}
                items={equipment}
                itemType={equipemntItemType || 'equipment'}
              />
            </div>
          </div>
          <div className={styles.locationsContainer}>
            <div className={styles.createServiceSection}>
              <h2
                className={styles.createServiceSectionTitle}
                style={{ margin: 0 }}
              >
                Locations
              </h2>
              <h3
                className={styles.createServiceSectionSubTitle}
                style={{ marginBottom: '1rem' }}
              >
                Choose the locations this service is available at.
              </h3>
              <div className={styles.locationItem}>
                <Checkbox
                  defaultChecked={false}
                  onChange={(e) => handleSelectAll(e)}
                >
                  Select all
                </Checkbox>
              </div>
              {locationItems?.map((location) => (
                <div key={location.location} className={styles.locationItem}>
                  <Checkbox
                    defaultChecked={location.selected}
                    checked={location.selected}
                    onChange={(e) => handleCheckLocation(e, location)}
                  >
                    {location.location}
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
        </TabMenu>
        <div className={styles.createServiceOnlineBooking}>
          <div className={styles.createServiceSection}>
            <h2 className={styles.createServiceSectionTitle}>General</h2>
            <div className={styles.createServiceSectionItem}>
              <div className={styles.enableServiceOnline}>
                <Switch
                  size="small"
                  defaultChecked={true}
                  style={{ marginRight: '8px' }}
                />{' '}
                Enable this service online
              </div>
            </div>
            <div className={styles.createServiceSectionItem}>
              <Input
                label="Friendly name"
                placeHolderText="eg. Initial Consultation"
                tooltip="This will display a different name to your service name (often used to make clients be more familiar with the service)."
              />
            </div>
            <div
              className={styles.createServiceSectionItem}
              style={{ margin: 0 }}
            >
              <Form form={form} layout="vertical">
                <Form.Item label="Description">
                  <AntInput.TextArea
                    rows={4}
                    placeholder="e.g. the world’s most spectacular product"
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={styles.advancedSettings}>
            <Collapse ghost>
              <Panel header="Advanced settings" key="advanced-settings">
                <div className={styles.createServiceSection}>
                  <h2 className={styles.createServiceSectionTitle}>
                    Restrict patient bookings to
                  </h2>
                  <div className={styles.patientBookings}>
                    {patientBookings.map((option) => (
                      <div
                        key={option.type}
                        className={
                          option.selected ? styles.patientBookingsSelected : ''
                        }
                        onClick={() => handleSelectPatientBookings(option)}
                      >
                        <div className={styles.patientBookingsChecked}>
                          <CheckCircleFilled />
                        </div>
                        <div className={styles.patientBookingsTitle}>
                          {option.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.createServiceSection}>
                  <h2 className={styles.createServiceSectionTitle}>
                    Available on
                  </h2>
                  <div className={styles.availableOn}>
                    {availableOn.map((option) => (
                      <div
                        className={styles.availableOnItem}
                        key={option.weekDay}
                      >
                        <Checkbox
                          defaultChecked={option.isAvailable}
                          onChange={(e) =>
                            handleChangeAvailableOn(
                              option.weekDay,
                              e.target.checked
                            )
                          }
                        />
                        <span>{option.weekDay}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className={styles.createServiceClientPathway}>
          <div className={styles.createServiceClientPathwayItemsContainer}>
            <div className={styles.createServiceSection}>
              <h2
                className={styles.createServiceSectionTitle}
                style={{ margin: 0 }}
              >
                Precare
              </h2>
              <h3
                className={styles.createServiceSectionSubTitle}
                style={{ marginBottom: '1rem' }}
              >
                This is the communication to be set prior to someone having this
                service
              </h3>
              <div className={styles.createServiceClientPathwayItems}>
                <div className={styles.createServiceClientPathwayItem}>
                  <div>
                    <Botox />
                  </div>
                  <p>Botox Precare</p>
                </div>
                <div className={styles.createServiceClientPathwayItem}>
                  <div>
                    <MedicalHistory />
                  </div>
                  <p>Medical History</p>
                </div>
                <div className={styles.createServiceClientPathwayItem}>
                  <div>
                    <Treatment />
                  </div>
                  <p>Appointment reminder</p>
                </div>
              </div>
            </div>
            <div className={styles.createServiceSection}>
              <h2
                className={styles.createServiceSectionTitle}
                style={{ margin: 0 }}
              >
                During
              </h2>
              <h3
                className={styles.createServiceSectionSubTitle}
                style={{ marginBottom: '1rem' }}
              >
                These are the forms to be used during this service
              </h3>
              <div className={styles.createServiceClientPathwayItems}>
                <div className={styles.createServiceClientPathwayItem}>
                  <div>
                    <Botox />
                  </div>
                  <p>Botox treatment form</p>
                </div>
                <div className={styles.createServiceClientPathwayItem}>
                  <div>
                    <Botox />
                  </div>
                  <p>Botox consent</p>
                </div>
              </div>
            </div>
            <div className={styles.createServiceSection}>
              <h2
                className={styles.createServiceSectionTitle}
                style={{ margin: 0 }}
              >
                Aftercare
              </h2>
              <h3
                className={styles.createServiceSectionSubTitle}
                style={{ marginBottom: '1rem' }}
              >
                Here are the communications to be sent after the service has
                been checked out
              </h3>
              <div className={styles.createServiceClientPathwayItems}>
                <div className={styles.createServiceClientPathwayItem}>
                  <div>
                    <Botox />
                  </div>
                  <p>Botox aftercare</p>
                </div>
                <div className={styles.createServiceClientPathwayItem}>
                  <div>
                    <Botox />
                  </div>
                  <p>Botox recall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FullScreenReportModal>
    </>
  )
}

export default CreateService
