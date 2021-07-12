import { mutationField, nonNull } from 'nexus'

export const ReportUpdateManyMutation = mutationField('updateManyReport', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ReportWhereInput',
    data: nonNull('ReportUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.report.updateMany(args as any)
  },
})
