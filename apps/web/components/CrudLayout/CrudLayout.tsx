import { DocumentNode } from '@apollo/client'
import { FC, useRef } from 'react'
import CrudTable from '../CrudTable'
import Layout from '../Layout/Layout'

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
  editPage?: boolean
  editPageRouteLink?: string
  isCustomFilter?: boolean
  customFilter?: () => JSX.Element
  setEditPage?(e): void
  draggable?: boolean
  requireAdminAccess?: boolean
}
const CrudLayout: FC<P> = ({ ...props }) => {
  const crudLayoutRef = useRef(null)
  return (
    <div ref={crudLayoutRef}>
      <Layout {...props}>
        <CrudTable {...props} crudLayoutRef={crudLayoutRef} />
      </Layout>
    </div>
  )
}

export default CrudLayout
