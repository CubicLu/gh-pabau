import { queryField, nonNull } from 'nexus'

export const InvPaymentFindUniqueQuery = queryField('findUniqueInvPayment', {
  type: 'InvPayment',
  args: {
    where: nonNull('InvPaymentWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invPayment.findUnique({
      where,
      ...select,
    })
  },
})
