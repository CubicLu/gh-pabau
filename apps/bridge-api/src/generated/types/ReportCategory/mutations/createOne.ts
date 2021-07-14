import { mutationField, nonNull } from 'nexus'

export const ReportCategoryCreateOneMutation = mutationField(
  'createOneReportCategory',
  {
    type: nonNull('ReportCategory'),
    args: {
      data: nonNull('ReportCategoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.reportCategory.create({
        data,
        ...select,
      })
    },
  },
)
