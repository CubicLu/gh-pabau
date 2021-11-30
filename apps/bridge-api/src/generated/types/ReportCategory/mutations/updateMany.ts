import { mutationField, nonNull } from 'nexus'

export const ReportCategoryUpdateManyMutation = mutationField(
  'updateManyReportCategory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ReportCategoryUpdateManyMutationInput'),
      where: 'ReportCategoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.reportCategory.updateMany(args as any)
    },
  },
)
