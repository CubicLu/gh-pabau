import { queryField, list } from 'nexus'

export const ReportCategoryFindFirstQuery = queryField(
  'findFirstReportCategory',
  {
    type: 'ReportCategory',
    args: {
      where: 'ReportCategoryWhereInput',
      orderBy: list('ReportCategoryOrderByWithRelationInput'),
      cursor: 'ReportCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ReportCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.reportCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
