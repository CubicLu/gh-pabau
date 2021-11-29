import { queryField, nonNull, list } from 'nexus'

export const InvBillerFindManyQuery = queryField('findManyInvBiller', {
  type: nonNull(list(nonNull('InvBiller'))),
  args: {
    where: 'InvBillerWhereInput',
    orderBy: list('InvBillerOrderByWithRelationInput'),
    cursor: 'InvBillerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvBillerScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invBiller.findMany({
      ...args,
      ...select,
    })
  },
})
