import { objectType } from 'nexus'

export const Pathways = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Pathways',
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
    t.list.field('PathwaySteps', {
      type: 'PathwaySteps',
      args: {
        where: 'PathwayStepsWhereInput',
        orderBy: 'PathwayStepsOrderByWithRelationInput',
        cursor: 'PathwayStepsWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwayStepsScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwaySteps
      },
    })
    t.nullable.field('_count', {
      type: 'PathwaysCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
