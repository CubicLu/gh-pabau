interface messages {
  create: { success: string; error: string }
  update: { success: string; error: string }
  delete: { success: string; error: string }
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
  createButtonLabel?: string
  padlocked?: string[]
  filter?: SchemaFilter
  company?: number | string
}

type DefaultFilterType = number | boolean

interface SchemaFilter {
  primary: {
    name: string
    type: FilterTypes
    default: boolean
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

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SchemaItem {
  render?(
    value?: unknown,
    values?: unknown,
    row?: number
  ): React.ReactNode | JSX.Element
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
}
interface TypeValues {
  label: string
  value: string
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
