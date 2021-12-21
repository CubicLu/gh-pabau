import React, { FC } from 'react'
import {
  Employee,
  LocationItem,
  ContractItem,
  CreateServiceType,
} from '../CreateService'
import PricingLayout from './PricingLayout'

interface PricingTabProps {
  employeeList: Employee[]
  locationItems: LocationItem[]
  contractList: ContractItem[]
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number
  ): void
}

const PricingTab: FC<PricingTabProps> = ({
  employeeList,
  locationItems,
  contractList,
  values,
  setFieldValue,
}) => {
  return (
    <PricingLayout
      employeeList={employeeList}
      locationItems={locationItems}
      contractList={contractList}
      values={values}
      setFieldValue={setFieldValue}
    />
  )
}

export default PricingTab
