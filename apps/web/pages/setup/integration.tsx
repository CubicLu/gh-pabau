import {
  Breadcrumb,
  InstallationModal,
  SetupEmptySearch,
  SetupSearchInput,
} from '@pabau/ui'
import { Card, Tabs, Typography } from 'antd'
import React, { FC, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useMedia } from 'react-use'
import CommonHeader from '../../components/CommonHeader'
import Layout from '../../components/Layout/Layout'
import IntegrationHeader, {
  IntegrationTabBody,
  ModalSchema,
} from '../../components/Integration/Integration'
import { useUser } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { setupIntegrationData } from '../../mocks/SetupIntegration'
import logo from './../../assets/images/pabau-badge-1.png'
import styles from './integration.module.less'
const { Title } = Typography
const { TabPane } = Tabs

interface SearchItemProps {
  key: number
  categories: string
  title: string
}

interface SearchProps {
  data: SearchItemProps[]
  searchString: string
}

const Search: FC<SearchProps> = ({ data, searchString }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [modalData, setModalData] = useState<ModalSchema>({
    title: '',
    subTitle: '',
    installed: 0,
    logoImage: logo,
    categories: [],
  })
  const { t } = useTranslationI18()
  const {
    integrationBodyCollections,
    worksWith,
    longDescription,
    mobileViewDescription,
    webViewDescription,
  } = setupIntegrationData(t)

  const modalOpen = (key: number) => {
    const tempIntegrationBodyCollections = [...integrationBodyCollections]
    const data = tempIntegrationBodyCollections.find((item) => item.key === key)
    setIsModalVisible(true)
    setModalData(data)
  }
  return (
    <Card className={styles.searchResultsCard} bodyStyle={{ padding: '0' }}>
      {data && data.length > 0 && (
        <div className={styles.searchBody}>
          {data.map((thread, index) => (
            <div key={index} className={styles.searchList}>
              <div
                className={styles.searchElement}
                onClick={() => modalOpen(thread.key)}
              >
                <Highlighter
                  highlightClassName={styles.highlight}
                  searchWords={[searchString]}
                  textToHighlight={thread.title}
                />
                <div className={styles.searchTitle}> - {thread.categories}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!(data?.length > 0) && <SetupEmptySearch />}
      <InstallationModal
        visible={isModalVisible}
        logo={modalData.logoImage}
        title={modalData.title}
        description={modalData.subTitle}
        installed={modalData.installed}
        categories={modalData.categories}
        onCancel={() => setIsModalVisible(false)}
        worksWith={worksWith}
        longDescription={longDescription}
        mobileViewDescription={mobileViewDescription}
        webViewDescription={webViewDescription}
      />
    </Card>
  )
}

export const Integration: FC = () => {
  const { t } = useTranslationI18()
  const user = useUser()
  const { integrationBodyCollections, tabMenuItems } = setupIntegrationData(t)

  const [active, setActive] = useState<string>('3')
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchItemsArray, setSearchItemsArray] = useState<SearchItemProps[]>(
    []
  )
  const isMobile = useMedia('(min-width: 541px)')

  const handleSearch = (searchTerm: string) => {
    setSearchValue(searchTerm)
    const tempSearchItemsArray = []
    const tempIntegrationBodyCollections = [...integrationBodyCollections]
    if (searchTerm.length > 0) {
      for (const a of tempIntegrationBodyCollections) {
        if (a.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempSearchItemsArray.push({
            key: a.key,
            title: a.title,
            categories: a.categories.join(' - '),
          })
        }
      }
      setSearchItemsArray([...tempSearchItemsArray])
    }
  }

  return (
    <div>
      <CommonHeader title={t('integration.page.title')} isLeftOutlined={true} />
      <Layout {...user}>
        <div className={styles.mainDiv}>
          <div className={styles.headWrapper}>
            {isMobile && (
              <div>
                <Breadcrumb
                  breadcrumbItems={[
                    {
                      breadcrumbName: t(
                        'basic-crud-table-header-breadcrumb-setup-link'
                      ),
                      path: 'setup',
                    },
                    {
                      breadcrumbName: t('integration.breadcrumbs'),
                      path: '/integration',
                    },
                  ]}
                />

                <Title>{t('integration.page.title')}</Title>
              </div>
            )}

            <div className={styles.searchWrapper}>
              <SetupSearchInput
                onChange={handleSearch}
                placeholder={t('integration.search')}
              />
            </div>
          </div>
          {!searchValue ? (
            <div className={styles.manageWrapper}>
              <Tabs
                tabPosition="left"
                defaultActiveKey={active}
                activeKey={active}
                onTabClick={(value) => setActive(value)}
              >
                {tabMenuItems.map((tabMenuItem) =>
                  tabMenuItem.disable ? (
                    <TabPane
                      tab={tabMenuItem.tabTitle}
                      key={tabMenuItem.key}
                      disabled={tabMenuItem.disable}
                    />
                  ) : (
                    <TabPane tab={tabMenuItem.tabTitle} key={tabMenuItem.key}>
                      {tabMenuItem.tabbedTitle === 'All Collections' ? (
                        <div>
                          <IntegrationHeader />
                          <IntegrationTabBody
                            heading={t('integration.recently.viewed')}
                            category="ALL"
                            items={integrationBodyCollections}
                            limit={6}
                          />
                          <div className={styles.popularWrapper}>
                            <h5>{t('integration.pabau.popular')}</h5>
                            <div
                              className={styles.seeAll}
                              onClick={() => setActive('4')}
                            >
                              {t('integration.pabau.see.all')} &#x2794;
                            </div>
                          </div>
                          <IntegrationTabBody
                            category="Popular"
                            items={integrationBodyCollections}
                            limit={6}
                          />
                        </div>
                      ) : (
                        <div>
                          <IntegrationHeader />
                          <IntegrationTabBody
                            category={tabMenuItem.category}
                            items={integrationBodyCollections}
                            installed={tabMenuItem.installed}
                            limit={tabMenuItem.limit}
                          />
                        </div>
                      )}
                    </TabPane>
                  )
                )}
              </Tabs>
            </div>
          ) : (
            <div className={styles.errorWrapper}>
              <Search data={searchItemsArray} searchString={searchValue} />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default Integration
