import { objectType, arg, extendType } from 'nexus'

export const SocialSurveyAnswer = objectType({
  name: 'SocialSurveyAnswer',
  definition(t) {
    t.model.id()
    t.model.feedback_id()
    t.model.question()
    t.model.answer()
    t.model.SocialSurveyFeedback()
  },
})

export const socialSurveyAnswerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.socialSurveyAnswer()
    t.field('findFirstSocialSurveyAnswer', {
      type: 'SocialSurveyAnswer',
      args: {
        where: 'SocialSurveyAnswerWhereInput',
        orderBy: arg({ type: 'SocialSurveyAnswerOrderByInput' }),
        cursor: 'SocialSurveyAnswerWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurveyAnswer.findFirst(args as any)
      },
    })
    t.crud.socialSurveyAnswers({ filtering: true, ordering: true })
    t.field('socialSurveyAnswersCount', {
      type: 'Int',
      args: {
        where: 'SocialSurveyAnswerWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurveyAnswer.count(args as any)
      },
    })
  },
})

export const socialSurveyAnswerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneSocialSurveyAnswer()
    t.crud.updateOneSocialSurveyAnswer()
    t.crud.upsertOneSocialSurveyAnswer()
    t.crud.deleteOneSocialSurveyAnswer()
    t.crud.updateManySocialSurveyAnswer()
  },
})
