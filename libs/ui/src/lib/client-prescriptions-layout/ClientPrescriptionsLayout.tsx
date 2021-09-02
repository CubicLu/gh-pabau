import React, { FC, useRef, useState, useEffect } from 'react'
import { MyLottie as Lottie, Avatar, Button } from '@pabau/ui'
import { Collapse, Popover, Drawer } from 'antd'
import dayjs from 'dayjs'
import emptyState from '../../assets/lottie/empty-state.json'
import { useMedia } from 'react-use'
import { useTranslation } from 'react-i18next'
import PrescriptionAction from './prescription-action'
import styles from './ClientPrescriptionsLayout.module.less'
import {
  DeleteOutlined,
  EditOutlined,
  ExpandAltOutlined,
  EyeOutlined,
  MoreOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  ShrinkOutlined,
  UndoOutlined,
} from '@ant-design/icons'

export interface ClientPrescriptionsLayoutProps {
  isEmpty?: boolean
  prescriptions: PrescriptionListProps[]
  onPreviewClick: (e: PrescriptionListProps) => Promise<boolean>
  onPrintClick: (e: PrescriptionListProps) => Promise<boolean>
  onShareClick: (e: PrescriptionListProps) => Promise<boolean>
  onEditClick: (e: PrescriptionListProps) => Promise<boolean>
  onRepeatClick: (e: PrescriptionListProps) => Promise<boolean>
  onDeleteClick: (e: PrescriptionListProps) => Promise<boolean>
}

interface PrescriptionDetailsProps {
  date: string
  perWeek: string
  perDay: string
}

export interface PrescriptionListProps {
  id: number
  name: string
  date: string
  img: string
  isRepeated: boolean
  details: PrescriptionDetailsProps
}

const { Panel } = Collapse

export const ClientPrescriptionsLayout: FC<ClientPrescriptionsLayoutProps> = ({
  isEmpty,
  prescriptions,
  onPreviewClick,
  onPrintClick,
  onShareClick,
  onEditClick,
  onRepeatClick,
  onDeleteClick,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 767px)', false)
  const [openPrescriptions, setOpenPrescriptions] = useState<
    (string | number)[]
  >([])
  const [prescriptionList, setPrescriptionList] = useState<
    PrescriptionListProps[]
  >([])
  const [openPrescriptionDrawer, setOpenPrescriptionDrawer] = useState(false)
  const [openPrescriptionOptions, setOpenPrescriptionOptions] = useState<
    Record<string, boolean>
  >({ abc: true }) //{abc: true} is just a semple initial value
  const [
    drawerPrescription,
    setDrawerPrescription,
  ] = useState<PrescriptionListProps>()

  useEffect(() => {
    setPrescriptionList(prescriptions)
  }, [prescriptions])

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

  const handleCollapsePrescriptions = (key, id) => {
    const prescriptionList = [...openPrescriptions]
    if (prescriptionList.includes(id)) {
      prescriptionList.splice(prescriptionList.indexOf(id), 1)
    } else {
      prescriptionList.push(Number.parseInt(key[key.length - 1]))
    }
    setOpenPrescriptions(prescriptionList)
  }

  const prescriptionsOptions = (prescription) => {
    return (
      <div
        className={styles.prescriptionOptionsWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        {isMobile && (
          <>
            <div
              className={styles.optionItem}
              onClick={(e) => {
                e.stopPropagation()
                onPreviewClick(prescription)
              }}
            >
              <EyeOutlined />
              <h3>{t('ui.clientcard-prescriptions.options.preview')}</h3>
            </div>
            <div
              className={styles.optionItem}
              onClick={(e) => {
                e.stopPropagation()
                onPrintClick(prescription)
              }}
            >
              <PrinterOutlined />
              <h3>{t('ui.clientcard-prescriptions.options.print')}</h3>
            </div>
            <div
              className={styles.optionItem}
              onClick={(e) => {
                e.stopPropagation()
                onShareClick(prescription)
              }}
            >
              <ShareAltOutlined />
              <h3>{t('ui.clientcard-prescriptions.options.share')}</h3>
            </div>
          </>
        )}
        <div
          className={styles.optionItem}
          onClick={(e) => {
            e.stopPropagation()
            onEditClick(prescription)
          }}
        >
          <EditOutlined />
          <h3>{t('ui.clientcard-prescriptions.options.edit')}</h3>
        </div>
        <div
          className={styles.optionItem}
          onClick={(e) => {
            e.stopPropagation()
            onRepeatClick(prescription)
          }}
        >
          <UndoOutlined />
          <h3>{t('ui.clientcard-prescriptions.options.repeat')}</h3>
        </div>
        <div
          className={styles.optionItem}
          onClick={(e) => {
            e.stopPropagation()
            onDeleteClick(prescription)
          }}
        >
          <DeleteOutlined />
          <h3>{t('ui.clientcard-prescriptions.options.delete')}</h3>
        </div>
      </div>
    )
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
        <div className={styles.prescriptionList}>
          {prescriptionList.length > 0 &&
            prescriptionList.map((item) => (
              <div
                key={item.id}
                className={
                  openPrescriptions.includes(item.id)
                    ? styles.prescriptionsMainWrapperAfter
                    : styles.prescriptionsMainWrapper
                }
              >
                <Collapse
                  activeKey={openPrescriptions}
                  expandIconPosition="right"
                  expandIcon={
                    openPrescriptions.includes(item.id) ? OpenIcon : ClosedIcon
                  }
                  onChange={(e) => handleCollapsePrescriptions(e, item.id)}
                  ghost
                >
                  <Panel
                    header={
                      <div className={styles.prescriptionsHeaderWrapper}>
                        <div className={styles.prescriptionsTitleWrapper}>
                          <Avatar size="default" src={item.img} />
                          <div className={styles.titleContent}>
                            <h3>{item.name}</h3>
                            <span>
                              {dayjs(item.date).format('DD MMM YYYY, h:mm A')}
                            </span>
                          </div>
                        </div>
                        <div className={styles.prescriptionActionsWrapper}>
                          {openPrescriptions.includes(item.id) && (
                            <PrescriptionAction
                              prescription={item}
                              onPreviewClick={onPreviewClick}
                              onPrintClick={onPrintClick}
                              onShareClick={onShareClick}
                            />
                          )}
                          {isMobile ? (
                            <Button
                              shape="circle"
                              className={styles.moreBtn}
                              icon={<MoreOutlined />}
                              onClick={(e) => {
                                e.stopPropagation()
                                setDrawerPrescription(item)
                                setOpenPrescriptionDrawer((val) => !val)
                              }}
                            />
                          ) : (
                            <Popover
                              visible={openPrescriptionOptions[item.id]}
                              placement="bottom"
                              trigger="click"
                              content={prescriptionsOptions(item)}
                              overlayClassName={styles.customPopover}
                              onVisibleChange={(val) =>
                                setOpenPrescriptionOptions({
                                  ...openPrescriptionOptions,
                                  [item.id]: val,
                                })
                              }
                            >
                              <Button
                                shape="circle"
                                className={styles.moreBtn}
                                icon={<MoreOutlined />}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </Popover>
                          )}
                        </div>
                      </div>
                    }
                    key={item.id}
                  >
                    <div className={styles.prescriptionsContentWrapper}>
                      <h3>{dayjs(item.details.date).format('DD/MM/YYYY')}</h3>
                      <h3>{item.details.perWeek}</h3>
                      <h3>{item.details.perDay}</h3>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            ))}
        </div>
      )}
      <Drawer
        visible={openPrescriptionDrawer}
        height="263px"
        placement="bottom"
        closable={false}
        className={styles.prescriptionOptionsDrawer}
        key={'bottom'}
        onClose={() => setOpenPrescriptionDrawer((val) => !val)}
      >
        <div className={styles.prescriptionOptionsDrawerWrapper}>
          <span className={styles.line} />
          {prescriptionsOptions(drawerPrescription)}
        </div>
      </Drawer>
    </div>
  )
}

export default ClientPrescriptionsLayout
