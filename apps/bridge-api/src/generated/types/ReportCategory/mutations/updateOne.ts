import { mutationField, nonNull } from 'nexus'

export const ReportCategoryUpdateOneMutation = mutationField(
  'updateOneReportCategory',
  {
    type: nonNull('ReportCategory'),
    args: {
      where: nonNull('ReportCategoryWhereUniqueInput'),
      data: nonNull('ReportCategoryUpdateInput'),
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
