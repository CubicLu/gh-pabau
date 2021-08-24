import { queryField, nonNull, list } from 'nexus'

export const InvPaymentFindManyQuery = queryField('findManyInvPayment', {
  type: nonNull(list(nonNull('InvPayment'))),
  args: {
    where: 'InvPaymentWhereInput',
    orderBy: list('InvPaymentOrderByInput'),
    cursor: 'InvPaymentWhereUniqueInput',
    distinct: 'InvPaymentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invPayment.findMany({
      ...args,
      ...select,
    })
  },
})
