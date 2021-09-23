import { DeleteOutlined } from '@ant-design/icons'
import { OptionType } from '@pabau/ui'
import { Button, Input, Select } from 'antd'
import cn from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '@react-hook/debounce'
// import sampleLogo from '../../assets/images/form_component_drugs_log_sample.svg'
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

export const FormDrugs: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  onChangeArrValue,
}) => {
  const [items, setItems] = useState<DrugsType[]>([])
  const [selItemId, setSelItemId] = useState('')
  const [selectedDrugId, setSelectedDrugId] = useState('')
  const [editStatusDosage, setEditStatusDosage] = useState(false)
  const [editStatusQuantity, setEditStatusQuantity] = useState(false)
  const [showDosageTooltip, setShowDosageTooltip] = useState(false)
  const [showQuantityTooltip, setShowQuantityTooltip] = useState(false)
  const [loading, setLoading] = useState(false)
  const [drugsAPIList, setDrugsAPIList] = useState<IDrugsData[]>([])
  const [drugsSearchTerms, setDrugsSearchTerms] = useDebounce('', 1000)
  const { t } = useTranslation('common')

  useEffect(() => {
    const drugsAPICall = async (drugsSearchTerms) => {
      const searchVal = drugsSearchTerms.trim()
      if (searchVal !== '') {
        setLoading(true)
        try {
          const response = await fetch(
            'https://zhen.pabau.me/pages/ajax/drugs_api_2.php?drugName=' +
              searchVal,
            {
              method: 'GET',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
            }
          )
          const data = await response.json()
          if (data?.length > 0) {
            const drugLists = data?.map((item, index) => ({
              id: item.medicines._id,
              name: item.medicines.name,
              dosage: item.medicines.dosage ? item.medicines.dosage : [],
              quantities: item.medicines.quantities
                ? item.medicines.quantities
                : [],
            }))
            setDrugsAPIList(drugLists)
            setLoading(false)
          }
        } catch (error) {
          console.log(error)
          setLoading(false)
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
    setEditStatusQuantity(false)
    setShowDosageTooltip(false)
    setShowQuantityTooltip(false)
    setSelItemId('')
  }

  const onDrugsBlur = (e) => {
    if (e) e.stopPropagation()
    setShowDosageTooltip(false)
    setEditStatusDosage(false)
  }

  const onQuantityBlur = (e) => {
    if (e) e.stopPropagation()
    setShowQuantityTooltip(false)
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
    setEditStatusQuantity(false)
    setShowQuantityTooltip(false)
    setEditStatusDosage(true)
    setShowDosageTooltip(true)
  }

  const onSelectQuantityItem = (e, id) => {
    if (e) e.stopPropagation()
    setSelItemId(id)
    setEditStatusDosage(false)
    setShowDosageTooltip(false)
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
      refreshDrugs()
    }
  }

  const onAddDosage = (e, id, value) => {
    if (e) e.stopPropagation()
    onDrugsChange(id, { dosage: value })
    refreshDrugs()
    onSelectQuantityItem(null, id)
  }

  const onAddQuantity = (e, id, value) => {
    if (e) e.stopPropagation()
    onDrugsChange(id, { quantity: value })
    refreshDrugs()
  }

  const onHandleSearch = (value) => {
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
      setDrugsAPIList([])
      setSelectedDrugId('')
    }
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
          loading={loading}
          showSearch={true}
          size="middle"
          value={selectedDrugId}
          placeholder={t('ui.medicalformbuilder.form.drugs.placeholder')}
          style={{ width: '100%', marginTop: '10px' }}
          defaultActiveFirstOption={false}
          showArrow={true}
          onSearch={onHandleSearch}
          onChange={onHandleChange}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA?.children
              .toLowerCase()
              .localeCompare(optionB?.children.toLowerCase())
          }
        >
          <Option key={'druglist-empty'} value={''}>
            {t('ui.medicalformbuilder.form.drugs.placeholder')}
          </Option>
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
                  <div className={styles.formDrugsOptionsItemArea}>
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
                          placeholder={t(
                            'ui.medicalformbuilder.form.drugs.dosage.placeholder'
                          )}
                          value={item.dosage}
                          onChange={(e) =>
                            onDrugsChange(item.id, { dosage: e.target.value })
                          }
                          onBlur={(e) => onDrugsBlur(e)}
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
                          placeholder={t(
                            'ui.medicalformbuilder.form.drugs.dosage.placeholder'
                          )}
                          value={item.quantity}
                          onChange={(e) =>
                            onDrugsChange(item.id, { quantity: e.target.value })
                          }
                          onBlur={(e) => onQuantityBlur(e)}
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
                      <div className={styles.formDrugsOptionsItemTooltipTitle}>
                        {'Adults'}
                      </div>
                      {item.dosageOptions.filter(
                        (dosage) => dosage.populationType === 'adults'
                      ).length === 0 && (
                        <div
                          key={item.id + '-adults-' + index}
                          className={
                            styles.formDrugsOptionsItemTooltipItemEmpty
                          }
                        >
                          {'---'}
                        </div>
                      )}
                      {item.dosageOptions
                        .filter((dosage) => dosage.populationType === 'adults')
                        .map((dosage, index) => (
                          <div
                            key={item.id + '-adults-' + index}
                            className={styles.formDrugsOptionsItemTooltipItem}
                            onMouseDown={(e) =>
                              onAddDosage(e, item.id, dosage.text)
                            }
                          >
                            {dosage.text}
                          </div>
                        ))}
                      <div className={styles.formDrugsOptionsItemTooltipTitle}>
                        {'Children'}
                      </div>
                      {item.dosageOptions.filter(
                        (dosage) => dosage.populationType === 'children'
                      ).length === 0 && (
                        <div
                          key={item.id + '-adults-' + index}
                          className={
                            styles.formDrugsOptionsItemTooltipItemEmpty
                          }
                        >
                          {'---'}
                        </div>
                      )}
                      {item.dosageOptions
                        .filter(
                          (dosage) => dosage.populationType === 'children'
                        )
                        .map((dosage, index) => (
                          <div
                            key={item.id + '-children-' + index}
                            className={styles.formDrugsOptionsItemTooltipItem}
                            onMouseDown={(e) =>
                              onAddDosage(e, item.id, dosage.text)
                            }
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
                          onMouseDown={(e) =>
                            onAddQuantity(e, item.id, quantity)
                          }
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
