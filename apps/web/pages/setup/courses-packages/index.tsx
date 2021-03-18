import React, { FC, useState } from 'react'
import { Typography } from 'antd'
import Layout from '../../../components/Layout/Layout'
import {
  Breadcrumb,
  TabbedTable,
  Table,
  AvatarList,
  OperationType,
  Pagination,
  FullScreenReportModal,
  SimpleDropdown,
  Button,
  Employees,
} from '@pabau/ui'
import { LeftOutlined, PlusOutlined } from '@ant-design/icons'
import AddButton from '../../../components/AddButton'
import { Formik } from 'formik'
import { Form, Input, InputNumber } from 'formik-antd'
import {
  TaxOption,
  coursesColumns,
  coursesData,
  employeeList,
  packageData,
  courseSchema,
  packageSchema,
} from '../../../mocks/CoursesPackages'
import styles from './index.module.less'

const { Title } = Typography
const { TextArea } = Input

const packageColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    className: 'drag-visible',
    render: function renderSourceName(val, rowData) {
      return <AvatarList isLoading={false} users={val} size={'small'} />
    },
    visible: true,
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    className: 'drag-visible',
    visible: true,
  },
]

interface GeneralTabProps {
  setFieldValue(key, value): void
}

export const Index: FC = () => {
  const onFilterSource = () => {
    return
  }
  const onSearch = () => {
    return
  }
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false)
  const [showCreatePackageModal, setShowCreatePackageModal] = useState(false)
  const [currentTab, setCurrentTab] = useState('0')

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }

  const handleTab = (val) => {
    setCurrentTab(val)
  }
  const handleCreatenNew = () => {
    currentTab === '0'
      ? setShowCreateCourseModal(true)
      : setShowCreatePackageModal(true)
  }

  const handleFullScreenModalBackClick = (handleReset) => {
    currentTab === '0'
      ? setShowCreateCourseModal(false)
      : setShowCreatePackageModal(false)
    handleReset()
  }

  const handleOperations = () => {
    return [
      OperationType.active,
      OperationType.cancel,
      OperationType.delete,
      OperationType.save,
    ]
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
  return (
    <>
      <Layout>
        <div className={styles.coursesWrapper}>
          <div className={styles.hideMobileView}>
            <div className={styles.header}>
              <Breadcrumb
                breadcrumbItems={[
                  { path: 'setup', breadcrumbName: 'Setup' },
                  {
                    path: '',
                    breadcrumbName: 'Courses & Packages',
                  },
                ]}
              />
              <Title className={styles.hideMobileView}>
                Courses & Packages
              </Title>
            </div>
            <AddButton
              onFilterSource={onFilterSource}
              onSearch={onSearch}
              schema={currentTab === '1' ? packageSchema : courseSchema}
              onClick={handleCreatenNew}
              tableSearch={true}
              needTranslation={false}
              addFilter={true}
            />
          </div>
          <div className={styles.hideDesktopView}>
            <div className={styles.courseWrap}>
              <LeftOutlined /> <h6> {'Courses & Packages'}</h6>
            </div>
            <AddButton
              onFilterSource={onFilterSource}
              onSearch={onSearch}
              schema={currentTab === '1' ? packageSchema : courseSchema}
              tableSearch={true}
              onClick={handleCreatenNew}
              needTranslation={false}
              addFilter={true}
            />
          </div>
        </div>
        <div className={styles.tableBackground}>
          <TabbedTable
            tabItems={['Courses', 'Packages']}
            onTabChange={handleTab}
          >
            <div>
              <Table
                scroll={{ x: 'max-content' }}
                sticky={{ offsetScroll: 80, offsetHeader: 80 }}
                dataSource={coursesData as never[]}
                draggable={true}
                columns={coursesColumns}
              />
              <Pagination
                total={coursesData.length}
                defaultPageSize={50}
                showSizeChanger={false}
                onChange={onPaginationChange}
                pageSize={50}
                current={1}
                showingRecords={coursesData.length}
              />
            </div>
            <div className={styles.headerZIndex}>
              <Table
                scroll={{ x: 'max-content' }}
                sticky={{ offsetScroll: 80, offsetHeader: 80 }}
                dataSource={packageData as never[]}
                draggable={true}
                columns={packageColumns}
              />
              <Pagination
                total={packageData.length}
                defaultPageSize={50}
                showSizeChanger={false}
                onChange={onPaginationChange}
                pageSize={50}
                current={1}
                showingRecords={packageData.length}
              />
            </div>
          </TabbedTable>
        </div>
      </Layout>

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
            visible={showCreateCourseModal}
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
                onSelected={(value) =>
                  prepareEmployeeList(value, setFieldValue)
                }
                title="Employees"
              />
            </div>
          </FullScreenReportModal>
        )}
      </Formik>
      <Formik
        initialValues={{
          isActive: true,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          console.log(values)
        }}
      >
        {({ setFieldValue, handleSubmit, values, handleReset }) => (
          <FullScreenReportModal
            operations={handleOperations()}
            title={`Create Package`}
            visible={showCreatePackageModal}
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
                onSelected={(value) =>
                  prepareEmployeeList(value, setFieldValue)
                }
                title="Employees"
              />
            </div>
          </FullScreenReportModal>
        )}
      </Formik>
    </>
  )
}

export default Index
