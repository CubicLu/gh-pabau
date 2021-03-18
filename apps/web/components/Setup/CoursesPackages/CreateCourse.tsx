import React, { FC } from 'react'
import { Formik } from 'formik'
import { Form, Input, InputNumber } from 'formik-antd'
import {
  FullScreenReportModal,
  Employees,
  SimpleDropdown,
  OperationType,
  Button,
} from '@pabau/ui'
import { TaxOption, employeeList } from '../../../mocks/CoursesPackages'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const { TextArea } = Input

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
          <Form.Item label="Course name" name="name">
            <Input
              name="name"
              autoComplete="off"
              placeholder="Enter course name"
            />
          </Form.Item>
          <Form.Item label="Session count" name="session_count">
            <InputNumber
              name="session_count"
              size="large"
              min={1}
              max={100000}
              defaultValue={20}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} name="description" />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input name="price" autoComplete="off" placeholder="£0.00" />
          </Form.Item>
          <SimpleDropdown
            label="Tax"
            name="tax"
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('tax', value)}
          />
          <SimpleDropdown
            label="Category"
            name="category"
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('category', value)}
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
        </div>
      </Form>
    </div>
  )
}

export const CreateCourse = ({ visible, setVisible }) => {
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

  const prepareEmployeeList = (value, setFieldValue) => {
    const record = []
    for (const item of value) {
      if (item.selected) {
        record.push(item.name)
      }
    }
    setFieldValue('employees', record)
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
          title={`Create Course`}
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
          <div className={styles.empSection}>
            <Employees
              description="Choose which team members would requred access to this location"
              employees={employeeList}
              onSelected={(value) => prepareEmployeeList(value, setFieldValue)}
              title="Employees"
            />
          </div>
        </FullScreenReportModal>
      )}
    </Formik>
  )
}

export default CreateCourse
