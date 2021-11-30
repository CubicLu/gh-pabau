import { mutationField, nonNull } from 'nexus'

export const SecondAtAnswerUpdateManyMutation = mutationField(
  'updateManySecondAtAnswer',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SecondAtAnswerUpdateManyMutationInput'),
      where: 'SecondAtAnswerWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.secondAtAnswer.updateMany(args as any)
    },
  },
)
