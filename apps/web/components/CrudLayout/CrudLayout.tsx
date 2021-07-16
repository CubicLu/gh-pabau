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
  getLastOrder?: DocumentNode
  isCustomOrder?: boolean
  isDependentField?: boolean
  displayColor?: boolean
  displayLock?: boolean
  isNestedQuery?: boolean
  isFilterNumber?: boolean
  isNotificationBannerOnData?: boolean
  requireAdminAccess?: boolean
  isCodeGen?: boolean
  deleteOnInactive?: boolean
  isHavingDefaultRecords?: boolean
}
const CrudLayout: FC<P> = ({ ...props }) => {
  const crudLayoutRef = useRef(null)
  return (
    <div ref={crudLayoutRef}>
      <Layout requireAdminAccess={props.requireAdminAccess}>
        <CrudTable {...props} crudLayoutRef={crudLayoutRef} />
      </Layout>
    </div>
  )
}

export default CrudLayout
