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
import { Form, Select, Tooltip, Input as AntInput, InputNumber } from 'antd'
import {
  PlusOutlined,
  QuestionCircleOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import styles from './CreateProduct.module.less'

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
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [showImageSelector, setShowImageSelector] = useState(false)
  const formik = useFormik({
    initialValues: {
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
    },
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
      title="Create Product"
      operations={[
        OperationType.active,
        OperationType.cancel,
        OperationType.create,
      ]}
      activated={true}
      cancelBtnText="Cancel"
      createBtnText="Save changes"
      enableCreateBtn={true}
      subMenu={['General', 'Pricing', 'Inventory levels', 'Advanced']}
      onCancel={() => {
        setShowModal(false)
        onClose()
      }}
      onCreate={() => {
        onSaveChanges?.()
      }}
    >
      <Form form={form} layout="vertical">
        <div className={styles.createProductGeneral}>
          <div className={styles.createProductSection}>
            <h2 className={styles.createProductSectionTitle}>General</h2>
            <div className={styles.createProductSectionItem}>
              <Input
                label="Name"
                placeHolderText="Enter name"
                text={formik.values.name}
                onChange={(val) => handleChange('name', val)}
              />
            </div>
            <div className={styles.createProductSectionItem}>
              <Form.Item label="Category">
                <Select
                  placeholder="Select category"
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
                label="Barcode"
                placeHolderText="Enter barcode"
                text={formik.values.barcode}
                onChange={(val) => handleChange('barcode', val)}
              />
            </div>
            <div className={styles.createProductSectionItem}>
              <Input
                label="SKU"
                placeHolderText="Enter SKU"
                text={formik.values.sku}
                onChange={(val) => handleChange('sku', val)}
              />
            </div>
            <div className={styles.createProductSectionItem}>
              <Input
                label="Size"
                placeHolderText="e.g. 600 ml"
                text={formik.values.size}
                onChange={(val) => handleChange('size', val)}
              />
            </div>
            <div className={styles.createProductSectionItem}>
              <Form.Item label="Supplier Name">
                <Select
                  placeholder="Select supplier name"
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
              <Form.Item label="Description – optional">
                <AntInput.TextArea
                  placeholder="Enter description"
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
              <Form.Item label="Image">
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setShowImageSelector(true)}
                >
                  Choose from library
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
          />
        </div>
      </Form>
      <Form form={form} layout="vertical">
        <div className={styles.createProductPricing}>
          <div className={styles.createProductSection}>
            <h2 className={styles.createProductSectionTitle}>Pricing</h2>
            <div className={styles.createProductSectionItem}>
              <Form.Item label="Cost price">
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
              <Form.Item label="Retail price">
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
              <Form.Item label="Default tax rate">
                <Select
                  placeholder="Select default tax rate"
                  onSelect={(val) => handleChange('taxName', val)}
                  defaultValue={formik.values.taxName}
                >
                  <Option selected value="default-tax-setting">
                    Default tax setting
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
            <h2 className={styles.createProductSectionTitle}>Reorder Levels</h2>
            <div className={styles.createProductSectionDoubleItems}>
              <div>
                <Form.Item label="Minimum stock level">
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
                <Form.Item label="Maximum stock level">
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
                Alert team when low{' '}
                <Tooltip title="lorem ipsum">
                  <QuestionCircleOutlined
                    style={{ color: 'var(--light-grey-color)' }}
                  />
                </Tooltip>
              </Checkbox>
            </div>
          </div>
          <div className={styles.createProductSection}>
            <h2 className={styles.createProductSectionTitle}>
              Current stock levels by location
            </h2>
            <div className={styles.stockLevelsHeader}>
              <div>Name</div>
              <div>Min</div>
              <div>Max</div>
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
              Advanced additional information
            </h2>
            <div className={styles.createProductSectionDoubleItems}>
              <div>
                <Form.Item label="Increment default *custome field*">
                  <Select
                    placeholder="Select an increment"
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
                <Form.Item label="Plot colour">
                  <Select
                    placeholder="Select plot colour"
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
                Allow negative quantity in stock
              </Checkbox>
            </div>
          </div>
        </div>
      </Form>
    </FullScreenReportModal>
  )
}

export default CreateProduct
