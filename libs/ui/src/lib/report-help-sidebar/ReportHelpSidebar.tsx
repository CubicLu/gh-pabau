import React, { useContext, useEffect, useState } from 'react'
import styles from './ReportHelpSidebar.module.less'
import { useTranslation } from 'react-i18next'

import { Drawer } from 'antd'
/* eslint-disable-next-line */
export interface ReportHelpSidebarProps {
  visible: boolean
  placement?: 'right' | 'left'
  onClose?(): void
}

const ListManager = React.createContext({
  toggle(id) {
    this.selectedId = id
  },
  selectedId: -1,
})
const ListHost = ({ children }) => {
  const [selectedId, setSelectedId] = useState(-1)
  return (
    <ListManager.Provider
      value={{
        selectedId,
        toggle(id) {
          if (id === selectedId) {
            setSelectedId(-1)
          } else {
            setSelectedId(id)
          }
        },
      }}
    >
      <div className={styles.sidebar}>{children}</div>
    </ListManager.Provider>
  )
}

const ListHeader = ({ icon, title, pad = false, iconColor }) => {
  return (
    <h2
      className={styles.titles}
      style={{
        marginTop: pad ? '12px' : undefined,
      }}
    >
      <div style={{ backgroundColor: iconColor }} className={styles.icon}>
        {icon}
      </div>
      <span>{title}</span>
    </h2>
  )
}

const ListItem = ({ id, children, title }) => {
  const [open, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const { selectedId, toggle } = useContext(ListManager)
  const [contentSize, setContentSize] = useState(0)
  useEffect(() => {
    if (selectedId !== id) {
      setIsOpen(false)
      const timeout = setTimeout(() => {
        setIsRendered(false)
      }, 500)
      return () => clearTimeout(timeout)
    } else if (selectedId === id) {
      setIsRendered(true)
      setIsOpen(true)
    }
  }, [selectedId, id])
  return (
    <>
      <div
        className={styles.item}
        onClick={() => toggle(id)}
        style={{
          marginTop: selectedId === id ? '22px' : '5px',
        }}
      >
        <h3>{title}</h3>
        <div className={styles.icon}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {selectedId === id ? (
              <path
                d="M1.64048 9L2.51938 9C2.57915 9 2.6354 8.9707 2.67055 8.92266L5.99985 4.33359L9.32915 8.92266C9.3643 8.9707 9.42055 9 9.48032 9L10.3592 9C10.4354 9 10.4799 8.91328 10.4354 8.85117L6.30337 3.15469C6.15337 2.94844 5.84634 2.94844 5.69751 3.15469L1.56548 8.85117C1.51977 8.91328 1.5643 9 1.64048 9Z"
                fill="#9292A3"
              />
            ) : (
              <path
                d="M10.3595 3H9.48062C9.42085 3 9.3646 3.0293 9.32945 3.07734L6.00015 7.66641L2.67085 3.07734C2.6357 3.0293 2.57945 3 2.51968 3H1.64077C1.5646 3 1.52007 3.08672 1.5646 3.14883L5.69663 8.84531C5.84663 9.05156 6.15366 9.05156 6.30249 8.84531L10.4345 3.14883C10.4802 3.08672 10.4357 3 10.3595 3Z"
                fill="#9292A3"
              />
            )}
          </svg>
        </div>
      </div>
      {isRendered && (
        <div
          className={styles.content}
          style={{
            height:
              (open ? (contentSize === 0 ? 0 : contentSize + 10) : 0) + 'px',
          }}
        >
          <p
            ref={(el) => {
              setContentSize(el?.getBoundingClientRect().height || 0)
            }}
          >
            {children}
          </p>
        </div>
      )}
    </>
  )
}
export function ReportHelpSidebar(
  props: ReportHelpSidebarProps
): JSX.Element | null {
  const [isRendered, setIsRendered] = useState(false)
  useEffect(() => {
    if (props.visible) {
      setIsRendered(true)
      return () => void 0
    } else {
      const timeout = setTimeout(() => {
        setIsRendered(false)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [props.visible])
  return isRendered ? (
    <ReportHelpSidebarContent {...props}></ReportHelpSidebarContent>
  ) : null
}
export function ReportHelpSidebarContent(
  props: ReportHelpSidebarProps
): JSX.Element {
  const { t } = useTranslation('common')
  console.log(t('ui.report-help-sidebar.payroll-title'))
  return (
    <Drawer {...props} width={316} closable={false}>
      <ListHost>
        <ListHeader
          icon={'A'}
          title={t('ui.report-help-sidebar.payroll-title')}
          iconColor={'#54B2D3'}
        ></ListHeader>
        <ListItem
          id="0"
          title={t('ui.report-help-sidebar.payroll-team-commission-title')}
        >
          {t('ui.report-help-sidebar.payroll-team-commission-content')}
        </ListItem>
        <ListItem
          id="1"
          title={t('ui.report-help-sidebar.payroll-team-wages-title')}
        >
          {t('ui.report-help-sidebar.payroll-team-wages-content')}
        </ListItem>
        <ListHeader
          icon={'B'}
          title={'shifts'}
          pad
          iconColor={'#65CD98'}
        ></ListHeader>
        <ListItem
          id="2"
          title={t('ui.report-help-sidebar.shifts-days-worked-title')}
        >
          {t('ui.report-help-sidebar.shifts-days-worked-content')}
        </ListItem>
        <ListItem
          id="3"
          title={t('ui.report-help-sidebar.shifts-days-off-title')}
        >
          {t('ui.report-help-sidebar.shifts-days-off-content')}
        </ListItem>
        <ListHeader
          icon={'C'}
          title={t('ui.report-help-sidebar.performance-title')}
          pad
          iconColor={'#FAAD14'}
        ></ListHeader>
        <ListItem
          id="4"
          title={t('ui.report-help-sidebar.performance-services-title')}
        >
          {t('ui.report-help-sidebar.performance-services-content')}
        </ListItem>
        <ListItem
          id="5"
          title={t('ui.report-help-sidebar.performance-products-title')}
        >
          {t('ui.report-help-sidebar.performance-products-content')}
        </ListItem>
        <ListItem
          id="6"
          title={t('ui.report-help-sidebar.performance-packages-title')}
        >
          {t('ui.report-help-sidebar.performance-packages-content')}
        </ListItem>
        <ListItem
          id="7"
          title={t('ui.report-help-sidebar.performance-vouchers-title')}
        >
          {t('ui.report-help-sidebar.performance-vouchers-content')}
        </ListItem>
        <ListHeader
          icon={'D'}
          title={t('ui.report-help-sidebar.kpis-title')}
          pad
          iconColor={'#7B61E2'}
        ></ListHeader>
        <ListItem
          id="8"
          title={t('ui.report-help-sidebar.kpis-services-title')}
        >
          {t('ui.report-help-sidebar.kpis-services-content')}
        </ListItem>
        <ListItem
          id="9"
          title={t('ui.report-help-sidebar.kpis-products-title')}
        >
          {t('ui.report-help-sidebar.kpis-products-content')}
        </ListItem>
        <ListItem
          id="10"
          title={t('ui.report-help-sidebar.kpis-avg-bill-title')}
        >
          {t('ui.report-help-sidebar.kpis-avg-bill-content')}
        </ListItem>
        <ListItem
          id="11"
          title={t('ui.report-help-sidebar.kpis-client-visits-title')}
        >
          {t('ui.report-help-sidebar.kpis-client-visits-content')}
        </ListItem>
        <ListItem id="12" title={t('ui.report-help-sidebar.kpis-rebook-title')}>
          {t('ui.report-help-sidebar.kpis-rebook-content')}
        </ListItem>
        <ListItem
          id="13"
          title={t('ui.report-help-sidebar.kpis-utilization-title')}
        >
          {t('ui.report-help-sidebar.kpis-utilization-content')}
        </ListItem>
        <ListItem
          id="14"
          title={t('ui.report-help-sidebar.kpis-review-score-title')}
        >
          {t('ui.report-help-sidebar.kpis-review-score-content')}
        </ListItem>
        <ListItem
          id="15"
          title={t('ui.report-help-sidebar.kpis-care-factor-title')}
        >
          {t('ui.report-help-sidebar.kpis-care-factor-content')}
        </ListItem>
        <ListItem
          id="16"
          title={t('ui.report-help-sidebar.kpis-vouchers-title')}
        >
          {t('ui.report-help-sidebar.kpis-vouchers-content')}
        </ListItem>
      </ListHost>
    </Drawer>
  )
}

export default ReportHelpSidebar
