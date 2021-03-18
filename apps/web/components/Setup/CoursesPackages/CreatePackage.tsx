import React, { FC } from 'react'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
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
import { PlusOutlined } from '@ant-design/icons'
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
    dataIndex: 'online purchase',
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
          <h4>General</h4>
          <Form.Item label="Package name" name="package_name">
            <Input
              name="package_name"
              autoComplete="off"
              placeholder="Enter package name"
            />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input name="price" autoComplete="off" placeholder="£" />
          </Form.Item>
          <SimpleDropdown
            label="Category"
            name="category"
            placeHolderText="Select a category"
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('category', value)}
          />
          <SimpleDropdown
            label="Tax"
            name="tax"
            placeHolderText="Select a tax"
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('tax', value)}
          />
          <Form.Item label="Image" name="image">
            <Button
              className={styles.modalAddButton}
              type="default"
              icon={<PlusOutlined />}
              size="middle"
            >
              Choose from Library
            </Button>
          </Form.Item>
          <div>
            <Switch
              onChange={(checked) => setFieldValue('online_purchase', checked)}
            />{' '}
            Enable online purchase
          </div>
        </div>
      </Form>
    </div>
  )
}

const Build: FC = () => {
  return (
    <Table
      scroll={{ x: 'max-content' }}
      sticky={{ offsetScroll: 80, offsetHeader: 80 }}
      dataSource={buildPackagesColumnsData as never[]}
      draggable={true}
      columns={buildPackagesColumns}
    />
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
      // validationSchema={Yup.object().shape({
      // })}
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
