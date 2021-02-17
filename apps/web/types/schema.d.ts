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
  notification?: Record<NotificationItems>,
  breadScrumbs?: array<BreadScrumb>
}
interface SchemaItem {
  full?: string
  fullLower?: string
  short?: string
  shortLower?: string
  min?: number
  example?: string | number
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
  | 'icon'
  | 'select'
  defaultvalue?: string | number | boolean
  visible?: boolean
  required?: boolean
  radio?: TypeValues[]
  selectOptions?: TypeValues[]
}

interface TypeValues {
  label: string
  value: string
}

interface NotificationItems {
  title: string,
  description: string,
  imgPath: string,
  allowClose?: boolean
}

interface BreadScrumb {
  breadcrumbName: string,
  path: string,
}