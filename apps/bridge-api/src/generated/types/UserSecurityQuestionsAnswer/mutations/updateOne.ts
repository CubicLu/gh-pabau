import { mutationField, nonNull } from 'nexus'

export const UserSecurityQuestionsAnswerUpdateOneMutation = mutationField(
  'updateOneUserSecurityQuestionsAnswer',
  {
    type: nonNull('UserSecurityQuestionsAnswer'),
    args: {
      data: nonNull('UserSecurityQuestionsAnswerUpdateInput'),
      where: nonNull('UserSecurityQuestionsAnswerWhereUniqueInput'),
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
