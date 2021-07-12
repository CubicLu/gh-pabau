import { mutationField, nonNull } from 'nexus'

export const ReportCategoryUpdateManyMutation = mutationField(
  'updateManyReportCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ReportCategoryWhereInput',
      data: nonNull('ReportCategoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.reportCategory.updateMany(args as any)
    },
  },
)
