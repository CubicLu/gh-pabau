import { queryField, nonNull, list } from 'nexus'

export const InvProductFindCountQuery = queryField('findManyInvProductCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvProductWhereInput',
    orderBy: list('InvProductOrderByInput'),
    cursor: 'InvProductWhereUniqueInput',
    distinct: 'InvProductScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invProduct.count(args as any)
  },
})
