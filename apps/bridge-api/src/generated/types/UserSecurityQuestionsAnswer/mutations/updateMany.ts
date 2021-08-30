import { mutationField, nonNull } from 'nexus'

export const UserSecurityQuestionsAnswerUpdateManyMutation = mutationField(
  'updateManyUserSecurityQuestionsAnswer',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      data: nonNull('UserSecurityQuestionsAnswerUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userSecurityQuestionsAnswer.updateMany(args as any)
    },
  },
)
