import React, { FC } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { get } from '../../../mocks/Services'
import {
  Employee,
  LocationItem,
  ContractItem,
  CreateServiceType,
} from '../CreateService'
import Pricing from './Pricing'

interface PricingLayoutProps {
  employeeList: Employee[]
  locationItems: LocationItem[]
  contractList: ContractItem[]
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number
  ): void
}

const PricingLayout: FC<PricingLayoutProps> = ({
  employeeList,
  locationItems,
  contractList,
  values,
  setFieldValue,
}) => {
  const { t } = useTranslationI18()
  const { durations, pricingOptions, paymentProcessing } = get(t)

  const handleSelectPricingOption = (item, setFieldValue) => {
    const options = [...pricingOptions]
    for (const option of options) {
      option.selected = option.value === item.value
    }
    setFieldValue('pricingOption', item.value)
  }

  const handleEmployeePricingDuration = (key, type, val, setFieldValue) => {
    const employees = employeeList.filter((item) => item.selected === true)
    employees[key][type] = val
    setFieldValue('employeesData', employees)
  }

  const handleLocationPricing = (key, val, setFieldValue) => {
    const locationList = [...locationItems]
    locationList[key]['price'] = val
    setFieldValue('locationData', locationList)
  }

  const handleContractPricing = (key, val, setFieldValue) => {
    const contracts = [...contractList]
    contracts[key]['price'] = val
    setFieldValue('contractData', contracts)
  }

  const handleSelectPaymentProcessingOption = (item, setFieldValue) => {
    const options = [...paymentProcessing]
    for (const option of options) {
      option.selected = option.value === item.value
    }
    setFieldValue('onlinePayment', item.value)
  }

  return (
    <Pricing
      contractList={contractList}
      values={values}
      setFieldValue={setFieldValue}
      pricingOptions={pricingOptions}
      handleSelectPricingOption={handleSelectPricingOption}
      durations={durations}
      paymentProcessing={paymentProcessing}
      handleEmployeePricingDuration={handleEmployeePricingDuration}
      handleLocationPricing={handleLocationPricing}
      handleContractPricing={handleContractPricing}
      handleSelectPaymentProcessingOption={handleSelectPaymentProcessingOption}
    />
  )
}

export default PricingLayout
