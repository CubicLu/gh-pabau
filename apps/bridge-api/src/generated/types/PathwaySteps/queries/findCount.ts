import { queryField, nonNull, list } from 'nexus'

export const PathwayStepsFindCountQuery = queryField(
  'findManyPathwayStepsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PathwayStepsWhereInput',
      orderBy: list('PathwayStepsOrderByWithRelationInput'),
      cursor: 'PathwayStepsWhereUniqueInput',
      distinct: 'PathwayStepsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwaySteps.count(args as any)
    },
  },
)
