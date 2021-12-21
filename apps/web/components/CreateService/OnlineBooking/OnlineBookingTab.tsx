import React, { FC } from 'react'
import {
  BookingDaysType,
  CreateServiceType,
  BodyImagesType,
  CustomIconComponentProps,
} from '../CreateService'
import {
  RecommendedProductListProps,
  CourseUpsellImagesProps,
} from './OnlineBooking'
import OnlineBookingLayout from './OnlineBookingLayout'

export interface ProductListDataProps {
  name: string
  image: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >
  verified: boolean
}

export interface RecommendedListProps {
  id: number | string
  src: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >
  name: string
  rate: number
  price: string
}

interface OnlineBookingTabProps {
  availableOn: BookingDaysType[]
  productListData: ProductListDataProps[]
  courseUpsellImages: CourseUpsellImagesProps[]
  handleAddProduct: () => void
  recommendedList: RecommendedListProps[]
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

const OnlineBookingTab: FC<OnlineBookingTabProps> = ({
  availableOn,
  productListData,
  handleAddProduct,
  courseUpsellImages,
  recommendedList,
  recommendedCourseList,
  serviceListData,
  handleAddServices,
  recommendedService,
  values,
  setFieldValue,
}) => {
  return (
    <OnlineBookingLayout
      availableOn={availableOn}
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

export default OnlineBookingTab
