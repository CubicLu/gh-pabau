import React, { FC, useState } from 'react'
import { Input, Form, Popover } from 'antd'
import { Button, Notification, NotificationType } from '@pabau/ui'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import styles from './ClientInfoInlineEdit.module.less'

export interface ClientInfoInlineEditProps {
  fieldTitle: string
  children?: React.ReactNode
  hideFooter?: boolean
  keyValue: string
  initialValue: string
  type: string
  onUpdateValue: (keyValue: string, value: string) => void
}

export const ClientInfoInlineEditDataTypes = {
  text: 'text',
}

export const ClientInfoInlineEdit: FC<ClientInfoInlineEditProps> = ({
  children,
  fieldTitle,
  hideFooter,
  initialValue,
  keyValue,
  type,
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
    const updatedValue = { ...values }
    value = updatedValue?.[key]
    onUpdateValue(keyValue, value)
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

export default ClientInfoInlineEdit
