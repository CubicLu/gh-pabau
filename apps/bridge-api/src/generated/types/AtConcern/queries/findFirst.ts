import { queryField, list } from 'nexus'

export const AtConcernFindFirstQuery = queryField('findFirstAtConcern', {
  type: 'AtConcern',
  args: {
    where: 'AtConcernWhereInput',
    orderBy: list('AtConcernOrderByWithRelationInput'),
    cursor: 'AtConcernWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtConcernScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atConcern.findFirst({
      ...args,
      ...select,
    })
  },
})
