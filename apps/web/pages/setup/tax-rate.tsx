import {
  Breadcrumb,
  Notification,
  NotificationType,
  TabMenu,
  Pagination,
} from '@pabau/ui'
import {
  useGetTaxesQuery,
  GetTaxesDocument,
  useGetTaxesAggregateQuery,
  GetTaxesAggregateDocument,
  useInsertOneTaxRateMutation,
} from '@pabau/graphql'
import AddButton from '../../components/AddButton'
import { Card, Col, Divider, Row, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import CommonHeader from '../../components/CommonHeader'
import CreateTaxRateModal from '../../components/Setup/TaxRate/CreateTaxRateModal'
import DefaultTax from '../../components/Setup/TaxRate/DefaultTax'
import TaxRateList from '../../components/Setup/TaxRate/TaxRateList'
import { useUser } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import useWindowSize from '../../hooks/useWindowSize'
import styles from './tax-rate.module.less'

export function TaxRate() {
  const user = useUser()
  const { Title } = Typography
  const size = useWindowSize()
  const { t } = useTranslationI18()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [taxesData, setTaxesData] = useState(null)
  const [showCreateTax, setShowCreateTax] = useState(false)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 50,
    currentPage: 1,
    showingRecords: 0,
  })

  const { data, loading } = useGetTaxesQuery({
    fetchPolicy: 'network-only',
    variables: {
      // offset: paginateData.offset,
      // limit: paginateData.limit,
      // searchTerm: `%${searchTerm}%`,
    },
  })
  const { data: aggregateData } = useGetTaxesAggregateQuery({
    fetchPolicy: 'network-only',
    variables: {
      searchTerm: `%${searchTerm}%`,
    },
  })

  const [addMutation] = useInsertOneTaxRateMutation({
    onCompleted() {
      setShowCreateTax(false)
      Notification(NotificationType.success, t('setup.taxrate.create.success'))
    },
    onError(err) {
      Notification(NotificationType.error, t('setup.taxrate.create.error'))
    },
  })

  useEffect(() => {
    if (data?.findManyTax) {
      setTaxesData(data?.findManyTax)
    }
    if (aggregateData?.tax_rates_aggregate?.aggregate?.count > 0) {
      setPaginateData({
        ...paginateData,
        total: aggregateData?.tax_rates_aggregate?.aggregate?.count,
        showingRecords: data?.findManyTax?.length,
      })
    }
    if (!loading && data?.findManyTax) setIsLoading(false)
    // eslint-disable-next-line
  }, [data, loading, aggregateData])

  const onCreate = async (values) => {
    await addMutation({
      variables: { ...values },
      optimisticResponse: {},
      refetchQueries: [
        {
          query: GetTaxesDocument,
          variables: {
            offset: paginateData.offset,
            limit: paginateData.limit,
            searchTerm: `%${searchTerm}%`,
          },
        },
        {
          query: GetTaxesAggregateDocument,
          variables: {
            searchTerm: `%${searchTerm}%`,
          },
        },
      ],
    })
  }

  const onPaginationChange = (currentPage, limit) => {
    const offset = paginateData.limit * (currentPage - 1)
    setPaginateData({
      ...paginateData,
      offset,
      limit,
      currentPage: currentPage,
    })
  }

  return (
    <Layout {...user}>
      <CommonHeader
        isLeftOutlined
        reversePath="/setup"
        title={t('setup.taxrate.heading')}
        isShowSearch
        handleSearch={(searchTerm) => setSearchTerm(searchTerm)}
        searchValue={searchTerm}
      >
        <AddButton
          onClick={() => setShowCreateTax(true)}
          onFilterSource={() => false}
          addFilter={false}
          schema={{ createButtonLabel: t('setup.taxrate.newbtn') }}
          tableSearch={false}
          needTranslation={true}
        />
      </CommonHeader>
      <Card
        bodyStyle={{ padding: 0 }}
        className={styles.taxRateMainCard}
        style={{ borderBottomWidth: 0 }}
      >
        <Row className={styles.headerContainer}>
          {size.width > 767 && (
            <>
              <Col>
                <Breadcrumb
                  items={[
                    {
                      breadcrumbName: t('navigation-breadcrumb-setup'),
                      path: 'setup',
                    },
                    { breadcrumbName: t('setup.taxrate.heading'), path: '' },
                  ]}
                />
                <Title>{t('setup.taxrate.heading')}</Title>
              </Col>
              <Col>
                <AddButton
                  onClick={() => setShowCreateTax(true)}
                  onFilterSource={() => false}
                  onSearch={(searchTerm) => setSearchTerm(searchTerm)}
                  addFilter={false}
                  schema={{ createButtonLabel: t('setup.taxrate.newbtn') }}
                  tableSearch={true}
                  needTranslation={true}
                  searchTerm={searchTerm}
                />
              </Col>
            </>
          )}
        </Row>
        <Divider style={{ margin: 0 }} />
        <TabMenu
          tabPosition={'top'}
          menuItems={[
            t('setup.taxrate.tabs.tab1'),
            t('setup.taxrate.tabs.tab2'),
          ]}
          minHeight={'0vh'}
        >
          <TaxRateList
            searchTerm={searchTerm}
            isLoading={isLoading}
            dataSource={taxesData}
            onCreateTaxRate={() => setShowCreateTax(true)}
            paginateData={paginateData}
          />
          <div className={styles.defaultWrap}>
            <DefaultTax />
          </div>
        </TabMenu>
        {showCreateTax && (
          <CreateTaxRateModal
            visible={showCreateTax}
            onCancel={() => setShowCreateTax(false)}
            onSave={onCreate}
          />
        )}
      </Card>
      <Pagination
        total={paginateData.total}
        defaultPageSize={50}
        showSizeChanger={false}
        onChange={onPaginationChange}
        pageSizeOptions={['10', '25', '50', '100']}
        onPageSizeChange={(pageSize) => {
          setPaginateData({
            ...paginateData,
            limit: pageSize,
            offset: 0,
            currentPage: 1,
          })
        }}
        pageSize={paginateData.limit}
        current={paginateData.currentPage}
        showingRecords={paginateData.showingRecords}
      />
    </Layout>
  )
}

export default TaxRate
