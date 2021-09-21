import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons'
import type { Tax, InvCategory } from '@pabau/graphql'
import {
  BasicModal,
  Button,
  ImageSelectorModal,
  ConfirmationDialog,
} from '@pabau/ui'
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
  action: 'Edit' | 'Create'
  onCreate: (categoryData: Partial<Category>) => Promise<boolean>
  onUpdate: (categoryData: Partial<Category>) => Promise<boolean>
  onDelete: (id: number) => Promise<boolean>
  onClose: () => void
}

export const CreateCategory = ({
  loading,
  visible,
  taxes,
  category,
  action,
  onClose,
  onUpdate,
  onDelete,
  onCreate,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [submitting, changeSubmittingStatus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

  const categoryType: { name: string; translation: string }[] = [
    {
      name: 'retail',
      translation: t('products.list.category.type.retail'),
    },
    {
      name: 'consumable',
      translation: t('products.list.category.type.consumable'),
    },
    {
      name: 'injectables',
      translation: t('products.list.category.type.injectable'),
    },
  ]
  const defaultCategoryData: Partial<Category> = {
    name: '',
    image: '',
    code: '',
    category_type: 'retail',
    disabled: true,
    tax_id: null,
  }
  const [formikInitialValues, setFormikInitialValues] = useState<
    Partial<Category>
  >(defaultCategoryData)

  useEffect(() => {
    action === 'Edit' && category
      ? setFormikInitialValues({
          code: category?.code,
          disabled: !category?.disabled,
          image: category?.image ?? null,
          category_type: category?.category_type,
          tax_id: category?.tax_id !== 0 ? category?.tax_id : null,
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
          .required(
            t('crud-table-input-required', {
              what: t('products.list.create.category.name'),
            })
          )
          .min(
            2,
            t('crud-table-input-min-length-validate', {
              what: t('products.list.create.category.name').toLowerCase(),
              min: 2,
            })
          )
          .max(
            50,
            t('crud-table-input-max-length-validate', {
              what: t('products.list.create.category.name').toLowerCase(),
              max: 50,
            })
          ),
        category_type: Yup.string().required('Type is required!'),
      })}
      onSubmit={async (values: Partial<Category>) => {
        changeSubmittingStatus(true)
        changeSubmittingStatus(
          values?.id ? await onUpdate(values) : await onCreate(values)
        )
      }}
    >
      {({ values, setFieldValue, resetForm, isValid }) => (
        <>
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
              <Form.Item name="name">
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
              </Form.Item>
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
                {values?.image && (
                  <div
                    className={styles.productCategoryImagePreview}
                    style={{ backgroundImage: `url(${values?.image})` }}
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
              {values?.disabled === false && values?.id && (
                <Button
                  type="default"
                  size="large"
                  onClick={() => onDelete(values?.id)}
                >
                  {t('common-label-delete')}
                </Button>
              )}
              <Form.Item name="category_type">
                <div>
                  <label>
                    {t('products.list.create.category.categorytype')}
                  </label>
                  <div className={styles.productCategoryType}>
                    {categoryType?.map((type) => (
                      <div
                        key={type.name}
                        className={
                          type.name === values?.category_type
                            ? styles.selected
                            : ''
                        }
                        onClick={() =>
                          setFieldValue('category_type', type.name)
                        }
                      >
                        {type?.translation}
                        <div>
                          <CheckCircleFilled />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Form.Item>
              <div>
                <label>{t('products.list.create.category.tax')}</label>
                <Select
                  name="tax_id"
                  placeholder={t(
                    'products.list.create.category.tax.placeholder'
                  )}
                  onSelect={(val) => setFieldValue('tax_id', val)}
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
                    defaultChecked={values?.disabled}
                    name={'disabled'}
                    onChange={(check) => setFieldValue('is_active', check)}
                    size="small"
                  />
                </div>
                {values?.disabled === false && values?.id && (
                  <Button
                    type="default"
                    size="large"
                    onClick={() => {
                      setShowModal(false)
                      setShowConfirmationDialog(true)
                    }}
                  >
                    {t('common-label-delete')}
                  </Button>
                )}
                <div>
                  <SubmitButton
                    type="primary"
                    size="large"
                    disabled={submitting || !isValid}
                  >
                    {values?.id
                      ? t('common-label-save')
                      : t('common-label-create')}
                  </SubmitButton>
                </div>
              </div>
              <ImageSelectorModal
                visible={showImageSelector}
                initialSearch={values?.name}
                onOk={(image) => {
                  setFieldValue('image', image.source)
                  setShowImageSelector(false)
                }}
                onCancel={() => setShowImageSelector(false)}
                title={t('ui.imageselector.title')}
                attachButtonText={t('ui.imageselector.attach')}
                chooseButtonText={t('ui.imageselector.choose')}
              />
            </Form>
          </BasicModal>
          {showConfirmationDialog && (
            <ConfirmationDialog
              visible={showConfirmationDialog}
              title={t(
                'products.list.products.notification.category.delete.header'
              )}
              tooltip={t(
                'products.list.products.notification.category.delete.tooltip'
              )}
              loading={submitting}
              onClose={() => setShowConfirmationDialog(false)}
              onSubmit={async () => {
                changeSubmittingStatus(true)
                changeSubmittingStatus(await onDelete(values?.id))
              }}
            >
              {t('products.list.delete.category.text')}
            </ConfirmationDialog>
          )}
        </>
      )}
    </Formik>
  )
}
