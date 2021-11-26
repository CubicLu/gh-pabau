import { queryField, list } from 'nexus'

export const InvPaymentFindFirstQuery = queryField('findFirstInvPayment', {
  type: 'InvPayment',
  args: {
    where: 'InvPaymentWhereInput',
    orderBy: list('InvPaymentOrderByWithRelationInput'),
    cursor: 'InvPaymentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvPaymentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invPayment.findFirst({
      ...args,
      ...select,
    })
  },
})
