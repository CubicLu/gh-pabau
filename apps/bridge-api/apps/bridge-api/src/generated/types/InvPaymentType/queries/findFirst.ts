import { queryField, list } from 'nexus'

export const InvPaymentTypeFindFirstQuery = queryField(
  'findFirstInvPaymentType',
  {
    type: 'InvPaymentType',
    args: {
      where: 'InvPaymentTypeWhereInput',
      orderBy: list('InvPaymentTypeOrderByWithRelationInput'),
      cursor: 'InvPaymentTypeWhereUniqueInput',
      distinct: 'InvPaymentTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invPaymentType.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
