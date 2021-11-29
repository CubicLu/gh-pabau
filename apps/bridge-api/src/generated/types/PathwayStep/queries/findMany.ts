import { queryField, nonNull, list } from 'nexus'

export const PathwayStepFindManyQuery = queryField('findManyPathwayStep', {
  type: nonNull(list(nonNull('PathwayStep'))),
  args: {
    where: 'PathwayStepWhereInput',
    orderBy: list('PathwayStepOrderByWithRelationInput'),
    cursor: 'PathwayStepWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PathwayStepScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwayStep.findMany({
      ...args,
      ...select,
    })
  },
})
