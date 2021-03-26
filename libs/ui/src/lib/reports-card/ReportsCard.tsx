import React, { ReactText, useState } from 'react'
import { SingleReport } from '../single-report/SingleReport'
import { ShowMore } from '../show-more/ShowMore'
import { v4 as uuidv4 } from 'uuid'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CustomReport from '../../assets/lottie/custom-report.json'

import { MyLottie } from '../my-lottie/MyLottie'

import styles from './ReportsCard.module.less'

import Highcharts from 'highcharts'
import {
  HighchartsProvider,
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  Tooltip,
  AreaSeries,
} from 'react-jsx-highcharts'

export interface report {
  id: number
  reportCode: string
  reportName: string
  isNew: boolean
  favourite: boolean
}

export interface ReportsCardProps {
  catHeading?: string
  description?: string
  graphDescription?: string
  chartLabel?: string
  reports?: report[]
  graphData?: ReactText[][]
  onReportFavourite?: (reportId: number, favorite: boolean) => void
}

export const ReportsCard: React.FC<ReportsCardProps> = ({
  reports = [],
  catHeading = '',
  graphDescription = '',
  description = '',
  chartLabel = '',
  graphData = [],
  onReportFavourite,
}) => {
  const [showAll, setShowAll] = useState(false)

  const showMoreHandler = () => setShowAll((showAll) => !showAll)

  const reportsData = showAll
    ? reports
    : reports?.slice(0, reports?.length > 10 ? 9 : 10)

  return reportsData?.length > 0 ? (
    <div className={styles.reportsCard}>
      <h3 className={styles.reportsCardTitle}>{catHeading}</h3>
      <p className={styles.reportsCardDescription}>{description}</p>
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

      {reportsData.map((report) => (
        <SingleReport
          key={report.id}
          reportCode={report.reportCode}
          reportName={report.reportName}
          isNew={report.isNew}
          favourite={report.favourite}
          onReportFavourite={(isFav) => onReportFavourite?.(report.id, isFav)}
        />
      ))}

      {reports?.length < 10 &&
        Array.from({ length: 10 - reports.length })
          .fill('')
          .map(() => <div key={uuidv4()} className={styles.reportsCardCell} />)}

      {reports.length > 10 && (
        <ShowMore
          key={uuidv4()}
          length={reports.length}
          showAll={showAll}
          showMoreHandler={showMoreHandler}
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
        <h5>No Custom Reports</h5>
        <p>
          Create your first custom report by finding a report, editing and
          saving.
        </p>
      </div>
    </div>
  )
}

export default ReportsCard
