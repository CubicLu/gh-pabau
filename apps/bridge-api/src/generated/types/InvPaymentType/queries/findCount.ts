import { queryField, nonNull, list } from 'nexus'

export const InvPaymentTypeFindCountQuery = queryField(
  'findManyInvPaymentTypeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvPaymentTypeWhereInput',
      orderBy: list('InvPaymentTypeOrderByInput'),
      cursor: 'InvPaymentTypeWhereUniqueInput',
      distinct: 'InvPaymentTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invPaymentType.count(args as any)
    },
  },
)
