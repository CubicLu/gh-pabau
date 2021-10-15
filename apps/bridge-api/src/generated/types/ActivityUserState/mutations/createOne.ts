import { mutationField, nonNull } from 'nexus'

export const ActivityUserStateCreateOneMutation = mutationField(
  'createOneActivityUserState',
  {
    type: nonNull('ActivityUserState'),
    args: {
      data: nonNull('ActivityUserStateCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.activityUserState.create({
        data,
        ...select,
      })
    },
  },
)
