import {
  BasicModal,
  FullScreenReportModal as CreateTaxRateMobileModal,
  OperationType as CreateTaxRateOperationType,
} from '@pabau/ui'
import { Checkbox, Collapse, InputNumber, Button, Form, Input } from 'antd'
import classNames from 'classnames'
import React, { useState, useRef } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import useWindowSize from '../../../hooks/useWindowSize'
import styles from './TaxRateComponents.module.less'

interface FormElems {
  name: string
  value: number
  is_active: boolean
  glCode: string
}

export interface CreateTaxRateProps {
  visible: boolean
  onCancel: () => void
  onSave: (values) => void
  editData?: FormElems
  onDelete?: () => void
}

export function CreateTaxRateModal(props: CreateTaxRateProps) {
  const { t } = useTranslationI18()
  const [form] = Form.useForm()
  const size = useWindowSize()
  const saveBtn = useRef<HTMLButtonElement>(null)
  const { visible, onCancel, editData, onSave, onDelete } = props
  const [currentInput, setCurrentInput] = useState(0)
  const [isActive, setIsActive] = useState<boolean>(
    editData?.name ? editData?.is_active : true
  )
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleClose = () => {
    form.resetFields()
    onCancel()
  }

  const submitForm = (data) => {
    data.is_active = isActive
    onSave?.(data)
  }

  const NumberInput = ({ addonAfter, ...props }) => {
    const classes = classNames('ant-input-wrapper', 'ant-input-group', {
      addonAfterInput: addonAfter,
    })

    return (
      <div className={classes}>
        <InputNumber {...props} />
        {addonAfter && (
          <span className="ant-input-group-addon">{addonAfter}</span>
        )}
      </div>
    )
  }

  const ActionForm = () => {
    return (
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        initialValues={{
          name: editData ? editData?.name : '',
          value: editData ? editData?.value : '',
          is_active: editData ? editData?.is_active : true,
          glCode: editData ? editData?.glCode : '',
        }}
        onFinish={submitForm}
      >
        <div>
          <Form.Item
            label={t('setup.taxrate.createmodal.inputs.name')}
            name="name"
            rules={[
              {
                required: true,
                message: t('setup.taxrate.createmodal.inputs.required', {
                  what: t('setup.taxrate.createmodal.inputs.name'),
                }),
              },
              {
                min: 2,
                message: t('setup.taxrate.createmodal.inputs.min.error', {
                  min: 2,
                  what: t('setup.taxrate.createmodal.inputs.name'),
                }),
              },
              {
                max: 50,
                message: t('setup.taxrate.createmodal.inputs.max.error', {
                  max: 50,
                }),
              },
            ]}
          >
            <Input
              autoFocus={currentInput === 0 ? true : false}
              onFocus={() => setCurrentInput(0)}
              placeholder={t(
                'setup.taxrate.createmodal.inputs.name.placeholder'
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('setup.taxrate.createmodal.inputs.amount')}
            name="value"
            rules={[
              {
                required: true,
                message: t('setup.taxrate.createmodal.inputs.required', {
                  what: t('setup.taxrate.createmodal.inputs.amount'),
                }),
              },
              {
                type: 'number',
                min: 1,
                message: t('setup.taxrate.createmodal.inputs.negative', {
                  what: t('setup.taxrate.createmodal.inputs.amount'),
                }),
              },
              {
                type: 'number',
                max: 100,
                message: t('setup.taxrate.createmodal.inputs.amount.error2'),
              },
            ]}
          >
            <NumberInput
              type="number"
              autoFocus={currentInput === 1 ? true : false}
              onFocus={() => setCurrentInput(1)}
              size="large"
              placeholder="20"
              addonAfter="%"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Collapse
            ghost
            expandIconPosition="right"
            className={styles.advanceCollapse}
            defaultActiveKey={isCollapsed && '1'}
            onChange={() => setIsCollapsed((e) => !e)}
          >
            <Collapse.Panel
              header={t('setup.taxrate.createmodal.inputs.advanced.title')}
              key="1"
            >
              <Form.Item
                name="glCode"
                label={t('setup.taxrate.createmodal.inputs.glcode')}
                rules={[
                  {
                    min: 2,
                    message: t('setup.taxrate.createmodal.inputs.min.error', {
                      min: 2,
                      what: t('setup.taxrate.createmodal.inputs.glcode'),
                    }),
                  },
                  {
                    max: 50,
                    message: t('setup.taxrate.createmodal.inputs.max.error', {
                      max: 50,
                    }),
                  },
                ]}
              >
                <Input
                  autoFocus={currentInput === 2 ? true : false}
                  onFocus={() => setCurrentInput(2)}
                  placeholder={t(
                    'setup.taxrate.createmodal.inputs.glcode.placeholder'
                  )}
                />
              </Form.Item>
            </Collapse.Panel>
          </Collapse>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}
        >
          {size.width >= 767 && (
            <>
              <Form.Item name="is_active" valuePropName="checked">
                <Checkbox
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                >
                  {t('setup.taxrate.createmodal.activebtn')}
                </Checkbox>
              </Form.Item>
              {editData && !isActive && (
                <Button
                  style={{ marginLeft: '16px' }}
                  onClick={() => onDelete?.()}
                >
                  {t('setup.taxrate.createmodal.deletebtn')}
                </Button>
              )}
            </>
          )}
          <Button
            type="primary"
            htmlType="submit"
            style={
              size.width <= 767 ? { display: 'none' } : { marginLeft: '16px' }
            }
            ref={saveBtn}
          >
            {editData
              ? t('setup.taxrate.updatemodal.title')
              : t('setup.taxrate.createmodal.title')}
          </Button>
        </div>
      </Form>
    )
  }

  return size.width <= 767 ? (
    <CreateTaxRateMobileModal
      operations={
        editData
          ? [
              CreateTaxRateOperationType.active,
              CreateTaxRateOperationType.delete,
              CreateTaxRateOperationType.create,
            ]
          : [
              CreateTaxRateOperationType.active,
              CreateTaxRateOperationType.create,
            ]
      }
      footer={true}
      enableCreateBtn={true}
      onActivated={(checked) => setIsActive(checked)}
      onDelete={() => onDelete?.()}
      onCreate={() => saveBtn?.current?.click()}
      createBtnText={
        editData
          ? t('setup.taxrate.updatemodal.title')
          : t('setup.taxrate.createmodal.title')
      }
      activated={isActive}
      title={`${
        editData
          ? t('setup.taxrate.updatemodal.title')
          : t('setup.taxrate.createmodal.title')
      } Tax Rate`}
      visible={visible}
      onBackClick={handleClose}
    >
      <div className={styles.fullScreenModal}>
        <div>
          <ActionForm />
        </div>
      </div>
    </CreateTaxRateMobileModal>
  ) : (
    <BasicModal
      width={700}
      visible={visible}
      title={`${
        editData
          ? t('setup.taxrate.updatemodal.title')
          : t('setup.taxrate.createmodal.title')
      } Tax Rate`}
      footer={false}
      centered={true}
      onCancel={handleClose}
    >
      <ActionForm />
    </BasicModal>
  )
}

export default CreateTaxRateModal
