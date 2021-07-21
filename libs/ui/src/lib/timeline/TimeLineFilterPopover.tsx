import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Popover, Tree } from 'antd'
import styles from './Timeline.module.less'
import { Button, RangePicker } from '@pabau/ui'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { types, statuses } from './Timeline'

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
      title: t('timeline.filter.selectAll'),
      key: 'Select All',
      children: [
        {
          title: t('timeline.filter.appointment'),
          key: types.appointment,
          children: [
            {
              title: t('timeline.filter.arrived'),
              key: statuses.arrived,
            },
            {
              title: t('timeline.filter.cancelled'),
              key: statuses.cancelled,
            },
            {
              title: t('timeline.filter.confirmed'),
              key: statuses.confirmed,
            },
            {
              title: t('timeline.filter.rescheduled'),
              key: statuses.rescheduled,
            },
            {
              title: t('timeline.filter.noShow'),
              key: statuses.noShow,
            },
            {
              title: t('timeline.filter.created'),
              key: statuses.created,
            },
            {
              title: t('timeline.filter.upcoming'),
              key: statuses.upcoming,
            },
          ],
        },
        {
          title: t('timeline.filter.transaction'),
          key: 'Transaction',
          children: [
            {
              title: t('timeline.filter.payment'),
              key: types.payment,
            },
            {
              title: t('timeline.filter.invoice'),
              key: types.invoice,
            },
            {
              title: t('timeline.filter.refund'),
              key: types.refund,
            },
            {
              title: t('timeline.filter.credit'),
              key: types.credit,
            },
          ],
        },
        {
          title: t('timeline.filter.task'),
          key: types.task,
        },
        {
          title: t('timeline.filter.document'),
          key: types.document,
        },
        {
          title: t('timeline.filter.clientNote'),
          key: types.clientNote,
        },
        {
          title: t('timeline.filter.staffAlert'),
          key: types.staffAlert,
        },
        {
          title: t('timeline.filter.photos'),
          key: types.photos,
        },
        {
          title: t('timeline.filter.communication'),
          key: 'Communication',
          children: [
            {
              title: t('timeline.filter.email'),
              key: types.mail,
            },
            {
              title: t('timeline.filter.letter'),
              key: types.letter,
            },
            {
              title: t('timeline.filter.sms'),
              key: types.sms,
            },
            {
              title: t('timeline.filter.call'),
              key: types.call,
            },
          ],
        },
        {
          title: t('timeline.filter.medical'),
          key: 'medical',
          children: [
            {
              title: t('timeline.filter.medicalForm'),
              key: types.medicalForm,
            },
            {
              title: t('timeline.filter.medicalCondition'),
              key: types.medicalCondition,
            },
            {
              title: t('timeline.filter.lab'),
              key: types.lab,
            },
          ],
        },
        {
          title: t('timeline.filter.recall'),
          key: types.recall,
        },
        {
          title: t('timeline.filter.pabauConnect'),
          key: types.pabauConnect,
        },
      ],
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
            defaultExpandedKeys={['Select All']}
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
  return (
    <Popover
      visible={visible}
      content={content}
      title={t('timeline.filteredBy')}
      trigger={'click'}
      placement={'bottomRight'}
      overlayClassName={styles.filterPopup}
      onVisibleChange={handleVisible}
    >
      {children}
    </Popover>
  )
}

export default TimelineFilter
