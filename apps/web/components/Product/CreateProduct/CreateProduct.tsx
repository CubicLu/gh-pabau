import {
  PictureOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import type { Tax, CmProductCustomField } from '@pabau/graphql'
import {
  AccountManager,
  CategoryFragment,
  FindManyLocationsWithAvailableStockResult,
  InvProductWithQuantitySumResult,
  useProductCustomFieldsQuery,
} from '@pabau/graphql'
import {
  Button,
  CurrencyInput,
  FullScreenReportModal,
  ImageSelectorModal,
  OperationType,
  PhoneNumberInput,
  DatePicker,
} from '@pabau/ui'
import { InputNumber, Tooltip, Checkbox } from 'antd'
import { Formik } from 'formik'
import { Form, Input, Select, Radio } from 'formik-antd'
import React, { useEffect, useState, useContext } from 'react'
import { NumberFormatValues } from 'react-number-format'
import { UserContext } from '../../../context/UserContext'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import styles from './CreateProduct.module.less'
import dayjs from 'dayjs'
import stringToCurrencySignConverter from '../../../helper/stringToCurrencySignConverter'

const { Option } = Select

export type Product = InvProductWithQuantitySumResult & {
  tax?: string
  supplier: string
  locations?: {
    id: number
    max: number
  }[]
}

type CustomField = {
  id: number
  value: string
}

export interface P {
  defaultCustomField: Pick<
    CmProductCustomField,
    'id' | 'custom_field_id' | 'custom_field_value'
  >[]
  loading: boolean
  taxes: Pick<Tax, 'id' | 'name' | 'rate'>[]
  categories: CategoryFragment[]
  suppliers: Pick<AccountManager, 'id' | 'organisation_name'>[]
  locations: Pick<
    FindManyLocationsWithAvailableStockResult,
    'id' | 'name' | 'quantity'
  >[]
  visible?: boolean
  product: Product
  onClose: () => void
  onSave: (values: Partial<Product>, customFields: CustomField[]) => void
  onEdit: (values: Partial<Product>, customFields: CustomField[]) => void
  onDelete: (product: number) => void
  action: 'Create' | 'Edit'
}

const defaultValue: Partial<Product> = {
  id: null,
  sku: '',
  code: '',
  category_id: null,
  size: '',
  name: '',
  Description: '',
  alert_quantity: 0,
  cost: 0,
  price: 0,
  max_level: 0,
  supplier: '',
  image: null,
  allow_negative_qty: null,
}

export const CreateProduct = ({
  loading,
  taxes,
  categories,
  suppliers,
  locations,
  visible,
  defaultCustomField,
  action,
  product,
  onClose,
  onSave,
  onEdit,
  onDelete,
}: P): JSX.Element => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [initialValue, setInitialValue] = useState(defaultValue)
  const {
    data: customFields,
    loading: fetchingCustomFields,
  } = useProductCustomFieldsQuery()

  useEffect(() => {
    setShowModal(visible)
  }, [visible])

  useEffect(() => {
    action === 'Edit'
      ? setInitialValue({
          id: product?.id,
          sku: product?.sku,
          code: product?.code,
          size: product?.size,
          is_active: product?.is_active,
          name: product?.name,
          category_id: product?.category_id,
          category_name:
            categories?.find(
              (category) => category?.id === product?.category_id
            )?.name ?? '',
          Description: product?.Description,
          supplier: suppliers?.find(
            (supplier) => supplier?.id === product?.supplier_id
          )?.organisation_name,
          tax: taxes?.find((tax) => tax?.id === product?.VATRate_id)?.name,
          cost: product?.cost,
          max_level: product?.max_level,
          price: product?.price,
          image: `https://cdn.pabau.com/cdn/${product?.image}` ?? null,
          alert_quantity: product?.alert_quantity,
          allow_negative_qty: product?.allow_negative_qty,
        })
      : setInitialValue(defaultValue)
  }, [categories, product, suppliers, taxes, action])

  const customFieldDefaultValue = (id: number) => {
    const defaultValue = defaultCustomField?.find?.(
      (field) => field?.custom_field_id === id
    )
    return defaultValue?.custom_field_value ?? null
  }
  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize={true}
      validationSchema={Yup.object({
        name: Yup.string()
          .required(t('ui.create.product.name.validate.required'))
          .min(
            2,
            t('crud-table-input-min-length-validate', {
              what: t('ui.create.product.name.validate'),
              min: 2,
            })
          )
          .max(
            50,
            t('crud-table-input-max-length-validate', {
              max: 50,
            })
          ),
        category_name: Yup.string().required(
          t('ui.create.product.category.validate.required')
        ),
        code: Yup.string()
          .min(
            2,
            t('crud-table-input-min-length-validate', {
              what: t('general.term.product'),
              min: 2,
            })
          )
          .max(
            50,
            t('crud-table-input-max-length-validate', {
              max: 50,
            })
          ),
        sku: Yup.string()
          .min(
            5,
            t('crud-table-input-min-length-validate', {
              what: t('ui.create.product.sku.validate'),
              min: 5,
            })
          )
          .max(
            55,
            t('crud-table-input-max-length-validate', {
              max: 55,
            })
          ),
        image: Yup.string().required(
          t('ui.create.product.image.validate.required')
        ),
        price: Yup.number().required(
          t('ui.create.product.retail.validate.required')
        ),
        alert_quantity: Yup.number().moreThan(
          -1,
          t('ui.create.product.minstock.validate.more')
        ),
        max_level: Yup.number().moreThan(
          -1,
          t('ui.create.product.maxstock.validate.more')
        ),
      })}
      onSubmit={(values) => {
        const customFields: CustomField[] = []
        for (const [key, value] of Object.entries(values)) {
          if (key?.toString()?.includes('customField-')) {
            customFields.push({
              id: Number(key?.replace('customField-', '')),
              value: value?.toString(),
            })
          }
        }
        values?.id ? onEdit(values, customFields) : onSave(values, customFields)
      }}
    >
      {({ setFieldValue, values, isValid, resetForm, submitForm }) => (
        <FullScreenReportModal
          visible={showModal}
          onDelete={() => onDelete(values?.id)}
          activated={Boolean(values?.is_active)}
          deleteBtnText={t('common-label-delete')}
          title={
            product?.id
              ? t('ui.edit.product.title')
              : t('ui.create.product.title')
          }
          operations={[
            OperationType.active,
            OperationType.create,
            OperationType.delete,
          ]}
          createBtnText={
            product?.id ? t('common-label-edit') : t('common-label-create')
          }
          activeBtnText={t('common-label-active')}
          enableCreateBtn={!loading && isValid}
          subMenu={[
            t('ui.create.product.tab.general'),
            t('ui.create.product.tab.pricing'),
            t('ui.create.product.tab.inventory'),
            t('ui.create.product.tab.advanced'),
          ]}
          onBackClick={() => {
            resetForm()
            onClose()
            setShowModal(false)
          }}
          onActivated={(val) => setFieldValue('is_active', val)}
          onCreate={() => submitForm()}
        >
          <Form layout="vertical">
            <div className={styles.createProductGeneral}>
              <div className={styles.createProductSection}>
                <h2 className={styles.createProductSectionTitle}>
                  {t('ui.create.product.general')}
                </h2>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.general.name')}
                    name="name"
                  >
                    <Input
                      name="name"
                      placeholder={t(
                        'ui.create.product.general.name.placeholder'
                      )}
                    />
                  </Form.Item>
                </div>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.general.category')}
                    name="category"
                  >
                    <Select
                      name="category_name"
                      placeholder={t(
                        'ui.create.product.general.category.placeholder'
                      )}
                      onSelect={(key, val) => {
                        setFieldValue('category', val.value)
                        setFieldValue('category_id', Number(val.key))
                      }}
                    >
                      {categories?.map((item) => (
                        <Option key={item?.id} value={item?.name}>
                          {item?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.general.barcode')}
                    name="code"
                  >
                    <Input
                      name="code"
                      placeholder={t(
                        'ui.create.product.general.barcode.placeholder'
                      )}
                    />
                  </Form.Item>
                </div>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.general.sku')}
                    name="sku"
                  >
                    <Input
                      name="sku"
                      placeholder={t(
                        'ui.create.product.general.sku.placeholder'
                      )}
                    />
                  </Form.Item>
                </div>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.general.size')}
                    name="size"
                  >
                    <Input
                      name="size"
                      placeholder={t(
                        'ui.create.product.general.size.placeholder'
                      )}
                    />
                  </Form.Item>
                </div>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.general.supplier')}
                    name="supplier"
                  >
                    <Select
                      name="supplier"
                      placeholder={t(
                        'ui.create.product.general.supplier.placeholder'
                      )}
                    >
                      {suppliers?.map((item) => (
                        <Option key={item?.id} value={item?.id}>
                          {item?.organisation_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.general.description')}
                    name="Description"
                  >
                    <Input.TextArea
                      name="Description"
                      placeholder={t(
                        'ui.create.product.general.description.placeholder'
                      )}
                      rows={4}
                    />
                  </Form.Item>
                </div>
                <div
                  className={styles.createProductSectionItem}
                  style={{ marginBottom: '8px' }}
                >
                  <Form.Item
                    label={t('ui.create.product.general.image')}
                    name="image"
                  >
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => setShowImageSelector(true)}
                    >
                      {t('ui.create.product.general.image.choose')}
                    </Button>
                  </Form.Item>
                </div>
                <div
                  className={styles.createProductImageContainer}
                  style={{ backgroundImage: `url(${values.image})` }}
                >
                  {!values?.image && (
                    <PictureOutlined
                      style={{
                        color: 'var(--light-grey-color)',
                        fontSize: '32px',
                      }}
                    />
                  )}
                </div>
              </div>
              <ImageSelectorModal
                visible={showImageSelector}
                initialSearch={values?.name}
                onCancel={() => setShowImageSelector(false)}
                onOk={(image) => {
                  setShowImageSelector(false)
                  setFieldValue('image', image.source)
                }}
                attachButtonText={t('ui.imageselector.attach')}
                title={t('ui.imageselector.title')}
                chooseButtonText={t('ui.imageselector.choose')}
              />
            </div>
          </Form>
          <Form layout="vertical">
            <div className={styles.createProductPricing}>
              <div className={styles.createProductSection}>
                <h2 className={styles.createProductSectionTitle}>
                  {t('ui.create.product.pricing')}
                </h2>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.pricing.cost')}
                    name="cost"
                  >
                    <CurrencyInput
                      unit={stringToCurrencySignConverter(
                        user?.me?.company?.details?.currency
                      )}
                      value={values?.cost}
                      onChange={(val: NumberFormatValues) =>
                        setFieldValue('cost', val.value)
                      }
                    />
                  </Form.Item>
                </div>
                <div className={styles.createProductSectionItem}>
                  <Form.Item
                    label={t('ui.create.product.pricing.retail')}
                    name="price"
                  >
                    <CurrencyInput
                      unit={stringToCurrencySignConverter(
                        user?.me?.company?.details?.currency
                      )}
                      value={values?.price}
                      onChange={(val: NumberFormatValues) =>
                        setFieldValue('price', val.value)
                      }
                    />
                  </Form.Item>
                </div>
                <div
                  className={styles.createProductSectionItem}
                  style={{ margin: 0 }}
                >
                  <Form.Item
                    label={t('ui.create.product.pricing.defaulttax')}
                    name="tax"
                  >
                    <Select
                      name="tax"
                      placeholder={t(
                        'ui.create.product.pricing.defaulttax.placeholder'
                      )}
                    >
                      <Option selected value="default-tax-setting">
                        {t('ui.create.product.pricing.defaulttax.default')}
                      </Option>
                      {taxes?.map((item) => (
                        <Option key={item?.id} value={item?.id}>
                          {item?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
          <Form layout="vertical">
            <div className={styles.createProductInventoryLevels}>
              <div className={styles.createProductSection}>
                <h2 className={styles.createProductSectionTitle}>
                  {t('ui.create.product.inventory.reorder')}
                </h2>
                <div className={styles.createProductSectionDoubleItems}>
                  <div>
                    <Form.Item
                      label={t('ui.create.product.inventory.reorder.minstock')}
                      name="alert_quantity"
                    >
                      <InputNumber
                        name={'alert_quantity'}
                        type="number"
                        placeholder="0"
                        value={values?.alert_quantity}
                        onChange={(value) =>
                          setFieldValue('alert_quantity', Number(value))
                        }
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label={t('ui.create.product.inventory.reorder.maxstock')}
                      name="max_level"
                    >
                      <InputNumber
                        name={'max_level'}
                        type="number"
                        placeholder="0"
                        value={values?.max_level}
                        onChange={(value) =>
                          setFieldValue('max_level', Number(value))
                        }
                      />
                    </Form.Item>
                  </div>
                </div>
                <div
                  className={styles.createProductSectionItem}
                  style={{ margin: 0 }}
                >
                  <Checkbox defaultChecked={true}>
                    {t('ui.create.product.inventory.reorder.alert')}
                    <Tooltip
                      title={t(
                        'ui.create.product.inventory.reorder.alert.tooltip'
                      )}
                    >
                      <QuestionCircleOutlined
                        style={{ color: 'var(--light-grey-color)' }}
                      />
                    </Tooltip>
                  </Checkbox>
                </div>
              </div>
              <div className={styles.createProductSection}>
                <h2 className={styles.createProductSectionTitle}>
                  {t('ui.create.product.inventory.current')}
                </h2>
                <div className={styles.stockLevelsHeader}>
                  <div>{t('ui.create.product.inventory.current.name')}</div>
                  <div />
                  <div>{t('ui.create.product.inventory.quantity')}</div>
                </div>
                {locations?.map((location) => (
                  <div className={styles.stockLevelsItem} key={location?.id}>
                    <div>{location?.name}</div>
                    <div />
                    <div>
                      <InputNumber
                        type="number"
                        placeholder="0"
                        defaultValue={location?.quantity}
                        onChange={(val) =>
                          setFieldValue(`locations.${location?.id}`, {
                            id: location?.id,
                            max: val,
                          })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Form>
          <Form layout="vertical">
            <div className={styles.createProductAdvanced}>
              <div className={styles.createProductSection}>
                <h2 className={styles.createProductSectionTitle}>
                  {t('ui.create.product.advanced')}
                </h2>
                <div className={styles.createProductSectionDoubleItems}>
                  <div>
                    <div className={styles.customFieldForm}>
                      <Form
                        className={styles.customFormInput}
                        layout={'vertical'}
                        requiredMark={false}
                      >
                        {!fetchingCustomFields &&
                          customFields?.findManyManageCustomField?.map(
                            (item) => (
                              <div key={item.field_label}>
                                {item.field_type !== 'phone' && (
                                  <p>{item.field_label}</p>
                                )}
                                <Form.Item name={`customField-${item.id}`}>
                                  {item.field_type === 'string' ||
                                  item.field_type === 'email' ? (
                                    <Input
                                      defaultValue={customFieldDefaultValue(
                                        item?.id
                                      )}
                                      size={'middle'}
                                      name={`customField-${item.id}`}
                                    />
                                  ) : item.field_type === 'text' ? (
                                    <Input.TextArea
                                      defaultValue={customFieldDefaultValue(
                                        item?.id
                                      )}
                                      name={`customField-${item.id}`}
                                      rows={4}
                                    />
                                  ) : item.field_type === 'number' ? (
                                    <Input
                                      name={`customField-${item.id}`}
                                      type="number"
                                      size="large"
                                      defaultValue={customFieldDefaultValue(
                                        item?.id
                                      )}
                                      onChange={(value) =>
                                        setFieldValue(
                                          `customField-${item.id}`,
                                          typeof value === 'number' ? value : 0
                                        )
                                      }
                                    />
                                  ) : item.field_type === 'multiple' ? (
                                    <Checkbox.Group
                                      name={`customField-${item.id}`}
                                      options={
                                        item?.ManageCustomFieldItem?.length > 0
                                          ? item.ManageCustomFieldItem.map(
                                              (item) => item.item_label
                                            )
                                          : []
                                      }
                                    />
                                  ) : item.field_type === 'bool' ? (
                                    <Radio.Group
                                      name={`customField-${item.id}`}
                                    >
                                      {item.ManageCustomFieldItem?.map(
                                        (option) => (
                                          <Radio
                                            key={option?.id}
                                            defaultValue={customFieldDefaultValue(
                                              item?.id
                                            )}
                                            value={option.item_label}
                                            name={`customField-${item.id}`}
                                          >
                                            {option.item_label}
                                          </Radio>
                                        )
                                      )}
                                    </Radio.Group>
                                  ) : item.field_type === 'list' ? (
                                    <Select name={`customField-${item.id}`}>
                                      {item?.ManageCustomFieldItem?.map(
                                        (item) => (
                                          <Select.Option
                                            key={item.id}
                                            defaultValue={customFieldDefaultValue(
                                              item?.id
                                            )}
                                            value={item.item_label}
                                          >
                                            {item.item_label}
                                          </Select.Option>
                                        )
                                      )}
                                    </Select>
                                  ) : item.field_type === 'date' ? (
                                    <DatePicker
                                      name={`customField-${item?.id}`}
                                      key={item.id}
                                      format={'DD/MM/YY'}
                                      value={
                                        values?.[`customField-${item?.id}`]
                                          ? dayjs(
                                              values?.[
                                                `customField-${item?.id}`
                                              ]?.toString()
                                            )
                                          : undefined
                                      }
                                      onChange={(date) =>
                                        setFieldValue(
                                          `customField-${item?.id}`,
                                          date
                                        )
                                      }
                                      placeholder={t(
                                        'products.list.product.customField.date.placeholder'
                                      )}
                                    />
                                  ) : item.field_type === 'phone' ? (
                                    <PhoneNumberInput
                                      key={item.id}
                                      label={item.field_label}
                                      value={
                                        values?.[`customField-${item?.id}`]
                                          ? values?.[
                                              `customField-${item?.id}`
                                            ]?.toString()
                                          : undefined
                                      }
                                      onChange={(value) =>
                                        setFieldValue(
                                          `customField-${item?.id}`,
                                          value
                                        )
                                      }
                                    />
                                  ) : null}
                                </Form.Item>
                              </div>
                            )
                          )}
                      </Form>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.createProductSectionItem}
                  style={{ margin: 0 }}
                >
                  <Checkbox
                    defaultChecked={false}
                    onChange={(value) =>
                      setFieldValue('allow_negative_qty', value)
                    }
                    name={'allow_negative_qty'}
                  >
                    {t('ui.create.product.advanced.allow')}
                  </Checkbox>
                </div>
              </div>
            </div>
          </Form>
        </FullScreenReportModal>
      )}
    </Formik>
  )
}

export default CreateProduct
