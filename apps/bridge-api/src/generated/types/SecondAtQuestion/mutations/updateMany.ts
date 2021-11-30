import { mutationField, nonNull } from 'nexus'

export const SecondAtQuestionUpdateManyMutation = mutationField(
  'updateManySecondAtQuestion',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SecondAtQuestionUpdateManyMutationInput'),
      where: 'SecondAtQuestionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.secondAtQuestion.updateMany(args as any)
    },
  },
)
