import { queryField, list } from 'nexus'

export const ApiKeyAggregateQuery = queryField('aggregateApiKey', {
  type: 'AggregateApiKey',
  args: {
    where: 'ApiKeyWhereInput',
    orderBy: list('ApiKeyOrderByWithRelationInput'),
    cursor: 'ApiKeyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiKey.aggregate({ ...args, ...select }) as any
  },
})
