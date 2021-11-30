import { mutationField, nonNull } from 'nexus'

export const ClassSmsHistoryUpdateOneMutation = mutationField(
  'updateOneClassSmsHistory',
  {
    type: nonNull('ClassSmsHistory'),
    args: {
      data: nonNull('ClassSmsHistoryUpdateInput'),
      where: nonNull('ClassSmsHistoryWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classSmsHistory.update({
        where,
        data,
        ...select,
      })
    },
  },
)
