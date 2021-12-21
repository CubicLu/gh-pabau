import React, { FC } from 'react'
import { Employee, LocationItem, CreateServiceType } from '../CreateService'
import StaffResourcesLayout from './StaffResourcesLayout'

interface StaffResourcesTabProps {
  employeeList: Employee[]
  locationItems: LocationItem[]
  employeesTitle?: string
  employeesDesc?: string
  rooms: Array<string>
  roomsTitle?: string
  roomsDesc?: string
  roomsItemType?: string
  equipment: Array<string>
  equipmentTitle?: string
  equipmentDesc?: string
  equipmentItemType?: string
  setLocationItems: (e) => void
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number
  ): void
}

const StaffResourcesTab: FC<StaffResourcesTabProps> = ({
  employeeList,
  locationItems,
  employeesTitle,
  employeesDesc,
  rooms,
  roomsTitle,
  roomsDesc,
  roomsItemType,
  equipment,
  equipmentTitle,
  equipmentDesc,
  equipmentItemType,
  setLocationItems,
  values,
  setFieldValue,
}) => {
  return (
    <StaffResourcesLayout
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
  )
}

export default StaffResourcesTab
