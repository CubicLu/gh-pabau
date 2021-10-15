import { mutationField, nonNull } from 'nexus'

export const ActivityUserFilterCreateOneMutation = mutationField(
  'createOneActivityUserFilter',
  {
    type: nonNull('ActivityUserFilter'),
    args: {
      data: nonNull('ActivityUserFilterCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.activityUserFilter.create({
        data,
        ...select,
      })
    },
  },
)
