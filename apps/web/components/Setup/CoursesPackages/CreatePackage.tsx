import {
  CheckOutlined,
  DeleteOutlined,
  FilterOutlined,
  PictureOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  FullScreenReportModal,
  ImageSelectorModal,
  OperationType,
  SimpleDropdown,
  Switch,
  Table,
} from '@pabau/ui'
import { Drawer } from 'antd'
import { Formik } from 'formik'
import { Form, Input, InputNumber, SubmitButton } from 'formik-antd'
import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'
import * as Yup from 'yup'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import {
  buildPackagesColumnsData,
  TaxOption,
} from '../../../mocks/CoursesPackages'
import styles from './Index.module.less'

export interface InitialPackagesProps {
  id: string
  name: string
  category: string
  onlinePurchase: boolean
  image: string
  isActive: boolean
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
          <Form.Item
            label={t('setup.courses.package.general.name')}
            name="name"
            className={styles.generalList}
          >
            <Input
              size="large"
              name="name"
              autoComplete="off"
              placeholder={t('setup.courses.package.general.name.placeholder')}
            />
          </Form.Item>
          <SimpleDropdown
            className={styles.generalList}
            size="large"
            label={t('setup.courses.package.general.category')}
            name="category"
            value={value.category}
            placeHolderText={t(
              'setup.courses.package.general.category.placeholder'
            )}
            dropdownItems={TaxOption.map((item) => item || '')}
            onSelected={(value) => setFieldValue('category', value)}
          />
          <Form.Item
            label={t('setup.courses.package.general.image')}
            name="image"
            className={styles.generalList}
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
              {t('setup.courses.package.general.image.choose')}
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
          <div className={styles.generalListSwitch}>
            <Switch
              checked={value.onlinePurchase}
              onChange={(checked) => setFieldValue('onlinePurchase', checked)}
            />{' '}
            <span className={styles.switchLabel}>
              {t('setup.courses.package.general.enable')}
            </span>
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
  const { t } = useTranslationI18()
  return (
    <Formik
      initialValues={buildIntialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        quantity: Yup.number().required(
          t('setup.courses.package.drawer.quantity.validate.required')
        ),
        price: Yup.string()
          .required(t('setup.courses.package.drawer.price.validate.required'))
          .matches(
            /^\d+$/g,
            t('setup.courses.package.drawer.price.validate.number')
          ),
      })}
      onSubmit={(values) => {
        console.log(values)
        setDrawerVisible(false)
      }}
    >
      {({ setFieldValue, values }) => (
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
                label={t('setup.courses.package.drawer.service')}
                name="service"
                value={values.service}
                placeHolderText={t(
                  'setup.courses.package.drawer.service.placeholder'
                )}
                dropdownItems={TaxOption.map((item) => item || '')}
                onSelected={(value) => setFieldValue('service', value)}
              />
              <Form.Item
                label={t('setup.courses.package.drawer.quantity')}
                name="quantity"
                className={styles.drawerList}
              >
                <InputNumber
                  type="number"
                  name="quantity"
                  size="large"
                  min={1}
                  max={100_000}
                  value={values.quantity}
                  onChange={(data) => setFieldValue('quantity', data)}
                />
              </Form.Item>
              <Form.Item
                label={t('setup.courses.package.drawer.price')}
                name="price"
                className={styles.drawerList}
              >
                <InputNumber
                  value={values.price}
                  size="large"
                  name="price"
                  placeholder={t(
                    'setup.courses.package.drawer.price.placeholder'
                  )}
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
                {t('common-label-save')}
              </SubmitButton>
              <Button
                icon={<DeleteOutlined />}
                onClick={() => setDrawerVisible(false)}
              >
                {t('common-label-delete')}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

const Pricing: FC = () => {
  const { t } = useTranslationI18()
  const buildPackagesColumns = [
    {
      title: t('setup.courses.package.drawer.pricing.column.service'),
      dataIndex: 'service',
      visible: true,
    },
    {
      title: t('setup.courses.package.drawer.pricing.column.quantity'),
      dataIndex: 'quantity',
      visible: true,
    },
    {
      title: t('setup.courses.package.drawer.pricing.column.price'),
      dataIndex: 'price',
      visible: true,
    },
    {
      title: t('setup.courses.package.drawer.pricing.column.online'),
      dataIndex: 'onlinePurchase',
      render: function renderSourceName(val, rowData) {
        return val ? <CheckOutlined /> : ''
      },
      visible: true,
    },
  ]
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

  const PricingHeader = () => {
    return (
      <>
        <div className={styles.headerWrap}>
          <div className={styles.title}>
            {t('setup.courses.package.drawer.pricing.header.title')}
          </div>
          <div className={styles.buttons}>
            <Button className={styles.buttonsFilter} icon={<FilterOutlined />}>
              {t('setup.courses.package.drawer.pricing.header.filter')}
            </Button>
            <Button
              icon={<PlusOutlined />}
              type={'primary'}
              onClick={handleAddButton}
            >
              {t('common-label-add')}
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
        <PricingHeader />
      ) : (
        <div className={drawer ? styles.build : styles.buildPackage}>
          <PricingHeader />
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

  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(
          t('setup.courses.package.name.validate.required')
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
              ? t('setup.courses.fullscreenmodal.title.edit')
              : t('setup.courses.fullscreenmodal.title.create')
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
            t('setup.courses.fullscreenmodal.submenu.general'),
            t('setup.courses.fullscreenmodal.submenu.pricing'),
          ]}
          footer={true}
        >
          <General setFieldValue={setFieldValue} value={values} />
          <Pricing />
        </FullScreenReportModal>
      )}
    </Formik>
  )
}

export default CreatePackage
