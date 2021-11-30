import { mutationField, nonNull } from 'nexus'

export const UserSecurityQuestionsAnswerUpdateManyMutation = mutationField(
  'updateManyUserSecurityQuestionsAnswer',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserSecurityQuestionsAnswerUpdateManyMutationInput'),
      where: 'UserSecurityQuestionsAnswerWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userSecurityQuestionsAnswer.updateMany(args as any)
    },
  },
)
