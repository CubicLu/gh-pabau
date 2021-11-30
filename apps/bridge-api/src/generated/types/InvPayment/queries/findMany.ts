import { queryField, nonNull, list } from 'nexus'

export const InvPaymentFindManyQuery = queryField('findManyInvPayment', {
  type: nonNull(list(nonNull('InvPayment'))),
  args: {
    where: 'InvPaymentWhereInput',
    orderBy: list('InvPaymentOrderByWithRelationInput'),
    cursor: 'InvPaymentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvPaymentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invPayment.findMany({
      ...args,
      ...select,
    })
  },
})
