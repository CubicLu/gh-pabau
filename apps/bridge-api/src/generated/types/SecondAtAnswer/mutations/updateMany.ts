import { mutationField, nonNull } from 'nexus'

export const SecondAtAnswerUpdateManyMutation = mutationField(
  'updateManySecondAtAnswer',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SecondAtAnswerWhereInput',
      data: nonNull('SecondAtAnswerUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.secondAtAnswer.updateMany(args as any)
    },
  },
)
