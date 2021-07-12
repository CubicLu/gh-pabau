import { queryField, nonNull, list } from 'nexus'

export const ReportFindCountQuery = queryField('findManyReportCount', {
  type: nonNull('Int'),
  args: {
    where: 'ReportWhereInput',
    orderBy: list('ReportOrderByInput'),
    cursor: 'ReportWhereUniqueInput',
    distinct: 'ReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.report.count(args as any)
  },
})
