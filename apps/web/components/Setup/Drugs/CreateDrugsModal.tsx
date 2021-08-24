import React, { FC, useState } from 'react'
import * as Yup from 'yup'
import { Form } from 'formik-antd'
import { Formik } from 'formik'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
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

export interface CreateDrugDataType {
  name: string
  dosage: string
  unit: string
  frequency: string
  route: string
  is_active: boolean
  comment?: string
}

export interface CreateDrugModalProps {
  visible: boolean
  onCreate: (data: CreateDrugDataType) => void
  onClose?: () => void
}

export const CreateDrugsModal: FC<CreateDrugModalProps> = ({
  visible,
  onCreate,
  onClose,
  ...props
}) => {
  const { t } = useTranslationI18()
  const [createDrugData, setCreateDrugData] = useState<CreateDrugDataType>(null)

  const inputHandler = (name, val) => {
    const data: CreateDrugDataType = { ...createDrugData }
    data[name] = val
    setCreateDrugData(data)
  }

  const submitCreateDrug = () => {
    const required = new Set(['name', 'dosage', 'unit', 'frequency', 'route'])
    const data = { ...createDrugData }
    data.is_active = data.is_active || false
    for (const el of required) {
      if (!data[el]) {
        Notification(
          NotificationType.error,
          t('setup.drugs.fullscreenmodal.validate.required', {
            what: el.toUpperCase(),
          })
        )
        return
      }
    }
    onCreate(data)
  }

  return (
    <Row>
      <Col md={24}>
        <CreateDrugModal
          title={t('setup.drugs.fullscreenmdoal.title.create')}
          visible={visible}
          enableCreateBtn={createDrugData ? true : false}
          operations={[OperationType['active'], OperationType['create']]}
          createBtnText={t('common-label-create')}
          activeBtnText={
            createDrugData?.is_active
              ? t('common-label-active')
              : t('common-label-inactive')
          }
          onActivated={(active) => inputHandler('is_active', active)}
          onBackClick={onClose}
          onCreate={submitCreateDrug}
          footer={true}
        >
          <div className={styles.createModalBody}>
            <Formik
              initialValues={{
                name: '',
                dosage: '',
                unit: '',
                frequency: '',
                route: '',
                is_active: false,
                comment: '',
              }}
              validationSchema={Yup.object({
                name: Yup.string().required(
                  t('setup.drugs.fullscreenmdoal.name.validate.required')
                ),
                dosage: Yup.string().required(
                  t('setup.drugs.fullscreenmdoal.dosage.validate.required')
                ),
                unit: Yup.string().required(
                  t('setup.drugs.fullscreenmdoal.unit.validate.required')
                ),
                frequency: Yup.string().required(
                  t('setup.drugs.fullscreenmdoal.frequency.validate.required')
                ),
                route: Yup.string().required(
                  t('setup.drugs.fullscreenmdoal.route.validate.required')
                ),
              })}
              onSubmit={async (value: CreateDrugDataType) => {
                submitCreateDrug()
              }}
              render={() => (
                <Form layout="vertical">
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>
                      {t('setup.drugs.fullscreenmdoal.form.general')}
                    </div>
                    <div className={styles.cardForm}>
                      <Form.Item
                        label={t('setup.drugs.fullscreenmdoal.form.name')}
                        name="name"
                      >
                        <Input
                          name="name"
                          type="text"
                          placeHolderText={t(
                            'setup.drugs.fullscreenmdoal.form.name.placeholder'
                          )}
                          size={InputSize['large']}
                          onChange={(val) => inputHandler('name', val)}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>
                      {t('setup.drugs.fullscreenmdoal.form.medical')}
                    </div>
                    <div className={styles.cardForm}>
                      <Form.Item
                        label={t('setup.drugs.fullscreenmdoal.form.dosage')}
                        name="dosage"
                      >
                        <Input
                          name="dosage"
                          type="text"
                          placeHolderText={t(
                            'setup.drugs.fullscreenmdoal.form.dosage.placeholder'
                          )}
                          size={InputSize['large']}
                          onChange={(val) => inputHandler('dosage', val)}
                        />
                      </Form.Item>
                      <Form.Item
                        label={t('setup.drugs.fullscreenmdoal.form.unit')}
                        name="unit"
                      >
                        <Input
                          name="unit"
                          type="text"
                          placeHolderText={t(
                            'setup.drugs.fullscreenmdoal.form.unit.placeholder'
                          )}
                          size={InputSize['large']}
                          onChange={(val) => inputHandler('unit', val)}
                        />
                      </Form.Item>
                      <Form.Item
                        label={t('setup.drugs.fullscreenmdoal.form.frequency')}
                        name="frequency"
                      >
                        <Input
                          name="frequency"
                          type="text"
                          placeHolderText={t(
                            'setup.drugs.fullscreenmdoal.form.frequency.placeholder'
                          )}
                          size={InputSize['large']}
                          onChange={(val) => inputHandler('frequency', val)}
                        />
                      </Form.Item>
                      <Form.Item
                        label={t('setup.drugs.fullscreenmdoal.form.route')}
                        name="route"
                      >
                        <Select
                          placeholder={t(
                            'setup.drugs.fullscreenmdoal.form.route.placeholder'
                          )}
                          size="large"
                          onChange={(val) => inputHandler('route', val)}
                        >
                          <Select.Option value="Dummy">
                            {t('setup.drugs.fullscreenmdoal.form.route.dummy')}
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>
                      {t('setup.drugs.fullscreenmdoal.form.comment')}
                    </div>
                    <div className={styles.cardForm}>
                      <Form.Item
                        label={t(
                          'setup.drugs.fullscreenmdoal.form.comment.label'
                        )}
                        name="comment"
                      >
                        <AntInput.TextArea
                          onChange={(e) =>
                            inputHandler('comment', e.target.value)
                          }
                          placeholder={t(
                            'setup.drugs.fullscreenmdoal.form.comment.placeholder'
                          )}
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

export default CreateDrugsModal
