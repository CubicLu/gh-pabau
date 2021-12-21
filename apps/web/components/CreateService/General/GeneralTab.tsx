import React, { FC } from 'react'
import { CreateServiceType } from '../CreateService'
import GeneralLayout from './GeneralLayout'

interface GeneralTabProps {
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number
  ): void
}

const GeneralTab: FC<GeneralTabProps> = ({ values, setFieldValue }) => {
  return <GeneralLayout values={values} setFieldValue={setFieldValue} />
}

export default GeneralTab
