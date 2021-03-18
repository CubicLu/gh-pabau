import React, { FC, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Form } from 'formik-antd'
import { Formik } from 'formik'

import {
  ButtonSize as InputSize,
  Input,
  OperationType,
  FullScreenReportModal as CreateDrugModal,
  Notification,
  NotificationType,
} from '@pabau/ui'
import { Row, Col, Select, Input as AntInput } from 'antd'
import styles from '../../../pages/setup/drugs/index.module.less'

export interface EditDrugDataType {
  id: string
  name?: string
  dosage?: string
  unit?: string
  frequency?: string
  route?: string
  is_active?: boolean
  comment?: string
}

export interface EditDrugModalProps {
  visible: boolean
  editDrugData: EditDrugDataType
  onUpdate: (data: EditDrugDataType) => void
  onClose?: () => void
}

export const EditDrugsModal: FC<EditDrugModalProps> = ({
  visible,
  editDrugData,
  onUpdate,
  onClose,
  ...props
}) => {
  const [updateDrugData, setUpdateDrugData] = useState<EditDrugDataType>(null)

  useEffect(() => {
    setUpdateDrugData(editDrugData)
  }, [editDrugData])

  const inputHandler = (name, val) => {
    const data: EditDrugDataType = { ...updateDrugData }
    data[name] = val
    setUpdateDrugData(data)
  }

  const submitUpdateDrug = () => {
    const required = new Set(['name', 'dosage', 'unit', 'frequency', 'route'])
    const data = { ...updateDrugData }
    data.is_active = data.is_active || false
    for (const el of required) {
      if (!data[el]) {
        Notification(NotificationType.error, `${el.toUpperCase()} is required`)
        return
      }
    }
    onUpdate(data)
  }

  return (
    <Row>
      <Col md={24}>
        <CreateDrugModal
          title="Create Drugs"
          visible={visible}
          activated={updateDrugData?.is_active}
          enableCreateBtn={updateDrugData ? true : false}
          operations={[
            OperationType['active'],
            OperationType['cancel'],
            OperationType['create'],
          ]}
          onActivated={(active) => inputHandler('is_active', active)}
          onCancel={onClose}
          onBackClick={onClose}
          createBtnText="Update"
          onCreate={submitUpdateDrug}
          footer={true}
        >
          <div className={styles.createModalBody}>
            <Formik
              initialValues={updateDrugData}
              validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                dosage: Yup.string().required('Dosage is required'),
                unit: Yup.string().required('Units are required'),
                frequency: Yup.string().required('Frequency is required'),
                route: Yup.string().required('Route is required'),
              })}
              onSubmit={async (value: EditDrugDataType) => {
                submitUpdateDrug()
              }}
              render={() => (
                <Form layout="vertical">
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>General</div>
                    <div className={styles.cardForm}>
                      <Form.Item label="Drug's Name" name="name">
                        <Input
                          name="name"
                          type="text"
                          text={updateDrugData?.name}
                          placeHolderText="Enter Drug's Name"
                          size={InputSize['large']}
                          onChange={(val) => inputHandler('name', val)}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>Medical</div>
                    <div className={styles.cardForm}>
                      <Form.Item label="Dosage" name="dosage">
                        <Input
                          name="dosage"
                          type="text"
                          text={updateDrugData?.dosage}
                          placeHolderText="e.g. 50 mg"
                          size={InputSize['large']}
                          onChange={(val) => inputHandler('dosage', val)}
                        />
                      </Form.Item>
                      <Form.Item label="Units" name="unit">
                        <Input
                          name="unit"
                          type="text"
                          text={updateDrugData?.unit}
                          placeHolderText="e.g. 1 unit"
                          size={InputSize['large']}
                          onChange={(val) => inputHandler('unit', val)}
                        />
                      </Form.Item>
                      <Form.Item label="Frequency" name="frequency">
                        <Input
                          name="frequency"
                          type="text"
                          text={updateDrugData?.frequency}
                          placeHolderText="e.g. twice daily"
                          size={InputSize['large']}
                          onChange={(val) => inputHandler('frequency', val)}
                        />
                      </Form.Item>
                      <Form.Item label="Route" name="route">
                        <Select
                          placeholder="Select Route"
                          size="large"
                          value={updateDrugData?.route}
                          onChange={(val) => inputHandler('route', val)}
                        >
                          <Select.Option value="Dummy">
                            Dummy Route
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>Comment</div>
                    <div className={styles.cardForm}>
                      <Form.Item label="Comment - Optional" name="comment">
                        <AntInput.TextArea
                          onChange={(e) =>
                            inputHandler('comment', e.target.value)
                          }
                          value={updateDrugData?.comment}
                          placeholder="E.g. take one tablet every 2 hours"
                          rows={4}
                          size="large"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              )}
            />
          </div>
        </CreateDrugModal>
      </Col>
    </Row>
  )
}

export default EditDrugsModal
