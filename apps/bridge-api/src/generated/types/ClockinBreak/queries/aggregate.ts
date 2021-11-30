import { queryField, list } from 'nexus'

export const ClockinBreakAggregateQuery = queryField('aggregateClockinBreak', {
  type: 'AggregateClockinBreak',
  args: {
    where: 'ClockinBreakWhereInput',
    orderBy: list('ClockinBreakOrderByWithRelationInput'),
    cursor: 'ClockinBreakWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.clockinBreak.aggregate({ ...args, ...select }) as any
  },
})
