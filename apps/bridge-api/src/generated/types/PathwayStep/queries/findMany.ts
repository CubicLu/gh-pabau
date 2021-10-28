import { queryField, nonNull, list } from 'nexus'

export const PathwayStepFindManyQuery = queryField('findManyPathwayStep', {
  type: nonNull(list(nonNull('PathwayStep'))),
  args: {
    where: 'PathwayStepWhereInput',
    orderBy: list('PathwayStepOrderByWithRelationInput'),
    cursor: 'PathwayStepWhereUniqueInput',
    distinct: 'PathwayStepScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwayStep.findMany({
      ...args,
      ...select,
    })
  },
})
