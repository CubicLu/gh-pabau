import {
  CalendarOutlined,
  TeamOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  ChooseModal,
  FullScreenReportModal,
  OperationType,
  ProductList,
  ProductList as ServiceList,
} from '@pabau/ui'
import { useServiceListQuery } from '@pabau/graphql'
import { Formik } from 'formik'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import {
  appointmentColors,
  get,
  productPaginateData,
  servicePaginateData,
  recommendedProductList,
  recommendedCourseList,
  recommendedServiceList,
  productData,
  servicesData,
  courseUpsellImages,
} from '../../mocks/Services'
import General from './General/GeneralTab'
import Pricing from './Pricing/PricingTab'
import StaffResources from './StaffResources/StaffResourcesTab'
import OnlineBooking from './OnlineBooking/OnlineBookingTab'

export interface Employee {
  id: number | string
  avatar?: string
  name: string
  selected: boolean
  price?: string
  duration?: string
}

export interface LocationItem {
  id: number | string
  location: string
  value: string
  detail: string
  img?: string
  badges?: IconDefinition[]
  selected: boolean
  price?: string
}

export interface ContractItem {
  logo: ReactNode
  key: string
  name: string
  type: string
  price?: string
}

export interface BookingDaysType {
  weekDay: string
  isAvailable: boolean
}

interface EmployeeType {
  name: string
  price?: string
  duration?: string
}

interface LocationType {
  location: string
  price?: string
}

interface ContractType {
  name: string
  price?: string
}

interface TimingRulesType {
  day: string
  openTime: string
  closeTime: string
}

export interface BodyImagesType {
  name: string
  src: string
  selected: boolean
}

export interface CustomIconComponentProps {
  width: string | number
  height: string | number
  fill: string
  viewBox?: string
  className?: string
  style?: React.CSSProperties
}

export interface CreateServiceType {
  name?: string
  clients: number
  code?: string
  category?: string
  color?: string
  image?: string
  sku?: string
  procedureCode?: string
  invoiceItemName?: string
  displayTextOnInvoice?: string
  packageSession: boolean
  type?: string
  pricingOption?: string
  servicePrice: string
  duration?: string
  tax?: string
  onlinePayment?: string
  onlinePaymentAmount?: string
  completingBooking: boolean
  paymentBeforeBooking: boolean
  employeesData: EmployeeType[]
  roomResources: string[]
  equipmentResources: string[]
  locationData: LocationType[]
  enableOnlineService: boolean
  friendlyName?: string
  bookingDescription?: string
  patientBooking?: string
  bookingDays?: TimingRulesType[]
  staffAssigned: string
  contractData: ContractType[]
  isActive: boolean
  daysBeforeBooking: number
  noticeShort?: string
  noticeLong?: string
  minAttendees: number
  bundleItems: EditDataType[]
  bundleItemsAmount: string
  bundleItemsDuration: string
  showCoursePromotionMessage: boolean
  showProductSellMessage: boolean
  showServiceSellMessage: boolean
  promotionView: string
  consultationType: string
  empData: Employee[]
  locData: LocationItem[]
  availableOnData: BookingDaysType[]
  apColors: string[]
  headAndNeckList: BodyImagesType[]
  bodyPartList: BodyImagesType[]
  bundleList: EditDataType[]
  discount: number
  previewPrice: string
  sellMessage: string
  coursePromotionMessage: string
  sellProductMessage: string
}

export interface EditDataType {
  id: string
  is_active: boolean
  service_name: string
  duration: string
  staff_assigned: string
  price?: string
  type: string
  code: string
  category: string
  color: string
  image: string
  sku: string
  procedure_code: string
  invoice_item_name: string
  display_text_on_invoice: string
  is_package_session: boolean
  pricing_type: string
  service_price: string
  tax: string
  online_payment_type: string
  online_payment_amount: string
  is_online_booking: boolean
  is_payment_before_booking: boolean
  employees: EmployeeType[]
  locations: LocationType[]
  is_service_online: boolean
  friendly_name: string
  description: string
  patient_booking_type: string
  timing_rules: TimingRulesType[]
  max_clients: number
  room_resources: string[]
  equipment_resources: string[]
  contracts: ContractType[]
  days_before_booking: number
  notice_short: string
  notice_long: string
  min_attendees: number
  bundle_items: string[]
  bundle_amount: string
  bundle_duration: string
  discount: number
  sell_message: string
  sell_product_message: string
}

export interface CreateServiceProps {
  contracts: ContractItem[]
  employees: Employee[]
  employeesTitle?: string
  employeesDesc?: string
  locations: LocationItem[]
  bookingDays: BookingDaysType[]
  rooms: Array<string>
  roomsTitle?: string
  roomsDesc?: string
  roomsItemType?: string
  equipment: Array<string>
  equipmentTitle?: string
  equipmentDesc?: string
  equipmentItemType?: string
  visible: boolean
  editData?: EditDataType
  setEditData?: (e) => void
  handleSubmitServices?: (key, values, { resetForm }, setShowModal) => void
  onClose: () => void
  onCreate?: () => void
}

export const CreateService: FC<CreateServiceProps> = ({
  contracts,
  employees,
  employeesTitle,
  employeesDesc,
  locations,
  bookingDays,
  rooms,
  roomsDesc,
  roomsItemType,
  roomsTitle,
  equipment,
  equipmentItemType,
  equipmentDesc,
  equipmentTitle,
  visible,
  editData,
  setEditData,
  handleSubmitServices,
  onClose,
  onCreate,
}) => {
  const { t } = useTranslationI18()
  const [showModal, setShowModal] = useState(false)
  const [showChooseModal, setShowChooseModal] = useState(false)
  const [locationItems, setLocationItems] = useState<LocationItem[]>([])
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [contractList, setContractList] = useState<ContractItem[]>([])

  const {
    pricingOptions,
    paymentProcessing,
    patientBookings,
    bodyHeadAndNeck,
    bodyParts,
  } = get(t)

  const [productListData, setProductListData] = useState(productData)
  const [serviceListData, setServiceListData] = useState(servicesData)
  const [recommendedList, setRecommendedList] = useState(recommendedProductList)
  const [recommendedService, setRecommendedService] = useState(
    recommendedServiceList
  )
  const [availableOn, setAvailableOn] = useState<BookingDaysType[]>([])
  const [serviceData, setServiceData] = useState(null)
  const [editBundle, setEditBundle] = useState<EditDataType[]>([])
  const bundleDataList: EditDataType[] = []
  const [showProductList, setShowProductList] = useState<boolean>(false)
  const [showServicesList, setShowServicesList] = useState<boolean>(false)

  const { data, loading } = useServiceListQuery({
    fetchPolicy: 'network-only',
  })

  const handleAddProduct = () => {
    setShowProductList((val) => !val)
  }

  const handleAddServices = () => {
    setShowServicesList((e) => !e)
  }

  useEffect(() => {
    if (data) {
      setServiceData(data?.service)
    }
  }, [data, loading])

  useEffect(() => {
    setShowChooseModal(visible)
    setShowModal(false)
    if (editData && Object.keys(editData).length > 0 && editData.type) {
      setShowChooseModal(false)
      setShowModal(true)
    }
  }, [visible, editData])

  useEffect(() => {
    if (editData?.employees) {
      let employeeData = [...employees]
      const editEmployees = [...editData?.employees]
      employeeData = employeeData.map((item) => {
        const employeeItem = editEmployees.find((i) => i.name === item.name)
        if (item.name === employeeItem?.name) {
          item.selected = true
          item.price = employeeItem.price
          item.duration = employeeItem.duration
        }
        return item
      })
      setEmployeeList(employeeData)
      let locationData = [...locations]
      const editLocations = [...editData?.locations]
      locationData = locationData?.map((item) => {
        const locationItem = editLocations.find(
          (i) => i.location === item.value
        )
        if (item.value === locationItem?.location) {
          item.selected = true
          item.price = locationItem.price
        }
        return item
      })
      setLocationItems(locationData)
      let bookings = [...bookingDays]
      const editBookings = [...editData?.timing_rules]
      bookings = bookings.map((item) => {
        const bookingItem = editBookings.find(
          (i) => i.day.substring(0, 3) === item.weekDay
        )
        if (item.weekDay === bookingItem?.day?.substring(0, 3)) {
          item.isAvailable = true
        }
        return item
      })
      setAvailableOn(bookings)
      let contractData = [...contracts]
      const editContracts = [...editData?.contracts]
      contractData = contractData.map((item) => {
        const contractItem = editContracts.find((i) => i.name === item.name)
        if (item.name === contractItem?.name) {
          item.price = contractItem.price
        }
        return item
      })
      setContractList(contractData)
      if (editData && editData?.bundle_items?.length > 0 && serviceData) {
        const dataList: EditDataType[] = []
        const editBundleItems = [...editData?.bundle_items]
        serviceData.map((item) => {
          const bundleItem = editBundleItems.find((i) => i === item.id)
          if (item.id === bundleItem) {
            dataList.push(item)
          }
          return item
        })
        setEditBundle(dataList)
      }
    } else {
      setEmployeeList(
        employees.map((item) => ({
          ...item,
          selected: true,
          price: undefined,
          duration: undefined,
        }))
      )
      setLocationItems(
        locations.map((item) => ({ ...item, selected: true, price: undefined }))
      )
      setAvailableOn(bookingDays)
      setContractList(
        contracts.map((item) => ({
          ...item,
          price: undefined,
        }))
      )
    }
  }, [locations, employees, editData, bookingDays, contracts, serviceData])

  const getNewRecommendedList = (list) => {
    return list
      .filter((item) => item.verified)
      .map((item) => {
        return {
          id: Math.random(),
          src: item.image,
          name: item.name,
          rate: 2.5,
        }
      })
  }

  const setEditFields = () => {
    const editFields = {
      id: editData?.id,
      name: editData?.service_name,
      clients: editData?.max_clients,
      code: editData?.code,
      category: editData?.category,
      color: editData?.color,
      image: editData?.image,
      sku: editData?.sku,
      procedureCode: editData?.procedure_code,
      invoiceItemName: editData?.invoice_item_name,
      displayTextOnInvoice: editData?.display_text_on_invoice,
      packageSession: editData?.is_package_session,
      type: editData?.type,
      pricingOption: editData?.pricing_type,
      servicePrice: editData?.service_price,
      duration: editData?.duration,
      tax: editData?.tax,
      onlinePayment: editData?.online_payment_type,
      onlinePaymentAmount: editData?.online_payment_amount,
      completingBooking: editData?.is_online_booking,
      paymentBeforeBooking: editData?.is_payment_before_booking,
      employeesData: editData?.employees,
      roomResources: editData?.room_resources,
      equipmentResources: editData?.equipment_resources,
      locationData: editData?.locations,
      enableOnlineService: editData?.is_service_online,
      friendlyName: editData?.friendly_name,
      bookingDescription: editData?.description,
      patientBooking: editData?.patient_booking_type,
      bookingDays: editData?.timing_rules,
      staffAssigned: editData?.staff_assigned,
      contractData: editData?.contracts,
      isActive: editData?.is_active,
      daysBeforeBooking: editData?.days_before_booking,
      noticeShort: editData?.notice_short,
      noticeLong: editData?.notice_long,
      minAttendees: editData?.min_attendees,
      bundleItems: editBundle,
      bundleItemsAmount: editData?.bundle_amount,
      bundleItemsDuration: editData?.bundle_duration,
      showCoursePromotionMessage: true,
      showProductSellMessage: true,
      showServiceSellMessage: true,
      promotionView: 'Builder',
      consultationType: 'offline',
      empData: employeeList,
      locData: locationItems,
      availableOnData: availableOn,
      apColors: appointmentColors,
      headAndNeckList: bodyHeadAndNeck,
      bodyPartList: bodyParts,
      bundleList: serviceData,
      discount: editData?.discount,
      previewPrice: '80.00',
      sellProductMessage:
        'Save up to 50% by upgrading this service to a products',
      coursePromotionMessage:
        'Save up to 50% by upgrading this service to a course',
      sellMessage: 'Would you like to treat yourself to a nice massage?',
    }
    return editFields
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        editData?.id
          ? setEditFields()
          : {
              name: undefined,
              clients: 1,
              code: undefined,
              category: undefined,
              color: undefined,
              image: undefined,
              sku: undefined,
              procedureCode: undefined,
              invoiceItemName: undefined,
              displayTextOnInvoice: undefined,
              packageSession: false,
              type: undefined,
              pricingOption: pricingOptions[0].value,
              servicePrice: undefined,
              duration: undefined,
              tax: undefined,
              onlinePayment: paymentProcessing[1].value,
              onlinePaymentAmount: undefined,
              completingBooking: true,
              paymentBeforeBooking: true,
              employeesData: employeeList,
              roomResources: [],
              equipmentResources: [],
              locationData: locationItems,
              enableOnlineService: true,
              friendlyName: undefined,
              bookingDescription: undefined,
              patientBooking: patientBookings[0].type,
              bookingDays: [] || undefined,
              staffAssigned: employeeList.length.toString(),
              contractData: contractList,
              isActive: true,
              daysBeforeBooking: 0,
              noticeShort: undefined,
              noticeLong: undefined,
              minAttendees: 2,
              bundleItems: bundleDataList,
              bundleItemsAmount: '0.00',
              bundleItemsDuration: '00:00',
              showCoursePromotionMessage: true,
              showProductSellMessage: true,
              showServiceSellMessage: true,
              promotionView: 'Builder',
              consultationType: 'offline',
              empData: employeeList,
              locData: locationItems,
              availableOnData: availableOn,
              apColors: appointmentColors,
              headAndNeckList: bodyHeadAndNeck,
              bodyPartList: bodyParts,
              bundleList: serviceData,
              discount: 15,
              previewPrice: '80.00',
              sellProductMessage:
                'Save up to 50% by upgrading this service to a products',
              coursePromotionMessage:
                'Save up to 50% by upgrading this service to a course',
              sellMessage:
                'Would you like to treat yourself to a nice massage?',
            }
      }
      onSubmit={(values, { resetForm }) => {
        const key = !!editData?.id
        handleSubmitServices?.(key, values, { resetForm }, setShowModal)
      }}
    >
      {({ setFieldValue, handleSubmit, handleReset, values }) => (
        <>
          <ChooseModal
            title={t('setup.services.servicestab.choosemodal.title')}
            items={[
              {
                title: t(
                  'setup.services.servicestab.choosemodal.items.service'
                ),
                key: 'Service',
                description: t(
                  'setup.services.servicestab.choosemodal.items.service.description'
                ),
                icon: <CalendarOutlined />,
              },
              {
                title: t(
                  'setup.services.servicestab.choosemodal.items.virtual'
                ),
                key: 'Virtual',
                description: t(
                  'setup.services.servicestab.choosemodal.items.virtual.description'
                ),
                icon: <VideoCameraOutlined />,
              },
              {
                title: t('setup.services.servicestab.choosemodal.items.class'),
                key: 'Class',
                description: t(
                  'setup.services.servicestab.choosemodal.items.class.description'
                ),
                icon: <TeamOutlined />,
              },
            ]}
            visible={showChooseModal}
            onSelected={(item) => {
              setShowChooseModal(false)
              setShowModal(true)
              setFieldValue('type', item.key)
            }}
            onClose={() => {
              setShowChooseModal(false)
              setShowModal(false)
              onClose()
            }}
          />
          <FullScreenReportModal
            visible={showModal}
            title={
              editData?.id
                ? t(
                    `setup.services.servicestab.createmodal.title.edit.${values.type}`
                  )
                : t(
                    `setup.services.servicestab.createmodal.title.create.${values.type}`
                  )
            }
            operations={
              editData?.id
                ? [OperationType.active, OperationType.create]
                : [OperationType.active, OperationType.create]
            }
            activated={values.isActive}
            onActivated={(val) => setFieldValue('isActive', val)}
            onBackClick={() => {
              setShowModal(false)
              setShowChooseModal(false)
              setEditData?.(null)
              onClose()
              handleReset()
            }}
            createBtnText={
              editData?.id ? t('common-label-save') : t('common-label-create')
            }
            enableCreateBtn={
              !!values.name && !!values.servicePrice && !!values.category
            }
            subMenu={[
              t('setup.services.servicestab.createmodal.submenu.general'),
              t('setup.services.servicestab.createmodal.submenu.pricing'),
              t(
                'setup.services.servicestab.createmodal.submenu.staff&resources'
              ),
              t('setup.services.servicestab.createmodal.submenu.onlinebooking'),
            ]}
            onCreate={() => {
              onCreate?.()
              handleSubmit()
            }}
            footer={true}
          >
            <General values={values} setFieldValue={setFieldValue} />
            <Pricing
              employeeList={employeeList}
              locationItems={locationItems}
              contractList={contractList}
              values={values}
              setFieldValue={setFieldValue}
            />
            <StaffResources
              employeeList={employeeList}
              locationItems={locationItems}
              employeesTitle={employeesTitle}
              employeesDesc={employeesDesc}
              rooms={rooms}
              roomsTitle={roomsTitle}
              roomsDesc={roomsDesc}
              roomsItemType={roomsItemType}
              equipment={equipment}
              equipmentTitle={equipmentTitle}
              equipmentDesc={equipmentDesc}
              equipmentItemType={equipmentItemType}
              setLocationItems={setLocationItems}
              values={values}
              setFieldValue={setFieldValue}
            />
            <OnlineBooking
              availableOn={availableOn}
              productListData={productListData}
              handleAddProduct={handleAddProduct}
              courseUpsellImages={courseUpsellImages}
              recommendedList={recommendedList}
              recommendedCourseList={recommendedCourseList}
              serviceListData={serviceListData}
              handleAddServices={handleAddServices}
              recommendedService={recommendedService}
              values={values}
              setFieldValue={setFieldValue}
            />
          </FullScreenReportModal>
          <ProductList
            modalVisible={showProductList}
            data={productListData}
            paginateData={productPaginateData}
            handleClose={handleAddProduct}
            handleSelect={(list) => {
              setProductListData([...list])
              const productDetails = [...recommendedProductList]
              const newRecommendList = getNewRecommendedList(list)
              setRecommendedList([...productDetails, ...newRecommendList])
            }}
          />
          <ServiceList
            modalVisible={showServicesList}
            data={serviceListData}
            paginateData={servicePaginateData}
            handleClose={handleAddServices}
            handleSelect={(list) => {
              setServiceListData([...list])
              const servicesDetails = [...recommendedServiceList]
              const newRecommendList = getNewRecommendedList(list)
              setRecommendedService([...servicesDetails, ...newRecommendList])
            }}
          />
        </>
      )}
    </Formik>
  )
}

export default CreateService
