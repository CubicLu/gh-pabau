import { mutationField, nonNull } from 'nexus'

export const ActivityUserFilterUpdateOneMutation = mutationField(
  'updateOneActivityUserFilter',
  {
    type: nonNull('ActivityUserFilter'),
    args: {
      data: nonNull('ActivityUserFilterUpdateInput'),
      where: nonNull('ActivityUserFilterWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.activityUserFilter.update({
        where,
        data,
        ...select,
      })
    },
  },
)
