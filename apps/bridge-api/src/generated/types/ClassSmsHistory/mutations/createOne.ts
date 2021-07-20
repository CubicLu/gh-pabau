import { mutationField, nonNull } from 'nexus'

export const ClassSmsHistoryCreateOneMutation = mutationField(
  'createOneClassSmsHistory',
  {
    type: nonNull('ClassSmsHistory'),
    args: {
      data: nonNull('ClassSmsHistoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.classSmsHistory.create({
        data,
        ...select,
      })
    },
  },
)
