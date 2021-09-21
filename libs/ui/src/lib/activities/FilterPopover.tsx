import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Popover, Tree, Drawer } from 'antd'
import styles from './Activities.module.less'
import { Button, RangePicker } from '@pabau/ui'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { activityTypes } from './Activities'
import { useMedia } from 'react-use'

export interface TimelineFilterProps {
  children?: ReactNode
  setVisible?: (val) => void
  setSelectedFilterKey?: (val) => void
  selectedFilterKey?: string[]
  dateRange?: Dayjs[]
  setDateRange?: (val) => void
  eventDateFormat: string
  visible: boolean
}

export const TimelineFilter: FC<TimelineFilterProps> = ({
  children,
  setVisible,
  selectedFilterKey = [],
  setSelectedFilterKey,
  dateRange,
  setDateRange,
  eventDateFormat,
  visible,
}) => {
  const { t } = useTranslation('common')
  const isMobile = useMedia('(max-width: 768px)', false)
  const [selectedKey, setSelectedKey] = useState<string[]>([])
  const [date, setDate] = useState<Dayjs[]>([])

  useEffect(() => {
    setSelectedKey(selectedFilterKey)
  }, [selectedFilterKey])

  useEffect(() => {
    dateRange && setDate([dateRange[0], dateRange[1]])
  }, [dateRange])
  const treeData = [
    {
      title: t('timeline.filter.email'),
      key: activityTypes.email,
    },
    {
      title: t('timeline.filter.letter'),
      key: activityTypes.letter,
    },
    {
      title: t('timeline.filter.sms'),
      key: activityTypes.sms,
    },
    {
      title: t('timeline.filter.call'),
      key: activityTypes.call,
    },
  ]

  const onCheck = (checkedKeys) => {
    setSelectedKey(checkedKeys)
  }

  const onOk = (value) => {
    setDate(value)
  }

  const handleApplyClick = () => {
    setSelectedFilterKey?.(selectedKey)
    date?.[0] && date?.[1] ? setDateRange?.(date) : setDateRange?.([])
    setVisible?.(false)
  }

  const handleClearAll = () => {
    setSelectedKey([])
    setDate([])
  }

  const content = () => {
    return (
      <div className={styles.filterPopupContent}>
        <h5>{t('timeline.activityType')}</h5>
        <div className={styles.filterBody}>
          <Tree
            checkable
            checkedKeys={selectedKey}
            onCheck={onCheck}
            treeData={treeData}
          />
        </div>
        <div className={styles.timeWrapRange}>
          <h5>{t('timeline.timeRange')}</h5>
          <RangePicker
            showTime={{ format: 'h:mm a' }}
            format={eventDateFormat}
            value={date && [date[0], date[1]]}
            onOk={onOk}
          />
        </div>
        <div className={styles.btnGroupTime}>
          <Button onClick={handleClearAll}>{t('timeline.clearAll')}</Button>
          <Button type={'primary'} onClick={handleApplyClick}>
            {t('timeline.apply')}
          </Button>
        </div>
      </div>
    )
  }

  const handleVisible = (value) => {
    setVisible?.(value)
  }

  const handleClose = () => {
    setVisible?.(!visible)
  }

  return (
    <div>
      <Popover
        visible={visible && !isMobile}
        content={content}
        title={t('timeline.filteredBy')}
        trigger={'click'}
        placement={'bottomRight'}
        overlayClassName={styles.filterPopup}
        onVisibleChange={handleVisible}
      >
        {children}
      </Popover>
      {isMobile && (
        <Drawer
          title={t('timeline.filteredBy')}
          placement={'bottom'}
          closable={false}
          className={styles.mobileDrawer}
          onClose={handleClose}
          visible={visible}
          key={'bottom'}
        >
          <span className={styles.line}></span>
          {content()}
        </Drawer>
      )}
    </div>
  )
}

export default TimelineFilter
