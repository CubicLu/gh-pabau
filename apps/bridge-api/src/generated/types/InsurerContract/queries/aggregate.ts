import { queryField, list } from 'nexus'

export const InsurerContractAggregateQuery = queryField(
  'aggregateInsurerContract',
  {
    type: 'AggregateInsurerContract',
    args: {
      where: 'InsurerContractWhereInput',
      orderBy: list('InsurerContractOrderByWithRelationInput'),
      cursor: 'InsurerContractWhereUniqueInput',
      distinct: 'InsurerContractScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.insurerContract.aggregate({ ...args, ...select }) as any
    },
  },
)
