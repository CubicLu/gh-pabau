import { queryField, list } from 'nexus'

export const InvPaymentFindFirstQuery = queryField('findFirstInvPayment', {
  type: 'InvPayment',
  args: {
    where: 'InvPaymentWhereInput',
    orderBy: list('InvPaymentOrderByInput'),
    cursor: 'InvPaymentWhereUniqueInput',
    distinct: 'InvPaymentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invPayment.findFirst({
      ...args,
      ...select,
    })
  },
})
