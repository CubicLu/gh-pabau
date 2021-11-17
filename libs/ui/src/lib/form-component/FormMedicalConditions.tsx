import { CloseOutlined } from '@ant-design/icons'
import { OptionType, MedicalConditionsListItem } from '@pabau/ui'
import { Select } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import styles from './FormComponent.module.less'

const { Option } = Select
interface P {
  title?: string
  desc?: string
  paramItems?: OptionType[]
  required?: boolean
  medicalConditionsListItems?: MedicalConditionsListItem[]
  onChangeArrValue?: (value: string[]) => void
}

const FormMedicalConditions: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  medicalConditionsListItems = [],
  onChangeArrValue,
}) => {
  const [addedItems, setaddedItems] = useState<OptionType[]>([])
  const [dataLists, setDataLists] = useState<OptionType[]>([])
  const [selectedItem, setSelectedItem] = useState(0)

  useEffect(() => {
    setDataLists(
      medicalConditionsListItems.map((medicalConditionsListItem) => {
        return {
          id: medicalConditionsListItem.id,
          name: medicalConditionsListItem.name,
          editing: false,
        }
      })
    )
  }, [medicalConditionsListItems])

  const onChange = (value) => {
    const addedItem = dataLists.filter((item) => item.id === value)
    if (addedItem.length > 0) {
      const tempItems = [...addedItems, addedItem[0]]
      setaddedItems(tempItems)
      const ids = tempItems.map((item) => item.id.toString())
      onChangeArrValue?.(ids)
    }
    setSelectedItem(0)
  }

  const handleDelete = (index) => {
    const tempItems = [...addedItems]
    tempItems.splice(index, 1)
    setaddedItems(tempItems)
    const ids = tempItems.map((item) => item.id.toString())
    onChangeArrValue?.(ids)
  }

  function onBlur() {
    console.log('blur')
  }

  function onFocus() {
    console.log('focus')
  }

  function onSearch(val) {
    console.log('search:', val)
  }

  return (
    <div className={`${styles.formMedicalConditions} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentChoiceDescription}>{desc}</div>
      )}
      {dataLists.length > 0 && (
        <div className={styles.formMedicalConditionsOptions}>
          <Select
            showSearch
            size="large"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
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
              Select medical conditions
            </Option>
            {dataLists.map((item, index) => (
              <Option key={index + 1} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
      {addedItems.length > 0 && (
        <div className={styles.formDropDownAddedOptions}>
          {addedItems.map((item, index) => (
            <div className={styles.formDropDownAddedOption} key={index}>
              {item.name}
              <div
                className={styles.formDropDownAddedOptionDelete}
                onClick={() => handleDelete(index)}
              >
                <CloseOutlined />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FormMedicalConditions
