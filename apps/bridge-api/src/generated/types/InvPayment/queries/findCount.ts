import { queryField, nonNull, list } from 'nexus'

export const InvPaymentFindCountQuery = queryField('findManyInvPaymentCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvPaymentWhereInput',
    orderBy: list('InvPaymentOrderByWithRelationInput'),
    cursor: 'InvPaymentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvPaymentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invPayment.count(args as any)
  },
})
