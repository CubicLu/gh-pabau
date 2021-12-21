import React, { FC } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { get, weekDays } from '../../../mocks/Services'
import {
  BookingDaysType,
  CreateServiceType,
  BodyImagesType,
} from '../CreateService'
import { ProductListDataProps, RecommendedListProps } from './OnlineBookingTab'
import OnlineBooking, {
  RecommendedProductListProps,
  CourseUpsellImagesProps,
} from './OnlineBooking'

interface OnlineBookingLayoutProps {
  availableOn: BookingDaysType[]
  productListData: ProductListDataProps[]
  handleAddProduct: () => void
  recommendedList: RecommendedListProps[]
  courseUpsellImages: CourseUpsellImagesProps[]
  recommendedCourseList: RecommendedProductListProps[]
  serviceListData: ProductListDataProps[]
  handleAddServices: () => void
  recommendedService: RecommendedListProps[]
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number | BodyImagesType[]
  ): void
}

const OnlineBookingLayout: FC<OnlineBookingLayoutProps> = ({
  availableOn,
  productListData,
  handleAddProduct,
  recommendedList,
  courseUpsellImages,
  recommendedCourseList,
  serviceListData,
  handleAddServices,
  recommendedService,
  values,
  setFieldValue,
}) => {
  const { t } = useTranslationI18()
  const { patientBookings } = get(t)

  const handleSelectPatientBookings = (item, setFieldValue) => {
    const options = [...patientBookings]
    for (const option of options) {
      option.selected = option.type === item.type
    }
    setFieldValue('patientBooking', item.type)
  }

  const handleChangeAvailableOn = (
    weekDay,
    status,
    bookingDays,
    setFieldValue
  ) => {
    const options = [...availableOn]
    for (const option of options) {
      if (option.weekDay === weekDay) option.isAvailable = status
    }
    setFieldValue('availableOnData', options)

    const days = [...bookingDays]
    const day = weekDays.find((item) => item.substring(0, 3) === weekDay)
    if (day) {
      if (status === true) {
        days.push({
          day: day,
          openTime: undefined,
          closeTime: undefined,
        })
      } else if (status === false) {
        days.splice(
          days.findIndex((d) => d.day === day),
          1
        )
      }
    }
    setFieldValue('bookingDays', days)
  }

  const handleBookingTime = (key, val, bookingDays, type, setFieldValue) => {
    const days = [...bookingDays]
    days[key][type] = val
    setFieldValue('bookingDays', days)
  }
  return (
    <OnlineBooking
      patientBookings={patientBookings}
      handleSelectPatientBookings={handleSelectPatientBookings}
      handleChangeAvailableOn={handleChangeAvailableOn}
      handleBookingTime={handleBookingTime}
      productListData={productListData}
      handleAddProduct={handleAddProduct}
      recommendedList={recommendedList}
      courseUpsellImages={courseUpsellImages}
      recommendedCourseList={recommendedCourseList}
      serviceListData={serviceListData}
      handleAddServices={handleAddServices}
      recommendedService={recommendedService}
      values={values}
      setFieldValue={setFieldValue}
    />
  )
}

export default OnlineBookingLayout
