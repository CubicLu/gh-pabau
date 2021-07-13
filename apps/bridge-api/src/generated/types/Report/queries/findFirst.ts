import { queryField, list } from 'nexus'

export const ReportFindFirstQuery = queryField('findFirstReport', {
  type: 'Report',
  args: {
    where: 'ReportWhereInput',
    orderBy: list('ReportOrderByInput'),
    cursor: 'ReportWhereUniqueInput',
    distinct: 'ReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.report.findFirst({
      ...args,
      ...select,
    })
  },
})
