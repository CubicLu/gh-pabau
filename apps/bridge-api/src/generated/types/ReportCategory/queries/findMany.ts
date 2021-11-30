import { queryField, nonNull, list } from 'nexus'

export const ReportCategoryFindManyQuery = queryField(
  'findManyReportCategory',
  {
    type: nonNull(list(nonNull('ReportCategory'))),
    args: {
      where: 'ReportCategoryWhereInput',
      orderBy: list('ReportCategoryOrderByWithRelationInput'),
      cursor: 'ReportCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ReportCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.reportCategory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
