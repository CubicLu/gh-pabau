import React, { FC, useState, useEffect } from 'react'
import { Button } from '@pabau/ui'
import { Skeleton } from 'antd'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import classNames from 'classnames'
import 'react-vertical-timeline-component/style.min.css'
import { Collapse } from 'antd'
import { useMedia } from 'react-use'
import styles from './ClientFormsLayout.module.less'

interface SkeletonProps {
  length?: number
}

export const ClientFormsSkeleton: FC<SkeletonProps> = ({ length }) => {
  const isMobile = useMedia('(max-width: 767px)', false)

  const [accordionState, setAccordionState] = useState<number[]>([])
  const [formState, setFormState] = useState<{ id: number }[]>([])

  useEffect(() => {
    const forms: { id: number }[] = []
    let randomLen = length
    if (!randomLen) {
      randomLen = Math.floor(1 + Math.random() * 12)
      randomLen = randomLen < 7 ? 9 : randomLen
    }
    for (let i = 1; i <= randomLen; i++) {
      forms.push({ id: i })
    }
    setFormState(forms)
  }, [length])

  const callBack = (key, id) => {
    const formList = [...accordionState]
    if (formList.includes(id)) {
      formList.splice(formList.indexOf(id), 1)
    } else {
      formList.push(Number.parseInt(key[key.length - 1]))
    }
    setAccordionState(formList)
  }

  return (
    <VerticalTimeline layout={'1-column-left'} animate={false}>
      {formState?.map((indform) => {
        return (
          <VerticalTimelineElement
            key={indform.id}
            className={classNames(
              'vertical-timeline-element--work',
              styles.formListClass
            )}
            iconStyle={{
              background: '#ffffff',
              color: '#ffffff',
            }}
            icon={<Skeleton.Avatar active />}
          >
            <div
              className={
                accordionState.includes(indform.id)
                  ? styles.mainCollapseDivAfter
                  : styles.mainCollapseDiv
              }
            >
              <Collapse
                activeKey={accordionState}
                onChange={(e) => callBack(e, indform.id)}
                expandIcon={() => {
                  return (
                    <div>
                      <Skeleton.Avatar active />
                    </div>
                  )
                }}
                ghost={true}
              >
                <Collapse.Panel
                  header={
                    <div
                      className={classNames(styles.headerMain, styles.skeleton)}
                      style={{
                        width: `${Math.floor(1 + Math.random() * 4) * 100}px`,
                      }}
                    >
                      <div className={styles.timeEleWrap}>
                        <span className={styles.formsName}>
                          <Skeleton active paragraph={{ rows: 0 }} />
                        </span>
                        <span className={styles.formsDetail}>
                          <p
                            style={{
                              minWidth: `${
                                Math.floor(1 + Math.random() * 2) * 100
                              }px`,
                            }}
                          >
                            <Skeleton active paragraph={{ rows: 0 }} />{' '}
                            <Skeleton active paragraph={{ rows: 0 }} />
                          </p>
                        </span>
                      </div>
                      {accordionState.includes(indform.id) && !isMobile && (
                        <div className={styles.formActionBtnWrapper}>
                          <div className={styles.buttonAll}>
                            <Skeleton.Button
                              active
                              className={styles.buttonPrintShare}
                            />
                            <Skeleton.Button
                              active
                              className={styles.buttonPrintShare}
                            />
                            <Button
                              ghost
                              shape="circle"
                              className={styles.buttonInd}
                              style={{ padding: '0px' }}
                            >
                              <Skeleton.Avatar active />
                            </Button>
                            <Button
                              ghost
                              shape="circle"
                              className={styles.buttonInd}
                              style={{ padding: '0px' }}
                            >
                              <Skeleton.Avatar active />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                  key={indform.id}
                >
                  <div>
                    {Array.from({
                      length: Math.floor(1 + Math.random() * 3),
                    })
                      .fill(null)
                      .map((_, i) => i)
                      .map((key) => {
                        return (
                          <div
                            className={styles.fullForm}
                            key={`form-view-${key}`}
                          >
                            <span className={styles.contentName}>
                              <Skeleton
                                active
                                paragraph={{
                                  rows: Math.floor(1 + Math.random() * 3),
                                }}
                              />
                            </span>

                            <span className={styles.detailsBorder} />
                          </div>
                        )
                      })}
                  </div>
                </Collapse.Panel>
              </Collapse>
            </div>
          </VerticalTimelineElement>
        )
      })}
    </VerticalTimeline>
  )
}

export default ClientFormsSkeleton
