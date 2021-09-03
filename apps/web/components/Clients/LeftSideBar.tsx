import React, { FC } from 'react'
import { Menu } from 'antd'
import {
  TagOutlined,
  PlusCircleOutlined,
  ImportOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { ReactComponent as ArchivedIcon } from '../../assets/images/archived-icon.svg'
import styles from '../../pages/clients/clients.module.less'
import { SourceDataProps } from './Content'
import CreateLabel from './CreateLabel'
import { Labels, tab } from '../../pages/clients'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'
import { AddLabelMutation, Exact } from '@pabau/graphql'

const { SubMenu } = Menu

interface LeftSideBarProps {
  selectedTab?: string
  setSelectedTab?: (val) => void
  labels?: Labels[]
  sourceData?: SourceDataProps[]
  handleLabelClick?: (e, val) => void
  handleClientClick?: () => void
  handleArchivedClick?: () => void
  setLabels?: (val: Labels[]) => void
  selectedLabels?: Labels[]
  setSelectedLabels?: (val: Labels[]) => void
  duplicateData?: SourceDataProps[][]
  getClientsCountData?: any
  duplicateContactsCount?: any
  labelsList?: any
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
}

export const LeftSideBar: FC<LeftSideBarProps> = ({
  selectedTab,
  setSelectedTab,
  labels,
  sourceData,
  handleLabelClick,
  handleClientClick,
  handleArchivedClick,
  setLabels,
  selectedLabels,
  setSelectedLabels,
  getClientsCountData,
  duplicateContactsCount,
  labelsList,
  addLabelMutation,
  handleApplyLabel,
  labelCountAll,
  contactsLabels,
}) => {
  const { t } = useTranslationI18()

  const handleSelectedTab = (e) => {
    setSelectedTab(e.key)
  }

  const getValueByKey = (object, key) => {
    return Object.values(object).find((value) => object[key] === value)
  }

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
            <span>{getClientsCountData?.cmContactsCount}</span>
          </div>
        </Menu.Item>
        <Menu.Item key={tab.contacts}>
          <div>
            <span>{t('clients.leftSidebar.contacts')}</span>
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
              labelsList.length > 10
                ? {
                    minHeight: '200px',
                    maxHeight: '400px',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                  }
                : null
            }
            key={tab.labels}
            title={'no title'}
            className={styles.modifiedItem}
          >
            {labelsList?.map((label) => {
              return (
                label?.name && (
                  <Menu.Item
                    key={`${label.name}`}
                    onClick={() => handleLabelClick(false, label.name)}
                  >
                    <div className={styles.clientMenuItem}>
                      <span>
                        <TagOutlined />
                        &nbsp;{label.name}
                      </span>
                      {getValueByKey(labelCountAll, label.id)}
                    </div>
                  </Menu.Item>
                )
              )
            })}
          </SubMenu>
          <Menu.Item key={tab.createLabel}>
            <CreateLabel
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
              labels={labels}
              labelsList={labelsList}
              setLabels={setLabels}
              addLabelMutation={addLabelMutation}
              handleApplyLabel={handleApplyLabel}
              contactsLabels={contactsLabels}
              sourceData={sourceData}
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
