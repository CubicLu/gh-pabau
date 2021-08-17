import { mutationField, nonNull } from 'nexus'

export const InvCategoryDeleteOneMutation = mutationField(
  'deleteOneInvCategory',
  {
    type: 'InvCategory',
    args: {
      where: nonNull('InvCategoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invCategory.delete({
        where,
        ...select,
      })
    },
  },
)
