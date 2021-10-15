import { mutationField, nonNull } from 'nexus'

export const ActivityUserStateDeleteOneMutation = mutationField(
  'deleteOneActivityUserState',
  {
    type: 'ActivityUserState',
    args: {
      where: nonNull('ActivityUserStateWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.activityUserState.delete({
        where,
        ...select,
      })
    },
  },
)
