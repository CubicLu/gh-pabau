import { PlusCircleOutlined } from '@ant-design/icons'
import { OptionType } from '@pabau/ui'
import { Table } from 'antd'
import { Dayjs } from 'dayjs'
import React, { FC, useState } from 'react'
import { countryMenu } from '../../assets/images/lang-logos'
import styles from './FormComponent.module.less'
import FormTravelModal from './FormTravelModal'

interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  required: boolean
  onChangeArrValue?: (value: string[]) => void
}

interface countryInfo {
  countryName: string
  countryLogo: string
}

interface travelType {
  key: number
  countryInfo: countryInfo
  dateRange: string
  duration: number
}

export const FormTravel: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  onChangeArrValue,
}) => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [travelItems, setTraveItems] = useState<travelType[]>([])

  const [addCountry, setAddCountry] = useState('')
  const [addDateRange, setAddDateRange] = useState<Dayjs[]>([])

  const onSaveTravel = () => {
    const addedCountry = countryMenu.filter((item) => item.code === addCountry)
    if (addedCountry.length > 0 && addDateRange.length > 1) {
      const duration = addDateRange[1].diff(addDateRange[0], 'days')
      const dateRange =
        addDateRange[0].format('ll') + ' - ' + addDateRange[1].format('ll')
      const tempItems = [
        ...travelItems,
        {
          key: travelItems.length,
          countryInfo: {
            countryName: addedCountry[0].label,
            countryLogo: addedCountry[0].logo,
          },
          dateRange: dateRange,
          duration: duration,
        },
      ]
      setTraveItems(tempItems)
      const ids = tempItems.map((item) => item.key.toString())
      onChangeArrValue?.(ids)
    }

    setVisibleModal(false)
  }
  const onCancelTravel = () => {
    setVisibleModal(false)
    setAddCountry('')
    setAddDateRange([])
  }

  const onAddCountry = (countryCode) => {
    setAddCountry(countryCode)
  }
  const onAddDateRange = (dateRange) => {
    setAddDateRange(dateRange)
  }

  const renderCountry = (countryInfo: countryInfo) => {
    return (
      <div>
        <img
          alt={countryInfo.countryName}
          src={countryInfo.countryLogo}
          style={{ width: '18px', marginBottom: '2px' }}
        />{' '}
        <span>{countryInfo.countryName}</span>
      </div>
    )
  }

  const columns = [
    {
      title: 'Country',
      dataIndex: 'countryInfo',
      key: 'countryInfo',
      render: (countryInfo) => renderCountry(countryInfo),
    },
    {
      title: 'Date',
      dataIndex: 'dateRange',
      key: 'dateRange',
    },
    {
      title: 'Duration (days)',
      dataIndex: 'duration',
      key: 'duration',
    },
  ]

  return (
    <>
      <div className={`${styles.formTravel} ${styles.formComponet}`}>
        {title.length > 0 && (
          <div className={styles.formComponentTitle}>
            {title}
            {required && <span className={styles.formRequiredMark}>*</span>}
          </div>
        )}
        {desc.length > 0 && (
          <div className={styles.formComponentChoiceDescription}>{desc}</div>
        )}
        <div className={styles.formTravelOptions}>
          <Table
            dataSource={travelItems}
            columns={columns}
            pagination={false}
          />
        </div>
        <div
          className={styles.formTravelOptionsAdd}
          onClick={() => setVisibleModal(true)}
        >
          <PlusCircleOutlined /> <span>Add country</span>
        </div>
      </div>
      {visibleModal === true && (
        <FormTravelModal
          visible={visibleModal}
          onSaveTravel={onSaveTravel}
          onCancelTravel={onCancelTravel}
          onAddCountry={onAddCountry}
          onAddDateRange={onAddDateRange}
        />
      )}
    </>
  )
}

export default FormTravel
