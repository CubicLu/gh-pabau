import { TeamReportMeta, TeamReportServiceGroup } from '@pabau/ui'

export const serviceItemFormatter = (
  valueString: number | string,
  prefix: string | undefined,
  suffix: string | undefined,
  targetString?: number | string
) => {
  const value = Number(valueString)
  const target = Number(targetString)
  const formattedValue = `${value < 0 ? '- ' : ''}${prefix || ''}${
    prefix
      ? Math.abs(Number(value)).toFixed(2)
      : Math.abs(Number(value)).toFixed(0)
  }${suffix || ''}`
  if (targetString === undefined) {
    return formattedValue
  } else {
    const formattedTarget = `${target < 0 ? '- ' : ''}${prefix || ''}${
      prefix
        ? Math.abs(Number(target)).toFixed(2)
        : Math.abs(Number(target)).toFixed(0)
    }${suffix || ''}`
    return {
      value: formattedValue,
      badge: Number(target) > Number(value) ? 'error' : 'success',
      Revenue: formattedValue,
      Target: formattedTarget,
    }
  }
}

export const getSortedDate = (dateStrings: string[]) => {
  return dateStrings
    .map((item) =>
      new Date(Number(item.slice(3, 7)), Number(item.slice(0, 2)) - 1).getTime()
    )
    .sort()
}

export const getFormattedDateLabel = (rangeType: string, date: Date) => {
  return rangeType === 'monthly'
    ? new Intl.DateTimeFormat('en-GB', {
        month: 'short',
        year: 'numeric',
      }).format(date)
    : rangeType === 'quarter'
    ? `Q${Math.ceil((date.getMonth() + 1) / 3)} ${date.getFullYear()}`
    : date.getFullYear().toString()
}

export const getDateRangeStart = (date: Date = new Date(), rangeType: string) =>
  new Date(
    date.getFullYear(),
    rangeType === 'monthly'
      ? date.getMonth()
      : rangeType === 'quarter'
      ? Math.floor(date.getMonth() / 3) * 3
      : 0,
    1
  )

export const findServiceFromGroup = (
  service: string,
  group: TeamReportServiceGroup
): TeamReportServiceGroup | null => {
  if (service === group.name) return group

  if (!group.services?.length) return null

  for (let i = 0; i < group.services.length; i++) {
    const res = findServiceFromGroup(service, group.services[i])
    if (res) {
      return res
    }
  }
  return null
}

export const makeServiceGroups = (
  servicesData: any,
  defaultServiceGroups: TeamReportServiceGroup[],
  parentGroup?: TeamReportServiceGroup
) => {
  if (
    !servicesData ||
    Array.isArray(servicesData) ||
    Object.keys(servicesData).length === 0
  ) {
    return undefined
  }
  return Object.keys(servicesData).map((service: any) => {
    const defaultGroup = defaultServiceGroups.find(
      (item) => item.name === service
    )
    const group: TeamReportServiceGroup = {
      name: service,
      prefix: parentGroup?.prefix,
      suffix: parentGroup?.suffix,
      ...defaultGroup,
    }
    const services = makeServiceGroups(
      servicesData[service].details || servicesData[service] || [],
      defaultGroup?.services || [],
      group
    )
    group.services = services

    return group
  })
}

export const serviceGroups: TeamReportServiceGroup[] = [
  {
    name: 'payroll',
    label: 'ui.report-help-sidebar.payroll-title',
    prefix: '£',
    services: [
      {
        name: 'commision',
        label: 'ui.report-help-sidebar.payroll-team-commission-title',
        prefix: '£',
      },
      {
        name: 'wages',
        label: 'ui.report-help-sidebar.payroll-team-wages-title',
        prefix: '£',
      },
    ],
    badge: 'A',
    color: '#54B2D3',
  },
  {
    name: 'shifts',
    label: 'ui.report-help-sidebar.shifts-title',
    services: [
      {
        name: 'days_worked',
        label: 'ui.report-help-sidebar.shifts-days-worked-title',
      },
      {
        name: 'days_off',
        label: 'ui.report-help-sidebar.shifts-days-off-title',
        services: [
          {
            name: 'others',
            label: 'ui.report-help-sidebar.shifts-others-title',
          },
          {
            name: 'holiday',
            label: 'ui.report-help-sidebar.shifts-holiday-title',
          },
          {
            name: 'sickness',
            label: 'ui.report-help-sidebar.shifts-sickness-title',
          },
        ],
      },
    ],
    badge: 'B',
    color: '#65CD98',
  },
  {
    name: 'performance',
    label: 'ui.report-help-sidebar.performance-title',
    prefix: '£',
    badge: 'C',
    color: '#FAAD14',
    services: [
      {
        name: 'services',
        label: 'ui.report-help-sidebar.performance-services-title',
        prefix: '£',
      },
      {
        name: 'products',
        label: 'ui.report-help-sidebar.performance-products-title',
        prefix: '£',
      },
      {
        name: 'packages',
        label: 'ui.report-help-sidebar.performance-packages-title',
        prefix: '£',
      },
      {
        name: 'accounts',
        label: 'ui.report-help-sidebar.performance-accounts-title',
        prefix: '£',
      },
      {
        name: 'retails',
        label: 'ui.report-help-sidebar.performance-retails-title',
        prefix: '£',
      },
      {
        name: 'vouchers',
        label: 'ui.report-help-sidebar.performance-vouchers-title',
        prefix: '£',
      },
    ],
  },
  {
    name: 'kpi',
    label: 'ui.report-help-sidebar.kpis-title',
    badge: 'D',
    color: '#7B61E2',
    services: [
      {
        name: 'kpi_services',
        label: 'ui.report-help-sidebar.kpis-services-title',
      },
      {
        name: 'Products',
      },
      {
        name: 'kpi_retails',
        label: 'ui.report-help-sidebar.kpis-retails-title',
      },
      {
        name: 'kpi_accounts',
        label: 'ui.report-help-sidebar.kpis-accounts-title',
      },
      {
        name: 'kpi_packages',
        label: 'ui.report-help-sidebar.kpis-packages-title',
      },
      {
        name: 'kpi_vouchers',
        label: 'ui.report-help-sidebar.kpis-vouchers-title',
      },
      { name: 'Avg Bill (per visit)', prefix: '£' },
      {
        name: 'avg_per_user',
        label: 'ui.report-help-sidebar.kpis-avg-per-user-title',
        prefix: '£',
      },
      {
        name: 'client_visits',
        label: 'ui.report-help-sidebar.kpis-client-visits-title',
        services: [
          {
            name: 'new_clients',
            label: 'ui.report-help-sidebar.kpis-new-clients-title',
          },
          {
            name: 'existing_clients',
            label: 'ui.report-help-sidebar.kpis-existing-clients-title',
          },
          {
            name: 'walking',
            label: 'ui.report-help-sidebar.kpis-walking-title',
          },
        ],
      },
      {
        name: 'clients_rebook',
        label: 'ui.report-help-sidebar.kpis-rebook-title',
        suffix: '%',
      },
      {
        name: 'utilization',
        label: 'ui.report-help-sidebar.kpis-utilization-title',
        suffix: '%',
      },
      {
        name: 'reviews',
        label: 'ui.report-help-sidebar.kpis-review-score-title',
        services: [
          {
            name: 'review_5',
            label: 'ui.report-help-sidebar.kpis-review-5-title',
          },
          {
            name: 'review_4',
            label: 'ui.report-help-sidebar.kpis-review-4-title',
          },
          {
            name: 'review_3',
            label: 'ui.report-help-sidebar.kpis-review-3-title',
          },
          {
            name: 'review_2',
            label: 'ui.report-help-sidebar.kpis-review-2-title',
          },
          {
            name: 'review_1',
            label: 'ui.report-help-sidebar.kpis-review-1-title',
          },
        ],
      },
      { name: 'Care Factor' },
    ],
  },
]

export const mockColorData = [
  '#54B2D3',
  '#65CD98',
  '#FAAD14',
  '#7B61E2',
  '#54B2A3',
  '#45DD98',
  '#FA0D14',
  '#7BF1E2',
  '#5402D3',
  '#657D98',
  '#FA3D14',
  '#7B14E2',
  '#54B2A3',
  '#65CDF8',
  '#FAADF4',
  '#7B6122',
]

export const meta: TeamReportMeta = {
  rangeType: 'monthly',
  services: [
    {
      name: 'commision',
      label: 'ui.report-help-sidebar.payroll-team-commission-title',
      chart: 'line',
      prefix: '£',
    },
    {
      name: 'days_worked',
      label: 'ui.report-help-sidebar.shifts-days-worked-title',
      chart: 'line',
    },
  ],
  employees: [],
  locations: [],
}
