import React, { FC, useState } from 'react'
import Fade from 'react-reveal/Fade'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import classNames from 'classnames'
import { appointmentColors, addColors, get } from '../../../mocks/Services'
import { EditDataType, CreateServiceType } from '../CreateService'
import General from './General'
import styles from '../CreateService.module.less'

interface GeneralLayoutProps {
  values: CreateServiceType
  setFieldValue(
    field: keyof CreateServiceType,
    value: string | string[] | boolean | number
  ): void
}

const GeneralLayout: FC<GeneralLayoutProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslationI18()
  const { categories, durations } = get(t)
  const [showImageSelector, setShowImageSelector] = useState<boolean>(false)
  const [visibleColors, setVisibleColors] = useState<boolean>(false)

  const handleAddBundleItem = (
    val,
    bundleItems,
    bundleItemsAmount,
    bundleItemsDuration,
    bundleList,
    setFieldValue
  ) => {
    const data: EditDataType[] = [...bundleItems]
    const item = bundleList.find((item) => item.service_name === val)
    if (item) {
      data.push(item)
    }
    setFieldValue('bundleItems', data)
    if (item?.service_price) {
      const total =
        Number.parseInt(bundleItemsAmount) +
        Number.parseInt(item?.service_price)
      setFieldValue('bundleItemsAmount', total.toFixed(2))
    }
    if (item?.duration) {
      const bundleTime = bundleItemsDuration.split(':')
      const bundleHours = Number.parseInt(bundleTime[0])
      const bundleMinutes = Number.parseInt(bundleTime[1])
      const timeDuration = item?.duration.split(':')
      const hour = Number.parseInt(timeDuration[0])
      const min = Number.parseInt(timeDuration[1])
      let totalHours, totalMinutes
      totalHours = bundleHours + hour
      totalMinutes = bundleMinutes + min
      if (totalMinutes > 60) {
        totalHours += 1
        totalMinutes = totalMinutes % 60
      }
      setFieldValue('bundleItemsDuration', totalHours + ':' + totalMinutes)
    }
    setFieldValue(
      'bundleList',
      bundleList.filter((t) => t.id !== item?.id)
    )
  }

  const handleRemoveBundleItem = (
    index,
    bundleItems,
    bundleItemsAmount,
    bundleItemsDuration,
    bundleList,
    setFieldValue
  ) => {
    let data: EditDataType[] = [...bundleItems]
    const deletedItem = data[index]
    data.splice(index, 1)
    setFieldValue('bundleItems', data)
    data = [...bundleList]
    data.push(deletedItem)
    setFieldValue('bundleList', data)
    if (deletedItem?.service_price) {
      const total =
        Number.parseInt(bundleItemsAmount) -
        Number.parseInt(deletedItem?.service_price)
      setFieldValue('bundleItemsAmount', total.toFixed(2))
    }
    if (deletedItem?.duration) {
      const bundleTime = bundleItemsDuration.split(':')
      const bundleHours = Number.parseInt(bundleTime[0])
      const bundleMinutes = Number.parseInt(bundleTime[1])
      const timeDuration = deletedItem?.duration.split(':')
      const hour = Number.parseInt(timeDuration[0])
      const min = Number.parseInt(timeDuration[1])
      let totalHours, totalMinutes
      totalHours = bundleHours - hour
      totalMinutes = bundleMinutes - min
      if (totalMinutes < 0) {
        totalHours -= 1
        totalMinutes = 60 - Math.abs(totalMinutes)
      }
      setFieldValue('bundleItemsDuration', totalHours + ':' + totalMinutes)
    }
  }

  const addColorsContent = (setFieldValue, selectedColor) => (
    <div className={styles.customColorItemsBlock}>
      <div className={styles.customColorItems}>
        <Fade left>
          {addColors.map((color, index) => (
            <div
              key={index}
              style={
                index === 0
                  ? { animationDelay: '0s' }
                  : { animationDelay: `0.${index}s` }
              }
              className={
                color === selectedColor
                  ? classNames(
                      styles.customColorItem,
                      styles.customColorItemSelected
                    )
                  : styles.customColorItem
              }
              onClick={() => {
                appointmentColors.push(color)
                setFieldValue('apColors', appointmentColors)
                setFieldValue('color', color)
                setVisibleColors((val) => !val)
              }}
            >
              <div
                className={styles.colorBox}
                style={{
                  backgroundColor: color,
                }}
              />
            </div>
          ))}
        </Fade>
      </div>
    </div>
  )

  return (
    <General
      categories={categories}
      addColorsContent={addColorsContent}
      visibleColors={visibleColors}
      setVisibleColors={setVisibleColors}
      showImageSelector={showImageSelector}
      setShowImageSelector={setShowImageSelector}
      durations={durations}
      handleRemoveBundleItem={handleRemoveBundleItem}
      handleAddBundleItem={handleAddBundleItem}
      values={values}
      setFieldValue={setFieldValue}
    />
  )
}

export default GeneralLayout
