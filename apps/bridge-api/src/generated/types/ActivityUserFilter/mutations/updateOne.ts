import { mutationField, nonNull } from 'nexus'

export const ActivityUserFilterUpdateOneMutation = mutationField(
  'updateOneActivityUserFilter',
  {
    type: nonNull('ActivityUserFilter'),
    args: {
      where: nonNull('ActivityUserFilterWhereUniqueInput'),
      data: nonNull('ActivityUserFilterUpdateInput'),
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
