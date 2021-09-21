import React, { FC, useEffect, useRef, useState } from 'react'
import { MyLottie as Lottie, Avatar, Button } from '@pabau/ui'
import { Collapse, Popover, Drawer } from 'antd'
import {
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  MoreOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  ExpandAltOutlined,
  ShrinkOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import emptyState from '../../assets/lottie/empty-state.json'
import styles from './ClientLabTestsLayout.module.less'
import classNames from 'classnames'

const { Panel } = Collapse

export interface ClientLabTestsLayoutProps {
  isEmpty?: boolean
  testList: LabTestListProps[]
  onViewReportClick: (e: number) => void
  onPrintClick: (e: LabTestListProps) => Promise<boolean>
  onShareClick: (e: LabTestListProps) => Promise<boolean>
  onDeleteClick: (e: number) => Promise<boolean>
}

interface LabTestListProps {
  id: number
  name: string
  orderNo: string
  date: string
  tester: string
  laboratory: string
  img: string
  testStatus: string
  isPreviewAvailable: boolean
}

export const ClientLabTestsLayout: FC<ClientLabTestsLayoutProps> = ({
  isEmpty,
  testList,
  onViewReportClick,
  onPrintClick,
  onShareClick,
  onDeleteClick,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [openLabTests, setOpenLabTests] = useState<(string | number)[]>([])
  const [labTestList, setLabTestList] = useState<LabTestListProps[]>([])
  const [openLabTestOptions, setOpenLabTestOptions] = useState<
    Record<string, boolean>
  >({ abc: true }) //{abc: true} is just a semple initial value
  const [openLabTestDrawer, setOpenLabTestDrawer] = useState(false)
  const [drawerLabTest, setDrawerLabTest] = useState<LabTestListProps>()

  useEffect(() => {
    setLabTestList(testList)
  }, [testList])

  const ClosedIcon = () => {
    return (
      <div>
        <ExpandAltOutlined />
      </div>
    )
  }
  const OpenIcon = () => {
    return (
      <div>
        <ShrinkOutlined />
      </div>
    )
  }

  const labTestOptions = (test) => {
    return (
      <div
        className={styles.labTestOptionsWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.optionItem}
          onClick={(e) => {
            e.stopPropagation()
            onViewReportClick(test.id)
          }}
        >
          <FileTextOutlined />
          <span>{t('ui.clientcard-labtests.options.viewreport')}</span>
        </div>
        <div
          className={styles.optionItem}
          onClick={(e) => {
            e.stopPropagation()
            onPrintClick(test)
          }}
        >
          <PrinterOutlined />
          <span>{t('ui.clientcard-labtests.options.print')}</span>
        </div>
        <div
          className={styles.optionItem}
          onClick={(e) => {
            e.stopPropagation()
            onShareClick(test)
          }}
        >
          <ShareAltOutlined />
          <span>{t('ui.clientcard-labtests.options.share')}</span>
        </div>
        <div
          className={styles.optionItem}
          onClick={(e) => {
            e.stopPropagation()
            onDeleteClick(test.id)
          }}
        >
          <DeleteOutlined />
          <span>{t('ui.clientcard-labtests.options.delete')}</span>
        </div>
      </div>
    )
  }

  const getExtra = (test) => {
    return (
      <div className={styles.moreButtonWrapper}>
        {isMobile ? (
          <Button
            shape="circle"
            className={styles.moreBtn}
            icon={
              <MoreOutlined
                style={
                  openLabTestDrawer
                    ? { color: '#40A0C1' }
                    : { color: '#9292A3' }
                }
              />
            }
            onClick={(e) => {
              e.stopPropagation()
              setDrawerLabTest(test)
              setOpenLabTestDrawer((val) => !val)
            }}
          />
        ) : (
          <Popover
            visible={openLabTestOptions[test.id]}
            placement="bottom"
            trigger="click"
            content={labTestOptions(test)}
            overlayClassName={styles.customPopover}
            onVisibleChange={(val) =>
              setOpenLabTestOptions({
                ...openLabTestOptions,
                [test.id]: val,
              })
            }
            getPopupContainer={(trigger) =>
              trigger.parentElement as HTMLElement
            }
          >
            <Button
              shape="circle"
              id="btnTestOptions"
              icon={
                <MoreOutlined
                  style={
                    openLabTestOptions[test.id]
                      ? { color: '#40A0C1' }
                      : { color: '#9292A3' }
                  }
                />
              }
              onClick={(e) => e.stopPropagation()}
            />
          </Popover>
        )}
      </div>
    )
  }

  const handleCollapseLabTests = (key, id) => {
    const labTestList = [...openLabTests]
    if (labTestList.includes(id)) {
      labTestList.splice(labTestList.indexOf(id), 1)
    } else {
      labTestList.push(Number.parseInt(key[key.length - 1]))
    }
    setOpenLabTests(labTestList)
  }

  return (
    <div className={styles.clientLayout} ref={ref}>
      {isEmpty ? (
        <Lottie
          options={{
            loop: true,
            autoPlay: true,
            animationData: emptyState,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
      ) : (
        <div className={styles.labTestList}>
          {labTestList.length > 0 &&
            labTestList.map((item) => (
              <div
                key={item.id}
                className={
                  openLabTests.includes(item.id)
                    ? styles.labTestMainWrapperAfter
                    : styles.labTestMainWrapper
                }
              >
                <Collapse
                  activeKey={openLabTests}
                  expandIconPosition="right"
                  expandIcon={
                    openLabTests.includes(item.id) ? OpenIcon : ClosedIcon
                  }
                  onChange={(e) => handleCollapseLabTests(e, item.id)}
                  ghost
                >
                  <Panel
                    header={
                      <div className={styles.labTestsHeaderWrapper}>
                        <div className={styles.labTestTitleWrapper}>
                          <Avatar size="default" src={item.img} />
                          <div className={styles.titleContent}>
                            {!isMobile ? (
                              <h3>{item.name}</h3>
                            ) : (
                              <div className={styles.testTitleWrapperMobile}>
                                <h3>{item.name}</h3>
                                {item.isPreviewAvailable && (
                                  <div className={styles.previewStatus}>
                                    <EyeOutlined />
                                  </div>
                                )}
                              </div>
                            )}
                            <span className={styles.testDetails}>
                              {`${dayjs(item.date).format(
                                'DD MMM YYYY, h:mm A'
                              )} Order ${item.orderNo} | by ${item.tester} | ${
                                item.laboratory
                              }`}
                            </span>
                          </div>
                        </div>
                        <div className={styles.testStatusWrapper}>
                          {item.isPreviewAvailable && !isMobile && (
                            <div className={styles.previewStatus}>
                              <EyeOutlined />
                            </div>
                          )}
                          <div
                            className={
                              /received/gi.test(item.testStatus)
                                ? classNames(
                                    styles.testStatus,
                                    styles.testReceived
                                  )
                                : /awaiting/gi.test(item.testStatus)
                                ? classNames(
                                    styles.testStatus,
                                    styles.testAwaiting
                                  )
                                : undefined
                            }
                          >
                            <h3>{item.testStatus}</h3>
                          </div>
                        </div>
                      </div>
                    }
                    extra={getExtra(item)}
                    key={item.id}
                  />
                </Collapse>
              </div>
            ))}
        </div>
      )}
      <Drawer
        visible={openLabTestDrawer}
        height="192px"
        placement="bottom"
        closable={false}
        className={styles.labTestOptionsDrawer}
        key={'bottom'}
        onClose={() => setOpenLabTestDrawer((val) => !val)}
      >
        <div className={styles.labTestOptionsDrawerWrapper}>
          <span className={styles.line} />
          {labTestOptions(drawerLabTest)}
        </div>
      </Drawer>
    </div>
  )
}

export default ClientLabTestsLayout
