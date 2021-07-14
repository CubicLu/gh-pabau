import { mutationField, nonNull } from 'nexus'

export const ClassSmsHistoryDeleteOneMutation = mutationField(
  'deleteOneClassSmsHistory',
  {
    type: 'ClassSmsHistory',
    args: {
      where: nonNull('ClassSmsHistoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.classSmsHistory.delete({
        where,
        ...select,
      })
    },
  },
)
