import { mutationField, nonNull } from 'nexus'

export const ClassCategoryDeleteOneMutation = mutationField(
  'deleteOneClassCategory',
  {
    type: 'ClassCategory',
    args: {
      where: nonNull('ClassCategoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.classCategory.delete({
        where,
        ...select,
      })
    },
  },
)
