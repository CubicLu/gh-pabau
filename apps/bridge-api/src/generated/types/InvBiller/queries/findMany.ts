import { queryField, nonNull, list } from 'nexus'

export const InvBillerFindManyQuery = queryField('findManyInvBiller', {
  type: nonNull(list(nonNull('InvBiller'))),
  args: {
    where: 'InvBillerWhereInput',
    orderBy: list('InvBillerOrderByInput'),
    cursor: 'InvBillerWhereUniqueInput',
    distinct: 'InvBillerScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invBiller.findMany({
      ...args,
      ...select,
    })
  },
})
