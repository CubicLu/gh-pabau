import { BasicModal, Button } from '@pabau/ui'
import { DatePicker, Select } from 'antd'
import { Input } from 'formik-antd'
import React, { useEffect, useState } from 'react'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/products/list.module.less'
import { Form as AntForm } from 'formik-antd'
import { Formik } from 'formik'
import * as Yup from 'yup'

const { Option } = Select

interface DiscrepanciesProps {
  discrepanciesUp: number
  discrepanciesDown: number
}

interface NewStockTake {
  countNumber: string
  name: string
  startDate: Date
  countedBy: string
  location: string
  total: number
  Discrepancies: DiscrepanciesProps
}

interface P {
  visible: boolean
  onSaveChanges: (stockTakeData) => void
  onClose: () => void
}

export const CreateStockTake = ({
  visible,
  onSaveChanges,
  onClose,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [showModal, setShowModal] = useState(false)
  const countedBy = ['Maggie Pabau', 'Armend R', 'Boban Avramoski']
  const initialValues: NewStockTake = {
    countNumber: '',
    name: '',
    startDate: new Date(),
    countedBy: '',
    total: 0,
    location: '',
    Discrepancies: {
      discrepanciesDown: 0,
      discrepanciesUp: 0,
    },
  }
  useEffect(() => {
    setShowModal(visible)
  }, [visible])
  const validationSchema = Yup.object({
    countNumber: Yup.string().required(
      t('products.stockTake.countNumberRequired!')
    ),
    name: Yup.string().required(t('products.stockTake.nameRequired')),
    startDate: Yup.string().required(t('products.stockTake.startDateRequired')),
    countedBy: Yup.string().required(t('products.stockTake.countedByRequired')),
  })

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => onSaveChanges(values)}
    >
      {({ setFieldValue, values, resetForm, isValid, errors }) => {
        return (
          <BasicModal
            visible={showModal}
            modalWidth={450}
            wrapClassName="addProductCategoryModal"
            title={t('products.stockTake.title')}
            onCancel={() => {
              resetForm()
              onClose()
              setShowModal(false)
            }}
          >
            <AntForm layout={'vertical'} requiredMark={false}>
              <div className={styles.newCountModal}>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.stockTake.countNumber')}
                  name={'countNumber'}
                >
                  <Input
                    name={'countNumber'}
                    placeholder={t(
                      'products.stockTake.countNumber.placeHolder'
                    )}
                  />
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.stockTake.name')}
                  name={'name'}
                >
                  <Input
                    placeholder={t('products.stockTake.name.placeHolder')}
                    name="name"
                  />
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('Start Date')}
                  name={'startDate'}
                >
                  <DatePicker
                    onChange={(date, dateString) =>
                      setFieldValue('startDate', dateString)
                    }
                    name={'startDate'}
                    format={'DD/MM/YY'}
                    placeholder={'DD/MM/YYYY'}
                  />
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.stockTake.countedBy')}
                  name={'countedBy'}
                >
                  <Select
                    defaultValue={t('products.stockTake.countedBy.placeHolder')}
                    onSelect={(value) => setFieldValue('countedBy', value)}
                  >
                    {countedBy.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={'Location'}
                  name={'location'}
                >
                  <Input
                    placeholder={t('products.stockTake.location.placeHolder')}
                    name="location"
                  />
                </AntForm.Item>
                <div className={styles.discrepancies}>
                  <div>
                    <AntForm.Item
                      className={styles.customCommon}
                      label={t('products.stockTake.discrepanciesUp')}
                      name={'discrepancies'}
                    >
                      <Input
                        type={'number'}
                        name={'discrepanciesUp'}
                        defaultValue={0}
                      />
                    </AntForm.Item>
                  </div>
                  <div className={styles.discrepanciesDown}>
                    <AntForm.Item
                      className={styles.customCommon}
                      label={t('products.stockTake.discrepanciesDown')}
                      name={'discrepanciesDown'}
                    >
                      <Input
                        type={'number'}
                        name={'discrepanciesDown'}
                        defaultValue={0}
                      />
                    </AntForm.Item>
                  </div>
                </div>
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
