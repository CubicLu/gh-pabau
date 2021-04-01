import React, { FC, useState } from 'react'
import { Formik } from 'formik'
import { Form, Input, InputNumber } from 'formik-antd'
import {
  FullScreenReportModal,
  Employees,
  SimpleDropdown,
  OperationType,
  Button,
  ImageSelectorModal,
} from '@pabau/ui'
import * as Yup from 'yup'
import { TaxOption } from '../../../mocks/CoursesPackages'
import { PlusOutlined, PictureOutlined } from '@ant-design/icons'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
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
          <h4>{t('setup.courses.course.general')}</h4>
          <Form.Item label={t('setup.courses.course.general.name')} name="name">
            <Input
              name="name"
              autoComplete="off"
              placeholder={t('setup.courses.course.general.name.placeholder')}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={t('setup.courses.course.general.sessioncount')}
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
          <Form.Item
            label={t('setup.courses.course.general.description')}
            name="description"
          >
            <TextArea
              rows={4}
              name="description"
              placeholder={t(
                'setup.courses.course.general.description.placeholder'
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('setup.courses.course.general.price')}
            name="price"
          >
            <InputNumber
              name="price"
              type="number"
              size="large"
              placeholder={t('setup.courses.course.general.price.placeholder')}
              value={value.price}
              onChange={(data) => setFieldValue('price', data)}
            />
          </Form.Item>
          <SimpleDropdown
            label={t('setup.courses.course.general.tax')}
            name="tax"
            size="large"
            placeHolderText={t('setup.courses.course.general.tax.placeholder')}
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('tax', value)}
          />
          <SimpleDropdown
            label={t('setup.courses.course.general.category')}
            size="large"
            name="category"
            placeHolderText={t(
              'setup.courses.course.general.category.placeholder'
            )}
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('category', value)}
          />
          <Form.Item
            label={t('setup.courses.course.general.image')}
            name="image"
          >
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
              {t('setup.courses.course.general.image.choose')}
            </Button>
          </Form.Item>
          <ImageSelectorModal
            visible={showImageSelector}
            initialSearch={value.name}
            title={t('ui.imageselector.title')}
            attachButtonText={t('ui.imageselector.attach')}
            chooseButtonText={t('ui.imageselector.choose')}
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
