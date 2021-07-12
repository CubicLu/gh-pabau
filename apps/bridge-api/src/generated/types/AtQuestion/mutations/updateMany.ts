import { mutationField, nonNull } from 'nexus'

export const AtQuestionUpdateManyMutation = mutationField(
  'updateManyAtQuestion',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AtQuestionWhereInput',
      data: nonNull('AtQuestionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atQuestion.updateMany(args as any)
    },
  },
)
