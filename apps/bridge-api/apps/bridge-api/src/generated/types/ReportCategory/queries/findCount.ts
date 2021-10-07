import { queryField, nonNull, list } from 'nexus'

export const ReportCategoryFindCountQuery = queryField(
  'findManyReportCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ReportCategoryWhereInput',
      orderBy: list('ReportCategoryOrderByWithRelationInput'),
      cursor: 'ReportCategoryWhereUniqueInput',
      distinct: 'ReportCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.reportCategory.count(args as any)
    },
  },
)
