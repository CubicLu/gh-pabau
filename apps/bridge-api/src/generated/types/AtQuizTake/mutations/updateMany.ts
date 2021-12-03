import { mutationField, nonNull } from 'nexus'

export const AtQuizTakeUpdateManyMutation = mutationField(
  'updateManyAtQuizTake',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AtQuizTakeUpdateManyMutationInput'),
      where: 'AtQuizTakeWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atQuizTake.updateMany(args as any)
    },
  },
)
