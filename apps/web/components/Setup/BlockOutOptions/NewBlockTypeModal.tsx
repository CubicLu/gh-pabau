import React, { Fragment, useState, useEffect } from 'react'
import { Form, Input, Typography, Slider } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import {
  BasicModal,
  Button,
  Switch,
  FullScreenReportModal,
  OperationType,
} from '@pabau/ui'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './BlockOutOptionsComponents.module.less'

export interface NewBlockOutOptionsProps {
  visible: boolean
  onCancel: () => void
  onSave: (values) => void
  isEdit?: boolean
  editData?: {
    name: string
    type: string
    is_active: boolean
    paidBlockOut: string
    backgroundColor: string
    defaultTime: number
  }
  onDelete?: () => void
}

export function NewBlockOutOptions(props: NewBlockOutOptionsProps) {
  const { t } = useTranslationI18()
  const [form] = Form.useForm()
  const { Item } = Form
  const { Text, Paragraph } = Typography
  const { visible, onCancel, isEdit, editData, onSave, onDelete } = props

  const [showDelete, setShowDelete] = useState(false)
  const [active, setActive] = useState(true)
  const [type, setType] = useState(
    isEdit ? editData?.type || 'Blockout' : 'Blockout'
  )
  const [backgroundColor, setBackgroundColor] = useState(
    isEdit ? editData?.backgroundColor || '54B2D3' : '54B2D3'
  )

  useEffect(() => {
    if (isEdit && editData) {
      setType(editData.type || 'Blockout')
      setBackgroundColor(editData.backgroundColor || '54B2D3')
      setActive(!!editData.is_active)
    }
  }, [editData, isEdit])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave({ ...values, isActive: active })
    })
  }

  const handleClose = () => {
    form.resetFields()
    onCancel()
  }

  const onTypeCheck = (type: string) => () => {
    form.setFields([{ name: 'type', value: type }])
    setType(type)
  }

  const handleDelete = () => {
    onDelete?.()
    setShowDelete(false)
    handleClose()
  }

  return (
    <Fragment>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: isEdit ? editData?.name || '' : '',
          paidBlockOut: isEdit ? !!editData?.paidBlockOut : true,
          backgroundColor: isEdit ? editData?.backgroundColor : backgroundColor,
          defaultTime: isEdit ? editData?.defaultTime : 50,
          type,
        }}
        className={styles.form}
        onSubmitCapture={(e) => {
          e.preventDefault()
        }}
        onFinish={(values) => onSave({ ...values, isActive: active })}
      >
        <FullScreenReportModal
          visible={visible}
          title={
            isEdit
              ? t('setup.blockoutmodal.title.edit')
              : t('setup.blockoutmodal.title.create')
          }
          operations={
            isEdit
              ? [
                  OperationType.active,
                  OperationType.delete,
                  OperationType.create,
                ]
              : [OperationType.active, OperationType.create]
          }
          enableCreateBtn={true}
          createBtnText={
            isEdit ? t('common-label-save') : t('common-label-create')
          }
          activeBtnText={
            active ? t('common-label-active') : t('common-label-inactive')
          }
          deleteBtnText={t('common-label-delete')}
          onDelete={() => handleDelete()}
          onBackClick={() => handleClose()}
          onCreate={() => handleSubmit()}
          activated={active}
          onActivated={(value) => setActive(value)}
        >
          <div className={styles.body}>
            <div className={styles.bodyContent}>
              <Paragraph style={{ marginBottom: 6 }}>
                {t('setup.blockoutmodal.form.name')}
              </Paragraph>
              <Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t(
                      'setup.blockoutmodal.form.name.validate.required'
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={t('setup.blockoutmodal.form.name.placeholder')}
                />
              </Item>

              <Paragraph style={{ marginBottom: 6 }}>
                {t('setup.blockoutmodal.form.type')}
              </Paragraph>
              <Item style={{ marginBottom: 0 }} name="type">
                <div style={{ display: 'flex', flex: 1 }}>
                  <div
                    onClick={onTypeCheck('Blockout')}
                    className={`${styles.typeLeft} ${
                      type === 'Blockout' && styles.selectedLeft
                    }`}
                  >
                    {type === 'Blockout' && (
                      <CheckCircleFilled className={styles.check} />
                    )}
                    <div className={styles.dash} />
                    <p style={{ marginTop: 16 }}>
                      {t('setup.blockoutmodal.form.type.blockout')}
                    </p>
                  </div>
                  <div
                    onClick={onTypeCheck('Opening')}
                    className={`${styles.typeRight}  ${
                      type === 'Opening' && styles.selectedRight
                    }`}
                  >
                    {type === 'Opening' && (
                      <CheckCircleFilled className={styles.check} />
                    )}
                    <div className={styles.dash} />
                    <p style={{ marginTop: 16 }}>
                      {t('setup.blockoutmodal.form.type.opening')}
                    </p>
                  </div>
                </div>
              </Item>

              {type === 'Blockout' && (
                <>
                  <Paragraph style={{ marginTop: 24, marginBottom: 6 }}>
                    {t('setup.blockoutmodal.form.paid')}
                  </Paragraph>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Item
                      name="paidBlockOut"
                      valuePropName="checked"
                      style={{ marginBottom: 0 }}
                    >
                      <Switch />
                    </Item>
                    <Text style={{ marginLeft: 12 }}>
                      {t('setup.blockoutmodal.form.enable')}
                    </Text>
                  </div>
                </>
              )}

              <Paragraph style={{ marginTop: 24, marginBottom: 6 }}>
                {t('setup.blockoutmodal.form.background')}
              </Paragraph>
              <div style={{ display: 'flex', flex: 1 }}>
                <div
                  className={styles.colorBox}
                  style={{
                    backgroundColor: `#${backgroundColor}`,
                  }}
                />
                <Item
                  name="backgroundColor"
                  style={{ marginBottom: 0, flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: t(
                        'setup.blockoutmodal.form.background.validate.required'
                      ),
                    },
                    {
                      pattern: new RegExp('^[0-9A-Fa-f]{6}'),
                      message: t(
                        'setup.blockoutmodal.form.background.validate.valid'
                      ),
                    },
                  ]}
                >
                  <Input
                    style={{ height: 40 }}
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    maxLength={6}
                    minLength={6}
                  />
                </Item>
              </div>

              <Paragraph style={{ marginTop: 24, marginBottom: 0 }}>
                {t('setup.blockoutmodal.form.defaulttime')}
              </Paragraph>
              <Item name="defaultTime">
                <Slider
                  tooltipPlacement="bottom"
                  max={400}
                  min={5}
                  step={5}
                  tipFormatter={(value) => <span>{value} min</span>}
                  className={styles.slider}
                  tooltipVisible
                />
              </Item>
            </div>
          </div>
        </FullScreenReportModal>
      </Form>
      <BasicModal
        title={t('setup.blockoutmodal.delete.title')}
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        footer={false}
        centered
      >
        <Paragraph type="secondary">
          {t('setup.blockoutmodal.delete.message')}
        </Paragraph>
        <div style={{ padding: '12px 0 40px', textAlign: 'right' }}>
          <Button
            style={{ background: '#FF5B64', border: 'none' }}
            danger
            type="primary"
            size="large"
            onClick={handleDelete}
          >
            {t('setup.blockoutmodal.delete.button')}
          </Button>
        </div>
      </BasicModal>
    </Fragment>
  )
}

export default NewBlockOutOptions
