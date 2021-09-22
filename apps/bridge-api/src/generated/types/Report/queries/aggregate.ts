import { queryField, list } from 'nexus'

export const ReportAggregateQuery = queryField('aggregateReport', {
  type: 'AggregateReport',
  args: {
    where: 'ReportWhereInput',
    orderBy: list('ReportOrderByWithRelationInput'),
    cursor: 'ReportWhereUniqueInput',
    distinct: 'ReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.report.aggregate({ ...args, ...select }) as any
  },
})
