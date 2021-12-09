import { objectType } from 'nexus'

export const ServiceCategory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServiceCategory',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('company_id')
    t.int('category_product_id')
    t.int('cat_order')
    t.string('image')
    t.int('online_enabled')
    t.string('group_color')
    t.int('import_id')
    t.int('equipment_id')
    t.float('deposit_amount')
    t.int('tax_id')
    t.nullable.int('master_cat_id')
    t.int('company_position_id')
    t.nullable.field('ServicesMasterCategory', {
      type: 'ServicesMasterCategory',
      resolve(root: any) {
        return root.ServicesMasterCategory
      },
    })
    t.field('InvCategory', {
      type: 'InvCategory',
      resolve(root: any) {
        return root.InvCategory
      },
    })
    t.list.field('CompanyService', {
      type: 'CompanyService',
      args: {
        where: 'CompanyServiceWhereInput',
        orderBy: 'CompanyServiceOrderByWithRelationInput',
        cursor: 'CompanyServiceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyServiceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyService
      },
    })
    t.nullable.field('_count', {
      type: 'ServiceCategoryCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
