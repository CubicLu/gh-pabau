import { queryField, list } from 'nexus'

export const InvPaymentAggregateQuery = queryField('aggregateInvPayment', {
  type: 'AggregateInvPayment',
  args: {
    where: 'InvPaymentWhereInput',
    orderBy: list('InvPaymentOrderByWithRelationInput'),
    cursor: 'InvPaymentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invPayment.aggregate({ ...args, ...select }) as any
  },
})
