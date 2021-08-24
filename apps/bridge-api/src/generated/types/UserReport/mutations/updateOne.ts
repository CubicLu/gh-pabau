import { mutationField, nonNull } from 'nexus'

export const UserReportUpdateOneMutation = mutationField(
  'updateOneUserReport',
  {
    type: nonNull('UserReport'),
    args: {
      where: nonNull('UserReportWhereUniqueInput'),
      data: nonNull('UserReportUpdateInput'),
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
