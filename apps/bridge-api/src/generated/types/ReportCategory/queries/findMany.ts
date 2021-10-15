import { queryField, nonNull, list } from 'nexus'

export const ReportCategoryFindManyQuery = queryField(
  'findManyReportCategory',
  {
    type: nonNull(list(nonNull('ReportCategory'))),
    args: {
      where: 'ReportCategoryWhereInput',
      orderBy: list('ReportCategoryOrderByInput'),
      cursor: 'ReportCategoryWhereUniqueInput',
      distinct: 'ReportCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.reportCategory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
