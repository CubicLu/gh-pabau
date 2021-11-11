import React, { FC, useState } from 'react'
import { Input, Form, Popover, Select, Checkbox, Radio } from 'antd'
import {
  DatePicker,
  Button,
  PhoneProp,
  PhoneNumberInput,
  selectOptionType,
} from '@pabau/ui'
import dayjs from 'dayjs'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import styles from './InlineEdit.module.less'

const { Option } = Select
const { TextArea } = Input

export interface InlineEditProps {
  children?: React.ReactNode
  selectOptions?: string[] | selectOptionType[]
  hideFooter?: boolean
  fieldTitle: string
  orderIndex?: number
  initialValue: number | string | PhoneProp
  type: string
  dateFormat?: string
  onUpdateValue: (orderIndex: number, value: string, type?: string) => void
}

export const InlineEditDataTypes = {
  date: 'date',
  phone: 'phone',
  number: 'number',
  email: 'email',
  text: 'text',
  string: 'string',
  url: 'url',
  multiple: 'multiple',
  bool: 'bool',
  basicPhone: 'basicPhone',
  localizedMessage: 'localized message',
  list: 'list',
  address: 'address',
}

export const InlineEdit: FC<InlineEditProps> = ({
  children,
  type,
  hideFooter,
  selectOptions,
  initialValue,
  fieldTitle,
  orderIndex,
  dateFormat,
  onUpdateValue,
  ...restProps
}) => {
  const isMobile = useMedia('(max-width: 768px)', false)

  const [visible, setVisible] = useState(false)
  const [isEditLoading, setEditLoading] = useState(false)
  const [phoneType, setPhoneType] = useState('Mobile')
  const [form] = Form.useForm()
  const { t } = useTranslation('common')

  const toggleVisible = () => {
    setVisible((e) => !e)
  }

  const handleClose = (val) => {
    setVisible(val)
    form.resetFields()
  }

  const renderItem = () => {
    switch (type) {
      case InlineEditDataTypes.date:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item
              initialValue={
                initialValue &&
                typeof initialValue === 'string' &&
                dayjs(initialValue, dateFormat)
              }
              name={fieldTitle}
            >
              <DatePicker
                format={dateFormat}
                defaultValue={
                  typeof initialValue === 'string'
                    ? dayjs(initialValue, dateFormat)
                    : undefined
                }
                allowClear={false}
                showTime={{ defaultValue: dayjs('00:00', 'HH:mm') }}
                getPopupContainer={(node) => {
                  if (node) {
                    return node as HTMLElement
                  }
                  return document.body as HTMLElement
                }}
              />
            </Form.Item>
          </div>
        )
      case InlineEditDataTypes.number:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <Input type={'number'} />
            </Form.Item>
          </div>
        )
      case InlineEditDataTypes.text:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <TextArea rows={4} />
            </Form.Item>
          </div>
        )
      case InlineEditDataTypes.multiple:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <Checkbox.Group
                name={fieldTitle}
                options={
                  selectOptions && selectOptions?.length > 0
                    ? selectOptions.map((value) => {
                        return value
                      })
                    : []
                }
              />
            </Form.Item>
          </div>
        )
      case InlineEditDataTypes.bool:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <Radio.Group>
                {selectOptions?.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        )
      case InlineEditDataTypes.email:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item
              name={fieldTitle}
              rules={[{ type: 'email', required: true }]}
              initialValue={initialValue}
            >
              <Input />
            </Form.Item>
          </div>
        )
      case InlineEditDataTypes.list:
        return (
          <div>
            <div className={styles.editPopup}>
              <h5>{`Edit ${fieldTitle}`}</h5>
              <div>
                <Form.Item name={fieldTitle} initialValue={initialValue || ''}>
                  <Select
                    allowClear
                    placeholder={t('activityList.select.placeholder')}
                  >
                    {selectOptions?.map((item, index) => {
                      if (item?.id) {
                        return (
                          <Option key={index} value={item.id}>
                            {item.name}
                          </Option>
                        )
                      } else {
                        return (
                          <Option key={index} value={item}>
                            {item}
                          </Option>
                        )
                      }
                    })}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>
        )
      case InlineEditDataTypes.basicPhone:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <div>
              <Form.Item
                name={fieldTitle}
                initialValue={initialValue['mobile']}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={'phoneType'}
                initialValue={selectOptions?.[0]}
                className={styles.phoneTypeContent}
              >
                <Select
                  allowClear
                  placeholder={t('activityList.select.placeholder')}
                  onChange={(val) => {
                    setPhoneType(val.toString().toLowerCase())
                    form.setFieldsValue({
                      [fieldTitle]:
                        val.toString().toLowerCase() === 'mobile'
                          ? initialValue['mobile']
                          : val.toString().toLowerCase() === 'home'
                          ? initialValue['home']
                          : '',
                    })
                  }}
                >
                  {selectOptions?.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        )
      case InlineEditDataTypes.phone:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <PhoneNumberInput
                label={''}
                onChange={(value) => form.setFieldsValue({ fieldTitle, value })}
                showValidErrorMessage={false}
              />
            </Form.Item>
          </div>
        )
      default:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle} `}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <Input />
            </Form.Item>
          </div>
        )
    }
  }

  const save = async (values) => {
    setEditLoading(true)
    const [key] = Object.keys(values)
    let value = ''
    if (type === InlineEditDataTypes.date) {
      value = dayjs(values?.[key]).format('YYYY-MM-DD')
    } else {
      const updatedValue = { ...values }
      value =
        typeof updatedValue?.[key] === 'object'
          ? updatedValue?.[key].join(', ')
          : updatedValue?.[key]
    }
    if (orderIndex) {
      await onUpdateValue(orderIndex, value, phoneType.toLowerCase())
    }
    setEditLoading(false)
    toggleVisible()
  }

  const popoverContent = () => {
    const validateMessages = {
      required: t('activityList.column.email.required'),
      types: {
        email: t('activityList.column.email.validate'),
      },
    }
    return (
      <Form
        form={form}
        name="EditCell"
        onFinish={(value) => {
          save(value)
        }}
        validateMessages={validateMessages}
      >
        <div className={styles.popOverContent}>
          {renderItem()}
          {!hideFooter && (
            <div className={styles.footerBtnGroup}>
              <Button onClick={toggleVisible}>
                {t('common-label-cancel')}
              </Button>
              <Button
                type={'primary'}
                htmlType={'submit'}
                loading={isEditLoading}
              >
                {t('common-label-save')}
              </Button>
            </div>
          )}
        </div>
      </Form>
    )
  }

  return (
    <Popover
      placement="bottomLeft"
      content={popoverContent}
      trigger="click"
      overlayClassName={styles.profileWrapper}
      visible={visible && !isMobile}
      onVisibleChange={(val) => {
        handleClose(val)
      }}
      getPopupContainer={(node) => {
        if (node) {
          return node.parentNode as HTMLElement
        }
        return document.body as HTMLElement
      }}
    >
      {children}
    </Popover>
  )
}

export default InlineEdit
