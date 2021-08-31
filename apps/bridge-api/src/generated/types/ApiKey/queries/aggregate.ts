import { queryField, list } from 'nexus'

export const ApiKeyAggregateQuery = queryField('aggregateApiKey', {
  type: 'AggregateApiKey',
  args: {
    where: 'ApiKeyWhereInput',
    orderBy: list('ApiKeyOrderByWithRelationInput'),
    cursor: 'ApiKeyWhereUniqueInput',
    distinct: 'ApiKeyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiKey.aggregate({ ...args, ...select }) as any
  },
})
