import { queryField, list } from 'nexus'

export const PathwayStepFindFirstQuery = queryField('findFirstPathwayStep', {
  type: 'PathwayStep',
  args: {
    where: 'PathwayStepWhereInput',
    orderBy: list('PathwayStepOrderByWithRelationInput'),
    cursor: 'PathwayStepWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PathwayStepScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwayStep.findFirst({
      ...args,
      ...select,
    })
  },
})
