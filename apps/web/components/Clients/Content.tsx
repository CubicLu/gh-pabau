import React, { FC, useState } from 'react'
import {
  TagOutlined,
  ImportOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { Button, Avatar, Table, Checkbox, Pagination } from '@pabau/ui'
import styles from '../../pages/clients/clients.module.less'
import { Image, Popover, Skeleton, Tooltip } from 'antd'
import { useMedia } from 'react-use'
import { Labels } from '../../pages/clients'
import CreateLabel from './CreateLabel'
import ManageColumnsPopover from './ManageColumnPopover'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import classNames from 'classnames'
import { useImage } from '../../hooks/cdn'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'
import { AddLabelMutation, Exact } from '@pabau/graphql'

interface ClientsContentProps {
  searchText?: string
  sourceData?: SourceDataProps[]
  handleLabelClick?: (e, val) => void
  isArchived?: boolean
  labels?: Labels[]
  setLabels?: (val: Labels[]) => void
  selectedLabels?: Labels[]
  setSelectedLabels?: (val: Labels[]) => void
  defaultSelectedLabels?: Labels[]
  setDefaultSelectedLabels?: (val: Labels[]) => void
  handleDeleteClick?: () => void
  selectedRowKeys: number[]
  setSelectedRowKeys: (val: number[]) => void
  handleApplyLabel?: (val) => void
  handleRowClick?: (val) => void
  handleRecoverClick?: (val) => void
  paginateData?: any
  onPaginationChange?: (val) => void
  getClientsCountLoading?: boolean
  setPaginateData?: (val) => void
  testLabels?: any
  addLabelMutation?: (
    options?: MutationFunctionOptions<
      AddLabelMutation,
      Exact<{ text?: string; color?: string }>
    >
  ) => Promise<
    FetchResult<AddLabelMutation, Record<any, any>, Record<any, any>>
  >
  setTestLabels?: (val) => void
  contactsLabels?: any
  getContactsLabelsQuery?: (val) => void
  getLabelsQuery?: (val) => void
  insertContactsLabelsMutaton?: (val) => void
}

export interface SourceDataProps {
  id: number
  firstName?: string
  lastName?: string
  email?: string
  mobileNumber?: string
  label?: Labels[]
  is_active?: number
  date_archived?: string
  dob?: string
  postal?: string
  city?: string
  priceQuote?: string
  orderNotes?: string
  setupFee?: string
  is_dismissed?: boolean
  avatar?: string
  labelTest?: any
  setTestLabels?: (val) => void
}

export const ClientsContent: FC<ClientsContentProps> = ({
  searchText,
  sourceData,
  handleLabelClick,
  isArchived,
  labels,
  setLabels,
  selectedLabels,
  setSelectedLabels,
  handleDeleteClick,
  selectedRowKeys,
  setSelectedRowKeys,
  defaultSelectedLabels,
  setDefaultSelectedLabels,
  handleApplyLabel,
  handleRowClick,
  handleRecoverClick,
  paginateData,
  onPaginationChange,
  getClientsCountLoading,
  setPaginateData,
  testLabels,
  setTestLabels,
  getContactsLabelsQuery,
  getLabelsQuery,
  addLabelMutation,
  insertContactsLabelsMutaton,
  contactsLabels,
}) => {
  const { t } = useTranslationI18()
  const isMobile = useMedia('(max-width: 768px)', false)
  const [selectedPrimaryColumn, setSelectedPrimaryColumn] = useState([
    'Avatar',
    'Name',
    'Email',
    'Mobile Number',
    'Label',
  ])
  const [selectedSecondaryColumn, setSelectedSecondaryColumn] = useState([])
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  }

  const visiblePrimaryColumns = (name) => {
    return selectedPrimaryColumn.includes(name)
  }

  const visibleSecondaryColumns = (name) => {
    return selectedSecondaryColumn.includes(name)
  }

  const handleRecover = (e, data) => {
    e.stopPropagation()
    handleRecoverClick(data)
  }

  const columns = [
    {
      title: '',
      dataIndex: null,
      visible: visiblePrimaryColumns('Avatar'),
      columnType: 'avatar',
      // eslint-disable-next-line react/display-name
      // render: (data) => {
      //   const { firstName } = data
      //   return (
      //     <div>
      //       <span className={styles.avatarWrapper}>
      //         <Avatar name={firstName} />
      //       </span>
      //     </div>
      //   )
      // },
      // eslint-disable-next-line react/display-name
      render: (data) => {
        const { avatar, firstName } = data
        return (
          <div>
            <span className={styles.avatarWrapper}>
              {/*<img src="/cdn/attachments/8254/avatar_photos/thumb_20200108142441.jpeg?time=1578493621" />*/}
              {/*<img>{data.avatar}</img>*/}
              {/*<Image src={data.avatar} preview={false} />*/}
              {/*<Avatar size={40} src={data.avatar} />*/}
              {avatar ? (
                // <Avatar size={30} src={useImage(avatar)} />
                <div>{firstName}</div>
              ) : (
                // <div style={{ background: useImage(avatar) }}></div>
                // <Avatar name={firstName} />
                <div>{firstName}</div>
              )}
            </span>
          </div>
        )
      },
    },
    {
      title: t('clients.content.column.name'),
      dataIndex: null,
      visible: visiblePrimaryColumns('Name'),
      // eslint-disable-next-line react/display-name
      render: (data) => {
        const { firstName = '', lastName = '' } = data
        return <span>{`${firstName} ${lastName}` || ''}</span>
      },
    },
    {
      title: t('clients.content.column.email'),
      dataIndex: 'email',
      visible: visiblePrimaryColumns('Email'),
      // eslint-disable-next-line react/display-name
      render: (email) => {
        return <span>{email || ''}</span>
      },
    },
    {
      title: t('clients.content.column.mobileNumber'),
      dataIndex: 'mobileNumber',
      visible: visiblePrimaryColumns('Mobile Number'),
    },
    {
      title: (
        <div className={styles.labelWrapper}>
          {t('clients.content.column.label')}
        </div>
      ),
      dataIndex: 'labelTest',
      visible: visiblePrimaryColumns('Label'),
      // eslint-disable-next-line react/display-name
      render: (labelTest) => {
        // console.log('contentLabelTest', labelTest)
        return (
          <div className={styles.labelWrapper}>
            {labelTest?.map((label) => (
              <Button
                className={styles.labelButton}
                key={label.id}
                style={{
                  border: `1px solid ${label.color}`,
                  color: label.color,
                }}
                backgroundColor={''}
                onClick={(e) => handleLabelClick(e, label.text)}
                icon={<TagOutlined />}
              >
                {label.text}
              </Button>
            ))}
          </div>
        )
      },
    },
    {
      title: t('clients.content.column.dob'),
      dataIndex: 'dob',
      visible: visiblePrimaryColumns('Date of Birth'),
    },
    {
      title: t('clients.content.column.postal'),
      dataIndex: 'postal',
      visible: visiblePrimaryColumns('Postal'),
    },
    {
      title: t('clients.content.column.city'),
      dataIndex: 'city',
      visible: visiblePrimaryColumns('City'),
    },
    {
      title: t('clients.content.column.priceQuote'),
      dataIndex: 'priceQuote',
      visible: visibleSecondaryColumns('Price Quote'),
    },
    {
      title: t('clients.content.column.orderNotes'),
      dataIndex: 'orderNotes',
      visible: visibleSecondaryColumns('Order Notes'),
    },
    {
      title: t('clients.content.column.setupFee'),
      dataIndex: 'setupFee',
      visible: visibleSecondaryColumns('Setup Fee'),
    },
    {
      title: t('clients.content.column.date_archived'),
      dataIndex: null,
      visible: isArchived,
      // eslint-disable-next-line react/display-name
      render: (data) => {
        const { date_archived = '' } = data
        return (
          date_archived && (
            <div className={styles.wrapArchivedDate}>
              <span className={styles.archivedDate}>{date_archived}</span>
              <Button
                className={styles.recoverButton}
                onClick={(e) => handleRecover(e, data)}
              >
                {t('clients.content.button.recover')}
              </Button>
            </div>
          )
        )
      },
    },
  ]

  const onCheckAllChange = () => {
    if (selectedRowKeys.length !== dataSource().length) {
      setSelectedRowKeys(dataSource().map((data) => data.id))
    } else {
      setSelectedRowKeys([])
    }
  }

  const handleMobileSelectRow = (id) => {
    const selectedData = [...selectedRowKeys]
    const index = selectedData.indexOf(id)
    index === -1 ? selectedData.push(id) : selectedData.splice(index, 1)
    setSelectedRowKeys([...selectedData])
  }

  const dataSource = () => {
    if (isArchived) {
      return sourceData?.map((e: { id }) => ({
        key: e.id,
        ...e,
      }))
    } else {
      return sourceData
        ?.filter((e) => e.is_active === 1)
        .map((e: { id }) => ({
          key: e.id,
          ...e,
        }))
    }
  }

  const mobileLabelPopupContent = (data) => {
    return (
      <div>
        {data.label?.map((label, index) => {
          return (
            <div className={styles.labelWrapper} key={index}>
              <Button
                className={styles.labelButton}
                style={{
                  border: `1px solid ${label.color}`,
                  color: label.color,
                }}
                onClick={(e) => handleLabelClick(e, label.label)}
                icon={<TagOutlined />}
              >
                {label.label}
              </Button>
            </div>
          )
        })}
      </div>
    )
  }

  const renderTooltip = ({ title, icon }) => {
    return <Tooltip title={title}>{icon}</Tooltip>
  }

  return (
    <div className={styles.tableContent}>
      {!isMobile && selectedRowKeys.length > 0 && (
        <div className={styles.headerContent}>
          <Checkbox
            indeterminate={
              selectedRowKeys.length > 0 &&
              selectedRowKeys.length !== dataSource().length
            }
            onChange={onCheckAllChange}
            checked={selectedRowKeys.length === dataSource().length}
          ></Checkbox>
          <CreateLabel
            selectedLabels={selectedLabels}
            setSelectedLabels={setSelectedLabels}
            labels={labels}
            setLabels={setLabels}
            fromHeader={true}
            defaultSelectedLabels={defaultSelectedLabels}
            setDefaultSelectedLabels={setDefaultSelectedLabels}
            handleApplyLabel={handleApplyLabel}
            testLabels={testLabels}
            selectedRowKeys={selectedRowKeys}
            setTestLabels={setTestLabels}
            getContactsLabelsQuery={getContactsLabelsQuery}
            getLabelsQuery={getLabelsQuery}
            addLabelMutation={addLabelMutation}
            sourceData={sourceData}
            insertContactsLabelsMutaton={insertContactsLabelsMutaton}
            contactsLabels={contactsLabels}
          >
            {renderTooltip({
              title: t('clients.leftSidebar.createLabels'),
              icon: <TagOutlined />,
            })}
          </CreateLabel>
          {[
            {
              title: t('clients.leftSidebar.import'),
              icon: <ImportOutlined />,
            },
            {
              title: t('clients.leftSidebar.export'),
              icon: <CloudDownloadOutlined />,
            },
            {
              title: t('clients.content.button.delete'),
              icon: <DeleteOutlined onClick={handleDeleteClick} />,
            },
          ].map((data) => {
            return renderTooltip({
              title: data.title,
              icon: data.icon,
            })
          })}
          <ManageColumnsPopover
            selectedPrimaryColumn={selectedPrimaryColumn}
            setSelectedPrimaryColumn={setSelectedPrimaryColumn}
            selectedSecondaryColumn={selectedSecondaryColumn}
            setSelectedSecondaryColumn={setSelectedSecondaryColumn}
          >
            {renderTooltip({
              title: t('clients.content.button.manageColumns'),
              icon: <AppstoreOutlined />,
            })}
          </ManageColumnsPopover>
        </div>
      )}
      {!isMobile ? (
        <div>
          <Table
            dataSource={dataSource()}
            scroll={{ x: 'max-content' }}
            columns={columns}
            pagination={false}
            noDataBtnText={t('clients.noDataBtnText')}
            noDataText={t('clients.noDataText')}
            rowSelection={rowSelection}
            showHeader={selectedRowKeys.length === 0}
            onRowClick={handleRowClick}
            loading={getClientsCountLoading}
          />
          <div className={styles.paginationContainer}>
            <Pagination
              total={paginateData.total}
              defaultPageSize={10}
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSize={paginateData.limit}
              current={paginateData.currentPage}
              showingRecords={paginateData.showingRecords}
              pageSizeOptions={['10', '25', '50', '100']}
              onPageSizeChange={(pageSize) => {
                setPaginateData({
                  ...paginateData,
                  offset: 0,
                  limit: pageSize,
                })
              }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.clientMainWrapper}>
          {dataSource().map((data: SourceDataProps) => {
            return (
              <div
                key={data.id}
                className={classNames(styles.clientMobWrap, {
                  [styles.selectedRowClass]: selectedRowKeys.includes(data.id),
                })}
                onClick={() => handleMobileSelectRow(data.id)}
              >
                <div className={styles.avatarClientIcon}>
                  <Avatar name={data.firstName} />
                </div>
                <div className={styles.clientContent}>
                  <h5>{`${data.firstName} ${data.lastName}`}</h5>
                  <span>{data.email}</span>
                  <span>{data.mobileNumber}</span>
                </div>
                <div className={styles.badgeClient}>
                  <Popover
                    content={() => mobileLabelPopupContent(data)}
                    trigger={'click'}
                    placement={'bottom'}
                  >
                    {data.label.length > 0 && (
                      <Button
                        icon={<TagOutlined />}
                        style={
                          data.label.length === 1
                            ? {
                                border: `1px solid ${data.label[0].color}`,
                                color: data.label[0].color,
                              }
                            : {
                                border: '1px solid rgba(84, 178, 211, 1)',
                                color: 'rgba(84, 178, 211, 1)',
                              }
                        }
                      >
                        {data.label.length === 1
                          ? data.label[0].label
                          : `${data.label.length} ${t(
                              'quickCreate.client.modal.general.labels'
                            )}`}
                      </Button>
                    )}
                  </Popover>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ClientsContent
