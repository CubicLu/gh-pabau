import React, { FC, useState } from 'react'
import { Typography } from 'antd'
import Layout from '../../../components/Layout/Layout'
import {
  Breadcrumb,
  TabbedTable,
  Table,
  AvatarList,
  Pagination,
} from '@pabau/ui'
import { LeftOutlined } from '@ant-design/icons'
import AddButton from '../../../components/AddButton'
import {
  coursesColumns,
  coursesData,
  packageData,
  courseSchema,
  packageSchema,
  employeeList,
} from '../../../mocks/CoursesPackages'
import CreateCourse, {
  InitialCoursesProps,
} from '../../../components/Setup/CoursesPackages/CreateCourse'
import CreatePackage, {
  InitialPackagesProps,
} from '../../../components/Setup/CoursesPackages/CreatePackage'
import styles from './index.module.less'

const { Title } = Typography

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

const coursesFormikInitialValue: InitialCoursesProps = {
  id: '',
  name: '',
  session: 20,
  description: '',
  price: undefined,
  tax: '',
  category: '',
  isActive: true,
  employees: [],
  image: '',
}

const packageFormikInitialValue: InitialPackagesProps = {
  id: '',
  packageName: '',
  category: '',
  onlinePurchase: false,
  image: '',
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
  const [
    courseInitialValue,
    setCourseInitialValue,
  ] = useState<InitialCoursesProps>(coursesFormikInitialValue)
  const [employeeListData, setEmployeeListData] = useState(employeeList)

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

    const data = employeeList.map((value) => {
      return {
        ...value,
        selected: false,
      }
    })
    setEmployeeListData(data)
    setCourseInitialValue(coursesFormikInitialValue)
  }

  const onCourseTableRowClick = (value) => {
    setCourseInitialValue(value)
    setShowCreateCourseModal(true)
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
              <LeftOutlined className={styles.leftIcon} />{' '}
              <h6> {'Courses & Packages'}</h6>
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
                onRowClick={onCourseTableRowClick}
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
                onRowClick={(e) => {
                  setShowCreatePackageModal(true)
                }}
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

      <CreateCourse
        visible={showCreateCourseModal}
        setVisible={setShowCreateCourseModal}
        initialValue={courseInitialValue}
        employeeList={employeeListData}
      />
      <CreatePackage
        visible={showCreatePackageModal}
        setVisible={setShowCreatePackageModal}
        initialValue={packageFormikInitialValue}
      />
    </>
  )
}

export default Index
