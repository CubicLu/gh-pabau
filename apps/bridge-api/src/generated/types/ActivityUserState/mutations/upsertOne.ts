import { mutationField, nonNull } from 'nexus'

export const ActivityUserStateUpsertOneMutation = mutationField(
  'upsertOneActivityUserState',
  {
    type: nonNull('ActivityUserState'),
    args: {
      where: nonNull('ActivityUserStateWhereUniqueInput'),
      create: nonNull('ActivityUserStateCreateInput'),
      update: nonNull('ActivityUserStateUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserState.upsert({
        ...args,
        ...select,
      })
    },
  },
)
