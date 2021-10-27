import { queryField, list } from 'nexus'

export const PathwayStepFindFirstQuery = queryField('findFirstPathwayStep', {
  type: 'PathwayStep',
  args: {
    where: 'PathwayStepWhereInput',
    orderBy: list('PathwayStepOrderByWithRelationInput'),
    cursor: 'PathwayStepWhereUniqueInput',
    distinct: 'PathwayStepScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwayStep.findFirst({
      ...args,
      ...select,
    })
  },
})
