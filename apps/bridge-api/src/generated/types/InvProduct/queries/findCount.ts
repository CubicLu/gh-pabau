import { queryField, nonNull, list } from 'nexus'

export const InvProductFindCountQuery = queryField('findManyInvProductCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvProductWhereInput',
    orderBy: list('InvProductOrderByWithRelationInput'),
    cursor: 'InvProductWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvProductScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invProduct.count(args as any)
  },
})
