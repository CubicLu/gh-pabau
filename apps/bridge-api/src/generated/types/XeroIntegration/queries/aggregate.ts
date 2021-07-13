import { queryField, list } from 'nexus'

export const XeroIntegrationAggregateQuery = queryField(
  'aggregateXeroIntegration',
  {
    type: 'AggregateXeroIntegration',
    args: {
      where: 'XeroIntegrationWhereInput',
      orderBy: list('XeroIntegrationOrderByInput'),
      cursor: 'XeroIntegrationWhereUniqueInput',
      distinct: 'XeroIntegrationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.xeroIntegration.aggregate({ ...args, ...select }) as any
    },
  },
)
