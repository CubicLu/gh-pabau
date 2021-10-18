import { objectType } from 'nexus'

export const ActivityType = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ActivityType',
  definition(t) {
    t.int('id')
    t.string('name')
    t.nullable.string('action')
    t.string('badge')
    t.int('order')
    t.int('company_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('Activity', {
      type: 'Activity',
      args: {
        where: 'ActivityWhereInput',
        orderBy: 'ActivityOrderByWithRelationInput',
        cursor: 'ActivityWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ActivityScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Activity
      },
    })
    t.nullable.field('_count', {
      type: 'ActivityTypeCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
