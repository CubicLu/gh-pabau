import React, { FC, useState, useEffect } from 'react'
import { NumberFormatValues } from 'react-number-format'
import {
  Button,
  Input,
  FullScreenReportModal,
  OperationType,
  ImageSelectorModal,
  Checkbox,
  CurrencyInput,
} from '@pabau/ui'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form, Select, Tooltip, Input as AntInput, InputNumber } from 'antd'
import {
  PlusOutlined,
  QuestionCircleOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import styles from './CreateProduct.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const { Option } = Select

export interface CreateProductProps {
  incrementDefaults: Array<string>
  plotColors: Array<string>
  locations: Array<string>
  supplierNames: Array<string>
  categories: Array<string>
  taxNames: Array<string>
  visible: boolean
  onClose: () => void
  onSaveChanges?: () => void
}

export const CreateProduct: FC<CreateProductProps> = ({
  incrementDefaults,
  plotColors,
  locations,
  supplierNames,
  categories,
  taxNames,
  visible,
  onClose,
  onSaveChanges,
}) => {
  const { t } = useTranslationI18()
  const [form] = Form.useForm()
  const [active, setActive] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const formikInitialValues = {
    sku: '',
    barcode: '',
    category: '',
    size: '',
    name: '',
    supplierName: '',
    description: '',
    costPrice: '',
    retailPrice: '',
    taxName: 'default-tax-setting',
    plotColor: '',
    incrementDefault: '',
    minStockLevel: 0,
    maxStockLevel: 0,
    selectedImage: '',
  }
  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: Yup.object({
      sku: Yup.string().required(t('ui.create.product.sku.validate.required')),
      barcode: Yup.string().required(
        t('ui.create.product.barcode.validate.required')
      ),
      category: Yup.string().required(
        t('ui.create.product.category.validate.required')
      ),
      size: Yup.string().required(
        t('ui.create.product.size.validate.required')
      ),
      name: Yup.string().required(
        t('ui.create.product.name.validate.required')
      ),
      supplierName: Yup.string().required(
        t('ui.create.product.supplier.validate.required')
      ),
      costPrice: Yup.string().required(
        t('ui.create.product.cost.validate.required')
      ),
      retailPrice: Yup.string().required(
        t('ui.create.product.retail.validate.required')
      ),
      taxName: Yup.string().required(
        t('ui.create.product.tax.validate.required')
      ),
      plotColor: Yup.string().required(
        t('ui.create.product.plot.validate.required')
      ),
      incrementDefault: Yup.string().required(
        t('ui.create.product.increment.validate.required')
      ),
      selectedImage: Yup.string().required(
        t('ui.create.product.image.validate.required')
      ),
      minStockLevel: Yup.number()
        .required(t('ui.create.product.minstock.validate.required'))
        .moreThan(0, t('ui.create.product.minstock.validate.more')),
      maxStockLevel: Yup.number()
        .required(t('ui.create.product.maxstock.validate.required'))
        .moreThan(0, t('ui.create.product.maxstock.validate.more')),
    }),
    onSubmit: (values) => {
      console.log('Values >>>', values)
    },
  })
  const handleChange = (key, value) => {
    formik.setFieldValue(key, value)
  }
  useEffect(() => {
    setShowModal(visible)
  }, [visible])
  return (
    <FullScreenReportModal
      visible={showModal}
      title={t('ui.create.product.title')}
      operations={[OperationType.active, OperationType.create]}
      activated={active}
      createBtnText={t('common-label-create')}
      activeBtnText={
        active ? t('common-label-active') : t('common-label-inactive')
      }
      enableCreateBtn={true}
      subMenu={[
        t('ui.create.product.tab.general'),
        t('ui.create.product.tab.pricing'),
        t('ui.create.product.tab.inventory'),
        t('ui.create.product.tab.advanced'),
      ]}
      onBackClick={() => {
        setShowModal(false)
        formik.setValues(formikInitialValues)
        onClose()
      }}
      onActivated={(val) => setActive(val)}
      onCreate={() => {
        if (formik.isValid) {
          onSaveChanges?.()
          setShowModal(false)
          formik.setValues(formikInitialValues)
        } else {
          console.log(formik.errors)
        }
      }}
    >
      <Form form={form} layout="vertical">
        <div className={styles.createProductGeneral}>
          <div className={styles.createProductSection}>
            <h2 className={styles.createProductSectionTitle}>
              {t('ui.create.product.general')}
            </h2>
            <div className={styles.createProductSectionItem}>
              <Input
                label={t('ui.create.product.general.name')}
                placeHolderText={t(
                  'ui.create.product.general.name.placeholder'
                )}
                text={formik.values.name}
                onChange={(val) => handleChange('name', val)}
              />
            </div>
            <div className={styles.createProductSectionItem}>
              <Form.Item label={t('ui.create.product.general.category')}>
                <Select
                  placeholder={t(
                    'ui.create.product.general.category.placeholder'
                  )}
                  onSelect={(val) => handleChange('category', val)}
                  defaultValue={formik.values.category}
                >
                  {categories.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className={styles.createProductSectionItem}>
              <Input
                label={t('ui.create.product.general.barcode')}
                placeHolderText={t(
                  'ui.create.product.general.barcode.placeholder'
                )}
                text={formik.values.barcode}
                onChange={(val) => handleChange('barcode', val)}
              />
            </div>
            <div className={styles.createProductSectionItem}>
              <Input
                label={t('ui.create.product.general.sku')}
                placeHolderText={t('ui.create.product.general.sku.placeholder')}
                text={formik.values.sku}
                onChange={(val) => handleChange('sku', val)}
              />
            </div>
            <div className={styles.createProductSectionItem}>
              <Input
                label={t('ui.create.product.general.size')}
                placeHolderText={t(
                  'ui.create.product.general.size.placeholder'
                )}
                text={formik.values.size}
                onChange={(val) => handleChange('size', val)}
              />
            </div>
            <div className={styles.createProductSectionItem}>
              <Form.Item label={t('ui.create.product.general.supplier')}>
                <Select
                  placeholder={t(
                    'ui.create.product.general.supplier.placeholder'
                  )}
                  onSelect={(val) => handleChange('supplierName', val)}
                  defaultValue={formik.values.supplierName}
                >
                  {supplierNames.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className={styles.createProductSectionItem}>
              <Form.Item label={t('ui.create.product.general.description')}>
                <AntInput.TextArea
                  placeholder={t(
                    'ui.create.product.general.description.placeholder'
                  )}
                  rows={4}
                  value={formik.values.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </Form.Item>
            </div>
            <div
              className={styles.createProductSectionItem}
              style={{ marginBottom: '8px' }}
            >
              <Form.Item label={t('ui.create.product.general.image')}>
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
              style={{ backgroundImage: `url(${formik.values.selectedImage})` }}
            >
              {!formik.values.selectedImage && (
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
            initialSearch={formik.values.name}
            onCancel={() => setShowImageSelector(false)}
            onOk={(image) => {
              setShowImageSelector(false)
              handleChange('selectedImage', image.source)
            }}
            attachButtonText={t('ui.imageselector.attach')}
            title={t('ui.imageselector.title')}
            chooseButtonText={t('ui.imageselector.choose')}
          />
        </div>
      </Form>
      <Form form={form} layout="vertical">
        <div className={styles.createProductPricing}>
          <div className={styles.createProductSection}>
            <h2 className={styles.createProductSectionTitle}>
              {t('ui.create.product.pricing')}
            </h2>
            <div className={styles.createProductSectionItem}>
              <Form.Item label={t('ui.create.product.pricing.cost')}>
                <CurrencyInput
                  unit="£"
                  value={formik.values.costPrice}
                  onChange={(val: NumberFormatValues) =>
                    handleChange('costPrice', val.value)
                  }
                />
              </Form.Item>
            </div>
            <div className={styles.createProductSectionItem}>
              <Form.Item label={t('ui.create.product.pricing.retail')}>
                <CurrencyInput
                  unit="£"
                  value={formik.values.retailPrice}
                  onChange={(val: NumberFormatValues) =>
                    handleChange('retailPrice', val.value)
                  }
                />
              </Form.Item>
            </div>
            <div
              className={styles.createProductSectionItem}
              style={{ margin: 0 }}
            >
              <Form.Item label={t('ui.create.product.pricing.defaulttax')}>
                <Select
                  placeholder={t(
                    'ui.create.product.pricing.defaulttax.placeholder'
                  )}
                  onSelect={(val) => handleChange('taxName', val)}
                  defaultValue={formik.values.taxName}
                >
                  <Option selected value="default-tax-setting">
                    {t('ui.create.product.pricing.defaulttax.default')}
                  </Option>
                  {taxNames.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
      <Form form={form} layout="vertical">
        <div className={styles.createProductInventoryLevels}>
          <div className={styles.createProductSection}>
            <h2 className={styles.createProductSectionTitle}>
              {t('ui.create.product.inventory.reorder')}
            </h2>
            <div className={styles.createProductSectionDoubleItems}>
              <div>
                <Form.Item
                  label={t('ui.create.product.inventory.reorder.minstock')}
                >
                  <InputNumber
                    type="number"
                    placeholder="0"
                    value={formik.values.minStockLevel}
                    onChange={(value) =>
                      handleChange('minStockLevel', Number(value))
                    }
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label={t('ui.create.product.inventory.reorder.maxstock')}
                >
                  <InputNumber
                    type="number"
                    placeholder="0"
                    value={formik.values.maxStockLevel}
                    onChange={(value) =>
                      handleChange('maxStockLevel', Number(value))
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
                  title={t('ui.create.product.inventory.reorder.alert.tooltip')}
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
              <div>{t('ui.create.product.inventory.current.min')}</div>
              <div>{t('ui.create.product.inventory.current.max')}</div>
            </div>
            {locations.map((location) => (
              <div className={styles.stockLevelsItem} key={location}>
                <div>{location}</div>
                <div>
                  <InputNumber type="number" placeholder="0" />
                </div>
                <div>
                  <InputNumber type="number" placeholder="0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Form>
      <Form form={form} layout="vertical">
        <div className={styles.createProductAdvanced}>
          <div className={styles.createProductSection}>
            <h2 className={styles.createProductSectionTitle}>
              {t('ui.create.product.advanced')}
            </h2>
            <div className={styles.createProductSectionDoubleItems}>
              <div>
                <Form.Item label={t('ui.create.product.advanced.increment')}>
                  <Select
                    placeholder={t(
                      'ui.create.product.advanced.increment.placeholder'
                    )}
                    onSelect={(val) => handleChange('incrementDefault', val)}
                    defaultValue={formik.values.incrementDefault}
                  >
                    {incrementDefaults.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item label={t('ui.create.product.advanced.plot')}>
                  <Select
                    placeholder={t(
                      'ui.create.product.advanced.plot.placeholder'
                    )}
                    onSelect={(val) => handleChange('plotColor', val)}
                    defaultValue={formik.values.plotColor}
                  >
                    {plotColors.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div
              className={styles.createProductSectionItem}
              style={{ margin: 0 }}
            >
              <Checkbox defaultChecked={false}>
                {t('ui.create.product.advanced.allow')}
              </Checkbox>
            </div>
          </div>
        </div>
      </Form>
    </FullScreenReportModal>
  )
}

export default CreateProduct
