import { queryField, list } from 'nexus'

export const AtConcernFindFirstQuery = queryField('findFirstAtConcern', {
  type: 'AtConcern',
  args: {
    where: 'AtConcernWhereInput',
    orderBy: list('AtConcernOrderByInput'),
    cursor: 'AtConcernWhereUniqueInput',
    distinct: 'AtConcernScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atConcern.findFirst({
      ...args,
      ...select,
    })
  },
})
