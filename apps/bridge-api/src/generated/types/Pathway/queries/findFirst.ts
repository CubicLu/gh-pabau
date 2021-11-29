import { queryField, list } from 'nexus'

export const PathwayFindFirstQuery = queryField('findFirstPathway', {
  type: 'Pathway',
  args: {
    where: 'PathwayWhereInput',
    orderBy: list('PathwayOrderByWithRelationInput'),
    cursor: 'PathwayWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PathwayScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathway.findFirst({
      ...args,
      ...select,
    })
  },
})
