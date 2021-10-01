import { CloseOutlined } from '@ant-design/icons'
import { OptionType, LabTestsListItem, InvProductsListItem } from '@pabau/ui'
import { Select } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import styles from './FormComponent.module.less'

const { Option } = Select
interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  required: boolean
  labTestsListItems?: LabTestsListItem[]
  invProductsListItems?: InvProductsListItem[]
  onChangeArrValue?: (value: string[]) => void
}

const dataLists = [
  {
    id: 1,
    name: 'DL7',
    editing: false,
  },
  {
    id: 2,
    name: 'V5 Vitamin',
    editing: false,
  },
]

const FormLabTests: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  onChangeArrValue,
  labTestsListItems = [],
  invProductsListItems = [],
}) => {
  const [addedItems, setaddedItems] = useState<OptionType[]>([])
  const [selectedItem, setSelectedItem] = useState(0)
  const [labTestsList, setLabTestsList] = useState<InvProductsListItem[]>([])

  useEffect(() => {
    console.log('labTestsListItems', labTestsListItems)
    console.log('invProductsListItems', invProductsListItems)
    if (labTestsListItems.length > 0 && invProductsListItems.length > 0) {
      const result1 = invProductsListItems.filter(function (
        invProductsListItem
      ) {
        return labTestsListItems.some(function (labTestsListItem) {
          return labTestsListItem.id === invProductsListItem.category_id
        })
      })
      console.log('result1', result1)
      const result = invProductsListItems.filter((o1) =>
        labTestsListItems.some((o2) => o1.category_id === o2.id)
      )
      console.log('result', result)
      setLabTestsList(result)
    }
  }, [labTestsListItems, invProductsListItems])

  const onChange = (value) => {
    const addedItem = labTestsList.filter((item) => item.id === value)
    if (addedItem.length > 0) {
      const t = {
        id: addedItem[0].id,
        name: addedItem[0].name,
        editing: false,
      }
      const tempItems = [...addedItems, t]
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

export default FormLabTests
