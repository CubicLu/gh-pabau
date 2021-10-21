import { queryField, nonNull, list } from 'nexus'

export const PathwayStepFindCountQuery = queryField(
  'findManyPathwayStepCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PathwayStepWhereInput',
      orderBy: list('PathwayStepOrderByWithRelationInput'),
      cursor: 'PathwayStepWhereUniqueInput',
      distinct: 'PathwayStepScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwayStep.count(args as any)
    },
  },
)
