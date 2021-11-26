import { queryField, list } from 'nexus'

export const AcLogAggregateQuery = queryField('aggregateAcLog', {
  type: 'AggregateAcLog',
  args: {
    where: 'AcLogWhereInput',
    orderBy: list('AcLogOrderByWithRelationInput'),
    cursor: 'AcLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLog.aggregate({ ...args, ...select }) as any
  },
})
