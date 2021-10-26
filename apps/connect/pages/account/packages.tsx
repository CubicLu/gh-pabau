import { useGetContactPackagesLazyQuery } from '@pabau/graphql'
import { Breadcrumb, ButtonLabel, Pagination, TabMenu } from '@pabau/ui'
import { Table, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import { ClientContext } from '../../components/UserContext/context/ClientContext'
import { useDateFormatter } from '../../hooks/useDateFormatter'
import { usePackageFormatter } from '../../hooks/usePackageFormatter'
import styles from './packages.module.less'

const { Title } = Typography

interface Package {
  name: string
  invoice: number
  session_used: string
  activation_date: string
  expiration_date: string
  code: string
  status: string
}

const defaultPackages = [
  {
    name: 'Hydrafacial (x3)',
    invoice: '£ 125',
    used: '1/3',
    activation_date: '02-10-20',
    expiration_date: '02-10-21',
    code: '£ 125',
    status: true,
  },
  {
    name: 'Hydrafacial – 1 day',
    invoice: '£ 100',
    used: '1/2',
    activation_date: '23-06-20',
    expiration_date: '23-06-21',
    code: '£ 100',
    status: true,
  },
  {
    name: 'Facial – 1 month',
    invoice: '£ 146',
    used: '2/2',
    activation_date: '13-01-20',
    expiration_date: '13-01-21',
    code: '£ 146',
    status: false,
  },
]

export const MyPackages = () => {
  const { t } = useTranslation('connect')
  const [lang, setLang] = useState('en')
  const { getPackageStatus } = usePackageFormatter()
  const { formatDateWithTz } = useDateFormatter()
  const isMobile = useMedia('(max-width: 767px)', false)
  const [packages, setPackages] = useState<Package[]>([])
  const [currentTab, setCurrentTab] = useState(0)
  const [paginateData, setPaginateData] = useState({
    total: 0,
    offset: 0,
    limit: 10,
    currentPage: 1,
    showingRecords: 0,
  })

  const [getContactPackages] = useGetContactPackagesLazyQuery({
    onCompleted(response) {
      const totalPackagesCount = response?.findManyContactPackage?.length
      const contactPackages = response?.findFirstCmContact?.Packages?.map(
        (packageObj) => {
          return {
            name: 'fix ths', //packageObj.session_package.name,
            invoice: 0, //packageObj.session_package?.price,
            session_used: `${Number(
              packageObj.contact_package_used.length
            )} / 0`, //${Number(packageObj.session_package.session_count)}
            activation_date: formatDateWithTz(packageObj.activation_date),
            expiration_date: formatDateWithTz(packageObj.expiration_date),
            code: packageObj.code,
            status: getPackageStatus(
              packageObj.expiration_date,
              packageObj.voided
            ),
          }
        }
      )

      setPackages(contactPackages)

      let showingRecords
      switch (currentTab) {
        case 0:
          showingRecords = contactPackages.length
          break
        case 1:
          showingRecords = contactPackages.filter(
            (item) => item.status === 'active'
          ).length
          break
        case 2:
          showingRecords = contactPackages.filter(
            (item) => item.status === 'expired'
          ).length
          break
        case 3:
          showingRecords = contactPackages.filter(
            (item) => item.status === 'voided'
          ).length
          break
      }
      setPaginateData({
        ...paginateData,
        showingRecords: showingRecords,
        total: totalPackagesCount,
      })
    },
    onError(error) {
      console.error(error)
    },
  })

  const clientContext = useContext(ClientContext)

  const columns = [
    {
      title: t('connect.account.mypackages.column.packagename'),
      dataIndex: 'name',
      key: 'name',
      width: '250px',
    },
    {
      title: t('connect.account.mypackages.column.invoice'),
      dataIndex: 'invoice',
      key: 'invoice',
      width: '112px',
    },
    {
      title: t('connect.account.mypackages.column.used'),
      dataIndex: 'session_used',
      key: 'session_used',
      width: '120px',
    },
    {
      title: t('connect.account.mypackages.column.activation_date'),
      dataIndex: 'activation_date',
      key: 'activation_date',
      width: '180px',
    },
    {
      title: t('connect.account.mypackages.column.expiration_date'),
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      width: '180px',
    },
    {
      title: t('connect.account.mypackages.column.code'),
      dataIndex: 'code',
      key: 'code',
      width: '125px',
    },
    {
      title: t('connect.account.mypackages.column.status'),
      dataIndex: 'status',
      key: 'status',
      width: '190px',
      // eslint-disable-next-line react/display-name
      render: (status) => {
        return (
          <div className={styles.buttonLabelContainer}>
            <ButtonLabel
              text={status}
              className={status === 'active' ? styles.active : styles.inactive}
            />
          </div>
        )
      },
    },
  ]

  // const handleNextPageData = (pageNumber) => {
  //   if (clientContext) {
  //     const skipValue =
  //       Number(pageNumber) === 1
  //         ? 0
  //         : paginateData.limit * paginateData.currentPage
  //     getContactPackages({
  //       variables: {
  //         take: paginateData.limit,
  //         skip: skipValue,
  //         cmContactId: { equals: Number(clientContext[0].contact_id) },
  //         packageContactId: 0,
  //       },
  //     })

  //     setPaginateData({
  //       ...paginateData,
  //       currentPage: pageNumber,
  //     })
  //   }
  // }

  const handleTabChange = (activeTab) => {
    switch (activeTab) {
      case '0':
        setPaginateData({
          ...paginateData,
          showingRecords: packages.length,
        })
        setCurrentTab(0)
        break
      case '1':
        setPaginateData({
          ...paginateData,
          showingRecords: packages.filter((item) => item.status === 'active')
            .length,
        })
        setCurrentTab(1)
        break
      case '2':
        setPaginateData({
          ...paginateData,
          showingRecords: packages.filter((item) => item.status === 'expired')
            .length,
        })
        setCurrentTab(2)
        break
      case '3':
        setPaginateData({
          ...paginateData,
          showingRecords: packages.filter((item) => item.status === 'voided')
            .length,
        })
        setCurrentTab(3)
        break
    }
  }

  useEffect(() => {
    if (clientContext) {
      getContactPackages({
        variables: {
          take: paginateData.limit,
          skip: 0,
          cmContactId: { equals: Number(clientContext[0].contact_id) },
          packageContactId: 0,
        },
      })

      setPaginateData({
        ...paginateData,
        currentPage: 1,
      })
    }
  }, [clientContext, paginateData, setPaginateData, getContactPackages])

  // useEffect(() => {
  //   handleNextPageData(paginateData.currentPage)
  // }, [paginateData.limit, paginateData.currentPage])

  return (
    <ConnectLayout
      onChangeLanguage={(val) => setLang(val)}
      clientContext={clientContext}
    >
      <div className={styles.myPackages}>
        <div className={styles.myPackagesHeader}>
          {isMobile ? (
            <Title>{t('connect.account.mypackages')}</Title>
          ) : (
            <>
              <Breadcrumb
                items={[
                  {
                    breadcrumbName: t('connect.account.title'),
                    path: 'account',
                  },
                  {
                    breadcrumbName: t('connect.account.mypackages'),
                    path: '',
                  },
                ]}
              />
              <Title>{t('connect.account.mypackages')}</Title>
            </>
          )}
        </div>
        <div className={styles.myPackagesContent}>
          <div className={styles.packageTableContainer}>
            <TabMenu
              menuItems={[
                t('connect.account.mypackages.tab.all'),
                t('connect.account.mypackages.tab.active'),
                t('connect.account.mypackages.tab.expired'),
                t('connect.account.mypackages.tab.voided'),
              ]}
              tabPosition="top"
              minHeight="1px"
              onChange={(activeKey) => handleTabChange(activeKey)}
            >
              <Table
                dataSource={
                  packages.map((item, index) => ({
                    ...item,
                    key: index,
                  })) as never[]
                }
                columns={columns}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
              <Table
                dataSource={
                  packages
                    .filter((item) => item.status === 'active')
                    .map((item, index) => ({
                      ...item,
                      key: index,
                    })) as never[]
                }
                columns={columns}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
              <Table
                dataSource={
                  packages
                    .filter((item) => item.status === 'expired')
                    .map((item, index) => ({
                      ...item,
                      key: index,
                    })) as never[]
                }
                columns={columns}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
              <Table
                dataSource={
                  packages
                    .filter((item) => item.status === 'voided')
                    .map((item, index) => ({
                      ...item,
                      key: index,
                    })) as never[]
                }
                columns={columns}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </TabMenu>
          </div>
          <Pagination
            total={paginateData.total}
            defaultPageSize={10}
            showSizeChanger={false}
            pageSizeOptions={['10', '25', '50', '100']}
            onChange={(page) => {
              setPaginateData({
                ...paginateData,
                currentPage: page,
              })
            }}
            onPageSizeChange={(pageSize) => {
              setPaginateData({
                ...paginateData,
                limit: pageSize,
              })
            }}
            pageSize={paginateData.limit}
            current={paginateData.currentPage}
            showingRecords={paginateData.showingRecords}
          />
        </div>
      </div>
    </ConnectLayout>
  )
}

export default MyPackages
