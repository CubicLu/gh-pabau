import { mutationField, nonNull } from 'nexus'

export const AppBeforeAfterDeleteOneMutation = mutationField(
  'deleteOneAppBeforeAfter',
  {
    type: 'AppBeforeAfter',
    args: {
      where: nonNull('AppBeforeAfterWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.appBeforeAfter.delete({
        where,
        ...select,
      })
    },
  },
)
