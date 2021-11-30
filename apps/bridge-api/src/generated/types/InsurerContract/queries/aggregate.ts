import { queryField, list } from 'nexus'

export const InsurerContractAggregateQuery = queryField(
  'aggregateInsurerContract',
  {
    type: 'AggregateInsurerContract',
    args: {
      where: 'InsurerContractWhereInput',
      orderBy: list('InsurerContractOrderByWithRelationInput'),
      cursor: 'InsurerContractWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insurerContract.aggregate({ ...args, ...select }) as any
    },
  },
)
