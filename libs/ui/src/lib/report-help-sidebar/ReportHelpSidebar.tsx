import { TeamReportServiceGroup } from '@pabau/ui'
import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ReportHelpSidebar.module.less'

/* eslint-disable-next-line */
export interface ReportHelpSidebarProps {
  visible: boolean
  serviceGroups: TeamReportServiceGroup[]
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

  return (
    <>
      <div
        className={styles.item}
        onClick={() => children && setIsOpen(!open)}
        style={{ marginTop: 5 }}
      >
        <h3>{title}</h3>
        {children && (
          <div className={styles.icon}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {open ? (
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
        )}
      </div>
      {open && <div className={styles.content}>{children}</div>}
    </>
  )
}

interface ServiceMenuItemProps {
  item: TeamReportServiceGroup
  depth?: number
}
const ServiceMenuItem = ({ item, depth = 0 }: ServiceMenuItemProps) => {
  const { t } = useTranslation('common')

  return (
    <div style={{ marginLeft: depth ? 16 : 0 }}>
      <ListItem id={item.name} title={item.label ? t(item.label) : item.name}>
        {item.services
          ? item.services.map((child, index) => (
              <ServiceMenuItem
                key={child.name}
                item={child}
                depth={depth + 1}
              />
            ))
          : null}
      </ListItem>
    </div>
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
  const { serviceGroups } = props

  return (
    <Drawer {...props} width={316} closable={false}>
      <ListHost>
        {serviceGroups.map((grp, index) => (
          <React.Fragment key={index}>
            <ListHeader
              icon={grp.badge}
              title={grp.label ? t(grp.label) : grp.name}
              iconColor={grp.color}
              pad
            ></ListHeader>
            {grp.services?.map((child, childIndex) => (
              <ServiceMenuItem key={child.name} item={child} />
            ))}
          </React.Fragment>
        ))}
      </ListHost>
    </Drawer>
  )
}

export default ReportHelpSidebar
