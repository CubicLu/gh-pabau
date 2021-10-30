import React, { useState, useEffect } from 'react'
import { Menu, Skeleton } from 'antd'
import {
  TagOutlined,
  PlusCircleOutlined,
  ImportOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { ReactComponent as ArchivedIcon } from '../../assets/images/archived-icon.svg'
import CreateLabel from './CreateLabel'
import classNames from 'classnames'
import { Labels, tab } from '../../pages/clients'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'
import {
  AddLabelMutation,
  Exact,
  // useClientsDataAggregateQuery,
  useClientListContactsCountQuery,
  // useGetLabelsQuery,
} from '@pabau/graphql'
import styles from '../../pages/clients/clients.module.less'

const { SubMenu } = Menu

interface P {
  selectedTab?: string
  setSelectedTab?: (val) => void
  labels?: Labels[]
  // sourceData?: SourceDataProps[]
  handleLabelClick?: (e, val, id) => void
  handleClientClick?: () => void
  handleArchivedClick?: () => void
  setLabels?: (val: Labels[]) => void
  selectedLabels?: Labels[]
  setSelectedLabels?: (val: Labels[]) => void
  // duplicateData?: SourceDataProps[][]
  getClientsCountData?: any
  duplicateContactsCount?: any
  labelsList?: any
  labelLoading?: boolean
  setLabelsList?: (val) => void
  handleApplyLabel?: (val) => void
  labelCountAll?: any
  contactsLabels?: any
  selectedRowKeys?: any
  addLabelMutation?: (
    options?: MutationFunctionOptions<
      AddLabelMutation,
      Exact<{ text?: string; color?: string }>
    >
  ) => Promise<
    FetchResult<AddLabelMutation, Record<any, any>, Record<any, any>>
  >
  searchText?: string
}

export const LeftSideBar = ({
  selectedTab,
  setSelectedTab,
  labels,
  // sourceData,
  handleLabelClick,
  handleClientClick,
  handleArchivedClick,
  setLabels,
  selectedLabels,
  setSelectedLabels,
  getClientsCountData,
  duplicateContactsCount,
  labelsList,
  labelLoading,
  addLabelMutation,
  handleApplyLabel,
  labelCountAll,
  contactsLabels,
  searchText = '',
}: P) => {
  const { t } = useTranslationI18()
  // const { data } = useClientsDataAggregateQuery()
  const { data } = useClientListContactsCountQuery({
    variables: {
      searchTerm: '%' + searchText + '%',
    },
  })
  // const { data: labelList, loading: labelListLoading } = useGetLabelsQuery()

  const [labelData, setLabelData] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (labelsList?.length) {
      setLabelData(labelsList)
    }
    if (!labelLoading && labelsList?.length) setIsLoading(false)
  }, [labelsList, labelLoading])

  // const getAllLabelsCount = (data) => {
  //   const labels = [...data]
  //   let cnt
  //   return labels.map((item) => {
  //     const { CmContactLabel } = item
  //     cnt = 0
  //     for (const l of CmContactLabel) {
  //       if (!!l.CmContact.is_active === true) {
  //         cnt++
  //       }
  //     }
  //     return { ...item, count: cnt }
  //   })
  // }

  const handleSelectedTab = (e) => {
    setSelectedTab(e.key)
  }

  // const getValueByKey = (object, key) => { to be removed
  //   return object.find((item) => item.id === key)?.['count']
  // }

  return (
    <div className={styles.clientLeftSidebar}>
      <Menu
        className={styles.clientMenu}
        defaultSelectedKeys={[tab.clients]}
        selectedKeys={[selectedTab]}
        defaultOpenKeys={['mainLabels', tab.labels]}
        mode="inline"
        onClick={handleSelectedTab}
      >
        <Menu.Item key={tab.clients} onClick={handleClientClick}>
          <div className={styles.clientMenuItem}>
            <span>{t('clients.leftSidebar.clients')}</span>
            {/*<span>{getClientsCountData?.cmContactsCount}</span>*/}
            <span>{data?.findManyCmContactCount}</span>
          </div>
        </Menu.Item>
        <Menu.Item key={tab.contacts}>
          <div className={styles.clientMenuItem}>
            <span>{t('clients.leftSidebar.contacts')}</span>
            <span>{data?.findManyCmContactCount}</span>
          </div>
        </Menu.Item>
        <Menu.Item key={tab.mergeFix}>
          <div className={styles.clientMenuItem}>
            <span>{t('clients.leftSidebar.mergeFix')}</span>
            {/* <span>
              {duplicateContactsCount?.duplicateContacts.length > 0 &&
                duplicateContactsCount?.duplicateContacts.length}
            </span> */}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <SubMenu title={t('clients.leftSidebar.labels')} key="mainLabels">
          <SubMenu
            style={
              labelData?.length > 10
                ? {
                    height: '200px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }
                : null
            }
            key={tab.labels}
            title={'no title'}
            className={styles.modifiedItem}
          >
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <Menu.Item key={item}>
                    <div className={styles.labelSkeletonWrapper}>
                      <Skeleton.Input
                        className={styles.tag}
                        active={true}
                        size="small"
                      />
                      <Skeleton.Input
                        className={styles.text}
                        active={true}
                        size="small"
                      />
                    </div>
                  </Menu.Item>
                ))
              : labelData?.map((label) => {
                  return (
                    label?.name && (
                      <div
                        key={`${label.name}`}
                        onClick={() =>
                          handleLabelClick(false, label.name, label.id)
                        }
                      >
                        <div
                          className={
                            selectedTab?.split(',').includes(label.name)
                              ? classNames(
                                  styles.clientMenuItemLabel,
                                  styles.active
                                )
                              : styles.clientMenuItemLabel
                          }
                        >
                          <span>
                            <TagOutlined /> {label.name}
                          </span>
                          {/* <span>{getValueByKey(labelCountAll, label.id)}</span> */}
                          <span>{label?.count}</span>
                        </div>
                      </div>
                    )
                  )
                })}
          </SubMenu>
          <Menu.Item key={tab.createLabel}>
            <CreateLabel
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
              labels={labels}
              labelsList={labelData}
              setLabels={setLabels}
              addLabelMutation={addLabelMutation}
              handleApplyLabel={handleApplyLabel}
              // contactsLabels={contactsLabels}
              // sourceData={sourceData}
            >
              <div>
                <PlusCircleOutlined /> {t('clients.leftSidebar.createLabels')}
              </div>
            </CreateLabel>
          </Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <Menu.Item key={tab.import}>
          <div>
            <ImportOutlined />
            <span>{t('clients.leftSidebar.import')}</span>
          </div>
        </Menu.Item>
        <Menu.Item key={tab.export}>
          <div>
            <ExportOutlined />
            <span>{t('clients.leftSidebar.export')}</span>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key={tab.archived} onClick={handleArchivedClick}>
          <div className={styles.wrapArchived}>
            <span className={styles.archivedIcon}>
              <ArchivedIcon />
            </span>
            <span>{t('clients.leftSidebar.archived')}</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default LeftSideBar
