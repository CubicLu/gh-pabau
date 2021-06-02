import { DeleteOutlined } from '@ant-design/icons'
import { OptionType } from '@pabau/ui'
import { Button, Input, Select } from 'antd'
import cn from 'classnames'
import React, { FC, useEffect, useState } from 'react'
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

interface DrugsType {
  id: number
  name: string
  dosage: string
  comment: string
  dosageTooltip: string
  commentTooltip: string
}

const dataLists = [
  {
    id: 1,
    name: 'Valbenazine-1',
  },
  {
    id: 2,
    name: 'Valbenazine-2',
  },
  {
    id: 3,
    name: 'Valbenazine-3',
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
  const [selItemId, setSelItemId] = useState(-1)
  const [editStatusDosage, setEditStatusDosage] = useState(false)
  const [editStatusComment, setEditStatusComment] = useState(false)
  const [showDosageTooltip, setShowDosageTooltip] = useState(false)
  const [showCommentTooltip, setShowCommentTooltip] = useState(false)
  const [selectedItem, setSelectedItem] = useState(0)

  useEffect(() => {
    let drugItems: DrugsType[] = []
    drugItems = Object.entries(paramItems).map(([key, value]) => ({
      id: value.id,
      name: value.name,
      dosage: '',
      comment: '',
      dosageTooltip: dosageTooltip,
      commentTooltip: commentTooltip,
    }))
    setItems(drugItems)
  }, [paramItems])

  function refreshDrugs() {
    setEditStatusDosage(false)
    setEditStatusComment(false)
    setShowDosageTooltip(false)
    setShowCommentTooltip(false)
    setSelItemId(-1)
  }

  const onDrugsBlur = () => {
    setEditStatusDosage(false)
    setEditStatusComment(false)
  }

  const onDrugsChange = (index, value) => {
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
    setEditStatusComment(false)
    setShowCommentTooltip(false)
    setEditStatusDosage(true)
    setShowDosageTooltip(true)
  }

  const onSelectCommentItem = (e, id) => {
    e.stopPropagation()
    setSelItemId(id)
    setEditStatusDosage(false)
    setShowDosageTooltip(false)
    setEditStatusComment(true)
    setShowCommentTooltip(true)
  }

  const onDeleteItem = (index) => {
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

  function onChange(value) {
    const selData = dataLists.filter((data) => data.id === value)
    if (selData.length > 0) {
      const tempItems = [
        ...items,
        {
          id: items.length,
          name: selData[0].name,
          dosage: '',
          comment: '',
          dosageTooltip: dosageTooltip,
          commentTooltip: commentTooltip,
        },
      ]
      setItems(tempItems)
      onSelectDosageItem(tempItems.length)
      const ids = tempItems.map((item) => item.id.toString())
      onChangeArrValue?.(ids)
    }
    setSelectedItem(0)
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

  const onAddDosage = (index, value) => {
    onDrugsChange(index, { dosage: value })
    refreshDrugs()
  }

  const onAddComment = (index, value) => {
    onDrugsChange(index, { comment: value })
    refreshDrugs()
  }

  const onRefreshDrugs = () => {
    refreshDrugs()
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
          showSearch
          size="middle"
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
            Type a medication you wish to prescribe
          </Option>
          {dataLists.map((item, index) => (
            <Option key={index + 1} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
        <div className={styles.formDrugsOptionsContent}>
          <div className={styles.formDrugsOptionsHeader}>
            <div className={styles.formDrugsOptionsName}>Name</div>
            <div className={styles.formDrugsOptionsDosage}>Dosage</div>
            <div className={styles.formDrugsOptionsComment}>Comments</div>
          </div>
          <div className={styles.formDrugsOptionsBody}>
            {items.map((item, index) => (
              <>
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
                      // onClick={() => onSelectDosageItem(item.id)}
                    >
                      {selItemId === item.id && editStatusDosage ? (
                        <Input
                          autoFocus
                          placeholder={'Enter dosage'}
                          value={item.dosage}
                          onChange={(e) =>
                            onDrugsChange(index, { dosage: e.target.value })
                          }
                          onBlur={onDrugsBlur}
                          onKeyPress={(e) => onKeyUp(e)}
                        />
                      ) : (
                        <>
                          {item.dosage}
                          <Button onClick={() => onSelectDosageItem(item.id)}>
                            edit
                          </Button>
                        </>
                      )}
                    </div>
                    <div
                      className={cn(
                        styles.formDrugsOptionsComment,
                        item.comment === '' ? styles.height100 : ''
                      )}
                    >
                      {selItemId === item.id && editStatusComment ? (
                        <Input
                          autoFocus
                          placeholder={'Enter comments'}
                          value={item.comment}
                          onChange={(e) =>
                            onDrugsChange(index, { comment: e.target.value })
                          }
                          onBlur={onDrugsBlur}
                          onKeyPress={(e) => onKeyUp(e)}
                        />
                      ) : (
                        <>
                          {item.comment}
                          <Button
                            onClick={(e) => onSelectCommentItem(e, item.id)}
                          >
                            edit
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={styles.formDrugsOptionsItemAction}
                    // className={cn(
                    //   styles.formDrugsOptionsItemAction,
                    //   selItemId === item.id &&
                    //     (editStatusComment || editStatusDosage)
                    //     ? styles.hide
                    //     : ''
                    // )}
                    onClick={() => onDeleteItem(index)}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
                <div
                  onClick={() => onRefreshDrugs()}
                  className={cn(
                    styles.formDrugsOptionsItemTooltip,
                    selItemId === item.id &&
                      (showDosageTooltip || showCommentTooltip)
                      ? ''
                      : styles.hide
                  )}
                >
                  {showDosageTooltip && (
                    <>
                      <div
                        className={styles.formDrugsOptionsItemTooltipItem}
                        onClick={() => onAddDosage(index, item.dosageTooltip)}
                      >
                        {item.dosageTooltip}
                      </div>
                      <img src={sampleLogo} alt="" />
                    </>
                  )}
                  {showCommentTooltip && (
                    <>
                      <div
                        className={styles.formDrugsOptionsItemTooltipItem}
                        onClick={() => onAddComment(index, item.commentTooltip)}
                      >
                        {item.commentTooltip}
                      </div>
                      <img src={sampleLogo} alt="" />
                    </>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormDrugs
