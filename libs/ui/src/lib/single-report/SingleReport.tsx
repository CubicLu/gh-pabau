import React from 'react'
import { Button } from '@pabau/ui'
import styles from './SingleReport.module.less'
import Favourite from '../../assets/images/favourite.svg'
import Unfavourite from '../../assets/images/unfavourite.svg'

export interface SingleReportProps {
  reportCode?: string
  reportName?: string
  isNew?: boolean
  favourite?: boolean
  onReportFavourite?: (isFav: boolean) => void
}

export const SingleReport: React.FC<SingleReportProps> = ({
  reportCode,
  reportName,
  isNew,
  favourite,
  onReportFavourite,
}) => {
  return (
    <div className={styles.singleReport}>
      <div className={isNew ? styles.newBtnAdd : styles.singleReportContainer}>
        <Button
          type="text"
          size="small"
          className={styles.singleReportStar}
          onClick={() => onReportFavourite?.(!favourite)}
        >
          {favourite ? (
            <img src={Favourite} alt="favourited" />
          ) : (
            <img src={Unfavourite} alt="unfavourited" />
          )}
        </Button>
        <span className={styles.singleReportCode}>
          {reportCode} - {reportName}
        </span>
      </div>
      {isNew && <div className={styles.singleReportNew}>New</div>}
    </div>
  )
}
