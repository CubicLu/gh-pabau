import { mutationField, nonNull } from 'nexus'

export const UserSecurityQuestionsAnswerUpdateOneMutation = mutationField(
  'updateOneUserSecurityQuestionsAnswer',
  {
    type: nonNull('UserSecurityQuestionsAnswer'),
    args: {
      where: nonNull('UserSecurityQuestionsAnswerWhereUniqueInput'),
      data: nonNull('UserSecurityQuestionsAnswerUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.update({
        where,
        data,
        ...select,
      })
    },
  },
)
