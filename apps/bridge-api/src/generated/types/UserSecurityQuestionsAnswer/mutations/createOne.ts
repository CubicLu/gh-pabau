import { mutationField, nonNull } from 'nexus'

export const UserSecurityQuestionsAnswerCreateOneMutation = mutationField(
  'createOneUserSecurityQuestionsAnswer',
  {
    type: nonNull('UserSecurityQuestionsAnswer'),
    args: {
      data: nonNull('UserSecurityQuestionsAnswerCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.create({
        data,
        ...select,
      })
    },
  },
)
