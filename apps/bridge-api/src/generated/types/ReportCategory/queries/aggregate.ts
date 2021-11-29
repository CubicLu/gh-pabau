import { queryField, list } from 'nexus'

export const ReportCategoryAggregateQuery = queryField(
  'aggregateReportCategory',
  {
    type: 'AggregateReportCategory',
    args: {
      where: 'ReportCategoryWhereInput',
      orderBy: list('ReportCategoryOrderByWithRelationInput'),
      cursor: 'ReportCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.reportCategory.aggregate({ ...args, ...select }) as any
    },
  },
)
