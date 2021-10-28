import React, { FC, useState } from 'react'
import styles from '../ClientCreate.module.less'
import {
  Form as AntForm,
  Input,
  Radio,
  Select,
  AutoComplete,
} from 'formik-antd'
import { Skeleton } from 'antd'
import {
  InitialDetailsProps,
  Button,
  ColorPicker,
  Notification,
  NotificationType,
  DatePicker,
  languageMenu,
  LabelDataProps,
  FieldSetting,
} from '@pabau/ui'
import { Image, Popover } from 'antd'
import { TagOutlined, CheckOutlined, TagFilled } from '@ant-design/icons'
import { ReactComponent as Droplet } from '../../../assets/images/droplet.svg'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import { CommonProps } from './index'
import className from 'classnames'

interface GeneralProps {
  values?: InitialDetailsProps
  setFieldValue(
    field: keyof InitialDetailsProps,
    values: string | string[] | boolean | number | Dayjs | null
  ): void
  salutationData?: CommonProps[]
  fieldsSettings?: FieldSetting[]
  marketingSources?: CommonProps[]
  labels: Label[]
  setLabels: (val: Label[]) => void
  selectedLabels: Label[]
  setSelectedLabels: (val: Label[]) => void
  isLoading?: boolean
  isMarketingSourceLoading?: boolean
  isSalutationLoading?: boolean
  labelsData: LabelDataProps[]
  requiredLabel: (name: string) => string
}

interface Label {
  id?: number
  label?: string
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

export const General: FC<GeneralProps> = ({
  setFieldValue,
  values,
  salutationData,
  fieldsSettings,
  marketingSources,
  labels,
  setLabels,
  selectedLabels,
  setSelectedLabels,
  isLoading = false,
  isMarketingSourceLoading = false,
  isSalutationLoading = false,
  labelsData,
  requiredLabel,
}) => {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState(false)
  const [newLabel, setNewLabel] = useState<Label>({ label: '', color: '' })
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState<number>()
  const [selectedEditData, setSelectedEditData] = useState<Label>({
    label: '',
    color: '',
  })
  const [isSpace, setIsSpace] = useState(false)

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
    const newValue = value.trim()
    if (e.key === 'Enter' && newValue) {
      if (isEdit) {
        editLabelData({ label: newValue, color: selectedColor })
      } else {
        if (selectedId) {
          addLabelData({
            id: selectedId,
            label: newValue,
            color: selectedColor,
          })
        } else {
          if (labelsData.some((item) => item.value === newValue)) {
            const data = labelsData.find((item) => item.value === newValue)
            addLabelData({
              id: data?.id,
              label: newValue,
              color: selectedColor,
            })
          } else {
            addLabelData({ label: newValue, color: selectedColor })
          }
        }
      }
      setNewLabel({ label: '', color: '' })
      setVisible(false)
      setDisplayColorPicker(false)
      setSelectedColor('')
      setSelectedId('')
    } else if (e.key === ' ') {
      setIsSpace(true)
    }
  }

  const handleVisible = (value) => {
    if (!isSpace) {
      if (isEdit) {
        editLabelData({ label: newLabel.label, color: selectedColor })
      } else if (!value && newLabel.label?.trim()) {
        const labelValue = newLabel.label?.trim()
        if (labelsData.some((item) => item.value === labelValue)) {
          const data = labelsData.find((item) => item.value === labelValue)
          addLabelData({
            id: data?.id,
            label: labelValue,
            color: selectedColor,
          })
        } else {
          addLabelData({ label: labelValue, color: selectedColor })
        }
      }
      setNewLabel({ label: '', color: '' })
      setVisible(value)
      setDisplayColorPicker(false)
      setSelectedColor('')
      setSelectedId('')
      setIsEdit(false)
    } else {
      setIsSpace(false)
    }
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
    if (!label.id) {
      setDisplayColorPicker(true)
      setSelectedId('')
    } else {
      setSelectedId(label.id)
    }
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
                    <Droplet />
                  </div>
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
          onMouseMove={() => !selectedId && setDisplayColorPicker(true)}
          onMouseLeave={() => setDisplayColorPicker(false)}
        >
          <div className={styles.inputLine}>
            {selectedColor ? (
              <TagFilled style={{ color: selectedColor }} />
            ) : (
              <TagOutlined />
            )}
            <AutoComplete
              name={'label'}
              size={'middle'}
              value={newLabel?.label}
              onChange={(value) =>
                !selectedId &&
                setNewLabel({ label: value, color: selectedColor })
              }
              options={labelsData}
              placeholder={t('quickCreate.client.modal.general.newLabel')}
              filterOption={(inputValue, option) =>
                option?.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              onSelect={(value, option) => {
                setSelectedId(option.id)
                setSelectedColor(option.color)
              }}
              onKeyDown={handleKeyPress}
            />
          </div>
          {displayColorPicker && !selectedId && (
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

  const SkeletonContent = () => {
    return (
      <div className={styles.skeletonWrapper}>
        <Skeleton
          className={styles.skeletonName}
          paragraph={false}
          round
          active
        />
        <Skeleton className={styles.skeletonInput} paragraph={false} active />
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
        <div>
          {isLoading ? (
            <div className={styles.skeletonLoaderContent}>
              <SkeletonContent />
              <SkeletonContent />
            </div>
          ) : (
            <div className={styles.salutationFirstDiv}>
              {fieldsSettings?.find(
                (thread) => thread.field_name === 'salutation'
              ) && (
                <div className={styles.salutation}>
                  <AntForm.Item
                    label={`${t(
                      'quickCreate.client.modal.general.salutation'
                    )}${
                      salutationData && salutationData?.length > 0
                        ? requiredLabel('salutation')
                        : ''
                    }`}
                    name={'salutation'}
                  >
                    {!isSalutationLoading ? (
                      <Select
                        name={'salutation'}
                        placeholder={t(
                          'quickCreate.client.modal.general.salutation.placeholder'
                        )}
                      >
                        {salutationData?.map((item) => (
                          <Select.Option key={item.id} value={item.name}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <div className={styles.skeletonWrapper}>
                        <Skeleton
                          className={className(
                            styles.salutationSkeleton,
                            styles.skeletonInput
                          )}
                          paragraph={false}
                          active
                        />
                      </div>
                    )}
                  </AntForm.Item>
                </div>
              )}
              <div className={styles.firstName}>
                <AntForm.Item
                  label={`${t(
                    'quickCreate.client.modal.general.firstName'
                  )} (${t('quickcreate.required.label')})`}
                  name={'Fname'}
                >
                  <Input
                    size="middle"
                    name={'Fname'}
                    placeholder={t(
                      'quickCreate.client.modal.general.firstName.placeHolder'
                    )}
                  />
                </AntForm.Item>
              </div>
              <div className={styles.lastName}>
                <AntForm.Item
                  label={`${t(
                    'quickCreate.client.modal.general.lastName'
                  )} (${t('quickcreate.required.label')})`}
                  name={'Lname'}
                >
                  <Input
                    size="middle"
                    name={'Lname'}
                    placeholder={t(
                      'quickCreate.client.modal.general.lastName.placeHolder'
                    )}
                  />
                </AntForm.Item>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find((thread) => thread.field_name === 'gender') && (
            <AntForm.Item
              className={styles.customCommon}
              label={`${t(
                'quickCreate.client.modal.general.gender'
              )}${requiredLabel('gender')}`}
              name={'gender'}
            >
              <Radio.Group name={'gender'}>
                {[
                  t('quickCreate.client.modal.general.gender.male'),
                  t('quickCreate.client.modal.general.gender.female'),
                  t('quickCreate.client.modal.general.gender.other'),
                ]?.map((item, index) => (
                  <Radio key={index} value={item} name={'gender'}>
                    {item}
                  </Radio>
                ))}
              </Radio.Group>
            </AntForm.Item>
          )
        )}
        {isLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find(
            (thread) => thread.field_name === 'MarketingSource'
          ) && (
            <AntForm.Item
              className={styles.customCommon}
              label={`${t(
                'quickCreate.client.modal.general.hearOption.label'
              )}${
                marketingSources && marketingSources.length > 0
                  ? requiredLabel('MarketingSource')
                  : ''
              }`}
              name={'MarketingSource'}
            >
              {!isMarketingSourceLoading ? (
                <Select
                  name={'MarketingSource'}
                  placeholder={t(
                    'quickCreate.client.modal.general.hearOption.selectOption'
                  )}
                  value={
                    values?.['MarketingSource']
                      ? marketingSources?.find(
                          (source) =>
                            source.id ===
                            Number.parseInt(values?.['MarketingSource'])
                        )?.name
                      : undefined
                  }
                >
                  {marketingSources?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <div className={styles.skeletonWrapper}>
                  <Skeleton
                    className={styles.skeletonInput}
                    paragraph={false}
                    active
                  />
                </div>
              )}
            </AntForm.Item>
          )
        )}
        {isLoading ? (
          <SkeletonContent />
        ) : (
          fieldsSettings?.find((thread) => thread.field_name === 'DOB') && (
            <AntForm.Item
              className={styles.customCommon}
              label={`${t(
                'quickCreate.client.modal.general.date'
              )}${requiredLabel('DOB')}`}
              name={'DOB'}
            >
              <DatePicker
                name={'DOB'}
                format={'DD/MM/YY'}
                value={values?.DOB && dayjs(values?.DOB)}
                disabledDate={(current) => {
                  return current && current > dayjs().endOf('day')
                }}
                onChange={(date, dateString) =>
                  setFieldValue('DOB', dayjs(dateString))
                }
                placeholder={'DD/MM/YY'}
                getPopupContainer={(trigger) =>
                  trigger.parentElement as HTMLElement
                }
              />
            </AntForm.Item>
          )
        )}
        {isLoading ? (
          <SkeletonContent />
        ) : (
          <AntForm.Item
            className={styles.customCommon}
            label={t('quickCreate.client.modal.general.preferredLanguage')}
            name={'preferredLanguage'}
          >
            <Select
              name={'preferredLanguage'}
              dropdownClassName={styles.generalDropdown}
              size={'middle'}
              placeholder={t(
                'quickCreate.client.modal.general.preferredLanguage.default'
              )}
              value={
                values?.['preferredLanguage']
                  ? languageMenu.find(
                      (menu) =>
                        menu.shortLabel ===
                        values?.['preferredLanguage']?.toUpperCase()
                    )?.label
                  : undefined
              }
            >
              {languageMenu.map((item, index) => (
                <Select.Option key={index} value={item.shortLabel}>
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
        )}
      </AntForm>
    </div>
  )
}

export default General
