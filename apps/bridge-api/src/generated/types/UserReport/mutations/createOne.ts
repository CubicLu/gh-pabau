import { mutationField, nonNull } from 'nexus'

export const UserReportCreateOneMutation = mutationField(
  'createOneUserReport',
  {
    type: nonNull('UserReport'),
    args: {
      data: nonNull('UserReportCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userReport.create({
        data,
        ...select,
      })
    },
  },
)
