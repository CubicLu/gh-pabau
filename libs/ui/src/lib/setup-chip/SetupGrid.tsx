import React, { useState } from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import Link from 'next/link'
import classNames from 'classnames'

import styles from './SetupChip.module.less'

const { Panel } = Collapse

export interface SubData {
  title: string
  href?: string
  isModal?: boolean
}

export interface SubDataTitle {
  title: string
  data: SubData[]
  href?: string
}

export interface SetupGridProps {
  image: string
  title: string
  subDataTitles: SubDataTitle[]
  isExpand?: boolean
  expandTitle?: SubDataTitle[]
  setSMSModalVisible?: () => void
  expandLabel?: string
}

export function SetupGrid(props: SetupGridProps): JSX.Element {
  const {
    image,
    title,
    subDataTitles,
    expandTitle,
    isExpand,
    setSMSModalVisible,
    expandLabel,
  } = props
  const [data, setData] = useState<SubDataTitle[]>(subDataTitles)
  const [expand, setExpand] = useState<boolean>(isExpand ?? false)

  const onExpandClick = () => {
    if (expandTitle) {
      setData([...subDataTitles, ...expandTitle])
      setExpand(false)
    }
  }

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.imgWrap}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.listDetails}>
        <div className={classNames(styles.listItem, styles.listTitle)}>
          <span className={styles.listTitle}>{title}</span>
        </div>
        {data.length > 0 &&
          data.map((subTitle, index) => {
            return subTitle.data.length > 0 ? (
              <Collapse accordion key={index}>
                <Panel
                  header={
                    <div key={index} className={styles.subList}>
                      <span>{subTitle.title}</span>
                      <RightOutlined />
                    </div>
                  }
                  key={index}
                  showArrow={false}
                  className={styles.collapsePanel}
                >
                  {subTitle.data.map((thread, index) => {
                    return (
                      <div key={index} className={styles.panelItem}>
                        {thread.href ? (
                          <Link href={thread.href}>
                            <span>{thread.title}</span>
                          </Link>
                        ) : thread.isModal ? (
                          <span onClick={setSMSModalVisible}>
                            {thread.title}
                          </span>
                        ) : (
                          <span>{thread.title}</span>
                        )}
                      </div>
                    )
                  })}
                </Panel>
              </Collapse>
            ) : (
              <div key={index} className={styles.listItem}>
                {subTitle.href ? (
                  <Link href={subTitle.href}>
                    <span>{subTitle.title}</span>
                  </Link>
                ) : (
                  <span>{subTitle.title}</span>
                )}
              </div>
            )
          })}
        {expand && (
          <div className={styles.listItem} onClick={onExpandClick}>
            <b>{expandLabel}</b>
          </div>
        )}
      </div>
    </div>
  )
}

export default SetupGrid
