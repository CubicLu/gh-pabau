import { objectType } from 'nexus'

export const ServicesMasterCategory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ServicesMasterCategory',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('company_id')
    t.int('ord')
    t.field('type', { type: 'services_master_category_type' })
    t.string('image')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('ServiceCategory', {
      type: 'ServiceCategory',
      args: {
        where: 'ServiceCategoryWhereInput',
        orderBy: 'ServiceCategoryOrderByWithRelationInput',
        cursor: 'ServiceCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ServiceCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ServiceCategory
      },
    })
    t.list.field('InvCategory', {
      type: 'InvCategory',
      args: {
        where: 'InvCategoryWhereInput',
        orderBy: 'InvCategoryOrderByWithRelationInput',
        cursor: 'InvCategoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvCategoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvCategory
      },
    })
    t.field('_count', {
      type: 'ServicesMasterCategoryCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
