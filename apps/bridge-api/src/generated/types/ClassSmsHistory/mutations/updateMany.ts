import { mutationField, nonNull } from 'nexus'

export const ClassSmsHistoryUpdateManyMutation = mutationField(
  'updateManyClassSmsHistory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClassSmsHistoryWhereInput',
      data: nonNull('ClassSmsHistoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classSmsHistory.updateMany(args as any)
    },
  },
)
