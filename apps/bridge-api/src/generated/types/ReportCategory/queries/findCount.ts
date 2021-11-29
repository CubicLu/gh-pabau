import { queryField, nonNull, list } from 'nexus'

export const ReportCategoryFindCountQuery = queryField(
  'findManyReportCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ReportCategoryWhereInput',
      orderBy: list('ReportCategoryOrderByWithRelationInput'),
      cursor: 'ReportCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ReportCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.reportCategory.count(args as any)
    },
  },
)
