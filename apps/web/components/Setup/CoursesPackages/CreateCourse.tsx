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
import * as Yup from 'yup'
import { TaxOption } from '../../../mocks/CoursesPackages'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const { TextArea } = Input
export interface InitialCoursesProps {
  id: string
  name: string
  session: number
  description: string
  isActive: boolean
  price: number
  tax: string
  category: string
  employees: string[]
}

interface GeneralTabProps {
  value: InitialCoursesProps
  setFieldValue(
    field: keyof InitialCoursesProps,
    value: string | string[] | boolean | number
  ): void
}
const General: FC<GeneralTabProps> = ({ value, setFieldValue }) => {
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
              size="large"
            />
          </Form.Item>
          <Form.Item label="Session count" name="session_count">
            <InputNumber
              name="session_count"
              type="number"
              value={value.session}
              onChange={(data) => setFieldValue('session', data)}
              size="large"
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea
              rows={4}
              name="description"
              placeholder="Enter description"
            />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber
              name="price"
              type="number"
              size="large"
              placeholder="£0.00"
              value={value.price}
              onChange={(data) => setFieldValue('price', data)}
            />
          </Form.Item>
          <SimpleDropdown
            label="Tax"
            name="tax"
            size="large"
            placeHolderText={'Select tax'}
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('tax', value)}
          />
          <SimpleDropdown
            label="Category"
            size="large"
            name="category"
            placeHolderText={'Select a category'}
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

export const CreateCourse = ({
  visible,
  setVisible,
  initialValue,
  employeeList,
}) => {
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
      initialValues={initialValue}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Discount Name is required'),
      })}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {({ setFieldValue, handleSubmit, values, handleReset }) => (
        <FullScreenReportModal
          operations={handleOperations()}
          title={values.id ? `Edit Course` : `Create Course`}
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
          subMenu={['General', 'Employees']}
        >
          <General setFieldValue={setFieldValue} value={values} />
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
