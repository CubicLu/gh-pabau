import { queryField, list } from 'nexus'

export const ReportCategoryAggregateQuery = queryField(
  'aggregateReportCategory',
  {
    type: 'AggregateReportCategory',
    args: {
      where: 'ReportCategoryWhereInput',
      orderBy: list('ReportCategoryOrderByInput'),
      cursor: 'ReportCategoryWhereUniqueInput',
      distinct: 'ReportCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.reportCategory.aggregate({ ...args, ...select }) as any
    },
  },
)
