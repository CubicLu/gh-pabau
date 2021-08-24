import { BasicModal } from '@pabau/ui'
import { DatePicker, Select } from 'antd'
import React, { FC } from 'react'
import { countryMenu } from '../../assets/images/lang-logos'
import styles from './FormComponent.module.less'

interface P {
  visible: boolean
  onSaveTravel: () => void
  onCancelTravel: () => void
  onAddCountry: (string) => void
  onAddDateRange: (Dayjs: []) => void
}

export const FormTravelModal: FC<P> = ({
  visible,
  onSaveTravel,
  onCancelTravel,
  onAddCountry,
  onAddDateRange,
}) => {
  const onOk = () => {
    onSaveTravel?.()
  }
  const onCancel = () => {
    onCancelTravel?.()
  }
  const handleSelectCountry = (value) => {
    onAddCountry?.(value)
  }
  const handleSelectDateRange = (dates, dateStrings) => {
    onAddDateRange?.(dates)
  }
  return (
    <div>
      <BasicModal
        title="Travel"
        visible={visible}
        newButtonText="Add"
        width="30%"
        onCancel={onCancel}
        onOk={onOk}
      >
        <div className={styles.formTravelModalCountry}>
          <Select onChange={handleSelectCountry} size={'middle'}>
            {countryMenu.map((country, index) => (
              <Select.Option key={index} value={country.code}>
                <img
                  alt={country.label}
                  src={country.logo}
                  style={{ width: '18px', marginBottom: '2px' }}
                />{' '}
                {country.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={styles.formTravelModalDuration}>
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            onChange={handleSelectDateRange}
            format={'ll'}
          />
        </div>
      </BasicModal>
    </div>
  )
}

export default FormTravelModal
