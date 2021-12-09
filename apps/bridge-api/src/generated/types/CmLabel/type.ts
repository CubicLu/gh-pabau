import { objectType } from 'nexus'

export const CmLabel = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmLabel',
  definition(t) {
    t.int('id')
    t.string('name')
    t.nullable.string('color')
    t.int('company_id')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('CmContactLabel', {
      type: 'CmContactLabel',
      args: {
        where: 'CmContactLabelWhereInput',
        orderBy: 'CmContactLabelOrderByWithRelationInput',
        cursor: 'CmContactLabelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactLabelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactLabel
      },
    })
    t.field('_count', {
      type: 'CmLabelCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
