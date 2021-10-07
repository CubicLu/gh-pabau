import { mutationField, nonNull } from 'nexus'

export const UserSecurityQuestionsAnswerUpsertOneMutation = mutationField(
  'upsertOneUserSecurityQuestionsAnswer',
  {
    type: nonNull('UserSecurityQuestionsAnswer'),
    args: {
      where: nonNull('UserSecurityQuestionsAnswerWhereUniqueInput'),
      create: nonNull('UserSecurityQuestionsAnswerCreateInput'),
      update: nonNull('UserSecurityQuestionsAnswerUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.upsert({
        ...args,
        ...select,
      })
    },
  },
)
