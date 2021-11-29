import { mutationField, nonNull } from 'nexus'

export const ClassSmsHistoryUpdateManyMutation = mutationField(
  'updateManyClassSmsHistory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClassSmsHistoryUpdateManyMutationInput'),
      where: 'ClassSmsHistoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classSmsHistory.updateMany(args as any)
    },
  },
)
