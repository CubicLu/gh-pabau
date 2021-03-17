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
  padlocked?: string[]
  filter?: SchemaFilter
  company?: number
}

type DefaultFilterType = number | boolean

interface SchemaFilter {
  primary: {
    name: string
    type: FilterTypes
    default: number | boolean
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
  full?: string
  fullLower?: string
  short?: string
  shortLower?: string
  min?: number
  max?: number
  example?: string | number | any
  description?: string
  extra?: JSX.Element
  cssWidth?: string
  type?: FilterTypes
  defaultvalue?: string | number | boolean
  visible?: boolean
  required?: boolean
  radio?: TypeValues[]
  validateMsg?: string
  selectOptions?: TypeValues[]
  collapsible?: boolean
  filter?: SchemaFilter
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
