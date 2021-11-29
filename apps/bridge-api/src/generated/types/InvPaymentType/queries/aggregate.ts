import { queryField, list } from 'nexus'

export const InvPaymentTypeAggregateQuery = queryField(
  'aggregateInvPaymentType',
  {
    type: 'AggregateInvPaymentType',
    args: {
      where: 'InvPaymentTypeWhereInput',
      orderBy: list('InvPaymentTypeOrderByWithRelationInput'),
      cursor: 'InvPaymentTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invPaymentType.aggregate({ ...args, ...select }) as any
    },
  },
)
