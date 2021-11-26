import { queryField, list } from 'nexus'

export const XeroIntegrationAggregateQuery = queryField(
  'aggregateXeroIntegration',
  {
    type: 'AggregateXeroIntegration',
    args: {
      where: 'XeroIntegrationWhereInput',
      orderBy: list('XeroIntegrationOrderByWithRelationInput'),
      cursor: 'XeroIntegrationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.xeroIntegration.aggregate({ ...args, ...select }) as any
    },
  },
)
