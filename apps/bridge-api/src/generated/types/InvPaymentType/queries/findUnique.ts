import { queryField, nonNull } from 'nexus'

export const InvPaymentTypeFindUniqueQuery = queryField(
  'findUniqueInvPaymentType',
  {
    type: 'InvPaymentType',
    args: {
      where: nonNull('InvPaymentTypeWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.invPaymentType.findUnique({
        where,
        ...select,
      })
    },
  },
)
