import { PictureOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Employees,
  FullScreenReportModal,
  ImageSelectorModal,
  OperationType,
  SimpleDropdown,
} from '@pabau/ui'
import { Formik } from 'formik'
import { Form, Input, InputNumber } from 'formik-antd'
import React, { FC, useState } from 'react'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import { TaxOption } from '../../../mocks/CoursesPackages'
import styles from './Index.module.less'

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
  image: string
}

interface GeneralTabProps {
  value: InitialCoursesProps
  setFieldValue(
    field: keyof InitialCoursesProps,
    value: string | string[] | boolean | number
  ): void
}
const General: FC<GeneralTabProps> = ({ value, setFieldValue }) => {
  const { t } = useTranslationI18()
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
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
          <h4>{t('setup.course.general')}</h4>
          <Form.Item label={t('setup.course.name')} name="name">
            <Input
              name="name"
              autoComplete="off"
              placeholder={t('setup.course.name.placeholder')}
              size="large"
              maxLength={30}
            />
          </Form.Item>
          <SimpleDropdown
            label={t('setup.course.category')}
            size="large"
            name="category"
            placeHolderText={t('setup.course.category.placeholder')}
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('category', value)}
          />
          <Form.Item
            label={t('setup.course.session-count')}
            name="session_count"
          >
            <InputNumber
              name="session_count"
              type="number"
              value={value.session}
              onChange={(data) => setFieldValue('session', data)}
              size="large"
            />
          </Form.Item>
          <Form.Item label={t('setup.course.description')} name="description">
            <TextArea
              rows={4}
              name="description"
              placeholder={t('setup.course.description.placeholder')}
              maxLength={150}
            />
          </Form.Item>
          <Form.Item label={t('setup.course.price')} name="price">
            <InputNumber
              name="price"
              type="number"
              size="large"
              placeholder={t('setup.course.price.placeholder')}
              value={value.price}
              onChange={(data) => setFieldValue('price', data)}
            />
          </Form.Item>
          <SimpleDropdown
            label={t('setup.course.tax')}
            name="tax"
            size="large"
            placeHolderText={t('setup.course.tax.placeholder')}
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('tax', value)}
          />
          <Form.Item label={t('setup.course.image')} name="image">
            <div
              className={styles.createServiceImageContainer}
              style={{ backgroundImage: `url(${selectedImage})` }}
            >
              {!selectedImage && (
                <PictureOutlined
                  style={{
                    color: 'var(--light-grey-color)',
                    fontSize: '32px',
                  }}
                />
              )}
            </div>
            <Button
              className={styles.modalAddButton}
              type="default"
              icon={<PlusOutlined />}
              size="middle"
              onClick={() => setShowImageSelector(true)}
            >
              {t('setup.course.choose-from-library')}
            </Button>
          </Form.Item>
          <ImageSelectorModal
            visible={showImageSelector}
            initialSearch={value.name}
            onOk={(image) => {
              setSelectedImage(image.source)
              setFieldValue('image', image.source)
              setShowImageSelector(false)
            }}
            onCancel={() => {
              setShowImageSelector(false)
            }}
          />
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
  const { t } = useTranslationI18()
  const handleOperations = () => {
    return !initialValue.id
      ? [OperationType.active, OperationType.create]
      : [OperationType.active, OperationType.delete, OperationType.create]
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
        name: Yup.string().required(
          t('setup.courses.course.name.validate.required')
        ),
      })}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {({ setFieldValue, handleSubmit, values, handleReset }) => (
        <FullScreenReportModal
          operations={handleOperations()}
          title={
            values.id
              ? t('setup.courses.course.title.edit')
              : t('setup.courses.course.title.create')
          }
          visible={visible}
          onBackClick={() => handleFullScreenModalBackClick(handleReset)}
          activated={values.id ? values.isActive : true}
          enableCreateBtn={true}
          createBtnText={
            values.id ? t('common-label-save') : t('common-label-create')
          }
          deleteBtnText={t('common-label-delete')}
          activeBtnText={
            values.isActive
              ? t('common-label-active')
              : t('common-label-inactive')
          }
          onActivated={(value) => setFieldValue('isActive', value)}
          onCreate={handleSubmit}
          subMenu={[
            t('setup.courses.course.submenu.general'),
            t('setup.courses.course.submenu.employees'),
          ]}
          footer={true}
        >
          <General setFieldValue={setFieldValue} value={values} />
          <div className={styles.empSection}>
            <Employees
              description={t('setup.courses.course.employees.description')}
              employees={employeeList}
              onSelected={(value) => prepareEmployeeList(value, setFieldValue)}
              title={t('setup.courses.course.employees.title')}
              searchPlaceholder={t('ui.employees.search.placeholder')}
              showLessText={t('ui.employees.show.less')}
              showMoreText={t('ui.employees.show.more')}
            />
          </div>
        </FullScreenReportModal>
      )}
    </Formik>
  )
}

export default CreateCourse
