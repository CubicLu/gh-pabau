import { queryField, list } from 'nexus'

export const InvPaymentTypeAggregateQuery = queryField(
  'aggregateInvPaymentType',
  {
    type: 'AggregateInvPaymentType',
    args: {
      where: 'InvPaymentTypeWhereInput',
      orderBy: list('InvPaymentTypeOrderByInput'),
      cursor: 'InvPaymentTypeWhereUniqueInput',
      distinct: 'InvPaymentTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invPaymentType.aggregate({ ...args, ...select }) as any
    },
  },
)
