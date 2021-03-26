import { FC } from 'react'
import { DocumentNode } from '@apollo/client'
import CrudTable from '../CrudTable'
import { SpotlightButtonsProps } from '@pabau/ui'

interface P {
  schema: Schema
  addQuery?: DocumentNode
  deleteQuery?: DocumentNode
  listQuery: DocumentNode
  editQuery: DocumentNode
  aggregateQuery?: DocumentNode
  tableSearch?: boolean
  updateOrderQuery?: DocumentNode
  showNotificationBanner?: boolean
  createPage?: boolean
  notificationBanner?: React.ReactNode
  createPageOnClick?(): void
  addFilter?: boolean
  needTranslation?: boolean
  spotlightButtons?: SpotlightButtonsProps
  actions?: {
    name: string
    render?(value?: unknown, values?: unknown, row?: number): JSX.Element
    visible?: boolean
    title?: string
    width?: string
    value: unknown
  }[]
  allowReorder?: boolean
  allowRowEditing?: boolean
  onCreateNew?: () => boolean
  editPage?: boolean
  editPageRouteLink?: string
  onRowClick?(e: unknown): void
  isCustomFilter?: boolean
  customFilter?: () => JSX.Element
  setEditPage?(e): void
  draggable?: boolean
}

const CrudLayout: FC<P> = ({ ...props }) => <CrudTable {...props} />

export default CrudLayout
