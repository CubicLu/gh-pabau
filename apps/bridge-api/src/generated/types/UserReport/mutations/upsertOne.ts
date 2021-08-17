import { mutationField, nonNull } from 'nexus'

export const UserReportUpsertOneMutation = mutationField(
  'upsertOneUserReport',
  {
    type: nonNull('UserReport'),
    args: {
      where: nonNull('UserReportWhereUniqueInput'),
      create: nonNull('UserReportCreateInput'),
      update: nonNull('UserReportUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userReport.upsert({
        ...args,
        ...select,
      })
    },
  },
)
