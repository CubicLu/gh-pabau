import { queryField, nonNull, list } from 'nexus'

export const PathwayStepFindCountQuery = queryField(
  'findManyPathwayStepCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PathwayStepWhereInput',
      orderBy: list('PathwayStepOrderByWithRelationInput'),
      cursor: 'PathwayStepWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PathwayStepScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwayStep.count(args as any)
    },
  },
)
