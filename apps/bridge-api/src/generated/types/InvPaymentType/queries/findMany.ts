import { queryField, nonNull, list } from 'nexus'

export const InvPaymentTypeFindManyQuery = queryField(
  'findManyInvPaymentType',
  {
    type: nonNull(list(nonNull('InvPaymentType'))),
    args: {
      where: 'InvPaymentTypeWhereInput',
      orderBy: list('InvPaymentTypeOrderByInput'),
      cursor: 'InvPaymentTypeWhereUniqueInput',
      distinct: 'InvPaymentTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invPaymentType.findMany({
        ...args,
        ...select,
      })
    },
  },
)
