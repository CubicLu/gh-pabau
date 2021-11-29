import { mutationField, nonNull } from 'nexus'

export const UserReportUpdateOneMutation = mutationField(
  'updateOneUserReport',
  {
    type: nonNull('UserReport'),
    args: {
      data: nonNull('UserReportUpdateInput'),
      where: nonNull('UserReportWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userReport.update({
        where,
        data,
        ...select,
      })
    },
  },
)
