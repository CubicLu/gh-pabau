import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  FilterOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { Input, Tooltip } from 'antd'
import React, { FC, useState } from 'react'
import { Button } from '../button/Button'
import FullScreenReportModal from '../full-screen-report-modal/FullScreenReportModal'
import HighChart from '../high-chart/HighChart'
import { Table } from '../table/Table'
import styles from './Newsletter.module.less'

const { Search } = Input
export interface NewsletterProps {
  TableTitle: string
  TilesTitle: string
  data: []
  ChartTitle: string
  OpensLabel: string
  ClicksLabel: string
  OpensColor: string
  ClicksColor: string
  ShowSizeChanger: boolean
  ModalHeader: boolean
  ModalVisible: boolean
  ModalTitle: string
}

export interface DataProps {
  key: string
  name: string
  email: string
  status: string
  isOpened: boolean
  isClicked: boolean
  isBooked: boolean
  revenue: string
  info: {
    sent: string
    delivered: string
    opened: string
    clicked: string
    bounced: string
  }
}

const seriesData1 = [0, 3, 5, 7, 8]

const seriesData2 = [0, 1, 3, 5, 6]

const yAxisCategories = [
  '0%',
  '5%',
  '10%',
  '15%',
  '20%',
  '25%',
  '30%',
  '35%',
  '40%',
]

const xAxisCategories = ['12h', '24h', '36h', '48h', '60h', '72h', '84h']

export const Newsletter: FC<NewsletterProps> = ({
  TableTitle,
  TilesTitle,
  data,
  ChartTitle,
  OpensLabel,
  ClicksLabel,
  OpensColor,
  ClicksColor,
  ShowSizeChanger,
  ModalHeader,
  ModalVisible,
  ModalTitle,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [dataSource, setDataSource] = useState<DataProps[]>(data)

  const onSelectedRowKeysChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const selectRow = (record: { key: never }) => {
    const selectedRowKey = [...selectedRowKeys]
    if (selectedRowKey.indexOf(record.key) >= 0) {
      selectedRowKey.splice(selectedRowKey.indexOf(record.key), 1)
    } else {
      selectedRowKey.push(record.key)
    }
    setSelectedRowKeys(selectedRowKey)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'drag-visible',
      visible: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'drag-visible statusbtn',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (value) => <Button color="#54B2D3">{value}</Button>,
    },
    {
      title: 'Opened',
      dataIndex: 'isOpened',
      key: 'isOpened',
      className: 'drag-visible icon',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (value) =>
        value ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleOutlined />
        ),
    },
    {
      title: 'Clicked',
      dataIndex: 'isClicked',
      key: 'isClicked',
      className: 'drag-visible icon',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (value) =>
        value ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleOutlined />
        ),
    },
    {
      title: 'Booked',
      dataIndex: 'isBooked',
      key: 'isBooked',
      className: 'drag-visible icon',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (value) =>
        value ? (
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            className={styles.checkIcon}
          />
        ) : (
          <CloseCircleOutlined className={styles.checkIcon} />
        ),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      className: 'drag-visible revenue',
      visible: true,
    },
    {
      title: '',
      dataIndex: 'info',
      key: 'info',
      className: 'infoicon',
      visible: true,
      // eslint-disable-next-line react/display-name
      render: (info) => (
        <Tooltip
          placement="left"
          className={styles.tooltipInfo}
          title={
            <div className={styles.infoTooltip}>
              <p>
                <span>Sent:</span> {info.sent}
              </p>
              <p>
                <span>Delivered:</span> {info.delivered}
              </p>
              <p>
                <span>Opened:</span> {info.opened}
              </p>
              <p>
                <span>Clicked:</span> {info.clicked}
              </p>
              <p>
                <span>Bounced:</span> {info.bounced}
              </p>
            </div>
          }
        >
          <InfoCircleOutlined />{' '}
        </Tooltip>
      ),
    },
  ]

  return (
    <FullScreenReportModal
      visible={ModalVisible}
      operations={[]}
      subMenu={[]}
      title={ModalTitle}
    >
      <div className={styles.newsletterMainWrapper}>
        <div className={styles.highChartBlock}>
          <HighChart
            ChartTitle={ChartTitle}
            OpensLabel={OpensLabel}
            ClicksLabel={ClicksLabel}
            OpensColor={OpensColor}
            ClicksColor={ClicksColor}
            seriesData1={seriesData1}
            seriesData2={seriesData2}
            xAxisCategories={xAxisCategories}
            yAxisCategories={yAxisCategories}
          />
        </div>
        <div className={styles.statisticsSubscribersBlock}>
          <div className={styles.statisticsBlock}>
            <h2>{TilesTitle}</h2>
          </div>
          <div className={styles.subscribersBlock}>
            <div className={styles.head}>
              <h2>{TableTitle}</h2>
              <div className={styles.headSearchFilter}>
                <Search
                  placeholder="Search"
                  onSearch={(e) => {
                    const currValue = e
                    const filter = data.filter(
                      (entry: { name: string; email: string }) => {
                        return (
                          entry.name
                            .toLowerCase()
                            .includes(currValue.toLowerCase()) ||
                          entry.email
                            .toLowerCase()
                            .includes(currValue.toLowerCase())
                        )
                      }
                    )
                    setDataSource(filter)
                  }}
                  style={{ width: 200 }}
                />
                <Button
                  color="#54B2D3"
                  backgroundColor="white"
                  className={styles.filterBtn}
                  icon={<FilterOutlined />}
                >
                  Filter
                </Button>
              </div>
            </div>
            <div className={styles.subscribersTable}>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
                showSizeChanger={ShowSizeChanger}
                onRowClick={selectRow}
              />
            </div>
          </div>
        </div>
      </div>
    </FullScreenReportModal>
  )
}

export default Newsletter
