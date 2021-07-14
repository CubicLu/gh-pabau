import { mutationField, nonNull } from 'nexus'

export const ReportCategoryDeleteOneMutation = mutationField(
  'deleteOneReportCategory',
  {
    type: 'ReportCategory',
    args: {
      where: nonNull('ReportCategoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.reportCategory.delete({
        where,
        ...select,
      })
    },
  },
)
