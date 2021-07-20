import { queryField, nonNull } from 'nexus'

export const ReportCategoryFindUniqueQuery = queryField(
  'findUniqueReportCategory',
  {
    type: 'ReportCategory',
    args: {
      where: nonNull('ReportCategoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.reportCategory.findUnique({
        where,
        ...select,
      })
    },
  },
)
