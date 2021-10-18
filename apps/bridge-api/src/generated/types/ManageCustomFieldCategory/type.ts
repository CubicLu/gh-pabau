import { objectType } from 'nexus'

export const ManageCustomFieldCategory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ManageCustomFieldCategory',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('ManageCustomField', {
      type: 'ManageCustomField',
      args: {
        where: 'ManageCustomFieldWhereInput',
        orderBy: 'ManageCustomFieldOrderByWithRelationInput',
        cursor: 'ManageCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ManageCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ManageCustomField
      },
    })
    t.nullable.field('_count', {
      type: 'ManageCustomFieldCategoryCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
