import { mutationField, nonNull } from 'nexus'

export const ClassSmsHistoryUpsertOneMutation = mutationField(
  'upsertOneClassSmsHistory',
  {
    type: nonNull('ClassSmsHistory'),
    args: {
      where: nonNull('ClassSmsHistoryWhereUniqueInput'),
      create: nonNull('ClassSmsHistoryCreateInput'),
      update: nonNull('ClassSmsHistoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classSmsHistory.upsert({
        ...args,
        ...select,
      })
    },
  },
)
