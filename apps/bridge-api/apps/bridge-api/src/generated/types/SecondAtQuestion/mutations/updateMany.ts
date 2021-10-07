import { mutationField, nonNull } from 'nexus'

export const SecondAtQuestionUpdateManyMutation = mutationField(
  'updateManySecondAtQuestion',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SecondAtQuestionWhereInput',
      data: nonNull('SecondAtQuestionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.secondAtQuestion.updateMany(args as any)
    },
  },
)
