import { queryField, nonNull, list } from 'nexus'

export const AtConcernFindManyQuery = queryField('findManyAtConcern', {
  type: nonNull(list(nonNull('AtConcern'))),
  args: {
    where: 'AtConcernWhereInput',
    orderBy: list('AtConcernOrderByWithRelationInput'),
    cursor: 'AtConcernWhereUniqueInput',
    distinct: 'AtConcernScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atConcern.findMany({
      ...args,
      ...select,
    })
  },
})
