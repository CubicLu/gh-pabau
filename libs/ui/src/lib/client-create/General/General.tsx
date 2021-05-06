import React, { FC, useState } from 'react'
import styles from '../ClientCreate.module.less'
import { InitialDetailsProps } from '../ClientCreate'
import { Form as AntForm, Input } from 'formik-antd'
import {
  SimpleDropdown,
  RadioGroup,
  Button,
  ColorPicker,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { DatePicker, Image, Select, Popover } from 'antd'
import { TagOutlined, CheckOutlined, TagFilled } from '@ant-design/icons'
import { ReactComponent as Droplet } from '../../../assets/images/droplet.svg'
import { useTranslation } from 'react-i18next'
import { languageMenu } from '@pabau/ui'

interface GeneralProps {
  values?: InitialDetailsProps
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number
  ): void
}

interface Label {
  label: string
  color?: string
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

export const General: FC<GeneralProps> = ({ setFieldValue, values }) => {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState(false)
  const [labels, setLabels] = useState<Label[]>([])
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([])
  const [newLabel, setNewLabel] = useState<Label>({ label: '', color: '' })
  const [selectedColor, setSelectedColor] = useState('')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState<number>()
  const [selectedEditData, setSelectedEditData] = useState<Label>({
    label: '',
    color: '',
  })

  const onClickLang = (index) => {
    setFieldValue('preferredLanguage', index)
  }

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
      setLabels([...labelData])
      setSelectedLabels([...selectedLabelData])
    } else {
      Notification(
        NotificationType.error,
        t('quickCreate.client.modal.general.addLabel.duplicateError')
      )
    }
    setIsEdit(false)
  }

  const addLabelData = (valueObject) => {
    if (!labels.some((item) => item.label === valueObject.label)) {
      setLabels([...labels, valueObject])
      setSelectedLabels([...selectedLabels, valueObject])
    } else {
      Notification(
        NotificationType.error,
        t('quickCreate.client.modal.general.addLabel.duplicateError')
      )
    }
  }

  const handleKeyPress = (e) => {
    const { value } = e.target
    if (e.key === 'Enter' && value) {
      if (isEdit) {
        editLabelData({ label: value, color: selectedColor })
      } else {
        addLabelData({ label: value, color: selectedColor })
      }
      setNewLabel({ label: '', color: '' })
      setVisible(false)
      setDisplayColorPicker(false)
      setSelectedColor('')
    }
  }

  const handleVisible = (value) => {
    if (isEdit) {
      editLabelData({ label: newLabel.label, color: selectedColor })
    } else if (!value && newLabel.label) {
      addLabelData({ label: newLabel.label, color: selectedColor })
    }
    setNewLabel({ label: '', color: '' })
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

  const content = () => {
    return (
      <div>
        <div className={styles.scrollerTag}>
          {labels.map((label, index) => {
            return (
              <span
                style={{ display: 'flex', flexDirection: 'row' }}
                key={index}
                onClick={() => handleSelect(label, index)}
                className={styles.tagWrap}
              >
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
                  <Droplet />
                </div>
                <div className={styles.tagName} key={index}>
                  {label.label}
                </div>
                {selectedLabels.some((item) => item.label === label.label) && (
                  <CheckOutlined />
                )}
              </span>
            )
          })}
        </div>
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
              size="middle"
              name={'label'}
              value={newLabel?.label}
              onChange={(e) =>
                setNewLabel({ label: e.target.value, color: selectedColor })
              }
              onKeyDown={handleKeyPress}
              placeholder={t('quickCreate.client.modal.general.newLabel')}
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
      </div>
    )
  }

  return (
    <div className={styles.generalDiv}>
      <div className={styles.generalHeaderTitle}>
        <h2>{t('quickCreate.client.modal.general')}</h2>
        <Popover
          visible={visible}
          content={content}
          title={t('quickCreate.client.modal.general.addLabels')}
          trigger={'click'}
          placement={'bottom'}
          overlayClassName={styles.tagModal}
          onVisibleChange={handleVisible}
        >
          <Button icon={<TagOutlined />}>
            {selectedLabels.length === 0
              ? t('quickCreate.client.modal.general.noLabel')
              : selectedLabels.length === 1
              ? selectedLabels[0].label
              : `${selectedLabels.length} ${t(
                  'quickCreate.client.modal.general.labels'
                )}`}
          </Button>
        </Popover>
      </div>

      <AntForm layout={'vertical'} requiredMark={false}>
        <div className={styles.salutationFirstDiv}>
          <AntForm.Item
            label={t('quickCreate.client.modal.general.salutation')}
            name={'salutation'}
          >
            <SimpleDropdown
              defaultValue={'Mr'}
              onSelected={(value) => setFieldValue('salutation', value)}
              dropdownItems={['Mr', 'Mrs.']}
            />
          </AntForm.Item>
          <div className={styles.firstName}>
            <AntForm.Item
              label={t('quickCreate.client.modal.general.firstName')}
              name={'firstName'}
            >
              <Input
                size="middle"
                name={'firstName'}
                placeholder={t(
                  'quickCreate.client.modal.general.firstName.placeHolder'
                )}
              />
            </AntForm.Item>
          </div>
          <div className={styles.lastName}>
            <AntForm.Item
              label={t('quickCreate.client.modal.general.lastName')}
              name={'lastName'}
            >
              <Input
                size="middle"
                name={'lastName'}
                placeholder={t(
                  'quickCreate.client.modal.general.lastName.placeHolder'
                )}
              />
            </AntForm.Item>
          </div>
        </div>
        <AntForm.Item
          className={styles.customCommon}
          label={t('quickCreate.client.modal.general.gender')}
          name={'gender'}
        >
          <RadioGroup
            size={'small'}
            name={'gender'}
            value={values?.gender || ''}
            radioItems={[
              t('quickCreate.client.modal.general.gender.other'),
              t('quickCreate.client.modal.general.gender.male'),
              t('quickCreate.client.modal.general.gender.female'),
            ]}
          />
        </AntForm.Item>
        <AntForm.Item
          className={styles.customCommon}
          label={t('quickCreate.client.modal.general.hearOption.label')}
          name={'hearOption'}
        >
          <SimpleDropdown
            name={'hearOption'}
            defaultValue={t(
              'quickCreate.client.modal.general.hearOption.selectOption'
            )}
            onSelected={(value) => setFieldValue('hearOption', value)}
            dropdownItems={[
              t('quickCreate.client.modal.general.hearOption.selectOption'),
              t('quickCreate.client.modal.general.hearOption.anythingHere'),
            ]}
          />
        </AntForm.Item>
        <AntForm.Item
          className={styles.customCommon}
          label={t('quickCreate.client.modal.general.date')}
          name={'dateOfBirth'}
        >
          <DatePicker
            onChange={(date, dateString) =>
              setFieldValue('dateOfBirth', dateString)
            }
            name={'dateOfBirth'}
            format={'DD/MM/YY'}
            placeholder={'DD/MM/YY'}
          />
        </AntForm.Item>
        <AntForm.Item
          className={styles.customCommon}
          label={t('quickCreate.client.modal.general.preferredLanguage')}
          name={'preferredLanguage'}
        >
          <Select
            dropdownClassName={styles.generalDropdown}
            size={'middle'}
            defaultValue={t(
              'quickCreate.client.modal.general.preferredLanguage.default'
            )}
            onSelect={(value) => onClickLang(value)}
          >
            {languageMenu.map((item, index) => (
              <Select.Option key={index} value={item.label}>
                <div key={item.label} className={styles.languageItem}>
                  <div className={styles.languageLeft}>
                    <Image
                      src={item.logo}
                      width={18}
                      alt={item.label}
                      preview={false}
                    />
                    <span className={styles.languageName}>{item.label}</span>
                  </div>
                </div>
              </Select.Option>
            ))}
          </Select>
        </AntForm.Item>
      </AntForm>
    </div>
  )
}

export default General
