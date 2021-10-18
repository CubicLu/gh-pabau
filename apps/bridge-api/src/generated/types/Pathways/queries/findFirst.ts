import { queryField, list } from 'nexus'

export const PathwaysFindFirstQuery = queryField('findFirstPathways', {
  type: 'Pathways',
  args: {
    where: 'PathwaysWhereInput',
    orderBy: list('PathwaysOrderByWithRelationInput'),
    cursor: 'PathwaysWhereUniqueInput',
    distinct: 'PathwaysScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathways.findFirst({
      ...args,
      ...select,
    })
  },
})
