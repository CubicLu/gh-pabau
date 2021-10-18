import { mutationField, nonNull } from 'nexus'

export const ActivityUserFilterDeleteOneMutation = mutationField(
  'deleteOneActivityUserFilter',
  {
    type: 'ActivityUserFilter',
    args: {
      where: nonNull('ActivityUserFilterWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.activityUserFilter.delete({
        where,
        ...select,
      })
    },
  },
)
