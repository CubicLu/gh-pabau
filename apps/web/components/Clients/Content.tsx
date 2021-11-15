import React, { useState, useEffect } from 'react'
import {
  TagOutlined,
  ImportOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { Button, Avatar, Table, Checkbox, Pagination } from '@pabau/ui'
import { Popover, Tooltip, Skeleton } from 'antd'
import useWindowSize from '../../hooks/useWindowSize'
import { Labels } from '../../pages/clients'
import CreateLabel from './CreateLabel'
import ManageColumnsPopover from './ManageColumnPopover'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import classNames from 'classnames'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'
import { getImage } from '../Uploaders/UploadHelpers/UploadHelpers'
import {
  AddLabelMutation,
  Exact,
  // useClientsDataQuery,
  useGetContactsLazyQuery,
  // useClientsDataLazyQuery,
  useGetContactsByLabelLazyQuery,
  useClientListContactsCountLazyQuery,
  useGetContactsByLabelCountLazyQuery,
} from '@pabau/graphql'
import styles from '../../pages/clients/clients.module.less'

interface P {
  searchText?: string
  handleLabelClick?: (e, val, id) => void
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
  // paginateData?: any
  // onPaginationChange?: (val) => void
  // getClientsCountLoading?: boolean
  // setPaginateData?: (val) => void
  labelsList?: any
  addLabelMutation?: (
    options?: MutationFunctionOptions<
      AddLabelMutation,
      Exact<{ text?: string; color?: string }>
    >
  ) => Promise<
    FetchResult<AddLabelMutation, Record<any, any>, Record<any, any>>
  >
  setLabelsList?: (val) => void
  insertContactsLabelsMutaton?: (val) => void
  selectedTab?: string
  filterLabelIds?: number[]
  appVersion?: string | string[]
  version?: string
}

export const ClientsContent = ({
  searchText = '',
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
  // paginateData,
  // onPaginationChange,
  // getClientsCountLoading,
  // setPaginateData,
  labelsList,
  setLabelsList,
  addLabelMutation,
  insertContactsLabelsMutaton,
  selectedTab,
  filterLabelIds,
  appVersion,
  version,
}: P) => {
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })

  // const [
  //   getClientData,
  //   { data, loading: clientDataLoading },
  // ] = useClientsDataLazyQuery({
  //   fetchPolicy: 'network-only',
  // })

  const [
    getContactList,
    { data, loading: contactsLoading },
  ] = useGetContactsLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [
    getContactsByLabel,
    { data: contactLabelData, loading: contactLabelLoading },
  ] = useGetContactsByLabelLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [
    getContactListCount,
    { data: getClientsCountData, loading: contactsListCountLoading },
  ] = useClientListContactsCountLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [
    getContactsByLabelCount,
    { data: getfilteredContactsCount, loading: filteredCountLoading },
  ] = useGetContactsByLabelCountLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [selectedPrimaryColumn, setSelectedPrimaryColumn] = useState([
    'Avatar',
    'Name',
    'Email',
    'Mobile Number',
    'Label',
  ])
  const [selectedSecondaryColumn, setSelectedSecondaryColumn] = useState([])
  const [clientsData, setClientsData] = useState(null)

  useEffect(() => {
    if (selectedTab !== 'createLabel') mapTabDetails(selectedTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, searchText])

  useEffect(() => {
    if (data?.findManyCmContact) setClientsData(data?.findManyCmContact)
    if (getClientsCountData?.findManyCmContactCount)
      setPaginateData((val) => ({
        ...val,
        total: getClientsCountData?.findManyCmContactCount,
        showingRecords: data?.findManyCmContact?.length || val?.showingRecords,
      }))
  }, [data, contactsLoading, getClientsCountData, contactsListCountLoading])

  useEffect(() => {
    if (contactLabelData?.findManyCmContact)
      setClientsData(contactLabelData?.findManyCmContact)
    if (getfilteredContactsCount?.findManyCmContactCount)
      setPaginateData((val) => ({
        ...val,
        total: getfilteredContactsCount?.findManyCmContactCount,
        showingRecords: contactLabelData?.findManyCmContact?.length,
      }))
  }, [
    contactLabelData,
    contactLabelLoading,
    getfilteredContactsCount,
    filteredCountLoading,
  ])

  const handlePaginationCall = (offset = 0, limit) => {
    const tabName = selectedTab?.split(',')[0]
    if (['clients', 'contacts'].includes(tabName)) {
      getContactList({
        variables: {
          offset: offset,
          limit: limit,
          searchTerm: '%' + searchText + '%',
        },
      })
    } else if (
      labelsList?.find((item) => item?.name === tabName?.split(',')[0])
    ) {
      getContactsByLabel({
        variables: {
          offset: offset,
          limit: limit,
          searchTerm: '%' + searchText + '%',
          labelIds: filterLabelIds,
        },
      })
    }
  }

  const onPaginationChange = (currentPage) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      currentPage,
    })
    handlePaginationCall(offset, paginateData?.limit)
  }

  const mapTabDetails = (tab) => {
    const tabName = tab?.split(',')[0]
    if (tabName === 'clients' || tabName === 'contacts') {
      getContactList({
        variables: {
          offset: paginateData.offset,
          limit: paginateData.limit,
          searchTerm: '%' + searchText + '%',
        },
      })

      getContactListCount({
        variables: {
          searchTerm: '%' + searchText + '%',
        },
      })
    } else if (
      labelsList?.find((item) => item?.name === tabName?.split(',')[0])
    ) {
      getContactsByLabel({
        variables: {
          offset: paginateData.offset,
          limit: paginateData.limit,
          searchTerm: '%' + searchText + '%',
          labelIds: filterLabelIds,
        },
      })
      getContactsByLabelCount({
        variables: {
          searchTerm: '%' + searchText + '%',
          labelIds: filterLabelIds,
        },
      })
    }
  }

  // useEffect(() => {
  //   if (data?.findManyCmContact) setClientsData(data?.findManyCmContact)
  //   if (
  //     !clientsDataLoading &&
  //     !filteredContactsLoading &&
  //     data?.findManyCmContact &&
  //     getfilteredContacts?.findManyCmContact
  //   )
  //     setIsLoading(false)
  // }, [data, clientsDataLoading, getfilteredContacts, filteredContactsLoading])

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
      render: function renderAvatar(data) {
        const { avatar, firstName } = data
        return (
          <div>
            <span className={styles.avatarWrapper}>
              <Avatar src={avatar && getImage(avatar)} name={firstName} />
            </span>
          </div>
        )
      },
    },
    {
      title: t('clients.content.column.name'),
      dataIndex: null,
      visible: visiblePrimaryColumns('Name'),
      render: function renderName(data) {
        const { firstName = '', lastName = '' } = data
        return <span>{`${firstName} ${lastName}` || ''}</span>
      },
    },
    {
      title: t('clients.content.column.email'),
      dataIndex: 'email',
      visible: visiblePrimaryColumns('Email'),
      render: function renderEmail(email) {
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
      dataIndex: 'labels',
      visible: visiblePrimaryColumns('Label'),
      render: function renderLabel(data) {
        // const { clientLabel } = data
        return (
          <Popover
            trigger={'hover'}
            placement={'bottom'}
            content={data?.map(
              (item, index) =>
                item && (
                  <div className={styles.contentLabel}>
                    <Button
                      className={styles.labelButton}
                      key={index}
                      style={{
                        border: `1px solid ${item?.label?.color}`,
                        color: item?.label?.color,
                      }}
                      backgroundColor={''}
                      onClick={(e) =>
                        handleLabelClick(e, item?.label?.name, item?.label?.id)
                      }
                      icon={<TagOutlined />}
                    >
                      {item?.label?.name}
                    </Button>
                  </div>
                )
            )}
          >
            <div className={styles.labelShow}>
              {data?.slice(0, 2).map(
                (item, index) =>
                  item && (
                    <Button
                      className={styles.labelButton}
                      key={index}
                      style={{
                        border: `1px solid ${item?.label?.color}`,
                        color: item?.label?.color,
                      }}
                      backgroundColor={''}
                      onClick={(e) =>
                        handleLabelClick(e, item?.label?.name, item?.label?.id)
                      }
                      icon={<TagOutlined />}
                    >
                      {item?.label?.name}
                    </Button>
                  )
              )}
              {/*<p>...</p>*/}
              {data?.length > 2 && !data.includes(undefined) ? (
                <p>
                  <b>. . .</b>
                </p>
              ) : null}
            </div>
          </Popover>
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
      render: function renderArchived(data) {
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

  const handleMobileSelectRow = (id) => {
    const selectedData = [...selectedRowKeys]
    const index = selectedData.indexOf(id)
    index === -1 ? selectedData.push(id) : selectedData.splice(index, 1)
    setSelectedRowKeys([...selectedData])
    handleRowClick({ id })
  }

  const mobileLabelPopupContent = (data) => {
    return (
      <div>
        {data?.labels?.map((label, index) => {
          return (
            <div className={styles.labelWrapper} key={index}>
              <Button
                className={styles.labelButton}
                style={{
                  border: `1px solid ${label?.label?.color}`,
                  color: label?.label?.color,
                }}
                onClick={(e) =>
                  handleLabelClick(e, label?.label?.name, label?.id)
                }
                icon={<TagOutlined />}
              >
                {label?.label?.name}
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
    <div
      className={
        size.width > 767
          ? appVersion === version
            ? styles.appViewContentWrapper
            : styles.tableContent
          : styles.tableContent
      }
    >
      {size.width > 767 &&
        appVersion !== version &&
        selectedRowKeys.length > 0 && (
          <div className={styles.headerContent}>
            <Checkbox
              indeterminate={
                selectedRowKeys.length > 0 &&
                selectedRowKeys.length !== data.findManyCmContact.length
              }
              //@@@TODO
              // onChange={onCheckAllChange}
              checked={selectedRowKeys.length === data.findManyCmContact.length}
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
              labelsList={labelsList}
              selectedRowKeys={selectedRowKeys}
              setLabelsList={setLabelsList}
              addLabelMutation={addLabelMutation}
              // sourceData={sourceData}
              insertContactsLabelsMutaton={insertContactsLabelsMutaton}
              // contactsLabels={contactsLabels}
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
      {size.width > 767 && appVersion !== version ? (
        <div>
          <Table
            dataSource={clientsData}
            scroll={{ x: 'max-content' }}
            columns={columns}
            pagination={false}
            noDataBtnText={t('clients.noDataBtnText')}
            noDataText={t('clients.noDataText')}
            rowSelection={rowSelection}
            showHeader={selectedRowKeys.length === 0}
            onRowClick={handleRowClick}
            // loading={isLoading}
            loading={contactsLoading || contactLabelLoading}
          />
        </div>
      ) : (
        // <div>
        //   <Table
        //     dataSource={dataSource()}
        //     scroll={{ x: 'max-content' }}
        //     sticky={{ offsetHeader: 80, offsetScroll: 0 }}
        //     columns={columns}
        //     pagination={false}
        //     noDataBtnText={t('clients.noDataBtnText')}
        //     noDataText={t('clients.noDataText')}
        //     rowSelection={rowSelection}
        //     showHeader={selectedRowKeys.length === 0}
        //     onRowClick={handleRowClick}
        //     loading={getClientsCountLoading}
        //   />
        //   <div className={styles.paginationContainer}>
        //     <Pagination
        //       total={paginateData.total}
        //       defaultPageSize={10}
        //       showSizeChanger={false}
        //       onChange={onPaginationChange}
        //       pageSize={paginateData.limit}
        //       current={paginateData.currentPage}
        //       showingRecords={paginateData.showingRecords}
        //       pageSizeOptions={['10', '25', '50', '100']}
        //       onPageSizeChange={(pageSize) => {
        //         setPaginateData({
        //           ...paginateData,
        //           offset: 0,
        //           limit: pageSize,
        //           currentPage: 1,
        //         })
        //       }}
        //     />
        //   </div>
        // </div> contactsLoading || contactLabelLoading
        <div className={styles.clientMainWrapper}>
          {contactsLoading || contactLabelLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div key={item} className={styles.clientMobSkeletonWrap}>
                  <div className={styles.clientAvatar}>
                    <Skeleton.Avatar
                      active={true}
                      size="large"
                    ></Skeleton.Avatar>
                  </div>
                  <div className={styles.clientContentWrapper}>
                    <div className={styles.name}>
                      <Skeleton.Input active={true} size="small" />
                    </div>
                    <div className={styles.email}>
                      <Skeleton.Input active={true} size="small" />
                    </div>
                  </div>
                </div>
              ))
            : clientsData

                //TODO move this .map() to .graphql
                // ?.map((e) => ({
                //   ...e,
                //   label: [
                //     { label: 'abcd', color: 'red' },
                //     { label: 'asdf', color: 'green' },
                //   ],
                // }))

                ?.map((data) => (
                  <div
                    key={data?.id}
                    className={classNames(styles.clientMobWrap, {
                      [styles.selectedRowClass]: selectedRowKeys.includes(
                        data?.id
                      ),
                    })}
                    onClick={() => handleMobileSelectRow(data?.id)}
                  >
                    <div className={styles.avatarClientIcon}>
                      <Avatar
                        src={data?.avatar && getImage(data?.avatar)}
                        name={data?.firstName}
                        size={40}
                      />
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
                        {data?.labels?.length > 0 && (
                          <Button
                            icon={<TagOutlined />}
                            style={
                              data?.labels?.length === 1
                                ? {
                                    border: `1px solid ${data?.labels[0]?.label?.color}`,
                                    color: data?.labels[0]?.label?.color,
                                  }
                                : {
                                    border: '1px solid rgba(84, 178, 211, 1)',
                                    color: 'rgba(84, 178, 211, 1)',
                                  }
                            }
                          >
                            {data?.labels?.length === 1
                              ? data?.labels[0]?.label?.name
                              : `${data?.labels?.length} ${t(
                                  'quickCreate.client.modal.general.labels'
                                )}`}
                          </Button>
                        )}
                      </Popover>
                    </div>
                  </div>
                ))}
        </div>
      )}
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
              currentPage: 1,
            })
            handlePaginationCall(0, pageSize)
          }}
        />
      </div>
    </div>
  )
}

export default ClientsContent
