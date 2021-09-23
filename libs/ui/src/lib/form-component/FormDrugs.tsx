import { DeleteOutlined } from '@ant-design/icons'
import { OptionType } from '@pabau/ui'
import { Button, Input, Select } from 'antd'
import cn from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '@react-hook/debounce'
import sampleLogo from '../../assets/images/form_component_drugs_log_sample.svg'
import styles from './FormComponent.module.less'

const { Option } = Select

interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  dataLists?: OptionType[]
  required: boolean
  onChangeArrValue?: (value: string[]) => void
}

interface IDosageData {
  populationType: string
  text: string
}

interface DrugsType {
  id: string
  name: string
  dosage: string
  quantity: string
  dosageOptions: IDosageData[]
  quantityOptions: string[]
}

interface IDrugsData {
  id: string
  name: string
  dosage: IDosageData[]
  quantities: string[]
}

const dataLists = [
  {
    id: '5ca1cfadfb3775ad3d1de00c',
    name: 'Valbenazine-1',
    dosage: [
      {
        populationType: 'adults',
        text: 'adults adults adults - 1',
      },
      {
        populationType: 'children',
        text: 'children children children - 1',
      },
    ],
    quantities: ['500mg tab, 32', '1000mg tab, 32'],
  },
  {
    id: '5ca1cfadfb3775ad3d1de01c',
    name: 'Valbenazine-2',
    dosage: [
      {
        populationType: 'adults',
        text: 'adults adults adults - 2',
      },
      {
        populationType: 'children',
        text: 'children children children - 2',
      },
    ],
    quantities: ['1500mg tab, 32', '11000mg tab, 32'],
  },
  {
    id: '5ca1cfadfb3775ad3d1de02c',
    name: 'Valbenazine-3',
    dosage: [
      {
        populationType: 'adults',
        text: 'adults adults adults - 3',
      },
      {
        populationType: 'children',
        text: 'children children children - 3',
      },
    ],
    quantities: ['2500mg tab, 32', '21000mg tab, 32'],
  },
]

const dosageTooltip = '1.2–1.8 g daily in divided doses; max 2.4 g daily'
const commentTooltip = '100mg/5ml sugar-free oral susp, 100ml'

export const FormDrugs: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  onChangeArrValue,
}) => {
  const [items, setItems] = useState<DrugsType[]>([])
  const [selItemId, setSelItemId] = useState('')
  const [editStatusDosage, setEditStatusDosage] = useState(false)
  const [editStatusQuantity, setEditStatusQuantity] = useState(false)
  const [showDosageTooltip, setShowDosageTooltip] = useState(false)
  const [showQuantityTooltip, setShowQuantityTooltip] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [drugsAPIList, setDrugsAPIList] = useState<IDrugsData[]>([])
  const [drugsSearchTerms, setDrugsSearchTerms] = useDebounce('', 1000)
  const { t } = useTranslation('common')

  useEffect(() => {
    const drugsAPICall = async (drugsSearchTerms) => {
      const searchVal = drugsSearchTerms.trim()
      if (searchVal !== '') {
        try {
          setDrugsAPIList(dataLists)
        } catch (error) {
          console.log(error)
        }
      }
    }
    drugsAPICall(drugsSearchTerms)
  }, [drugsSearchTerms])

  useEffect(() => {
    // let drugItems: DrugsType[] = []
    // drugItems = Object.entries(paramItems).map(([key, value]) => ({
    //   id: value.id,
    //   name: value.name,
    //   dosage: '',
    //   comment: '',
    //   dosageTooltip: dosageTooltip,
    //   commentTooltip: commentTooltip,
    // }))
    // setItems(drugItems)
  }, [paramItems])

  function refreshDrugs() {
    setEditStatusDosage(false)
    console.log('StatusQuantity1=false')
    setEditStatusQuantity(false)
    setShowDosageTooltip(false)
    setShowQuantityTooltip(false)
    setSelItemId('')
  }

  const onDrugsBlur = () => {
    setEditStatusDosage(false)
    console.log('StatusQuantity2=false')
    setEditStatusQuantity(false)
  }

  const onDrugsChange = (id, value) => {
    const index = items.findIndex((item) => item.id === id)
    const tempItems = [...items]
    const itemValue = {
      ...items[index],
      ...value,
    }
    tempItems.splice(index, 1, itemValue)
    setItems(tempItems)
  }

  const onSelectDosageItem = (id) => {
    setSelItemId(id)
    console.log('StatusQuantity3=false')
    setEditStatusQuantity(false)
    setShowQuantityTooltip(false)
    setEditStatusDosage(true)
    setShowDosageTooltip(true)
  }

  const onSelectQuantityItem = (e, id) => {
    if (e) e.stopPropagation()
    console.log('id =', id)
    setSelItemId(id)
    setEditStatusDosage(false)
    setShowDosageTooltip(false)
    console.log('StatusQuantity4=true')
    setEditStatusQuantity(true)
    setShowQuantityTooltip(true)
  }

  const onDeleteItem = (id) => {
    const index = items.findIndex((item) => item.id === id)
    const tempItems = [...items]
    tempItems.splice(index, 1)
    setItems(tempItems)
    const ids = tempItems.map((item) => item.id.toString())
    onChangeArrValue?.(ids)
  }

  const onKeyUp = (event) => {
    if (event.charCode === 13) {
      console.log('refreshDrugs1')
      refreshDrugs()
    }
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

  const onAddDosage = (id, value) => {
    onDrugsChange(id, { dosage: value })
    console.log('refreshDrugs2')
    refreshDrugs()
    onSelectQuantityItem(null, id)
  }

  const onAddQuantity = (id, value) => {
    onDrugsChange(id, { quantity: value })
    console.log('refreshDrugs3')
    refreshDrugs()
  }

  // const onRefreshDrugs = () => {
  //   console.log('refreshDrugs4')
  //   refreshDrugs()
  // }

  const onHandleSearch = (value) => {
    console.log('onHandleSearch', value)
    setDrugsSearchTerms(value)
  }

  const onHandleChange = (value) => {
    const addedData = items.filter((item) => item.id === value)
    if (addedData.length === 0) {
      const selData = drugsAPIList.filter((data) => data.id === value)
      if (selData.length > 0) {
        const tempItems = [
          ...items,
          {
            id: selData[0].id,
            name: selData[0].name,
            dosage: '',
            quantity: '',
            dosageOptions: selData[0].dosage,
            quantityOptions: selData[0].quantities,
          },
        ]
        setItems(tempItems)
        onSelectDosageItem(value)
        const ids = tempItems.map((item) => item.id.toString())
        onChangeArrValue?.(ids)
      }
    }
    setSelectedItem('')
  }

  return (
    <div className={`${styles.formDrugs} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentChoiceDescription}>{desc}</div>
      )}
      <div className={styles.formDrugsOptions}>
        <Select
          showSearch={true}
          size="middle"
          // value={selectedItem}
          placeholder={t('ui.medicalformbuilder.form.drugs.placeholder')}
          style={{ width: '100%', marginTop: '10px' }}
          defaultActiveFirstOption={false}
          showArrow={true}
          // filterOption={false}
          onSearch={onHandleSearch}
          onChange={onHandleChange}
          notFoundContent={null}
          // onChange={onChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA?.children
              .toLowerCase()
              .localeCompare(optionB?.children.toLowerCase())
          }
        >
          {drugsAPIList.map((item, index) => (
            <Option key={'druglist-' + item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
        <div className={styles.formDrugsOptionsContent}>
          <div className={styles.formDrugsOptionsHeader}>
            <div className={styles.formDrugsOptionsName}>
              {t('ui.medicalformbuilder.form.drugs.name')}
            </div>
            <div className={styles.formDrugsOptionsDosage}>
              {t('ui.medicalformbuilder.form.drugs.dosage')}
            </div>
            <div className={styles.formDrugsOptionsComment}>
              {t('ui.medicalformbuilder.form.drugs.comments')}
            </div>
          </div>
          <div className={styles.formDrugsOptionsBody}>
            {items.map((item, index) => (
              <div key={'drugs-' + item.id}>
                <div className={styles.formDrugsOptionsItem}>
                  <div
                    className={styles.formDrugsOptionsItemArea}
                    onClick={() => onSelectDosageItem(item.id)}
                  >
                    <div className={styles.formDrugsOptionsName}>
                      {item.name}
                    </div>
                    <div
                      className={cn(
                        styles.formDrugsOptionsDosage,
                        item.dosage === '' ? styles.height100 : ''
                      )}
                    >
                      {selItemId === item.id && editStatusDosage ? (
                        <Input
                          autoFocus
                          placeholder={t(
                            'ui.medicalformbuilder.form.drugs.dosage.placeholder'
                          )}
                          value={item.dosage}
                          onChange={(e) =>
                            onDrugsChange(item.id, { dosage: e.target.value })
                          }
                          onBlur={onDrugsBlur}
                          onKeyPress={(e) => onKeyUp(e)}
                        />
                      ) : (
                        <>
                          {item.dosage}
                          <Button onClick={() => onSelectDosageItem(item.id)}>
                            {t('ui.medicalformbuilder.form.edit')}
                          </Button>
                        </>
                      )}
                    </div>
                    <div
                      className={cn(
                        styles.formDrugsOptionsComment,
                        item.quantity === '' ? styles.height100 : ''
                      )}
                    >
                      {selItemId === item.id && editStatusQuantity ? (
                        <Input
                          autoFocus
                          placeholder={t(
                            'ui.medicalformbuilder.form.drugs.dosage.placeholder'
                          )}
                          value={item.quantity}
                          onChange={(e) =>
                            onDrugsChange(item.id, { quantity: e.target.value })
                          }
                          onBlur={onDrugsBlur}
                          onKeyPress={(e) => onKeyUp(e)}
                        />
                      ) : (
                        <>
                          {item.quantity}
                          <Button
                            onClick={(e) => onSelectQuantityItem(e, item.id)}
                          >
                            {t('ui.medicalformbuilder.form.edit')}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={styles.formDrugsOptionsItemAction}
                    onClick={() => onDeleteItem(item.id)}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
                <div
                  // onClick={() => onRefreshDrugs()}
                  className={cn(
                    styles.formDrugsOptionsItemTooltip,
                    selItemId === item.id &&
                      (showDosageTooltip || showQuantityTooltip)
                      ? ''
                      : styles.hide
                  )}
                >
                  {showDosageTooltip && (
                    <>
                      <div>{'Adults'}</div>
                      {item.dosageOptions
                        .filter((dosage) => dosage.populationType === 'adults')
                        .map((dosage, index) => (
                          <div
                            key={item.id + '-adults-' + index}
                            className={styles.formDrugsOptionsItemTooltipItem}
                            onClick={() => onAddDosage(item.id, dosage.text)}
                          >
                            {dosage.text}
                          </div>
                        ))}
                      <div>{'Children'}</div>
                      {item.dosageOptions
                        .filter(
                          (dosage) => dosage.populationType === 'children'
                        )
                        .map((dosage, index) => (
                          <div
                            key={item.id + '-children-' + index}
                            className={styles.formDrugsOptionsItemTooltipItem}
                            onClick={() => onAddDosage(item.id, dosage.text)}
                          >
                            {dosage.text}
                          </div>
                        ))}
                    </>
                  )}
                  {showQuantityTooltip && (
                    <>
                      {item.quantityOptions.map((quantity, index) => (
                        <div
                          key={item.id + '-quantity-' + index}
                          className={styles.formDrugsOptionsItemTooltipItem}
                          onClick={() => onAddQuantity(item.id, quantity)}
                        >
                          {quantity}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormDrugs
