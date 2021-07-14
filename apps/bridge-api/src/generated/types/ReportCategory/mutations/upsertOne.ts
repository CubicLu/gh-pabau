import { mutationField, nonNull } from 'nexus'

export const ReportCategoryUpsertOneMutation = mutationField(
  'upsertOneReportCategory',
  {
    type: nonNull('ReportCategory'),
    args: {
      where: nonNull('ReportCategoryWhereUniqueInput'),
      create: nonNull('ReportCategoryCreateInput'),
      update: nonNull('ReportCategoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.reportCategory.upsert({
        ...args,
        ...select,
      })
    },
  },
)
