import React, { FC, useState } from 'react'
import { Formik } from 'formik'
import { Form, Input, InputNumber } from 'formik-antd'
import {
  FullScreenReportModal,
  SimpleDropdown,
  OperationType,
  Button,
  Switch,
  Table,
} from '@pabau/ui'
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
    dataIndex: 'online_purchase',
    render: function renderSourceName(val, rowData) {
      return val ? <CheckOutlined /> : ''
    },
    visible: true,
  },
]

interface GeneralTabProps {
  setFieldValue(key, value): void
}

const General: FC<GeneralTabProps> = ({ setFieldValue }) => {
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
            name="package_name"
            className={styles.generalList}
          >
            <Input
              size="large"
              name="package_name"
              autoComplete="off"
              placeholder="Enter package name"
            />
          </Form.Item>
          <Form.Item label="Price" name="price" className={styles.generalList}>
            <InputNumber
              size="large"
              name="price"
              type="number"
              autoComplete="off"
              placeholder="£"
            />
          </Form.Item>
          <SimpleDropdown
            className={styles.generalList}
            size="large"
            label="Category"
            name="category"
            placeHolderText="Select a category"
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('category', value)}
          />
          <SimpleDropdown
            className={styles.generalList}
            size="large"
            label="Tax"
            name="tax"
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
              onChange={(checked) => setFieldValue('online_purchase', checked)}
            />{' '}
            <span>Enable online purchase</span>
          </div>
        </div>
      </Form>
    </div>
  )
}

const Build: FC = () => {
  const [drawer, setDrawer] = useState(false)

  const handleSave = (handleSubmit) => {
    setDrawer(false)
    handleSubmit()
  }
  return (
    <div className={styles.createPk} style={drawer ? { display: 'flex' } : {}}>
      <div className={drawer ? styles.build : styles.buildPackage}>
        <div className={styles.headerWrap}>
          <div className={styles.title}>Items in your package</div>
          <div className={styles.buttons}>
            <Button className={styles.buttonsFilter} icon={<FilterOutlined />}>
              Filter
            </Button>
            <Button
              icon={<PlusOutlined />}
              type={'primary'}
              onClick={() => setDrawer(true)}
            >
              Add
            </Button>
          </div>
        </div>
        <Table
          scroll={{ x: 'max-content' }}
          sticky={{ offsetScroll: 80, offsetHeader: 80 }}
          dataSource={buildPackagesColumnsData as never[]}
          draggable={false}
          columns={buildPackagesColumns}
        />
      </div>
      {drawer && (
        <Formik
          initialValues={{
            isActive: true,
            amount: undefined,
          }}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            console.log(values)
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
                      name="quality"
                      size="large"
                      min={1}
                      max={100000}
                      defaultValue={20}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Price"
                    name="price"
                    className={styles.drawerList}
                  >
                    <InputNumber
                      value={values.amount}
                      size="large"
                      name="price"
                      placeholder="£650.00"
                      formatter={(data) => `£${data}`}
                      parser={(data) => data.replace(/£\s?|(,*)/g, '')}
                      onChange={(data) => setFieldValue('amount', data)}
                    />
                  </Form.Item>
                </div>
                <div className={styles.drawerButtons}>
                  <Button
                    className={styles.buttonsFilter}
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                  <Button
                    type={'primary'}
                    onClick={() => handleSave(handleSubmit)}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </div>
  )
}
export const CreatePackage = ({ visible, setVisible }) => {
  const handleOperations = () => {
    return [
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
      initialValues={{
        isActive: true,
      }}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Discount Name is required'),
      })}
      onSubmit={async (values, { resetForm }) => {
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
          <General setFieldValue={setFieldValue} />
          <Build />
        </FullScreenReportModal>
      )}
    </Formik>
  )
}

export default CreatePackage
