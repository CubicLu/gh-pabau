import React, { FC, ReactNode, useState } from 'react'
import { Input, Popover } from 'antd'
import { CheckOutlined, TagFilled, TagOutlined } from '@ant-design/icons'
import {
  ColorPicker,
  Notification,
  NotificationType,
  Button,
  CustomIcon,
} from '@pabau/ui'
import { AddLabelMutation, Exact } from '@pabau/graphql'
import styles from '../../pages/clients/clients.module.less'
import { Labels } from '../../pages/clients'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { differenceBy } from 'lodash'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'

interface CreateLabelsProps {
  children?: ReactNode
  labels?: Labels[]
  setLabels?: (val: Labels[]) => void
  selectedLabels?: Labels[]
  setSelectedLabels?: (val: Labels[]) => void
  fromHeader?: boolean
  defaultSelectedLabels?: Labels[]
  setDefaultSelectedLabels?: (val: Labels[]) => void
  handleApplyLabel?: (val) => void
  labelsList?: any
  selectedRowKeys?: any
  setLabelsList?: (val) => void
  sourceData?: any
  insertContactsLabelsMutaton?: (val) => void
  contactsLabels?: any
  addLabelMutation?: (
    options?: MutationFunctionOptions<
      AddLabelMutation,
      Exact<{ name?: string; color?: string }>
    >
  ) => Promise<
    FetchResult<AddLabelMutation, Record<any, any>, Record<any, any>>
  >
}

const customColorData = [
  '#f45ec5',
  '#f32288',
  '#b23651',
  '#7b5345',
  '#f46514',
  '#faca00',
  '#c8b533',
  '#a3d200',
  '#2a7e4b',
  '#619dff',
  '#77ccff',
  '#744fd4',
  '#808080',
  '#333333',
  '#f57670',
  '#f3a3f2',
  '#f8aeab',
  '#793d8c',
  '#9cadbe',
  '#70a1bf',
  '#2a5193',
  '#66ccc7',
  '#555ce3',
  '#3d1d97',
  '#543e3d',
  '#bbaafc',
  '#3978e9',
  '#abbfea',
  '#d176b0',
  '#9d99ba',
  '#ab9678',
  '#bce9fa',
  '#b8816b',
  '#255a64',
]

export const CreateLabels: FC<CreateLabelsProps> = ({
  children,
  labels,
  setLabels,
  selectedLabels,
  setSelectedLabels,
  fromHeader = false,
  defaultSelectedLabels = [],
  handleApplyLabel,
  labelsList,
  selectedRowKeys,
  setLabelsList,
  sourceData,
  addLabelMutation,
  insertContactsLabelsMutaton,
  contactsLabels,
  setDefaultSelectedLabels,
}) => {
  const { t } = useTranslationI18()
  const [visible, setVisible] = useState(false)

  const [newLabel, setNewLabel] = useState({
    text: '',
    color: '',
    count: 0,
  })
  const [selectedColor, setSelectedColor] = useState('')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState<number>()
  const [selectedEditData, setSelectedEditData] = useState({
    text: '',
    color: '',
    count: 0,
  })

  const editLabelData = (valueObject) => {
    const labelData = [...labelsList]
    const labelIndex = labelData.findIndex(
      (label) => label.text === selectedEditData.text
    )
    labelIndex !== -1 && labelData.splice(labelIndex, 1, valueObject)
    const selectedLabelData = [...selectedLabels]
    const selectedLabelIndex = selectedLabelData.findIndex(
      (label) => label.text === selectedEditData.text
    )
    selectedLabelIndex !== -1 &&
      selectedLabelData.splice(selectedLabelIndex, 1, valueObject)
    const index = labelData.findIndex(
      (label) => label.text === valueObject.text
    )
    if (index === -1 || index === editIndex) {
      setLabelsList([...labelData])
      setSelectedLabels([...selectedLabelData])
      fromHeader && handleApplyLabel([...selectedLabelData])
    } else {
      Notification(
        NotificationType.error,
        t('clients.content.button.sameLabelExist')
      )
    }

    setIsEdit(false)
  }

  const addLabelData = (valueObject) => {
    if (!labelsList?.some((item) => item.text === valueObject.text)) {
      setSelectedLabels([...selectedLabels, valueObject])
      fromHeader && handleApplyLabel([...selectedLabels, valueObject])
      addLabelMutation({
        variables: {
          name: newLabel.text,
          color: selectedColor,
        },
      })
    } else {
      Notification(
        NotificationType.error,
        t('clients.content.button.sameLabelExist')
      )
    }
  }

  const handleKeyPress = (e) => {
    const {
      target: { value },
      key,
    } = e
    if (key === 'Enter' && value) {
      if (isEdit) {
        editLabelData({ text: value, color: selectedColor, count: 0 })
      } else {
        addLabelData({ text: value, color: selectedColor, count: 0 })
      }
      setNewLabel({ text: '', color: '', count: 0 })
      setVisible(false)
      setDisplayColorPicker(false)
      setSelectedColor('')
    }
  }

  const handleVisible = (value) => {
    if (isEdit) {
      editLabelData({ text: newLabel.text, color: selectedColor, count: 0 })
    } else if (!value && newLabel.text) {
      addLabelData({ text: newLabel.text, color: selectedColor, count: 0 })
    }
    setNewLabel({ text: '', color: '', count: 0 })
    setVisible(value)
    setDisplayColorPicker(false)
    setSelectedColor('')
    setIsEdit(false)
  }

  const handleSelect = (label, index) => {
    const selectedData = [...selectedLabels]
    if (selectedData.some((item) => item.text === label.text)) {
      const selectedIndex = selectedLabels?.findIndex(
        (selectedLabel) => selectedLabel.text === labelsList[index].text
      )
      selectedIndex !== -1 && selectedData.splice(selectedIndex, 1)
      setSelectedLabels(selectedData)
    } else {
      selectedData.push(label)
      setSelectedLabels(selectedData)
    }
  }

  const handleDropletClick = (e, label, index) => {
    e.stopPropagation()
    setDisplayColorPicker(true)
    setNewLabel(label)
    setIsEdit(true)
    setSelectedEditData(label)
    setSelectedColor(label.color)
    setEditIndex(index)
  }

  const sameAsDefault = () => {
    if (selectedLabels.length !== defaultSelectedLabels.length) {
      return false
    }
    const diff1 =
      differenceBy(
        selectedLabels,
        defaultSelectedLabels,
        (obj: Record<string, string>) => {
          return obj.label + obj.color
        }
      ) || []
    const diff2 =
      differenceBy(
        defaultSelectedLabels,
        selectedLabels,
        (obj: Record<string, string>) => {
          return obj.label + obj.color
        }
      ) || []
    return diff1.length === 0 && diff2.length === 0
  }

  // TO DO onApplyLabel
  const onApplyLabel = () => {
    handleApplyLabel(selectedLabels)
    setVisible(false)
  }

  const content = () => {
    return (
      <div>
        <div className={styles.scrollerTag}>
          {labelsList?.map((label, index) => {
            return (
              <div key={`m-${label.id}`}>
                {label?.text && (
                  <span
                    style={{ display: 'flex', flexDirection: 'row' }}
                    key={`s-${label.id}`}
                    onClick={() => handleSelect(label, index)}
                    className={styles.tagWrap}
                  >
                    <div className={styles.tagLayout} key={`d-${label.id}`}>
                      {label.color ? (
                        <TagFilled
                          style={{ color: label.color }}
                          key={`t-${label.id}`}
                        />
                      ) : (
                        <TagOutlined key={`t1-${label.id}`} />
                      )}
                      <div
                        className={styles.dropLayout}
                        style={{ backgroundColor: label.color }}
                        key={`d1-${label.id}`}
                        onClick={(e) => handleDropletClick(e, label, label.id)}
                      >
                        <CustomIcon name={'droplet'} key={`c-${label.id}`} />
                      </div>
                    </div>
                    <div className={styles.tagName} key={`d3-${label.id}`}>
                      {label.text}
                    </div>
                    {selectedLabels.some(
                      (item) => (item.text || item.label) === label.text
                    ) && <CheckOutlined />}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        {!fromHeader || sameAsDefault() ? (
          <div
            onMouseMove={() => setDisplayColorPicker(true)}
            onMouseLeave={() => setDisplayColorPicker(false)}
          >
            <div className={styles.inputLine}>
              {selectedColor ? (
                <TagFilled style={{ color: selectedColor }} />
              ) : (
                <TagOutlined />
              )}
              <Input
                autoComplete={'off'}
                size="middle"
                name={'label'}
                value={newLabel?.text}
                onChange={(e) =>
                  setNewLabel({
                    text: e.target.value,
                    color: selectedColor,
                    count: 0,
                  })
                }
                onKeyDown={handleKeyPress}
                placeholder={t('clients.content.button.newLabel')}
              />
            </div>
            {displayColorPicker && (
              <div className={styles.tagCustomWrap}>
                <ColorPicker
                  className={styles.tagColorPicker}
                  heading=""
                  onSelected={(val) => setSelectedColor(val)}
                  selectedColor={selectedColor}
                  isRoundColorPicker={true}
                  customColorData={customColorData}
                />
              </div>
            )}
          </div>
        ) : (
          <Button className={styles.applyBtn} onClick={onApplyLabel}>
            {t('common-label-apply')}
          </Button>
        )}
      </div>
    )
  }

  return (
    <Popover
      visible={visible}
      content={content}
      title={t('clients.leftSidebar.addLabels')}
      trigger={'click'}
      placement={'bottom'}
      overlayClassName={styles.tagModal}
      onVisibleChange={handleVisible}
      overlay={children}
    >
      {children}
    </Popover>
  )
}

export default CreateLabels
