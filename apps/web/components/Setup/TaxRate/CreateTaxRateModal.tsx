import {
  BasicModal,
  Button,
  FullScreenReportModal as CreateTaxRateMobileModal,
  OperationType as CreateTaxRateOperationType,
} from '@pabau/ui'
import { Checkbox, Collapse, Form, Input, InputNumber } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import useWindowSize from '../../../hooks/useWindowSize'
import styles from './TaxRateComponents.module.less'

export interface CreateTaxRateProps {
  visible: boolean
  onCancel: () => void
  onSave: (values) => void
  isEdit?: boolean
  editData?: {
    name: string
    value: number
    glCode: string
    is_active: boolean
  }
  onDelete?: () => void
}

export function CreateTaxRateModal(props: CreateTaxRateProps) {
  const { t } = useTranslationI18()
  const [form] = Form.useForm()
  const size = useWindowSize()
  const { visible, onCancel, isEdit, editData, onSave, onDelete } = props
  const [showDeleteBtn, setShowDeleteBtn] = useState(editData?.is_active)

  const handleClose = () => {
    form.resetFields()
    onCancel()
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
          name: isEdit ? editData?.name || '' : '',
          value: isEdit ? Number(editData?.value) || 0 : 0,
          isActive: isEdit ? !!editData?.is_active : true,
          glCode: isEdit ? editData?.glCode || '' : '',
        }}
        onFinish={(values) => {
          onSave(values)
          handleClose()
        }}
      >
        <div>
          <Form.Item
            label={t('setup.taxrate.notification.createmodal.inputs.name')}
            name="name"
            rules={[
              {
                required: true,
                message: t(
                  'setup.taxrate.notification.createmodal.inputs.name.error'
                ),
              },
            ]}
          >
            <Input
              maxLength={20}
              placeholder={t(
                'setup.taxrate.notification.createmodal.inputs.name.placeholder'
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('setup.taxrate.notification.createmodal.inputs.amount')}
            name="value"
            rules={[
              {
                required: true,
                message: t(
                  'setup.taxrate.notification.createmodal.inputs.amount.error1'
                ),
              },
              {
                type: 'number',
                min: 0,
                message: t(
                  'setup.taxrate.notification.createmodal.inputs.amount.error2'
                ),
              },
              {
                type: 'number',
                max: 100,
                message: t(
                  'setup.taxrate.notification.createmodal.inputs.amount.error3'
                ),
              },
            ]}
          >
            <NumberInput
              size="large"
              type="number"
              placeholder="20"
              addonAfter="%"
              min={0}
              max={100}
              style={{ width: '100%' }}
            />
            {/* <InputNumber /> */}
          </Form.Item>

          <Collapse
            ghost
            expandIconPosition="right"
            className={styles.advanceCollapse}
          >
            <Collapse.Panel
              header={t(
                'setup.taxrate.notification.createmodal.inputs.advanced.title'
              )}
              key="1"
            >
              <Form.Item
                label={t(
                  'setup.taxrate.notification.createmodal.inputs.glcode'
                )}
                name="glCode"
              >
                <Input
                  maxLength={20}
                  placeholder={t(
                    'setup.taxrate.notification.createmodal.inputs.glcode.placeholder'
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
          <Form.Item name="isActive" valuePropName="checked">
            <Checkbox onChange={(e) => setShowDeleteBtn(e.target.checked)}>
              {t('setup.taxrate.notification.createmodal.activebtn')}
            </Checkbox>
          </Form.Item>
          {isEdit && !showDeleteBtn && (
            <Button style={{ marginLeft: '16px' }} onClick={() => onDelete?.()}>
              {t('setup.taxrate.notification.createmodal.deletebtn')}
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: '16px' }}
          >
            {isEdit
              ? t('setup.taxrate.notification.updatemodal.title')
              : t('setup.taxrate.notification.createmodal.title')}
          </Button>
        </div>
      </Form>
    )
  }

  return size.width <= 767 ? (
    <CreateTaxRateMobileModal
      operations={[CreateTaxRateOperationType['cancel']]}
      title={`${
        isEdit
          ? t('setup.taxrate.notification.updatemodal.title')
          : t('setup.taxrate.notification.createmodal.title')
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
        isEdit
          ? t('setup.taxrate.notification.updatemodal.title')
          : t('setup.taxrate.notification.createmodal.title')
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
