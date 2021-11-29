import { queryField, list } from 'nexus'

export const BugLogAggregateQuery = queryField('aggregateBugLog', {
  type: 'AggregateBugLog',
  args: {
    where: 'BugLogWhereInput',
    orderBy: list('BugLogOrderByWithRelationInput'),
    cursor: 'BugLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bugLog.aggregate({ ...args, ...select }) as any
  },
})
