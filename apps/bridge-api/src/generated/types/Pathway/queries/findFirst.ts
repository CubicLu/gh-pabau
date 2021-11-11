import { queryField, list } from 'nexus'

export const PathwayFindFirstQuery = queryField('findFirstPathway', {
  type: 'Pathway',
  args: {
    where: 'PathwayWhereInput',
    orderBy: list('PathwayOrderByWithRelationInput'),
    cursor: 'PathwayWhereUniqueInput',
    distinct: 'PathwayScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathway.findFirst({
      ...args,
      ...select,
    })
  },
})
