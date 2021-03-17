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

import styles from './index.module.less'

const { Title } = Typography
/* eslint-disable-next-line */
export interface IndexProps { }

const packageData = [
  {
    key: '1',
    name: 'Book Now Link',
    quantity: [
      {
        id: 1,
        name: 'Dominic Nguyen',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 2,
        name: 'Tom Coleman',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 3,
        name: 'Zoltan Olah',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
      },
      {
        id: 4,
        name: 'Tim Hingston',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
      },
    ],
    is_active: true,
  },
  {
    key: '2',
    name: 'From a friend',
    quantity: [
      {
        id: 1,
        name: 'Dominic Nguyen',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 2,
        name: 'Tom Coleman',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 3,
        name: 'Zoltan Olah',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
      },
      {
        id: 4,
        name: 'Tim Hingston',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
      },
    ],
    is_active: true,
  },
  {
    key: '3',
    name: 'Instagram',
    quantity: [
      {
        id: 1,
        name: 'Dominic Nguyen',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 2,
        name: 'Tom Coleman',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
      {
        id: 3,
        name: 'Zoltan Olah',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
      },
      {
        id: 4,
        name: 'Tim Hingston',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
      },
    ],
    is_active: true,
  },
]

const coursesData = [
  {
    key: '1',
    name: 'Hydrafacial (x3)',
    service: 'Botox – 1 Area',
    sessions: '3',
    is_active: true,
  },
  {
    key: '2',
    name: 'Hydrafacial – 1 day',
    service: 'Hydrafacial',
    sessions: '3',
    is_active: true,
  },
  {
    key: '3',
    name: 'Facial – 1 month',
    service: 'Facial',
    sessions: '3',
    is_active: true,
  },
]

const packageColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
    // render: function renderSourceName(val, rowData) {
    //   return val
    // },
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

const coursesColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Service',
    dataIndex: 'service',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Sessions',
    dataIndex: 'sessions',
    className: 'drag-visible',
    visible: true,
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    className: 'drag-visible',
    visible: true,
  },
]

const schema: Schema = {
  full: 'Labs',
  fullLower: 'labs',
  short: 'Lab',
  shortLower: 'lab',
  createButtonLabel: 'Create Lab',
  messages: {
    create: {
      success: 'You have successfully created a lab',
      error: 'While creating a lab',
    },
    update: {
      success: 'You have successfully updated a lab',
      error: 'While updating a lab',
    },
    delete: {
      success: 'You have successfully deleted a lab',
      error: 'While deleting a lab',
    },
  },
  fields: {
    name: {
      full: 'lab Name',
      fullLower: 'lab name',
      short: 'Name',
      shortLower: 'name',
      min: 2,
      example: 'Surgical lab',
      cssWidth: 'max',
      type: 'string',
    },
    integration: {
      full: 'Integration',
      type: 'boolean',
      defaultvalue: true,
    },
    is_active: {
      full: 'Status',
      type: 'boolean',
      defaultvalue: true,
    },
  },
}

export const Index: FC = () => {
  const onClick = () => {
    return
  }
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

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({ ...paginateData, offset, currentPage: currentPage })
  }
  return (
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
            <Title className={styles.hideMobileView}>Courses & Packages</Title>
          </div>
          <AddButton
            onClick={onClick}
            onFilterSource={onFilterSource}
            onSearch={onSearch}
            schema={schema}
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
            onClick={onClick}
            onFilterSource={onFilterSource}
            onSearch={onSearch}
            schema={schema}
            tableSearch={true}
            needTranslation={false}
            addFilter={true}
          />
        </div>
      </div>

      <div className={styles.tableBackground}>
        <TabbedTable tabItems={['Courses', 'Packages']}>
          <div>
            <Table
              scroll={{ x: 'max-content' }}
              sticky={{ offsetScroll: 80, offsetHeader: 40 }}
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
          <div>
            <Table
              scroll={{ x: 'max-content' }}
              sticky={{ offsetScroll: 80, offsetHeader: 40 }}
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
  )
}

export default Index
