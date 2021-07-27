import React, { useEffect, useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import {
  TeamReportEmployee,
  TeamReportLocation,
  TeamReportDate,
  rangeTypes,
  TeamReportMeta,
} from '@pabau/ui'
import { Button, Col, Collapse, Drawer, Row } from 'antd'
import classNames from 'classnames'
import { useTranslationI18 } from './../../../hooks/useTranslationI18'

import styles from './FilterDrawer.module.less'

interface FilterDrawerProps {
  isOpened: boolean
  employerList: TeamReportEmployee[]
  locations: TeamReportLocation[]
  dateOptions: TeamReportDate[]
  meta: TeamReportMeta
  onChangeMeta: (newMeta: TeamReportMeta) => void
  onClose: VoidFunction
}

export default function FilterDrawer({
  isOpened,
  employerList,
  locations,
  dateOptions,
  meta: defaultMeta,
  onChangeMeta,
  onClose,
}: FilterDrawerProps) {
  const { t } = useTranslationI18()

  const [openedPanel, setOpenedPanel] = useState('')
  const [meta, setMeta] = useState<TeamReportMeta>(defaultMeta)

  useEffect(() => {
    setMeta(defaultMeta)
  }, [defaultMeta])

  return (
    <Drawer
      placement="bottom"
      closable={true}
      onClose={onClose}
      visible={isOpened}
      className={styles.mobileDrawer}
      height={350}
    >
      <div className={styles.headerStick} />
      <div className={styles.headerTitle}>
        {t('basic-crud-table-button-filter')}
      </div>
      <Collapse
        ghost
        accordion
        onChange={(key: string) => setOpenedPanel(key)}
        activeKey={openedPanel}
        className={styles.collapse}
        expandIcon={({ isActive }) =>
          isActive ? <UpOutlined /> : <DownOutlined />
        }
        expandIconPosition="right"
      >
        <Collapse.Panel key="teams" header={t('setup.reports.by-teams')}>
          {employerList.map((item) => (
            <div
              key={item.name}
              className={classNames(
                styles.panelItem,
                meta.employees.includes(item.id) && styles.selected
              )}
              onClick={() => {
                const selected = [...meta.employees]
                const index = selected.indexOf(item.id)

                if (index === -1) {
                  selected.push(item.id)
                } else {
                  selected.splice(index, 1)
                }

                setMeta({ ...meta, employees: selected })
              }}
            >
              {item.name}
            </div>
          ))}
        </Collapse.Panel>
        <Collapse.Panel
          key="locations"
          header={t('setup.reports.by-locations')}
        >
          {locations.map((item) => (
            <div
              key={item.id}
              className={classNames(
                styles.panelItem,
                meta.locations.includes(item.id) && styles.selected
              )}
              onClick={() => {
                const selected = [...meta.locations]
                const index = selected.indexOf(item.id)

                if (index === -1) {
                  selected.push(item.id)
                } else {
                  selected.splice(index, 1)
                }

                setMeta({ ...meta, locations: selected })
              }}
            >
              {item.name}
            </div>
          ))}
        </Collapse.Panel>
        <Collapse.Panel
          key="time-period"
          header={t('setup.reports.by-time-period')}
        >
          {Object.keys(rangeTypes).map(
            (item: 'monthly' | 'quarter' | 'yearly') => (
              <div
                key={item}
                className={classNames(
                  styles.panelItem,
                  meta.rangeType === item && styles.selected
                )}
                onClick={() =>
                  setMeta({
                    ...meta,
                    rangeType: item,
                  })
                }
              >
                {rangeTypes[item]}
              </div>
            )
          )}
        </Collapse.Panel>
        <Collapse.Panel key="date" header={t('setup.reports.by-date')}>
          {dateOptions.map((item) => (
            <div
              key={item.label}
              className={classNames(
                styles.panelItem,
                meta.endDate.getTime() === item.endDate.getTime() &&
                  styles.selected
              )}
              onClick={() => setMeta({ ...meta, endDate: item.endDate })}
            >
              {item.label}
            </div>
          ))}
        </Collapse.Panel>
      </Collapse>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={12}>
          <Button style={{ width: '100%' }} onClick={onClose}>
            {t('common-label-cancel')}
          </Button>
        </Col>
        <Col xs={12}>
          <Button
            type="primary"
            style={{ width: '100%' }}
            onClick={() => onChangeMeta(meta)}
          >
            {t('common-label-apply')}
          </Button>
        </Col>
      </Row>
    </Drawer>
  )
}
