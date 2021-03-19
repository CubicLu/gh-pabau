import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'
import { Formik } from 'formik'
import { Form, Input, InputNumber, SubmitButton } from 'formik-antd'
import {
  FullScreenReportModal,
  SimpleDropdown,
  OperationType,
  Button,
  Switch,
  Table,
} from '@pabau/ui'
import { Drawer } from 'antd'
import {
  TaxOption,
  buildPackagesColumnsData,
} from '../../../mocks/CoursesPackages'
import * as Yup from 'yup'
import {
  PlusOutlined,
  FilterOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import styles from './index.module.less'

export interface InitialPackagesProps {
  id: string
  packageName: string
  price: number
  tax: string
  category: string
  onlinePurchase: boolean
}

interface BuildIntialValueProps {
  service: string
  quantity: number
  price: number
}

interface DrawerContentProps {
  buildIntialValues: BuildIntialValueProps
  setDrawerVisible?(values: boolean): void
}

const buildPackagesColumns = [
  {
    title: 'Service',
    dataIndex: 'service',
    visible: true,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    visible: true,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    visible: true,
  },
  {
    title: 'Online purchase',
    dataIndex: 'onlinePurchase',
    render: function renderSourceName(val, rowData) {
      return val ? <CheckOutlined /> : ''
    },
    visible: true,
  },
]

const buildIntialValue = {
  service: '',
  quantity: undefined,
  price: undefined,
}

interface GeneralTabProps {
  setFieldValue(
    field: keyof InitialPackagesProps,
    value: string | boolean | number
  ): void
  value: InitialPackagesProps
}

const General: FC<GeneralTabProps> = ({ setFieldValue, value }) => {
  return (
    <div className={styles.generalFormWrapper}>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout="vertical"
      >
        <div className={styles.generalSection}>
          <Form.Item
            label="Package name"
            name="packageName"
            className={styles.generalList}
          >
            <Input
              size="large"
              name="packageName"
              autoComplete="off"
              placeholder="Enter package name"
              value={value.packageName}
            />
          </Form.Item>
          <Form.Item label="Price" name="price" className={styles.generalList}>
            <InputNumber
              size="large"
              name="price"
              type="number"
              autoComplete="off"
              placeholder="£"
              value={value.price}
            />
          </Form.Item>
          <SimpleDropdown
            className={styles.generalList}
            size="large"
            label="Category"
            name="category"
            value={value.category}
            placeHolderText="Select a category"
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('category', value)}
          />
          <SimpleDropdown
            className={styles.generalList}
            size="large"
            label="Tax"
            name="tax"
            value={value.tax}
            placeHolderText="Select a tax"
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('tax', value)}
          />
          <Form.Item label="Image" name="image" className={styles.generalList}>
            <Button
              className={styles.modalAddButton}
              type="default"
              icon={<PlusOutlined />}
              size="middle"
            >
              Choose from Library
            </Button>
          </Form.Item>
          <div className={styles.generalListSwitch}>
            <Switch
              checked={value.onlinePurchase}
              onChange={(checked) => setFieldValue('onlinePurchase', checked)}
            />{' '}
            <span>Enable online purchase</span>
          </div>
        </div>
      </Form>
    </div>
  )
}

const DrawerContent: FC<DrawerContentProps> = ({
  setDrawerVisible,
  buildIntialValues,
}) => {
  return (
    <Formik
      initialValues={buildIntialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        quantity: Yup.number().required('Quantity is required'),
        price: Yup.string()
          .required('Price is required')
          .matches(/^\d+$/g, 'Price should be numbers'),
      })}
      onSubmit={(values) => {
        console.log(values)
        setDrawerVisible(false)
      }}
    >
      {({ setFieldValue, handleSubmit, values, handleReset }) => (
        <div className={styles.drawer}>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
          >
            <div className={styles.drawerBlock}>
              <SimpleDropdown
                className={styles.drawerList}
                size="large"
                label="Service"
                name="service"
                value={values.service}
                placeHolderText="Select a service"
                dropdownItems={TaxOption.map((item) => item || '')}
                onSelected={(value) => setFieldValue('service', value)}
              />
              <Form.Item
                label="Quantity"
                name="quantity"
                className={styles.drawerList}
              >
                <InputNumber
                  type="number"
                  name="quantity"
                  size="large"
                  min={1}
                  max={100000}
                  value={values.quantity}
                  onChange={(data) => setFieldValue('quantity', data)}
                />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                className={styles.drawerList}
              >
                <InputNumber
                  value={values.price}
                  size="large"
                  name="price"
                  placeholder="£650.00"
                  formatter={(data) => `£${data}`}
                  parser={(data) => data.replace(/£\s?|(,*)/g, '')}
                  onChange={(data) => setFieldValue('price', data)}
                />
              </Form.Item>
            </div>
            <div className={styles.drawerButtons}>
              <SubmitButton
                type={'primary'}
                htmlType="submit"
                className={styles.buttonsFilter}
              >
                Save
              </SubmitButton>
              <Button
                icon={<DeleteOutlined />}
                onClick={() => setDrawerVisible(false)}
              >
                Delete
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

const Build: FC = () => {
  const [drawer, setDrawer] = useState<boolean>(false)
  const [
    buildIntialValues,
    setBuildIntialValue,
  ] = useState<BuildIntialValueProps>(buildIntialValue)
  const isMobile = useMedia('(max-width: 768px)', false)

  const onCourseTableRowClick = (value) => {
    setDrawer(true)
    setBuildIntialValue({
      ...value,
      price: value.price.replace('£', ''),
    })
  }

  const handleAddButton = () => {
    setDrawer(true)
    setBuildIntialValue(buildIntialValue)
  }

  const BuildHeader = () => {
    return (
      <>
        <div className={styles.headerWrap}>
          <div className={styles.title}>Items in your package</div>
          <div className={styles.buttons}>
            <Button className={styles.buttonsFilter} icon={<FilterOutlined />}>
              Filter
            </Button>
            <Button
              icon={<PlusOutlined />}
              type={'primary'}
              onClick={handleAddButton}
            >
              Add
            </Button>
          </div>
        </div>
        <Table
          scroll={{ x: 'max-content' }}
          sticky={{ offsetScroll: 80, offsetHeader: 0 }}
          dataSource={buildPackagesColumnsData as never[]}
          draggable={false}
          columns={buildPackagesColumns}
          onRowClick={onCourseTableRowClick}
        />
      </>
    )
  }
  return (
    <div className={styles.createPk}>
      {isMobile ? (
        <BuildHeader />
      ) : (
        <div className={drawer ? styles.build : styles.buildPackage}>
          <BuildHeader />
        </div>
      )}
      {drawer &&
        (isMobile ? (
          <Drawer
            placement={'bottom'}
            closable={false}
            onClose={() => setDrawer(false)}
            visible={drawer}
            key={'bottom'}
            height="448px"
            className={styles.mobile}
          >
            <div className={styles.mobileDrawer}>
              <span className={styles.line} />
              <DrawerContent
                setDrawerVisible={setDrawer}
                buildIntialValues={buildIntialValues}
              />
            </div>
          </Drawer>
        ) : (
          <DrawerContent
            setDrawerVisible={setDrawer}
            buildIntialValues={buildIntialValues}
          />
        ))}
    </div>
  )
}
export const CreatePackage = ({ visible, setVisible, initialValue }) => {
  const handleOperations = () => {
    return !initialValue.id
      ? [OperationType.active, OperationType.cancel, OperationType.create]
      : [
          OperationType.active,
          OperationType.cancel,
          OperationType.delete,
          OperationType.save,
        ]
  }

  const handleFullScreenModalBackClick = (handleReset) => {
    setVisible(false)
    handleReset()
  }

  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        packageName: Yup.string().required('Package Name is required'),
      })}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {({ setFieldValue, handleSubmit, values, handleReset }) => (
        <FullScreenReportModal
          operations={handleOperations()}
          title={`Create Package`}
          visible={visible}
          onBackClick={() => handleFullScreenModalBackClick(handleReset)}
          onCancel={() => handleFullScreenModalBackClick(handleReset)}
          activated={true}
          enableCreateBtn={true}
          createBtnText={'Create'}
          onActivated={(value) => setFieldValue('isActive', value)}
          onCreate={handleSubmit}
          onSave={handleSubmit}
          //onDelete={showDeleteConfirmDialog}
          subMenu={['General', 'Build']}
        >
          <General setFieldValue={setFieldValue} value={values} />
          <Build />
        </FullScreenReportModal>
      )}
    </Formik>
  )
}

export default CreatePackage
