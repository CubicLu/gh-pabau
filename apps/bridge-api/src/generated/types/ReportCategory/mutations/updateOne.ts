import { mutationField, nonNull } from 'nexus'

export const ReportCategoryUpdateOneMutation = mutationField(
  'updateOneReportCategory',
  {
    type: nonNull('ReportCategory'),
    args: {
      data: nonNull('ReportCategoryUpdateInput'),
      where: nonNull('ReportCategoryWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.reportCategory.update({
        where,
        data,
        ...select,
      })
    },
  },
)
