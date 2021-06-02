import {
  Notification,
  NotificationType,
  ReportsCard,
  SetupSearchInput,
} from '@pabau/ui'
import { Card, Col, Divider, Row, Typography, Spin } from 'antd'
import classNames from 'classnames'
import React, { FC, useContext, useEffect, useState } from 'react'
import CommonHeader from '../../components/CommonHeader'
import Layout from '../../components/Layout/Layout'
import SearchResults from '../../components/Setup/SearchResults/Index'
import { UserContext } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { reportCardsData } from '../../mocks/data'
import { Unauthorized } from '../../components/Unauthorized'
import styles from './reports.module.less'
import { LoadingOutlined } from '@ant-design/icons'
import {
  useListReportPermissionLazyQuery,
  useGraphsDataLazyQuery,
  useUpsertReportMutation,
  useFindCustomReportLazyQuery,
  useGetUserAccessPageListQuery,
} from '@pabau/graphql'
const { Title } = Typography

interface EditResponseType {
  affected_row: number
  favorite: boolean
  report_code: string
  upsertUserReportByReportCode: EditResponseType
}
const reportHref = {
  ADV001: '/team/report',
}

const Reports: FC = () => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)
  const currentDate = new Date()

  const [accessReportPage, setAccessReportPage] = useState<boolean>(false)
  const [searchData, setSearchData] = useState([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [reportsData, setReportsData] = useState(reportCardsData)
  const [isReportLoading, setIsReportLoading] = useState(true)

  const {
    data: permissionData,
    error: permissionError,
    loading: permissionLoading,
  } = useGetUserAccessPageListQuery({
    ssr: false,
    fetchPolicy: 'network-only',
  })

  const [
    getReportList,
    { data, error, loading, called },
  ] = useListReportPermissionLazyQuery({
    ssr: false,
    fetchPolicy: 'network-only',
  })

  const [
    getGraphData,
    { data: graphData, error: graphError },
  ] = useGraphsDataLazyQuery({
    variables: {
      startDate: new Intl.DateTimeFormat('en-US').format(
        currentDate.setMonth(currentDate.getMonth() - 11)
      ),
      endDate: new Intl.DateTimeFormat('en-US').format(new Date()),
    },
    ssr: false,
    fetchPolicy: 'network-only',
  })

  const [
    getCustomReport,
    { data: customReport, error: customError },
  ] = useFindCustomReportLazyQuery({
    ssr: false,
    fetchPolicy: 'network-only',
  })

  const [editMutation] = useUpsertReportMutation({
    onCompleted(data: EditResponseType) {
      const successResponse = data?.upsertUserReportByReportCode
      const temp = [...reportsData]
      for (const item of temp) {
        for (const report of item.reports) {
          if (item.catHeading === 'Custom') {
            if (Number.parseInt(successResponse?.report_code) === report?.id) {
              report.favourite = successResponse?.favorite
            }
          } else {
            if (successResponse?.report_code === report?.reportCode) {
              report.favourite = successResponse?.favorite
            }
          }
        }
      }
      setReportsData([...reportsData])
      Notification(
        NotificationType.success,
        `${t('setup.reports.notification.message')} ${
          successResponse?.favorite
            ? `${t('setup.reports.notification.message.favourited')}`
            : `${t('setup.reports.notification.message.unfavorited')}`
        }`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `${t('setup.reports.notification.message.error')}`
      )
    },
  })

  const handleSearch = (searchTerm: string) => {
    setSearchValue(searchTerm)
    if (searchTerm) {
      const searchDataArray = []

      for (const data of reportCardsData) {
        const titles = data.reports
        if (titles?.length > 0) {
          for (const subTitle of titles) {
            const reportName =
              data.catHeading === 'Custom'
                ? subTitle.reportName
                : t(`setup.reports.${data.catHeading}.${subTitle.reportCode}`)
            if (reportName.toLowerCase().includes(searchTerm.toLowerCase())) {
              let href
              const reportCode = subTitle.reportCode
              if (reportHref[reportCode]) {
                href = reportHref[reportCode]
              } else {
                href =
                  data.catHeading === 'Custom'
                    ? `/reports/` + subTitle?.id?.toString()
                    : `/reports/` + reportCode
              }
              searchDataArray.push({
                subTitle: reportName,
                href: href,
                isPermission: subTitle.isPermission,
              })
            }
          }
        }
      }

      setSearchData(searchDataArray)
    } else {
      // setTitle('Setup')
    }
  }

  const updatePermissionAndFavorite = (data) => {
    const reportPermissions = data?.UserReport
    const temp = [...reportsData]

    for (const reportPermission of reportPermissions) {
      for (const item of temp) {
        if (item.catHeading !== 'Custom') {
          for (const report of item.reports) {
            if (reportPermission?.Report?.report_code === report.reportCode) {
              report.isPermission = true
              if (reportPermission?.favorite) {
                report.favourite = true
              }
            }
          }
        }
      }
    }

    return temp
  }

  useEffect(() => {
    if (permissionData) {
      const userAccessPageList = permissionData.me?.userPermission.map(
        (item) => {
          return item?.Page?.name
        }
      )
      if (userAccessPageList.includes('Reports')) {
        setAccessReportPage(true)
        getGraphData()
        getCustomReport()
        getReportList()
      }
    }
  }, [permissionData, getReportList, getGraphData, getCustomReport])

  useEffect(() => {
    if (data?.me) {
      const reportData = data?.me
      const allReportPermission = reportData?.all_reports
      const reportPermissions = reportData?.UserReport

      if (allReportPermission) {
        const temp = [...reportsData]
        for (const item of temp) {
          for (const report of item.reports) {
            report.isPermission = true
          }
        }

        for (const reportPermission of reportPermissions) {
          for (const item of temp) {
            if (item.catHeading !== 'Custom') {
              for (const report of item.reports) {
                if (
                  reportPermission?.Report?.report_code === report.reportCode &&
                  reportPermission?.favorite
                ) {
                  report.favourite = true
                }
              }
            }
          }
        }
        setReportsData(temp)
      } else {
        const response = updatePermissionAndFavorite(reportData)
        setReportsData(response)
      }
    }
    if (!loading && called) setIsReportLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, called])

  useEffect(() => {
    if (graphData?.retrieveReport) {
      const temp = [...reportsData]
      for (const item of temp) {
        if (item.graphDataKey) {
          const graphRecord = graphData?.retrieveReport[item.graphDataKey]
          const graph = []
          for (const month of Object.keys(graphRecord)) {
            graph.push([month, Number.parseFloat(graphRecord[month])])
          }
          item.graphData = graph
        }
      }
      setReportsData(temp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData])

  useEffect(() => {
    if (customReport?.findManyCustomReportWithPermissions) {
      const temp = [...reportsData]
      const customReports = []
      const customMock = temp.find((a) => a.catHeading === 'Custom')
      for (const item of customReport.findManyCustomReportWithPermissions) {
        customReports.push({
          id: item.report_id,
          reportCode: item.report_code,
          reportName: item.report_name,
          isNew: false,
          favourite: item.favorite,
          isPermission: item.isPermission,
        })
      }
      customMock.reports = customReports
      setReportsData(temp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customReport])

  if (error || graphError || customError || permissionError) {
    console.log('error', error)
  }

  if (permissionLoading) {
    return (
      <Spin
        style={{
          position: 'absolute',
          margin: 'auto',
          left: '50%',
          top: '45%',
          textAlign: 'center',
        }}
        size={'large'}
        delay={0}
        spinning={true}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      />
    )
  }

  return user && !accessReportPage ? (
    <Unauthorized />
  ) : (
    <Layout {...user} active="reports">
      <CommonHeader title={t('setup.reports.title')} />
      <Card bodyStyle={{ padding: 0 }}>
        <Row
          className={classNames(styles.headerContainer, styles.mobileViewNone)}
        >
          <Col span={24} sm={10} className={styles.headingContainer}>
            <div />
            <Title>
              {!searchValue
                ? t('setup.reports.title')
                : t('setup.reports.search.result')}
            </Title>
          </Col>
          <Col span={24} sm={14} className={styles.searchContainer}>
            <div className={styles.search}>
              <SetupSearchInput onChange={handleSearch} />
            </div>
          </Col>
        </Row>
        <Divider style={{ margin: 0 }} className={styles.mobileViewNone} />
        <div className={classNames(styles.search, styles.desktopViewNone)}>
          <SetupSearchInput onChange={handleSearch} />
        </div>
        {!searchValue ? (
          <Row className={styles.bodyContainer} gutter={{ md: 24, xs: 16 }}>
            {reportsData.map((item, index) => {
              return (
                <Col
                  key={index}
                  className={styles.reportContainer}
                  xs={24}
                  md={12}
                  lg={8}
                  xxl={6}
                >
                  <ReportsCard
                    reports={item.reports}
                    graphData={item.graphData}
                    catHeading={t(`setup.reports.${item.catHeading}.heading`)}
                    graphDescription={t(
                      `setup.reports.${item.graphDescription}.graphDescription`
                    )}
                    description={t(
                      `setup.reports.${item.description}.description`
                    )}
                    chartLabel={item.chartLabel}
                    clickable={true}
                    onReportFavourite={async (reportId, isFav) => {
                      const report = item.reports.find((r) => r.id === reportId)
                      await editMutation({
                        variables: {
                          reportCode:
                            item.catHeading === 'Custom'
                              ? reportId.toString()
                              : report.reportCode,
                          fav: isFav,
                        },
                      })
                    }}
                    isReportloading={isReportLoading}
                  />
                </Col>
              )
            })}
          </Row>
        ) : (
          <div className={styles.searchResult}>
            <SearchResults
              data={searchData}
              searchTerm={searchValue}
              checkPermission={true}
              displayTitle={false}
            />
          </div>
        )}
      </Card>
    </Layout>
  )
}

export default Reports
