import { Button } from '@pabau/ui'
import { Skeleton, Tooltip } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Favourite from '../../assets/images/favourite.svg'
import Unfavourite from '../../assets/images/unfavourite.svg'
import styles from './SingleReport.module.less'

export interface SingleReportProps {
  catHeading?: string
  reportCode?: string
  reportName?: string
  isNew?: boolean
  favourite?: boolean
  isPermission?: boolean
  clickable?: boolean
  onReportFavourite?: (isFav: boolean) => void
  isReportloading?: boolean
  isCustomReport?: boolean
  reportId?: number
}

const reportHref = {
  ADV001: '/team/report',
}
export const SingleReport: React.FC<SingleReportProps> = ({
  catHeading = '',
  reportCode,
  reportName,
  isNew,
  favourite,
  isPermission,
  clickable,
  onReportFavourite,
  isReportloading = false,
  isCustomReport = false,
  reportId,
}) => {
  const { t } = useTranslation('common')

  const getReportHref = () => {
    if (reportCode && reportHref[reportCode]) {
      return reportHref[reportCode]
    } else {
      return isCustomReport
        ? `/reports/` + reportId?.toString()
        : `/reports/` + reportCode
    }
  }
  return (
    <div
      className={
        isPermission
          ? styles.singleReport
          : classNames(styles.singleReport, styles.disable)
      }
    >
      <div
        className={
          !isPermission
            ? styles.singleReportDisable
            : isNew
            ? styles.newBtnAdd
            : styles.singleReportContainer
        }
      >
        <Button
          type="text"
          size="small"
          className={styles.singleReportStar}
          disabled={!isPermission}
          onClick={() => onReportFavourite?.(!favourite)}
        >
          {isReportloading ? (
            <Skeleton.Input
              active={true}
              size={'small'}
              style={{ width: 25 }}
            />
          ) : favourite ? (
            <img src={Favourite} alt="favourited" />
          ) : (
            <img src={Unfavourite} alt="unfavourited" />
          )}
        </Button>
        <span className={styles.singleReportCode}>
          {isReportloading ? (
            <Skeleton.Input
              active={true}
              size={'small'}
              style={{ width: 300 }}
            />
          ) : isPermission && clickable ? (
            <a href={getReportHref()} style={{ color: 'rgba(0,0,0,0.65)' }}>
              {isCustomReport
                ? reportName
                : t(`setup.reports.${catHeading}.${reportCode}`)}
            </a>
          ) : isCustomReport ? (
            reportName
          ) : (
            t(`setup.reports.${catHeading}.${reportCode}`)
          )}
        </span>
      </div>
      {isNew && isReportloading ? (
        <div className={styles.singleReportNewLoader}>
          <Skeleton.Input active={true} size={'small'} style={{ width: 45 }} />
        </div>
      ) : (
        isNew && (
          <Tooltip
            title={t('setup.reports.label.tooltip')}
            placement="topRight"
          >
            <div className={styles.singleReportNew}>
              {t('setup.reports.label.title')}
            </div>
          </Tooltip>
        )
      )}
    </div>
  )
}
