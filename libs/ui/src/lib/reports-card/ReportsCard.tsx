import classNames from 'classnames'
import Highcharts from 'highcharts'
import React, { ReactText, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AreaSeries,
  Chart,
  HighchartsChart,
  HighchartsProvider,
  Tooltip,
  XAxis,
  YAxis,
} from 'react-jsx-highcharts'
import { v4 as uuidv4 } from 'uuid'
import CustomReport from '../../assets/lottie/custom-report.json'
import { MyLottie } from '../my-lottie/MyLottie'
import { ShowMore } from '../show-more/ShowMore'
import { SingleReport } from '../single-report/SingleReport'
import styles from './ReportsCard.module.less'

export interface report {
  id: number
  reportCode: string
  reportName: string
  isNew: boolean
  favourite: boolean
  isPermission?: boolean
}

export interface ReportsCardProps {
  catHeading?: string
  description?: string
  graphDescription?: string
  chartLabel?: string
  reports?: report[]
  graphData?: ReactText[][]
  clickable?: boolean
  onReportFavourite?: (reportId: number, favorite: boolean) => void
  isReportloading?: boolean
}

export const ReportsCard: React.FC<ReportsCardProps> = ({
  reports = [],
  catHeading = '',
  graphDescription = '',
  description = '',
  chartLabel = '',
  graphData = [],
  clickable = false,
  onReportFavourite,
  isReportloading,
}) => {
  const [showAll, setShowAll] = useState(false)
  const { t } = useTranslation('common')
  const showMoreHandler = () => setShowAll((showAll) => !showAll)

  const isCustomReport = graphData.length === 0
  const currentGridRecord =
    reports?.length > 10 ? (isCustomReport ? 11 : 9) : 10
  const reportsData = showAll ? reports : reports?.slice(0, currentGridRecord)

  return reportsData?.length > 0 ? (
    <div className={styles.reportsCard}>
      <h3 className={styles.reportsCardTitle}>{catHeading}</h3>
      <p
        className={
          isCustomReport
            ? classNames(styles.reportsCardDescription, styles.custom)
            : styles.reportsCardDescription
        }
      >
        {description}
      </p>
      {!isCustomReport && (
        <>
          <div className={styles.reportsCardGraphDescContainer}>
            <span>{graphDescription}</span>
            <span>{chartLabel}</span>
          </div>

          <div className={styles.reportsCardGraph}>
            <HighchartsProvider Highcharts={Highcharts}>
              <HighchartsChart>
                <Chart
                  height="36px"
                  borderRadius={3}
                  marginBottom={0}
                  backgroundColor="#ECEDF008"
                  type="area"
                  spacingLeft={0}
                  spacingRight={0}
                />

                <Tooltip
                  formatter={function () {
                    return chartLabel === 'int'
                      ? `${this.key} - ${this.y}`
                      : `${this.key} - ${chartLabel + this.y}`
                  }}
                />

                <XAxis id="XAxis" visible={false} />

                <YAxis id="YAxis" visible={false}>
                  <AreaSeries
                    id={catHeading}
                    name={catHeading}
                    data={graphData}
                    color="#54B2D3"
                    fillColor="#EEF7FB"
                    fillOpacity={1}
                    lineWidth={1}
                    marker={{
                      radius: 2,
                    }}
                  />
                </YAxis>
              </HighchartsChart>
            </HighchartsProvider>
          </div>
        </>
      )}

      {reportsData.map((report) => (
        <SingleReport
          catHeading={catHeading}
          key={report.id}
          reportCode={report.reportCode}
          reportName={report.reportName}
          isNew={report.isNew}
          favourite={report.favourite}
          onReportFavourite={(isFav) => onReportFavourite?.(report.id, isFav)}
          isPermission={report.isPermission}
          clickable={clickable}
          isReportloading={isReportloading}
          isCustomReport={isCustomReport}
          reportId={report.id}
        />
      ))}

      {reports?.length < 10 &&
        Array.from({ length: 10 - reports.length })
          .fill('')
          .map(() => <div key={uuidv4()} className={styles.reportsCardCell} />)}

      {!isReportloading && reports.length > 10 && (
        <ShowMore
          key={uuidv4()}
          length={reports.length}
          showAll={showAll}
          showMoreHandler={showMoreHandler}
          currentRecord={currentGridRecord}
        />
      )}
    </div>
  ) : (
    <div className={styles.reportsCard}>
      <h3 className={styles.reportsCardTitle}>{catHeading}</h3>
      <div className={styles.reportsCardCustom}>
        <MyLottie
          width="100%"
          height="auto"
          options={{
            animationData: CustomReport,
            autoplay: true,
          }}
        />
        <h5>{t('setup.reports.custome.lable')}</h5>
        <p>{t('setup.reports.custome.description')}</p>
      </div>
    </div>
  )
}

export default ReportsCard
