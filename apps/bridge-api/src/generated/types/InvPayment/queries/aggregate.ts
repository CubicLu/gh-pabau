import { queryField, list } from 'nexus'

export const InvPaymentAggregateQuery = queryField('aggregateInvPayment', {
  type: 'AggregateInvPayment',
  args: {
    where: 'InvPaymentWhereInput',
    orderBy: list('InvPaymentOrderByInput'),
    cursor: 'InvPaymentWhereUniqueInput',
    distinct: 'InvPaymentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invPayment.aggregate({ ...args, ...select }) as any
  },
})
