import {
  AvatarList,
  Breadcrumb,
  Pagination,
  TabbedTable,
  Table,
} from '@pabau/ui'
import { Typography } from 'antd'
import React, { FC, useState } from 'react'
import AddButton from '../../../components/AddButton'
import Layout from '../../../components/Layout/Layout'
import useWindowSize from '../../../hooks/useWindowSize'
import CommonHeader from '../../../components/CommonHeader'
import CreateCourse, {
  InitialCoursesProps,
} from '../../../components/Setup/CoursesPackages/CreateCourse'
import CreatePackage, {
  InitialPackagesProps,
} from '../../../components/Setup/CoursesPackages/CreatePackage'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import {
  coursesData,
  employeeList,
  packageData,
} from '../../../mocks/CoursesPackages'
import styles from './index.module.less'

const { Title } = Typography
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
  name: '',
  category: '',
  onlinePurchase: false,
  isActive: true,
  image: '',
}

export const Index: FC = () => {
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const onFilterSource = () => {
    return
  }
  const onSearch = () => {
    return
  }
  const [paginateCoursesData, setPaginateCoursesData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })
  const [paginatePackagesData, setPaginatePackagesData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })

  const packageColumns = [
    {
      title: t('setup.courses.package.column.name'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('setup.courses.package.column.quantity'),
      dataIndex: 'quantity',
      className: 'drag-visible',
      render: function renderSourceName(val, rowData) {
        return <AvatarList isLoading={false} users={val} size={'small'} />
      },
      visible: true,
    },
    {
      title: t('setup.courses.package.column.status'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
    },
  ]

  const coursesColumns = [
    {
      title: t('setup.courses.course.column.name'),
      dataIndex: 'name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('setup.courses.course.column.service'),
      dataIndex: 'service',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('setup.courses.course.column.sessions'),
      dataIndex: 'session',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: t('setup.courses.course.column.status'),
      dataIndex: 'is_active',
      className: 'drag-visible',
      visible: true,
    },
  ]

  const courseSchema: Schema = {
    full: t('setup.courses.course.schema.full'),
    fullLower: t('setup.courses.course.schema.full.lower'),
    short: t('setup.courses.course.schema.short'),
    shortLower: t('setup.courses.course.schema.short.lower'),
    createButtonLabel: t('setup.courses.course.schema.createbutton'),
    messages: {
      create: {
        success: t('setup.courses.course.schema.messages.create.success'),
        error: t('setup.courses.course.schema.messages.create.error'),
      },
      update: {
        success: t('setup.courses.course.schema.messages.edit.success'),
        error: t('setup.courses.course.schema.messages.edit.error'),
      },
      delete: {
        success: t('setup.courses.course.schema.messages.delete.success'),
        error: t('setup.courses.course.schema.messages.delete.error'),
      },
    },
    fields: {
      name: {
        full: t('setup.courses.course.schema.fields.name.full'),
        fullLower: t('setup.courses.course.schema.fields.name.full.lower'),
        short: t('setup.courses.course.schema.fields.name.short'),
        shortLower: t('setup.courses.course.schema.fields.name.short.lower'),
        min: 2,
        example: t('setup.courses.course.schema.fields.name.example'),
        cssWidth: 'max',
        type: 'string',
      },
      service: {
        full: t('setup.courses.course.schema.fields.service.full'),
        type: 'string',
        example: t('setup.courses.course.schema.fields.service.example'),
      },
      sessions: {
        full: t('setup.courses.course.schema.fields.session.full'),
        type: 'string',
        example: t('setup.courses.course.schema.fields.session.example'),
      },
      is_active: {
        full: t('setup.courses.course.schema.fields.status.full'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
  }

  const packageSchema: Schema = {
    full: t('setup.courses.package.schema.full'),
    fullLower: t('setup.courses.package.schema.full.lower'),
    short: t('setup.courses.package.schema.short'),
    shortLower: t('setup.courses.package.schema.short.lower'),
    createButtonLabel: t('setup.courses.package.schema.createbutton'),
    messages: {
      create: {
        success: t('setup.courses.package.schema.messages.create.success'),
        error: t('setup.courses.package.schema.messages.create.error'),
      },
      update: {
        success: t('setup.courses.package.schema.messages.edit.success'),
        error: t('setup.courses.package.schema.messages.edit.error'),
      },
      delete: {
        success: t('setup.courses.package.schema.messages.delete.success'),
        error: t('setup.courses.package.schema.messages.delete.error'),
      },
    },
    fields: {
      name: {
        full: t('setup.courses.package.schema.fields.name.full'),
        fullLower: t('setup.courses.package.schema.fields.name.full.lower'),
        short: t('setup.courses.package.schema.fields.name.short'),
        shortLower: t('setup.courses.package.schema.fields.name.short.lower'),
        min: 2,
        example: t('setup.courses.package.schema.fields.name.example'),
        cssWidth: 'max',
        type: 'string',
      },
      quantity: {
        full: t('setup.courses.package.schema.fields.quantity.full'),
        type: 'string',
        example: t('setup.courses.package.schema.fields.quantity.example'),
      },
      is_active: {
        full: t('setup.courses.package.schema.fields.status.full'),
        type: 'boolean',
        defaultvalue: true,
      },
    },
  }

  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false)
  const [showCreatePackageModal, setShowCreatePackageModal] = useState(false)
  const [currentTab, setCurrentTab] = useState('0')
  const [courseInitialValue, setCourseInitialValue] =
    useState<InitialCoursesProps>(coursesFormikInitialValue)
  const [packageIntitialValue, setPackageIntialValue] =
    useState<InitialPackagesProps>(packageFormikInitialValue)
  const [employeeListData, setEmployeeListData] = useState(employeeList)

  const onPaginationCoursesChange = (currentPage) => {
    const offset = paginateCoursesData.limit * (currentPage - 1)
    setPaginateCoursesData({
      ...paginateCoursesData,
      offset,
      currentPage: currentPage,
    })
  }

  const onPaginationPackageChange = (currentPage) => {
    const offset = paginatePackagesData.limit * (currentPage - 1)
    setPaginatePackagesData({
      ...paginatePackagesData,
      offset,
      currentPage: currentPage,
    })
  }

  const handleTab = (val) => {
    setCurrentTab(val)
  }
  const handleCreatenNew = () => {
    currentTab === '0'
      ? setShowCreateCourseModal(true)
      : setShowCreatePackageModal(true)

    if (currentTab === '0') {
      const data = employeeList.map((value) => {
        return {
          ...value,
          selected: false,
        }
      })
      setEmployeeListData(data)
    }
    currentTab === '0'
      ? setCourseInitialValue(coursesFormikInitialValue)
      : setPackageIntialValue(packageFormikInitialValue)
  }

  const onCourseTableRowClick = (value) => {
    setCourseInitialValue({ ...value, isActive: value.is_active })
    setShowCreateCourseModal(true)
  }

  const onPackageTableRowClick = (value) => {
    setPackageIntialValue({ ...value, isActive: value.is_active })
    setShowCreatePackageModal(true)
  }

  return (
    <>
      <Layout>
        <CommonHeader
          isLeftOutlined
          reversePath="/setup"
          title={t('setup.courses-and-packages')}
          isShowSearch
          handleSearch={onSearch}
        >
          <AddButton
            onFilterSource={onFilterSource}
            schema={currentTab === '1' ? packageSchema : courseSchema}
            tableSearch={false}
            onClick={handleCreatenNew}
            needTranslation={false}
            addFilter={true}
          />
        </CommonHeader>
        {size.width > 767 && (
          <div className={styles.coursesWrapper}>
            <div className={styles.header}>
              <Breadcrumb
                items={[
                  { path: 'setup', breadcrumbName: t('sidebar.setup') },
                  {
                    path: '',
                    breadcrumbName: t('setup.courses-and-packages'),
                  },
                ]}
              />
              <Title className={styles.hideMobileView}>
                {t('setup.courses-and-packages')}
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
        )}
        <div className={styles.tableBackground}>
          <TabbedTable
            tabItems={[
              t('setup.courses-and-packages.courses'),
              t('setup.courses-and-packages.packages'),
            ]}
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
                onChange={onPaginationCoursesChange}
                pageSize={50}
                current={1}
                showingRecords={coursesData.length}
                onPageSizeChange={(pageSize) => {
                  setPaginateCoursesData({
                    ...paginateCoursesData,
                    limit: pageSize,
                  })
                }}
              />
            </div>
            <div className={styles.headerZIndex}>
              <Table
                scroll={{ x: 'max-content' }}
                sticky={{ offsetScroll: 80, offsetHeader: 80 }}
                dataSource={packageData as never[]}
                draggable={true}
                columns={packageColumns}
                onRowClick={onPackageTableRowClick}
              />
              <Pagination
                total={packageData.length}
                defaultPageSize={50}
                showSizeChanger={false}
                onChange={onPaginationPackageChange}
                pageSize={50}
                current={1}
                showingRecords={packageData.length}
                onPageSizeChange={(pageSize) => {
                  setPaginatePackagesData({
                    ...paginatePackagesData,
                    limit: pageSize,
                  })
                }}
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
        initialValue={packageIntitialValue}
      />
    </>
  )
}

export default Index
