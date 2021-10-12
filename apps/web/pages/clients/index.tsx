import { useEffect, useState } from 'react'
import LayoutComponent from '../../components/Layout/Layout'
import { useUser } from '../../context/UserContext'
import useWindowSize from '../../hooks/useWindowSize'
import { Layout, Tabs } from 'antd'
import AddButton from '../../components/AddButton'
import styles from './clients.module.less'
import ClientsHeader from '../../components/Clients/ClientsHeader'
import LeftSideBar from '../../components/Clients/LeftSideBar'
import ContentComponent from '../../components/Clients/Content'
import CommonHeader from '../../components/CommonHeader'
import MergeComponent from '../../components/Clients/MergeComponent'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { BasicModal } from '@pabau/ui'
import confetti from 'canvas-confetti'
import ClientCreate from '../../components/Clients/ClientCreate'
import router from 'next/router'

const { TabPane } = Tabs
const { Sider, Content } = Layout

//TODO: dont put this in pages
export interface Labels {
  label?: string
  count?: number
  color?: string
}

//TODO remove this
export const tab = {
  contacts: 'contacts',
  clients: 'clients',
  archived: 'archived',
  mergeFix: 'mergeFix',
  createLabel: 'createLabel',
  import: 'import',
  export: 'export',
  labels: 'labels',
}

export const Clients = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedTab, setSelectedTab] = useState(tab.clients)
  const [isArchived, setIsArchived] = useState(false)
  const [selectedLabels, setSelectedLabels] = useState<Labels[]>([])
  const [defaultSelectedLabels, setDefaultSelectedLabels] = useState<Labels[]>(
    []
  )
  const [createClientModalVisible, setCreateClientModalVisible] = useState(
    false
  )
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [active, setActive] = useState(true)
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const user = useUser()

  useEffect(() => {
    selectedTab === tab.archived ? setIsArchived(true) : setIsArchived(false)
    if (selectedTab === tab.clients || selectedTab === tab.archived) {
      setSelectedRowKeys([])
    }
  }, [selectedTab])

  const handleLabelClick = (e, label) => {
    if (e) {
      e.stopPropagation()
    }
    setSelectedTab(label)
  }

  const handleDeleteToggle = () => {
    setDeleteModal((e) => !e)
  }

  const toggleCreateClientModal = () => {
    setCreateClientModalVisible((e) => !e)
  }

  const closeEditModal = () => {
    setIsEdit(false)
    setActive(false)
  }

  const handleRowClick = ({ id }) => {
    router.push('/clients/[id]', `/clients/${id}`, { scroll: true })
  }

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }

  const displayConfetti = () => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6, x: 0.6 },
    })
  }

  const renderContentTable = (
    <ContentComponent
      searchText={searchText}
      handleLabelClick={handleLabelClick}
      isArchived={isArchived}
      selectedLabels={selectedLabels}
      setSelectedLabels={setSelectedLabels}
      handleDeleteClick={handleDeleteToggle}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      defaultSelectedLabels={defaultSelectedLabels}
      setDefaultSelectedLabels={setDefaultSelectedLabels}
      handleApplyLabel={() => console.log('TODO')}
      handleRowClick={handleRowClick}
      // handleRecoverClick={handleRecoverClick}
    />
  )

  const renderMergeComponent = (
    <MergeComponent
      // duplicateData={duplicateDataList}
      // onDismiss={handleDismiss}
      onMerge={() => displayConfetti()}
      onMergeAll={() => displayConfetti()}
    />
  )

  return (
    <div>
      <LayoutComponent active={'clients'} isDisplayingFooter={false} {...user}>
        <CommonHeader
          isShowSearch
          searchInputPlaceHolder={t('clients.header.search.placeHolder')}
          handleSearch={(searchTerm) => setSearchText(searchTerm)}
          title={t('clients.commonHeader')}
          searchValue={searchText}
        >
          <AddButton
            onClick={toggleCreateClientModal}
            onFilterSource={() => false}
            addFilter={true}
            schema={{
              createButtonLabel: t('setup.taxrate.newbtn'),
            }}
            tableSearch={false}
            needTranslation={true}
          />
        </CommonHeader>
        <div>
          {size.width < 768 && (
            <Tabs
              style={{ minHeight: '0vh' }}
              className={styles.tabContentWrap}
              onChange={(val) => setSelectedTab(val)}
              defaultActiveKey={selectedTab}
            >
              <TabPane tab={t('clients.leftSidebar.clients')} key={tab.clients}>
                {renderContentTable}
              </TabPane>
              <TabPane
                tab={t('clients.leftSidebar.contacts')}
                key={tab.contacts}
              >
                {renderContentTable}
              </TabPane>
              <TabPane
                tab={t('clients.leftSidebar.mergeFix')}
                key={tab.mergeFix}
              >
                {renderMergeComponent}
              </TabPane>
              <TabPane
                tab={t('clients.leftSidebar.archived')}
                key={tab.archived}
              >
                {renderContentTable}
              </TabPane>
            </Tabs>
          )}
          {size.width > 767 && (
            <div>
              <ClientsHeader
                searchText={searchText}
                setSearchText={setSearchText}
                toggleCreateClientModal={toggleCreateClientModal}
              />
              <Layout className={styles.clientBodyWrap}>
                <Sider>
                  <LeftSideBar
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    selectedLabels={selectedLabels}
                    setSelectedLabels={setSelectedLabels}
                    handleLabelClick={handleLabelClick}
                  />
                </Sider>
                <Content>
                  {selectedTab === tab.mergeFix ? (
                    <div className={styles.mergeComponentWrap}>
                      {renderMergeComponent}
                    </div>
                  ) : (
                    <div>{renderContentTable}</div>
                  )}
                </Content>
              </Layout>
            </div>
          )}
        </div>
      </LayoutComponent>
      {(createClientModalVisible || isEdit) && (
        <ClientCreate
          modalVisible={createClientModalVisible || isEdit}
          handleClose={isEdit ? closeEditModal : toggleCreateClientModal}
          handleSubmit={() => console.log('TODO')}
          isEdit={isEdit}
          activated={active}
          onActivated={(val) => setActive(val)}
          // editedValues={
          //   isEdit && {
          //     Fname: editedValues?.firstName,
          //     Lname: editedValues?.lastName,
          //     gender: t('quickCreate.client.modal.general.gender.other'),
          //     MarketingSource: t(
          //       'quickCreate.client.modal.general.hearOption.selectOption'
          //     ),
          //     DOB: dayjs(editedValues?.dob, 'DD-MM-YYYY'),
          //     Email: editedValues?.email,
          //     Mobile: editedValues?.mobileNumber,
          //     Phone: '',
          //     MailingCity: editedValues?.city,
          //     MailingPostal: editedValues?.postal,
          //   }
          // }
          handleDelete={handleDeleteToggle}
          deleteModalVisible={deleteModal}
          onDelete={() => console.log('TODO')}
          // defaultLabels={isEdit ? editedValues.label : labels}
          // defaultSelectedLabels={isEdit && editedValues?.label}
        />
      )}
      {!isEdit && (
        <BasicModal
          modalWidth={682}
          centered={true}
          visible={deleteModal}
          title={t('clients.content.delete.title')}
          newButtonText={t('clients.content.delete.confirm.yes')}
          onOk={() => console.log('TODO')}
          onCancel={handleDeleteToggle}
        >
          <span
            style={{
              fontFamily: 'Circular-Std-Book',
              fontWeight: 'normal',
              fontSize: '16px',
              lineHeight: '20px',
              color: '#9292A3',
            }}
          >
            {t('clients.content.delete.confirmMessage')}
          </span>
        </BasicModal>
      )}
    </div>
  )
}

export default Clients
