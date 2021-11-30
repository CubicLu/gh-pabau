import { queryField, nonNull, list } from 'nexus'

export const InvPaymentTypeFindCountQuery = queryField(
  'findManyInvPaymentTypeCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvPaymentTypeWhereInput',
      orderBy: list('InvPaymentTypeOrderByWithRelationInput'),
      cursor: 'InvPaymentTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvPaymentTypeScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invPaymentType.count(args as any)
    },
  },
)
