import { mutationField, nonNull } from 'nexus'

export const ActivityUserStateUpdateOneMutation = mutationField(
  'updateOneActivityUserState',
  {
    type: nonNull('ActivityUserState'),
    args: {
      data: nonNull('ActivityUserStateUpdateInput'),
      where: nonNull('ActivityUserStateWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.activityUserState.update({
        where,
        data,
        ...select,
      })
    },
  },
)
