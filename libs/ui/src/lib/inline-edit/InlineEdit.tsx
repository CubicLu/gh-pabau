import React, { FC, useState } from 'react'
import { Input, Form, Popover, Select } from 'antd'
import { DatePicker, Button, Notification, NotificationType } from '@pabau/ui'
import dayjs from 'dayjs'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import styles from './InlineEdit.module.less'

const { Option } = Select

export interface InlineEditProps {
  children?: React.ReactNode
  selectOptions?: string[]
  hideFooter?: boolean
  fieldTitle: string
  orderIndex?: number
  initialValue: string
  type: string
  dateFormat?: string
  onUpdateValue: (orderIndex: number, value: string) => void
}

export const InlineEditDataTypes = {
  date: 'date',
  phone: 'phone',
  number: 'number',
  email: 'email',
  text: 'text',
  url: 'url',
  dropdown: 'dropdown',
  singleLineText: 'single line',
  paragraphText: 'paragraph text',
  multipleChoice: 'multiple choice',
  singleChoice: 'single choice',
  localizedMessage: 'localized message',
  list: 'list',
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
  const [form] = Form.useForm()
  const { t } = useTranslation('common')

  const toggleVisible = () => {
    setVisible((e) => !e)
  }

  const handleClose = (val) => {
    setVisible(val)
  }

  const renderItem = () => {
    switch (type) {
      case InlineEditDataTypes.date:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item
              initialValue={dayjs(initialValue, dateFormat)}
              name={fieldTitle}
            >
              <DatePicker
                format={dateFormat}
                defaultValue={dayjs(initialValue, dateFormat) || null}
                allowClear={false}
                showTime={{ defaultValue: dayjs('00:00', 'HH:mm') }}
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
      case InlineEditDataTypes.dropdown:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <Input />
            </Form.Item>
          </div>
        )
      case InlineEditDataTypes.multipleChoice:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <Input />
            </Form.Item>
          </div>
        )
      case InlineEditDataTypes.singleChoice:
        return (
          <div className={styles.editPopup}>
            <h5>{`Edit ${fieldTitle}`}</h5>
            <Form.Item name={fieldTitle} initialValue={initialValue}>
              <Input />
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
                <Form.Item name={fieldTitle} initialValue={initialValue}>
                  <Select
                    allowClear
                    placeholder={t('activityList.select.placeholder')}
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

  const save = (values) => {
    const [key] = Object.keys(values)
    let value = ''
    if (type === InlineEditDataTypes.date) {
      value = dayjs(values?.[key]).format('YYYY-MM-DD')
    } else {
      const updatedValue = { ...values }
      value = updatedValue?.[key]
    }
    if (orderIndex) {
      onUpdateValue(orderIndex, value)
    }
    toggleVisible()
    Notification(NotificationType.success, `${fieldTitle} updated to ${value}`)
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
              <Button type={'primary'} htmlType={'submit'}>
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
      onVisibleChange={(val) => handleClose(val)}
    >
      {children}
    </Popover>
  )
}

export default InlineEdit
