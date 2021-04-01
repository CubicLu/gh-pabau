import { objectType, arg, extendType } from 'nexus'

export const SocialSurveyQuestion = objectType({
  name: 'SocialSurveyQuestion',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.question()
    t.model.answer()
    t.model.Company()
  },
})

export const socialSurveyQuestionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.socialSurveyQuestion()
    t.field('findFirstSocialSurveyQuestion', {
      type: 'SocialSurveyQuestion',
      args: {
        where: 'SocialSurveyQuestionWhereInput',
        orderBy: arg({ type: 'SocialSurveyQuestionOrderByInput' }),
        cursor: 'SocialSurveyQuestionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurveyQuestion.findFirst(args as any)
      },
    })
    t.crud.socialSurveyQuestions({ filtering: true, ordering: true })
    t.field('socialSurveyQuestionsCount', {
      type: 'Int',
      args: {
        where: 'SocialSurveyQuestionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.socialSurveyQuestion.count(args as any)
      },
    })
  },
})

export const socialSurveyQuestionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneSocialSurveyQuestion()
    t.crud.updateOneSocialSurveyQuestion()
    t.crud.upsertOneSocialSurveyQuestion()
    t.crud.deleteOneSocialSurveyQuestion()
    t.crud.updateManySocialSurveyQuestion()
  },
})
