import { mutationField, nonNull } from 'nexus'

export const UserSecurityQuestionsAnswerDeleteOneMutation = mutationField(
  'deleteOneUserSecurityQuestionsAnswer',
  {
    type: 'UserSecurityQuestionsAnswer',
    args: {
      where: nonNull('UserSecurityQuestionsAnswerWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userSecurityQuestionsAnswer.delete({
        where,
        ...select,
      })
    },
  },
)
