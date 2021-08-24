import {
  AreaChartOutlined,
  BarChartOutlined,
  CloudDownloadOutlined,
  DownOutlined,
  LineChartOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Avatar, Checkbox } from '@pabau/ui'
import { Popover, Space, Tooltip } from 'antd'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './TeamReportHeader.module.less'

export const serviceItemFormatter = (
  value: number | string,
  prefix: string | undefined,
  suffix: string | undefined
): string => {
  return `${value < 0 ? '- ' : ''}${prefix || ''}${
    prefix || suffix
      ? Math.abs(Number(value)).toFixed(2)
      : Math.abs(Number(value)).toFixed(0)
  }${suffix || ''}`
}

export const rangeTypes = {
  monthly: 'Month',
  quarter: 'Quarter',
  yearly: 'Year',
}

export interface TeamReportServiceGroup {
  name: string // will be like "shifts-days_off-day_off"
  // field: string // will be like "day_off"
  label?: string // will be like "Day Off"
  services?: TeamReportServiceGroup[] // children
  prefix?: string // will be like "£"
  suffix?: string // will be like "K" or "M"
  badge?: string // will be like "A" or "B", "C", "D"
  color?: string // will be colors for those badges
}

export interface TeamReportEmployee {
  id: string
  name: string
  src: string
}

export interface TeamReportServiceMeta {
  name: string
  label?: string
  chart: 'line' | 'column' | 'area'
  showTarget?: boolean
  prefix?: string
  suffix?: string
}

export interface TeamReportDate {
  label: string
  endDate: Date
}

export interface TeamReportLocation {
  id: number
  name: string
}

export interface TeamReportMeta {
  rangeType: 'monthly' | 'quarter' | 'yearly'
  services: TeamReportServiceMeta[]
  employees: string[]
  endDate?: Date
  locations: number[]
}

interface SelectedServiceType {
  name: string
  label?: string
  selected: 'selected' | 'indeterminate' | 'unselected'
  services?: SelectedServiceType[]
}

const getSelectedServices = (
  grps: TeamReportServiceGroup[],
  services: TeamReportServiceMeta[]
): SelectedServiceType[] => {
  return grps.map((item) => {
    if (item.services) {
      const selected = getSelectedServices(item.services, services)
      return {
        name: item.name,
        label: item.label,
        selected: selected.find(
          (item) =>
            item.selected === 'indeterminate' || item.selected === 'unselected'
        )
          ? selected.find(
              (item) =>
                item.selected === 'selected' ||
                item.selected === 'indeterminate'
            )
            ? 'indeterminate'
            : 'unselected'
          : 'selected',
        services: selected,
      }
    } else {
      return {
        name: item.name,
        label: item.label,
        selected: services.find((service) => service.name === item.name)
          ? 'selected'
          : 'unselected',
      }
    }
  })
}

interface ServiceMenuItemProps {
  item: TeamReportServiceGroup
  depth?: number
  services: TeamReportServiceMeta[]
  selected?: SelectedServiceType
  onToggle: (item: TeamReportServiceGroup) => void
}
const ServiceMenuItem = ({
  item,
  depth = 0,
  services,
  selected,
  onToggle,
}: ServiceMenuItemProps) => {
  const { t } = useTranslation('common')
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={styles.selectServiceGroup}
      style={{ marginLeft: depth ? 16 : 0 }}
    >
      <div
        className={styles.serviceGroupTitle}
        onClick={() => setExpanded(!expanded)}
      >
        <Checkbox
          className={styles.selectService}
          checked={selected?.selected === 'selected'}
          indeterminate={selected?.selected === 'indeterminate'}
          onChange={(checked) => onToggle(item)}
          disabled={
            services.find((service) => service.name === item.name) &&
            services.length <= 1
          }
        >
          {item.label ? t(item.label) : item.name}
        </Checkbox>
        {item.services && (
          <div
            className={classNames(styles.expander, expanded && styles.expanded)}
          >
            <DownOutlined />
          </div>
        )}
      </div>
      {item.services &&
        expanded &&
        item.services.map((child, index) => (
          <ServiceMenuItem
            key={child.name}
            item={child}
            depth={depth + 1}
            services={services}
            selected={selected?.services?.[index]}
            onToggle={onToggle}
          />
        ))}
    </div>
  )
}

interface EmployerPanelProps {
  employees: TeamReportEmployee[]
  meta: TeamReportMeta
  handleToggleEmployee: (name: string) => void
}
const EmployerPanel = ({
  employees,
  meta,
  handleToggleEmployee,
}: EmployerPanelProps) => {
  const { t } = useTranslation('common')

  return (
    <Popover
      overlayClassName={styles.selectServicePopup}
      placement="bottomRight"
      title={
        <div className={styles.selectServiceTitle}>
          {t('setup.reports.select-employee')}
        </div>
      }
      content={
        <div className={styles.selectEmployeeContent}>
          {employees.map((employee) => (
            <div
              className={classNames(
                styles.employee,
                meta.employees.includes(employee.id) && styles.selected
              )}
              key={employee.id}
              onClick={() => handleToggleEmployee(employee.id)}
            >
              <Avatar size={25} src={employee.src} className={styles.avatar} />
              <div className={styles.name}>{employee.name}</div>
            </div>
          ))}
        </div>
      }
      trigger="hover"
      className={styles.selectService}
    >
      {employees.length === meta.employees.length ? (
        <span className={styles.addEmployee}>
          {t('setup.reports.all-team')}
        </span>
      ) : (
        <span>
          {(meta.employees.length > 3
            ? meta.employees.slice(0, 2)
            : meta.employees
          ).map((employee, index) => (
            <React.Fragment key={index}>
              {index > 0 && ','}
              <span className={styles.addEmployee} key={employee}>
                {employees.find((item) => item.id === employee)?.name}
              </span>
            </React.Fragment>
          ))}
          {meta.employees.length > 3 && (
            <React.Fragment>
              ,
              <span className={styles.addEmployee} key={'others'}>
                and {meta.employees.length - 2} others
              </span>
            </React.Fragment>
          )}
        </span>
      )}
    </Popover>
  )
}

export interface TeamReportHeaderProps {
  meta: TeamReportMeta
  serviceGroups: TeamReportServiceGroup[]
  employees: TeamReportEmployee[]
  dateOptions: TeamReportDate[]
  locations: TeamReportLocation[]
  hideKpiList?: boolean
  onChangeMeta?: (meta: TeamReportMeta) => void
  onDownload?: VoidFunction
  onSettings?: VoidFunction
  onHelp?: VoidFunction
}

export const TeamReportHeader: FC<TeamReportHeaderProps> = ({
  serviceGroups,
  employees,
  dateOptions,
  locations,
  meta,
  hideKpiList,
  onChangeMeta,
  onDownload,
  onSettings,
  onHelp,
}) => {
  const { t } = useTranslation('common')
  const [selectedServices, setSelectedServices] = useState<
    SelectedServiceType[]
  >([])

  useEffect(() => {
    setSelectedServices(getSelectedServices(serviceGroups, meta.services))
  }, [serviceGroups, meta.services])

  const handleToggleService = (service?: TeamReportServiceGroup) => {
    if (!service) {
      // TODO: Connect with back-end
      // if (
      //   selectedServices.find(
      //     (item) =>
      //       item.selected === 'indeterminate' || item.selected === 'unselected'
      //   )
      // ) {
      //   setSelectedServices(
      //     selectedServices.map((grp) => ({
      //       selected: 'selected',
      //       name: grp.name,
      //     }))
      //   )
      // } else {
      //   setSelectedServices(
      //     selectedServices.map((grp, index) => ({
      //       selected: index === 0 ? 'selected' : 'unselected',
      //       name: grp.name,
      //     }))
      //   )
      // }
    } else if (service.services?.length) {
      // TODO: Connect with back-end
      // setSelectedServices(
      //   serviceGroups.map((grp) => ({ selected: 'selected', name: grp.name }))
      // )
    } else {
      const selected = meta.services
      const index = selected.findIndex((item) => item.name === service?.name)

      if (index === -1) {
        selected.push({
          name: service?.name || '',
          label: service?.label,
          chart: 'line',
          prefix: service?.prefix,
          suffix: service?.suffix,
        })
      } else {
        selected.splice(index, 1)
      }

      onChangeMeta?.({ ...meta, services: [...selected] })
    }
  }

  const handleSetService = (serviceItem: TeamReportServiceMeta) => {
    const selected = meta.services
    const index = selected.findIndex((item) => item.name === serviceItem.name)

    if (index !== -1) {
      selected[index] = {
        name: serviceItem.name,
        label: serviceItem.label,
        chart: serviceItem.chart ?? selected[index].chart,
        showTarget: serviceItem.showTarget ?? selected[index].showTarget,
      }
    }

    onChangeMeta?.({ ...meta, services: [...selected] })
  }

  const handleToggleEmployee = (employee: string) => {
    const selected = [...meta.employees]
    const index = selected.indexOf(employee)

    if (index === -1) {
      selected.push(employee)
    } else if (selected.length > 1) {
      selected.splice(index, 1)
    }

    onChangeMeta?.({ ...meta, employees: selected })
  }

  const handleToggleRangeType = (rangeType) => {
    onChangeMeta?.({
      ...meta,
      rangeType,
    })
  }

  const handleToggleEndDate = (endDate?: Date) => {
    onChangeMeta?.({ ...meta, endDate })
  }

  const handleToggleLocation = (location: TeamReportLocation) => {
    if (location.id === 0) {
      // if All locations is selected
      onChangeMeta?.({ ...meta, locations: [0] })
    } else {
      const selected = [...meta.locations]
      const index = selected.indexOf(location.id)

      if (index === -1) {
        selected.push(location.id)
      } else if (selected.length > 1) {
        selected.splice(index, 1)
      }

      onChangeMeta?.({ ...meta, locations: selected })
    }
  }

  return (
    <div className={styles.teamReportChartHeader}>
      <Space size={32}>
        {/* Show KPI list */}
        <div className={styles.services}>
          {t('setup.reports.showing')}
          {!hideKpiList ? (
            <>
              {meta.services.map((service, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span style={{ marginLeft: 6 }}>and</span>}
                  <Popover
                    overlayClassName={styles.selectServicePopup}
                    placement="bottom"
                    content={
                      <div className={styles.selectServiceChartContent}>
                        <div className={styles.selectChartType}>
                          <Tooltip title="Line" placement="top">
                            <LineChartOutlined
                              className={classNames(
                                service.chart !== 'line' && styles.disabled
                              )}
                              onClick={() =>
                                handleSetService({
                                  name: service.name,
                                  label: service.label,
                                  chart: 'line',
                                })
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Bar" placement="top">
                            <BarChartOutlined
                              className={classNames(
                                service.chart !== 'column' && styles.disabled
                              )}
                              onClick={() =>
                                handleSetService({
                                  name: service.name,
                                  label: service.label,
                                  chart: 'column',
                                })
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Area" placement="top">
                            <AreaChartOutlined
                              className={classNames(
                                service.chart !== 'area' && styles.disabled
                              )}
                              onClick={() =>
                                handleSetService({
                                  name: service.name,
                                  label: service.label,
                                  chart: 'area',
                                })
                              }
                            />
                          </Tooltip>
                        </div>
                        <div className={styles.showLabel}>
                          {t('setup.reports.show')}
                        </div>
                        <Checkbox
                          className={styles.showTarget}
                          checked={service.showTarget}
                          onChange={(e) =>
                            handleSetService({
                              name: service.name,
                              label: service.label,
                              chart: service.chart,
                              showTarget: e.target.checked,
                            })
                          }
                        >
                          {t('setup.reports.target')}
                        </Checkbox>
                        {meta.services.length > 1 && (
                          <div
                            className={styles.removeMetric}
                            onClick={() => handleToggleService(service)}
                          >
                            {t('setup.reports.remove-metric')}
                          </div>
                        )}
                      </div>
                    }
                    trigger="hover"
                    className={styles.selectService}
                  >
                    <span className={styles.service}>
                      {service.label ? t(service.label) : service.name}
                    </span>
                  </Popover>
                </React.Fragment>
              ))}
              <Popover
                overlayClassName={styles.selectServicePopup}
                placement="bottomRight"
                title={
                  <Checkbox
                    className={styles.selectService}
                    checked={
                      !selectedServices.find(
                        (item) =>
                          item.selected === 'indeterminate' ||
                          item.selected === 'unselected'
                      )
                    }
                    indeterminate={
                      !!selectedServices.find(
                        (item) =>
                          item.selected === 'selected' ||
                          item.selected === 'indeterminate'
                      )
                    }
                    onChange={(checked) => handleToggleService()}
                  >
                    {t('setup.reports.select-all')}
                  </Checkbox>
                  // <div className={styles.selectServiceTitle}>Select service</div>
                }
                content={
                  <div className={styles.selectServiceContent}>
                    {serviceGroups.map((grp, index) => (
                      <div
                        className={styles.selectServiceGroup}
                        key={grp.badge}
                      >
                        <div className={styles.groupTitle}>
                          <div
                            className={styles.marker}
                            style={{ background: grp.color }}
                          >
                            {grp.badge}
                          </div>
                          {grp.name}
                        </div>
                        {grp.services?.map((child, childIndex) => (
                          <ServiceMenuItem
                            key={child.name}
                            item={child}
                            services={meta.services}
                            onToggle={handleToggleService}
                            selected={
                              selectedServices[index]?.services?.[childIndex]
                            }
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                }
                trigger="hover"
                className={styles.selectService}
              >
                <PlusCircleOutlined className={styles.addService} />
              </Popover>{' '}
            </>
          ) : (
            <div
              className={styles.employees}
              style={{ display: 'inline-block', marginRight: 6 }}
            >
              <EmployerPanel
                employees={employees}
                meta={meta}
                handleToggleEmployee={handleToggleEmployee}
              />
            </div>
          )}
          {t('setup.reports.at')}{' '}
          <Popover
            overlayClassName={styles.selectServicePopup}
            placement="bottomRight"
            title={
              <div className={styles.selectServiceTitle}>
                {t('setup.reports.all-locations')}
              </div>
            }
            content={
              <div className={styles.selectLocationContent}>
                {locations.map((location) => (
                  <div
                    className={classNames(
                      styles.location,
                      meta.locations.includes(location.id) && styles.selected
                    )}
                    key={location.id}
                    onClick={() => handleToggleLocation(location)}
                  >
                    {location.name}
                  </div>
                ))}
              </div>
            }
            trigger="hover"
            className={styles.selectService}
          >
            {locations.length === meta.locations.length ? (
              <span className={styles.addLocation}>
                {t('setup.reports.all-locations')}
              </span>
            ) : (
              <span>
                {(meta.locations.length > 3
                  ? meta.locations.slice(0, 2)
                  : meta.locations
                ).map((location, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ','}
                    <span className={styles.addLocation} key={location}>
                      {locations.find((item) => item.id === location)?.name}
                    </span>
                  </React.Fragment>
                ))}
                {meta.locations.length > 3 && (
                  <React.Fragment>
                    ,
                    <span className={styles.addLocation} key={'others'}>
                      and {meta.locations.length - 2} others
                    </span>
                  </React.Fragment>
                )}
              </span>
            )}
          </Popover>
        </div>

        {/* Show employees list */}
        {!hideKpiList && (
          <div className={styles.employees}>
            {t('setup.reports.by')}{' '}
            <EmployerPanel
              employees={employees}
              meta={meta}
              handleToggleEmployee={handleToggleEmployee}
            />
          </div>
        )}

        {/* Show years selection */}
        <div className={styles.years}>
          {t('setup.reports.for')}{' '}
          <Popover
            overlayClassName={styles.selectServicePopup}
            placement="bottomRight"
            content={
              <div className={styles.selectYearContent}>
                {Object.keys(rangeTypes).map((type) => (
                  <div
                    className={classNames(
                      styles.rangeType,
                      meta.rangeType === type && styles.selected
                    )}
                    key={type}
                    onClick={() => handleToggleRangeType(type)}
                  >
                    {rangeTypes[type]}
                  </div>
                ))}
              </div>
            }
            trigger="hover"
            className={styles.selectService}
          >
            <span className={styles.addYear}>{rangeTypes[meta.rangeType]}</span>
          </Popover>{' '}
          {t('setup.reports.of')}{' '}
          <Popover
            overlayClassName={styles.selectServicePopup}
            placement="bottomRight"
            title={
              <div className={styles.selectServiceTitle}>
                {t('setup.reports.select-range-type')}{' '}
                {meta.rangeType === 'yearly'
                  ? 'Year'
                  : meta.rangeType === 'monthly'
                  ? 'Month'
                  : 'Quarter'}
              </div>
            }
            content={
              <div className={styles.selectYearContent}>
                <div
                  className={classNames(
                    styles.year,
                    !meta.endDate && styles.selected
                  )}
                  onClick={() => handleToggleEndDate(undefined)}
                >
                  {t('setup.reports.all')}
                </div>
                {dateOptions.map((dateItem) => (
                  <div
                    className={classNames(
                      styles.year,
                      meta.endDate &&
                        meta.endDate.getTime() === dateItem.endDate.getTime() &&
                        styles.selected
                    )}
                    key={dateItem.label}
                    onClick={() => handleToggleEndDate(dateItem.endDate)}
                  >
                    {dateItem.label}
                  </div>
                ))}
              </div>
            }
            trigger="hover"
            className={styles.selectService}
          >
            <span className={styles.addYear}>
              {!meta.endDate
                ? 'All'
                : dateOptions.find(
                    (dateItem) =>
                      meta.endDate &&
                      meta.endDate.getTime() === dateItem.endDate.getTime()
                  )?.label || ''}
            </span>
          </Popover>
        </div>

        {/* Show action buttons */}
        <Space size={16} className={styles.actions}>
          <Tooltip
            title={
              onDownload
                ? t('setup.reports.download')
                : t('setup.reports.coming-soon')
            }
            placement="top"
          >
            <CloudDownloadOutlined
              className={styles.actionButton}
              onClick={onDownload}
            />
          </Tooltip>
          <Tooltip
            title={
              onSettings
                ? t('setup.reports.settings')
                : t('setup.reports.coming-soon')
            }
            placement="top"
          >
            <SettingOutlined
              className={styles.actionButton}
              onClick={onSettings}
            />
          </Tooltip>
          <Tooltip
            title={
              onHelp ? t('setup.reports.help') : t('setup.reports.coming-soon')
            }
            placement="top"
          >
            <QuestionCircleOutlined
              className={styles.actionButton}
              onClick={onHelp}
            />
          </Tooltip>
        </Space>
      </Space>
    </div>
  )
}

export default TeamReportHeader
