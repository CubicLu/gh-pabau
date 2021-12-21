import React, { FC } from 'react'
import { Employee, LocationItem, CreateServiceType } from '../CreateService'
import StaffResources from './StaffResources'

interface StaffResourcesLayoutProps {
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

const StaffResourcesLayout: FC<StaffResourcesLayoutProps> = ({
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
  const handleSelectedEmployees = (items, setFieldValue) => {
    setFieldValue(
      'employeesData',
      items.map((item) => ({
        name: item.name,
        price: undefined,
        duration: undefined,
      }))
    )
    setFieldValue('staffAssigned', items?.length.toString())
    const employees = [...employeeList]
    for (const key of employees) {
      for (const item of items) {
        if (key.name === item.name) {
          key.selected = item.selected
        }
      }
    }
    setFieldValue('empData', employees)
  }

  const handleSelectAll = (e) => {
    const items = [...locationItems]
    for (const item of items) {
      item.selected = e.target.checked
    }
    setLocationItems([...items])
  }

  const handleCheckLocation = (e, location, setFieldValue) => {
    const items = [...locationItems]
    for (const item of items) {
      item.selected =
        location.value === item.value ? e.target.checked : item.selected
    }
    setFieldValue('locData', items)
    setFieldValue(
      'locationData',
      items.filter((item) => item.selected === true)
    )
  }
  return (
    <StaffResources
      employeeList={employeeList}
      employeesTitle={employeesTitle}
      employeesDesc={employeesDesc}
      handleSelectedEmployees={handleSelectedEmployees}
      rooms={rooms}
      roomsTitle={roomsTitle}
      roomsDesc={roomsDesc}
      roomsItemType={roomsItemType}
      equipment={equipment}
      equipmentTitle={equipmentTitle}
      equipmentDesc={equipmentDesc}
      equipmentItemType={equipmentItemType}
      handleSelectAll={handleSelectAll}
      handleCheckLocation={handleCheckLocation}
      values={values}
      setFieldValue={setFieldValue}
    />
  )
}

export default StaffResourcesLayout
