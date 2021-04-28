import React, { FC } from 'react'
import { Card } from 'antd'
import Highlighter from 'react-highlight-words'

import { SetupEmptySearch } from '@pabau/ui'
import styles from '../../../pages/setup/Setup.module.less'
import { useRouter } from 'next/router'
import classNames from 'classnames'

interface searchProps {
  subTitle: string
  href?: string
  title?: string
  isPermission?: boolean
}
interface P {
  data: searchProps[]
  searchTerm: string
  checkPermission?: boolean
  displayTitle?: boolean
}

const SearchResults: FC<P> = ({
  data,
  searchTerm,
  checkPermission = false,
  displayTitle = true,
}) => {
  const router = useRouter()
  return (
    <Card className={styles.searchResultsCard} bodyStyle={{ padding: '0' }}>
      {data && data.length > 0 && (
        <div className={styles.searchBody}>
          {data.map((thread, index) => {
            return (
              <div
                key={index}
                className={
                  checkPermission
                    ? !thread.isPermission
                      ? classNames(
                          styles.searchList,
                          styles.singleReportDisable
                        )
                      : styles.searchList
                    : styles.searchList
                }
                onClick={() => {
                  thread.isPermission && router.push(thread.href)
                }}
              >
                <span>
                  <Highlighter
                    highlightClassName={styles.highlight}
                    searchWords={[searchTerm]}
                    textToHighlight={thread.subTitle}
                  />
                  {displayTitle && (
                    <span className={styles.searchTitle}>
                      {' '}
                      - {thread.title}
                    </span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      )}
      {data && data.length === 0 && <SetupEmptySearch />}
    </Card>
  )
}

export default SearchResults
