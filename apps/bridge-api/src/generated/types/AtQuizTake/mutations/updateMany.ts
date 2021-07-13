import { mutationField, nonNull } from 'nexus'

export const AtQuizTakeUpdateManyMutation = mutationField(
  'updateManyAtQuizTake',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AtQuizTakeWhereInput',
      data: nonNull('AtQuizTakeUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atQuizTake.updateMany(args as any)
    },
  },
)
