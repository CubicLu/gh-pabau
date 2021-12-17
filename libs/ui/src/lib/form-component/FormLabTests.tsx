import { CloseOutlined } from '@ant-design/icons'
import { OptionType, InvProductsListItem } from '@pabau/ui'
import { Select } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import styles from './FormComponent.module.less'

const { Option } = Select
interface P {
  title: string
  desc: string
  required: boolean
  invProductsListItems?: InvProductsListItem[]
  onChangeArrValue?: (value: string[]) => void
  value?: string[]
}

const FormLabTests: FC<P> = ({
  title = '',
  desc = '',
  required = false,
  onChangeArrValue,
  invProductsListItems = [],
  value,
}) => {
  const [addedItems, setAddedItems] = useState<OptionType[]>([])
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const [labTestsList, setLabTestsList] = useState<InvProductsListItem[]>([])

  useEffect(() => {
    if (invProductsListItems.length > 0) {
      setLabTestsList(invProductsListItems)
    }
  }, [invProductsListItems])

  useEffect(() => {
    if (value?.length) {
      const selected = value?.map((val) => {
        const item = invProductsListItems?.find((el) => el?.id === Number(val))
        return {
          id: item?.id,
          name: item?.name,
          editing: false,
        }
      }) as OptionType[]
      setAddedItems(selected)
    } else {
      setAddedItems([])
    }
  }, [invProductsListItems, value])

  const onChange = (value) => {
    const item = labTestsList?.find((el) => el?.id === value)
    const cAddedItems = [...addedItems]
    const addedItemIndex = cAddedItems.findIndex((item) => item.id === value)
    if (addedItemIndex !== -1) {
      cAddedItems?.splice(addedItemIndex, 1)
    } else {
      cAddedItems.push({
        editing: false,
        id: item?.id || 0,
        name: item?.name || '',
      })
    }
    const ids = cAddedItems.map((item) => item?.id?.toString())
    onChangeArrValue?.(ids)
    setSelectedItem(0)
    setAddedItems(cAddedItems)
  }

  const handleDelete = (index) => {
    const tempItems = [...addedItems]
    tempItems.splice(index, 1)
    setAddedItems(tempItems)
    const ids = tempItems.map((item) => item?.id?.toString())
    onChangeArrValue?.(ids)
  }

  return (
    <div className={`${styles.formLabTests} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentChoiceDescription}>{desc}</div>
      )}
      {labTestsList.length > 0 && (
        <div className={styles.formLabTestsOptions}>
          <Select
            showSearch
            size="large"
            onChange={onChange}
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA?.children
                .toLowerCase()
                .localeCompare(optionB?.children.toLowerCase())
            }
            style={{ width: '100%', marginTop: '10px' }}
            value={selectedItem}
          >
            <Option value={0} key={0}>
              Select lab tests to order
            </Option>
            {labTestsList.map((item, index) => (
              <Option key={'labTestsListItems-' + index} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
      {addedItems?.length > 0 && (
        <div className={styles.formDropDownAddedOptions}>
          {addedItems.map(
            (item, index) =>
              item && (
                <div className={styles.formDropDownAddedOption} key={index}>
                  {item.name}
                  <div
                    className={styles.formDropDownAddedOptionDelete}
                    onClick={() => handleDelete(index)}
                  >
                    <CloseOutlined />
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default FormLabTests
