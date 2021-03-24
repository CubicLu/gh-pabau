import React, { FC } from 'react'

import { HelpTooltip, InputNumber, SimpleDropdown } from '@pabau/ui'

import styles from './common.module.less'
import {
  GeneralReferralConfig,
  ReferralObjProp,
} from '../../../../types/referralSettings'
import { FormikErrors } from 'formik'

interface P {
  generalObj: GeneralReferralConfig
  values: ReferralObjProp
  setFieldValue: (field: string, value: string) => void
  errors: FormikErrors<ReferralObjProp>
}

const General: FC<P> = ({
  generalObj: { inputList, dropdownList },
  values,
  setFieldValue,
  errors,
}) => {
  return (
    <div className={styles.referralGeneralContainer}>
      <div className={styles.generalReferral}>
        <p>Referral configuration</p>
        <span>Configure key information about your referral system.</span>
      </div>
      {dropdownList?.map(({ key, id, label, value, options, helpText }) => (
        <div
          key={`general-dropdown-list-${key}`}
          className={styles.generalDropdownList}
        >
          <SimpleDropdown
            label={label}
            tooltip={helpText}
            value={value}
            dropdownItems={options}
            onSelected={(val) => setFieldValue(id, val)}
          />
        </div>
      ))}
      {inputList?.map(({ key, name, label, helpText, showCurrency }) => (
        <div
          key={`general-input-list-${key}`}
          className={styles.generalInputList}
        >
          <div className={styles.generalLabel}>
            <span>{label}</span>
            <HelpTooltip helpText={helpText} />
          </div>
          <InputNumber
            value={values[name]}
            showCurrency={showCurrency}
            onChange={(val) => setFieldValue(name, val)}
            requiredMsg={errors[name]}
          />
        </div>
      ))}
    </div>
  )
}

export default General
