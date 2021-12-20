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
import { useTranslation } from 'react-i18next'
import { differenceBy } from 'lodash'
import styles from './CreateLabels.module.less'

interface Labels {
  label?: string
  count?: number
  color?: string
}

export interface CreateLabelsProps {
  children?: ReactNode
  labels?: Labels[]
  setLabels?: (val: Labels[]) => void
  selectedLabels?: Labels[]
  handleUpdateLabel?: (val: Labels[]) => void
  fromHeader?: boolean
  defaultSelectedLabels?: Labels[]
  setDefaultSelectedLabels?: (val: Labels[]) => void
  handleApplyLabel?: (val) => void
  clientIsAdmin?: boolean
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
  labels = [],
  setLabels,
  selectedLabels = [],
  handleUpdateLabel = (...args) => args,
  fromHeader = false,
  defaultSelectedLabels = [],
  handleApplyLabel,
  clientIsAdmin = true,
}) => {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState(false)
  const [newLabel, setNewLabel] = useState<Labels>({
    label: '',
    color: '',
    count: 0,
  })
  const [selectedColor, setSelectedColor] = useState('')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState<number>()
  const [selectedEditData, setSelectedEditData] = useState<Labels>({
    label: '',
    color: '',
    count: 0,
  })
  const editLabelData = (valueObject) => {
    const labelData = [...labels]
    const labelIndex = labelData.findIndex(
      (label) => label.label === selectedEditData.label
    )
    labelIndex !== -1 && labelData.splice(labelIndex, 1, valueObject)
    const selectedLabelData = [...selectedLabels]
    const selectedLabelIndex = selectedLabelData.findIndex(
      (label) => label.label === selectedEditData.label
    )
    selectedLabelIndex !== -1 &&
      selectedLabelData.splice(selectedLabelIndex, 1, valueObject)
    const index = labelData.findIndex(
      (label) => label.label === valueObject.label
    )
    if (index === -1 || index === editIndex) {
      setLabels?.([...labelData])
      handleUpdateLabel([...selectedLabelData])
      fromHeader && handleApplyLabel?.([...selectedLabelData])
    } else {
      Notification(
        NotificationType.error,
        t('clients.content.button.sameLabelExist')
      )
    }
    setIsEdit(false)
  }

  const addLabelData = (valueObject) => {
    if (!labels.some((item) => item.label === valueObject.label)) {
      setLabels?.([...labels, valueObject])
      handleUpdateLabel([...selectedLabels, valueObject])
      fromHeader && handleApplyLabel?.([...selectedLabels, valueObject])
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
        editLabelData({ label: value, color: selectedColor, count: 0 })
      } else {
        addLabelData({ label: value, color: selectedColor, count: 0 })
      }
      setNewLabel({ label: '', color: '', count: 0 })
      setVisible(false)
      setDisplayColorPicker(false)
      setSelectedColor('')
    }
  }

  const handleVisible = (value) => {
    if (isEdit) {
      editLabelData({ label: newLabel.label, color: selectedColor, count: 0 })
    } else if (!value && newLabel.label) {
      addLabelData({ label: newLabel.label, color: selectedColor, count: 0 })
    }
    setNewLabel({ label: '', color: '', count: 0 })
    setVisible(value)
    setDisplayColorPicker(false)
    setSelectedColor('')
    setIsEdit(false)
  }

  const handleSelect = (label, index) => {
    const selectedData = [...selectedLabels]
    if (selectedData.some((item) => item.label === label.label)) {
      const selectedIndex = selectedLabels.findIndex(
        (selectedLabel) => selectedLabel.label === labels[index].label
      )
      selectedIndex !== -1 && selectedData.splice(selectedIndex, 1)
      handleUpdateLabel(selectedData)
    } else {
      selectedData.push(label)
      handleUpdateLabel(selectedData)
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
    const diff1 = differenceBy(selectedLabels, defaultSelectedLabels) || []
    const diff2 = differenceBy(selectedLabels, defaultSelectedLabels) || []
    return diff1.length === 0 && diff2.length === 0
  }

  const onApplyLabel = () => {
    handleApplyLabel?.(selectedLabels)
    setVisible(false)
  }

  const content = () => {
    return (
      <div>
        <div className={styles.scrollerTag}>
          {labels.map((label, index) => {
            return (
              <div key={index}>
                {label?.label && (
                  <span
                    style={{ display: 'flex', flexDirection: 'row' }}
                    key={index}
                    onClick={() => handleSelect(label, index)}
                    className={styles.tagWrap}
                  >
                    <div className={styles.tagLayout}>
                      {label.color ? (
                        <TagFilled style={{ color: label.color }} />
                      ) : (
                        <TagOutlined />
                      )}
                      <div
                        className={styles.dropLayout}
                        style={{ backgroundColor: label.color }}
                        onClick={(e) => handleDropletClick(e, label, index)}
                      >
                        <CustomIcon name={'droplet'} />
                      </div>
                    </div>
                    <div className={styles.tagName}>{label.label}</div>
                    {selectedLabels.some(
                      (item) => item.label === label.label
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
            {clientIsAdmin && (
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
                  value={newLabel?.label}
                  onChange={(e) =>
                    setNewLabel({
                      label: e.target.value,
                      color: selectedColor,
                      count: 0,
                    })
                  }
                  onKeyDown={handleKeyPress}
                  placeholder={t('clients.content.button.newLabel')}
                />
              </div>
            )}
            {displayColorPicker && clientIsAdmin && (
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
