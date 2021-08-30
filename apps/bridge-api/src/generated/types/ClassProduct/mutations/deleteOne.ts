import { mutationField, nonNull } from 'nexus'

export const ClassProductDeleteOneMutation = mutationField(
  'deleteOneClassProduct',
  {
    type: 'ClassProduct',
    args: {
      where: nonNull('ClassProductWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.classProduct.delete({
        where,
        ...select,
      })
    },
  },
)
