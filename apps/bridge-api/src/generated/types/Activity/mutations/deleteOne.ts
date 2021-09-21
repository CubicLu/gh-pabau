import { mutationField, nonNull } from 'nexus'

export const ActivityDeleteOneMutation = mutationField('deleteOneActivity', {
  type: 'Activity',
  args: {
    where: nonNull('ActivityWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.activity.delete({
      where,
      ...select,
    })
  },
})
