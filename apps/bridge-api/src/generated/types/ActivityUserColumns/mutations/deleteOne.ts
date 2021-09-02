import { mutationField, nonNull } from 'nexus'

export const ActivityUserColumnsDeleteOneMutation = mutationField(
  'deleteOneActivityUserColumns',
  {
    type: 'ActivityUserColumns',
    args: {
      where: nonNull('ActivityUserColumnsWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.activityUserColumns.delete({
        where,
        ...select,
      })
    },
  },
)
