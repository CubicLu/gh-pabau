import { mutationField, nonNull } from 'nexus'

export const ClassSmsHistoryUpdateOneMutation = mutationField(
  'updateOneClassSmsHistory',
  {
    type: nonNull('ClassSmsHistory'),
    args: {
      where: nonNull('ClassSmsHistoryWhereUniqueInput'),
      data: nonNull('ClassSmsHistoryUpdateInput'),
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
