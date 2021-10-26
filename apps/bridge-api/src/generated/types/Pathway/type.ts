import { objectType } from 'nexus'

export const Pathway = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Pathway',
  definition(t) {
    t.int('id')
    t.string('pathway_name')
    t.int('company_id')
    t.string('description')
    t.boolean('is_active')
    t.nullable.int('order')
    t.list.field('PathwayTaken', {
      type: 'PathwaysTaken',
      args: {
        where: 'PathwaysTakenWhereInput',
        orderBy: 'PathwaysTakenOrderByWithRelationInput',
        cursor: 'PathwaysTakenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwaysTakenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwayTaken
      },
    })
    t.list.field('PathwayStep', {
      type: 'PathwayStep',
      args: {
        where: 'PathwayStepWhereInput',
        orderBy: 'PathwayStepOrderByWithRelationInput',
        cursor: 'PathwayStepWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwayStepScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwayStep
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('_count', {
      type: 'PathwayCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
