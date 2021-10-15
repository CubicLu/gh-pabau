import { queryField, nonNull, list } from 'nexus'

export const InvPaymentFindCountQuery = queryField('findManyInvPaymentCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvPaymentWhereInput',
    orderBy: list('InvPaymentOrderByInput'),
    cursor: 'InvPaymentWhereUniqueInput',
    distinct: 'InvPaymentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invPayment.count(args as any)
  },
})
