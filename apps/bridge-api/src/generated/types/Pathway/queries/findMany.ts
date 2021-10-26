import { queryField, nonNull, list } from 'nexus'

export const PathwayFindManyQuery = queryField('findManyPathway', {
  type: nonNull(list(nonNull('Pathway'))),
  args: {
    where: 'PathwayWhereInput',
    orderBy: list('PathwayOrderByWithRelationInput'),
    cursor: 'PathwayWhereUniqueInput',
    distinct: 'PathwayScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathway.findMany({
      ...args,
      ...select,
    })
  },
})
