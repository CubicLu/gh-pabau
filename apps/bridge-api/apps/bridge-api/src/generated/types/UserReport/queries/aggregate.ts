import { queryField, list } from 'nexus'

export const UserReportAggregateQuery = queryField('aggregateUserReport', {
  type: 'AggregateUserReport',
  args: {
    where: 'UserReportWhereInput',
    orderBy: list('UserReportOrderByWithRelationInput'),
    cursor: 'UserReportWhereUniqueInput',
    distinct: 'UserReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userReport.aggregate({ ...args, ...select }) as any
  },
})
