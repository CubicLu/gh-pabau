import { queryField, list } from 'nexus'

export const ApiDebugAggregateQuery = queryField('aggregateApiDebug', {
  type: 'AggregateApiDebug',
  args: {
    where: 'ApiDebugWhereInput',
    orderBy: list('ApiDebugOrderByWithRelationInput'),
    cursor: 'ApiDebugWhereUniqueInput',
    distinct: 'ApiDebugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiDebug.aggregate({ ...args, ...select }) as any
  },
})
