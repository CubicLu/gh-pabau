import { objectType, arg, extendType } from 'nexus'

export const UserSecurityQuestionsAnswer = objectType({
  name: 'UserSecurityQuestionsAnswer',
  definition(t) {
    t.model.id()
    t.model.user_id()
    t.model.question()
    t.model.question_no()
    t.model.answer()
    t.model.users()
  },
})

export const userSecurityQuestionsAnswerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.userSecurityQuestionsAnswer()
    t.field('findFirstUserSecurityQuestionsAnswer', {
      type: 'UserSecurityQuestionsAnswer',
      args: {
        where: 'UserSecurityQuestionsAnswerWhereInput',
        orderBy: arg({ type: 'UserSecurityQuestionsAnswerOrderByInput' }),
        cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userSecurityQuestionsAnswer.findFirst(args as any)
      },
    })
    t.crud.userSecurityQuestionsAnswers({ filtering: true, ordering: true })
    t.field('userSecurityQuestionsAnswersCount', {
      type: 'Int',
      args: {
        where: 'UserSecurityQuestionsAnswerWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.userSecurityQuestionsAnswer.count(args as any)
      },
    })
  },
})

export const userSecurityQuestionsAnswerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUserSecurityQuestionsAnswer()
    t.crud.updateOneUserSecurityQuestionsAnswer()
    t.crud.upsertOneUserSecurityQuestionsAnswer()
    t.crud.deleteOneUserSecurityQuestionsAnswer()
    t.crud.updateManyUserSecurityQuestionsAnswer()
  },
})
