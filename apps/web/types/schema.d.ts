interface messages {
  create: { success: string; error: string }
  update: { success: string; error: string }
  delete: { success: string; error: string }
  dataIntegrity?: string
}
interface Schema {
  full: string
  fullLower?: string
  short: string
  shortLower?: string
  deleteBtnLabel?: string
  messages?: messages
  fields: Record<string, SchemaItem>
  shemaType?: string
  draggable?: boolean
  notification?: Record<NotificationItems>
  breadScrumbs?: array<BreadScrumb>
  createButtonLabel?: string
  createModalHeader?: string
  editModalHeader?: string
  deleteModalHeader?: string
  inboxButton?: boolean
  deleteDescField?: string
  tooltip?: string
  searchPlaceholder?: string
  padlocked?: string[]
  filter?: SchemaFilter
  company?: number | string
  dataIntegrity?: SchemaDataIntegrity
  showNotification?: SchemaShowNotification
  noDataBtnText?: string
  noDataText?: string
  disable?: DisabledFieldtype
  ordering?: SchemaOrder
}

interface SchemaOrder {
  name: string
  type: string
}

interface DisabledFieldtype {
  type: string | number | boolean
  conditionalField: string
  deleteable?: boolean
}

type DefaultFilterType = number | boolean

interface SchemaFilter {
  primary: {
    name: string
    type: FilterTypes
    default: boolean | number
    active: number | boolean
    inactive: number | boolean
  }
}

type FilterTypes =
  | 'string'
  | 'boolean'
  | 'number'
  | 'radio-group'
  | 'color-picker'
  | 'checkbox'
  | 'icon'
  | 'select'

interface SchemaDataIntegrity {
  name: string
  type: FilterTypes
  default: boolean | number | string
}

interface SchemaShowNotification {
  query: string
  list: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SchemaItem {
  full?: string
  fullLower?: string
  short?: string
  shortLower?: string
  min?: number
  max?: number
  placeholder?: string
  tooltip?: string
  description?: string
  extra?: JSX.Element
  cssWidth?: string
  type?:
    | 'string'
    | 'boolean'
    | 'number'
    | 'radio-group'
    | 'color-picker'
    | 'checkbox'
    | 'days-checkbox'
    | 'icon'
    | 'select'
    | 'time'
    | 'subjects'
  type?: FilterTypes
  defaultvalue?: string | number | boolean
  visible?: boolean
  required?: boolean
  radio?: TypeValues[]
  validateMsg?: string
  selectOptions?: TypeValues[]
  collapsible?: boolean
  col?: number
  filter?: SchemaFilter
  example?: string | number | any
  render?: (value: string | number, queryData) => JSX.Element
}

interface TypeValues {
  label: string
  value: string | number
}

interface NotificationItems {
  title: string
  description: string
  imgPath: string
  allowClose?: boolean
}

interface BreadScrumb {
  breadcrumbName: string
  path: string
}
