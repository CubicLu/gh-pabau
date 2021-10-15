import { mutationField, nonNull } from 'nexus'

export const ActivityUserStateUpdateManyMutation = mutationField(
  'updateManyActivityUserState',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ActivityUserStateWhereInput',
      data: nonNull('ActivityUserStateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserState.updateMany(args as any)
    },
  },
)
