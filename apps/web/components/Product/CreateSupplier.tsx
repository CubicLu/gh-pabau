import type { SupplierCategory, User } from '@pabau/graphql'
import { FullScreenReportModal, Button, OperationType } from '@pabau/ui'
import { Formik } from 'formik'
import { Form as AntForm, Input, Select } from 'formik-antd'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/products/list.module.less'
const { Option } = Select

export interface ISupplier {
  id?: number
  supplier_name: string
  products_assigned?: number
  organisation_status?: number
}

interface P {
  visible: boolean
  supplier: ISupplier
  users: Pick<User, 'id' | 'full_name'>[]
  categories: Pick<SupplierCategory, 'id' | 'category_name'>[]
  onSave: (stockTakeData: ISupplier) => void
  onUpdate: (stockTakeData: ISupplier) => void
  onClose: () => void
}
export const CreateSupplier = ({
  visible,
  onSave,
  onClose,
  onUpdate,
  supplier,
  users,
  categories,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [showModal, setShowModal] = useState(false)
  const initialValues: ISupplier = {
    supplier_name: '',
    organisation_status: 5,
  }
  const [formikDefault, setFormikDefault] = useState<ISupplier>(initialValues)

  useEffect(() => {
    setShowModal(visible)
  }, [visible])
  const validationSchema = Yup.object({
    supplier_name: Yup.string().required(
      t('products.supplier.organisation_name.required')
    ),
    organisation_number: Yup.string().required(
      t('products.supplier.organisation_number.required')
    ),
    organisation_owner: Yup.number().required(
      t('products.supplier.organisation_owner.required')
    ),
  })

  useEffect(() => {
    if (supplier?.id) {
      setFormikDefault({
        id: supplier?.id,
        supplier_name: supplier?.supplier_name,
        products_assigned: supplier?.products_assigned,
      })
    }
  }, [supplier])

  return (
    <Formik
      initialValues={formikDefault}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        values?.id ? onSave(values) : onUpdate(values)
        resetForm()
      }}
    >
      {({ values, resetForm, isValid, errors }) => {
        return (
          <FullScreenReportModal
            visible={showModal}
            title={t('products.Supplier.title')}
            operations={[OperationType.active, OperationType.create]}
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
                  label={t('products.Supplier.supplierName')}
                  name={'supplier_name'}
                >
                  <Input
                    name={'supplier_name'}
                    placeholder={t(
                      'products.Supplier.supplierName.placeHolder'
                    )}
                  />
                </AntForm.Item>
                <AntForm.Item
                  className={styles.customCommon}
                  label={t('products.Supplier.vatRegistryId')}
                  name={'vat_registry_id'}
                >
                  <Input name={'vat_registry_id'} />
                </AntForm.Item>
                <div>
                  <label>{t('products.Supplier.user')}</label>
                  <Select
                    name="user"
                    placeholder={t('products.Supplier.user.placeholder')}
                  >
                    {users?.map((user) => (
                      <Option key={user?.id} value={user?.id}>
                        {user?.full_name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label>{t('products.Supplier.category')}</label>
                  <Select
                    name="category"
                    placeholder={t('products.Supplier.category.placeholder')}
                  >
                    {categories?.map((category) => (
                      <Option key={category?.id} value={category?.id}>
                        {category?.category_name}
                      </Option>
                    ))}
                  </Select>
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
                      onSave(values)
                    }}
                  >
                    {t('common-label-create')}
                  </Button>
                </div>
              </div>
            </AntForm>
          </FullScreenReportModal>
        )
      }}
    </Formik>
  )
}
