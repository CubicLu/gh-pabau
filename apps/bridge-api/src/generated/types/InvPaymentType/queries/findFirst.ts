import { queryField, list } from 'nexus'

export const InvPaymentTypeFindFirstQuery = queryField(
  'findFirstInvPaymentType',
  {
    type: 'InvPaymentType',
    args: {
      where: 'InvPaymentTypeWhereInput',
      orderBy: list('InvPaymentTypeOrderByWithRelationInput'),
      cursor: 'InvPaymentTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvPaymentTypeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invPaymentType.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
