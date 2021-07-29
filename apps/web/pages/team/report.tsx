import React, { useEffect, useState } from 'react'
import {
  CloudDownloadOutlined,
  FileSearchOutlined,
  FilterOutlined,
  LeftOutlined,
  LineChartOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  useCellDetailsLazyQuery,
  useListTeamReportLazyQuery,
  useListTrendReportLazyQuery,
  useLocationsQuery,
} from '@pabau/graphql'
import {
  Breadcrumb,
  Button,
  ChartData,
  CircleGraph,
  MobileHeader,
  PabauPlus,
  ReportHelpSidebar,
  Switch,
  TabMenu,
  TeamReport,
  TeamReportChart,
  TeamReportChartSeries,
  TeamReportDate,
  TeamReportEmployee,
  TeamReportHeader,
  TeamReportServiceGroup,
  TeamReportLocation,
  TeamReportMeta,
  TeamReportModal,
} from '@pabau/ui'
import { Col, Drawer, Input, Row, Space, Typography } from 'antd'
import classNames from 'classnames'
import Link from 'next/link'
import userImage from '../../assets/images/user.png'
import {
  getFormattedDateLabel,
  getSortedDate,
  getDateRangeStart,
  findServiceFromGroup,
  meta as metaData,
  mockColorData,
  serviceGroups as defaultServiceGroups,
  serviceItemFormatter,
  makeServiceGroups,
} from '../../helper/teamReportHelper'
import Layout from './../../components/Layout/Layout'
import { useTranslationI18 } from './../../hooks/useTranslationI18'
import styles from './report.module.less'
import FilterDrawer from './../../components/team/Report/FilterDrawer'

const { Title } = Typography

const ReportTypes = [
  {
    key: 'report-details',
    icon: <FileSearchOutlined />,
  },
  {
    key: 'kpi-explorer',
    icon: <RocketOutlined />,
    isPlus: true,
  },
  {
    key: 'trend',
    icon: <LineChartOutlined />,
    isPlus: true,
  },
]

const getChildSeries = (
  name,
  serie,
  employers,
  serviceGroups,
  t,
  colIndexes,
  targets
) => {
  const service = serviceGroups?.find((item) => item.name === name)

  if (!service) {
    return {}
  }

  const data = {
    key: service.name,
    desc: service.label ? t(service.label) : service.name,
  }

  if (Array.isArray(serie)) {
    const arr = colIndexes.map((index) => serie[index])
    const resultData = {
      ...data,
      ...Object.fromEntries(
        employers.map((emp, index) => [
          emp.id,
          serviceItemFormatter(
            arr[index],
            service.prefix,
            service.suffix,
            targets[name]
          ),
        ])
      ),
      total: serviceItemFormatter(
        arr.reduce((prev: number, curr: any) => prev + Number(curr), 0),
        service.prefix,
        service.suffix,
        targets[name]
      ),
    }
    return resultData
  }

  const arr = colIndexes.map((index) => (serie.main ? serie.main[index] : 0))
  const resultData = {
    ...data,
    children: Object.entries(serie.details ?? serie)
      .map(([childSerie, childSerieData]) => {
        const result = getChildSeries(
          childSerie,
          childSerieData,
          employers,
          service.services,
          t,
          colIndexes,
          targets
        )
        return result
      })
      .filter((item) => item),
    ...Object.fromEntries(
      employers.map((emp, index) => [
        emp.id,
        serviceItemFormatter(
          arr[index],
          service.prefix,
          service.suffix,
          targets[name]
        ),
      ])
    ),
    total: serviceItemFormatter(
      arr.reduce((prev: number, curr) => prev + Number(curr), 0),
      service.prefix,
      service.suffix,
      targets[name]
    ),
  }
  return resultData
}

/* eslint-disable-next-line */
export interface ReportProps {}

export function Report(props: ReportProps) {
  const { t } = useTranslationI18()

  const [selectedCell, setSelectedCell] = useState<{
    row: string | number
    col: string | number
  }>({ row: -1, col: '' })
  const [search, setSearch] = useState('')
  const [reportType, setReportType] = useState('report-details')
  const [mobileDrawer, setMobileDrawer] = useState(false)
  const [filterDrawer, setFilterDrawer] = useState(false)
  const [showHelpSidebar, setShowHelpSidebar] = useState(false)

  const [locations, setLocations] = useState<TeamReportLocation[]>([])
  const [serviceGroups, setServiceGroups] = useState<TeamReportServiceGroup[]>(
    []
  )
  const [series, setSeries] = useState([])
  const [employerList, setEmployerList] = useState<TeamReportEmployee[]>([])
  const [meta, setMeta] = useState<TeamReportMeta>(metaData)
  const [dateOptions, setDateOptions] = useState<TeamReportDate[]>([])
  const [chartData, setChartData] = useState<TeamReportChartSeries[]>([])

  const [circleChartData, setCircleChartData] = useState<ChartData[]>([])

  const [startDate] = useState(new Date('01-01-2017'))

  /** Get team report data */
  const [getTeamReport, { data, error, loading }] = useListTeamReportLazyQuery()
  useEffect(() => {
    if (reportType === 'report-details' || reportType === 'kpi-explorer') {
      getTeamReport({
        variables: {
          startDate: getDateRangeStart(meta.endDate, meta.rangeType)
            .toLocaleDateString('en-GB')
            .replace(new RegExp('/', 'g'), '-'),
          endDate: (meta.endDate || new Date())
            .toLocaleDateString('en-GB')
            .replace(new RegExp('/', 'g'), '-'),
          locationIds: meta.locations,
        },
      })
    }
  }, [getTeamReport, reportType, meta.endDate, meta.rangeType, meta.locations])

  /** Get service groups data */
  useEffect(() => {
    if (data?.retrieveReport?.data) {
      const services = data?.retrieveReport?.data
      const serviceGroups = makeServiceGroups(services, defaultServiceGroups)
      setServiceGroups(serviceGroups)
    }
  }, [data?.retrieveReport])

  /** Get locations data */
  const { data: locationData } = useLocationsQuery({
    variables: {
      isActive: 1,
    },
  })
  useEffect(() => {
    if (locationData?.findManyCompanyBranch) {
      setLocations(
        locationData?.findManyCompanyBranch.map((item) => ({
          id: item.id,
          name: item.name,
        }))
      )
      setMeta((meta) => ({
        ...meta,
        locations: locationData?.findManyCompanyBranch.map((item) => item.id),
      }))
    }
  }, [locationData?.findManyCompanyBranch])

  /** Initialize metadata, employer options, and kpi explorer data */
  useEffect(() => {
    if (data?.retrieveReport) {
      if (!employerList?.length) {
        const employers = Object.keys(data.retrieveReport.employers).map(
          (item) => ({
            id: item,
            name: data.retrieveReport.employers[item],
            src: userImage,
          })
        )
        setEmployerList(employers)

        setMeta((meta) => ({
          ...meta,
          employees: employers.slice(0, 3).map((item) => item.id),
        }))
      }

      const targets = data.retrieveReport.targets
      const reportData = data.retrieveReport.data
      setCircleChartData(
        Object.keys(reportData)
          .map((target, index) => {
            const serviceGroup = serviceGroups.find(
              (item) => item.name === target
            )
            if (
              !serviceGroup ||
              !Object.keys(reportData[target] || {})?.length
            ) {
              return null
            }
            return {
              id: index,
              name: target,
              label: serviceGroup.label,
              services: Object.keys(reportData[target] || {}).map((service) => {
                const serviceData = reportData[target][service]
                const serviceItem = serviceGroup.services.find(
                  (item) => item.name === service
                )
                return {
                  name: service,
                  label: serviceItem?.label,
                  target: serviceItemFormatter(
                    targets[service] || targets[target] || 0,
                    serviceItem?.prefix,
                    serviceItem?.suffix
                  ) as string,
                  revenue: serviceItemFormatter(
                    (serviceData?.main || serviceData || []).reduce(
                      (prev: number, curr) => prev + Number(curr),
                      0
                    ),
                    serviceItem?.prefix,
                    serviceItem?.suffix
                  ) as string,
                }
              }),
              badge: serviceGroup.badge,
              color: serviceGroup.color,
            }
          })
          .filter((item) => item)
      )
    }
  }, [data?.retrieveReport, serviceGroups, employerList])

  /** Initialize data for team report table */
  useEffect(() => {
    if (data?.retrieveReport && meta.employees) {
      const reportData = data.retrieveReport.data
      const targets = data.retrieveReport.targets
      const employers = meta.employees.map((item) =>
        employerList.find((emp) => emp.id === item)
      )
      const colIndexes = meta.employees.map((item) =>
        employerList.findIndex((emp) => emp.id === item)
      )
      setSeries(
        Object.entries(reportData).reduce((prev, [name, item], index) => {
          const result = [
            ...prev,
            {
              key: name,
              desc: String(name).toUpperCase(),
              type: 'header',
              header_num: index,
            },
            ...(Object.keys(item || {}).length > 0
              ? getChildSeries(
                  name,
                  item,
                  employers,
                  serviceGroups,
                  t,
                  colIndexes,
                  targets
                ).children || []
              : []),
          ]

          if (name === 'payroll') {
            const total: number[] = []
            for (
              let i = 0;
              i < Object.values(item || {})?.[0]?.length || 0;
              i++
            ) {
              total.push(
                Object.values(item || {}).reduce(
                  (pre: number, cur) => pre + Number(cur[i]),
                  0
                )
              )
            }
            let arrTotal = 0
            const empTotal = employers.map((emp, i) => {
              const index = colIndexes[i]
              arrTotal += total[index]
              return [
                emp.id,
                serviceItemFormatter(total[index], '£', undefined),
              ]
            })
            result.push({
              key: 'total',
              desc: 'Total',
              ...Object.fromEntries(empTotal),
              total: serviceItemFormatter(arrTotal, '£', undefined),
            })
          }

          return result
        }, [])
      )
    }
  }, [data?.retrieveReport, serviceGroups, meta.employees, employerList, t])

  /** Generate date options, and update metadata */
  useEffect(() => {
    const month =
      meta.rangeType === 'monthly'
        ? new Date().getMonth()
        : meta.rangeType === 'quarter'
        ? Math.ceil((new Date().getMonth() + 1) / 3) * 3 - 1
        : 11
    const endDate = new Date(new Date().getFullYear(), month + 1, 0)
    const startMonth =
      meta.rangeType === 'monthly'
        ? startDate.getMonth()
        : meta.rangeType === 'quarter'
        ? Math.ceil((startDate.getMonth() + 1) / 3) * 3 - 1
        : 11
    const gap =
      meta.rangeType === 'monthly' ? 1 : meta.rangeType === 'quarter' ? 3 : 12

    const dateTicks: TeamReportDate[] = []
    for (
      let i = new Date(startDate.getFullYear(), startMonth + 1, 0);
      i.getTime() <= endDate.getTime();
      i = new Date(i.getFullYear(), i.getMonth() + gap + 1, 0)
    ) {
      dateTicks.push({
        label: getFormattedDateLabel(meta.rangeType, i),
        endDate: new Date(i),
      })
    }

    setDateOptions(dateTicks.reverse())

    setMeta((meta) => ({ ...meta, endDate }))
  }, [meta.rangeType, startDate])

  /** Get trend chart data */
  const [
    getListTrendReport,
    { data: trendData, error: trendError, loading: trendLoading },
  ] = useListTrendReportLazyQuery()
  useEffect(() => {
    if (reportType === 'trend') {
      getListTrendReport({
        variables: {
          startDate: getDateRangeStart(meta.endDate, meta.rangeType)
            .toLocaleDateString('en-GB')
            .replace(new RegExp('/', 'g'), '-'),
          endDate: new Date()
            .toLocaleDateString('en-GB')
            .replace(new RegExp('/', 'g'), '-'),
          locationIds: meta.locations,
          // type: meta.rangeType,
          columns: meta.services.map((item) => item.name),
          staffIds: meta.employees.map((item) => Number(item)),
        },
      })
    }
  }, [
    getListTrendReport,
    reportType,
    meta.locations,
    meta.services,
    meta.employees,
    meta.endDate,
    meta.rangeType,
  ])

  useEffect(() => {
    if (trendData?.retrieveReport) {
      const trendChartData = meta.services
        .filter((trend) => !!trendData.retrieveReport[trend.name])
        .map((trend, index) => {
          const serviceGroup = serviceGroups
            .map((item) => findServiceFromGroup(trend.name, item))
            .find((item) => !!item)

          return {
            name: serviceGroup.name,
            label: serviceGroup.label,
            data: trendData.retrieveReport[trend.name].map((item) =>
              Number(item || 0)
            ),
            color: mockColorData[index],
          }
        })

      setChartData(trendChartData)
    }
  }, [meta.services, serviceGroups, trendData])

  const handleChangeMeta = (newMeta: TeamReportMeta): void => {
    setMeta(newMeta)
  }

  const [
    getCellDetails,
    { data: cellDetails, loading: cellDetailsLoading },
  ] = useCellDetailsLazyQuery({
    fetchPolicy: 'no-cache',
  })

  const handleSelectCell = (
    row: number,
    col: string | number,
    record: unknown
  ) => {
    if (row !== selectedCell.row || col !== selectedCell.col) {
      const employer = employerList.find((item) => item.id === col)?.id

      if (employer) {
        getCellDetails({
          variables: {
            startDate: getDateRangeStart(meta.endDate, meta.rangeType)
              .toLocaleDateString('en-GB')
              .replace(new RegExp('/', 'g'), '-'),
            endDate: new Date()
              .toLocaleDateString('en-GB')
              .replace(new RegExp('/', 'g'), '-'),
            locationIds: meta.locations,
            staffIds: [Number(employer) || 0],
            columns: [String(row)],
          },
        })
      }

      setSelectedCell({ row, col })
    }
  }

  // TODO: Implement search functionality
  const handleSearch = null

  const handleDownload = null

  const handleSettings = null

  const selectedService = serviceGroups
    .map((item) => findServiceFromGroup(String(selectedCell.row), item))
    .find((item) => !!item)

  return (
    <>
      <div className={styles.desktopViewNone}>
        <MobileHeader className={styles.mobileHeader}>
          <div className={styles.allContentAlignMobile}>
            <div className={styles.mobileHeaderTextStyle}>
              <Link href="/setup">
                <LeftOutlined />
              </Link>
              <p>{t('setup.reports.title')}</p>
            </div>
            <Button
              className={styles.btnCircle}
              shape="circle"
              icon={<MoreOutlined />}
              onClick={() => setMobileDrawer(!mobileDrawer)}
            />
            {mobileDrawer && (
              <Drawer
                placement="bottom"
                closable={true}
                onClose={() => setMobileDrawer(false)}
                visible={mobileDrawer}
                className={styles.mobileDrawer}
                height={170}
              >
                <div className={styles.headerStick} />
                <Space size={16} direction="vertical">
                  <Space size={8} className={styles.drawerButton}>
                    <CloudDownloadOutlined />
                    <div onClick={handleDownload}>
                      {t('setup.reports.download')} (
                      {t('setup.reports.coming-soon')})
                    </div>
                  </Space>
                  <Space size={8} className={styles.drawerButton}>
                    <SettingOutlined />
                    <div onClick={handleSettings}>
                      {t('setup.reports.settings')} (
                      {t('setup.reports.coming-soon')})
                    </div>
                  </Space>
                  <Space size={8} className={styles.drawerButton}>
                    <QuestionCircleOutlined />
                    <div onClick={() => setShowHelpSidebar(true)}>
                      {t('setup.reports.help')}
                    </div>
                  </Space>
                </Space>
              </Drawer>
            )}
          </div>
        </MobileHeader>
      </div>

      <Layout active={'setup'}>
        <div className={styles.cardWrapper}>
          <div className={classNames(styles.cardHeader, styles.mobileViewNone)}>
            <div>
              <Breadcrumb
                breadcrumbItems={[
                  { breadcrumbName: t('setup.reports.title'), path: 'setup' },
                  { breadcrumbName: t('setup.reports.team-report'), path: '' },
                ]}
              />
              <Title>{t('setup.reports.title')}</Title>
            </div>
            {handleSearch && (
              <div className={styles.actions}>
                <Input
                  className={styles.searchInput}
                  placeholder={t('setup.reports.search-report')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  suffix={<SearchOutlined style={{ color: '#8C8C8C' }} />}
                  autoFocus
                />
              </div>
            )}
          </div>
          <div className={styles.cardContent}>
            <TabMenu
              tabPosition="top"
              menuItems={[
                t('setup.reports.team.title'),
                `${t('setup.reports.financials.title')} (${t(
                  'setup.reports.coming-soon'
                )})`,
              ]}
              activeDefaultKey="0"
              minHeight="1px"
              className={styles.tabs}
              disabledKeys={[1]}
            >
              <div className={styles.team}>
                <div className={styles.reportTypes}>
                  {ReportTypes.map((item) => (
                    <Button
                      key={item.key}
                      className={classNames(
                        styles.typeButton,
                        item.key !== reportType && styles.normalButton
                      )}
                      type={item.key === reportType ? 'primary' : undefined}
                      onClick={() => setReportType(item.key)}
                    >
                      <Space size={4}>
                        <div className={styles.mobileViewNone}>{item.icon}</div>
                        <div>{t(`setup.reports.team.${item.key}`)}</div>
                        <div className={styles.mobileViewNone}>
                          {item.isPlus && <PabauPlus modalType="Marketing" />}
                        </div>
                      </Space>
                    </Button>
                  ))}
                </div>
                <div
                  className={classNames(
                    styles.desktopViewNone,
                    styles.mobileBlock
                  )}
                >
                  <Row gutter={16}>
                    {handleSearch && (
                      <Col xs={16}>
                        <Input
                          placeholder={t('setup.reports.search-report')}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          suffix={
                            <SearchOutlined style={{ color: '#8C8C8C' }} />
                          }
                          autoFocus
                        />
                      </Col>
                    )}
                    <Col xs={handleSearch ? 8 : 24}>
                      <Button
                        style={{ width: '100%' }}
                        onClick={() => setFilterDrawer(!filterDrawer)}
                      >
                        <FilterOutlined />
                        {t('basic-crud-table-button-filter')}
                      </Button>
                      {filterDrawer && (
                        <FilterDrawer
                          isOpened={filterDrawer}
                          dateOptions={dateOptions}
                          employerList={employerList}
                          locations={locations}
                          meta={meta}
                          onChangeMeta={(meta) => {
                            handleChangeMeta(meta)
                            setFilterDrawer(false)
                          }}
                          onClose={() => setFilterDrawer(false)}
                        />
                      )}
                    </Col>
                  </Row>
                </div>
                <div className={styles.mobileViewNone}>
                  <div
                    className={styles.reportHeader}
                    style={{
                      borderColor:
                        reportType === 'kpi-explorer'
                          ? 'transparent'
                          : '#ecedf0',
                    }}
                  >
                    <div>
                      {reportType === 'kpi-explorer' && (
                        <Space size={8} className={styles.enableBenchmarks}>
                          {t('setup.reports.enable-benchmarks')}
                          <PabauPlus modalType="Marketing" />
                          <Switch />
                        </Space>
                      )}
                    </div>
                    <TeamReportHeader
                      serviceGroups={serviceGroups}
                      employees={employerList}
                      dateOptions={dateOptions}
                      locations={locations}
                      meta={meta}
                      onChangeMeta={handleChangeMeta}
                      onDownload={handleDownload}
                      onSettings={handleSettings}
                      onHelp={() => setShowHelpSidebar(true)}
                      hideKpiList={reportType !== 'trend'}
                    />
                  </div>
                </div>
                <div className={classNames(styles.mobileBlock)}>
                  <div
                    className={styles.reportData}
                    style={{
                      display:
                        reportType === 'report-details' ? 'block' : 'none',
                    }}
                  >
                    <TeamReport
                      loading={loading}
                      source={series as never[]}
                      columns={
                        [
                          {
                            title: '',
                            dataIndex: 'desc',
                            key: 'desc',
                            fixed: 'left',
                            align: 'left',
                          },
                          ...meta.employees.map((item) => ({
                            title: employerList.find((emp) => emp.id === item)
                              ?.name,
                            dataIndex: item,
                            key: item,
                            align: 'right',
                          })),
                          {
                            title: 'Total',
                            dataIndex: 'total',
                            key: 'total',
                            align: 'right',
                          },
                        ] as never[]
                      }
                      onSelect={handleSelectCell}
                      error={!!error}
                    />
                    {selectedCell.row !== -1 &&
                      selectedCell.col &&
                      selectedService && (
                        <TeamReportModal
                          loading={cellDetailsLoading}
                          ticks={getSortedDate(
                            Object.keys(cellDetails?.retrieveReport || [])
                          ).map((item) =>
                            getFormattedDateLabel('monthly', new Date(item))
                          )}
                          series={getSortedDate(
                            Object.keys(cellDetails?.retrieveReport || [])
                          ).map((item) => {
                            const date = new Date(item)
                            const month = date.getMonth()
                            const year = date.getFullYear()
                            return Number(
                              cellDetails?.retrieveReport[
                                `${month < 9 ? '0' : ''}${month + 1}-${year}`
                              ] ?? 0
                            )
                          })}
                          target={
                            data?.retrieveReport?.targets?.[
                              selectedService.name
                            ]
                          }
                          type="line"
                          prefix={selectedService?.prefix}
                          suffix={selectedService?.suffix}
                          visible
                          employee={
                            employerList.find(
                              (emp) => emp.id === String(selectedCell.col)
                            )?.name
                          }
                          service={
                            selectedService.label
                              ? t(selectedService.label)
                              : selectedService.name
                          }
                          description="Two-factor authentication adds an extra layer of security to your Pabau account. By asking you to enter a verification code after entering the correct email address and password, it will protect you from potential attackers who also might have gained access to your email address."
                          onCancel={() => setSelectedCell({ row: -1, col: '' })}
                        />
                      )}
                  </div>
                  <div
                    className={styles.reportData}
                    style={{
                      display: reportType === 'kpi-explorer' ? 'block' : 'none',
                      marginBottom: 40,
                    }}
                  >
                    <CircleGraph
                      chartData={circleChartData}
                      date={getFormattedDateLabel(
                        meta.rangeType,
                        meta.endDate || new Date()
                      )}
                      loading={loading}
                    />
                  </div>
                  <div
                    className={styles.reportData}
                    style={{
                      display: reportType === 'trend' ? 'block' : 'none',
                    }}
                  >
                    <TeamReportChart
                      ticks={getSortedDate(
                        trendData?.retrieveReport?.labels || []
                      ).map((item) =>
                        getFormattedDateLabel('monthly', new Date(item))
                      )}
                      series={chartData}
                      loading={trendLoading}
                      meta={meta}
                      error={!!trendError}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.financials}></div>
            </TabMenu>
          </div>
        </div>
      </Layout>

      <ReportHelpSidebar
        visible={showHelpSidebar}
        onClose={() => setShowHelpSidebar(false)}
        serviceGroups={serviceGroups}
      />
    </>
  )
}

export default Report
