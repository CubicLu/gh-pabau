import { objectType } from 'nexus'

export const InventoryCount = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InventoryCount',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.nullable.int('staff_id')
    t.int('date_started')
    t.int('date_committed')
    t.int('date_completed')
    t.string('notes')
    t.string('count_type')
    t.string('count_name')
    t.string('status')
    t.string('counting_categories')
    t.nullable.int('location_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('Location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.Location
      },
    })
    t.list.field('InventoryDiscrepancy', {
      type: 'InventoryDiscrepancy',
      args: {
        where: 'InventoryDiscrepancyWhereInput',
        orderBy: 'InventoryDiscrepancyOrderByWithRelationInput',
        cursor: 'InventoryDiscrepancyWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InventoryDiscrepancyScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InventoryDiscrepancy
      },
    })
    t.nullable.field('_count', {
      type: 'InventoryCountCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
