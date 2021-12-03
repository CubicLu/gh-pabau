import { mutationField, nonNull } from 'nexus'

export const AtQuestionUpdateManyMutation = mutationField(
  'updateManyAtQuestion',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AtQuestionUpdateManyMutationInput'),
      where: 'AtQuestionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atQuestion.updateMany(args as any)
    },
  },
)
