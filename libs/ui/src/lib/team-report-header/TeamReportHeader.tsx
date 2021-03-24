import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './TeamReportHeader.module.less'
import { Popover, Space, Tooltip } from 'antd'
import { Checkbox, Avatar } from '@pabau/ui'
import {
  CloudDownloadOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  DownOutlined,
  LineChartOutlined,
  BarChartOutlined,
  AreaChartOutlined,
} from '@ant-design/icons'

export const rangeTypes = {
  monthly: 'Month',
  quater: 'Quater',
  yearly: 'Year',
}

export const serviceMarkers = [
  {
    marker: 'A',
    color: '#54B2D3',
  },
  {
    marker: 'B',
    color: '#65CD98',
  },
  {
    marker: 'C',
    color: '#FAAD14',
  },
  {
    marker: 'D',
    color: '#7B61E2',
  },
]

export interface TeamReportServiceGroup {
  name: string
  services?: TeamReportServiceGroup[]
  prefix?: string
  suffix?: string
}

export interface TeamReportEmployee {
  name: string
  src: string
}

export interface TeamReportServiceMeta {
  name: string
  chart: 'line' | 'column' | 'area'
  showTarget?: boolean
  prefix?: string
  suffix?: string
}

export interface TeamReportMeta {
  rangeType: 'monthly' | 'quater' | 'yearly'
  services: TeamReportServiceMeta[]
  employees: string[]
  year: string
  location: string
}

interface SelectedServiceType {
  name: string
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
          {item.name}
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

export interface TeamReportHeaderProps {
  meta: TeamReportMeta
  serviceGroups: TeamReportServiceGroup[]
  employees: TeamReportEmployee[]
  years: string[]
  locations: string[]
  onChangeMeta?: (meta: TeamReportMeta) => void
}

export const TeamReportHeader: FC<TeamReportHeaderProps> = ({
  serviceGroups,
  employees,
  years,
  locations,
  meta,
  onChangeMeta,
}) => {
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
        chart: serviceItem.chart ?? selected[index].chart,
        showTarget: serviceItem.showTarget ?? selected[index].showTarget,
      }
    }

    onChangeMeta?.({ ...meta, services: [...selected] })
  }

  const handleToggleEmployee = (employee: string) => {
    const selected = meta.employees
    const index = selected.indexOf(employee)

    if (index === -1) {
      selected.push(employee)
    } else {
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

  const handleToggleYear = (year: string) => {
    onChangeMeta?.({ ...meta, year })
  }

  const handleToggleLocation = (location: string) => {
    onChangeMeta?.({ ...meta, location })
  }

  return (
    <div className={styles.teamReportChartHeader}>
      <Space size={32}>
        {/* Show KPI list */}
        <div className={styles.services}>
          Showing
          {meta.services.map((service, index) => (
            <>
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
                              chart: 'area',
                            })
                          }
                        />
                      </Tooltip>
                    </div>
                    <div className={styles.showLabel}>Show</div>
                    <Checkbox
                      className={styles.showTarget}
                      checked={service.showTarget}
                      onChange={(e) =>
                        handleSetService({
                          name: service.name,
                          chart: service.chart,
                          showTarget: e.target.checked,
                        })
                      }
                    >
                      Target
                    </Checkbox>
                    {meta.services.length > 1 && (
                      <div
                        className={styles.removeMetric}
                        onClick={() => handleToggleService(service)}
                      >
                        Remove Metric
                      </div>
                    )}
                  </div>
                }
                trigger="hover"
                className={styles.selectService}
              >
                <span className={styles.service}>{service.name}</span>
              </Popover>
            </>
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
                Select All
              </Checkbox>
              // <div className={styles.selectServiceTitle}>Select service</div>
            }
            content={
              <div className={styles.selectServiceContent}>
                {serviceGroups.map((grp, index) => (
                  <div
                    className={styles.selectServiceGroup}
                    key={serviceMarkers[index].marker}
                  >
                    <div className={styles.groupTitle}>
                      <div
                        className={styles.marker}
                        style={{ background: serviceMarkers[index].color }}
                      >
                        {serviceMarkers[index].marker}
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
          at{' '}
          <Popover
            overlayClassName={styles.selectServicePopup}
            placement="bottomRight"
            title={
              <div className={styles.selectServiceTitle}>Select location</div>
            }
            content={
              <div className={styles.selectLocationContent}>
                <div
                  className={classNames(
                    styles.location,
                    meta.location === 'All Locations' && styles.selected
                  )}
                  onClick={() => handleToggleLocation('All Locations')}
                >
                  All Locations
                </div>
                {locations.map((location) => (
                  <div
                    className={classNames(
                      styles.location,
                      meta.location === location && styles.selected
                    )}
                    key={location}
                    onClick={() => handleToggleLocation(location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            }
            trigger="hover"
            className={styles.selectService}
          >
            <span className={styles.addLocation}>{meta.location}</span>
          </Popover>
        </div>

        {/* Show employees list */}
        <div className={styles.employees}>
          By{' '}
          <Popover
            overlayClassName={styles.selectServicePopup}
            placement="bottomRight"
            title={
              <div className={styles.selectServiceTitle}>
                Select an employee
              </div>
            }
            content={
              <div className={styles.selectEmployeeContent}>
                {employees.map((employee) => (
                  <div
                    className={classNames(
                      styles.employee,
                      meta.employees.includes(employee.name) && styles.selected
                    )}
                    key={employee.name}
                    onClick={() => handleToggleEmployee(employee.name)}
                  >
                    <Avatar
                      size={25}
                      src={employee.src}
                      className={styles.avatar}
                    />
                    <div className={styles.name}>{employee.name}</div>
                  </div>
                ))}
              </div>
            }
            trigger="hover"
            className={styles.selectService}
          >
            {employees.length === meta.employees.length ? (
              <span className={styles.addEmployee}>All</span>
            ) : (
              meta.employees.map((employee) => (
                <span className={styles.addEmployee} key={employee}>
                  {employee}
                </span>
              ))
            )}
          </Popover>
        </div>

        {/* Show years selection */}
        <div className={styles.years}>
          For{' '}
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
          of{' '}
          <Popover
            overlayClassName={styles.selectServicePopup}
            placement="bottomRight"
            title={
              <div className={styles.selectServiceTitle}>
                Select a{' '}
                {meta.rangeType === 'yearly'
                  ? 'Year'
                  : meta.rangeType === 'monthly'
                  ? 'Month'
                  : 'Quater'}
              </div>
            }
            content={
              <div className={styles.selectYearContent}>
                <div
                  className={classNames(
                    styles.year,
                    meta.year === 'All' && styles.selected
                  )}
                  onClick={() => handleToggleYear('All')}
                >
                  All
                </div>
                {years.map((year) => (
                  <div
                    className={classNames(
                      styles.year,
                      meta.year === year && styles.selected
                    )}
                    key={year}
                    onClick={() => handleToggleYear(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            }
            trigger="hover"
            className={styles.selectService}
          >
            <span className={styles.addYear}>{meta.year}</span>
          </Popover>
        </div>

        {/* Show action buttons */}
        <Space size={16} className={styles.actions}>
          <CloudDownloadOutlined className={styles.actionButton} />
          <SettingOutlined className={styles.actionButton} />
          <QuestionCircleOutlined className={styles.actionButton} />
        </Space>
      </Space>
    </div>
  )
}

export default TeamReportHeader
