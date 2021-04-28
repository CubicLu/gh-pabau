import { gql, useMutation } from '@apollo/client'
import {
  Notification,
  NotificationType,
  ReportsCard,
  SetupSearchInput,
  useLiveQuery,
} from '@pabau/ui'
import { Card, Col, Divider, Row, Typography } from 'antd'
import classNames from 'classnames'
import React, { FC, useContext, useEffect, useState } from 'react'
import CommonHeader from '../../components/CommonHeader'
import Layout from '../../components/Layout/Layout'
import SearchResults from '../../components/Setup/SearchResults'
import { UserContext } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { reportCardsData } from '../../mocks/data'
import styles from './reports.module.less'
const { Title } = Typography

const GRAPH_DATA = gql`
  query miniGraphs($startDate: String!, $endDate: String!) {
    retrieveReport(
      id: "mini_graphs"
      start_date: $startDate
      end_date: $endDate
    )
  }
`
const USER_REPORT = gql`
  query listReportPermission {
    me {
      all_reports
      UserReport {
        report_id
        favorite
        Report {
          id
          report_code
        }
      }
    }
  }
`
const UPDATE_FAVORITE = gql`
  mutation upsertReport($reportCode: String!, $fav: Boolean!) {
    upsertUserReportByReportCode(report_code: $reportCode, favorite: $fav) {
      report_code
      affected_row
      favorite
    }
  }
`

const LIST_CUSTOM_REPORT = gql`
  query {
    findManyCustomReportWithPermissions {
      isPermission
      report_code
      report_id
      report_name
      favorite
    }
  }
`
interface EditResponseType {
  affected_row: number
  favorite: boolean
  report_code: string
}
interface EditResponseType {
  upsertUserReportByReportCode: EditResponseType
}

const Reports: FC = () => {
  const { t } = useTranslationI18()
  const user = useContext(UserContext)
  const currentDate = new Date()

  const [searchData, setSearchData] = useState([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [reportsData, setReportsData] = useState(reportCardsData)
  const [isReportLoading, setIsReportLoading] = useState(true)

  const { data, error, loading } = useLiveQuery(USER_REPORT)

  const { data: graphData, error: graphError } = useLiveQuery(GRAPH_DATA, {
    variables: {
      startDate: new Intl.DateTimeFormat('en-US').format(
        currentDate.setMonth(currentDate.getMonth() - 11)
      ),
      endDate: new Intl.DateTimeFormat('en-US').format(new Date()),
    },
  })

  const { data: customReport, error: customError } = useLiveQuery(
    LIST_CUSTOM_REPORT
  )

  const [editMutation] = useMutation(UPDATE_FAVORITE, {
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

      reportCardsData.map((data) => {
        const titles = data.reports
        if (titles.length > 0) {
          titles.map((subTitle) => {
            const reportName =
              data.catHeading === 'Custom'
                ? subTitle.reportName
                : t(`setup.reports.${data.catHeading}.${subTitle.reportCode}`)
            if (reportName.toLowerCase().includes(searchTerm.toLowerCase())) {
              searchDataArray.push({
                subTitle: reportName,
                href: `/reports/` + subTitle.reportCode,
                isPermission: subTitle.isPermission,
              })
            }
            return searchDataArray
          })
        }
        return data
      })

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

    return temp
  }

  useEffect(() => {
    if (data) {
      const allReportPermission = data?.all_reports
      const reportPermissions = data?.UserReport

      if (allReportPermission) {
        const temp = [...reportsData]
        for (const item of temp) {
          for (const report of item.reports) {
            report.isPermission = true
          }
        }

        for (const reportPermission of reportPermissions) {
          for (const item of temp) {
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
        setReportsData(temp)
      } else {
        const response = updatePermissionAndFavorite(data)
        setReportsData(response)
      }
    }
    if (!loading) setIsReportLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading])

  useEffect(() => {
    if (graphData) {
      const temp = [...reportsData]
      for (const item of temp) {
        if (item.graphDataKey) {
          const graphRecord = graphData[item.graphDataKey]
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
    if (customReport) {
      const temp = [...reportsData]
      const customReports = []
      const customMock = temp.find((a) => a.catHeading === 'Custom')
      for (const item of customReport) {
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

  if (error || graphError || customError) {
    console.log('error', error)
  }

  return (
    <>
      <CommonHeader title={t('setup.reports.title')} />
      <Layout {...user} active="reports">
        <Card bodyStyle={{ padding: 0 }}>
          <Row
            className={classNames(
              styles.headerContainer,
              styles.mobileViewNone
            )}
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
                        const report = item.reports.find(
                          (r) => r.id === reportId
                        )
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
    </>
  )
}

export default Reports
