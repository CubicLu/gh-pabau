import { mutationField, nonNull } from 'nexus'

export const ActivityUserStateUpdateOneMutation = mutationField(
  'updateOneActivityUserState',
  {
    type: nonNull('ActivityUserState'),
    args: {
      where: nonNull('ActivityUserStateWhereUniqueInput'),
      data: nonNull('ActivityUserStateUpdateInput'),
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
