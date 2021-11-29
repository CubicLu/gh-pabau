import { mutationField, nonNull } from 'nexus'

export const ActivityUserStateUpdateManyMutation = mutationField(
  'updateManyActivityUserState',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ActivityUserStateUpdateManyMutationInput'),
      where: 'ActivityUserStateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserState.updateMany(args as any)
    },
  },
)
