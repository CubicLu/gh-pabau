import { BasicModal, Button } from '@pabau/ui'
import { DatePicker, Radio, Select } from 'antd'
import { Formik } from 'formik'
import { Form as AntForm, Input } from 'formik-antd'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/products/list.module.less'

const { Option } = Select

interface NewPurchaseOrder {
  status: string
  poNumber: string
  createdDate: Date
  supplier: string
  createdBy: string
  location: string
  totalCost: number
}

interface P {
  visible: boolean
  onSaveChanges: (stockTakeData) => void
  onClose: () => void
}

export const CreatePurchaseOrder = ({
  visible,
  onSaveChanges,
  onClose,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [showModal, setShowModal] = useState(false)
  const createdBy = ['Maggie Pabau', 'Armend R', 'Boban Avramoski']
  const supplier = ['abc', 'def', 'ghi']

  const initialValues: NewPurchaseOrder = {
    status: 'active',
    poNumber: '',
    createdDate: new Date(),
    supplier: '',
    createdBy: '',
    location: '',
    totalCost: 0,
  }

  useEffect(() => {
    setShowModal(visible)
  }, [visible])

  const validationSchema = Yup.object({
    status: Yup.string().required(
      t('products.productPurchaseOrder.statusRequired')
    ),
    poNumber: Yup.string().required(
      t('products.productPurchaseOrder.phoneNumberRequired')
    ),
    createdDate: Yup.string().required(
      t('products.productPurchaseOrder.createdDateRequired')
    ),
    supplier: Yup.string().required(
      t('products.productPurchaseOrder.supplierRequired')
    ),
    createdBy: Yup.string().required(
      t('products.productPurchaseOrder.createdByRequired')
    ),
    totalCost: Yup.number().required(
      t('products.productPurchaseOrder.totalCostRequired:')
    ),
  })

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => onSaveChanges(values)}
    >
      {({ setFieldValue, values, resetForm, isValid }) => {
        return (
          <BasicModal
            visible={showModal}
            modalWidth={450}
            wrapClassName="addProductCategoryModal"
            title={t('products.productPurchaseOrder.title')}
            onCancel={() => {
              onClose()
              resetForm()
              setShowModal(false)
            }}
          >
            <AntForm layout={'vertical'} requiredMark={false}>
              <div className={styles.newCountModal}>
                <AntForm.Item
                  className={styles.customCommon}
                  label={'Status'}
                  name={t('products.productPurchaseOrder.status')}
                >
                  <Radio.Group
                    onChange={(e) => {
                      setFieldValue('status', e.target.value)
                    }}
                    value={values?.status}
                  >
                    <Radio value={'active'}>
                      <span>
                        {t('products.productPurchaseOrder.status.active')}
                      </span>
                    </Radio>
                    <Radio value={'inactive'}>
                      <span>
                        {t('products.productPurchaseOrder.status.inactive')}
                      </span>
                    </Radio>
                  </Radio.Group>
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.productPurchaseOrder.ponumber')}
                  name={'poNumber'}
                >
                  <Input
                    placeholder={t(
                      'products.productPurchaseOrder.ponumber.placeHolder'
                    )}
                    name="poNumber"
                  />
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.productPurchaseOrder.createdDate')}
                  name={'createdDate'}
                >
                  <DatePicker
                    onChange={(date, dateString) =>
                      setFieldValue('createdDate', dateString)
                    }
                    name={'createdDate'}
                    format={'DD/MM/YYYY'}
                    placeholder={'DD/MM/YYYY'}
                  />
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.productPurchaseOrder.supplier')}
                  name={'supplier'}
                >
                  <Select
                    defaultValue={t(
                      'products.productPurchaseOrder.supplier.placeHolder'
                    )}
                    onSelect={(value) => setFieldValue('supplier', value)}
                  >
                    {supplier?.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.productPurchaseOrder.createdBy')}
                  name={'createdBy'}
                >
                  <Select
                    defaultValue={t(
                      'products.productPurchaseOrder.createdBy.placeHolder'
                    )}
                    onSelect={(value) => setFieldValue('createdBy', value)}
                  >
                    {createdBy.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.productPurchaseOrder.location')}
                  name={'location'}
                >
                  <Input
                    placeholder={t(
                      'products.productPurchaseOrder.location.placeHolder'
                    )}
                    name="location"
                  />
                </AntForm.Item>

                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.productPurchaseOrder.totalCost')}
                  name={'totalCost'}
                >
                  <Input type={'number'} name={'totalCost'} defaultValue={0} />
                </AntForm.Item>
              </div>
              <div className="footerBtnInput">
                <div>
                  <Button
                    type="default"
                    size="large"
                    onClick={() => {
                      onClose()
                      setShowModal(false)
                    }}
                  >
                    {t('common-label-cancel')}
                  </Button>
                </div>
                <div>
                  <Button
                    type="primary"
                    size="large"
                    disabled={!isValid}
                    onClick={() => {
                      setShowModal(false)
                      onSaveChanges(values)
                    }}
                  >
                    {t('common-label-create')}
                  </Button>
                </div>
              </div>
            </AntForm>
          </BasicModal>
        )
      }}
    </Formik>
  )
}
