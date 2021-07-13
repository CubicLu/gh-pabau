import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons'
import type { Tax, InvCategory } from '@pabau/graphql'
import { BasicModal, Button, ImageSelectorModal } from '@pabau/ui'
import { LabeledValue } from 'antd/lib/select'
import { Formik } from 'formik'
import { Form, Input, Select, SubmitButton, Switch } from 'formik-antd'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../../pages/products/list.module.less'

const { Option } = Select
type Category = Pick<
  InvCategory,
  'order' | 'code' | 'category_type' | 'image' | 'disabled' | 'name' | 'id'
> & { tax_id?: number }

interface P {
  loading: boolean
  visible: boolean
  category: Category
  taxes: Pick<Tax, 'id' | 'name' | 'rate'>[]
  onCreate: (categoryData: Partial<Category>) => void
  onUpdate: (categoryData: Partial<Category>) => void
  onClose: () => void
  action: 'Edit' | 'Create'
}

export const CreateCategory = ({
  loading,
  visible,
  taxes,
  category,
  onClose,
  onUpdate,
  action,
  onCreate,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const categoryType = [
    t('products.list.category.type.retail'),
    t('products.list.category.type.consumable'),
    t('products.list.category.type.injectable'),
  ]
  const defaultCategoryData: Partial<Category> = {
    name: '',
    image: '',
    code: '',
    category_type: categoryType[0],
    disabled: true,
  }
  const [formikInitialValues, setFormikInitialValues] = useState<
    Partial<Category>
  >(defaultCategoryData)

  const [newCategoryData, setNewCategoryData] = useState<Partial<Category>>(
    defaultCategoryData
  )
  const inputHandler = (
    key: string,
    value: boolean | (string | number) | LabeledValue,
    setFieldValue: (
      field: string,
      value: string | LabeledValue | boolean | number
    ) => void
  ) => {
    const data = { ...newCategoryData }
    data[key] = value
    setNewCategoryData(data)
    setFieldValue(key, value)
  }

  useEffect(() => {
    action === 'Edit' && category
      ? setFormikInitialValues({
          code: category?.code,
          disabled: category?.disabled,
          image: category?.image ?? null,
          category_type: category?.category_type,
          name: category?.name,
          id: category?.id,
        })
      : setFormikInitialValues(defaultCategoryData)
    setShowModal(visible)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, visible, action])

  return (
    <Formik
      initialValues={formikInitialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Name is  required!')
          .min(
            2,
            t('crud-table-input-min-length-validate', {
              what: 'product group name',
              min: 2,
            })
          )
          .max(
            50,
            t('crud-table-input-max-length-validate', {
              what: 'product group name',
            })
          ),
        category_type: Yup.string().required('Type is  required!'),
      })}
      onSubmit={async (values: Partial<Category>, isValid) => {
        values?.id ? onUpdate(values) : onCreate(values)
        onClose()
      }}
    >
      {({ values, setFieldValue, isValid, resetForm }) => (
        <BasicModal
          visible={showModal}
          modalWidth={438}
          wrapClassName="addProductCategoryModal"
          title={
            values?.id
              ? t('products.list.edit.category.title')
              : t('products.list.create.category.title')
          }
          onCancel={() => {
            resetForm()
            onClose()
            setShowModal(false)
          }}
        >
          <Form layout="vertical">
            <div>
              <label>{t('products.list.create.category.name')}</label>
              <Input
                size={'large'}
                type="text"
                placeholder={t(
                  'products.list.create.category.name.placeholder'
                )}
                name="name"
              />
            </div>
            <div className="chooseImageInput">
              <label>{t('products.list.create.category.image')}</label>
              <Button
                type="default"
                size="small"
                className={styles.chooseImgBtn}
                onClick={() => setShowImageSelector(true)}
              >
                <PlusOutlined />
                {t('products.list.create.category.image.choose')}
              </Button>
              {newCategoryData.image && (
                <div
                  className={styles.productCategoryImagePreview}
                  style={{ backgroundImage: `url(${newCategoryData.image})` }}
                />
              )}
            </div>
            <div>
              <label>{t('products.list.create.category.categorycode')}</label>
              <Input
                size={'large'}
                type="text"
                placeholder={t(
                  'products.list.create.category.categorycode.placeholder'
                )}
                name="code"
              />
            </div>
            <div>
              <label>{t('products.list.create.category.categorytype')}</label>
              <div className={styles.productCategoryType}>
                {categoryType.map((type) => (
                  <div
                    key={type}
                    className={
                      type === newCategoryData.category_type
                        ? styles.selected
                        : ''
                    }
                    onClick={() =>
                      inputHandler('category_type', type, setFieldValue)
                    }
                  >
                    {type}
                    <div>
                      <CheckCircleFilled />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label>{t('products.list.create.category.tax')}</label>
              <Select
                name="tax_id"
                placeholder={t('products.list.create.category.tax.placeholder')}
                onSelect={(val) => inputHandler('Tax', val, setFieldValue)}
                disabled={loading}
              >
                {taxes?.map((item) => (
                  <Option key={item?.id} value={item?.id} name="tax_id">
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="footerBtnInput">
              <div>
                <label>{t('products.list.create.category.active')}</label>
                <Switch
                  defaultChecked={newCategoryData.disabled}
                  name={'is_active'}
                  onChange={(check) =>
                    inputHandler('is_active', check, setFieldValue)
                  }
                  size="small"
                />
              </div>
              <div>
                <SubmitButton type="primary" size="large" disabled={!isValid}>
                  {values?.id
                    ? t('common-label-edit')
                    : t('common-label-create')}
                </SubmitButton>
              </div>
            </div>
            <ImageSelectorModal
              visible={showImageSelector}
              initialSearch={newCategoryData.name}
              onOk={(image) => {
                inputHandler('image', image.source, setFieldValue)
                setShowImageSelector(false)
              }}
              onCancel={() => setShowImageSelector(false)}
              title={t('ui.imageselector.title')}
              attachButtonText={t('ui.imageselector.attach')}
              chooseButtonText={t('ui.imageselector.choose')}
            />
          </Form>
        </BasicModal>
      )}
    </Formik>
  )
}
