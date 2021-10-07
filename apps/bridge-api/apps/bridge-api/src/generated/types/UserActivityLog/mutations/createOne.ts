import { mutationField, nonNull } from 'nexus'

export const UserActivityLogCreateOneMutation = mutationField(
  'createOneUserActivityLog',
  {
    type: nonNull('UserActivityLog'),
    args: {
      data: nonNull('UserActivityLogCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userActivityLog.create({
        data,
        ...select,
      })
    },
  },
)
