import { SetupEmptySearch } from '@pabau/ui'
import { Card } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Highlighter from 'react-highlight-words'
import styles from '../../../pages/setup/setup.module.less'

interface SearchItemProps {
  subTitle: string
  href?: string
  title?: string
  isPermission?: boolean
  isModal?: boolean
}

interface P {
  data: SearchItemProps[]
  searchTerm: string
  setSMSModalVisible?: () => void
  checkPermission?: boolean
  displayTitle?: boolean
}

const SearchResults: FC<P> = ({
  data,
  searchTerm,
  checkPermission = false,
  displayTitle = true,
  setSMSModalVisible,
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
                  thread.isModal
                    ? setSMSModalVisible()
                    : checkPermission
                    ? thread.isPermission && router.push(thread.href)
                    : router.push(thread.href)
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
